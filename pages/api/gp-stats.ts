import type { NextApiRequest, NextApiResponse } from "next";

const PLAY_BASE = "https://play.google.com/store/apps/details?id=";

function extractMeta(html: string, name: string): string | null {
  const re = new RegExp(
    `<meta\\s+itemprop="${name}"\\s+content="([^"]+)"`,
    "i"
  );
  return html.match(re)?.[1] ?? null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Missing 'id' query param" });
  }

  try {
    const html = await fetch(`${PLAY_BASE}${id}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    }).then((r) => r.text());

    const rating = extractMeta(html, "ratingValue");
    const reviewCount = extractMeta(html, "ratingCount");

    // Install count text (e.g. "100+", "1,000+", "10,000+")
    const installText = extractMeta(html, "interactionCount") ?? "";

    return res.status(200).json({
      rating: rating ? parseFloat(rating) : null,
      reviewCount: reviewCount ? parseInt(reviewCount.replace(/,/g, ""), 10) : null,
      installText,
    });
  } catch {
    return res.status(500).json({ error: "Failed to fetch Play Store data" });
  }
}
