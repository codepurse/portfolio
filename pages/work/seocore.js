import { motion } from "framer-motion";
import Head from "next/head";
import {
  CountUp,
  CursorDot,
  Grain,
  NAME,
  SiteFooter,
  SiteNav,
  useGitHubStats,
  useScrollReveal,
} from "../../components/site";

export default function SEOCoreCase() {
  useScrollReveal();
  const gh = useGitHubStats("codepurse", "SEOCORE");

  return (
    <>
      <Head>
        <title>SEOCore — Case Study · {NAME}</title>
        <meta
          name="description"
          content="Case study: SEOCore, an enterprise-grade, multi-threaded SEO crawler and rule engine built in TypeScript."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Grain />
      <CursorDot />
      <SiteNav />

      {/* ─── HEADER ─── */}
      <header className="case-hero">
        <motion.div
          className="case-eyebrow rise"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          ← <a className="link-u" href="/#work">Back to Work</a> &nbsp; / &nbsp; Case Study
        </motion.div>

        <motion.h1
          className="case-title rise"
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
        >
          SEOCore<span className="amp">.</span>
        </motion.h1>

        <motion.p
          className="case-sub rise"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
        >
          An <em>enterprise-grade</em>, multi-threaded SEO crawler, rule engine,
          and link graph analyzer — built in TypeScript for speed, compliance,
          and deep site health audits.
        </motion.p>

        <motion.div
          className="case-meta rise"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
        >
          <div><span className="k">Role</span><span className="v">Design · Engineering · Architecture</span></div>
          <div><span className="k">Year</span><span className="v">2026 — Present</span></div>
          <div><span className="k">Platform</span><span className="v">Node.js · CLI · SDK</span></div>
          <div><span className="k">Status</span><span className="v"><span className="dot" /> Live</span></div>
          {gh && (
            <div className="gh-stats">
              <span className="gh-stat">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <CountUp value={gh.stars ?? 0} className="gh-num" />
              </span>
              <span className="gh-stat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M7 3v18M17 3v18M4 8h16M4 16h16" strokeLinecap="round" />
                </svg>
                <CountUp value={gh.forks ?? 0} className="gh-num" />
              </span>
            </div>
          )}
          <div className="case-meta-link">
            <a
              className="link-u"
              href="https://github.com/codepurse/SEOCORE"
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub ↗
            </a>
            <span aria-hidden>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <a
              className="link-u"
              href="https://www.npmjs.com/package/seocore"
              target="_blank"
              rel="noreferrer"
            >
              View on npm ↗
            </a>
          </div>
        </motion.div>
      </header>

      {/* ─── 01 PROBLEM ─── */}
      <section className="case-section">
        <aside className="cs-side reveal">
          <div className="num">01</div>
          <div className="lbl">The Problem</div>
        </aside>
        <div className="cs-body">
          <h2 className="cs-h reveal">
            SEO auditing tools are either <em>too shallow</em> or <em>too opaque</em>.
          </h2>
          <p className="cs-p reveal">
            Most SEO tools on the market fall into two camps: lightweight
            checkers that barely scratch the surface, or bloated SaaS platforms
            that hide their logic behind a dashboard and a monthly subscription.
            Neither gives developers and SEO specialists the depth, control, or
            transparency they need to truly understand a site&apos;s health.
          </p>
          <p className="cs-p reveal">
            The real work of SEO — crawl analysis, redirect chain tracing,
            structured data validation, link authority scoring, AI visibility
            auditing — requires a tool that can go deep and explain itself.
            Existing CLI tools are fragmented, single-purpose scripts. No single
            open-source solution combined high-performance crawling with a
            declarative rule engine and production-ready reporting.
          </p>
        </div>
      </section>

      {/* ─── 02 APPROACH ─── */}
      <section className="case-section alt">
        <aside className="cs-side reveal">
          <div className="num">02</div>
          <div className="lbl">Approach</div>
        </aside>
        <div className="cs-body">
          <h2 className="cs-h reveal">
            Build a <em>crawler that thinks</em> — then teach it to explain.
          </h2>
          <p className="cs-p reveal">
            SEOCore was designed as a modular, tiered auditing platform. Every
            decision flows from two principles: depth should be configurable,
            and every finding should be traceable back to the rule that
            produced it.
          </p>

          <ol className="layers">
            <li className="reveal">
              <div className="lh"><span className="num">Execution Tiers</span> From Fast to Enterprise</div>
              <p>
                Four tiers drive crawl limits, rule selection, and scoring
                behavior. Fast runs core rules on one page. Standard adds
                performance and 100 pages. Deep enables all modules with
                Playwright rendering at 500 pages. Enterprise unlocks plugins,
                Lighthouse sampling, and 5,000 pages.
              </p>
            </li>
            <li className="reveal">
              <div className="lh"><span className="num">Concurrent Crawler</span> Rate-Limited & Resilient</div>
              <p>
                Built on a custom HTTP engine with Bottleneck rate-limiting and
                p-queue concurrency. Respects robots.txt, extracts sitemaps
                automatically, and handles retries, backoff, and timeouts
                gracefully.
              </p>
            </li>
            <li className="reveal">
              <div className="lh"><span className="num">Declarative Rules</span> Compiled & Traceable</div>
              <p>
                A modular rule system where each audit is a declarative rule
                with a clear pass/fail boundary. Rules are compiled, scored, and
                reported with full traceability — no black-box scoring.
              </p>
            </li>
            <li className="reveal">
              <div className="lh"><span className="num">Graph Analysis</span> Link Authority & Orphan Detection</div>
              <p>
                Computes in-degree, out-degree, and PageRank-style authority
                scores across the crawl graph. Flags orphan pages, structural
                dead ends, and internal linking opportunities.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* ─── 03 ARCHITECTURE ─── */}
      <section className="case-section">
        <aside className="cs-side reveal">
          <div className="num">03</div>
          <div className="lbl">Architecture</div>
        </aside>
        <div className="cs-body">
          <h2 className="cs-h reveal">
            A monorepo built for <em>extensibility</em> at scale.
          </h2>

          <div className="tradeoffs">
            <div className="to reveal">
              <div className="to-row">
                <span className="chose">Nx Monorepo</span>
                <span className="over">over Single Package</span>
              </div>
              <p>
                Nine packages — cli, engine, crawler, analyzers, rules, scoring,
                config, sdk, reporter — each with clear boundaries. Independent
                versioning, shared types, and parallel builds.
              </p>
            </div>

            <div className="to reveal">
              <div className="to-row">
                <span className="chose">Cheerio + Playwright</span>
                <span className="over">over Single Parser</span>
              </div>
              <p>
                Cheerio for fast static HTML parsing. Playwright as an optional
                tier for client-rendered SPAs. The same analyzers run against
                both, producing comparable results.
              </p>
            </div>

            <div className="to reveal">
              <div className="to-row">
                <span className="chose">Zod Schema Validation</span>
                <span className="over">over Manual Checks</span>
              </div>
              <p>
                All configuration is validated through Zod schemas with clear
                error messages. Presets for each tier ship out of the box,
                but every knob is exposed for customization.
              </p>
            </div>

            <div className="to reveal">
              <div className="to-row">
                <span className="chose">EventBus Reporting</span>
                <span className="over">over Direct Output</span>
              </div>
              <p>
                A custom EventBus decouples crawling from reporting. Terminal,
                JSON, HTML, and SARIF reporters all consume the same event
                stream — add a new format without touching the engine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 04 FEATURES ─── */}
      <section className="case-section alt">
        <aside className="cs-side reveal">
          <div className="num">04</div>
          <div className="lbl">Feature Highlights</div>
        </aside>
        <div className="cs-body">
          <h2 className="cs-h reveal">
            Fifteen audit modules. One unified report.
          </h2>

          <div className="feature-grid">
            <div className="feature reveal">
              <h3>AI Visibility Auditor</h3>
              <p>
                Evaluates brand visibility across AI crawlers. Audits
                robots.txt, sitemaps, and llms.txt rules for GPTBot, ClaudeBot,
                PerplexityBot, and Google-Extended.
              </p>
            </div>
            <div className="feature reveal">
              <h3>Structured Data Graph</h3>
              <p>
                Compiles Schema.org JSON-LD, Microdata, and RDFa into an Entity
                Graph. Detects broken references, duplicate entities, and
                coverage gaps.
              </p>
            </div>
            <div className="feature reveal">
              <h3>Mobile SEO Scorer</h3>
              <p>
                Evaluates mobile usability, simulated Core Web Vitals, responsive
                design quality, and mobile-first indexing readiness with strict
                verification guards.
              </p>
            </div>
            <div className="feature reveal">
              <h3>E-E-A-T Analyzer</h3>
              <p>
                Scores Experience, Expertise, Authoritativeness, and
                Trustworthiness. Analyzes readability, content structure, keyword
                density, and AI citation readiness.
              </p>
            </div>
            <div className="feature reveal">
              <h3>Image Audit</h3>
              <p>
                Site-wide image analysis for SEO, performance, and accessibility.
                Covers format, size, lazy-loading, alt text, CLS risk, and LCP
                image detection with byte-weighted scoring.
              </p>
            </div>
            <div className="feature reveal">
              <h3>Technology Detection</h3>
              <p>
                Evidence-based stack detection with deterministic confidence
                scores. Identifies frameworks, CDNs, CMS packages, analytics,
                and rendering strategies.
              </p>
            </div>
            <div className="feature reveal">
              <h3>JavaScript SEO Impact</h3>
              <p>
                Compares raw HTML against rendered DOM to detect SEO-relevant
                changes from client-side JavaScript. Flags metadata, heading,
                content, and structured data parity issues.
              </p>
            </div>
            <div className="feature reveal">
              <h3>Audit Snapshots & Diff</h3>
              <p>
                Save audit snapshots with --save. Compare against previous runs
                with --diff. CI mode fails only on regressions, integrating
                cleanly into deployment pipelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 05 REPORTING ─── */}
      <section className="case-section">
        <aside className="cs-side reveal">
          <div className="num">05</div>
          <div className="lbl">Reporting</div>
        </aside>
        <div className="cs-body">
          <h2 className="cs-h reveal">
            Output that fits the <em>workflow</em>.
          </h2>
          <p className="cs-p reveal">
            SEOCore exports findings in four formats: rich colored terminal
            tables for quick scans, structured JSON for programmatic consumption,
            styled HTML reports for stakeholder sharing, and SARIF for security
            and compliance tooling integration.
          </p>
          <p className="cs-p reveal">
            Every report includes severity levels, actionable recommendations,
            and direct references to the rule that triggered each finding. The
            --dry-run flag lets users preview the full audit configuration
            before a single request is made.
          </p>
        </div>
      </section>

      {/* ─── NEXT PROJECT ─── */}
      <section className="next-project">
        <div className="np-eyebrow reveal">Next Case Study</div>
        <a className="np-link reveal" href="/work/webtrace">
          <span className="np-name">WebTrace</span>
          <span className="np-arrow" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 19L19 5M19 5H8M19 5V16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
        <div className="np-meta reveal">2026 · Privacy-first browser history manager</div>
      </section>

      <SiteFooter />
    </>
  );
}
