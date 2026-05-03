export { DashboardStats, PortfolioChart } from './components/DashboardStats';
export { DashboardProjects } from './components/DashboardProjects';
export { DashboardDocuments } from './components/DashboardDocuments';
export { DashboardChatHistory } from './components/DashboardChatHistory';
export { DashboardNotifications } from './components/DashboardNotifications';
export { default as AdminProducts } from './components/AdminProducts';
export { default as AdminProjects } from './components/AdminProjects';
export { useDashboard, formatAmount, getStatusColor } from './hooks/useDashboard';
export type { DashboardData, Project, Document, ChatItem, Notification } from './hooks/useDashboard';