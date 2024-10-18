'use client';
/* eslint-disable */

import { TaskCard } from '@/components/TaskCard';
import { Loader } from '@/components/ui/loader';
import { TASK_TYPE } from '@/constants/task';
import { shallow } from 'zustand/shallow';

import { Button } from '@/components/ui/button';
import { useDialogsStore } from '@/stores/DialogsStore';
import { useTasksStore } from '@/stores/TasksStore';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useGetActiveTasks } from '../api/tasks';
// import { createSwapy } from 'swapy';
// import { useEffect } from 'react';

const filterTasks = (tasks: Array<TASK_TYPE> | undefined, status: string) => {
  if (!tasks) return;
  return tasks.filter((task) => task.status === status);
};

// const TO_DO_TASKS = filterTasks('to do');
// const IN_PROGRESS_TASKS = filterTasks('in progress');
// const DONE_TASKS = filterTasks('done');

export default function HomeClient() {
  const { data, isError, isLoading } = useGetActiveTasks();
  const openDialog = useDialogsStore((state) => state.openDialog);

  const { toDoTasks, inProgressTasks, doneTasks, setActiveTasks } =
    useTasksStore(
      (state) => ({
        toDoTasks: state.toDoTasks,
        inProgressTasks: state.inProgressTasks,
        doneTasks: state.doneTasks,
        setActiveTasks: state.setActiveTasks,
      }),
      shallow
    );

  useEffect(() => {
    if (data) {
      setActiveTasks(data);
    }
  }, [data]);

  // const { mutate } = useCreateTask({
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: [GET_ACTIVE_TASKS_QUERY_KEY] });
  //   },
  // });
  //   const container = document.querySelector('.container1')!;
  //   const swapy = createSwapy(container, {});
  //   swapy.onSwap(({ data }) => {
  //     console.log(data);
  //   });
  //   return () => {
  //     swapy.destroy();
  //   };
  // }, []);

  if (isLoading)
    return (
      <div className="grid h-full place-content-center">
        <Loader />
      </div>
    );

  const TO_DO_TASKS = filterTasks(data, 'to_do');
  const IN_PROGRESS_TASKS = filterTasks(data, 'in_progress');
  const DONE_TASKS = filterTasks(data, 'done');

  // const handleSubmit = async (e: SyntheticEvent<HTMLButtonElement>) => {
  //   e.preventDefault();

  //   const task = {
  //     title,
  //     description,
  //     // date,
  //     tag,
  //     priority,
  //     status,
  //   };

  //   mutate(task)
  // };

  if (!TO_DO_TASKS || !IN_PROGRESS_TASKS || !DONE_TASKS) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="grid grid-rows-[max-content] gap-y-4 rounded-xl bg-gray-200 p-6">
        <div className="flex items-center justify-between font-medium">
          <p className="text-lg">
            To do {!!TO_DO_TASKS?.length && <span>{TO_DO_TASKS.length}</span>}
          </p>
          {/* <CreateTaskDialog /> */}
          <Button
            aria-haspopup="true"
            size="icon"
            variant="ghost"
            onClick={() => openDialog('', 'create')}
          >
            <Plus />
            <span className="sr-only">Add a new task</span>
          </Button>
        </div>
        {TO_DO_TASKS?.map((task) => (
          // <div data-swapy-slot={task.id} key={task.id}>
          <TaskCard key={task.id} {...task} />
          // </div>
        ))}
      </div>
      <div className="grid grid-rows-[max-content] gap-y-4 rounded-xl bg-gray-200 p-6">
        <div className="flex items-center justify-between font-medium">
          <p className="text-lg">
            In progress{' '}
            {!!IN_PROGRESS_TASKS?.length && (
              <span>{IN_PROGRESS_TASKS.length}</span>
            )}
          </p>
        </div>
        {IN_PROGRESS_TASKS?.map((task) => (
          // <div data-swapy-slot={task.id} key={task.id}>
          <TaskCard key={task.id} {...task} />
          // </div>
        ))}
      </div>
      <div className="grid grid-rows-[max-content] gap-y-4 rounded-xl bg-gray-200 p-6">
        <div className="flex items-center justify-between font-medium">
          <p className="text-lg">
            Done {!!DONE_TASKS?.length && <span>{DONE_TASKS.length}</span>}
          </p>
        </div>
        {DONE_TASKS?.map((task) => (
          // <div data-swapy-slot={task.id} key={task.id}>
          <TaskCard key={task.id} {...task} />
          // </div>
        ))}
      </div>
    </div>
  );
}
