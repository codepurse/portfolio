import type { NextApiRequest, NextApiResponse } from "next";

const DEFAULT_SLUG = "blocknsfw-porn-adult-content";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug =
    typeof req.query.slug === "string" && req.query.slug.length > 0
      ? req.query.slug
      : DEFAULT_SLUG;

  try {
    const r = await fetch(
      `https://addons.mozilla.org/api/v5/addons/addon/${slug}/`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.9",
        },
      }
    );

    if (!r.ok) {
      return res
        .status(r.status)
        .json({ error: `AMO upstream ${r.status}` });
    }

    const data = await r.json();

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );

    return res.status(200).json({
      users: data?.average_daily_users ?? null,
      rating: data?.ratings?.average ?? null,
      reviews: data?.ratings?.count ?? null,
      weeklyDownloads: data?.weekly_downloads ?? null,
      version: data?.current_version?.version ?? null,
    });
  } catch {
    return res.status(500).json({ error: "Failed to fetch AMO data" });
  }
}
