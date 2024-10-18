'use client';

import { useGetFutureTasks } from '@/app/api/tasks';
import { Loader } from '@/components/ui/loader';

export default function FutureClient() {
  const { data, isLoading } = useGetFutureTasks();

  if (isLoading)
    return (
      <div className="grid h-full place-content-center">
        <Loader />
      </div>
    );
  console.log(data);

  return <div className="">333</div>;
}
