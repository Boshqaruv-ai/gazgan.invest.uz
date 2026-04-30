'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, PackageCheck, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import type { Product } from '@/lib/products';

const phone = '998791234567';

export function ProductCard({ product }: { product: Product }) {
  const whatsappText = encodeURIComponent(`${product.name} bo‘yicha bulk narx so‘rayman.`);

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="glass-card grid overflow-hidden rounded-2xl md:grid-cols-[0.9fr_1.1fr]"
    >
      <div className="relative min-h-64 bg-white/[0.03]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 34vw, 100vw"
          className="object-cover"
        />
        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold text-copy backdrop-blur">
          {product.category}
        </div>
      </div>

      <div className="flex flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-copy">{product.name}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{product.description}</p>
          </div>
          <div className="rounded-2xl border border-accent/25 bg-accent/10 px-3 py-2 text-right">
            <div className="text-xs text-accent/80">Taxm. narx</div>
            <div className="font-bold text-accent">~${product.price}/{product.priceUnit}</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <div className="text-muted">O‘lcham</div>
            <div className="mt-1 font-semibold text-copy">{product.size}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <div className="text-muted">Ishlov</div>
            <div className="mt-1 font-semibold text-copy">{product.finish}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <div className="text-muted">Rang</div>
            <div className="mt-1 font-semibold text-copy">{product.color}</div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {product.features.map((feature) => (
            <span key={feature} className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-3 py-1 text-xs text-muted">
              <PackageCheck className="h-3.5 w-3.5 text-accent" />
              {feature}
            </span>
          ))}
        </div>

        <div className="mt-auto grid gap-3 pt-7 sm:grid-cols-3">
          <Link href={`/products/${product.slug}`}>
            <Button className="w-full" size="sm">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Buyurtma berish
            </Button>
          </Link>
          <Link href="/about#contact">
            <Button className="w-full" size="sm" variant="outline">Bulk narx so‘rash</Button>
          </Link>
          <a href={`https://wa.me/${phone}?text=${whatsappText}`} target="_blank" rel="noreferrer">
            <Button className="w-full" size="sm" variant="outline">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
