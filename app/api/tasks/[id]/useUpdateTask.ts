'use client';

import axios, { AxiosError } from 'axios';

import { TASK_TYPE } from '@/constants/task';
import { toast } from '@/hooks/useToast';
import {
  MutationOptions,
  useMutation,
  UseMutationResult,
} from '@tanstack/react-query';

const UPDATE_TASK_MUTATION_KEY = '@mutation/updateTask';

type UpdateTaskParams = {
  id: TASK_TYPE['id'];
  title: TASK_TYPE['title'];
  description: TASK_TYPE['description'];
  tags: TASK_TYPE['tags'];
  priority: TASK_TYPE['priority'];
  status: TASK_TYPE['status'];
  isCompleted: TASK_TYPE['isCompleted'];
  isFutured: TASK_TYPE['isFutured'];
};

const mutationFn = async (params: UpdateTaskParams) => {
  try {
    await axios.put(`/api/tasks/${params.id}`, params);
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
