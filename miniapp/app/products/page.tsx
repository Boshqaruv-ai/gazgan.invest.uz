'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useFeaturedProducts } from '@/hooks/useFeaturedProducts';
import { MiniAppHeader } from '@/components/layout/MiniAppHeader';
import { productCategoryLabel, formatProductPrice, type FeaturedProduct } from '@/lib/products';
import { Boxes, ArrowLeft } from 'lucide-react';

export default function ProductsPage() {
  const { products, loading } = useFeaturedProducts();

  return (
    <div className="screen-shell">
      <MiniAppHeader />
      <div className="p-4">
        {loading ? (
          <p className="text-center text-muted">Yuklanmoqda...</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-[18px] border border-white/10 bg-card p-4">
            <div className="flex items-center gap-3">
              <Boxes className="h-5 w-5 text-gold" />
              <p className="text-[15px] font-black text-copy">Mahsulotlar yo'q</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: FeaturedProduct }) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-white/10 bg-card shadow-premium">
      <div className="relative h-[90px]">
        <Image 
          src={product.image} 
          alt={product.title} 
          fill 
          sizes="200px" 
          className="object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="90" viewBox="0 0 200 90"%3E%3Crect fill="%23121826" width="200" height="90"/%3E%3C/svg%3E';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A]/82 via-transparent to-transparent" />
        <span className="absolute left-2 top-2 rounded-full bg-gold px-2 py-0.5 text-[9px] font-black text-[#0B0F1A]">
          {productCategoryLabel(product.category)}
        </span>
      </div>
      <div className="p-2.5">
        <h3 className="line-clamp-2 text-[12px] font-black leading-[1.25] text-copy">{product.title}</h3>
        <p className="mt-1 text-[13px] font-black text-gold">{formatProductPrice(product)}</p>
      </div>
    </div>
  );
}