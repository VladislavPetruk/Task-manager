'use client';

import axios, { AxiosError } from 'axios';

import { toast } from '@/hooks/useToast';
import { UserTag } from '@prisma/client';
import {
  MutationOptions,
  useMutation,
  UseMutationResult,
} from '@tanstack/react-query';

const UPDATE_TAG_MUTATION_KEY = '@mutation/updateTag';

type UpdateTagParams = {
  id: UserTag['id'];
  value?: UserTag['value'];
  color?: UserTag['color'];
};

const mutationFn = async (params: UpdateTagParams) => {
  try {
    await axios.put(`/api/tags/${params.id}/update`, params);
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

export function useUpdateTag(
  options?: MutationOptions<unknown, Error, UpdateTagParams>
): UseMutationResult<unknown, Error, UpdateTagParams> {
  return useMutation<unknown, Error, UpdateTagParams>({
    mutationKey: [UPDATE_TAG_MUTATION_KEY],
    mutationFn: (params: UpdateTagParams) => mutationFn(params),
    ...options,
  });
}
