'use client'

import Card from './Card'

// Assuming the Project type is defined in the parent or a shared types file
type Project = {
  id: string
  name: string
  domain: string
  status: 'active' | 'locked'
}

type OverviewProps = {
  projects: Project[];
}

export default function Overview({ projects }: OverviewProps) {
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const lockedProjects = projects.filter(p => p.status === 'locked').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card title="Total Projects" value={totalProjects} />
      <Card title="Active Projects" value={activeProjects} />
      <Card title="Locked Projects" value={lockedProjects} />
    </div>
  )
}