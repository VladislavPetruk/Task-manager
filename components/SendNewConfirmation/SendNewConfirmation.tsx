'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { resendConfirmationEmail } from '@/app/actions/tokenActions';
import {
  RESEND_CONFIRMATION_SCHEMA,
  ResendConfirmationSchema,
} from '@/shared/constants';
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

export const SendNewConfirmation = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<ResendConfirmationSchema>({
    resolver: zodResolver(RESEND_CONFIRMATION_SCHEMA),
    defaultValues: {
      email: '',
    },
  });

  const disableSubmitButton = !form.getValues('email').length;

  const onSubmit: SubmitHandler<ResendConfirmationSchema> = async (values) => {
    setLoading(true);
    const data = await resendConfirmationEmail(values).finally(() =>
      setLoading(false)
    );
    if (data.status === 200) {
      router.push('/letter-sended');
      form.reset();
    }
    if (data.status === 400) {
      toast({
        title: data.error,
        variant: 'destructive',
      });
    }
    if (data.status === 500) {
      toast({
        title: data.error,
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full pb-4">
              <FormLabel htmlFor="email" className="flex">
                Email
              </FormLabel>
              <div className="relative w-full">
                <FormControl className="w-full">
                  <Input
                    id="email"
                    type="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    placeholder="Enter a email"
                    className="w-full text-zinc-700"
                    data-testid="resend-confirmation-email"
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
          disabled={disableSubmitButton}
          type="submit"
          data-testid="resend-confirmation-submit"
          className="w-full min-w-40"
        >
          {loading ? (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-x-white" />
          ) : (
            'Send a new confirmation'
          )}
        </Button>
      </form>
    </Form>
  );
};
