-- إصلاح دخول الأدمن — شغّل بعد fix-database.sql
-- يسمح للمستخدم بمعرفة إن كان مشرفاً + تخزين أغلفة الكتب

-- 1) سياسة: المستخدم يرى صفه فقط في admin_users (للتحقق من الصلاحية)
DROP POLICY IF EXISTS admin_users_self_check ON public.admin_users;
CREATE POLICY admin_users_self_check ON public.admin_users
  FOR SELECT USING (user_id = auth.uid());

-- 2) مزامنة is_admin في profiles عند إضافة مشرف
CREATE OR REPLACE FUNCTION public.sync_profile_admin_flag()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles SET is_admin = true, updated_at = now() WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_admin_user_added ON public.admin_users;
CREATE TRIGGER on_admin_user_added
  AFTER INSERT ON public.admin_users
  FOR EACH ROW EXECUTE FUNCTION public.sync_profile_admin_flag();

-- مزامنة المشرفين الحاليين
UPDATE public.profiles p
SET is_admin = true, updated_at = now()
WHERE EXISTS (SELECT 1 FROM public.admin_users a WHERE a.user_id = p.id);

-- 3) دالة RPC للتحقق (اختياري — للواجهة)
CREATE OR REPLACE FUNCTION public.check_is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.is_admin();
$$;

GRANT EXECUTE ON FUNCTION public.check_is_admin() TO authenticated;
GRANT SELECT ON public.admin_users TO authenticated;

-- 4) Storage — bucket أغلفة الكتب
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'book-covers',
  'book-covers',
  true,
  5242880,
  ARRAY['image/jpeg','image/png','image/webp','image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880;

DROP POLICY IF EXISTS book_covers_public_read ON storage.objects;
DROP POLICY IF EXISTS book_covers_admin_insert ON storage.objects;
DROP POLICY IF EXISTS book_covers_admin_update ON storage.objects;
DROP POLICY IF EXISTS book_covers_admin_delete ON storage.objects;

CREATE POLICY book_covers_public_read ON storage.objects
  FOR SELECT USING (bucket_id = 'book-covers');

CREATE POLICY book_covers_admin_insert ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'book-covers' AND public.is_admin());

CREATE POLICY book_covers_admin_update ON storage.objects
  FOR UPDATE USING (bucket_id = 'book-covers' AND public.is_admin());

CREATE POLICY book_covers_admin_delete ON storage.objects
  FOR DELETE USING (bucket_id = 'book-covers' AND public.is_admin());

-- ═══ أضف مشرفك (غيّر البريد) ═══
-- INSERT INTO public.admin_users (user_id)
-- SELECT id FROM auth.users WHERE email = 'admin@dm.com' LIMIT 1;
