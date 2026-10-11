import { NextRequest, NextResponse } from "next/server";
import { getMediaObject } from "@/lib/storage";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string[] }> }
) {
  try {
    const { key } = await params;
    const storageKey = key.join("/");

    const media = await getMediaObject(storageKey);
    if (!media || !media.body) {
      return new NextResponse("File not found", { status: 404 });
    }

    return new NextResponse(media.body as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": media.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error serving media:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
