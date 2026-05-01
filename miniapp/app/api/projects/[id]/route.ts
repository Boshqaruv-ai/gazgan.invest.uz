import { NextResponse } from 'next/server';
import { getProjectFromDb } from '@/lib/server/projects';

interface ProjectApiRouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: Request, { params }: ProjectApiRouteProps) {
  const { id } = await params;

  try {
    const project = await getProjectFromDb(id);

    if (!project) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Project could not be loaded.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
