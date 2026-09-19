import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// GET: Retrieve all records for the current user
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload?.userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const progress = await prisma.userProgress.findMany({
      where: { userId: payload.userId },
      orderBy: { sessionNumber: 'asc' }
    });

    // Map Prisma to frontend format
    const records = progress.map(p => ({
      session_number: p.sessionNumber,
      status: p.status,
      notes: p.notes || '',
      reflection: p.reflection || '',
      completed_at: p.completedAt ? p.completedAt.toISOString() : ''
    }));

    // Determine unlocked sessions. Session 1 is always unlocked.
    // If a session has a UserProgress record, it was unlocked at some point.
    const unlockedSessions = [1, ...progress.map(p => p.sessionNumber)];

    // Deduplicate
    const uniqueUnlocked = Array.from(new Set(unlockedSessions));

    return NextResponse.json({ records, unlockedSessions: uniqueUnlocked });
  } catch (error) {
    console.error('Progress GET error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST: Save work for a session
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const payload = await verifyToken(token);
    if (!payload?.userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { session_number, status, notes, reflection, completed_at } = body;

    if (!session_number) {
      return NextResponse.json({ error: 'Missing session_number' }, { status: 400 });
    }

    // Upsert the record
    await prisma.userProgress.upsert({
      where: {
        userId_sessionNumber: {
          userId: payload.userId,
          sessionNumber: Number(session_number)
        }
      },
      update: {
        status,
        notes,
        reflection,
        completedAt: completed_at ? new Date(completed_at) : null
      },
      create: {
        userId: payload.userId,
        sessionNumber: Number(session_number),
        status,
        notes,
        reflection,
        completedAt: completed_at ? new Date(completed_at) : null
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Progress POST error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
