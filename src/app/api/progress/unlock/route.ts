import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { userProgress } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { verifyToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const payload = await verifyToken(token);
    if (!payload?.userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { sessionNum, code } = body;

    if (!sessionNum || !code) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();
    const expected = `SPARK${sessionNum}`;

    if (cleanCode !== expected) {
      return NextResponse.json({ error: 'Invalid code' }, { status: 400 });
    }

    const userId = payload.userId as string;

    // N-1 ENFORCEMENT: Server-side check
    // You cannot unlock Session N unless Session N-1 is "Completed" (except Session 1, which is always unlocked)
    if (sessionNum > 1) {
      const prevSessionNum = sessionNum - 1;
      const prevSessionProgressResult = await db.select().from(userProgress).where(and(eq(userProgress.userId, userId), eq(userProgress.sessionNumber, prevSessionNum)));
      const prevSessionProgress = prevSessionProgressResult[0];

      if (!prevSessionProgress || prevSessionProgress.status !== 'Completed') {
        return NextResponse.json({ 
          error: `You must complete Session ${prevSessionNum} before unlocking Session ${sessionNum}.` 
        }, { status: 403 });
      }
    }

    // Unlock the session by creating a record if it doesn't exist
    await db.insert(userProgress)
      .values({ userId, sessionNumber: Number(sessionNum), status: 'Unlocked' })
      .onConflictDoNothing({ target: [userProgress.userId, userProgress.sessionNumber] });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Progress Unlock error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
