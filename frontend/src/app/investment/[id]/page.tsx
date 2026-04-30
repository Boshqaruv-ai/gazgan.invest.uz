'use client';

import { useParams } from 'next/navigation';
import { ProjectDetail } from '@/features/investment';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id as string;

  return <ProjectDetail projectId={projectId} />;
}