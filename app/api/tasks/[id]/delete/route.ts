import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { Task } from '@/constants/task';
import prisma from '@/lib/prisma';

type Params = {
  id: Task['id'];
};

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const taskId = params;

    const task = await prisma.task.delete({
      where: {
        userId: session.user?.id,
        ...taskId,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: error || 'Error deleting task' },
      { status: 500 }
    );
  }
}
