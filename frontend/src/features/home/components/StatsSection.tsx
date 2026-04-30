import { Reveal, StatCard } from '@/components/marketing';

const stats = [
  { value: 6, label: 'Faol kon yo‘nalishlari', suffix: '' },
  { value: 2, label: 'm² yillik ishlab chiqarish quvvati', suffix: 'M+' },
  { value: 4, label: 'Investor ssenariylari', suffix: '' },
  { value: 45, label: 'Sanoat uskunalari', suffix: '+' },
];

export function StatsSection() {
  return (
    <section className="section-shell py-20">
      <Reveal className="mb-10 max-w-3xl">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-accent/80">Platform metrics</div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-copy md:text-4xl">Investor qarori uchun asosiy ko‘rsatkichlar</h2>
        <p className="mt-4 text-muted">Konlar, ishlab chiqarish quvvati va loyiha ssenariylari bitta premium portalda jamlangan.</p>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.06}>
            <StatCard {...stat} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
