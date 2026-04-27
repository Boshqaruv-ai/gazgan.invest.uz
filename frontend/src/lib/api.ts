const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Xatolik yuz berdi' }));
    throw new Error(error.detail || 'Xatolik yuz berdi');
  }

  return response.json();
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      fetchApi<{ access_token: string; refresh_token: string; token_type: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),

    register: (data: { email: string; password: string; name: string; phone?: string }) =>
      fetchApi<{ id: number; email: string; name: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    me: () => fetchApi<{ id: number; email: string; name: string; role: string }>('/auth/me'),
  },

  quarries: {
    getAll: (params?: { type?: string; region?: string }) => {
      const searchParams = new URLSearchParams(params as Record<string, string>);
      return fetchApi<any[]>(`/quarries?${searchParams}`);
    },

    getBySlug: (slug: string) => fetchApi<any>(`/quarries/${slug}`),
  },

  products: {
    getAll: (params?: { category?: string; color?: string; minPrice?: number; maxPrice?: number }) => {
      const searchParams = new URLSearchParams(params as Record<string, string>);
      return fetchApi<any[]>(`/products?${searchParams}`);
    },

    getBySlug: (slug: string) => fetchApi<any>(`/products/${slug}`),

    getCategories: () => fetchApi<string[]>('/products/categories'),
  },

  workshops: {
    getAll: () => fetchApi<any[]>('/workshops'),
  },

  investments: {
    getAll: () => fetchApi<any[]>('/investments'),

    getBySlug: (slug: string) => fetchApi<any>(`/investments/${slug}`),

    calculate: (amount: number, projectType: string) =>
      fetchApi<any>('/investments/calculate', {
        method: 'POST',
        body: JSON.stringify({ amount, project_type: projectType }),
      }),
  },

  chat: {
    sendMessage: (message: string) =>
      fetchApi<{ response: string }>('/chat/message', {
        method: 'POST',
        body: JSON.stringify({ message }),
      }),
  },

  dashboard: {
    getSaved: () => fetchApi<any[]>('/dashboard/saved'),

    save: (investmentId: number) =>
      fetchApi<{ success: boolean }>(`/dashboard/save/${investmentId}`, {
        method: 'POST',
      }),

    remove: (investmentId: number) =>
      fetchApi<{ success: boolean }>(`/dashboard/save/${investmentId}`, {
        method: 'DELETE',
      }),

    getChatHistory: () => fetchApi<any[]>('/dashboard/chat'),
  },
};