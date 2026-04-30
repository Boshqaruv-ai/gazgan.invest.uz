import { NextRequest, NextResponse } from 'next/server';

const MAX_FIELD_LENGTH = 1000;

function clean(value: unknown, maxLength = 160) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const source = body && typeof body === 'object' ? body as Record<string, unknown> : {};
  const lead = {
    name: clean(source.name, 120),
    email: clean(source.email, 160),
    phone: clean(source.phone, 80),
    interest: clean(source.interest, 120),
    message: clean(source.message, MAX_FIELD_LENGTH),
  };

  if (lead.name.length < 2 || !isEmail(lead.email) || lead.phone.replace(/\D/g, '').length < 9 || lead.message.length < 10) {
    return NextResponse.json({ error: 'Invalid lead payload' }, { status: 422 });
  }

  return NextResponse.json({
    ok: true,
    leadId: `lead_${Date.now().toString(36)}`,
  });
}
