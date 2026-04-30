'use client';

import { Route, Train, Truck } from 'lucide-react';
import { Reveal } from '@/components/marketing';
import { QuarriesList } from '@/features/quarries';

const logistics = [
  { icon: Train, title: 'Temir yo‘l', text: 'Navoiy orqali ichki bozor va eksport yo‘nalishlariga chiqish.' },
  { icon: Truck, title: 'Avtomobil yo‘llari', text: 'Kon, qayta ishlash sexlari va logistika markazi o‘rtasida tez yetkazish.' },
  { icon: Route, title: 'Eksport marshrutlari', text: 'Markaziy Osiyo va xalqaro xaridorlar uchun B2B yetkazib berish oqimi.' },
];

export default function QuarriesPage() {
  return (
    <main className="min-h-screen bg-dark pt-28">
      <section className="section-shell pb-12 pt-10">
        <Reveal className="max-w-4xl">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-accent/80">Quarry portfolio</div>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-copy md:text-6xl">Konlar va zaxiralar</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Marmar va granit konlari bo‘yicha zaxira, zichlik, lokatsiya va logistika ko‘rsatkichlari.
          </p>
        </Reveal>
      </section>

      <section className="section-shell grid gap-6 pb-16 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div className="glass-card relative min-h-[360px] overflow-hidden rounded-2xl p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(245,192,68,0.22),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]" />
            <div className="relative z-10">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-accent/80">Map preview</div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-copy">Navoiy logistika zonasi</h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-muted">Konlar, ishlab chiqarish sexlari va eksport yo‘nalishlarini birlashtiruvchi strategik hudud.</p>
            </div>
            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-3">
              {['G‘ozg‘on', 'Navoiy', 'Eksport'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/25 p-4 text-center backdrop-blur">
                  <div className="mx-auto mb-3 h-3 w-3 rounded-full bg-accent shadow-gold" />
                  <div className="text-sm font-semibold text-copy">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4">
          {logistics.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="glass-card rounded-2xl p-6">
                <item.icon className="mb-4 h-6 w-6 text-accent" />
                <h3 className="text-xl font-bold text-copy">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <QuarriesList />
      </section>
    </main>
  );
}
