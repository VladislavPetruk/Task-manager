import { NextRequest, NextResponse } from 'next/server';

import { validateToken } from '@/helper/validateToken';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const decodedToken = validateToken();

    if (!decodedToken?.username) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters (optional)
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter');

    let whereCondition = {};

    // Set `where` condition based on the filter parameter
    if (filter === 'scheduled') {
      whereCondition = { currentStage: 'SCHEDULED' };
    } else if (filter === 'archived') {
      whereCondition = { currentStage: 'ARCHIVED' };
    } else if (filter === 'current') {
      whereCondition = { currentStage: 'CURRENT' };
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
