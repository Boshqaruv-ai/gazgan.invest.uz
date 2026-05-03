'use client';

import * as React from 'react';
import { ProductCard, Reveal } from '@/components/marketing';
import { products as localProductsData } from '@/lib/products';

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  currency: string;
  unit: string;
  image: string;
  description: string | null;
  is_featured: boolean;
}

function transformLocalProduct(p: any): Product {
  return {
    id: String(p.id),
    title: p.name,
    category: p.category,
    price: p.price,
    currency: 'USD',
    unit: p.priceUnit,
    image: p.image,
    description: p.description,
    is_featured: true,
  };
}

export function useProducts() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [category, setCategory] = React.useState('all');
  const [sort, setSort] = React.useState('name');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        console.log('Fetching products from API...');
        const res = await fetch('/api/products/featured');
        console.log('Response status:', res.status);
        const data = await res.json();
        console.log('API response:', data);
        
        if (data.error) {
          console.log('API error, using fallback');
          setError(data.error);
        } else if (!data.length) {
          console.log('Empty response, using fallback');
        } else {
          setProducts(data);
          console.log('Loaded from API:', data.length);
        }
      } catch (err) {
        console.log('Fetch error, using fallback:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const availableProducts = products.length > 0 ? products : localProductsData.map(transformLocalProduct);

  const filteredProducts = category === 'all'
    ? availableProducts
    : availableProducts.filter((product) => product.category.toLowerCase() === category);

  const sorted = [...filteredProducts].sort((a, b) => {
    if (sort === 'name') return a.title.localeCompare(b.title);
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    return 0;
  });

  return { category, setCategory, sort, setSort, products: sorted, loading };
}

export function ProductsList() {
  const { category, setCategory, sort, setSort, products: visibleProducts, loading } = useProducts();

  if (loading) {
    return <div className="text-white p-8">Yuklanmoqda...</div>;
  }

  const productCategories = [...new Set(visibleProducts.map((p) => p.category))];

  return (
    <section>
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setCategory('all')} className={`tab-btn ${category === 'all' ? 'active' : ''}`}>
            Barchasi
          </button>
          {productCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat.toLowerCase())}
              className={`tab-btn ${category === cat.toLowerCase() ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <select value={sort} onChange={(event) => setSort(event.target.value)} className="input-field sm:w-64">
          <option value="name">Nom bo'yicha</option>
          <option value="price-asc">Narx: pastdan yuqoriga</option>
          <option value="price-desc">Narx: yuqoridan pastga</option>
        </select>
      </div>

      <div className="grid gap-6">
        {visibleProducts.map((product, index) => (
          <Reveal key={product.id} delay={index * 0.04}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}