import 'server-only';

import { getSupabaseAdmin } from '@/lib/supabase/server';

export interface HeroImage {
  id: string;
  title: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
}

export async function getPrimaryHeroImage(): Promise<HeroImage | null> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('hero_images')
      .select('id, title, image_url, is_active, sort_order')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.warn('Error fetching frontend hero image:', error.message);
      return null;
    }

    return (data ?? null) as HeroImage | null;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.warn('Frontend hero image fallback used:', message);
    return null;
  }
}
