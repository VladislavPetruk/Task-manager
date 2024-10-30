import { NextResponse } from 'next/server';

import { validateToken } from '@/helper/validateToken';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const decodedToken = validateToken();

    if (!decodedToken?.username) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, tags, priority, status } = await req.json();

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
        tags,
        priority,
        status,
        position,
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
