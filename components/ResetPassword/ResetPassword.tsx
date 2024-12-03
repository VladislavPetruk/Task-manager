import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useChangePassword } from '@/app/api/hooks/mutations';
import { RESET_PASSWORD_SCHEMA, ResetPasswordSchema } from '@/shared/constants';
import { toast } from '@/shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

export const ResetPassword = () => {
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(RESET_PASSWORD_SCHEMA),
    defaultValues: {
      password: '',
    },
  });

  const { mutate: mutateChangePasword, isPending: isPendingChangePassword } =
    useChangePassword({
      onSuccess: () => {
        form.reset();
        toast({
          title: 'Password successfully updated',
          variant: 'success',
        });
      },
    });

  const onSubmit: SubmitHandler<ResetPasswordSchema> = async (values) => {
    mutateChangePasword(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full pb-4">
              <FormLabel htmlFor="password">New password</FormLabel>
              <div className="relative w-full">
                <FormControl className="w-full">
                  <Input
                    id="password"
                    type="password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    placeholder="Enter a new password"
                    className="w-full text-zinc-700"
                    data-testid="login-password"
                    disabled={isPendingChangePassword}
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPendingChangePassword}
          type="submit"
          data-testid="change-password-submit"
          className="min-w-40"
        >
          {isPendingChangePassword ? (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-x-white" />
          ) : (
            'Change password'
          )}
        </Button>
      </form>
    </Form>
  );
};
