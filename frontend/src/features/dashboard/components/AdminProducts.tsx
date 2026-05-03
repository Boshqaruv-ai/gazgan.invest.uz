'use client';

import { useState, useEffect, useCallback } from 'react';
import { Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  currency: string;
  unit: string;
  description: string;
  featured: boolean;
  active: boolean;
  sort_order: number;
  image_url: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: 0,
    currency: 'USD',
    unit: 'tonna',
    description: '',
    featured: false,
    active: true,
    sort_order: 0,
    image_url: '',
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (data.error) {
        console.error(data.error);
      } else {
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, [fetchProducts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PATCH' : 'POST';
    const body = editing ? { ...formData, id: editing.id } : formData;

    try {
      const res = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      if (result.error) {
        alert(result.error);
      } else {
        setShowForm(false);
        setEditing(null);
        setFormData({
          title: '',
          category: '',
          price: 0,
          currency: 'USD',
          unit: 'tonna',
          description: '',
          featured: false,
          active: true,
          sort_order: 0,
          image_url: '',
        });
        fetchProducts();
      }
    } catch (err) {
      alert('Xatolik yuz berdi');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Mahsulotni o\'chirmoqchimisiz?')) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.error) {
        alert(result.error);
      } else {
        fetchProducts();
      }
    } catch (err) {
      alert('Xatolik yuz berdi');
    }
  };

  const handleEdit = (product: Product) => {
    setEditing(product);
    setFormData(product);
    setShowForm(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'product');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (result.url) {
        setFormData((prev) => ({ ...prev, image_url: result.url }));
      } else {
        alert(result.error || 'Upload failed');
      }
    } catch (err) {
      alert('Upload xatoligi');
    }
  };

  if (loading) {
    return <div className="p-4 text-white">Yuklanmoqda...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Mahsulotlar</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
            setFormData({
              title: '',
              category: '',
              price: 0,
              currency: 'USD',
              unit: 'tonna',
              description: '',
              featured: false,
              active: true,
              sort_order: 0,
              image_url: '',
            });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-dark rounded-lg font-semibold"
        >
          <Plus size={18} /> Qo&apos;shish
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-secondary/30 rounded-xl p-4 mb-4 space-y-3">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Sarlavha</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Kategoriya</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Narx</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Valyuta</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white"
              >
                <option value="USD">USD</option>
                <option value="UZS">UZS</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Birlik</label>
            <select
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white"
            >
              <option value="tonna">tonna</option>
              <option value="m3">m3</option>
              <option value="kpl">kpl</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tavsif</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Rasm</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-gray-400" />
            {formData.image_url && (
              <Image src={formData.image_url} alt="Preview" width={96} height={96} className="mt-2 w-24 h-24 object-cover rounded-lg" />
            )}
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              />
              Active
            </label>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-accent text-dark rounded-lg font-semibold">
              {editing ? 'Saqlash' : 'Qo&apos;shish'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditing(null);
              }}
              className="px-4 py-2 bg-secondary/50 text-white rounded-lg"
            >
              Bekor qilish
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {products.length === 0 ? (
          <p className="text-gray-400 text-center p-4">Mahsulotlar yoq</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="flex items-center gap-4 bg-secondary/20 rounded-xl p-3">
              {product.image_url ? (
                <Image src={product.image_url} alt={product.title} width={64} height={64} className="w-16 h-16 object-cover rounded-lg" />
              ) : (
                <div className="w-16 h-16 bg-secondary/50 rounded-lg flex items-center justify-center">
                  <ImageIcon className="text-gray-500" size={24} />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-white">{product.title}</h3>
                <p className="text-sm text-gray-400">
                  {product.price} {product.currency} / {product.unit}
                </p>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(product)} className="p-2 text-accent hover:bg-accent/20 rounded-lg">
                  Tahrirlash
                </button>
                <button onClick={() => handleDelete(product.id)} className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}