'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, PackageCheck, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const phone = '998791234567';

interface Product {
  id: string | number;
  title?: string;
  name?: string;
  category: string;
  price: number;
  priceUnit?: string;
  unit?: string;
  currency?: string;
  image: string;
  imageAlt?: string;
  description?: string | null;
}

export function ProductCard({ product }: { product: Product }) {
  const title = product.title || product.name || 'Mahsulot';
  const desc = product.description || '';
  const whatsappText = encodeURIComponent(`${title} bo'yicha bulk narx so'rayman.`);

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="glass-card grid overflow-hidden rounded-2xl md:grid-cols-[0.9fr_1.1fr]"
    >
      <div className="relative min-h-64 bg-white/[0.03]">
        <Image
          src={product.image}
          alt={product.imageAlt || title}
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
            <h3 className="text-2xl font-bold tracking-tight text-copy">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{desc}</p>
          </div>
          <div className="rounded-2xl border border-accent/25 bg-accent/10 px-3 py-2 text-right">
            <div className="text-xs text-accent/80">Taxm. narx</div>
            <div className="font-bold text-accent">~{product.price} {product.currency ? product.currency : '$'}/{product.priceUnit || product.unit}</div>
          </div>
        </div>

        <div className="mt-auto grid gap-3 pt-7 sm:grid-cols-2">
          <Link href={`/products/${product.id}`}>
            <Button className="w-full" size="sm">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Buyurtma berish
            </Button>
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
