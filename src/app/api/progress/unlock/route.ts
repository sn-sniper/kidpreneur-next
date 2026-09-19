import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/db';
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

    // N-1 ENFORCEMENT: Server-side check
    // You cannot unlock Session N unless Session N-1 is "Completed" (except Session 1, which is always unlocked)
    if (sessionNum > 1) {
      const prevSessionNum = sessionNum - 1;
      const prevSessionProgress = await prisma.userProgress.findUnique({
        where: {
          userId_sessionNumber: {
            userId: payload.userId,
            sessionNumber: prevSessionNum
          }
        }
      });

      if (!prevSessionProgress || prevSessionProgress.status !== 'Completed') {
        return NextResponse.json({ 
          error: `You must complete Session ${prevSessionNum} before unlocking Session ${sessionNum}.` 
        }, { status: 403 });
      }
    }

    // Unlock the session by creating a record if it doesn't exist
    await prisma.userProgress.upsert({
      where: {
        userId_sessionNumber: {
          userId: payload.userId,
          sessionNumber: Number(sessionNum)
        }
      },
      update: {}, // Do nothing if it already exists
      create: {
        userId: payload.userId,
        sessionNumber: Number(sessionNum),
        status: 'Unlocked'
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Progress Unlock error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
