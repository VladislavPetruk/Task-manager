import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import prisma from '@/shared/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter');

    let whereCondition = {};

    if (filter === 'scheduled') {
      whereCondition = { currentStage: 'SCHEDULED', userId: session.user?.id };
    } else if (filter === 'archived') {
      whereCondition = { currentStage: 'ARCHIVED', userId: session.user?.id };
    } else if (filter === 'current') {
      whereCondition = { currentStage: 'CURRENT', userId: session.user?.id };
    }

    const tasks = await prisma.task.findMany({
      where: whereCondition,
      include: {
        comments: true,
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === 'Unauthorized' ||
        error.message === 'Invalid token'
      ) {
        return NextResponse.json({ message: error.message }, { status: 401 });
      }
    }

    return NextResponse.json({ error }, { status: 500 });
  }
}
