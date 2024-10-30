'use client';

import axios, { AxiosError } from 'axios';

import { Task } from '@/constants/task';
import { toast } from '@/hooks/useToast';
import { QueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';

export const GET_ACTIVE_TASKS_QUERY_KEY = '@query/getActiveTasks';

// const groupTasksByStatus = (tasks: Task[]): Task[] => {
//   const taskMap = new Task[]([
//     ['to_do', []],
//     ['in_progress', []],
//     ['done', []],
//   ]);

//   tasks.forEach(task => {
//     if (task.status !== 'cancel') {
//       taskMap.get(task.status)!.push(task);
//     }
//   });

//   return taskMap;
// };

const queryFn = async (): Promise<Task[]> => {
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
  options?: QueryOptions<Task[], Error>
): UseQueryResult<Task[], Error> {
  return useQuery<Task[], Error>({
    ...options,
    queryKey: [GET_ACTIVE_TASKS_QUERY_KEY],
    queryFn: queryFn,
  });
}
