import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { portfolioItems } from "@/db/schema";
import { and, eq } from "drizzle-orm";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const [item] = await db
      .select()
      .from(portfolioItems)
      .where(and(eq(portfolioItems.slug, slug), eq(portfolioItems.isPublished, 1)))
      .limit(1);

    if (!item) {
      return NextResponse.json(
        { error: "Portfolio item not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    let galleryImages: string[] = [];
    try {
      if (item.galleryImages) {
        galleryImages = JSON.parse(item.galleryImages);
      }
    } catch {
      galleryImages = [];
    }

    return NextResponse.json(
      { item: { ...item, galleryImages } },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Public fetch portfolio slug error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
