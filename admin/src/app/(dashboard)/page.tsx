'use client';

import * as React from 'react';
import { Package } from 'lucide-react';

export default function DashboardPage() {
  return <AdminProducts />;
}

function AdminProducts() {
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const [editing, setEditing] = React.useState<any>(null);
  const [uploading, setUploading] = React.useState(false);
  const [formData, setFormData] = React.useState<any>({
    title: '',
    category: '',
    price: '',
    currency: 'USD',
    unit: 'm2',
    description: '',
    featured: false,
    active: true,
    sort_order: 0,
    image: '',
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await res.json();
      
      if (data.url) {
        setFormData({ ...formData, image: data.url });
      } else if (data.error) {
        alert(data.error);
      }
    } catch (err) {
      alert('Rasm yuklashda xatolik');
    } finally {
      setUploading(false);
    }
  };

  const fetchProducts = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (data.error) {
        console.error(data.error);
        setProducts([]);
      } else {
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PATCH' : 'POST';
    const body = editing 
      ? { ...formData, id: editing.id, price: Number(formData.price) || 0 }
      : { ...formData, price: Number(formData.price) || 0 };

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
          price: '',
          currency: 'USD',
          unit: 'm2',
          description: '',
          featured: false,
          active: true,
          sort_order: 0,
          image: '',
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

  const handleEdit = (product: any) => {
    setEditing(product);
    setFormData(product);
    setShowForm(true);
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
price: '',
              currency: 'USD',
              unit: 'm2',
              description: '',
              featured: false,
              active: true,
              sort_order: 0,
              image: '',
            });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-dark rounded-lg font-semibold"
        >
          <Package size={18} /> Qo‘shish
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
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Narx</label>
              <input
                type="number"
                step="0.01"
                placeholder="0"
                value={formData.price as any}
                onChange={(e) => setFormData({ ...formData, price: e.target.value === '' ? '' : parseFloat(e.target.value) || '' })}
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
            <div>
              <label className="block text-sm text-gray-400 mb-1">Birligi</label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white"
              >
                <option value="m2">m²</option>
                <option value="dona">dona</option>
                <option value="tonna">tonna</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Rasm</label>
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex items-center gap-2 px-4 py-2 bg-secondary/50 text-white rounded-lg cursor-pointer hover:bg-secondary/70"
              >
                {uploading ? 'Yuklanmoqda...' : 'Rasm tanlash'}
              </label>
              {formData.image && (
                <span className="text-green-400 text-sm self-center">Yuklangan</span>
              )}
            </div>
            {formData.image && (
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Yoki URL ni qo'lda kiriting"
                className="w-full mt-2 px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white text-sm"
              />
            )}
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              Tanlangan
            </label>
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              />
              Faol
            </label>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-accent text-dark rounded-lg font-semibold">
              {editing ? 'Saqlash' : "Qo‘shish"}
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
              <div className="flex-1">
                <h3 className="font-semibold text-white">{product.title}</h3>
                <p className="text-sm text-gray-400">
                  {product.price} {product.currency} / {product.unit}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(product)} className="p-2 text-accent hover:bg-accent/20 rounded-lg">
                  Tahrirlash
                </button>
                <button onClick={() => handleDelete(product.id)} className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg">
                  O&apos;chirish
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function AdminProjects() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-4">Loyihalar</h2>
      <p className="text-gray-400">Loyiha media boshqaruvi tayyorlanmoqda...</p>
    </div>
  );
}