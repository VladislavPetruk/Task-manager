import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import prisma from '@/shared/lib/prisma';
import { UserTag } from '@prisma/client';

type Params = {
  id: UserTag['id'];
};

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role === 'USER') {
      return NextResponse.json(
        { message: `You don't have access` },
        { status: 403 }
      );
    }

    const taskId = params;

    const tag = await prisma.userTag.delete({
      where: {
        userId: session.user?.id,
        ...taskId,
      },
    });

    return NextResponse.json(tag);
  } catch (error) {
    return NextResponse.json(
      { error: error || 'Error deleting tag' },
      { status: 500 }
    );
  }
}
