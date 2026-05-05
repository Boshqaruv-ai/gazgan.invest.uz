'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { Folder, Plus, Trash2, Edit, Upload } from 'lucide-react';

export default function ProjectsPage() {
  const { data: session } = useSession();
  const [projects, setProjects] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const [editing, setEditing] = React.useState<any>(null);
  const [uploading, setUploading] = React.useState(false);
  const [formData, setFormData] = React.useState<any>({
    title: '',
    category: '',
    status: 'ACTIVE',
    roi: '',
    payback_years: '',
    amount: '',
    investment_required: '',
    investment_raised: 0,
    location: '',
    description: '',
    image_url: '',
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
      category: '',
      status: 'ACTIVE',
      roi: '',
      payback_years: '',
      amount: '',
      investment_required: '',
      investment_raised: 0,
      location: '',
      description: '',
      image_url: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PATCH' : 'POST';
    const body = {
      ...formData,
      id: editing?.id,
      roi: Number(formData.roi) || 0,
      payback_years: Number(formData.payback_years) || 0,
      amount: Number(formData.amount) || 0,
      investment_required: Number(formData.investment_required) || 0,
    };

    try {
      const res = await fetch('/api/admin/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setShowForm(false);
        resetForm();
        fetchProjects();
      }
    } catch (err) {
      console.error(err);
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
      category: project.category || '',
      status: project.status || 'ACTIVE',
      roi: project.roi ?? '',
      payback_years: project.payback_years ?? '',
      amount: project.amount ?? '',
      investment_required: project.investment_required ?? '',
      investment_raised: project.investment_raised ?? 0,
      location: project.location || '',
      description: project.description || '',
      image_url: project.image_url || '',
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
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Holat</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white"
              >
                <option value="HOT">Ommabop</option>
                <option value="NEW">Yangi</option>
                <option value="ACTIVE">Faol</option>
                <option value="FUNDED">Moliyalashtirilgan</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">ROI (%)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0"
                value={formData.roi as any}
                onChange={(e) => setFormData({ ...formData, roi: e.target.value === '' ? '' : parseFloat(e.target.value) || '' })}
                className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Qaytarish yili</label>
              <input
                type="number"
                step="0.01"
                placeholder="0"
                value={formData.payback_years as any}
                onChange={(e) => setFormData({ ...formData, payback_years: e.target.value === '' ? '' : parseFloat(e.target.value) || '' })}
                className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Kerakli investitsiya ($)</label>
              <input
                type="number"
                placeholder="0"
                value={formData.investment_required as any}
                onChange={(e) => setFormData({ ...formData, investment_required: e.target.value === '' ? '' : Number(e.target.value) || '' })}
                className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Jami miqdor ($)</label>
              <input
                type="number"
                placeholder="0"
                value={formData.amount as any}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value === '' ? '' : Number(e.target.value) || '' })}
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
                <h3 className="font-semibold text-white">{project.title}</h3>
                <p className="text-sm text-gray-400">
                  {project.status === 'HOT' ? 'Ommabop' : project.status === 'NEW' ? 'Yangi' : project.status === 'ACTIVE' ? 'Faol' : 'Moliyalashtirilgan'} • {project.roi}% ROI • ${project.investment_required?.toLocaleString()}
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