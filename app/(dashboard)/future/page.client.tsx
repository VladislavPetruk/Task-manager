'use client';

import { Plus } from 'lucide-react';

import { useGetFutureTasks } from '@/app/api/tasks';
import { TaskCard } from '@/components/TaskCard';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { useDialogsStore } from '@/stores';

export default function FutureClient() {
  const openDialog = useDialogsStore((state) => state.openDialog);

  const { data: futuredTasks, isLoading } = useGetFutureTasks();

  if (isLoading)
    return (
      <div className="grid h-full place-content-center">
        <Loader />
      </div>
    );
  if (!futuredTasks?.length)
    return (
      <div>
        <p>You have not completed tasks yet</p>
        <Button
          aria-haspopup="true"
          size="icon"
          variant="ghost"
          onClick={() => openDialog('', 'create', 'futured')}
        >
          <Plus />
          <span className="sr-only">Add a new futured task</span>
        </Button>
      </div>
    );

  return (
    <div className="grid grid-cols-3 gap-3 rounded-xl bg-accent p-6">
      {futuredTasks.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  );
}
