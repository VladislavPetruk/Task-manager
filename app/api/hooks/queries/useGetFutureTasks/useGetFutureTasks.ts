'use client';

import axios, { AxiosError } from 'axios';

import { Task } from '@/shared/constants/task';
import { toast } from '@/shared/hooks/useToast';
import { QueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';

export const GET_FUTURE_TASKS_QUERY_KEY = '@query/getFutureTasks';

const queryFn = async (): Promise<Array<Task>> => {
  try {
    const { data } = await axios.get('/api/tasks?filter=scheduled');
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

export function useGetFutureTasks(
  options?: QueryOptions<Array<Task>, Error>
): UseQueryResult<Array<Task>, Error> {
  return useQuery<Array<Task>, Error>({
    ...options,
    queryKey: [GET_FUTURE_TASKS_QUERY_KEY],
    queryFn: queryFn,
  });
}
