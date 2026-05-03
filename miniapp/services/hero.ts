export interface HeroImage {
  id: string;
  title: string;
  image_url: string;
}

export async function fetchHeroImages(): Promise<HeroImage[]> {
  const response = await fetch('/api/hero', { cache: 'no-store' });
  const payload = await response.json() as { images?: HeroImage[]; error?: string };

  if (!response.ok || !payload.images) {
    console.error(payload.error || 'Hero images could not be loaded.');
    return [];
  }

  return payload.images;
}