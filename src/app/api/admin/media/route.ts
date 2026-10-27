import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mediaAssets } from "@/db/schema";
import { desc } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { uploadMedia } from "@/lib/storage";

async function checkAdminAuth(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value || request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return false;
  const payload = await verifyToken(token);
  return Boolean(payload?.userId && payload?.role === "ADMIN");
}

export async function GET(request: NextRequest) {
  try {
    const isAuthed = await checkAdminAuth(request);
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const assets = await db.select().from(mediaAssets).orderBy(desc(mediaAssets.createdAt));
    return NextResponse.json({ assets }, { status: 200 });
  } catch (error) {
    console.error("List media error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthed = await checkAdminAuth(request);
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const mimeType = file.type || "image/jpeg";
    const filename = file.name || "upload.jpg";

    const uploadRes = await uploadMedia(arrayBuffer, filename, mimeType);

    const [inserted] = await db.insert(mediaAssets).values({
      filename,
      url: uploadRes.url,
      storageKey: uploadRes.storageKey,
      mimeType,
      size: file.size,
    }).returning();

    return NextResponse.json({
      success: true,
      asset: inserted,
    }, { status: 201 });
  } catch (error) {
    console.error("Upload media error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
