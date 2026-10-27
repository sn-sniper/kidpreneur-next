import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

async function checkAdminAuth(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value || request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return false;
  const payload = await verifyToken(token);
  return Boolean(payload?.userId && payload?.role === "ADMIN");
}

function cleanInstagramUrl(url: string): string {
  try {
    const parsed = new URL(url.trim());
    // Keep only protocol, host, and pathname (remove ?igsh=... or query tracking)
    return `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
  } catch {
    return url.trim();
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthed = await checkAdminAuth(request);
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { url } = await request.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Instagram URL is required" }, { status: 400 });
    }

    const cleanUrl = cleanInstagramUrl(url);

    // Extract shortcode
    const match = cleanUrl.match(/(?:p|reel|reels|tv)\/([a-zA-Z0-9_-]+)/);
    const shortcode = match ? match[1] : null;

    if (!shortcode) {
      return NextResponse.json(
        { error: "Invalid Instagram URL. Please provide a link to a post or reel (e.g. instagram.com/p/... or /reel/...)" },
        { status: 400 }
      );
    }

    let title = "";
    let caption = "";
    let coverImageUrl = "";
    let authorName = "Dr. Sarah Sidani (@kidpreneur.journey)";

    // 1. Try public oEmbed
    try {
      const oembedRes = await fetch(
        `https://api.instagram.com/oembed/?url=${encodeURIComponent(cleanUrl)}`,
        { headers: { "User-Agent": "Mozilla/5.0" } }
      );
      if (oembedRes.ok) {
        const oembedData = await oembedRes.json();
        if (oembedData.title) caption = oembedData.title;
        if (oembedData.thumbnail_url) coverImageUrl = oembedData.thumbnail_url;
        if (oembedData.author_name) authorName = oembedData.author_name;
      }
    } catch {
      // Continue to fallback scraping
    }

    // 2. Fallback: Open Graph Scraper with social bot User-Agent
    if (!caption || !coverImageUrl) {
      try {
        const scrapeRes = await fetch(cleanUrl, {
          headers: {
            "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
            "Accept": "text/html,application/xhtml+xml",
          },
        });
        if (scrapeRes.ok) {
          const html = await scrapeRes.text();

          // Extract og:title
          const titleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/i) ||
                             html.match(/<meta\s+content=["'](.*?)["']\s+property=["']og:title["']/i);
          if (titleMatch && titleMatch[1]) {
            title = titleMatch[1].replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
          }

          // Extract og:description
          const descMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i) ||
                            html.match(/<meta\s+content=["'](.*?)["']\s+property=["']og:description["']/i);
          if (descMatch && descMatch[1]) {
            caption = descMatch[1].replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
          }

          // Extract og:image
          const imageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i) ||
                             html.match(/<meta\s+content=["'](.*?)["']\s+property=["']og:image["']/i);
          if (imageMatch && imageMatch[1]) {
            coverImageUrl = imageMatch[1].replace(/&amp;/g, '&');
          }
        }
      } catch (err) {
        console.warn("Instagram scraper error:", err);
      }
    }

    // Clean up title and caption
    if (caption && !title) {
      // Use the first sentence or first 60 characters as title
      const firstLine = caption.split('\n')[0].replace(/[#@][\w.-]+/g, '').trim();
      title = firstLine.slice(0, 70);
    }

    if (!title) {
      title = `Instagram Activity: @kidpreneur.journey (${shortcode})`;
    }

    // Default high-quality placeholder if image is blocked by IG CDN hotlink
    if (!coverImageUrl) {
      coverImageUrl = "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80";
    }

    // Intelligent classification engine:
    // Suggests activity type based on post content keywords
    const lowerCaption = (caption + " " + title).toLowerCase();
    
    let suggestedType: 'WORKSHOP' | 'ACTIVITY' | 'INSTAGRAM' = 'INSTAGRAM';
    let suggestedStatus: 'UPCOMING' | 'COMPLETED' = 'COMPLETED';
    let category = 'Classroom Moments';

    if (
      lowerCaption.includes("upcoming") ||
      lowerCaption.includes("register") ||
      lowerCaption.includes("reserve") ||
      lowerCaption.includes("seats") ||
      lowerCaption.includes("bootcamp") ||
      lowerCaption.includes("workshop") ||
      lowerCaption.includes("join us on") ||
      lowerCaption.includes("dates:")
    ) {
      suggestedType = 'WORKSHOP';
      suggestedStatus = 'UPCOMING';
      category = 'Upcoming Workshop';
    } else if (
      lowerCaption.includes("market") ||
      lowerCaption.includes("pitch day") ||
      lowerCaption.includes("recap") ||
      lowerCaption.includes("yesterday") ||
      lowerCaption.includes("completed") ||
      lowerCaption.includes("proud of") ||
      lowerCaption.includes("hackathon") ||
      lowerCaption.includes("highlight")
    ) {
      suggestedType = 'ACTIVITY';
      suggestedStatus = 'COMPLETED';
      category = 'Past Activities';
    } else {
      suggestedType = 'INSTAGRAM';
      suggestedStatus = 'COMPLETED';
      category = 'Instagram Posts';
    }

    return NextResponse.json({
      success: true,
      instagramUrl: cleanUrl,
      shortcode,
      title: title.replace(/^Instagram post by .*?: /i, '').trim(),
      summary: caption ? caption.slice(0, 220) + (caption.length > 220 ? '...' : '') : 'Captured from @kidpreneur.journey on Instagram.',
      content: caption || 'Check out this post on Instagram @kidpreneur.journey.',
      coverImageUrl,
      suggestedType,
      suggestedStatus,
      category,
      author: authorName,
    });
  } catch (error: any) {
    console.error("Instagram fetch engine error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to parse Instagram post" },
      { status: 500 }
    );
  }
}
