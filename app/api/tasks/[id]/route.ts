import { NextResponse } from 'next/server';

import { TASK_TYPE } from '@/constants/task';
import { validateToken } from '@/helper/validateToken';
import prisma from '@/lib/prisma';

type Params = {
  id: TASK_TYPE['id'];
};

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const decodedToken = validateToken();

    if (!decodedToken?.username) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const id = params;

    const task = await prisma.task.delete({
      where: id,
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log('ERROR UPDATING TASK: ', error);
    return NextResponse.json({ error: 'Error deleting task' }, { status: 500 });
  }
}

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
