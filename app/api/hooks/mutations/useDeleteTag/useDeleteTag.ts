'use client';

import axios, { AxiosError } from 'axios';

import { toast } from '@/shared/hooks/useToast';
import { UserTag } from '@prisma/client';
import {
  MutationOptions,
  useMutation,
  UseMutationResult,
} from '@tanstack/react-query';

const DELETE_TAG_MUTATION_KEY = '@mutation/deleteTag';

type DeleteParams = UserTag['id'];

const mutationFn = async (params: DeleteParams) => {
  try {
    await axios.delete(`/api/tags/${params}/delete`, {
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

export function useDeleteTag(
  options?: MutationOptions<unknown, Error, DeleteParams>
): UseMutationResult<unknown, Error, DeleteParams> {
  return useMutation<unknown, Error, DeleteParams>({
    mutationKey: [DELETE_TAG_MUTATION_KEY],
    mutationFn: (params: DeleteParams) => mutationFn(params),
    ...options,
  });
}
