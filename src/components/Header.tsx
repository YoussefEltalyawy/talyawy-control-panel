'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CreateProjectDialog from './CreateProjectDialog'; // Assuming this will be created
import { Plus } from 'lucide-react';

type HeaderProps = {
  onProjectCreated: () => void; // Callback to refresh data
}

export default function Header({ onProjectCreated }: HeaderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <header className="px-8 py-4 border-b">
      <div className="flex justify-between items-center mx-auto">
        <h1 className="text-2xl font-bold">talyawy.dev / control panel</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create New Project
        </Button>
      </div>
      <CreateProjectDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onProjectCreated={() => {
          setIsDialogOpen(false); // Close dialog on success
          onProjectCreated(); // Refresh the list in the parent
        }}
      />
    </header>
  );
}