'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { register } from '@/app/actions/authActions';
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
import { toast } from '@/hooks/useToast';
import { REGISTRATION_SCHEMA, RegistrationParams } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<RegistrationParams>({
    resolver: zodResolver(REGISTRATION_SCHEMA),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<z.infer<typeof REGISTRATION_SCHEMA>> = async (
    values
  ) => {
    setLoading(true);
    const data = await register(values).finally(() => setLoading(false));

    if (data.status === 200) {
      form.reset();
      toast({
        title: data.message,
        variant: 'success',
      });
      setTimeout(() => {
        router.push('/login');
      }, 5000);
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
    <Card className="mx-auto min-w-96">
      <CardHeader className="grid">
        <CardTitle className="text-2xl">Registration</CardTitle>
        <CardDescription>Please, register, to check the system</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                {/* USERNAME FIELD */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="w-full pb-4">
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <div className="relative w-full">
                        <FormControl className="w-full">
                          <Input
                            id="username"
                            type="text"
                            autoCapitalize="none"
                            autoCorrect="off"
                            placeholder="Enter a username"
                            className="w-full text-zinc-700"
                            // disabled={isLoading}
                            defaultValue={field.value}
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                            type="text"
                            autoCapitalize="none"
                            autoCorrect="off"
                            placeholder="Enter a email"
                            className="w-full text-zinc-700"
                            // disabled={isLoading}
                            defaultValue={field.value}
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
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <div className="relative w-full">
                        <FormControl className="w-full">
                          <Input
                            id="password"
                            type="password"
                            autoCapitalize="none"
                            autoCorrect="off"
                            placeholder="Enter a password"
                            className="w-full text-zinc-700"
                            // disabled={isLoading}
                            defaultValue={field.value}
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={loading}>
                {loading ? (
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-x-white" />
                ) : (
                  'Register'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Link href="/login">
          Already have an account? <strong>Sign In</strong>
        </Link>
      </CardFooter>
    </Card>
  );
}
