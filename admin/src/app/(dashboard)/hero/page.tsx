'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { Image, Plus, Trash2, Edit, Upload } from 'lucide-react';

export default function HeroPage() {
  const { data: session } = useSession();
  const [images, setImages] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const [editing, setEditing] = React.useState<any>(null);
  const [uploading, setUploading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: '',
    image_url: '',
    is_active: true,
    sort_order: 0,
  });

  const fetchImages = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/hero');
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchImages();
  }, [fetchImages]);

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
        setFormData({ ...formData, image_url: data.url });
      } else if (data.error) {
        alert(data.error);
      }
    } catch (err) {
      alert('Rasm yuklashda xatolik');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PATCH' : 'POST';
    const body = editing 
      ? { ...formData, id: editing.id }
      : formData;

    try {
      const res = await fetch('/api/admin/hero', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setShowForm(false);
        setEditing(null);
        setFormData({ title: '', image_url: '', is_active: true, sort_order: 0 });
        fetchImages();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Rasmni o\'chirmoqchimisiz?')) return;
    try {
      const res = await fetch(`/api/admin/hero?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchImages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (image: any) => {
    setEditing(image);
    setFormData(image);
    setShowForm(true);
  };

  if (loading) {
    return <div className="p-4 text-white">Yuklanmoqda...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Hero rasmlar</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
            setFormData({ title: '', image_url: '', is_active: true, sort_order: 0 });
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
            <label className="block text-sm text-gray-400 mb-1">Rasm URL</label>
            <div className="flex gap-2 mb-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="hero-image-upload"
              />
              <label
                htmlFor="hero-image-upload"
                className="flex items-center gap-2 px-4 py-2 bg-secondary/50 text-white rounded-lg cursor-pointer hover:bg-secondary/70"
              >
                {uploading ? 'Yuklanmoqda...' : <><Upload size={16} /> Yuklash</>}
              </label>
              {formData.image_url && (
                <span className="text-green-400 text-sm self-center">Yuklangan</span>
              )}
            </div>
            <input
              type="text"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="Yoki URL ni qo'lda kiriting"
              className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tartib raqami</label>
            <input
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="is_active" className="text-white text-sm">Faol</label>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-accent text-dark rounded-lg font-semibold">
              {editing ? 'Saqlash' : 'Qo\'shish'}
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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.length === 0 ? (
          <p className="text-gray-400 text-center p-4 col-span-full">Hero rasmlar yo&apos;q</p>
        ) : (
          images.map((image) => (
            <div key={image.id} className="relative rounded-xl overflow-hidden border border-white/10 bg-card">
              <img src={image.image_url} alt={image.title} className="w-full h-32 object-cover" />
              <div className="p-2">
                <p className="text-white text-sm font-medium truncate">{image.title}</p>
                <p className="text-gray-500 text-xs">Tartib: {image.sort_order}</p>
              </div>
              <div className="absolute top-2 right-2 flex gap-1">
                <button onClick={() => handleEdit(image)} className="p-1.5 bg-black/50 rounded-lg text-white hover:bg-black/70">
                  <Edit size={14} />
                </button>
                <button onClick={() => handleDelete(image.id)} className="p-1.5 bg-red-500/50 rounded-lg text-red-400 hover:bg-red-500/70">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}