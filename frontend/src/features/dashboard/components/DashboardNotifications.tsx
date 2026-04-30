import { useDashboard } from '../hooks/useDashboard';

export function DashboardNotifications() {
  const { data } = useDashboard();
  const notifications = data?.notifications || [];

  return (
    <div className="space-y-3">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className="bg-secondary/30 border border-accent/10 rounded-xl p-4 flex items-center gap-4"
        >
          <span className="text-2xl">{notif.icon}</span>
          <div className="flex-1">
            <div className="text-white">{notif.text}</div>
            <div className="text-gray-500 text-sm">{notif.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}