'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BadgeDollarSign, Clock3, MapPin, MessageCircle, ShieldAlert, TrendingUp, type LucideIcon } from 'lucide-react';
import { ChartCard } from '@/components/charts/ChartCard';
import { LeadModal } from '@/components/leads/LeadModal';
import type { Project } from '@/lib/projects';
import { cn, formatCurrencyCompact } from '@/lib/utils';

interface ProjectDetailClientProps {
  project: Project;
}

const riskStyles: Record<Project['riskLevel'], string> = {
  Low: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200',
  Medium: 'border-gold/25 bg-gold/10 text-gold',
  High: 'border-red-400/25 bg-red-400/10 text-red-200',
};

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [leadIntent, setLeadIntent] = useState<'invest' | 'contact' | null>(null);

  return (
    <main className="pb-24">
      <section className="relative h-[330px] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="390px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
        <div className="absolute left-5 right-5 top-[calc(18px+var(--safe-top))] flex items-center justify-between">
          <Link href="/projects" className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-copy backdrop-blur">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className={cn('rounded-full border px-3 py-1 text-xs font-extrabold', riskStyles[project.riskLevel])}>
            {project.riskLevel} risk
          </span>
        </div>
        <div className="absolute bottom-6 left-5 right-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">{project.category}</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-copy">{project.title}</h1>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted">
            <MapPin className="h-4 w-4 text-gold" />
            <span>{project.location}</span>
          </div>
        </div>
      </section>

      <section className="-mt-2 space-y-5 px-5">
        <div className="grid grid-cols-3 gap-3">
          <Metric icon={TrendingUp} label="ROI" value={`${project.roi}%`} />
          <Metric icon={Clock3} label="Payback" value={`${project.payback} yil`} />
          <Metric icon={BadgeDollarSign} label="Kapital" value={formatCurrencyCompact(project.amount)} />
        </div>

        <section className="rounded-[24px] border border-white/10 bg-card p-5">
          <h2 className="text-lg font-extrabold text-copy">Loyiha tavsifi</h2>
          <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>
        </section>

        <ChartCard title="ROI breakdown" data={project.roiBreakdown} />

        <section className="rounded-[24px] border border-white/10 bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-gold" />
            <h2 className="text-lg font-extrabold text-copy">Investitsiya timeline</h2>
          </div>
          <div className="space-y-4">
            {project.timeline.map((item) => (
              <div key={item.quarter} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-gold">{item.quarter}</p>
                <h3 className="mt-2 text-base font-extrabold text-copy">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </section>

      <div className="fixed bottom-[calc(82px+var(--safe-bottom))] left-0 z-40 w-full max-w-[390px] px-5 sm:left-1/2 sm:-translate-x-1/2">
        <div className="grid grid-cols-2 gap-3 rounded-[24px] border border-white/10 bg-ink/90 p-3 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setLeadIntent('invest')}
            className="gold-surface flex h-12 items-center justify-center gap-2 rounded-2xl text-sm font-extrabold text-ink shadow-gold"
          >
            <BadgeDollarSign className="h-4 w-4" />
            Invest
          </button>
          <button
            type="button"
            onClick={() => setLeadIntent('contact')}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-gold/25 bg-gold/10 text-sm font-extrabold text-gold"
          >
            <MessageCircle className="h-4 w-4" />
            Aloqa
          </button>
        </div>
      </div>

      <LeadModal
        open={leadIntent !== null}
        onClose={() => setLeadIntent(null)}
        projectId={project.id}
        projectTitle={project.title}
        intent={leadIntent ?? 'contact'}
      />
    </main>
  );
}

function Metric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-card p-3">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-2xl bg-gold/10 text-gold">
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-[11px] font-medium text-muted">{label}</p>
      <p className="mt-1 text-base font-extrabold text-copy">{value}</p>
    </div>
  );
}
