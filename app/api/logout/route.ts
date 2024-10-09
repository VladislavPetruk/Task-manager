import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { COOKIE_TOKEN_NAME } from '@/constants/other';

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_TOKEN_NAME);

  try {
    const response = {
      message: 'Successfully logout',
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
