'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { resetPassword } from '@/app/actions/tokenActions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RESET_PASSWORD_SCHEMA, ResetPasswordSchema } from '@/shared/constants';
import { toast } from '@/shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ResetPassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<ResetPasswordSchema>({
    // mode: 'onTouched',
    resolver: zodResolver(RESET_PASSWORD_SCHEMA),
  });

  // const disableSubmitButton = !form.getValues('password').length;

  const onSubmit: SubmitHandler<ResetPasswordSchema> = async (values) => {
    setLoading(true);
    const data = await resetPassword(
      values.password,
      searchParams.get('token')
    ).finally(() => setLoading(false));
    if (data.status === 200) {
      router.push('/reset-password/success');
      form.reset();
    }
    if (data.status === 400 || data.status === 500) {
      toast({
        title: data.error,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="max-w-md">
      <p className="mb-8 text-center text-2xl text-muted-foreground">
        Please, enter a new password.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full pb-4">
                <FormLabel htmlFor="password" className="flex">
                  New password
                </FormLabel>
                <div className="relative w-full">
                  <FormControl className="w-full">
                    <Input
                      id="password"
                      type="password"
                      autoCapitalize="none"
                      autoCorrect="off"
                      placeholder="Enter a new password"
                      className="w-full text-zinc-700"
                      data-testid="reset-password-field"
                      // disabled={loading}
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            // disabled={disableSubmitButton}
            type="submit"
            data-testid="reset-password-submit"
            className="w-full min-w-40"
          >
            {loading ? (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-x-white" />
            ) : (
              'Reset password'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
