import 'dotenv/config';
import { db } from '../src/lib/db';
import { courseSessions } from '../src/db/schema';
import { initialActivities } from '../src/app/admin/activityData';

async function seed15Sessions() {
  console.log(`Starting to seed ${initialActivities.length} sessions from Developer Specification PDF into Turso DB...`);

  // Clear existing sessions
  await db.delete(courseSessions);
  console.log('Cleared existing course sessions.');

  // Insert all 15 activities
  for (const activity of initialActivities) {
    await db.insert(courseSessions).values({
      sessionNumber: activity.sessionNumber,
      title: activity.title,
      description: activity.description,
      objective: activity.objective,
      icon: activity.icon,
      activityType: activity.activityType,
      activityPayload: activity.activityPayload,
      unlockCode: null,
    });
    console.log(`  ✓ Seeded Session ${activity.sessionNumber}: ${activity.title}`);
  }

  const count = await db.select().from(courseSessions);
  console.log(`\nSuccessfully verified ${count.length} course sessions in database!`);
}

seed15Sessions()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Failed to seed sessions:', err);
    process.exit(1);
  });
