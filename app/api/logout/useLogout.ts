'use client';

import axios, { AxiosError } from 'axios';

import { toast } from '@/hooks/useToast';
import {
  MutationOptions,
  useMutation,
  UseMutationResult,
} from '@tanstack/react-query';

const LOGOUT_MUTATION_KEY = '@mutation/logout';

const mutationFn = async () => {
  try {
    await axios.post('/api/logout');
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

export function useLogout(
  options?: MutationOptions<unknown, Error, unknown>
): UseMutationResult<unknown, Error> {
  return useMutation<unknown, Error, unknown>({
    mutationKey: [LOGOUT_MUTATION_KEY],
    mutationFn: () => mutationFn(),
    ...options,
  });
}
