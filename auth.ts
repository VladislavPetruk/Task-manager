import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import authConfig from '@/auth.config';
import prisma from './shared/lib/prisma';
import { Role } from '@prisma/client';
import type { Adapter } from 'next-auth/adapters';

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
  ...authConfig,
});
