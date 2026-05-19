import Head from "next/head";
import { useEffect, useState } from "react";
import {
  CountUp,
  CursorDot,
  Grain,
  NAME,
  SiteFooter,
  SiteNav,
  useScrollReveal,
} from "../../components/site";

const AMO_API = "/api/amo-stats";
const CHROME_API = "/api/chrome-stats";

// Static fallback values if APIs fail
const FALLBACK = {
  amoUsers: 1907,
  chromeUsers: 500,
  rating: 4.6,
  reviews: 15,
};

function useCombinedStats() {
  const [stats, setStats] = useState(FALLBACK);

  useEffect(() => {
    if (globalThis.window === undefined) return;
    let cancelled = false;

    const fetchJson = (url) =>
      fetch(url)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null);

    Promise.all([fetchJson(AMO_API), fetchJson(CHROME_API)]).then(
      ([amo, chrome]) => {
        if (cancelled) return;
        setStats({
          amoUsers:
            typeof amo?.users === "number" && amo.users > 0
              ? amo.users
              : FALLBACK.amoUsers,
          chromeUsers:
            typeof chrome?.userCount === "number" && chrome.userCount > 0
              ? chrome.userCount
              : FALLBACK.chromeUsers,
          rating:
            typeof amo?.rating === "number" && amo.rating > 0
              ? amo.rating
              : FALLBACK.rating,
          reviews:
            typeof amo?.reviews === "number" && amo.reviews > 0
              ? amo.reviews
              : FALLBACK.reviews,
        });
      }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return stats;
}

export default function BlockNSFWCase() {
  useScrollReveal();
  const stats = useCombinedStats();

  return (
    <>
      <Head>
        <title>BlockNSFW — Case Study · {NAME}</title>
        <meta
          name="description"
          content="Case study: BlockNSFW, a privacy-first content filter for Firefox and Chrome combining domain blocking, content heuristics, and image scanning."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Grain />
      <CursorDot />
      <SiteNav />

      {/* ─── HEADER ─── */}
      <header className="case-hero">
        <div className="case-eyebrow rise" style={{ animationDelay: "0.05s" }}>
          ← <a className="link-u" href="/#work">Back to Work</a> &nbsp; / &nbsp; Case Study 01
        </div>

        <h1 className="case-title rise" style={{ animationDelay: "0.2s" }}>
          BlockNSFW<span className="amp">.</span>
        </h1>

        <p className="case-sub rise" style={{ animationDelay: "0.4s" }}>
          A <em>privacy-first</em> content filter for Firefox — blocks adult
          domains, scans page heuristics, and optionally classifies explicit
          imagery. All locally, no telemetry, no accounts.
        </p>

        <div className="case-meta rise" style={{ animationDelay: "0.6s" }}>
          <div><span className="k">Role</span><span className="v">Design · Engineering · Ship</span></div>
          <div><span className="k">Year</span><span className="v">2025 — Present</span></div>
          <div><span className="k">Platform</span><span className="v">Firefox · Android · Chrome</span></div>
          <div><span className="k">Status</span><span className="v"><span className="dot" /> Live · v1.5.0</span></div>
          <div className="case-meta-link">
            <a
              className="link-u"
              href="https://addons.mozilla.org/en-US/firefox/addon/blocknsfw-porn-adult-content/"
              target="_blank"
              rel="noreferrer"
            >
              View on Mozilla Add-ons ↗
            </a>
            <span aria-hidden>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <a
              className="link-u"
              href="https://chromewebstore.google.com/detail/blocknsfw-%E2%80%93-porn-adult-co/fiecjgpoilkhmoieaboolkfmgbnhlhop"
              target="_blank"
              rel="noreferrer"
            >
              View on Chrome Web Store ↗
            </a>
          </div>
        </div>
      </header>

      {/* ─── STATS ─── */}
      <section className="case-stats">
        <div className="stat reveal">
          <div className="n"><CountUp value={stats.amoUsers} /></div>
          <div className="l">Firefox users</div>
        </div>
        <div className="stat reveal">
          <div className="n"><CountUp value={stats.chromeUsers} /></div>
          <div className="l">Chrome users</div>
        </div>
        <div className="stat reveal">
          <div className="n"><CountUp value={stats.rating} decimals={1} /><span className="suf">/5</span></div>
          <div className="l">AMO rating</div>
        </div>
        <div className="stat reveal">
          <div className="n"><CountUp value={stats.reviews} /></div>
          <div className="l">AMO reviews</div>
        </div>
      </section>

      {/* ─── 01 PROBLEM ─── */}
      <section className="case-section">
        <aside className="cs-side reveal">
          <div className="num">01</div>
          <div className="lbl">The Problem</div>
        </aside>
        <div className="cs-body">
          <h2 className="cs-h reveal">
            The default web is <em>increasingly hostile</em> to anyone trying
            to keep it clean.
          </h2>
          <p className="cs-p reveal">
            Adult content leaks through ad networks, social feeds, search
            previews, and recommendation engines. The existing options are a
            mixed bag: simple URL blockers handle a fraction of the problem,
            parental control suites are heavy and surveillance-shaped, and
            most “family-safe” tools route traffic through a third party.
          </p>
          <p className="cs-p reveal">
            I wanted something different — a focused tool for parents,
            students, and professionals that worked entirely inside the
            browser, treated user data as untouchable, and shipped with
            sensible defaults instead of a setup wizard.
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
            A layered detection model, running entirely <em>in-browser</em>.
          </h2>
          <p className="cs-p reveal">
            Rather than relying on any single signal, BlockNSFW combines three
            independent passes. Each is fast, local, and fails gracefully —
            so a missed signal in one layer is usually caught by the next.
          </p>

          <ol className="layers">
            <li className="reveal">
              <div className="lh"><span className="num">L1</span> Domain blocklist</div>
              <p>
                A curated list of known adult and adjacent platforms, applied
                before any DOM is parsed. Cheap, instant, and the floor of
                protection.
              </p>
            </li>
            <li className="reveal">
              <div className="lh"><span className="num">L2</span> Content heuristics</div>
              <p>
                NSFW keyword scoring across page titles, meta descriptions,
                and forum content. Tuned to catch leaks on otherwise neutral
                domains — Reddit threads, X media, search result previews.
              </p>
            </li>
            <li className="reveal">
              <div className="lh"><span className="num">L3</span> Image classification</div>
              <p>
                Optional, on-device scanning of inline images. Off by default
                for performance; opt-in for the paranoid setup. Never leaves
                the browser.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* ─── 03 DECISIONS ─── */}
      <section className="case-section">
        <aside className="cs-side reveal">
          <div className="num">03</div>
          <div className="lbl">Decisions &amp; Trade-offs</div>
        </aside>
        <div className="cs-body">
          <h2 className="cs-h reveal">
            The choices I’d defend in a code review.
          </h2>

          <div className="tradeoffs">
            <div className="to reveal">
              <div className="to-row">
                <span className="chose">Local-first</span>
                <span className="over">over Cloud API</span>
              </div>
              <p>
                Zero outbound requests means zero trust required. No accounts,
                no subscription, no breach surface. The trade is a bigger
                bundle and constraints on model size — worth it for a privacy
                tool.
              </p>
            </div>

            <div className="to reveal">
              <div className="to-row">
                <span className="chose">Defaults that just work</span>
                <span className="over">over Onboarding flows</span>
              </div>
              <p>
                Install, done. Advanced controls live one click deep. Tools
                that need a setup wizard lose half their installs before
                they’re useful.
              </p>
            </div>

            <div className="to reveal">
              <div className="to-row">
                <span className="chose">Multi-layer detection</span>
                <span className="over">over A single smart model</span>
              </div>
              <p>
                Three small, fast methods are more legible, easier to debug,
                and degrade better than one opaque classifier. False
                negatives are the failure mode I optimised against.
              </p>
            </div>

            <div className="to reveal">
              <div className="to-row">
                <span className="chose">Firefox-first</span>
                <span className="over">over Chrome parity</span>
              </div>
              <p>
                Firefox’s WebExtensions APIs are less restrictive, the
                review process is humane, and the user base is naturally
                aligned with privacy-first software. Chrome came after
                validation — MV3's shared surface made the port quick.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 04 OUTCOME ─── */}
      <section className="case-section alt">
        <aside className="cs-side reveal">
          <div className="num">04</div>
          <div className="lbl">Outcome</div>
        </aside>
        <div className="cs-body">
          <h2 className="cs-h reveal">
            Used by thousands across Firefox and Chrome.
          </h2>
          <p className="cs-p reveal">
            BlockNSFW is live on both the Mozilla Add-ons and Chrome Web Store,
            sitting in the Privacy &amp; Security and Search Tools categories.
            Reviews skew warm, support emails are manageable, and the v1.5.0
            release shipped on schedule three weeks ago.
          </p>

          <blockquote className="pullquote reveal">
            “Lightweight, no nonsense, and it actually catches the things
            other blockers miss.”
            <br />
            <cite>— AMO review</cite>
          </blockquote>

          <p className="cs-p reveal">
            More importantly, it taught me how to ship and maintain a real
            product to real users — versioning, support, accessibility
            review, the slow grind of trust. The version of me that started
            this would have over-engineered the model and shipped six months
            late. The version that finished it cut three features and
            shipped clean.
          </p>
        </div>
      </section>

      {/* ─── 05 NEXT ─── */}
      <section className="case-section">
        <aside className="cs-side reveal">
          <div className="num">05</div>
          <div className="lbl">What’s Next</div>
        </aside>
        <div className="cs-body">
          <ul className="next-list">
            <li className="reveal"><span>—</span> Tunable strictness profiles (Focus, Family, Strict)</li>
            <li className="reveal"><span>—</span> Optional sync of custom blocklists across devices</li>
            <li className="reveal"><span>—</span> A small, honest stats page — no analytics, just transparency</li>
          </ul>
        </div>
      </section>

      {/* ─── NEXT PROJECT ─── */}
      <section className="next-project">
        <div className="np-eyebrow reveal">Next Case Study</div>
        <a className="np-link reveal" href="/work/qlear">
          <span className="np-name">Qlear</span>
          <span className="np-arrow" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 19L19 5M19 5H8M19 5V16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
        <div className="np-meta reveal">2025 · Offline-first to-do app</div>
      </section>

      <SiteFooter />
    </>
  );
}
