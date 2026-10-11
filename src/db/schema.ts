import { sqliteTable, text, integer, uniqueIndex, unique } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text("email").unique(),
  passwordHash: text("passwordHash"),
  fullName: text("fullName").notNull(),
  role: text("role").default("STUDENT").notNull(),
  parentId: text("parentId"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const subscriptions = sqliteTable("subscriptions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  paymentProviderId: text("paymentProviderId").unique(),
  planId: text("planId").notNull(),
  status: text("status").default("ACTIVE").notNull(),
  currentPeriodEnd: integer("currentPeriodEnd", { mode: "timestamp" }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const courseSessions = sqliteTable("course_sessions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  sessionNumber: integer("sessionNumber").unique().notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  objective: text("objective").notNull(),
  icon: text("icon").notNull(),
  activityType: text("activityType").notNull(),
  activityPayload: text("activityPayload").notNull(),
  unlockCode: text("unlockCode"),
});

export const userProgress = sqliteTable("user_progress", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  courseSessionId: text("courseSessionId").references(() => courseSessions.id),
  sessionNumber: integer("sessionNumber").notNull(),
  status: text("status").notNull(),
  notes: text("notes"),
  reflection: text("reflection"),
  completedAt: integer("completedAt", { mode: "timestamp" }),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
}, (table) => ({
  userSessionUnique: unique().on(table.userId, table.sessionNumber),
}));

export const activitySubmissions = sqliteTable("activity_submissions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  sessionNumber: integer("sessionNumber").notNull(),
  activityType: text("activityType").notNull(),
  payload: text("payload").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const portfolioActivities = sqliteTable("portfolio_activities", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  href: text("href").notNull(),
  orderIndex: integer("orderIndex").default(0).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const globalLearnerStates = sqliteTable("global_learner_states", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("userId").unique().notNull().references(() => users.id, { onDelete: "cascade" }),
  data: text("data").notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const activityStates = sqliteTable("activity_states", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  activityId: text("activityId").notNull(),
  data: text("data").notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
}, (table) => ({
  userActivityUnique: unique().on(table.userId, table.activityId),
}));

export const contactMessages = sqliteTable("contact_messages", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const labRegistrations = sqliteTable("lab_registrations", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  parentId: text("parentId").notNull().references(() => users.id, { onDelete: "cascade" }),
  parentFullName: text("parentFullName").notNull(),
  parentPhone: text("parentPhone").notNull(),
  parentEmail: text("parentEmail").notNull(),
  childFullName: text("childFullName").notNull(),
  childAge: integer("childAge").notNull(),
  status: text("status").default("PENDING").notNull(),
  generatedEmail: text("generatedEmail"),
  generatedPassword: text("generatedPassword"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const portfolioItems = sqliteTable("portfolio_items", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  type: text("type").default("WORKSHOP").notNull(), // 'WORKSHOP', 'ACTIVITY', 'INSTAGRAM'
  status: text("status").default("UPCOMING").notNull(), // 'UPCOMING', 'COMPLETED', 'DRAFT'
  category: text("category").default("Workshop"),
  eventDate: text("eventDate"), // e.g. "2026-04-20" or "April 20, 2026"
  eventTime: text("eventTime"), // e.g. "10:00 AM - 1:00 PM"
  location: text("location"), // e.g. "Beirut, Lebanon / Online"
  summary: text("summary"), // short teaser text
  content: text("content"), // detailed markdown or rich text
  coverImageUrl: text("coverImageUrl"),
  galleryImages: text("galleryImages").default("[]"), // JSON stringified array of URLs
  instagramUrl: text("instagramUrl"),
  ctaText: text("ctaText").default("Register for Lab"),
  ctaUrl: text("ctaUrl").default("https://lab.the-kidpreneur-journey.com/register/lab"),
  isFeatured: integer("isFeatured").default(0).notNull(), // 0 or 1
  isPublished: integer("isPublished").default(1).notNull(), // 0 or 1
  orderIndex: integer("orderIndex").default(0).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const mediaAssets = sqliteTable("media_assets", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  filename: text("filename").notNull(),
  url: text("url").notNull(),
  storageKey: text("storageKey"),
  mimeType: text("mimeType").default("image/jpeg"),
  size: integer("size").default(0),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});
