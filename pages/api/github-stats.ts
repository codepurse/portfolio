import type { NextApiRequest, NextApiResponse } from "next";

const DEFAULT_OWNER = "codepurse";
const DEFAULT_REPO = "SEOCORE";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const owner =
    typeof req.query.owner === "string" && req.query.owner.length > 0
      ? req.query.owner
      : DEFAULT_OWNER;
  const repo =
    typeof req.query.repo === "string" && req.query.repo.length > 0
      ? req.query.repo
      : DEFAULT_REPO;

  try {
    const r = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
      }
    );

    if (!r.ok) {
      return res
        .status(r.status)
        .json({ error: `GitHub upstream ${r.status}` });
    }

    const data = await r.json();

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=3600"
    );

    return res.status(200).json({
      stars: data?.stargazers_count ?? 0,
      forks: data?.forks_count ?? 0,
      watchers: data?.watchers_count ?? 0,
      openIssues: data?.open_issues_count ?? 0,
      updatedAt: data?.updated_at ?? null,
    });
  } catch {
    return res.status(500).json({ error: "Failed to fetch GitHub data" });
  }
}
