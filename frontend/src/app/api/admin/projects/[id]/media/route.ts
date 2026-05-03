'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { id, main_image, images, gallery_images } = body;

  const supabase = getSupabaseAdmin();
  const updates: Record<string, any> = {};

  if (main_image !== undefined) updates.main_image = main_image;
  if (images !== undefined) updates.images = images;
  if (gallery_images !== undefined) updates.gallery_images = gallery_images;

  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}