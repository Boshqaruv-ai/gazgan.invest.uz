'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('featured_products')
    .select('*')
    .order('sort_order', { ascending: true });

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
  const { title, category, price, currency, unit, description, featured, active, sort_order, image, image_url } = body;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('featured_products')
    .insert([{ 
      title, 
      category, 
      price, 
      currency, 
      unit, 
      description, 
      is_featured: featured, 
      is_active: active, 
      sort_order, 
      image: image || image_url 
    }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

const ALLOWED_FIELDS = ['title', 'category', 'price', 'currency', 'unit', 'description', 'is_featured', 'is_active', 'sort_order', 'image', 'image_url'];

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const filteredUpdates: Record<string, any> = {};
  for (const key of Object.keys(updates)) {
    if (ALLOWED_FIELDS.includes(key)) {
      if (key === 'image_url') {
        filteredUpdates.image = updates[key];
      } else if (key === 'featured') {
        filteredUpdates.is_featured = updates[key];
      } else if (key === 'active') {
        filteredUpdates.is_active = updates[key];
      } else {
        filteredUpdates[key] = updates[key];
      }
    }
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('featured_products')
    .update(filteredUpdates)
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
  const { error } = await supabase.from('featured_products').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}