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

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const type = formData.get('type') as string;
    const id = formData.get('id') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const validType = type || 'product';
    if (!['product', 'project'].includes(validType)) {
      return NextResponse.json({ error: 'Invalid type. Must be product or project.' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const folder = validType === 'product' ? 'products' : 'projects';
    const path = `${folder}/${id || 'new'}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('gazgan-media')
      .upload(path, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error('Storage upload error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from('gazgan-media')
      .getPublicUrl(data.path);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (err: any) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 });
  }
}