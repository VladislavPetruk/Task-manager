'use client';

import axios, { AxiosError } from 'axios';

import { toast } from '@/shared/hooks/useToast';
import {
  MutationOptions,
  useMutation,
  UseMutationResult,
} from '@tanstack/react-query';

const CHANGE_PASSWORD_MUTATION_KEY = '@mutation/changePassword';

type ChangePasswordParams = {
  password: string;
};

const mutationFn = async (params: ChangePasswordParams) => {
  try {
    await axios.put(`/api/user/change-password`, params);
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

export function useChangePassword(
  options?: MutationOptions<unknown, Error, ChangePasswordParams>
): UseMutationResult<unknown, Error, ChangePasswordParams> {
  return useMutation<unknown, Error, ChangePasswordParams>({
    mutationKey: [CHANGE_PASSWORD_MUTATION_KEY],
    mutationFn: (params: ChangePasswordParams) => mutationFn(params),
    ...options,
  });
}
