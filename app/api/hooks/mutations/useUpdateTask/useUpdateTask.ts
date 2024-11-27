'use client';

import axios, { AxiosError } from 'axios';

import {
  Task,
  TaskPriority,
  TaskStage,
  TaskStatus,
} from '@/shared/constants/task';
import { toast } from '@/shared/hooks/useToast';
import {
  MutationOptions,
  useMutation,
  UseMutationResult,
} from '@tanstack/react-query';

const UPDATE_TASK_MUTATION_KEY = '@mutation/updateTask';

type UpdateTaskParams = {
  id: Task['id'];
  title: Task['title'];
  description: Task['description'];
  tags: Task['tags'];
  priority: TaskPriority;
  status: TaskStatus;
  currentStage: TaskStage;
};

const mutationFn = async (params: UpdateTaskParams) => {
  try {
    await axios.put(`/api/tasks/${params.id}/update`, params);
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

export function useUpdateTask(
  options?: MutationOptions<unknown, Error, UpdateTaskParams>
): UseMutationResult<unknown, Error, UpdateTaskParams> {
  return useMutation<unknown, Error, UpdateTaskParams>({
    mutationKey: [UPDATE_TASK_MUTATION_KEY],
    mutationFn: (params: UpdateTaskParams) => mutationFn(params),
    ...options,
  });
}
