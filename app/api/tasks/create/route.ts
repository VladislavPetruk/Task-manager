import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, tags, priority, status, currentStage } =
      await req.json();

    if (!title || !description) {
      return NextResponse.json(
        {
          error: 'Missing required fields, title or description',
        },
        { status: 400 }
      );
    }

    if (title.length < 3) {
      return NextResponse.json(
        {
          error: 'Title must be at least 3 characters long',
        },
        { status: 400 }
      );
    }

    const lastTask = await prisma.task.findFirst({
      where: { status },
      orderBy: { position: 'desc' },
    });

    const position = Math.min(
      ((lastTask?.position ?? 0) + 1) * 1000,
      1_000_000
    );

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        status,
        currentStage,
        position,
        tags,
        user: {
          connect: { id: session.user?.id },
        },
        comments: {
          create: [],
        },
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: error as string }, { status: 500 });
  }
}
