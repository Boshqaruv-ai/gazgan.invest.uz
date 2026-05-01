'use client';

import { useEffect, useState } from 'react';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { ErrorState, LoadingState } from '@/components/ui/ScreenState';
import type { Project } from '@/lib/projects';

interface ProjectsResponse {
  projects?: Project[];
  error?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadProjects() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/projects', { cache: 'no-store' });
      const payload = await response.json() as ProjectsResponse;
      if (!response.ok || !payload.projects) {
        throw new Error(payload.error || 'Loyihalar yuklanmadi.');
      }

      setProjects(payload.projects);
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

  return (
    <main className="pb-6">
      <section>
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-gold">Loyihalar</p>
        <h1 className="mt-2 text-[28px] font-bold leading-[1.35] tracking-tight text-copy">Investitsiya loyihalari</h1>
        <p className="mt-3 text-[15px] leading-[1.6] text-muted">
          ROI, payback, risk va kapital talabi bo&apos;yicha eng muhim loyihalarni Supabase DB orqali solishtiring.
        </p>
      </section>

      <section className="mt-7 space-y-4">
        {loading ? (
          <LoadingState title="Loyihalar yuklanmoqda..." />
        ) : error ? (
          <ErrorState message={error} onRetry={() => void loadProjects()} />
        ) : projects.length === 0 ? (
          <ErrorState title="Loyiha topilmadi" message="Supabase projects jadvalida faol loyiha yo'q." />
        ) : (
          projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} priority={index === 0} variant="list" />
          ))
        )}
      </section>
    </main>
  );
}