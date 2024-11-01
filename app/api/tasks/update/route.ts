import { NextResponse } from 'next/server';

import { TaskStatus } from '@/constants/task';
import { validateToken } from '@/helper/validateToken';
import prisma from '@/lib/prisma';

export async function PUT(req: Request) {
  try {
    const decodedToken = validateToken();

    if (!decodedToken?.username) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const updatesPayload: {
      id: string;
      status: TaskStatus;
      position: number;
    }[] = await req.json();

    const updateTasks = updatesPayload.map((task) =>
      prisma.task.update({
        where: { id: task.id },
        data: { status: task.status, position: task.position },
      })
    );

    const tasks = await prisma.$transaction(updateTasks);

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
