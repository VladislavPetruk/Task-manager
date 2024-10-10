import { COOKIE_TOKEN_NAME } from '@/constants/other';
import { JwtPayload, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const validateToken = () => {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_TOKEN_NAME);

  if (!token) {
    throw new Error('Unauthorized');
  }

  const { value } = token;
  const secret = process.env.JWT_SECRET || '';

  try {
    const decodedToken = verify(value, secret);
    return decodedToken as JwtPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
