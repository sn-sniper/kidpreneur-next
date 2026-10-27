import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { labRegistrations, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

function generateRandomString(length: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.userId || payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Admin privileges required' }, { status: 401 });
    }

    const body = await request.json();
    const { registrationId } = body;

    if (!registrationId) {
      return NextResponse.json({ error: 'Missing registrationId' }, { status: 400 });
    }

    // 1. Find registration
    const registrationResult = await db.select().from(labRegistrations).where(eq(labRegistrations.id, registrationId));
    const registration = registrationResult[0];

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    if (registration.status === 'CONFIRMED') {
      return NextResponse.json({ error: 'Registration already confirmed' }, { status: 400 });
    }

    // 2. Generate 4-char random hash, 12-char secure password
    const shortHash = generateRandomString(4).toLowerCase();
    const rawPassword = generateRandomString(12);

    // 3. Construct child email
    const safeName = registration.childFullName.replace(/\s+/g, '-').toLowerCase();
    const childEmail = `${safeName}-${shortHash}@thekidpreneur.lab`;

    // 4. Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(rawPassword, salt);

    // 5. Create child User record
    await db.transaction(async (tx) => {
      const childUserResult = await tx.insert(users).values({
          email: childEmail,
          passwordHash,
          fullName: registration.childFullName,
          role: 'STUDENT',
          parentId: registration.parentId
      }).returning();

      // 6. Update registration status and save creds
      await tx.update(labRegistrations).set({
          status: 'CONFIRMED',
          generatedEmail: childEmail,
          generatedPassword: rawPassword
      }).where(eq(labRegistrations.id, registrationId));
    });

    // 7. Dispatch email mock (console log in this demo)
    console.log(`[EMAIL MOCK] Sent to ${registration.parentEmail}:`);
    console.log(`Hello ${registration.parentFullName}, your child's Kidpreneur Lab account is ready!`);
    console.log(`Email: ${childEmail}`);
    console.log(`Password: ${rawPassword}`);

    // Return plaintext credentials for the admin UI
    return NextResponse.json({
      success: true,
      credentials: {
        email: childEmail,
        password: rawPassword
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error('Confirmation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
