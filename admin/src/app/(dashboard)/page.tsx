'use client';

import * as React from 'react';
import { Package } from 'lucide-react';

const PRODUCT_CATEGORIES = [
  { value: 'marble_slabs', label: 'Marmar plita' },
  { value: 'granite_slabs', label: 'Granit slab' },
  { value: 'souvenirs', label: 'Suvenir' },
  { value: 'tiles', label: 'Kafel' },
  { value: 'other', label: 'Boshqa' },
] as const;

type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]['value'];

type ProductFormData = {
  title: string;
  category: ProductCategory;
  price: string | number;
  currency: string;
  unit: string;
  description: string;
  featured: boolean;
  active: boolean;
  sort_order: number;
  image: string;
};

type AdminProduct = {
  id: string;
  title: string;
  category: ProductCategory;
  price: number;
  currency: string;
  unit: string;
  description: string | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  image: string;
};

const DEFAULT_PRODUCT_FORM: ProductFormData = {
  title: '',
  category: 'marble_slabs',
  price: '',
  currency: 'USD',
  unit: 'm2',
  description: '',
  featured: false,
  active: true,
  sort_order: 100,
  image: '',
};

export default function DashboardPage() {
  return <AdminProducts />;
}

function AdminProducts() {
  const [products, setProducts] = React.useState<AdminProduct[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const [editing, setEditing] = React.useState<AdminProduct | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [formData, setFormData] = React.useState<ProductFormData>(DEFAULT_PRODUCT_FORM);

  const resetForm = () => {
    setEditing(null);
    setFormData(DEFAULT_PRODUCT_FORM);
  };

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
        setFormData((current) => ({ ...current, image: data.url }));
      } else if (data.error) {
        alert(data.error);
      }
    } catch {
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
    const body = {
      ...formData,
      id: editing?.id,
      price: Number(formData.price) || 0,
    };

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
        resetForm();
        fetchProducts();
      }
    } catch {
      alert('Xatolik yuz berdi');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Mahsulotni o'chirmoqchimisiz?")) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.error) {
        alert(result.error);
      } else {
        fetchProducts();
      }
    } catch {
      alert('Xatolik yuz berdi');
    }
  };

  const handleEdit = (product: AdminProduct) => {
    setEditing(product);
    setFormData({
      title: product.title ?? '',
      category: product.category ?? 'marble_slabs',
      price: product.price ?? '',
      currency: product.currency ?? 'USD',
      unit: product.unit ?? 'm2',
      description: product.description ?? '',
      featured: Boolean(product.is_featured),
      active: Boolean(product.is_active),
      sort_order: product.sort_order ?? 100,
      image: product.image ?? '',
    });
    setShowForm(true);
  };

  if (loading) {
    return <div className="p-4 text-white">Yuklanmoqda...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Mahsulotlar</h2>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-semibold text-dark"
        >
          <Package size={18} /> Qo&apos;shish
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 space-y-3 rounded-xl bg-secondary/30 p-4">
          <div>
            <label className="mb-1 block text-sm text-gray-400">Sarlavha</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-lg border border-accent/20 bg-secondary/50 px-3 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-400">Kategoriya</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
              className="w-full rounded-lg border border-accent/20 bg-secondary/50 px-3 py-2 text-white"
              required
            >
              {PRODUCT_CATEGORIES.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-sm text-gray-400">Narx</label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full rounded-lg border border-accent/20 bg-secondary/50 px-3 py-2 text-white"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">Valyuta</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full rounded-lg border border-accent/20 bg-secondary/50 px-3 py-2 text-white"
              >
                <option value="USD">USD</option>
                <option value="UZS">UZS</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">Birligi</label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full rounded-lg border border-accent/20 bg-secondary/50 px-3 py-2 text-white"
              >
                <option value="m2">m2</option>
                <option value="dona">dona</option>
                <option value="tonna">tonna</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-400">Rasm</label>
            <div className="flex gap-2">
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="image-upload"
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-secondary/50 px-4 py-2 text-white hover:bg-secondary/70"
              >
                {uploading ? 'Yuklanmoqda...' : 'Rasm tanlash'}
              </label>
              {formData.image && <span className="self-center text-sm text-green-400">Yuklangan</span>}
            </div>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="Yoki URL ni qo'lda kiriting"
              className="mt-2 w-full rounded-lg border border-accent/20 bg-secondary/50 px-3 py-2 text-sm text-white"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-400">Tavsif</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-lg border border-accent/20 bg-secondary/50 px-3 py-2 text-white"
              rows={3}
            />
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
            <button type="submit" className="rounded-lg bg-accent px-4 py-2 font-semibold text-dark">
              {editing ? 'Saqlash' : "Qo'shish"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="rounded-lg bg-secondary/50 px-4 py-2 text-white"
            >
              Bekor qilish
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {products.length === 0 ? (
          <p className="p-4 text-center text-gray-400">Mahsulotlar yo&apos;q</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="flex items-center gap-4 rounded-xl bg-secondary/20 p-3">
              <div className="flex-1">
                <h3 className="font-semibold text-white">{product.title}</h3>
                <p className="text-sm text-gray-400">
                  {product.price} {product.currency} / {product.unit}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(product)} className="rounded-lg p-2 text-accent hover:bg-accent/20">
                  Tahrirlash
                </button>
                <button onClick={() => handleDelete(product.id)} className="rounded-lg p-2 text-red-400 hover:bg-red-400/20">
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
