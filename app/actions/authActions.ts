'use server';

import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';

import { auth, signIn, signOut } from '@/auth';
import prisma from '@/lib/prisma';
import { LoginParams, REGISTRATION_SCHEMA, RegistrationParams } from '@/types';

export const register = async (values: RegistrationParams) => {
  try {
    const validatedFields = REGISTRATION_SCHEMA.safeParse(values);
    if (!validatedFields.success) {
      return {
        status: 400,
        error: 'Invalid fields!',
      };
    }

    const { username, email, password } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return {
        status: 400,
        error: 'User already exists!',
      };
    }

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return {
      status: 200,
      message: 'User successfully created!',
    };
  } catch (error) {
    console.log(error);

    return {
      status: 500,
      error: 'Registration failed. Please try again later.',
    };
  }
};

export const login = async (values: LoginParams) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: values.email },
    });

    if (!existingUser || !existingUser.email)
      return { status: 400, error: 'User not found' };

    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    return { status: 200, data: 'Logged in' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { status: 500, error: 'Invalid email or password' };
        default:
          return { status: 500, error: 'Something went wrong' };
      }
    } else {
      return { status: 500, error: 'Something else went wrong' };
    }
  }
};

export async function logOut() {
  await signOut({ redirectTo: '/login' });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getAuthUserId() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error('Unauthorized');

  return userId;
}

// export async function getUserRole() {
//   const session = await auth();

//   const role = session?.user?.role;

//   if (!role) throw new Error('Not in role');

//   return role;
// }
