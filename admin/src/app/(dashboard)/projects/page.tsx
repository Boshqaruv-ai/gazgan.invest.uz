'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { Folder, Plus, Trash2, Edit, Upload } from 'lucide-react';

const CATEGORIES = ['Marmar', 'Granit', 'Boshqa'] as const;
const RISK_LEVELS = ['Low', 'Medium', 'High'] as const;

export default function ProjectsPage() {
  const { data: session } = useSession();
  const [projects, setProjects] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const [editing, setEditing] = React.useState<any>(null);
  const [uploading, setUploading] = React.useState(false);
  const [formData, setFormData] = React.useState<any>({
    title: '',
    category: 'Marmar',
    roi: '',
    payback: '',
    amount: '',
    location: '',
    description: '',
    image_url: '',
    risk_level: 'Medium',
    highlight: false,
    is_active: true,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('type', 'project');

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await res.json();

      if (data.url) {
        setFormData((current: any) => ({ ...current, image_url: data.url }));
      } else if (data.error) {
        alert(data.error);
      }
    } catch {
      alert('Rasm yuklashda xatolik');
    } finally {
      setUploading(false);
    }
  };

  const fetchProjects = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const resetForm = () => {
    setEditing(null);
    setFormData({
      title: '',
      category: 'Marmar',
      roi: '',
      payback: '',
      amount: '',
      location: '',
      description: '',
      image_url: '',
      risk_level: 'Medium',
      highlight: false,
      is_active: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PATCH' : 'POST';
    const body = {
      ...formData,
      id: editing?.id,
      roi: Number(formData.roi) || 0,
      payback: Number(formData.payback) || 1,
      amount: Number(formData.amount) || 0,
    };

    try {
      const res = await fetch('/api/admin/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      if (res.ok) {
        setShowForm(false);
        resetForm();
        fetchProjects();
      } else {
        alert('Xatolik: ' + (result.error || 'Noma\'lum xatolik'));
      }
    } catch (err) {
      console.error(err);
      alert('Tarmoq xatoligi yuz berdi');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Loyihani o\'chirmoqchimisiz?')) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (project: any) => {
    setEditing(project);
    setFormData({
      title: project.title || '',
      category: project.category || 'Marmar',
      roi: project.roi ?? '',
      payback: project.payback ?? '',
      amount: project.amount ?? '',
      location: project.location || '',
      description: project.description || '',
      image_url: project.image || '',
      risk_level: project.risk_level || 'Medium',
      highlight: Boolean(project.highlight),
      is_active: project.is_active !== undefined ? Boolean(project.is_active) : true,
    });
    setShowForm(true);
  };

  if (loading) {
    return <div className="p-4 text-white">Yuklanmoqda...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Loyihalar</h2>
        <button
          onClick={() => {
            setShowForm(true);
            resetForm();
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
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Kategoriya</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Risk darajasi</label>
              <select
                value={formData.risk_level}
                onChange={(e) => setFormData({ ...formData, risk_level: e.target.value })}
                className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white"
              >
                {RISK_LEVELS.map((r) => (
                  <option key={r} value={r}>
                    {r === 'Low' ? 'Past' : r === 'Medium' ? "O'rta" : 'Yuqori'}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">ROI (%)</label>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="0"
                value={formData.roi}
                onChange={(e) => setFormData({ ...formData, roi: e.target.value })}
                className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Qaytarish (yil)</label>
              <input
                type="number"
                min="1"
                step="1"
                placeholder="1"
                value={formData.payback}
                onChange={(e) => setFormData({ ...formData, payback: e.target.value })}
                className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Miqdor ($)</label>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Manzil</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white"
            />
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
            <label className="block text-sm text-gray-400 mb-1">Loyiha rasmi</label>
            <div className="flex gap-2 mb-2">
              <input
                id="project-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="project-image-upload"
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-secondary/50 px-4 py-2 text-white hover:bg-secondary/70"
              >
                <Upload size={16} />
                {uploading ? 'Yuklanmoqda...' : 'Rasm tanlash'}
              </label>
              {formData.image_url && (
                <span className="self-center text-sm text-green-400">Yuklangan ✓</span>
              )}
            </div>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="Yoki rasm URL ni qo'lda kiriting"
              className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white text-sm"
            />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={formData.highlight}
                onChange={(e) => setFormData({ ...formData, highlight: e.target.checked })}
              />
              Tanlangan (highlight)
            </label>
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              />
              Faol
            </label>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-accent text-dark rounded-lg font-semibold">
              {editing ? 'Saqlash' : 'Qo\'shish'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="px-4 py-2 bg-secondary/50 text-white rounded-lg"
            >
              Bekor qilish
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {projects.length === 0 ? (
          <p className="text-gray-400 text-center p-4">Loyihalar yo&apos;q</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="flex items-center gap-4 bg-secondary/20 rounded-xl p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white">{project.title}</h3>
                  {project.highlight && (
                    <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">Tanlangan</span>
                  )}
                  {!project.is_active && (
                    <span className="text-xs bg-red-400/20 text-red-400 px-2 py-0.5 rounded-full">Nofaol</span>
                  )}
                </div>
                <p className="text-sm text-gray-400">
                  {project.category} &bull; {project.roi}% ROI &bull; {project.payback} yil &bull; ${(project.amount || 0).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(project)} className="p-2 text-accent hover:bg-accent/20 rounded-lg">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(project.id)} className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}