import { DialogType } from '@/shared/constants/other';
import { TaskStage } from '@/shared/constants/task';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TasksStoreState = {
  showDialog: boolean;
  dialogType: DialogType | undefined;
  taskStage: TaskStage | undefined;
  currentTaskId: string;
  openDialog: (
    currentTaskId: string,
    dialogType: DialogType,
    taskStage: TaskStage
  ) => void;
  closeDialog: () => void;
  toggleDialog: () => void;
};

export const useDialogsStore = create<TasksStoreState>()(
  devtools(
    (set, get) => ({
      showDialog: false,
      dialogType: undefined,
      taskStage: undefined,
      currentTaskId: '',
      openDialog: (currentTaskId = '', dialogType, taskStage) => {
        set({ showDialog: true, currentTaskId, dialogType, taskStage });
      },
      closeDialog: () => {
        set({
          showDialog: false,
          currentTaskId: '',
          dialogType: undefined,
          taskStage: undefined,
        });
      },
      toggleDialog: () => {
        set({ showDialog: !get().showDialog });
      },
    }),
    { name: 'DialogsStore', serialize: { options: true } }
  )
);
