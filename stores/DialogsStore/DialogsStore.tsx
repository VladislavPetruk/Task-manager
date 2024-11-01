import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type DialogTypeState = 'create' | 'update' | 'confirm';
type TaskTypeState = 'futured' | 'active' | 'completed';

type TasksStoreState = {
  showDialog: boolean;
  dialogType: DialogTypeState | undefined;
  taskType: TaskTypeState | undefined;
  currentTaskId: string;
  openDialog: (
    currentTaskId: string,
    dialogType: DialogTypeState,
    taskType: TaskTypeState
  ) => void;
  closeDialog: () => void;
  toggleDialog: () => void;
};

export const useDialogsStore = create<TasksStoreState>()(
  devtools(
    (set, get) => ({
      showDialog: false,
      dialogType: undefined,
      taskType: undefined,
      currentTaskId: '',
      openDialog: (
        currentTaskId = '',
        dialogType = 'create',
        taskType = 'active'
      ) => {
        set({ showDialog: true, currentTaskId, dialogType, taskType });
      },
      closeDialog: () => {
        set({
          showDialog: false,
          currentTaskId: '',
          dialogType: undefined,
          taskType: undefined,
        });
      },
      toggleDialog: () => {
        set({ showDialog: !get().showDialog });
      },
    }),
    { name: 'DialogsStore', serialize: { options: true } }
  )
);
