import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { portfolioItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

async function checkAdminAuth(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value || request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return false;
  const payload = await verifyToken(token);
  return Boolean(payload?.userId && payload?.role === "ADMIN");
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthed = await checkAdminAuth(request);
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const [item] = await db.select().from(portfolioItems).where(eq(portfolioItems.id, id)).limit(1);

    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      item: {
        ...item,
        galleryImages: safeParseJson(item.galleryImages),
      },
    }, { status: 200 });
  } catch (error) {
    console.error("Admin get portfolio item error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthed = await checkAdminAuth(request);
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updateData: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (body.title !== undefined) updateData.title = body.title;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.type !== undefined) updateData.type = body.type;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.eventDate !== undefined) updateData.eventDate = body.eventDate;
    if (body.eventTime !== undefined) updateData.eventTime = body.eventTime;
    if (body.location !== undefined) updateData.location = body.location;
    if (body.summary !== undefined) updateData.summary = body.summary;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.coverImageUrl !== undefined) updateData.coverImageUrl = body.coverImageUrl;
    if (body.galleryImages !== undefined) {
      updateData.galleryImages = JSON.stringify(Array.isArray(body.galleryImages) ? body.galleryImages : []);
    }
    if (body.instagramUrl !== undefined) updateData.instagramUrl = body.instagramUrl;
    if (body.ctaText !== undefined) updateData.ctaText = body.ctaText;
    if (body.ctaUrl !== undefined) updateData.ctaUrl = body.ctaUrl;
    if (body.isFeatured !== undefined) updateData.isFeatured = body.isFeatured ? 1 : 0;
    if (body.isPublished !== undefined) updateData.isPublished = body.isPublished ? 1 : 0;
    if (body.orderIndex !== undefined) updateData.orderIndex = Number(body.orderIndex) || 0;

    const [updated] = await db
      .update(portfolioItems)
      .set(updateData)
      .where(eq(portfolioItems.id, id))
      .returning();

    return NextResponse.json({
      success: true,
      item: {
        ...updated,
        galleryImages: safeParseJson(updated.galleryImages),
      },
    }, { status: 200 });
  } catch (error: any) {
    console.error("Admin update portfolio item error:", error);
    return NextResponse.json({ error: error?.message || "Failed to update item" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthed = await checkAdminAuth(request);
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await db.delete(portfolioItems).where(eq(portfolioItems.id, id));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Admin delete portfolio item error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
