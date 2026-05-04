import { NextResponse } from 'next/server';
import { getProjectsFromDb } from '@/lib/server/projects';

export async function GET() {
  try {
    const projects = await getProjectsFromDb();
    if (projects.length === 0) {
      return NextResponse.json({
        options: [],
        message: 'ROI uchun loyihalar hali tayyorlanmagan.',
      });
    }

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
    const message = error instanceof Error ? error.message : '';

    if (isMissingProjectsSchemaError(message)) {
      return NextResponse.json({
        options: [],
        message: 'ROI uchun loyihalar hali tayyorlanmagan.',
      });
    }

    console.error('Calculator projects API error:', error);
    return NextResponse.json(
      { error: message || 'Kalkulyator loyihalari yuklanmadi.' },
      { status: 500 }
    );
  }
}

function isMissingProjectsSchemaError(message: string) {
  return (
    message.includes("Could not find the table 'public.projects'") ||
    message.includes('public.projects') ||
    message.includes('schema cache') ||
    message.includes('does not exist')
  );
}
