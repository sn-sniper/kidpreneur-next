import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, labRegistrations } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      parentFullName,
      parentPhone,
      parentEmail,
      childFullName,
      childAge,
    } = body;

    const parentUserResult = await db.select().from(users).where(eq(users.email, parentEmail));
    let parentUser = parentUserResult[0];

    if (!parentUser) {
      const insertUserResult = await db.insert(users).values({
          email: parentEmail,
          fullName: parentFullName,
          role: 'PARENT'
      }).returning();
      parentUser = insertUserResult[0];
    }

    const registrationResult = await db.insert(labRegistrations).values({
        parentId: parentUser.id,
        parentFullName,
        parentPhone,
        parentEmail,
        childFullName,
        childAge,
        status: 'PENDING'
    }).returning();
    const registration = registrationResult[0];

    return NextResponse.json({ success: true, registrationId: registration.id }, { status: 200 });

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  // GET is no longer used since we removed auth requirement on the frontend.
  // We just return NONE so it doesn't break if anything still calls it.
  return NextResponse.json({ status: 'NONE' }, { status: 200 });
}
