import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Barcha maydonlar to\'ldirilishi kerak' }, { status: 400 });
    }

    const { data: existing } = await supabase.from('investors').select('id').eq('email', email).single();

    if (existing) {
      return NextResponse.json({ error: 'Bu email allaqachon ro\'yxatdan o\'tgan' }, { status: 400 });
    }

    const { data, error } = await supabase.from('investors').insert({
      name,
      email,
      password_hash: password,
      role: 'investor',
      created_at: new Date().toISOString(),
    }).select().single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ error: 'Server xatoligi' }, { status: 500 });
  }
}