import { getCloudflareContext } from "@opennextjs/cloudflare";

export interface UploadResult {
  url: string;
  storageKey: string;
}

export async function uploadMedia(
  fileBuffer: Uint8Array | ArrayBuffer,
  filename: string,
  mimeType: string = "image/jpeg"
): Promise<UploadResult> {
  const timestamp = Date.now();
  const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();
  const storageKey = `portfolio/${timestamp}-${safeFilename}`;

  try {
    const { env } = await getCloudflareContext({ async: true });
    const bucket = (env as unknown as { MEDIA_BUCKET?: { put: (k: string, v: unknown, opt?: unknown) => Promise<unknown> } })?.MEDIA_BUCKET;

    if (bucket && typeof bucket.put === "function") {
      await bucket.put(storageKey, fileBuffer, {
        httpMetadata: {
          contentType: mimeType,
        },
      });

      // Prefer custom public URL if defined, otherwise route through our media proxy
      const publicBase = process.env.NEXT_PUBLIC_MEDIA_URL || "/api/media";
      const cleanBase = publicBase.replace(/\/$/, "");
      return {
        url: `${cleanBase}/${storageKey}`,
        storageKey,
      };
    }
  } catch (err) {
    console.warn("Cloudflare R2 context not available or error putting object:", err);
  }

  // Graceful fallback for local development:
  // Convert buffer to base64 data URL so admin previews & tests never break
  const uint8 = new Uint8Array(fileBuffer);
  let binary = "";
  for (let i = 0; i < uint8.length; i++) {
    binary += String.fromCharCode(uint8[i]);
  }
  const base64 = btoa(binary);
  const dataUrl = `data:${mimeType};base64,${base64}`;

  return {
    url: dataUrl,
    storageKey,
  };
}

export async function getMediaObject(storageKey: string): Promise<{
  body: ReadableStream | null;
  contentType: string;
} | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const bucket = (env as unknown as {
      MEDIA_BUCKET?: {
        get: (k: string) => Promise<{
          body: ReadableStream;
          httpMetadata?: { contentType?: string };
        } | null>;
      };
    })?.MEDIA_BUCKET;

    if (bucket && typeof bucket.get === "function") {
      const obj = await bucket.get(storageKey);
      if (!obj) return null;
      return {
        body: obj.body,
        contentType: obj.httpMetadata?.contentType || "image/jpeg",
      };
    }
  } catch (err) {
    console.warn("Cloudflare R2 get error:", err);
  }
  return null;
}
