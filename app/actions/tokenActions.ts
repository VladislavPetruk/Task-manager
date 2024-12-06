'use server';

/* eslint-disable */

import { ResendConfirmationSchema } from '@/shared/constants';
import prisma from '@/shared/lib/prisma';
import { sendVerificationEmail } from '@/shared/mails';
import { ActionResult } from '@/shared/types';
import { TokenType } from '@prisma/client';

import { getUserByEmail } from './authActions';
import { sendForgotPasswordEmail } from '@/shared/mails/sendForgotPasswordEmail';
import bcrypt from 'bcryptjs';

export async function verifyEmail(
  token: string
): Promise<ActionResult<string>> {
  try {
    const existingToken = await getTokenByToken(token);

    if (!existingToken) {
      return { status: 'error', error: 'Your token is invalid ' };
    }

    const hasExpired = new Date() > existingToken.expires;

    if (hasExpired) {
      return {
        status: 'error',
        error: 'Your confirmation letter is expired',
      };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { status: 'error', error: 'User not found' };
    }

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { emailVerified: new Date() },
    });

    await prisma.token.delete({ where: { id: existingToken.id } });

    return { status: 'success', data: 'Success' };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTokenByEmail(email: string) {
  try {
    return prisma.token.findFirst({
      where: { email },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTokenByToken(token: string) {
  try {
    return prisma.token.findFirst({
      where: { token },
    });
  } catch (error) {
    throw error;
  }
}

export async function generateToken(email: string, type: TokenType) {
  const token = getToken();
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); //  Expires in 24 hours

  const existingToken = await getTokenByEmail(email);

  if (existingToken) {
    await prisma.token.delete({
      where: { id: existingToken.id },
    });
  }

  return prisma.token.create({
    data: {
      email,
      token,
      expires,
      type,
    },
  });
}

function getToken() {
  const arrayBuffer = new Uint8Array(48);
  crypto.getRandomValues(arrayBuffer);
  return Array.from(arrayBuffer, (byte) =>
    byte.toString(16).padStart(2, '0')
  ).join('');
}

export const resendConfirmationEmail = async (
  values: ResendConfirmationSchema
) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: values.email },
    });

    if (!existingUser || !existingUser.email)
      return { status: 400, error: 'User not found' };

    const verificationToken = await generateToken(
      values.email,
      TokenType.VERIFICATION
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      status: 200,
      message: 'Resend verification token successfully sended!',
    };
  } catch (error) {
    return {
      status: 500,
      error: 'Resend verification token failed. Please try again later.',
    };
  }
};

export const generateForgotPasswordEmail = async (
  values: ResendConfirmationSchema
) => {
  try {
    const existingUser = await getUserByEmail(values.email);

    if (!existingUser) {
      return { status: 400, error: 'Email not found' };
    }

    const token = await generateToken(values.email, TokenType.PASSWORD_RESET);

    await sendForgotPasswordEmail(token.email, token.token);

    return {
      status: 200,
      data: 'Password reset email has been sent. Please check your emails',
    };
  } catch (error) {
    console.log(error);
    return { status: 500, error: 'Something went wrong' };
  }
};

export async function resetPassword(password: string, token: string | null) {
  try {
    if (!token) return { status: 400, error: 'Missing token' };

    const existingToken = await getTokenByToken(token);

    if (!existingToken) {
      return { status: 400, error: 'Invalid token' };
    }

    const hasExpired = new Date() > existingToken.expires;

    if (hasExpired) {
      return { status: 400, error: 'Token has expired' };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { status: 400, error: 'User not found' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });

    await prisma.token.delete({
      where: { id: existingToken.id },
    });

    return {
      status: 200,
      data: 'Password updated successfully.  Please try logging in',
    };
  } catch (error) {
    return { status: 500, error: 'Something went wrong' };
  }
}
