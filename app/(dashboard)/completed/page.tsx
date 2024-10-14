'use client';

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
  console.log(data);

  return <div className="">333</div>;
}
