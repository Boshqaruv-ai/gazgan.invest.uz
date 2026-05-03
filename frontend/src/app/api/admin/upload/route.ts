'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const type = formData.get('type') as string;
  const id = formData.get('id') as string;

  if (!file) {
    return NextResponse.json({ error: 'File required' }, { status: 400 });
  }

  if (!type || !['product', 'project'].includes(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
  const folder = type === 'product' ? 'products' : 'projects';
  const path = `${folder}/${id || 'new'}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('gazgan-media')
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage
    .from('gazgan-media')
    .getPublicUrl(data.path);

  return NextResponse.json({ url: urlData.publicUrl });
}