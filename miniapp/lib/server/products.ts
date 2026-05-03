import 'server-only';

import type { FeaturedProduct } from '@/lib/products';
import { getSupabaseAdmin } from '@/lib/supabase/server';

export async function getFeaturedProductsFromDb(): Promise<FeaturedProduct[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('featured_products')
    .select('id, title, category, price, currency, unit, image, description')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (!error) {
    return (data ?? []).map((row) => ({
      id: row.id,
      title: row.title,
      category: row.category,
      price: Number(row.price),
      currency: row.currency,
      unit: row.unit,
      image: row.image,
      description: row.description,
    }));
  }

  if (isRecoverableProductSchemaError(error)) {
    console.warn('Featured products are unavailable; returning empty product list.', error.message);
    return [];
  }

  throw new Error(error.message);
}

function isRecoverableProductSchemaError(error: { code?: string; message?: string }) {
  const message = error.message ?? '';

  return (
    error.code === '42P01' ||
    error.code === '42703' ||
    error.code === 'PGRST204' ||
    message.includes('featured_products') ||
    message.includes('schema cache') ||
    message.includes('does not exist')
  );
}
