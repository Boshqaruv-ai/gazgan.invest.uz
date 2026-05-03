import { ProjectDetailScreen } from '@/screens/ProjectDetailScreen';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <ProjectDetailScreen projectId={id} />;
}
