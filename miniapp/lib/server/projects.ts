import 'server-only';

import { toProject, type Project } from '@/lib/projects';
import { getSupabaseAdmin } from '@/lib/supabase/server';

const PROJECT_COLUMNS = `
  id,
  title,
  category,
  project_type,
  status,
  roi,
  payback,
  payback_years,
  expected_return,
  amount,
  investment_required,
  investment_raised,
  funding_percentage,
  spots_left,
  investors_count,
  image,
  images,
  gallery_images,
  highlight,
  description,
  location,
  risk_level,
  trust_level,
  timeline,
  roi_breakdown
`;

const LEGACY_PROJECT_COLUMNS = `
  id,
  title,
  category,
  roi,
  payback,
  amount,
  image,
  highlight,
  description,
  location,
  risk_level,
  timeline,
  roi_breakdown
`;

export async function getProjectsFromDb(): Promise<Project[]> {
  const rows = await fetchProjectRows();
  const documents = await fetchProjectDocuments(rows.map((project) => project.id));

  return rows.map((row) => toProject({
    ...row,
    project_documents: documents.filter((document) => document.project_id === row.id),
  }));
}

export async function getProjectFromDb(id: string): Promise<Project | null> {
  const row = await fetchProjectRow(id);
  if (!row) return null;

  const documents = await fetchProjectDocuments([row.id]);

  return toProject({
    ...row,
    project_documents: documents,
  });
}

async function fetchProjectRows() {
  const supabase = getSupabaseAdmin();
  const extended = await supabase
    .from('projects')
    .select(PROJECT_COLUMNS)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('roi', { ascending: false });

  if (!extended.error) {
    return extended.data ?? [];
  }

  if (!isRecoverableSchemaError(extended.error)) {
    throw new Error(extended.error.message);
  }

  const legacy = await supabase
    .from('projects')
    .select(LEGACY_PROJECT_COLUMNS)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('roi', { ascending: false });

  if (legacy.error) {
    throw new Error(legacy.error.message);
  }

  return legacy.data ?? [];
}

async function fetchProjectRow(id: string) {
  const supabase = getSupabaseAdmin();
  const extended = await supabase
    .from('projects')
    .select(PROJECT_COLUMNS)
    .eq('id', id)
    .eq('is_active', true)
    .maybeSingle();

  if (!extended.error) {
    return extended.data;
  }

  if (!isRecoverableSchemaError(extended.error)) {
    throw new Error(extended.error.message);
  }

  const legacy = await supabase
    .from('projects')
    .select(LEGACY_PROJECT_COLUMNS)
    .eq('id', id)
    .eq('is_active', true)
    .maybeSingle();

  if (legacy.error) {
    throw new Error(legacy.error.message);
  }

  return legacy.data;
}

async function fetchProjectDocuments(projectIds: string[]) {
  if (projectIds.length === 0) return [];

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('project_documents')
    .select('id, project_id, title, file_url, document_type, issuer, is_verified, created_at')
    .in('project_id', projectIds);

  if (!error) {
    return data ?? [];
  }

  if (isRecoverableSchemaError(error)) {
    console.warn('Project documents are unavailable; returning projects without documents.', error.message);
    return [];
  }

  throw new Error(error.message);
}

export async function projectExistsInDb(id: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('projects')
    .select('id')
    .eq('id', id)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return Boolean(data);
}

function isRecoverableSchemaError(error: { code?: string; message?: string }) {
  const message = error.message ?? '';

  return (
    error.code === 'PGRST200' ||
    error.code === 'PGRST204' ||
    error.code === '42P01' ||
    error.code === '42703' ||
    message.includes('Could not find a relationship') ||
    message.includes('does not exist') ||
    message.includes('schema cache')
  );
}
