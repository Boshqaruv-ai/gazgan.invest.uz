import { NextResponse } from 'next/server';
import { getProjectsFromDb } from '@/lib/server/projects';

export async function GET() {
  try {
    const projects = await getProjectsFromDb();

    return NextResponse.json({
      options: projects.map((project) => ({
        id: project.id,
        title: project.title,
        project_type: project.projectType,
        expected_return: project.expectedReturn,
        payback_years: project.paybackYears,
        investment_required: project.investmentRequired,
        riskLevel: project.riskLevel,
      })),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Calculator project options could not be loaded.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
