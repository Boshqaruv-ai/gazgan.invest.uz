'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MessageCircle, PackageCheck, ShoppingBag } from 'lucide-react';
import { LeadForm } from '@/components/marketing';
import { Button } from '@/components/ui/Button';
import { products } from '@/lib/products';

const phone = '998791234567';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-dark pt-32">
        <div className="section-shell text-center">
          <h1 className="text-3xl font-bold text-copy">Mahsulot topilmadi</h1>
          <Link href="/products">
            <Button className="mt-6">Katalogga qaytish</Button>
          </Link>
        </div>
      </main>
    );
  }

  const whatsappText = encodeURIComponent(`${product.name} bo‘yicha bulk narx so‘rayman.`);

  return (
    <main className="min-h-screen bg-dark pt-28">
      <section className="section-shell pb-20 pt-8">
        <Link href="/products" className="mb-7 inline-flex text-sm font-medium text-muted transition-colors hover:text-accent">
          Mahsulotlar ro‘yxatiga qaytish
        </Link>

        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/55 to-transparent" />
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">{product.category}</span>
              <span className="rounded-full bg-white/[0.05] px-3 py-1 text-sm text-muted">{product.color}</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-copy">{product.name}</h1>
            <p className="mt-4 text-lg leading-8 text-muted">{product.description}</p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs text-muted">O‘lcham</div>
                <div className="mt-2 font-bold text-copy">{product.size}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs text-muted">Ishlov</div>
                <div className="mt-2 font-bold text-copy">{product.finish}</div>
              </div>
              <div className="rounded-2xl border border-accent/25 bg-accent/10 p-4">
                <div className="text-xs text-accent/80">Taxm. narx</div>
                <div className="mt-2 font-bold text-accent">~${product.price}/{product.priceUnit}</div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {product.features.map((feature) => (
                <span key={feature} className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1.5 text-sm text-muted">
                  <PackageCheck className="h-4 w-4 text-accent" />
                  {feature}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Link href="#lead">
                <Button className="w-full">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Buyurtma berish
                </Button>
              </Link>
              <Link href="#lead">
                <Button variant="outline" className="w-full">Bulk narx so‘rash</Button>
              </Link>
              <a href={`https://wa.me/${phone}?text=${whatsappText}`} target="_blank" rel="noreferrer">
                <Button variant="outline" className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="lead" className="section-shell pb-20">
        <LeadForm
          compact
          defaultInterest="Bulk narx"
          title={`${product.name} bo‘yicha so‘rov`}
          subtitle="Hajm, o‘lcham, manzil va kerakli yetkazib berish muddatini yozing."
        />
      </section>
    </main>
  );
}
