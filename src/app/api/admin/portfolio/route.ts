import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { portfolioItems } from "@/db/schema";
import { asc, desc } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

async function checkAdminAuth(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value || request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return false;
  const payload = await verifyToken(token);
  return Boolean(payload?.userId);
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET(request: NextRequest) {
  try {
    const isAuthed = await checkAdminAuth(request);
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await db
      .select()
      .from(portfolioItems)
      .orderBy(asc(portfolioItems.orderIndex), desc(portfolioItems.createdAt));

    const formatted = items.map((item) => ({
      ...item,
      galleryImages: safeParseJson(item.galleryImages),
    }));

    return NextResponse.json({ items: formatted }, { status: 200 });
  } catch (error) {
    console.error("Admin fetch portfolio items error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthed = await checkAdminAuth(request);
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug: customSlug,
      type = "WORKSHOP",
      status = "UPCOMING",
      category = "Workshop",
      eventDate,
      eventTime,
      location,
      summary,
      content,
      coverImageUrl,
      galleryImages = [],
      instagramUrl,
      ctaText = "Register for Lab",
      ctaUrl = "https://lab.the-kidpreneur-journey.com/register/lab",
      isFeatured = 0,
      isPublished = 1,
      orderIndex = 0,
    } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const baseSlug = customSlug ? generateSlug(customSlug) : generateSlug(title);
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const [created] = await db
      .insert(portfolioItems)
      .values({
        title,
        slug: uniqueSlug,
        type,
        status,
        category,
        eventDate,
        eventTime,
        location,
        summary,
        content,
        coverImageUrl,
        galleryImages: JSON.stringify(Array.isArray(galleryImages) ? galleryImages : []),
        instagramUrl,
        ctaText,
        ctaUrl,
        isFeatured: isFeatured ? 1 : 0,
        isPublished: isPublished ? 1 : 0,
        orderIndex: Number(orderIndex) || 0,
      })
      .returning();

    return NextResponse.json({
      success: true,
      item: {
        ...created,
        galleryImages: safeParseJson(created.galleryImages),
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error("Admin create portfolio item error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create portfolio item" },
      { status: 500 }
    );
  }
}

function safeParseJson(val: string | null | undefined): string[] {
  if (!val) return [];
  try {
    const parsed = JSON.parse(val);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
