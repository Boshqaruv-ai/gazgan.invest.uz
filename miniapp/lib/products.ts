export type FeaturedProductCategory = 'marble_slabs' | 'granite_slabs' | 'souvenirs' | 'tiles' | 'other';

export interface FeaturedProduct {
  id: string;
  title: string;
  category: FeaturedProductCategory;
  price: number;
  currency: string;
  unit: string;
  image: string;
  description: string | null;
}

export function productCategoryLabel(category: FeaturedProductCategory) {
  if (category === 'marble_slabs') return 'Marmar plita';
  if (category === 'granite_slabs') return 'Granit slab';
  if (category === 'souvenirs') return 'Suvenir';
  if (category === 'tiles') return 'Kafel';
  return 'Mahsulot';
}

export function formatProductPrice(product: FeaturedProduct) {
  const formatted = product.price % 1 === 0 ? product.price.toFixed(0) : product.price.toFixed(2);
  return `${formatted} ${product.currency}/${product.unit}`;
}
