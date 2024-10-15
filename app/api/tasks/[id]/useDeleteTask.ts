'use client';

import axios, { AxiosError } from 'axios';

import { TASK_TYPE } from '@/constants/task';
import { toast } from '@/hooks/useToast';
import {
  MutationOptions,
  useMutation,
  UseMutationResult,
} from '@tanstack/react-query';

const DELETE_TASK_MUTATION_KEY = '@mutation/deleteTask';

type DeleteParams = TASK_TYPE['id'];

const mutationFn = async (params: DeleteParams) => {
  try {
    await axios.delete(`/api/tasks/${params}`, {
      params: { id: params },
    });
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

export function useDeleteTask(
  options?: MutationOptions<unknown, Error, DeleteParams>
): UseMutationResult<unknown, Error, DeleteParams> {
  return useMutation<unknown, Error, DeleteParams>({
    mutationKey: [DELETE_TASK_MUTATION_KEY],
    mutationFn: (params: DeleteParams) => mutationFn(params),
    ...options,
  });
}
