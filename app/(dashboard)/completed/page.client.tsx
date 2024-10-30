'use client';

import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import { TaskCard } from '@/components/TaskCard';
// import { TaskCard } from '@/components/TaskCard';
import { Loader } from '@/components/ui/loader';
import { useTasksStore } from '@/stores/TasksStore';

import { useGetCompletedTasks } from '../../api/tasks';

export default function CompletedClient() {
  const { data: completedTasks, isLoading: isLoadingCompletedTasks } =
    useGetCompletedTasks();
  const { setCompletedTasksInStore } = useTasksStore(
    (state) => ({
      // completedTasksInStore: state.completedTasks,
      setCompletedTasksInStore: state.setCompletedTasks,
    }),
    shallow
  );

  useEffect(() => {
    if (completedTasks) {
      setCompletedTasksInStore(completedTasks);
    }
  }, [completedTasks]);

  if (isLoadingCompletedTasks)
    return (
      <div className="grid h-full place-content-center">
        <Loader />
      </div>
    );

  if (!completedTasks?.length)
    return <div>You have not completed tasks yet</div>;
  console.log(completedTasks);

  return (
    <div className="grid grid-cols-3 gap-3">
      {completedTasks.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  );
}
