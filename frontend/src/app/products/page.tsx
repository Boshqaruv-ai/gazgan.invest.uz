'use client';

import { ProductsList } from '@/features/products';

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 hero-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 pt-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Mahsulotlar Katalogi</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Yuqori sifatli marmar va granit mahsulotlari
          </p>
        </div>

        <ProductsList />
      </div>
    </div>
  );
}