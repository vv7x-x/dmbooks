import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, customerName, total } = body;

    if (!orderId || !customerName || !total) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const phone = process.env.ADMIN_PHONE;
    const apikey = process.env.CALLMEBOT_APIKEY;

    if (!phone || !apikey) {
      console.error("[order] Missing ADMIN_PHONE or CALLMEBOT_APIKEY");
      return NextResponse.json({ error: "Server config error" }, { status: 500 });
    }

    const text = `🔔 طلب جديد في dm bookstore
🆔 رقم الأوردر: ${orderId}
👤 العميل: ${customerName}
💰 المبلغ: ${total} ج.م
⏱ ${new Date().toLocaleString("ar-EG")}`;

    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apikey)}`;

    const res = await fetch(url);

    if (!res.ok) {
      const errText = await res.text();
      console.error("[order] CallMeBot error:", res.status, errText);
      return NextResponse.json({ error: "WhatsApp send failed" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[order] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
