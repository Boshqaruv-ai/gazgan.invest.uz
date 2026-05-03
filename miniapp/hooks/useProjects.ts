'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Project, ProjectStats } from '@/lib/projects';
import { fetchProjects } from '@/services/projects';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = await fetchProjects();
      setProjects(payload.projects);
      setStats(payload.stats);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Loyihalar yuklanmadi.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void reload();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [reload]);

  return {
    projects,
    stats,
    loading,
    error,
    reload,
  };
}
