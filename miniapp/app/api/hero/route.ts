import { NextResponse } from 'next/server';
import { getHeroImages } from '@/lib/server/hero';

export async function GET() {
  try {
    const images = await getHeroImages();
    return NextResponse.json({ images });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Hero images could not be loaded.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}