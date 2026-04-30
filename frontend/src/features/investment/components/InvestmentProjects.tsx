import { InvestmentCard, Reveal } from '@/components/marketing';
import { investments } from '@/lib/investments';

export function InvestmentProjects() {
  return (
    <section className="mb-20">
      <Reveal className="mb-10 max-w-3xl">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-accent/80">Investment portfolio</div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-copy md:text-4xl">Investitsiya loyihalari</h2>
        <p className="mt-4 text-muted">ROI, payback va kapital talabi bo‘yicha asosiy ssenariylarni tez solishtiring.</p>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-2">
        {investments.map((project) => (
          <Reveal key={project.id}>
            <InvestmentCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
