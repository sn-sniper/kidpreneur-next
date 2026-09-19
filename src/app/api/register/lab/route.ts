import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
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

    let parentUser = await prisma.user.findUnique({
      where: { email: parentEmail }
    });

    if (!parentUser) {
      parentUser = await prisma.user.create({
        data: {
          email: parentEmail,
          fullName: parentFullName,
          role: 'PARENT'
        }
      });
    }

    const registration = await prisma.labRegistration.create({
      data: {
        parentId: parentUser.id,
        parentFullName,
        parentPhone,
        parentEmail,
        childFullName,
        childAge,
        status: 'PENDING'
      }
    });

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
