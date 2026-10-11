import * as dotenv from 'dotenv';
dotenv.config();

import { createClient } from "@libsql/client/web";

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

async function run() {
  console.log("Applying schema for portfolio_items and media_assets...");

  await client.execute(`
    CREATE TABLE IF NOT EXISTS portfolio_items (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      type TEXT DEFAULT 'WORKSHOP' NOT NULL,
      status TEXT DEFAULT 'UPCOMING' NOT NULL,
      category TEXT DEFAULT 'Workshop',
      eventDate TEXT,
      eventTime TEXT,
      location TEXT,
      summary TEXT,
      content TEXT,
      coverImageUrl TEXT,
      galleryImages TEXT DEFAULT '[]',
      instagramUrl TEXT,
      ctaText TEXT DEFAULT 'Register for Lab',
      ctaUrl TEXT DEFAULT 'https://lab.the-kidpreneur-journey.com/register/lab',
      isFeatured INTEGER DEFAULT 0 NOT NULL,
      isPublished INTEGER DEFAULT 1 NOT NULL,
      orderIndex INTEGER DEFAULT 0 NOT NULL,
      createdAt INTEGER DEFAULT (strftime('%s', 'now')),
      updatedAt INTEGER DEFAULT (strftime('%s', 'now'))
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS media_assets (
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      url TEXT NOT NULL,
      storageKey TEXT,
      mimeType TEXT DEFAULT 'image/jpeg',
      size INTEGER DEFAULT 0,
      createdAt INTEGER DEFAULT (strftime('%s', 'now'))
    );
  `);

  console.log("Schema applied successfully to Turso DB!");
}

run()
  .catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
