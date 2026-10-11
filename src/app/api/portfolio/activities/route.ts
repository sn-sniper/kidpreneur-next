import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { portfolioActivities } from '@/db/schema';
import { asc } from 'drizzle-orm';

export async function GET() {
  try {
    const activities = await db.select().from(portfolioActivities).orderBy(asc(portfolioActivities.orderIndex));

    return NextResponse.json({ activities }, { status: 200 });
  } catch (error: any) {
    console.error('Failed to fetch portfolio activities:', error);
    return NextResponse.json(
      { message: 'Failed to load activities', error: error.message },
      { status: 500 }
    );
  }
}
