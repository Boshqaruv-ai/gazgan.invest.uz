'use client';

import { useCallback, useEffect, useState } from 'react';
import type { FeaturedProduct } from '@/lib/products';
import { fetchFeaturedProducts } from '@/services/products';

export function useFeaturedProducts() {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      setProducts(await fetchFeaturedProducts());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Mahsulotlar yuklanmadi.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void reload();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [reload]);

  return {
    products,
    loading,
    error,
    reload,
  };
}
