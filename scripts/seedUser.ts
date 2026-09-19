import prisma from '../src/lib/db';
import bcrypt from 'bcryptjs';

async function main() {
  const email = 'test@test.com';
  const password = 'password';
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, fullName: 'Test User' },
    create: {
      email,
      passwordHash,
      fullName: 'Test User',
      role: 'STUDENT',
    },
  });

  console.log(`User seeded: ${user.email} / ${password}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
