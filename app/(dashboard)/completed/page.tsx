'use client';

import { TaskCard } from '@/components/TaskCard';
import { Loader } from '@/components/ui/loader';

import { useGetCompletedTasks } from '../../api/tasks';

export default function Completed() {
  const { data, isLoading } = useGetCompletedTasks();

  if (isLoading)
    return (
      <div className="grid h-full place-content-center">
        <Loader />
      </div>
    );

  if (!data?.length) return <div>You have not completed tasks yet</div>;
  console.log(data);

  return (
    <div className="grid grid-cols-3">
      {data.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  );
}
