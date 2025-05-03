'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Project = {
  id: string
  name: string
  domain: string
  status: 'active' | 'locked'
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*')
      if (error) console.error(error)
      else setProjects(data)
    }
    fetchProjects()
  }, [])

  const toggleStatus = async (id: string, currentStatus: Project['status']) => {
    const newStatus = currentStatus === 'locked' ? 'active' : 'locked'
    const { error } = await supabase.from('projects').update({ status: newStatus }).eq('id', id)
    if (error) console.error(error)
    else {
      setProjects(projects.map(p => p.id === id ? { ...p, status: newStatus } : p))
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Talyawy.dev Control Panel</h1>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Domain</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Toggle</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id} className="border-t">
              <td className="p-2">{project.name}</td>
              <td className="p-2">{project.domain}</td>
              <td className="p-2">{project.status}</td>
              <td className="p-2">
                <button
                  className={`px-3 py-1 text-white rounded ${
                    project.status === 'locked' ? 'bg-green-600' : 'bg-red-600'
                  }`}
                  onClick={() => toggleStatus(project.id, project.status)}
                >
                  {project.status === 'locked' ? 'Unlock' : 'Lock'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
