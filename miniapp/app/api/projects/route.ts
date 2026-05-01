import { NextResponse } from 'next/server';
import { getProjectStats } from '@/lib/projects';
import { getProjectsFromDb } from '@/lib/server/projects';

export async function GET() {
  try {
    const projects = await getProjectsFromDb();

    return NextResponse.json({
      projects,
      stats: getProjectStats(projects),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Projects could not be loaded.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
