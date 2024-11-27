import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import prisma from '@/shared/lib/prisma';

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const result = await prisma.userTag.findMany({
      where: {
        userId: session.user?.id,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// export async function POST(req: Request) {
//   try {
//     const session = await auth();

//     if (!session) {
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     if (session.user.role === 'USER') {
//       return NextResponse.json(
//         { message: `You don't have access` },
//         { status: 403 }
//       );
//     }

//     const tags: Array<Partial<UserTag>> = await req.json();

//     await prisma.userTag.deleteMany({ where: { userId: session.user?.id } });

//     const result = await prisma.userTag.createMany({
//       data: tags.map((tag) => ({
//         userId: session.user?.id as string,
//         value: tag.value as string,
//         color: tag.color as string,
//       })),
//     });

//     return NextResponse.json(result);
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }
