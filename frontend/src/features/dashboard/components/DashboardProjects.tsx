import { useDashboard, formatAmount, getStatusColor } from '../hooks/useDashboard';

export function DashboardProjects() {
  const { data } = useDashboard();
  const projects = data?.projects || [];

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-secondary/30 border border-accent/10 rounded-xl p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-white">{project.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <div className="flex gap-4 text-sm text-gray-400">
                <span>{formatAmount(project.amount)}</span>
                <span>/</span>
                <span>{project.roi}% ROI</span>
                <span>/</span>
                <span>{project.payback} yil</span>
              </div>
            </div>
            <button className="btn-primary text-sm py-2 px-4">
              Batafsil -&gt;
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
