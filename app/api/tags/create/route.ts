import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { UserTag } from '@prisma/client';

export async function POST(req: Request) {
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

    const tag: Partial<UserTag> = await req.json();

    const result = await prisma.userTag.create({
      data: {
        userId: session.user?.id as string,
        value: tag.value as string,
        color: tag.color as string,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
