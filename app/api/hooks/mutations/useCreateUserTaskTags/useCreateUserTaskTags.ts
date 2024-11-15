'use client';

import axios, { AxiosError } from 'axios';

import { toast } from '@/hooks/useToast';
import { UserTag } from '@prisma/client';
import {
  MutationOptions,
  useMutation,
  UseMutationResult,
} from '@tanstack/react-query';

export const CREATE_USER_TASK_TAGS_MUTATION_KEY =
  '@mutation/createUserTaskTags';

const mutationFn = async (params: Partial<UserTag>) => {
  try {
    await axios.post('/api/tags/create', params);
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

export function useCreateUserTaskTags(
  options?: MutationOptions<unknown, Error, Partial<UserTag>>
): UseMutationResult<unknown, Error, Partial<UserTag>> {
  return useMutation<unknown, Error, Partial<UserTag>>({
    mutationKey: [CREATE_USER_TASK_TAGS_MUTATION_KEY],
    mutationFn: (params: Partial<UserTag>) => mutationFn(params),
    ...options,
  });
}
