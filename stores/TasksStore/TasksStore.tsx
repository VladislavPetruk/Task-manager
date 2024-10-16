import { TASK_TYPE } from '@/constants/task';
import { createWithEqualityFn as create } from 'zustand/traditional'; // use with shallow
import { devtools } from 'zustand/middleware';

type TasksStoreState = {
  tasks: Map<string, TASK_TYPE>;
  activeTasks: Map<string, TASK_TYPE>;
  inProgressTasks: Map<string, TASK_TYPE>;
  doneTasks: Map<string, TASK_TYPE>;
  setTasks: (tasks: Array<TASK_TYPE>) => void;
};

export const useTasksStore = create<TasksStoreState>()(
  devtools(
    (set, get) => ({
      tasks: new Map(),
      activeTasks: new Map(),
      inProgressTasks: new Map(),
      doneTasks: new Map(),
      setTasks: (tasks) => {
        if (!tasks) return null;

        const tasksMap = new Map<string, TASK_TYPE>();
        const activeTasksMap = new Map<string, TASK_TYPE>();
        const inProgressTasksMap = new Map<string, TASK_TYPE>();
        const doneTasksMap = new Map<string, TASK_TYPE>();

        tasks.forEach((task) => {
          tasksMap.set(task.id, task);
          switch (task.status) {
            case 'to_do':
              activeTasksMap.set(task.id, task);
              break;
            case 'in_progress':
              inProgressTasksMap.set(task.id, task);
              break;
            case 'done':
              doneTasksMap.set(task.id, task);
              break;
          }
        });

        set({
          tasks: tasksMap,
          activeTasks: activeTasksMap,
          inProgressTasks: inProgressTasksMap,
          doneTasks: doneTasksMap,
        });
      },
    }),
    { name: 'TasksStore', serialize: { options: true } }
  )
);
