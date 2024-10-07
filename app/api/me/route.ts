import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { JwtPayload, verify } from 'jsonwebtoken';

import { COOKIE_TOKEN_NAME } from '@/constants/other';

export async function GET() {
  const cookieStore = cookies();

  const token = cookieStore.get(COOKIE_TOKEN_NAME);

  if (!token) {
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      {
        status: 401,
      }
    );
  }

  const { value } = token;

  // Always check this
  const secret = process.env.JWT_SECRET || '';

  try {
    const decodedToken = verify(value, secret) as JwtPayload;

    const response = {
      username: decodedToken.username,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (e) {
    console.log(e);

    return NextResponse.json(
      {
        message: 'Something went wrong',
      },
      {
        status: 400,
      }
    );
  }
}
