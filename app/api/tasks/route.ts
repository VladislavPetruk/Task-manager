// import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from 'next/server';

import { validateToken } from '@/helper/validateToken';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return NextResponse.json({ error: "Unauthorized", status: 401 });
    // }

    const { title, description, tag, priority, status } = await req.json();

    if (!title || !description) {
      return NextResponse.json({
        error: 'Missing required fields',
        status: 400,
      });
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: 'Title must be at least 3 characters long',
        status: 400,
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        tag,
        priority,
        status,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log('ERROR CREATING TASK: ', error);
    return NextResponse.json({ status: 500, error: error as string });
  }
}

// export async function GET(req: Request) {    Old
//   try {
//     // const { userId } = auth();

//     // if (!userId) {
//     //   return NextResponse.json({ error: "Unauthorized", status: 401 });
//     // }

//     console.log(req);

//     const tasks = await prisma.task.findMany({
//       // where: {
//       //   userId,
//       // },
//     });

//     return NextResponse.json(tasks);
//   } catch (error) {
//     console.log('ERROR GETTING TASKS: ', error);
//     return NextResponse.json({ error: 'Error updating task', status: 500 });
//   }
// }

export async function GET(request: NextRequest) {
  try {
    const decodedToken = validateToken();
    const username = decodedToken?.username;

    if (!username) {
      return NextResponse.json({ message: 'Unauthorized', status: 401 });
    }

    // Get query parameters (optional)
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter');

    let whereCondition = {};

    // Set `where` condition based on the filter parameter
    if (filter === 'future') {
      whereCondition = { isFutured: true };
    } else if (filter === 'completed') {
      whereCondition = { isCompleted: true };
    } else if (filter === 'active') {
      whereCondition = { isFutured: false, isCompleted: false };
    }

    const tasks = await prisma.task.findMany({
      where: whereCondition,
    });

    return NextResponse.json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === 'Unauthorized' ||
        error.message === 'Invalid token'
      ) {
        return NextResponse.json({ message: error.message, status: 401 });
      }
    }

    return NextResponse.json({ error, status: 500 });
  }
}

// export async function GET() {
//   try {
//     const decodedToken = validateToken();
//     const username = decodedToken?.username;

//     if (!username) {
//       return NextResponse.json({ message: 'Unauthorized', status: 401 });
//     }

//     const tasks = await prisma.task.findMany({
//       // where: {
//       //   userId,
//       // },
//     });

//     return NextResponse.json(tasks);
//   } catch (error) {
//     if (error instanceof Error) {
//       if (
//         error.message === 'Unauthorized' ||
//         error.message === 'Invalid token'
//       ) {
//         return NextResponse.json({ message: error.message, status: 401 });
//       }
//     }

//     return NextResponse.json({ error, status: 500 });
//   }
// }

export async function PUT(req: Request) {
  try {
    // const { userId } = auth();
    const { isCompleted, id } = await req.json();

    // if (!userId) {
    //   return NextResponse.json({ error: "Unauthorized", status: 401 });
    // }

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log('ERROR UPDATING TASK: ', error);
    return NextResponse.json({ error: 'Error deleting task', status: 500 });
  }
}
