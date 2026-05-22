import { motion } from "framer-motion";
import Head from "next/head";
import {
  CursorDot,
  Grain,
  NAME,
  SiteFooter,
  SiteNav,
  useScrollReveal,
} from "../../components/site";

export default function WebTraceCase() {
  useScrollReveal();

  return (
    <>
      <Head>
        <title>WebTrace — Case Study · {NAME}</title>
        <meta
          name="description"
          content="Case study: WebTrace, a privacy-first browser history manager for Chrome & Firefox that turns browsing history into a searchable, organized workspace."
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
          WebTrace<span className="amp">.</span>
        </motion.h1>

        <motion.p
          className="case-sub rise"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
        >
          A <em>privacy-first</em> browser history manager for Chrome &amp; Firefox
          — search pages, manage favorites, restore closed tabs, review search
          queries, downloads, clipboard history, bookmarks, and extension
          activity. Everything stays on your device.
        </motion.p>

        <motion.div
          className="case-meta rise"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
        >
          <div><span className="k">Role</span><span className="v">Design · Engineering · Ship</span></div>
          <div><span className="k">Year</span><span className="v">2026 — Present</span></div>
          <div><span className="k">Platform</span><span className="v">Chrome · Firefox</span></div>
          <div><span className="k">Status</span><span className="v"><span className="dot" /> Live</span></div>
          <div className="case-meta-link">
            <a
              className="link-u"
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              View on Chrome Web Store ↗
            </a>
            <span aria-hidden>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <a
              className="link-u"
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              View on Mozilla Add-ons ↗
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
            Browser history is there, but <em>inaccessible</em>.
          </h2>
          <p className="cs-p reveal">
            The browser keeps everything — every page visited, every search
            made, every file downloaded. But the built-in history tools are
            basic: a flat chronological list with a search bar. Finding
            something from weeks ago, understanding patterns, or recovering
            accidentally closed tabs requires workarounds.
          </p>
          <p className="cs-p reveal">
            Existing solutions range from full telemetry-heavy analytics tools
            to bare-bones bookmark managers. Nothing gave users real control
            over their own browsing data without shipping it somewhere else
            first. The opportunity: a local-first history manager that
            actually uses the data the browser already collects.
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
            Turn raw history into a <em>searchable workspace</em>.
          </h2>
          <p className="cs-p reveal">
            WebTrace treats browser history as a personal resource, not an
            afterthought. Rather than just listing visited pages, it surfaces
            context — sessions, patterns, relationships — that the default
            history view buries.
          </p>

          <ol className="layers">
            <li className="reveal">
              <div className="lh"><span className="num">Core History</span> Search &amp; Filter</div>
              <p>
                Full-text search across titles and URLs, optional content indexing
                for deeper discovery. Filter by date range, domain, and visit
                duration. Chronological view or smart session grouping.
              </p>
            </li>
            <li className="reveal">
              <div className="lh"><span className="num">Recovery</span> Closed Tabs &amp; Sessions</div>
              <p>
                Restore individual tabs or entire sessions when multiple tabs
                were closed together. One-click recovery without digging
                through raw history.
              </p>
            </li>
            <li className="reveal">
              <div className="lh"><span className="num">Intelligence</span> Search &amp; Download History</div>
              <p>
                Captures and organizes search queries from Google, YouTube,
                Reddit, GitHub, Stack Overflow, Amazon, Wikipedia, and more.
                Review top queries, platform breakdowns, and time ranges.
                Downloads archive with filtering by source, type, size, and date.
              </p>
            </li>
            <li className="reveal">
              <div className="lh"><span className="num">Workspace</span> Favorites &amp; Bookmarks</div>
              <p>
                Star important pages directly from history. Sort by recency,
                usage, alphabetically, or domain. Dedicated views for
                bookmarks with activity tracking.
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
            The choices that define the product.
          </h2>

          <div className="tradeoffs">
            <div className="to reveal">
              <div className="to-row">
                <span className="chose">Local storage only</span>
                <span className="over">over Cloud sync</span>
              </div>
              <p>
                All data lives in browser storage and IndexedDB. No accounts,
                no telemetry, no external servers. The trade is no cross-device
                sync — a deliberate constraint that keeps the privacy promise.
              </p>
            </div>

            <div className="to reveal">
              <div className="to-row">
                <span className="chose">Popup + Full-page views</span>
                <span className="over">over Single interface</span>
              </div>
              <p>
                Quick lookups through the popup, advanced filtering and bulk
                actions in the full-page view. Both access the same data;
                the context determines which one fits better.
              </p>
            </div>

            <div className="to reveal">
              <div className="to-row">
                <span className="chose">Supported search sites</span>
                <span className="over">over Universal capture</span>
              </div>
              <p>
                Search query capture targets known patterns on Google,
                YouTube, Reddit, GitHub, Stack Overflow, Amazon, Wikipedia,
                and similar. This focused approach captures the majority of
                searches while avoiding false positives from other sites.
              </p>
            </div>

            <div className="to reveal">
              <div className="to-row">
                <span className="chose">Chrome + Firefox parity</span>
                <span className="over">over Platform-specific features</span>
              </div>
              <p>
                Both browsers get the same feature set. The WebExtensions
                API differences are real but manageable; maintaining feature
                parity means users can switch browsers without losing
                functionality.
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
            Everything you need, nothing you don&apos;t.
          </h2>

          <div className="feature-grid">
            <div className="feature reveal">
              <h3>Clipboard History</h3>
              <p>
                Store copied text, links, and snippets locally when enabled.
                Search and filter entries later. Control where capture is
                allowed through settings.
              </p>
            </div>
            <div className="feature reveal">
              <h3>Extension Activity</h3>
              <p>
                Track extension lifecycle in one timeline. Review installs,
                updates, enables, disables, and removals.
              </p>
            </div>
            <div className="feature reveal">
              <h3>Analytics Dashboard</h3>
              <p>
                See browsing patterns in a focused view. Average session
                length, focus score, peak activity times, daily activity,
                and hourly distribution.
              </p>
            </div>
            <div className="feature reveal">
              <h3>Bulk Actions</h3>
              <p>
                Select multiple entries for cleanup or remove individual
                visits and full days. Fine-grained control over what
                stays and what goes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 05 PRIVACY ─── */}
      <section className="case-section">
        <aside className="cs-side reveal">
          <div className="num">05</div>
          <div className="lbl">Privacy Commitment</div>
        </aside>
        <div className="cs-body">
          <h2 className="cs-h reveal">
            Privacy isn&apos;t a feature. It&apos;s the foundation.
          </h2>
          <p className="cs-p reveal">
            Every design decision in WebTrace flows from a single constraint:
            the user&apos;s data belongs to the user.
          </p>

          <ul className="privacy-list">
            <li className="reveal">— All data stored locally using browser storage and IndexedDB</li>
            <li className="reveal">— No accounts required</li>
            <li className="reveal">— No cloud sync</li>
            <li className="reveal">— No telemetry</li>
            <li className="reveal">— No external analytics</li>
            <li className="reveal">— No remote server required</li>
          </ul>
        </div>
      </section>

      {/* ─── NEXT PROJECT ─── */}
      <section className="next-project">
        <div className="np-eyebrow reveal">Next Case Study</div>
        <a className="np-link reveal" href="/work/blocknsfw">
          <span className="np-name">BlockNSFW</span>
          <span className="np-arrow" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 19L19 5M19 5H8M19 5V16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
        <div className="np-meta reveal">2025 · Privacy-first content filter</div>
      </section>

      <SiteFooter />
    </>
  );
}
