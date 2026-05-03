import { NextResponse } from 'next/server';
import { getFeaturedProductsFromDb } from '@/lib/server/products';

export async function GET() {
  try {
    const products = await getFeaturedProductsFromDb();

    return NextResponse.json({ products });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Featured products could not be loaded.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
