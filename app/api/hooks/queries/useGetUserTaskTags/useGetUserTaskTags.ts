'use client';

import axios, { AxiosError } from 'axios';

import { toast } from '@/hooks/useToast';
import { UserTag } from '@prisma/client';
import { QueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';

export const GET_USER_TASK_TAGS_QUERY_KEY = '@query/getUserTaskTags';

const queryFn = async (): Promise<Array<UserTag>> => {
  try {
    const { data } = await axios.get('/api/tags');
    return data;
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

export function useGetUserTaskTags(
  options?: QueryOptions<Array<UserTag>, Error>
): UseQueryResult<Array<UserTag>, Error> {
  return useQuery<Array<UserTag>, Error>({
    ...options,
    queryKey: [GET_USER_TASK_TAGS_QUERY_KEY],
    queryFn: queryFn,
  });
}
