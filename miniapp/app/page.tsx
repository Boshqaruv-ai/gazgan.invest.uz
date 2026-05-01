'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BadgeDollarSign, Clock3, Gem, MessageCircle, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { StatCard } from '@/components/cards/StatCard';
import { useAppTelegramUser } from '@/components/layout/TelegramUserProvider';
import { CTAButton } from '@/components/ui/CTAButton';
import { ErrorState, LoadingState } from '@/components/ui/ScreenState';
import type { Project, ProjectStats } from '@/lib/projects';

interface ProjectsResponse {
  projects?: Project[];
  stats?: ProjectStats;
  error?: string;
}

export default function HomePage() {
  const { user } = useAppTelegramUser();
  const displayName = user?.first_name || user?.username || 'Investor';
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadProjects() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/projects', { cache: 'no-store' });
      const payload = await response.json() as ProjectsResponse;
      if (!response.ok || !payload.projects || !payload.stats) {
        throw new Error(payload.error || 'Loyihalar yuklanmadi.');
      }

      setProjects(payload.projects);
      setStats(payload.stats);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Loyihalar yuklanmadi.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadProjects();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const statCards = useMemo(() => [
    { label: 'Faol loyihalar', value: String(stats?.activeProjects ?? 0), detail: 'Supabase DB', icon: Gem },
    { label: 'Indikativ ROI', value: stats?.roiRange ?? '...', detail: 'yillik ssenariy', icon: TrendingUp },
    { label: 'Payback', value: stats?.paybackRange ?? '...', detail: 'loyihaga qarab', icon: Clock3 },
    { label: 'Lead support', value: '24/7', detail: 'AI va menejer', icon: ShieldCheck },
  ], [stats]);

  return (
    <main className="overflow-x-hidden px-5 pb-6 pt-[calc(18px+var(--safe-top))]">
      <section className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">Xush kelibsiz, {displayName}</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-copy">Gazgan Invest</h1>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-base font-extrabold text-gold">
          {displayName.slice(0, 1).toUpperCase()}
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-card p-5 shadow-premium">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-gold">
          <Sparkles className="h-3.5 w-3.5" />
          Premium investitsiya
        </div>
        <h2 className="mt-5 text-[28px] font-extrabold leading-tight tracking-tight text-copy">
          <span className="block">Marmar va granit</span>
          <span className="block">loyihalariga kirish</span>
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          ROI va paybackni ko&apos;ring. Qiziqqan loyiha bo&apos;yicha menejer bilan bog&apos;laning.
        </p>
        <div className="mt-5 grid gap-3">
          <CTAButton href="/projects" icon={BadgeDollarSign}>
            Investitsiya qilish
          </CTAButton>
          <CTAButton href="/chat" variant="outline" icon={MessageCircle}>
            Menejer bilan aloqa
          </CTAButton>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-2 gap-3">
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="mt-7">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">Top loyihalar</p>
            <h2 className="mt-1 text-xl font-bold text-copy">Yuqori qaytim ssenariylari</h2>
          </div>
          <Link href="/projects" className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
            Barchasi
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {loading ? (
          <LoadingState title="Top loyihalar yuklanmoqda..." />
        ) : error ? (
          <ErrorState message={error} onRetry={() => void loadProjects()} />
        ) : (
          <div className="miniapp-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} priority={index === 0} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-7 rounded-[24px] border border-gold/20 bg-gold/10 p-5">
        <p className="text-sm font-semibold text-gold">Kapital bo&apos;yicha maslahat kerakmi?</p>
        <p className="mt-2 text-sm leading-6 text-muted">
          Investitsiya miqdori, risk profili va loyiha hujjatlari bo&apos;yicha savol yuboring.
        </p>
        <CTAButton href="/chat" variant="outline" icon={MessageCircle} className="mt-4 w-full">
          Menejer bilan aloqa
        </CTAButton>
      </section>
    </main>
  );
}
