import { TASK_TYPE } from '@/constants/task';
import { createWithEqualityFn as create } from 'zustand/traditional'; // use with shallow
import { devtools } from 'zustand/middleware';

type TasksStoreState = {
  allTasks: Map<string, TASK_TYPE>;
  activeTasks: Map<string, TASK_TYPE>;
  futureTasks: Map<string, TASK_TYPE>;
  completedTasks: Map<string, TASK_TYPE>;
  toDoTasks: Map<string, TASK_TYPE>;
  inProgressTasks: Map<string, TASK_TYPE>;
  doneTasks: Map<string, TASK_TYPE>;
  setActiveTasks: (tasks: Map<TASK_TYPE['status'], TASK_TYPE[]>) => void;
  setFutureTasks: (tasks: Array<TASK_TYPE>) => void;
  setCompletedTasks: (tasks: Array<TASK_TYPE>) => void;
  // setAllTasks: (tasks: Map<TASK_TYPE["status"], TASK_TYPE[]>) => void;
};

export const useTasksStore = create<TasksStoreState>()(
  devtools(
    (set, get) => ({
      allTasks: new Map(),
      activeTasks: new Map(),
      futureTasks: new Map(),
      completedTasks: new Map(),
      toDoTasks: new Map(),
      inProgressTasks: new Map(),
      doneTasks: new Map(),
      setActiveTasks: (tasks) => {
        if (!tasks) return null;

        const activeTasksMap = new Map<string, TASK_TYPE>();
        const toDoTasksMap = new Map<string, TASK_TYPE>();
        const inProgressTasksMap = new Map<string, TASK_TYPE>();
        const doneTasksMap = new Map<string, TASK_TYPE>();

        tasks.get('to_do')?.forEach((task) => {
          toDoTasksMap.set(task.id, task);
          activeTasksMap.set(task.id, task);
        });

        tasks.get('in_progress')?.forEach((task) => {
          inProgressTasksMap.set(task.id, task);
          activeTasksMap.set(task.id, task);
        });

        tasks.get('done')?.forEach((task) => {
          doneTasksMap.set(task.id, task);
          activeTasksMap.set(task.id, task);
        });

        // console.log(tasks);

        // tasks.forEach((task) => {
        //   activeTasksMap.set(task.id, task);
        //   switch (task.status) {
        //     case 'to_do':
        //       toDoTasksMap.set(task.id, task);
        //       break;
        //     case 'in_progress':
        //       inProgressTasksMap.set(task.id, task);
        //       break;
        //     case 'done':
        //       doneTasksMap.set(task.id, task);
        //       break;
        //   }
        // });

        const futureTasks = get().futureTasks;
        const completedTasks = get().completedTasks;

        set({
          activeTasks: activeTasksMap,
          toDoTasks: toDoTasksMap,
          inProgressTasks: inProgressTasksMap,
          doneTasks: doneTasksMap,
          allTasks: new Map([
            ...futureTasks,
            ...completedTasks,
            ...activeTasksMap,
          ]),
        });
      },
      setFutureTasks: (tasks) => {
        if (!tasks) return null;

        const futureTasksMap = new Map<string, TASK_TYPE>();

        tasks.forEach((task) => {
          futureTasksMap.set(task.id, task);
        });

        const activeTasks = get().activeTasks;
        const completedTasks = get().completedTasks;

        set({
          futureTasks: futureTasksMap,
          allTasks: new Map([
            ...activeTasks,
            ...completedTasks,
            ...futureTasksMap,
          ]),
        });
      },
      setCompletedTasks: (tasks) => {
        if (!tasks) return null;

        const completedTasksMap = new Map<string, TASK_TYPE>();

        tasks.forEach((task) => {
          completedTasksMap.set(task.id, task);
        });

        const activeTasks = get().activeTasks;
        const futureTasks = get().futureTasks;

        set({
          completedTasks: completedTasksMap,
          allTasks: new Map([
            ...activeTasks,
            ...futureTasks,
            ...completedTasksMap,
          ]),
        });
      },
    }),
    { name: 'TasksStore', serialize: { options: true } }
  )
);
