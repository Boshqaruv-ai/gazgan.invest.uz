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
    console.error('Projects API error:', error);
    // Return empty data instead of 500 error
    return NextResponse.json({
      projects: [],
      stats: {
        totalProjects: 0,
        activeProjects: 0,
        totalInvestment: 0,
        roiRange: '0%',
        paybackRange: '-',
      },
    });
  }
}
