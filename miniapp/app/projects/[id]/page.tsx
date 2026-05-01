'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProjectDetailClient } from '@/components/projects/ProjectDetailClient';
import { ErrorState, LoadingState } from '@/components/ui/ScreenState';
import type { Project } from '@/lib/projects';

interface ProjectResponse {
  project?: Project;
  error?: string;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const id = useMemo(() => {
    const raw = params?.id;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params]);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadProject(projectId: string) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/${encodeURIComponent(projectId)}`, { cache: 'no-store' });
      const payload = await response.json() as ProjectResponse;
      if (!response.ok || !payload.project) {
        throw new Error(payload.error || 'Loyiha yuklanmadi.');
      }

      setProject(payload.project);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Loyiha yuklanmadi.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      const timer = window.setTimeout(() => {
        void loadProject(id);
      }, 0);

      return () => window.clearTimeout(timer);
    }
  }, [id]);

  if (!id) {
    return (
      <main className="px-5 pb-6 pt-[calc(18px+var(--safe-top))]">
        <ErrorState message="Loyiha ID topilmadi." />
      </main>
    );
  }

  if (loading) {
    return (
      <main className="px-5 pb-6 pt-[calc(18px+var(--safe-top))]">
        <LoadingState title="Loyiha yuklanmoqda..." />
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="px-5 pb-6 pt-[calc(18px+var(--safe-top))]">
        <ErrorState message={error || 'Loyiha topilmadi.'} onRetry={() => void loadProject(id)} />
      </main>
    );
  }

  return <ProjectDetailClient project={project} />;
}
