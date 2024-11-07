import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { TaskStatus } from '@/constants/task';
import prisma from '@/lib/prisma';

export async function PUT(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const updatesPayload: {
      id: string;
      status: TaskStatus;
      position: number;
    }[] = await req.json();

    const updateTasks = updatesPayload.map((task) =>
      prisma.task.update({
        where: { id: task.id, userId: session.user?.id },
        data: { status: task.status, position: task.position },
      })
    );

    const tasks = await prisma.$transaction(updateTasks);

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
