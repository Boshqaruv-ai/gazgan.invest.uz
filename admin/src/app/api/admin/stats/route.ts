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

  const [
    { data: products, error: productsError },
    { data: projects, error: projectsError },
    { data: users, error: usersError },
  ] = await Promise.all([
    supabase.from('featured_products').select('id, is_active'),
    supabase.from('projects').select('id, status'),
    supabase.from('users').select('id, created_at'),
  ]);

  if (productsError || projectsError || usersError) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }

  const today = new Date().toISOString().split('T')[0];
  const newUsersToday = users?.filter((u: any) => u.created_at?.startsWith(today)).length || 0;

  const totalInvestment = projects?.reduce((sum: number, p: any) => sum + (p.investment_raised || 0), 0) || 0;

  const stats = {
    totalProducts: products?.length || 0,
    activeProducts: products?.filter((p: any) => p.is_active).length || 0,
    totalProjects: projects?.length || 0,
    activeProjects: projects?.filter((p: any) => p.status === 'ACTIVE' || p.status === 'HOT' || p.status === 'NEW').length || 0,
    totalUsers: users?.length || 0,
    newUsersToday,
    totalInvestment,
  };

  return NextResponse.json(stats);
}