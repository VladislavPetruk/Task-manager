'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { login } from '@/app/actions/authActions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components//ui/form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LOGIN_SCHEMA } from '@/shared/constants';
import { toast } from '@/shared/hooks';
import { LoginParams } from '@/shared/types';
import { zodResolver } from '@hookform/resolvers/zod';

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<LoginParams>({
    resolver: zodResolver(LOGIN_SCHEMA),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const disableSubmitButton =
    !form.getValues('email') || !form.getValues('password');

  const onSubmit: SubmitHandler<z.infer<typeof LOGIN_SCHEMA>> = async (
    values
  ) => {
    setLoading(true);
    const data = await login(values).finally(() => setLoading(false));
    if (data.status === 200) {
      router.push('/');
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
    <Card className="mx-auto sm:min-w-96">
      <CardHeader className="grid">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Please, login, to check the dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                {/* EMAIL FIELD */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full pb-4">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <div className="relative w-full">
                        <FormControl className="w-full">
                          <Input
                            id="email"
                            type="email"
                            autoCapitalize="none"
                            autoCorrect="off"
                            placeholder="Enter an email"
                            className="w-full text-zinc-700"
                            data-testid="login-email"
                            // disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* PASSWORD FIELD */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full pb-4">
                      <div className="flex items-center">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link
                          href="/forgot-password"
                          className="ml-auto inline-block text-sm font-medium hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <div className="relative w-full">
                        <FormControl className="w-full">
                          <Input
                            id="password"
                            type="password"
                            autoCapitalize="none"
                            autoCorrect="off"
                            placeholder="Enter a password"
                            className="w-full text-zinc-700"
                            data-testid="login-password"
                            // disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                disabled={disableSubmitButton || loading}
                type="submit"
                data-testid="login-submit"
              >
                {loading ? (
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-x-white" />
                ) : (
                  'Login'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <Link href="/registration" className="hover:underline">
          Don&apos;t have an account? <strong>Sign Up</strong>
        </Link>
      </CardFooter>
    </Card>
  );
}
