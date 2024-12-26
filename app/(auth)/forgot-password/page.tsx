'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { generateForgotPasswordEmail } from '@/app/actions/tokenActions';
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
import {
  RESEND_CONFIRMATION_SCHEMA,
  ResendConfirmationSchema,
} from '@/shared/constants';
import { toast } from '@/shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ForgotPassword() {
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
    const data = await generateForgotPasswordEmail(values).finally(() =>
      setLoading(false)
    );
    if (data.status === 200) {
      router.push('/letter-sended');
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
      <p className="mb-8 text-center text-2xl font-medium text-foreground">
        Please, enter your email and we send you a reset password letter.
      </p>
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
            data-testid="forgot-password-submit"
            className="w-full min-w-40"
          >
            {loading ? (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-x-white" />
            ) : (
              'Send a reset password letter'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
