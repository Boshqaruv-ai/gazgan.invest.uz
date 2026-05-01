import { NextResponse } from 'next/server';
import { getProjectsFromDb } from '@/lib/server/projects';

export async function GET() {
  try {
    const projects = await getProjectsFromDb();

    return NextResponse.json({
      options: projects.map((project) => ({
        id: project.id,
        title: project.title,
        roi: project.roi,
        payback: project.payback,
        amount: project.amount,
        riskLevel: project.riskLevel,
      })),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Calculator project options could not be loaded.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
