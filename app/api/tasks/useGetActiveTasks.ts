'use client';

import axios, { AxiosError } from 'axios';

import { TASK_TYPE } from '@/constants/task';
import { toast } from '@/hooks/useToast';
import { QueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';

export const GET_ACTIVE_TASKS_QUERY_KEY = '@query/getActiveTasks';

const queryFn = async (): Promise<TASK_TYPE[]> => {
  try {
    const { data } = await axios.get('/api/tasks?filter=active');
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
  options?: QueryOptions<TASK_TYPE[], Error>
): UseQueryResult<TASK_TYPE[], Error> {
  return useQuery<TASK_TYPE[], Error>({
    ...options,
    queryKey: [GET_ACTIVE_TASKS_QUERY_KEY],
    queryFn: queryFn,
  });
}
