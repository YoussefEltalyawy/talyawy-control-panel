'use client'

import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Copy, Lock, Unlock, Trash2 } from 'lucide-react'
import { toast } from "sonner"


// Updated Project type to include created_at
type Project = {
  id: string
  name: string
  domain: string // Assuming domain holds the URL
  status: 'active' | 'locked'
  created_at: string // Assuming it's a string from Supabase initially
}

type ProjectTableProps = {
  projects: Project[];
  onStatusChange: () => void; // Callback to refresh data in the parent
}

export default function ProjectTable({ projects, onStatusChange }: ProjectTableProps) {

  const toggleStatus = async (id: string, currentStatus: Project['status']) => {
    const newStatus = currentStatus === 'locked' ? 'active' : 'locked'
    const { error } = await supabase.from('projects').update({ status: newStatus }).eq('id', id)
    if (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update project status.')
    } else {
      toast.success(`Project ${newStatus === 'active' ? 'unlocked' : 'locked'} successfully.`)
      onStatusChange(); // Call the callback to trigger data refresh in the parent
    }
  }

  const deleteProject = async (id: string) => {
    // Add confirmation dialog here in a real app
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) {
      console.error('Error deleting project:', error)
      toast.error('Failed to delete project.')
    } else {
      toast.success('Project deleted successfully.')
      onStatusChange(); // Refresh list after delete
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('ID copied to clipboard!')
    }, (err) => {
      console.error('Could not copy text: ', err)
      toast.error('Failed to copy ID.')
    });
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      // Attempt to format, adjust options as needed
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      console.error('Error formatting date:', e);
      return 'Invalid Date'; // Fallback for invalid date strings
    }
  }

  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map(project => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">
              {/* Assuming project.domain holds the URL */}
              <a href={project.domain.startsWith('http') ? project.domain : `https://${project.domain}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {project.name}
              </a>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm" title={project.id}>{project.id}</span>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(project.id)} className="h-6 w-6">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={project.status === 'active' ? 'default' : 'destructive'}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>{formatDate(project.created_at)}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleStatus(project.id, project.status)}
              >
                {project.status === 'locked' ? <Unlock className="h-4 w-4 mr-1" /> : <Lock className="h-4 w-4 mr-1" />}
                {project.status === 'locked' ? 'Unlock' : 'Lock'}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteProject(project.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}