import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type useExampleStoreState = {
  example: boolean;
  setExample: () => void;
};

export const useExampleStore = create<useExampleStoreState>()(
  devtools(
    (set, get) => ({
      example: false,
      setExample: () => set({ example: !get().example }),
    }),
    { name: 'ExampleStore', serialize: { options: true } }
  )
);
