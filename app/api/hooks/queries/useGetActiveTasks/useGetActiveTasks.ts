'use client';

import axios, { AxiosError } from 'axios';

import { Task } from '@/shared/constants/task';
import { toast } from '@/shared/hooks/useToast';
import { QueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';

export const GET_ACTIVE_TASKS_QUERY_KEY = '@query/getActiveTasks';

const queryFn = async (): Promise<Array<Task>> => {
  try {
    const { data } = await axios.get('/api/tasks?filter=current');
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

export function useGetActiveTasks(
  options?: QueryOptions<Array<Task>, Error>
): UseQueryResult<Array<Task>, Error> {
  return useQuery<Array<Task>, Error>({
    ...options,
    queryKey: [GET_ACTIVE_TASKS_QUERY_KEY],
    queryFn: queryFn,
  });
}
