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
      <section className="relative h-[320px] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="390px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
        <div className="absolute left-5 right-5 top-[env(safe-area-inset-top,20px)] flex items-center justify-between">
          <Link href="/projects" className="flex h-[44px] w-[44px] items-center justify-center rounded-[14px] border border-white/10 bg-black/30 text-copy backdrop-blur transition-all active:scale-95">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className={cn('rounded-full border px-3 py-1.5 text-[11px] font-bold', riskStyles[project.riskLevel])}>
            {project.riskLevel} risk
          </span>
        </div>
        <div className="absolute bottom-6 left-5 right-5">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-gold">{project.category}</p>
          <h1 className="mt-2 text-[28px] font-bold leading-[1.35] text-copy">{project.title}</h1>
          <div className="mt-3 flex items-center gap-2 text-[14px] text-muted">
            <MapPin className="h-4 w-4 text-gold" />
            <span>{project.location}</span>
          </div>
        </div>
      </section>

      <section className="-mt-2 space-y-4 px-5 pt-4">
        <div className="grid grid-cols-3 gap-3">
          <Metric icon={TrendingUp} label="ROI" value={`${project.roi}%`} />
          <Metric icon={Clock3} label="Payback" value={`${project.payback} yil`} />
          <Metric icon={BadgeDollarSign} label="Kapital" value={formatCurrencyCompact(project.amount)} />
        </div>

        <section className="rounded-[20px] border border-white/10 bg-card p-5">
          <h2 className="text-[17px] font-semibold text-copy">Loyiha tavsifi</h2>
          <p className="mt-3 text-[15px] leading-[1.6] text-muted">{project.description}</p>
        </section>

        <ChartCard title="ROI breakdown" data={project.roiBreakdown} />

        <section className="rounded-[20px] border border-white/10 bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-gold" />
            <h2 className="text-[17px] font-semibold text-copy">Investitsiya timeline</h2>
          </div>
          <div className="space-y-3">
            {project.timeline.map((item) => (
              <div key={item.quarter} className="rounded-[14px] border border-white/10 bg-white/[0.04] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gold">{item.quarter}</p>
                <h3 className="mt-2 text-[15px] font-semibold text-copy">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.5] text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </section>

      <div className="fixed bottom-[calc(80px+env(safe-area-inset-bottom,0px))] left-0 z-40 w-full max-w-[390px] px-5">
        <div className="grid grid-cols-2 gap-3 rounded-[18px] border border-white/10 bg-ink/95 p-3 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setLeadIntent('invest')}
            className="gold-surface flex h-[48px] items-center justify-center gap-2 rounded-[12px] text-[14px] font-bold text-ink shadow-gold transition-all active:scale-95"
          >
            <BadgeDollarSign className="h-4 w-4" />
            Invest
          </button>
          <button
            type="button"
            onClick={() => setLeadIntent('contact')}
            className="flex h-[48px] items-center justify-center gap-2 rounded-[12px] border border-gold/30 bg-gold/10 text-[14px] font-bold text-gold transition-all hover:bg-gold/15 active:scale-95"
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
    <div className="rounded-[16px] border border-white/10 bg-card p-3.5">
      <div className="mb-2.5 flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-gold/10 text-gold">
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-[11px] font-medium text-muted">{label}</p>
      <p className="mt-1 text-[16px] font-bold text-copy">{value}</p>
    </div>
  );
}