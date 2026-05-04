'use server';

import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

import { authOptions } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase/server';

const PRODUCT_CATEGORIES = ['marble_slabs', 'granite_slabs', 'souvenirs', 'tiles', 'other'] as const;

type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

type ProductPayload = {
  title: string;
  category: ProductCategory;
  price: number;
  currency: string;
  unit: string;
  description: string | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  image: string;
};

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

  const result = buildProductPayload(await request.json(), { includeId: true });
  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('featured_products')
    .insert([result.payload])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: `Mahsulot saqlanmadi: ${error.message}` }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  if (!isRecord(body)) {
    return NextResponse.json({ error: "So'rov formati noto'g'ri." }, { status: 400 });
  }

  const id = toTrimmedString(body.id);
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const result = buildProductPayload(body);
  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('featured_products')
    .update(result.payload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: `Mahsulot yangilanmadi: ${error.message}` }, { status: 500 });
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
    return NextResponse.json({ error: `Mahsulot o'chirilmadi: ${error.message}` }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

function buildProductPayload(
  input: unknown,
  options: { includeId?: boolean } = {},
): { payload: ProductPayload & { id?: string } } | { error: string } {
  if (!isRecord(input)) {
    return { error: "So'rov formati noto'g'ri." };
  }

  const title = toTrimmedString(input.title);
  if (!title) {
    return { error: 'Sarlavha majburiy.' };
  }

  const category = normalizeCategory(input.category);
  if (!category) {
    return { error: "Kategoriya noto'g'ri tanlangan." };
  }

  const price = toNumber(input.price);
  if (price === null || price < 0) {
    return { error: "Narx 0 yoki undan katta bo'lishi kerak." };
  }

  const unit = toTrimmedString(input.unit);
  if (!unit) {
    return { error: 'Birlik majburiy.' };
  }

  const image = toTrimmedString(input.image) || toTrimmedString(input.image_url);
  if (!image) {
    return { error: 'Rasm URL manzili majburiy.' };
  }

  const payload: ProductPayload & { id?: string } = {
    title,
    category,
    price,
    currency: toTrimmedString(input.currency) || 'USD',
    unit,
    description: toOptionalString(input.description),
    is_featured: toBoolean(input.featured ?? input.is_featured, false),
    is_active: toBoolean(input.active ?? input.is_active, true),
    sort_order: toNumber(input.sort_order) ?? 100,
    image,
  };

  if (options.includeId) {
    payload.id = createProductId();
  }

  return { payload };
}

function createProductId() {
  return randomUUID();
}

function normalizeCategory(value: unknown): ProductCategory | null {
  if (typeof value !== 'string') return null;
  return PRODUCT_CATEGORIES.includes(value as ProductCategory) ? (value as ProductCategory) : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function toTrimmedString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function toOptionalString(value: unknown) {
  const text = toTrimmedString(value);
  return text || null;
}

function toNumber(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function toBoolean(value: unknown, fallback: boolean) {
  return typeof value === 'boolean' ? value : fallback;
}
