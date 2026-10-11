import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { userProgress } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { verifyToken } from '@/lib/auth';

// GET: Retrieve all records for the current user
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload?.userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const userId = payload.userId as string;

    const progress = await db.select().from(userProgress).where(eq(userProgress.userId, userId)).orderBy(asc(userProgress.sessionNumber));

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

    const userId = payload.userId as string;

    // Upsert the record
    await db.insert(userProgress)
      .values({
          userId,
          sessionNumber: Number(session_number),
          status,
          notes,
          reflection,
          completedAt: completed_at ? new Date(completed_at) : null
      })
      .onConflictDoUpdate({
          target: [userProgress.userId, userProgress.sessionNumber],
          set: {
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
