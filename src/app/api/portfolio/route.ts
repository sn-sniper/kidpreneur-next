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

    // Parse galleryImages JSON array
    const formattedItems = items.map((item) => ({
      ...item,
      galleryImages: safeParseJson(item.galleryImages),
    }));

    return NextResponse.json({ items: formattedItems }, {
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
