# قاعدة بيانات dm — Supabase

## التثبيت السريع

1. افتح [Supabase Dashboard](https://supabase.com/dashboard) → مشروعك → **SQL Editor**
2. انسخ محتوى **`fix-database.sql`** بالكامل والصقه → **Run**
3. انسخ محتوى **`admin-fix.sql`** والصقه → **Run** (دخول الأدمن + تخزين الصور)
4. من **Authentication → Users** أنشئ مستخدم الأدمن (أو سجّل من الموقع)
5. نفّذ (استبدل البريد):

```sql
INSERT INTO public.admin_users (user_id)
SELECT id FROM auth.users WHERE email = 'admin@dm.com' LIMIT 1;
```

ثم افتح: http://localhost:3000/admin.html

## ماذا يفعل `fix-database.sql`؟

| المكوّن | الوصف |
|---------|--------|
| `books` | كتالوج المتجر + 5 كتب تجريبية إن كان فارغاً |
| `orders` | طلبات مع `user_id` و `customer_email` |
| `order_items` | عناصر كل طلب |
| `profiles` | ملف المستخدم + محفز تلقائي عند التسجيل |
| `contact_messages` | رسائل صفحة التواصل |
| `admin_users` | قائمة مشرفين لوحة الأدمن |
| RLS | سياسات آمنة: ضيف يطلب، مستخدم يرى طلباته، أدمن يدير الكل |

## ملفات أخرى

- `init.sql` — النسخة القديمة (للمرجع فقط)
- `../scripts/setup-supabase.js` — إنشاء مستخدم أدمن عبر API
