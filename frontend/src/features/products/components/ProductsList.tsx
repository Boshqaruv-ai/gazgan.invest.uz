'use client';

import * as React from 'react';
import { ProductCard, Reveal } from '@/components/marketing';
import { products, productCategories } from '@/lib/products';

export function useProducts() {
  const [category, setCategory] = React.useState('all');
  const [sort, setSort] = React.useState('name');

  const filteredProducts = category === 'all'
    ? products
    : products.filter((product) => product.category.toLowerCase() === category);

  const sorted = [...filteredProducts].sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name);
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    return 0;
  });

  return { category, setCategory, sort, setSort, products: sorted };
}

export function ProductsList() {
  const { category, setCategory, sort, setSort, products: visibleProducts } = useProducts();

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
          <option value="name">Nom bo‘yicha</option>
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
