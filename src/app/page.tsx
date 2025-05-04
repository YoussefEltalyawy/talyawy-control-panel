'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header';
import ProjectTable from '@/components/ProjectTable'
import Overview from '@/components/Overview'

// Define the Project type here or import from a shared types file
// Updated Project type to include created_at
type Project = {
  id: string
  name: string
  domain: string
  status: 'active' | 'locked'
  created_at: string // Add created_at field
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])

  const fetchProjects = async () => {
    // Select created_at along with other fields
    const { data, error } = await supabase.from('projects').select('*, created_at')
    if (error) console.error('Error fetching projects:', error)
    else setProjects(data || [])
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <div className="mx-auto">
      <Header onProjectCreated={fetchProjects} />
      <div className="p-8">
        <Overview projects={projects} />
        <ProjectTable projects={projects} onStatusChange={fetchProjects} />
      </div>
    </div>
  )
}
