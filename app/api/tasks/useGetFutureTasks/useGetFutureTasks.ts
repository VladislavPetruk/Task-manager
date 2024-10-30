'use client';

import axios, { AxiosError } from 'axios';

import { Task } from '@/constants/task';
import { toast } from '@/hooks/useToast';
import { QueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';

export const GET_FUTURE_TASKS_QUERY_KEY = '@query/getFutureTasks';

const queryFn = async (): Promise<Task[]> => {
  try {
    const { data } = await axios.get('/api/tasks?filter=future');
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
  options?: QueryOptions<Task[], Error>
): UseQueryResult<Task[], Error> {
  return useQuery<Task[], Error>({
    ...options,
    queryKey: [GET_FUTURE_TASKS_QUERY_KEY],
    queryFn: queryFn,
  });
}
