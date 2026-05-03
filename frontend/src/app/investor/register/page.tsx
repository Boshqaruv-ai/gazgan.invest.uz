'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function InvestorRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Parollar mos kelmadi');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/investor/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Xatolik yuz berdi');
        setLoading(false);
        return;
      }

      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Ro\'yxatdan o\'tgandan so\'ng kirishda xatolik');
        setLoading(false);
      } else {
        router.push('/investor');
      }
    } catch (err) {
      setError('Xatolik yuz berdi');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Ro'yxatdan o'tish</h1>
          <p className="text-gray-400">Yangi investor hisobi yarating</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ism"
              className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-accent/20 text-white placeholder-gray-500 focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-accent/20 text-white placeholder-gray-500 focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Parol"
              className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-accent/20 text-white placeholder-gray-500 focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Parolni tasdiqlang"
              className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-accent/20 text-white placeholder-gray-500 focus:outline-none focus:border-accent"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-accent text-dark font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Ro\'yxatdan o\'tilmoqda...' : 'Ro\'yxatdan o\'tish'}
          </button>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Allaqachon hisobingiz bormi?{' '}
              <Link href="/investor/login" className="text-accent hover:underline">
                Kirish
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}