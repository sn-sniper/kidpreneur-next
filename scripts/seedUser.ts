import { db } from '../src/lib/db';
import { users } from '../src/db/schema';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const adminEmail = 'admin@kidpreneur.local';
  const adminPassword = 'adminpassword123';
  const adminPasswordHash = await bcrypt.hash(adminPassword, 10);

  const testEmail = 'test@kidpreneur.local';
  const testPassword = 'testpassword123';
  const testPasswordHash = await bcrypt.hash(testPassword, 10);

  const insertAdminResult = await db.insert(users).values({
      email: adminEmail,
      passwordHash: adminPasswordHash,
      fullName: 'Admin User',
      role: 'ADMIN',
  }).onConflictDoUpdate({
      target: [users.email],
      set: { passwordHash: adminPasswordHash, fullName: 'Admin User', role: 'ADMIN' }
  }).returning();
  const adminUser = insertAdminResult[0];

  const insertTestResult = await db.insert(users).values({
      email: testEmail,
      passwordHash: testPasswordHash,
      fullName: 'Test Student',
      role: 'STUDENT',
  }).onConflictDoUpdate({
      target: [users.email],
      set: { passwordHash: testPasswordHash, fullName: 'Test Student', role: 'STUDENT' }
  }).returning();
  const testUser = insertTestResult[0];

  console.log(`Admin seeded: ${adminUser.email} / ${adminPassword}`);
  console.log(`Student seeded: ${testUser.email} / ${testPassword}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
