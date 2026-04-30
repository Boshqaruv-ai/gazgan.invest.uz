'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
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

const categoryColors: Record<string, string> = {
  Marmar: 'bg-blue-500',
  Granit: 'bg-red-500',
};

export function ProductsList() {
  const { category, setCategory, sort, setSort, products } = useProducts();

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setCategory('all')}
          className={`tab-btn ${category === 'all' ? 'active' : ''}`}
        >
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

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="bg-secondary/50 text-gray-300 text-sm px-4 py-2 rounded-lg border border-accent/20"
        >
          <option value="name">Nom bo&apos;yicha</option>
          <option value="price-asc">Narx: pastdan yuqoriga</option>
          <option value="price-desc">Narx: yuqoridan pastga</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id} hover className="overflow-hidden">
            <div className="relative h-40 overflow-hidden bg-dark">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
            </div>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${categoryColors[product.category]} text-white`}>
                  {product.category}
                </span>
                <span className="text-xs text-gray-500">{product.color}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-3">{product.size}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <span>Ishlov: {product.finish}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-accent">~${product.price}/{product.priceUnit}</span>
                <Link href={`/products/${product.slug}`}>
                  <button className="btn-outline text-sm py-1.5 px-3">Batafsil -&gt;</button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
