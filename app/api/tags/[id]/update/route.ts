import { NextResponse } from 'next/server';

import { auth } from '@/auth';
/* eslint-disable */
import prisma from '@/shared/lib/prisma';

export async function PUT(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role === 'USER') {
      return NextResponse.json(
        { message: `You don't have access` },
        { status: 403 }
      );
    }

    const { id, ...params } = await req.json();

    const tag = await prisma.userTag.update({
      where: {
        id,
        userId: session.user?.id,
      },
      data: params,
    });

    return NextResponse.json(tag);
  } catch (error) {
    console.log('ERROR UPDATING TAG: ', error);
    return NextResponse.json({ error: 'Error updating tag' }, { status: 500 });
  }
}
