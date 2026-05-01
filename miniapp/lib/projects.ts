export type ProjectCategory = 'Marmar' | 'Granit' | 'Boshqa';
export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface ProjectTimelineItem {
  title: string;
  description: string;
  quarter: string;
}

export interface RoiBreakdownPoint {
  year: string;
  value: number;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  roi: number;
  payback: number;
  amount: number;
  image: string;
  highlight: boolean;
  description: string;
  location: string;
  riskLevel: RiskLevel;
  timeline: ProjectTimelineItem[];
  roiBreakdown: RoiBreakdownPoint[];
}

export interface ProjectStats {
  activeProjects: number;
  roiRange: string;
  paybackRange: string;
}

export const GENERAL_PROJECT_ID = 'general-consultation';

export function toProject(row: {
  id: string;
  title: string;
  category: string;
  roi: number;
  payback: number;
  amount: number;
  image: string;
  highlight: boolean;
  description: string;
  location: string;
  risk_level: string;
  timeline: unknown;
  roi_breakdown: unknown;
}): Project {
  return {
    id: row.id,
    title: row.title,
    category: toCategory(row.category),
    roi: row.roi,
    payback: row.payback,
    amount: Number(row.amount),
    image: row.image,
    highlight: row.highlight,
    description: row.description,
    location: row.location,
    riskLevel: toRiskLevel(row.risk_level),
    timeline: toTimeline(row.timeline),
    roiBreakdown: toRoiBreakdown(row.roi_breakdown),
  };
}

export function getProjectStats(projects: Project[]): ProjectStats {
  if (projects.length === 0) {
    return {
      activeProjects: 0,
      roiRange: '0%',
      paybackRange: '0 yil',
    };
  }

  const roiValues = projects.map((project) => project.roi);
  const paybackValues = projects.map((project) => project.payback);
  const minRoi = Math.min(...roiValues);
  const maxRoi = Math.max(...roiValues);
  const minPayback = Math.min(...paybackValues);
  const maxPayback = Math.max(...paybackValues);

  return {
    activeProjects: projects.length,
    roiRange: minRoi === maxRoi ? `${maxRoi}%` : `${minRoi}-${maxRoi}%`,
    paybackRange: minPayback === maxPayback ? `${maxPayback} yil` : `${minPayback}-${maxPayback} yil`,
  };
}

function toCategory(value: string): ProjectCategory {
  if (value === 'Marmar' || value === 'Granit' || value === 'Boshqa') return value;
  return 'Boshqa';
}

function toRiskLevel(value: string): RiskLevel {
  if (value === 'Low' || value === 'Medium' || value === 'High') return value;
  return 'Medium';
}

function toTimeline(value: unknown): ProjectTimelineItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const source = item as Record<string, unknown>;
      return {
        quarter: stringValue(source.quarter),
        title: stringValue(source.title),
        description: stringValue(source.description),
      };
    })
    .filter((item): item is ProjectTimelineItem => Boolean(item && item.quarter && item.title && item.description));
}

function toRoiBreakdown(value: unknown): RoiBreakdownPoint[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const source = item as Record<string, unknown>;
      const numericValue = typeof source.value === 'number' ? source.value : Number(source.value);
      return {
        year: stringValue(source.year),
        value: Number.isFinite(numericValue) ? numericValue : 0,
      };
    })
    .filter((item): item is RoiBreakdownPoint => Boolean(item && item.year));
}

function stringValue(value: unknown) {
  return typeof value === 'string' ? value : '';
}
