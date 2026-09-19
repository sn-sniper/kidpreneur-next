import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Name, email, and message are required' }, { status: 400 });
    }

    const newContactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      }
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 201 });
  } catch (error: any) {
    console.error('Contact endpoint error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
