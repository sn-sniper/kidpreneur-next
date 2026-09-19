import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/db';

export async function POST(request: Request) {
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
    const body = await request.json();
    const { activityId, activityData, globalData } = body;

    if (!activityId) {
      return NextResponse.json({ message: 'activityId is required' }, { status: 400 });
    }

    // 1. Upsert ActivityState
    if (activityData) {
      const dataStr = JSON.stringify(activityData);
      
      await prisma.activityState.upsert({
        where: {
          userId_activityId: {
            userId,
            activityId
          }
        },
        update: {
          data: dataStr
        },
        create: {
          userId,
          activityId,
          data: dataStr
        }
      });
    }

    // 2. Upsert GlobalLearnerState (Carry-Forward fields)
    if (globalData) {
      // We merge existing global data with the new incoming globalData
      const existingGlobal = await prisma.globalLearnerState.findUnique({
        where: { userId }
      });

      let mergedData = globalData;
      if (existingGlobal && existingGlobal.data) {
        try {
          const parsedExisting = JSON.parse(existingGlobal.data);
          mergedData = { ...parsedExisting, ...globalData };
        } catch (e) {
          console.error("Failed to parse existing global data", e);
        }
      }

      await prisma.globalLearnerState.upsert({
        where: { userId },
        update: {
          data: JSON.stringify(mergedData)
        },
        create: {
          userId,
          data: JSON.stringify(mergedData)
        }
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Autosave error:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
