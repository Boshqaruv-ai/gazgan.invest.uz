'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function InvestorLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Noto\'g\'ri email yoki parol');
      setLoading(false);
    } else {
      router.push('/investor');
    }
  };

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Investor Kabinet</h1>
          <p className="text-gray-400">Tizimga kirish</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-accent/20 text-white placeholder-gray-500 focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parol"
              className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-accent/20 text-white placeholder-gray-500 focus:outline-none focus:border-accent"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-accent text-dark font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Kirish...' : 'Kirish'}
          </button>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Hisobingiz yo'qmi?{' '}
              <Link href="/investor/register" className="text-accent hover:underline">
                Ro'yxatdan o'ting
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}