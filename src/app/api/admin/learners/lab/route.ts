import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { labRegistrations } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    // Real app would verify admin role here
    if (!payload || !payload.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const registrations = await db.select().from(labRegistrations).orderBy(desc(labRegistrations.createdAt));

    return NextResponse.json({ registrations }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch learners error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
