import { NextResponse } from 'next/server';

import { validateToken } from '@/helper/validateToken';
import prisma from '@/lib/prisma';

export async function PUT(req: Request) {
  try {
    const decodedToken = validateToken();

    if (!decodedToken?.username) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id, ...params } = await req.json();

    const task = await prisma.task.update({
      where: {
        id: id,
      },
      data: params,
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log('ERROR UPDATING TASK: ', error);
    return NextResponse.json({ error: 'Error deleting task' }, { status: 500 });
  }
}
