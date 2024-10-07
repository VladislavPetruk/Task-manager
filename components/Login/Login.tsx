'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

const formSchema = z.object({
  username: z.string({
    required_error: 'You must fill username to login in system',
  }),
  password: z
    .string({
      invalid_type_error: 'Invalid password',
      required_error: 'You must fill in this field.',
    })
    .min(8),
});

type FormValues = z.infer<typeof formSchema>;

export const Login = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  async function handleLogin(data: FormValues) {
    // setIsLoading(true)

    // setTimeout(() => {
    //   setIsLoading(false)
    // }, 1500)

    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`;

    const body = {
      username: data.username,
      password: data.password,
      // confirmed: true,
      // role: {
      //   id: 1
      // }
    };

    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (res) => {
        const response = await res.json();

        if (response.jwt) {
          // toast.success('Success', {
          //   description: 'Registration successfully complete!',
          // })
          // localStorage.setItem('sharelink.shop-jwt', response.jwt)
          // localStorage.setItem('sharelink.shop-userId', response.user.id)
          // router.push('/dashboard')
        }

        if (response.error.message === 'Email already taken') {
          alert('E-mail already exists.');
        } else if (response.error.message === 'This attribute must be unique') {
          alert('Username already registered.');
        } else if (response.error) {
          alert(
            'Error: An error occurred while registering, please try again.'
          );
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <Card className="mx-auto min-w-96">
      <CardHeader className="grid">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Please, login, to check the system</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                {/* USERNAME ADDRESS FIELD */}
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
              <Button>
                {/* {isLoading && (
                <div className="w-4 h-4 rounded-full border-2 border-x-white animate-spin mr-2" />
              )} */}
                Login
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
