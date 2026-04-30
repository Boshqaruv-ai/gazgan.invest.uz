'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MapPin, Route, Train, Truck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { quarries } from '@/lib/quarries';

export default function QuarryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const quarry = quarries.find((item) => item.slug === slug);

  if (!quarry) {
    return (
      <main className="min-h-screen bg-dark pt-32">
        <div className="section-shell text-center">
          <h1 className="text-3xl font-bold text-copy">Kon topilmadi</h1>
          <Link href="/quarries">
            <Button className="mt-6">Konlarga qaytish</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark pt-28">
      <section className="section-shell pb-20 pt-8">
        <Link href="/quarries" className="mb-7 inline-flex text-sm font-medium text-muted transition-colors hover:text-accent">
          Konlar ro‘yxatiga qaytish
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <Image
              src={quarry.image}
              alt={quarry.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="rounded-full bg-accent px-3 py-1 text-sm font-bold text-dark">{quarry.type}</span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-copy">{quarry.name}</h1>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <p className="text-lg leading-8 text-muted">{quarry.fullDescription}</p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xs text-muted">Indikativ zaxira</div>
                  <div className="mt-2 text-2xl font-bold text-accent">{quarry.reserves}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xs text-muted">Zichlik</div>
                  <div className="mt-2 text-2xl font-bold text-copy">{quarry.density}</div>
                </div>
                <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <MapPin className="h-4 w-4 text-accent" />
                    Joylashuv
                  </div>
                  <div className="mt-2 font-semibold text-copy">{quarry.location}</div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-2xl font-bold tracking-tight text-copy">Logistika</h2>
              <div className="mt-5 grid gap-3">
                {[
                  { icon: Train, label: 'Temir yo‘l aloqasi' },
                  { icon: Truck, label: 'Avtomobil transporti' },
                  { icon: Route, label: 'Eksport yo‘nalishlari' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <item.icon className="h-5 w-5 text-accent" />
                    <span className="font-medium text-copy">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-copy">Xususiyatlar</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {quarry.features.map((feature) => (
                <span key={feature} className="rounded-full bg-white/[0.04] px-3 py-2 text-sm text-muted">{feature}</span>
              ))}
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-copy">Qo‘llanilishi</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {quarry.uses.map((use) => (
                <span key={use} className="rounded-full bg-accent/10 px-3 py-2 text-sm text-accent">{use}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/about#contact">
            <Button size="lg" className="w-full sm:w-auto">Investor bilan bog‘lanish</Button>
          </Link>
          <Link href="/products">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">Mahsulotlarni ko‘rish</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
