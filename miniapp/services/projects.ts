import type { Project, ProjectStats } from '@/lib/projects';

export interface ProjectsPayload {
  projects: Project[];
  stats: ProjectStats;
}

export async function fetchProjects(): Promise<ProjectsPayload> {
  const response = await fetch('/api/projects', { cache: 'no-store' });
  const payload = await response.json() as Partial<ProjectsPayload> & { error?: string };

  if (!response.ok || !payload.projects || !payload.stats) {
    throw new Error(payload.error || 'Loyihalar yuklanmadi.');
  }

  return {
    projects: payload.projects,
    stats: payload.stats,
  };
}

export async function fetchProject(projectId: string): Promise<Project> {
  const response = await fetch(`/api/projects/${encodeURIComponent(projectId)}`, { cache: 'no-store' });
  const payload = await response.json() as { project?: Project; error?: string };

  if (!response.ok || !payload.project) {
    throw new Error(payload.error || 'Loyiha yuklanmadi.');
  }

  return payload.project;
}

export interface CalculatorProjectOption {
  id: string;
  title: string;
  project_type: string;
  expected_return: number;
  payback_years: number;
  investment_required: number;
  riskLevel: string;
}

export async function fetchCalculatorProjects(): Promise<CalculatorProjectOption[]> {
  const response = await fetch('/api/calculator/projects', { cache: 'no-store' });
  const payload = await response.json() as { options?: CalculatorProjectOption[]; error?: string };

  if (!response.ok || !payload.options) {
    throw new Error(payload.error || 'Kalkulyator loyihalari yuklanmadi.');
  }

  return payload.options;
}
