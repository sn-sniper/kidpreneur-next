import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    // Find admin user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !user.passwordHash || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Invalid credentials or insufficient permissions' }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials or insufficient permissions' }, { status: 401 });
    }

    // Create JWT
    const token = await signToken({ userId: user.id, role: user.role });

    // Set separate admin cookie to isolate from client application
    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 day for admins
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
