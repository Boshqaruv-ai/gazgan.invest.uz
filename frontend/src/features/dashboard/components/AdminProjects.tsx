'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Image as ImageIcon, X } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  main_image: string;
  images: string[];
  gallery_images: string[];
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Project | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      if (data.error) {
        console.error(data.error);
      } else {
        setProjects(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProjects();
  }, [fetchProjects]);

  const handleImageUpload = async (type: 'main' | 'gallery', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selected) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'project');
    formData.append('id', selected.id);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (result.url) {
        const updates =
          type === 'main'
            ? { main_image: result.url }
            : { gallery_images: [...(selected.gallery_images || []), result.url] };

        const patchRes = await fetch(`/api/admin/projects/${selected.id}/media`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: selected.id, ...updates }),
        });
        const patchResult = await patchRes.json();
        if (patchResult.error) {
          alert(patchResult.error);
        } else {
          setSelected(patchResult);
          fetchProjects();
        }
      } else {
        alert(result.error || 'Upload failed');
      }
    } catch (err) {
      alert('Upload xatoligi');
    }
  };

  const handleRemoveGallery = async (url: string) => {
    if (!selected) return;
    const updates = {
      gallery_images: (selected.gallery_images || []).filter((img) => img !== url),
    };

    const res = await fetch(`/api/admin/projects/${selected.id}/media`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selected.id, ...updates }),
    });
    const result = await res.json();
    if (!result.error) {
      setSelected(result);
      fetchProjects();
    }
  };

  if (loading) {
    return <div className="p-4 text-white">Yuklanmoqda...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-4">Loyiha Media</h2>

      {!selected ? (
        <div className="space-y-2">
          {projects.length === 0 ? (
            <p className="text-gray-400 text-center p-4">Loyihalar yoq</p>
          ) : (
            projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelected(project)}
                className="w-full flex items-center gap-4 bg-secondary/20 rounded-xl p-3 text-left hover:bg-secondary/30"
              >
                {project.main_image ? (
                  <Image src={project.main_image} alt={project.title} width={64} height={64} className="w-16 h-16 object-cover rounded-lg" />
                ) : (
                  <div className="w-16 h-16 bg-secondary/50 rounded-lg flex items-center justify-center">
                    <ImageIcon className="text-gray-500" size={24} />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{project.title}</h3>
                  <p className="text-sm text-gray-400">
                    {(project.images?.length || 0) + (project.gallery_images?.length || 0)} ta rasm
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelected(null)} className="mb-4 text-accent hover:underline">
            ← Orqaga
          </button>
          <h3 className="text-lg font-semibold text-white mb-4">{selected.title}</h3>

          <div className="mb-6">
            <h4 className="text-sm text-gray-400 mb-2">Asosiy rasm</h4>
            <div className="flex gap-4">
              {selected.main_image ? (
                <Image src={selected.main_image} alt="Main" width={128} height={128} className="w-32 h-32 object-cover rounded-lg" />
              ) : (
                <div className="w-32 h-32 bg-secondary/50 rounded-lg flex items-center justify-center">
                  <ImageIcon className="text-gray-500" size={32} />
                </div>
              )}
              <label className="px-4 py-2 bg-accent text-dark rounded-lg font-semibold cursor-pointer h-fit">
                Yuklash
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload('main', e)} />
              </label>
            </div>
          </div>

          <div>
            <h4 className="text-sm text-gray-400 mb-2">Galereya rasmlar</h4>
            <div className="grid grid-cols-3 gap-2">
              {(selected.gallery_images || []).map((url) => (
                <div key={url} className="relative group">
                  <Image src={url} alt="Gallery" width={100} height={100} className="w-full h-24 object-cover rounded-lg" />
                  <button
                    onClick={() => handleRemoveGallery(url)}
                    className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <label className="h-24 border-2 border-dashed border-accent/30 rounded-lg flex items-center justify-center cursor-pointer hover:border-accent">
                <Plus className="text-accent" />
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload('gallery', e)} />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}