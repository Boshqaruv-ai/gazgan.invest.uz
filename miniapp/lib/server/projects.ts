import 'server-only';

import { toProject, type Project } from '@/lib/projects';
import { getSupabaseAdmin } from '@/lib/supabase/server';

const PROJECT_COLUMNS = 'id, title, category, roi, payback, amount, image, highlight, description, location, risk_level, timeline, roi_breakdown';

export async function getProjectsFromDb(): Promise<Project[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('projects')
    .select(PROJECT_COLUMNS)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('roi', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(toProject);
}

export async function getProjectFromDb(id: string): Promise<Project | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('projects')
    .select(PROJECT_COLUMNS)
    .eq('id', id)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? toProject(data) : null;
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
