'use client';

import axios, { AxiosError } from 'axios';

import { TaskStatus } from '@/shared/constants/task';
import { toast } from '@/shared/hooks/useToast';
import {
  MutationOptions,
  useMutation,
  UseMutationResult,
} from '@tanstack/react-query';

const DRAG_AND_DROP_MUTATION_KEY = '@mutation/dragAndDropTask';

type DragAndDropTasksTasksParams = {
  id: string;
  status: TaskStatus;
  position: number;
};

const mutationFn = async (params: Array<DragAndDropTasksTasksParams>) => {
  try {
    await axios.put(`/api/tasks/update`, params);
  } catch (error) {
    if (error instanceof AxiosError) {
      const data = error.response?.data;
      if (data?.message) {
        toast({
          title: data.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Something went wrong',
          variant: 'destructive',
        });
      }
    }
    throw error;
  }
};

export function useDragAndDropTasks(
  options?: MutationOptions<unknown, Error, Array<DragAndDropTasksTasksParams>>
): UseMutationResult<unknown, Error, Array<DragAndDropTasksTasksParams>> {
  return useMutation<unknown, Error, Array<DragAndDropTasksTasksParams>>({
    mutationKey: [DRAG_AND_DROP_MUTATION_KEY],
    mutationFn: (params: Array<DragAndDropTasksTasksParams>) =>
      mutationFn(params),
    ...options,
  });
}
