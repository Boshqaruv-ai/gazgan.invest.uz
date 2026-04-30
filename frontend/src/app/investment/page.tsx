'use client';

import { LeadForm, Reveal } from '@/components/marketing';
import { InvestmentBenefits, InvestmentProjects, InvestmentCalculator } from '@/features/investment';

export default function InvestmentPage() {
  return (
    <main className="min-h-screen bg-dark pt-28">
      <section className="section-shell pb-14 pt-10">
        <Reveal className="mx-auto max-w-4xl text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-accent/80">Investor platform</div>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-copy md:text-6xl">Investitsiya loyihalari</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
            Marmar, granit, kon rivojlantirish va ishlab chiqarish yo‘nalishlari bo‘yicha ROI ssenariylari.
          </p>
        </Reveal>
      </section>

      <section className="section-shell">
        <InvestmentBenefits />
        <InvestmentProjects />
        <InvestmentCalculator />
      </section>

      <section id="lead" className="section-shell py-20">
        <LeadForm
          compact
          defaultInterest="Investitsiya loyihasi"
          title="Investor bilan bog‘lanish"
          subtitle="Qaysi loyiha qiziqtirayotganini yozing. Jamoa kapital, payback va hujjatlar bo‘yicha aloqaga chiqadi."
        />
      </section>
    </main>
  );
}
