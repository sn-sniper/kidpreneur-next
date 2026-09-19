const { PrismaClient } = require('@prisma/client');
const { PrismaLibSql } = require('@prisma/adapter-libsql');
const bcrypt = require('bcryptjs');

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || 'file:./dev.db'
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Hash passwords
  const adminPasswordHash = await bcrypt.hash('adminpassword123', 10);
  const testPasswordHash = await bcrypt.hash('testpassword123', 10);

  // Seed Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@kidpreneur.local' },
    update: {
      passwordHash: adminPasswordHash,
    },
    create: {
      email: 'admin@kidpreneur.local',
      fullName: 'Admin Kidpreneur',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
    },
  });
  console.log(`Upserted Admin: ${admin.email}`);

  // Seed Test User
  const testUser = await prisma.user.upsert({
    where: { email: 'test@kidpreneur.local' },
    update: {
      passwordHash: testPasswordHash,
    },
    create: {
      email: 'test@kidpreneur.local',
      fullName: 'Test Student',
      passwordHash: testPasswordHash,
      role: 'STUDENT',
    },
  });
  console.log(`Upserted Test User: ${testUser.email}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
