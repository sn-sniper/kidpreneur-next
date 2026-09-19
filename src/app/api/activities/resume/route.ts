import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/db';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = payload.userId;
    const { searchParams } = new URL(request.url);
    const activityId = searchParams.get('activityId');

    if (!activityId) {
      return NextResponse.json({ message: 'activityId is required' }, { status: 400 });
    }

    const [activityState, globalState] = await Promise.all([
      prisma.activityState.findUnique({
        where: {
          userId_activityId: {
            userId,
            activityId
          }
        }
      }),
      prisma.globalLearnerState.findUnique({
        where: { userId }
      })
    ]);

    let activityData = {};
    if (activityState && activityState.data) {
      try {
        activityData = JSON.parse(activityState.data);
      } catch (e) {}
    }

    let globalData = {};
    if (globalState && globalState.data) {
      try {
        globalData = JSON.parse(globalState.data);
      } catch (e) {}
    }

    return NextResponse.json({
      activityData,
      globalData
    }, { status: 200 });

  } catch (error: any) {
    console.error('Resume error:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
