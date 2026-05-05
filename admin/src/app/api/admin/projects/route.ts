'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

const VALID_CATEGORIES = ['Marmar', 'Granit', 'Boshqa'] as const;
const VALID_RISK_LEVELS = ['Low', 'Medium', 'High'] as const;

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const title = (body.title || '').trim();
  if (!title) {
    return NextResponse.json({ error: 'Sarlavha majburiy' }, { status: 400 });
  }

  const category = (body.category || '').trim();
  if (!VALID_CATEGORIES.includes(category as any)) {
    return NextResponse.json({ error: 'Kategoriya noto\'g\'ri. Marmar, Granit yoki Boshqa tanlang' }, { status: 400 });
  }

  const risk_level = (body.risk_level || 'Medium').trim();
  if (!VALID_RISK_LEVELS.includes(risk_level as any)) {
    return NextResponse.json({ error: 'Risk darajasi noto\'g\'ri' }, { status: 400 });
  }

  const roi = Math.max(0, Number(body.roi) || 0);
  const payback = Math.max(1, Number(body.payback) || 1);
  const amount = Math.max(0, Number(body.amount) || 0);

  // Generate a unique ID from title
  const id = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    + '-' + Date.now().toString(36);

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('projects')
    .insert([{
      id,
      title,
      category,
      roi,
      payback,
      amount,
      image: (body.image_url || body.image || '').trim() || null,
      highlight: Boolean(body.highlight ?? body.is_featured ?? false),
      description: (body.description || '').trim(),
      location: (body.location || '').trim(),
      risk_level,
      timeline: body.timeline || [],
      roi_breakdown: body.roi_breakdown || [],
      sort_order: Number(body.sort_order) || 100,
      is_active: body.is_active !== undefined ? Boolean(body.is_active) : true,
    }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const updates: Record<string, any> = {};

  if (body.title !== undefined) updates.title = (body.title || '').trim();
  if (body.category !== undefined) {
    const cat = (body.category || '').trim();
    if (cat && !VALID_CATEGORIES.includes(cat as any)) {
      return NextResponse.json({ error: 'Kategoriya noto\'g\'ri' }, { status: 400 });
    }
    updates.category = cat;
  }
  if (body.roi !== undefined) updates.roi = Math.max(0, Number(body.roi) || 0);
  if (body.payback !== undefined) updates.payback = Math.max(1, Number(body.payback) || 1);
  if (body.amount !== undefined) updates.amount = Math.max(0, Number(body.amount) || 0);
  if (body.image_url !== undefined) updates.image = (body.image_url || '').trim();
  if (body.description !== undefined) updates.description = (body.description || '').trim();
  if (body.location !== undefined) updates.location = (body.location || '').trim();
  if (body.risk_level !== undefined) {
    const rl = (body.risk_level || '').trim();
    if (rl && !VALID_RISK_LEVELS.includes(rl as any)) {
      return NextResponse.json({ error: 'Risk darajasi noto\'g\'ri' }, { status: 400 });
    }
    updates.risk_level = rl;
  }
  if (body.highlight !== undefined) updates.highlight = Boolean(body.highlight);
  if (body.is_active !== undefined) updates.is_active = Boolean(body.is_active);
  if (body.sort_order !== undefined) updates.sort_order = Number(body.sort_order) || 100;
  if (body.timeline !== undefined) updates.timeline = body.timeline;
  if (body.roi_breakdown !== undefined) updates.roi_breakdown = body.roi_breakdown;

  updates.updated_at = new Date().toISOString();

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}