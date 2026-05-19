import type { NextApiRequest, NextApiResponse } from "next";

const DEFAULT_URL =
  "https://chromewebstore.google.com/detail/blocknsfw-%E2%80%93-porn-adult-co/fiecjgpoilkhmoieaboolkfmgbnhlhop";

function decodeEntities(s: string): string {
  return s
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll(/&#x?[\da-f]+;/gi, " ")
    .replaceAll(/[\u00a0\u2009\u202f]/g, " ");
}

function parseInstallCount(text: string): number {
  if (!text) return 0;
  const cleaned = text.replaceAll(/[^\d.kKmM+]/g, "").replace("+", "");
  const lower = cleaned.toLowerCase();
  let mult = 1;
  let body = lower;
  if (lower.endsWith("k")) {
    mult = 1_000;
    body = lower.slice(0, -1);
  } else if (lower.endsWith("m")) {
    mult = 1_000_000;
    body = lower.slice(0, -1);
  }
  const num = Number.parseFloat(body);
  if (Number.isNaN(num)) return 0;
  return Math.round(num * mult);
}

function extractUserCount(html: string): { userText: string; userCount: number } {
  const decoded = decodeEntities(html);

  const patterns: RegExp[] = [
    /<meta[^>]+itemprop=["']interactionCount["'][^>]*content=["']([^"']+)["']/i,
    /UserDownloads:(\d[\d,]*)/i,
    />\s*([\d,]+\+?)\s+users?\s*</i,
    /"([\d,]+\+?)\s+users?"/i,
    /\b([\d,]+\+?)\s+users?\b/i,
  ];

  for (const re of patterns) {
    const m = re.exec(decoded);
    if (m?.[1]) {
      const userText = m[1];
      const userCount = parseInstallCount(userText);
      if (userCount > 0) return { userText, userCount };
    }
  }

  return { userText: "", userCount: 0 };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url =
    typeof req.query.url === "string" && req.query.url.length > 0
      ? req.query.url
      : DEFAULT_URL;

  try {
    const r = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (!r.ok) {
      return res.status(r.status).json({
        error: `CWS upstream ${r.status}`,
        userText: "",
        userCount: 0,
      });
    }

    const html = await r.text();
    const { userText, userCount } = extractUserCount(html);

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );

    return res.status(200).json({ userText, userCount });
  } catch {
    return res.status(500).json({
      error: "Failed to fetch Chrome Web Store data",
      userText: "",
      userCount: 0,
    });
  }
}
