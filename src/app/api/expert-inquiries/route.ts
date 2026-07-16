import { NextResponse, type NextRequest } from "next/server";
import { isExpertInquiry } from "@/lib/contact";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (
    !isExpertInquiry(body) ||
    !body.name.trim() ||
    !body.contact.trim() ||
    !body.message.trim()
  ) {
    return NextResponse.json({ error: "入力内容を確認してください。" }, { status: 400 });
  }

  const webhookUrl = process.env.CONTACT_NOTIFY_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return NextResponse.json({ ok: true, delivered: res.ok });
  } catch {
    return NextResponse.json({ ok: true, delivered: false });
  }
}
