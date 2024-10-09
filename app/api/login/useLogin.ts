'use client';

import axios, { AxiosError } from 'axios';

import { toast } from '@/hooks/useToast';
import { LoginParams } from '@/types';
import {
  MutationOptions,
  useMutation,
  UseMutationResult,
} from '@tanstack/react-query';

const LOGIN_MUTATION_KEY = '@mutation/login';

const mutationFn = async (params: LoginParams) => {
  try {
    await axios.post('/api/login', params);
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

export function useLogin(
  options?: MutationOptions<unknown, Error, LoginParams>
): UseMutationResult<unknown, Error, LoginParams> {
  return useMutation<unknown, Error, LoginParams>({
    mutationKey: [LOGIN_MUTATION_KEY],
    mutationFn: (params: LoginParams) => mutationFn(params),
    ...options,
  });
}
