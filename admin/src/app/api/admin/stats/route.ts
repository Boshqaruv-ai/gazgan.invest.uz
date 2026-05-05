'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  const today = new Date().toISOString().split('T')[0];

  let totalProducts = 0;
  let activeProducts = 0;
  let totalProjects = 0;
  let activeProjects = 0;
  let totalUsers = 0;
  let newUsersToday = 0;
  let totalInvestment = 0;

  // Query each table independently so one failure doesn't break everything

  try {
    const { data: products, error: productsError } = await supabase
      .from('featured_products')
      .select('id, is_active');
    if (!productsError && products) {
      totalProducts = products.length;
      activeProducts = products.filter((p: any) => p.is_active).length;
    }
  } catch {
    // Ignore individual table errors
  }

  try {
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id, status, investment_raised');
    if (!projectsError && projects) {
      totalProjects = projects.length;
      activeProjects = projects.filter(
        (p: any) => p.status === 'ACTIVE' || p.status === 'HOT' || p.status === 'NEW',
      ).length;
      totalInvestment = projects.reduce(
        (sum: number, p: any) => sum + (Number(p.investment_raised) || 0),
        0,
      );
    }
  } catch {
    // Ignore individual table errors
  }

  try {
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('telegram_id, created_at');
    if (!usersError && users) {
      totalUsers = users.length;
      newUsersToday = users.filter((u: any) => u.created_at?.startsWith(today)).length;
    }
  } catch {
    // Ignore individual table errors
  }

  const stats = {
    totalProducts,
    activeProducts,
    totalProjects,
    activeProjects,
    totalUsers,
    newUsersToday,
    totalInvestment,
  };

  return NextResponse.json(stats);
}