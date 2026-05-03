import 'server-only';

import { getSupabaseAdmin } from '@/lib/supabase/server';

export interface HeroImage {
  id: string;
  title: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
}

export async function getHeroImages(): Promise<HeroImage[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('hero_images')
    .select('id, title, image_url, is_active, sort_order')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching hero images:', error.message);
    return [];
  }

  return (data ?? []) as HeroImage[];
}