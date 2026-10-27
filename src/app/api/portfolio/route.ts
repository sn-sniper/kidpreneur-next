import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { portfolioItems } from "@/db/schema";
import { and, eq, desc, asc } from "drizzle-orm";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // 'WORKSHOP', 'ACTIVITY', 'INSTAGRAM'
    const status = searchParams.get("status"); // 'UPCOMING', 'COMPLETED'
    const featured = searchParams.get("featured"); // '1'

    const conditions = [eq(portfolioItems.isPublished, 1)];

    if (type) {
      conditions.push(eq(portfolioItems.type, type.toUpperCase()));
    }
    if (status) {
      conditions.push(eq(portfolioItems.status, status.toUpperCase()));
    }
    if (featured === "1") {
      conditions.push(eq(portfolioItems.isFeatured, 1));
    }

    const items = await db
      .select()
      .from(portfolioItems)
      .where(and(...conditions))
      .orderBy(asc(portfolioItems.orderIndex), desc(portfolioItems.createdAt));

    // Smart Date Engine:
    // Automatically transition any WORKSHOP whose eventDate has passed into COMPLETED (Past Highlights).
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const formattedItems = items.map((item) => {
      let effectiveStatus = item.status;
      if (item.type === 'WORKSHOP' && item.status === 'UPCOMING' && item.eventDate) {
        const parsed = new Date(item.eventDate);
        if (!isNaN(parsed.getTime()) && parsed < startOfToday) {
          effectiveStatus = 'COMPLETED';
        }
      }

      return {
        ...item,
        status: effectiveStatus,
        isExpired: effectiveStatus !== item.status,
        galleryImages: safeParseJson(item.galleryImages),
      };
    });

    // If caller filtered by status, filter against the dynamic effectiveStatus
    const result = status
      ? formattedItems.filter((i) => i.status === status.toUpperCase())
      : formattedItems;

    return NextResponse.json({ items: result }, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Public fetch portfolio items error:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio items" },
      { status: 500, headers: corsHeaders }
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
