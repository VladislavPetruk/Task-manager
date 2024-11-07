import { NextResponse } from 'next/server';

import { auth } from '@/auth';
/* eslint-disable */
import prisma from '@/lib/prisma';

export async function PUT(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id, comments, ...params } = await req.json();

    const task = await prisma.task.update({
      where: {
        id: id,
        userId: session.user?.id,
      },
      data: params,
      include: {
        comments: true,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log('ERROR UPDATING TASK: ', error);
    return NextResponse.json({ error: 'Error updating task' }, { status: 500 });
  }
}
