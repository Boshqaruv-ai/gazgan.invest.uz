'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { ErrorState, LoadingState } from '@/components/ui/ScreenState';
import { useProjects } from '@/hooks/useProjects';
import { useTelegramWebApp } from '@/hooks/useTelegramWebApp';
import type { ProjectType } from '@/lib/projects';
import { cn } from '@/lib/utils';
import { useMemo, useState } from 'react';

const tabs: Array<{ label: string; value: 'all' | ProjectType }> = [
  { label: 'Barchasi', value: 'all' },
  { label: 'Qurilish', value: 'construction' },
  { label: 'Qayta ishlash', value: 'processing' },
  { label: 'Boshqalar', value: 'other' },
];

export function ProjectsScreen() {
  useTelegramWebApp();
  const [activeTab, setActiveTab] = useState<'all' | ProjectType>('all');
  const { projects, loading, error, reload } = useProjects();

  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') return projects;
    return projects.filter((project) => project.projectType === activeTab);
  }, [activeTab, projects]);

  return (
    <main className="screen-shell">
      <header className="screen-topbar">
        <Link href="/" className="topbar-icon" aria-label="Ortga">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-[18px] font-extrabold text-copy">Loyihalar</h1>
        <button type="button" className="topbar-icon" aria-label="Filtr">
          <SlidersHorizontal className="h-5 w-5" />
        </button>
      </header>

      <section className="miniapp-scrollbar -mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-1">
        {tabs.map((tab) => {
          const active = tab.value === activeTab;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                'h-[36px] shrink-0 rounded-full border px-4 text-[13px] font-bold transition duration-300',
                active
                  ? 'border-gold bg-gold text-[#0B0F1A] shadow-gold'
                  : 'border-white/10 bg-white/[0.03] text-copy'
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </section>

      <section className="mt-4 space-y-4">
        {loading ? (
          <LoadingState title="Loyihalar yuklanmoqda..." />
        ) : error ? (
          <ErrorState message={error} onRetry={() => void reload()} />
        ) : filteredProjects.length === 0 ? (
          <ErrorState title="Loyiha topilmadi" message="Bu bo'limda Supabase orqali tasdiqlangan loyiha yo'q." />
        ) : (
          filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProjectCard project={project} priority={index === 0} variant="list" />
            </motion.div>
          ))
        )}
      </section>
    </main>
  );
}
