'use client';

import { Reveal } from '@/components/marketing';
import ProductionContent from '@/features/production';

export default function ProductionPage() {
  return (
    <main className="min-h-screen bg-dark pt-28">
      <section className="section-shell pb-14 pt-10">
        <Reveal className="max-w-4xl">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-accent/80">Production capacity</div>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-copy md:text-6xl">Ishlab chiqarish quvvati</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Kesish, jilolash, blok tayyorlash va dekorativ mahsulotlar ishlab chiqarish uchun sanoat jarayoni.
          </p>
        </Reveal>
      </section>

      <section className="section-shell pb-20">
        <ProductionContent />
      </section>
    </main>
  );
}
