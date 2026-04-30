'use client';

import { useState } from 'react';
import { BadgeCheck, Cog, Factory, Gauge, ScanSearch, Sparkles } from 'lucide-react';
import { Reveal, StatCard } from '@/components/marketing';
import { cn } from '@/lib/utils';
import { productionData } from '@/lib/production';

const tabs = ['Sexlar', 'Uskunalar', 'Sifat nazorati'];

const statCards = [
  { value: productionData.stats.plants, suffix: '', label: 'Qayta ishlash sexlari', eyebrow: 'Plants' },
  { value: 2, suffix: 'M+', label: 'm² yillik quvvat', eyebrow: 'Capacity' },
  { value: productionData.stats.machines, suffix: '+', label: 'Dastgohlar', eyebrow: 'Machines' },
  { value: productionData.stats.quality, suffix: '%', label: 'Sifat indeksi', eyebrow: 'Quality' },
];

export function ProductionStats() {
  return (
    <div className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => (
        <Reveal key={stat.label} delay={index * 0.05}>
          <StatCard {...stat} />
        </Reveal>
      ))}
    </div>
  );
}

export function ProductionTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="mb-8 flex w-fit flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(index)}
            className={cn(
              'rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300',
              activeTab === index ? 'bg-accent text-dark shadow-gold' : 'text-muted hover:bg-white/[0.04] hover:text-copy'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="min-h-[360px]">
        {activeTab === 0 && <WorkshopsView />}
        {activeTab === 1 && <EquipmentView />}
        {activeTab === 2 && <QualityView />}
      </div>
    </div>
  );
}

function WorkshopsView() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {productionData.lines.map((line, index) => (
        <Reveal key={line.id} delay={index * 0.05}>
          <div className="glass-card h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/35">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Factory className="h-6 w-6" />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-copy">{line.name}</h3>
                <p className="mt-1 font-semibold text-accent">{line.capacity}/yil</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">{line.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {line.processes.map((process) => (
                <span key={process} className="rounded-full bg-white/[0.04] px-3 py-1 text-xs font-medium text-muted">
                  {process}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function EquipmentView() {
  return (
    <div className="grid gap-4">
      {productionData.equipment.map((item, index) => (
        <Reveal key={item.name} delay={index * 0.04}>
          <div className="glass-card grid gap-4 rounded-2xl p-5 transition-all duration-300 hover:border-accent/35 sm:grid-cols-[1fr_0.7fr_1fr_auto] sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <Cog className="h-5 w-5" />
              </div>
              <div className="font-bold text-copy">{item.name}</div>
            </div>
            <div className="text-sm text-muted">{item.country}</div>
            <div className="text-sm text-muted">{item.task}</div>
            <div className="w-fit rounded-full bg-accent/10 px-3 py-1 text-sm font-bold text-accent">{item.count} ta</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function QualityView() {
  const quality = productionData.aiQuality;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="glass-card rounded-2xl p-8">
        <ScanSearch className="mb-5 h-8 w-8 text-accent" />
        <h3 className="text-2xl font-bold tracking-tight text-copy">Sifat nazorati</h3>
        <p className="mt-4 text-sm leading-6 text-muted">Rang, tekstura, o‘lcham va sirt sifatini standartlashtirilgan nazorat bosqichlari orqali baholash.</p>
        <div className="mt-6 grid gap-3">
          {[
            'Yoriq va nuqsonlarni aniqlash',
            'Rang va tekstura tasnifi',
            'O‘lcham aniqligini tekshirish',
            'Mahsulotni saralash',
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-muted">
              <BadgeCheck className="h-5 w-5 text-accent" />
              {feature}
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-8">
        <Sparkles className="mb-5 h-8 w-8 text-accent" />
        <h3 className="text-2xl font-bold tracking-tight text-copy">Namuna statistikasi</h3>
        <div className="mt-7 space-y-6">
          {[
            { label: 'Yuqori sifat (A)', value: quality.gradeA, color: 'from-emerald-400 to-green-500' },
            { label: 'O‘rtacha sifat (B)', value: quality.gradeB, color: 'from-accent to-amber-500' },
            { label: 'Saralash kerak (C)', value: quality.gradeC, color: 'from-red-400 to-rose-500' },
          ].map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-muted">{item.label}</span>
                <span className="font-bold text-copy">{item.value}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div className={cn('h-full rounded-full bg-gradient-to-r', item.color)} style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductionContent() {
  return (
    <>
      <ProductionStats />
      <ProductionTabs />
    </>
  );
}
