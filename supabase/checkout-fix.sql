-- إصلاح إتمام الشراء (checkout) — شغّل في Supabase SQL Editor
-- يحل: تعليق زر الطلب + Uncaught (in promise) بسبب RLS على SELECT بعد INSERT

-- دالة آمنة: إنشاء الطلب + العناصر في معاملة واحدة (تجاوز قيود القراءة للضيف)
CREATE OR REPLACE FUNCTION public.place_order(
  p_customer_name text,
  p_customer_phone text,
  p_customer_email text,
  p_governorate text,
  p_address text,
  p_notes text,
  p_total_price numeric,
  p_shipping_cost numeric,
  p_user_id uuid DEFAULT NULL,
  p_items jsonb DEFAULT '[]'::jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_order_id uuid;
  v_item jsonb;
BEGIN
  IF p_customer_name IS NULL OR length(trim(p_customer_name)) < 2 THEN
    RAISE EXCEPTION 'invalid_customer_name';
  END IF;
  IF p_customer_phone IS NULL OR length(trim(p_customer_phone)) < 8 THEN
    RAISE EXCEPTION 'invalid_phone';
  END IF;
  IF p_governorate IS NULL OR length(trim(p_governorate)) < 1 THEN
    RAISE EXCEPTION 'invalid_governorate';
  END IF;
  IF p_address IS NULL OR length(trim(p_address)) < 5 THEN
    RAISE EXCEPTION 'invalid_address';
  END IF;
  IF jsonb_array_length(COALESCE(p_items, '[]'::jsonb)) < 1 THEN
    RAISE EXCEPTION 'empty_cart';
  END IF;

  INSERT INTO public.orders (
    user_id, customer_name, customer_phone, customer_email,
    governorate, address, notes, total_price, shipping_cost, status
  ) VALUES (
    p_user_id,
    trim(p_customer_name),
    trim(p_customer_phone),
    nullif(trim(p_customer_email), ''),
    trim(p_governorate),
    trim(p_address),
    nullif(trim(p_notes), ''),
    COALESCE(p_total_price, 0),
    COALESCE(p_shipping_cost, 0),
    'pending'
  )
  RETURNING id INTO v_order_id;

  FOR v_item IN SELECT value FROM jsonb_array_elements(p_items)
  LOOP
    INSERT INTO public.order_items (order_id, book_id, quantity, price)
    VALUES (
      v_order_id,
      (v_item->>'book_id')::uuid,
      GREATEST(COALESCE((v_item->>'quantity')::int, 1), 1),
      COALESCE((v_item->>'price')::numeric, 0)
    );
  END LOOP;

  RETURN jsonb_build_object('ok', true, 'order_id', v_order_id);
END;
$$;

GRANT EXECUTE ON FUNCTION public.place_order TO anon, authenticated;
