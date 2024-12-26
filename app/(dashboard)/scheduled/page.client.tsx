'use client';

import { useEffect } from 'react';
import { Plus } from 'lucide-react';
import { shallow } from 'zustand/shallow';

import { useGetFutureTasks } from '@/app/api/hooks/queries';
import { TaskCard } from '@/components/TaskCard';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { DialogType } from '@/shared/constants/other';
import { TaskStage } from '@/shared/constants/task';
import { useDialogsStore, useTasksStore } from '@/shared/stores';

export default function FutureClient() {
  const { openDialog } = useDialogsStore(
    (state) => ({
      openDialog: state.openDialog,
    }),
    shallow
  );

  const { setFutureTasksInStore } = useTasksStore(
    (state) => ({
      // completedTasksInStore: state.completedTasks,
      setFutureTasksInStore: state.setFutureTasks,
    }),
    shallow
  );

  const { data: futuredTasks, isLoading } = useGetFutureTasks();

  useEffect(() => {
    if (futuredTasks) {
      setFutureTasksInStore(futuredTasks);
    }
  }, [futuredTasks]);

  if (isLoading)
    return (
      <div className="grid h-full place-content-center">
        <Loader />
      </div>
    );
  if (!futuredTasks?.length)
    return (
      <div>
        <p>You have not scheduled tasks yet</p>
        <Button
          aria-haspopup="true"
          size="icon"
          variant="ghost"
          onClick={() => openDialog('', DialogType.CREATE, TaskStage.SCHEDULED)}
        >
          <Plus />
          <span className="sr-only">Add a new scheduled task</span>
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
