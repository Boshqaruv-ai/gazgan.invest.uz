import { BarChart3, Gem, Globe2, ShieldCheck, Truck, Users2 } from 'lucide-react';
import { Reveal } from '@/components/marketing';

const advantages = [
  {
    icon: Gem,
    title: 'Premium tosh katalogi',
    description: 'Marmar va granit mahsulotlari, o‘lcham, ishlov va narx ssenariylari aniq ko‘rinishda.',
  },
  {
    icon: ShieldCheck,
    title: 'Investor ishonchi',
    description: 'ROI, payback va risklar ochiq ko‘rsatiladi. Yakuniy shartlar yozma kelishuvda tasdiqlanadi.',
  },
  {
    icon: Truck,
    title: 'Logistika ustunligi',
    description: 'Navoiy markazi orqali temir yo‘l, avtomobil va eksport yo‘nalishlariga qulay chiqish.',
  },
  {
    icon: BarChart3,
    title: 'ROI tahlili',
    description: 'Loyiha miqdori, payback muddati va daromad profili tez solishtiriladi.',
  },
  {
    icon: Globe2,
    title: 'Eksportga tayyor format',
    description: 'Slab, plitka, blok va dekorativ mahsulotlar bo‘yicha B2B talablarni qabul qiladi.',
  },
  {
    icon: Users2,
    title: 'Tez lead oqimi',
    description: 'Investor, xaridor va hamkor so‘rovlari yagona premium lead form orqali keladi.',
  },
];

export function AdvantagesSection() {
  return (
    <section className="section-shell py-20">
      <Reveal className="mx-auto mb-12 max-w-3xl text-center">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-accent/80">Why Gozgon</div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-copy md:text-4xl">Ishonch, sanoat va kon salohiyati</h2>
        <p className="mt-4 text-muted">Platforma mahsulot, kon, ishlab chiqarish va investitsiya qarorini bir joyda bog‘laydi.</p>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {advantages.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.04}>
            <div className="glass-card h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/35">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-copy">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
