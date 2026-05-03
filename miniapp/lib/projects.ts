export type ProjectCategory = 'Marmar' | 'Granit' | 'Boshqa';
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type ProjectType = 'construction' | 'processing' | 'other';
export type ProjectStatus = 'HOT' | 'NEW' | 'ACTIVE' | 'FUNDED';
export type TrustLevel = 'verified_government' | 'verified_private' | 'pending_verification' | 'unverified';

export interface ProjectTimelineItem {
  title: string;
  description: string;
  quarter: string;
}

export interface RoiBreakdownPoint {
  year: string;
  value: number;
}

export interface ProjectDocument {
  id: string;
  projectId: string;
  title: string;
  fileUrl: string;
  documentType: 'pdf' | 'certificate' | 'legal' | 'financial' | 'other';
  issuer: string | null;
  isVerified: boolean;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  projectType: ProjectType;
  status: ProjectStatus;
  roi: number;
  payback: number;
  paybackYears: number;
  expectedReturn: number;
  amount: number;
  investmentRequired: number;
  investmentRaised: number;
  fundingPercentage: number;
  spotsLeft: number | null;
  investorsCount: number;
  image: string;
  images: string[];
  galleryImages: string[];
  highlight: boolean;
  description: string;
  location: string;
  riskLevel: RiskLevel;
  trustLevel: TrustLevel;
  timeline: ProjectTimelineItem[];
  roiBreakdown: RoiBreakdownPoint[];
  documents: ProjectDocument[];
}

export interface ProjectStats {
  activeProjects: number;
  roiRange: string;
  paybackRange: string;
  totalInvestment: number;
  totalRaised: number;
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
  project_type?: string | null;
  status?: string | null;
  investment_required?: number | string | null;
  investment_raised?: number | string | null;
  funding_percentage?: number | string | null;
  spots_left?: number | null;
  investors_count?: number | null;
  payback_years?: number | string | null;
  expected_return?: number | null;
  images?: unknown;
  gallery_images?: unknown;
  trust_level?: string | null;
  project_documents?: unknown;
}): Project {
  const investmentRequired = numericValue(row.investment_required, Number(row.amount));
  const investmentRaised = numericValue(row.investment_raised, 0);
  const computedFunding = investmentRequired > 0 ? Math.round((investmentRaised / investmentRequired) * 100) : 0;

  return {
    id: row.id,
    title: row.title,
    category: toCategory(row.category),
    projectType: toProjectType(row.project_type),
    status: toProjectStatus(row.status, row.highlight),
    roi: row.roi,
    payback: row.payback,
    paybackYears: numericValue(row.payback_years, row.payback),
    expectedReturn: row.expected_return ?? row.roi,
    amount: Number(row.amount),
    investmentRequired,
    investmentRaised,
    fundingPercentage: clampPercentage(numericValue(row.funding_percentage, computedFunding)),
    spotsLeft: typeof row.spots_left === 'number' ? row.spots_left : null,
    investorsCount: typeof row.investors_count === 'number' ? row.investors_count : 0,
    image: row.image,
    images: toStringArray(row.images, row.image),
    galleryImages: toStringArray(row.gallery_images, row.image),
    highlight: row.highlight,
    description: row.description,
    location: row.location,
    riskLevel: toRiskLevel(row.risk_level),
    trustLevel: toTrustLevel(row.trust_level),
    timeline: toTimeline(row.timeline),
    roiBreakdown: toRoiBreakdown(row.roi_breakdown),
    documents: toDocuments(row.project_documents),
  };
}

export function getProjectStats(projects: Project[]): ProjectStats {
  if (projects.length === 0) {
    return {
      activeProjects: 0,
      roiRange: '0%',
      paybackRange: '0 yil',
      totalInvestment: 0,
      totalRaised: 0,
    };
  }

  const roiValues = projects.map((project) => project.expectedReturn);
  const paybackValues = projects.map((project) => project.paybackYears);
  const minRoi = Math.min(...roiValues);
  const maxRoi = Math.max(...roiValues);
  const minPayback = Math.min(...paybackValues);
  const maxPayback = Math.max(...paybackValues);

  return {
    activeProjects: projects.length,
    roiRange: minRoi === maxRoi ? `${maxRoi}%` : `${minRoi}-${maxRoi}%`,
    paybackRange: minPayback === maxPayback ? `${formatYears(minPayback)} yil` : `${formatYears(minPayback)}-${formatYears(maxPayback)} yil`,
    totalInvestment: projects.reduce((sum, project) => sum + project.investmentRequired, 0),
    totalRaised: projects.reduce((sum, project) => sum + project.investmentRaised, 0),
  };
}

function toCategory(value: string): ProjectCategory {
  if (value === 'Marmar' || value === 'Granit' || value === 'Boshqa') return value;
  return 'Boshqa';
}

function toProjectType(value: string | null | undefined): ProjectType {
  if (value === 'construction' || value === 'processing' || value === 'other') return value;
  return 'other';
}

function toProjectStatus(value: string | null | undefined, highlighted: boolean): ProjectStatus {
  if (value === 'HOT' || value === 'NEW' || value === 'ACTIVE' || value === 'FUNDED') return value;
  return highlighted ? 'HOT' : 'ACTIVE';
}

function toRiskLevel(value: string): RiskLevel {
  if (value === 'Low' || value === 'Medium' || value === 'High') return value;
  return 'Medium';
}

function toTrustLevel(value: string | null | undefined): TrustLevel {
  if (
    value === 'verified_government' ||
    value === 'verified_private' ||
    value === 'pending_verification' ||
    value === 'unverified'
  ) {
    return value;
  }

  return 'pending_verification';
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

function toDocuments(value: unknown): ProjectDocument[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const source = item as Record<string, unknown>;
      return {
        id: stringValue(source.id),
        projectId: stringValue(source.project_id),
        title: stringValue(source.title),
        fileUrl: stringValue(source.file_url),
        documentType: toDocumentType(source.document_type),
        issuer: nullableString(source.issuer),
        isVerified: Boolean(source.is_verified),
        createdAt: stringValue(source.created_at),
      };
    })
    .filter((item): item is ProjectDocument => Boolean(item && item.id && item.projectId && item.title && item.fileUrl));
}

function toDocumentType(value: unknown): ProjectDocument['documentType'] {
  if (value === 'pdf' || value === 'certificate' || value === 'legal' || value === 'financial' || value === 'other') {
    return value;
  }

  return 'other';
}

function toStringArray(value: unknown, fallback: string) {
  if (!Array.isArray(value)) return fallback ? [fallback] : [];
  const values = value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
  return values.length > 0 ? values : fallback ? [fallback] : [];
}

function numericValue(value: unknown, fallback: number) {
  const numeric = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function clampPercentage(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)));
}

function formatYears(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function stringValue(value: unknown) {
  return typeof value === 'string' ? value : '';
}

function nullableString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value : null;
}
