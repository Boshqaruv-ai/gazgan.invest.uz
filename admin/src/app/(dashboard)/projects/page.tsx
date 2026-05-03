'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { Folder, Plus, Trash2, Edit } from 'lucide-react';

export default function ProjectsPage() {
  const { data: session } = useSession();
  const [projects, setProjects] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const [editing, setEditing] = React.useState<any>(null);
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
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PATCH' : 'POST';
    const body = editing 
      ? { ...formData, id: editing.id, roi: Number(formData.roi) || 0, payback_years: Number(formData.payback_years) || 0, amount: Number(formData.amount) || 0, investment_required: Number(formData.investment_required) || 0 }
      : { ...formData, roi: Number(formData.roi) || 0, payback_years: Number(formData.payback_years) || 0, amount: Number(formData.amount) || 0, investment_required: Number(formData.investment_required) || 0 };

    try {
      const res = await fetch('/api/admin/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setShowForm(false);
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
        });
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
    setFormData(project);
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