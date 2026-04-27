'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

const products = [
  {
    id: 'oq-marmar-plitka',
    name: 'Oq Marmar Plitka',
    category: 'marble',
    colors: ['Oq'],
    dimensions: '60x60x2 sm',
    price: 45,
    unit: 'm²',
    finish: 'Jilolangan',
  },
  {
    id: 'pushti-marmar-plitka',
    name: 'Pushti Marmar Plitka',
    category: 'marble',
    colors: ['Pushti'],
    dimensions: '60x60x2 sm',
    price: 55,
    unit: 'm²',
    finish: 'Jilolangan',
  },
  {
    id: 'kulrang-granit-plitka',
    name: 'Kulrang Granit Plitka',
    category: 'granite',
    colors: ['Kulrang'],
    dimensions: '60x60x3 sm',
    price: 65,
    unit: 'm²',
    finish: 'Kuyidrilgan',
  },
  {
    id: 'qora-granit-blok',
    name: 'Qora Granit Blok',
    category: 'granite',
    colors: ['Qora'],
    dimensions: '3x2x1.5 m',
    price: 2500,
    unit: 'm³',
    finish: 'Xom',
  },
  {
    id: 'oltin-marmar-plitka',
    name: 'Oltin Marmar Plitka',
    category: 'marble',
    colors: ['Oltin'],
    dimensions: '60x60x2 sm',
    price: 75,
    'unit': 'm²',
    finish: 'Jilolangan',
  },
  {
    id: 'qizil-granit-plitka',
    name: 'Qizil Granit Plitka',
    category: 'granite',
    colors: ['Qizil'],
    dimensions: '60x60x3 sm',
    price: 85,
    'unit': 'm²',
    finish: 'Jilolangan',
  },
];

export default function ProductsPage() {
  const [category, setCategory] = React.useState('all');
  const [color, setColor] = React.useState('all');
  const [sort, setSort] = React.useState('name');

  const filteredProducts = products.filter(p => {
    if (category !== 'all' && p.category !== category) return false;
    if (color !== 'all' && !p.colors.includes(color)) return false;
    return true;
  });

  const colors = [...new Set(products.flatMap(p => p.colors))];

  return (
    <div className="min-h-screen pt-24 pb-20 hero-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 pt-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Mahsulotlar Katalogi</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Yuqori sifatli marmar va granit mahsulotlari
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12">
          <div className="flex gap-2">
            <button
              onClick={() => setCategory('all')}
              className={`filter-btn text-sm px-4 py-2 rounded-lg border border-accent/30 ${category === 'all' ? 'active bg-accent text-dark' : 'text-gray-400'}`}
            >
              Barchasi
            </button>
            <button
              onClick={() => setCategory('marble')}
              className={`filter-btn text-sm px-4 py-2 rounded-lg border border-accent/30 ${category === 'marble' ? 'active bg-accent text-dark' : 'text-gray-400'}`}
            >
              Marmar
            </button>
            <button
              onClick={() => setCategory('granite')}
              className={`filter-btn text-sm px-4 py-2 rounded-lg border border-accent/30 ${category === 'granite' ? 'active bg-accent text-dark' : 'text-gray-400'}`}
            >
              Granit
            </button>
          </div>

          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="input-field w-auto"
          >
            <option value="all">Barcha ranglar</option>
            {colors.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input-field w-auto"
          >
            <option value="name">Nom bo'yicha</option>
            <option value="price-asc">Narx (oshib boradi)</option>
            <option value="price-desc">Narx (kamayib boradi)</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} hover className="overflow-hidden">
              <div className={`h-48 relative ${
                product.category === 'marble'
                  ? 'bg-gradient-to-br from-gray-200 to-gray-300'
                  : 'bg-gradient-to-br from-gray-500 to-gray-700'
              }`}>
                <div className="absolute top-4 right-4 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">
                  {product.category === 'marble' ? 'Marmar' : 'Granit'}
                </div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {product.colors.map(color => (
                    <span key={color} className="bg-dark/70 text-white text-xs px-2 py-1 rounded">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{product.dimensions}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Ishlov berish:</span>
                    <span className="text-white">{product.finish}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Narx:</span>
                    <span className="text-accent font-bold">${product.price}/{product.unit}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">Batafsil →</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}