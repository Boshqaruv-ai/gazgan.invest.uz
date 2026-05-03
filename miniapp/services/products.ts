import type { FeaturedProduct } from '@/lib/products';

export async function fetchFeaturedProducts(): Promise<FeaturedProduct[]> {
  const response = await fetch('/api/products/featured', { cache: 'no-store' });
  const payload = await response.json() as { products?: FeaturedProduct[]; error?: string };

  if (!response.ok || !payload.products) {
    throw new Error(payload.error || 'Mahsulotlar yuklanmadi.');
  }

  return payload.products;
}
