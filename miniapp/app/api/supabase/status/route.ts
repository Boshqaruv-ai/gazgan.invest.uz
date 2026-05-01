import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { count, error } = await supabase
      .from('projects')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      ok: true,
      activeProjects: count ?? 0,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Supabase status check failed.';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
