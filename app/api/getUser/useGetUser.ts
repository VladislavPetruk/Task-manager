'use client';

import axios, { AxiosError } from 'axios';

import { toast } from '@/hooks/useToast';
import {
  QueryKey,
  QueryOptions,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

const GET_USER_QUERY_KEY = '@query/getUser';

const queryFn = async (): Promise<unknown> => {
  try {
    const { data } = await axios.get('/api/getUser');
    return data;
  } catch (error) {
    // Need fix. If some error need logout

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

export function useGetUser(
  options?: QueryOptions
): UseQueryResult<unknown, Error> {
  return useQuery<unknown, Error, unknown, QueryKey>({
    ...options,
    queryKey: [GET_USER_QUERY_KEY],
    queryFn: () => queryFn(),
  });
}
