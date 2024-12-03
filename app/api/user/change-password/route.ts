import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { auth } from '@/auth';
import prisma from '@/shared/lib/prisma';

export async function PUT(req: Request) {
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

    const user = await prisma.user.findUnique({
      where: {
        id: session.user?.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: `You don't have access` },
        { status: 403 }
      );
    }

    const { password: newPassword } = await req.json();

    const passwordsMatch = await bcrypt.compare(newPassword, user?.password);

    if (passwordsMatch) {
      return NextResponse.json(
        { message: `You can't use your previous passwords` },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await prisma.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
