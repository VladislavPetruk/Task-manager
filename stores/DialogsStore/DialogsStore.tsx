import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type DialogTypeState = 'create' | 'update' | 'confirm';

type TasksStoreState = {
  showDialog: boolean;
  dialogType: DialogTypeState | undefined;
  currentTaskId: string;
  openDialog: (currentTaskId: string, dialogType: DialogTypeState) => void;
  closeDialog: () => void;
  toggleDialog: () => void;
};

export const useDialogsStore = create<TasksStoreState>()(
  devtools(
    (set, get) => ({
      showDialog: false,
      dialogType: undefined,
      currentTaskId: '',
      openDialog: (currentTaskId, dialogType) => {
        set({ showDialog: true, currentTaskId, dialogType });
      },
      closeDialog: () => {
        set({ showDialog: false, currentTaskId: '', dialogType: undefined });
      },
      toggleDialog: () => {
        set({ showDialog: !get().showDialog });
      },
    }),
    { name: 'DialogsStore', serialize: { options: true } }
  )
);
