'use server';

import { getSupabaseAdmin } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('featured_products')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.log('featured_products not available, returning empty:', error.message);
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (err) {
    console.log('featured_products endpoint error, returning empty');
    return NextResponse.json([]);
  }
}