'use client';

import axios, { AxiosError } from 'axios';

import { TASK_TYPE } from '@/constants/task';
import { toast } from '@/hooks/useToast';
import { QueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';

export const GET_COMPLETED_TASKS_QUERY_KEY = '@query/getCompletedTasks';

const queryFn = async (): Promise<TASK_TYPE[]> => {
  try {
    const { data } = await axios.get('/api/tasks?filter=completed');
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

export function useGetCompletedTasks(
  options?: QueryOptions<TASK_TYPE[], Error>
): UseQueryResult<TASK_TYPE[], Error> {
  return useQuery<TASK_TYPE[], Error>({
    ...options,
    queryKey: [GET_COMPLETED_TASKS_QUERY_KEY],
    queryFn: queryFn,
  });
}
