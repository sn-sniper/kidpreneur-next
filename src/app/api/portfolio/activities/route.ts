import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const activities = await prisma.portfolioActivity.findMany({
      orderBy: {
        orderIndex: 'asc'
      }
    });

    return NextResponse.json({ activities }, { status: 200 });
  } catch (error: any) {
    console.error('Failed to fetch portfolio activities:', error);
    return NextResponse.json(
      { message: 'Failed to load activities', error: error.message },
      { status: 500 }
    );
  }
}
