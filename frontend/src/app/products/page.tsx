'use client';

import { LeadForm, Reveal } from '@/components/marketing';
import { ProductsList } from '@/features/products';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-dark pt-28">
      <section className="section-shell pb-12 pt-10">
        <Reveal className="max-w-4xl">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-accent/80">Product catalog</div>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-copy md:text-6xl">Marmar va granit mahsulotlari</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Slab, plitka, blok va dekorativ mahsulotlar bo‘yicha specs, taxminiy narx va B2B buyurtma oqimi.
          </p>
        </Reveal>
      </section>

      <section className="section-shell pb-20">
        <ProductsList />
      </section>

      <section id="lead" className="section-shell pb-20">
        <LeadForm
          compact
          defaultInterest="Mahsulot xaridi"
          title="Mahsulot bo‘yicha so‘rov"
          subtitle="Mahsulot turi, hajm, o‘lcham va yetkazib berish yo‘nalishini yozing."
        />
      </section>
    </main>
  );
}
