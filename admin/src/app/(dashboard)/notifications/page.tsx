'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { Bell, Plus, Trash2, Edit, Send } from 'lucide-react';

export default function NotificationsPage() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const [editing, setEditing] = React.useState<any>(null);
  const [sending, setSending] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: '',
    body: '',
    send_to_all: false,
  });

  const fetchNotifications = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/notifications');
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ title: '', body: '', send_to_all: false });
        fetchNotifications();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bildirishnomani o\'chirmoqchimisiz?')) return;
    try {
      const res = await fetch(`/api/admin/notifications?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (notification: any) => {
    setEditing(notification);
    setFormData({ title: notification.title, body: notification.body || '', send_to_all: false });
    setShowForm(true);
  };

  if (loading) {
    return <div className="p-4 text-white">Yuklanmoqda...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Bildirishnomalar</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
            setFormData({ title: '', body: '', send_to_all: false });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-dark rounded-lg font-semibold"
        >
          <Plus size={18} /> Yangi
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
            <label className="block text-sm text-gray-400 mb-1">Matn</label>
            <textarea
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              className="w-full px-3 py-2 bg-secondary/50 border border-accent/20 rounded-lg text-white"
              rows={3}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="send_to_all"
              checked={formData.send_to_all}
              onChange={(e) => setFormData({ ...formData, send_to_all: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="send_to_all" className="text-white text-sm">Barcha foydalanuvchilarga yuborish</label>
          </div>
          <div className="flex gap-2">
            <button 
              type="submit" 
              disabled={sending}
              className="px-4 py-2 bg-accent text-dark rounded-lg font-semibold disabled:opacity-50 flex items-center gap-2"
            >
              <Send size={16} /> {sending ? 'Yuborilmoqda...' : 'Yuborish'}
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
        {notifications.length === 0 ? (
          <p className="text-gray-400 text-center p-4">Bildirishnomalar yo&apos;q</p>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className="flex items-center gap-4 bg-secondary/20 rounded-xl p-3">
              <div className="flex-1">
                <h3 className="font-semibold text-white">{notification.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {notification.body || 'Matn yo‘q'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {notification.is_read ? 'O‘qilgan' : 'O‘qilmagan'} • {new Date(notification.created_at).toLocaleDateString('uz-UZ')}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleDelete(notification.id)} className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg">
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