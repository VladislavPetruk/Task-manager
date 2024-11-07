import type { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from './app/actions/authActions';
import { LOGIN_SCHEMA } from './types';

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        const validatedFields = LOGIN_SCHEMA.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
