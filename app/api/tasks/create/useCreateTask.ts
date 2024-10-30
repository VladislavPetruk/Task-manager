'use client';

import axios, { AxiosError } from 'axios';

import { Task } from '@/constants/task';
import { toast } from '@/hooks/useToast';
import {
  MutationOptions,
  useMutation,
  UseMutationResult,
} from '@tanstack/react-query';

export const CREATE_TASK_MUTATION_KEY = '@mutation/createTask';

type CreateTaskParams = {
  title: Task['title'];
  description: Task['description'];
  tags: Task['tags'];
  priority: Task['priority'];
  status: Task['status'];
};

const mutationFn = async (params: CreateTaskParams) => {
  try {
    await axios.post('/api/tasks/create', params);
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

export function useCreateTask(
  options?: MutationOptions<unknown, Error, CreateTaskParams>
): UseMutationResult<unknown, Error, CreateTaskParams> {
  return useMutation<unknown, Error, CreateTaskParams>({
    mutationKey: [CREATE_TASK_MUTATION_KEY],
    mutationFn: (params: CreateTaskParams) => mutationFn(params),
    ...options,
  });
}
