import { Task, TaskStatus } from '@/constants/task';
import { createWithEqualityFn as create } from 'zustand/traditional'; // use with shallow
import { devtools } from 'zustand/middleware';

type TasksStoreState = {
  allTasks: Map<string, Task>;
  activeTasks: Map<string, Task>;
  futureTasks: Map<string, Task>;
  completedTasks: Map<string, Task>;
  toDoTasks: Map<string, Task>;
  inProgressTasks: Map<string, Task>;
  doneTasks: Map<string, Task>;
  setActiveTasks: (tasks: Array<Task>) => void;
  setFutureTasks: (tasks: Array<Task>) => void;
  setCompletedTasks: (tasks: Array<Task>) => void;
  // setAllTasks: (tasks: Map<Task["status"], Task[]>) => void;
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

        const activeTasksMap = new Map<string, Task>();
        const toDoTasksMap = new Map<string, Task>();
        const inProgressTasksMap = new Map<string, Task>();
        const doneTasksMap = new Map<string, Task>();

        // tasks.get()?.forEach((task) => {
        //   toDoTasksMap.set(task.id, task);
        //   activeTasksMap.set(task.id, task);
        // });

        // tasks.get('in_progress')?.forEach((task) => {
        //   inProgressTasksMap.set(task.id, task);
        //   activeTasksMap.set(task.id, task);
        // });

        // tasks.get('done')?.forEach((task) => {
        //   doneTasksMap.set(task.id, task);
        //   activeTasksMap.set(task.id, task);
        // });

        // console.log(tasks);

        tasks.forEach((task) => {
          activeTasksMap.set(task.id, task);
          switch (task.status) {
            case TaskStatus.TO_DO:
              toDoTasksMap.set(task.id, task);
              break;
            case TaskStatus.IN_PROGRESS:
              inProgressTasksMap.set(task.id, task);
              break;
            case TaskStatus.DONE:
              doneTasksMap.set(task.id, task);
              break;
          }
        });

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

        const futureTasksMap = new Map<string, Task>();

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

        const completedTasksMap = new Map<string, Task>();

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
