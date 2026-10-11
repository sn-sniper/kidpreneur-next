import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { db } from '@/lib/db';
import { activityStates, globalLearnerStates } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

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

    const userId = payload.userId as string;
    const { searchParams } = new URL(request.url);
    const activityId = searchParams.get('activityId');

    if (!activityId) {
      return NextResponse.json({ message: 'activityId is required' }, { status: 400 });
    }

    const [activityStateResult, globalStateResult] = await Promise.all([
      db.select().from(activityStates).where(and(eq(activityStates.userId, userId), eq(activityStates.activityId, activityId))),
      db.select().from(globalLearnerStates).where(eq(globalLearnerStates.userId, userId))
    ]);

    const activityState = activityStateResult[0];
    const globalState = globalStateResult[0];

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
