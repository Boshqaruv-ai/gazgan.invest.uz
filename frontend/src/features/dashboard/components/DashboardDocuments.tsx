import { useDashboard } from '../hooks/useDashboard';

export function DashboardDocuments() {
  const { data } = useDashboard();
  const documents = data?.documents || [];

  return (
    <div className="bg-secondary/30 border border-accent/10 rounded-xl p-6">
      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 bg-dark/50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{doc.icon}</span>
              <div>
                <div className="text-white font-medium">{doc.name}</div>
                <div className="text-gray-500 text-sm">Yuklangan: {doc.date}</div>
              </div>
            </div>
            <button className="text-accent/70 text-sm cursor-default" disabled>
              Demo
            </button>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full py-3 border-2 border-dashed border-accent/30 rounded-lg text-gray-400 cursor-default" disabled>
        Hujjat yuklash hozircha yoqilmagan
      </button>
    </div>
  );
}
