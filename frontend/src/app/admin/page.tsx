'use client';

import * as React from 'react';
import { AdminProducts, AdminProjects } from '@/features/dashboard';
import { signOut, useSession } from 'next-auth/react';
import { LogOut, Package, Folder, Bell, Image } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type TabKey = 'products' | 'projects' | 'notifications';

const tabs: Array<{ key: TabKey; label: string; icon: React.ReactNode }> = [
  { key: 'products', label: 'Mahsulotlar', icon: <Package size={18} /> },
  { key: 'projects', label: 'Loyihalar', icon: <Folder size={18} /> },
  { key: 'notifications', label: 'Bildirishnomalar', icon: <Bell size={18} /> },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = React.useState<TabKey>('products');
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="min-h-screen pt-24 pb-20 hero-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">Xush kelibsiz, {session?.user?.name || 'Admin'}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-2 px-4 py-2 bg-secondary/30 text-gray-400 hover:text-white rounded-lg"
          >
            <LogOut size={18} /> Chiqish
          </button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <Link
              key={tab.key}
              href={`/admin/${tab.key}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                pathname === `/admin/${tab.key}`
                  ? 'bg-accent text-dark font-semibold'
                  : 'bg-secondary/30 text-gray-400 hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </Link>
          ))}
        </div>

        {activeTab === 'products' && <AdminProducts />}
        {activeTab === 'projects' && <AdminProjects />}
        {activeTab === 'notifications' && (
          <div className="p-4 text-gray-400">Bildirishnomalar qismi tayyorlanmoqda...</div>
        )}
      </div>
    </div>
  );
}