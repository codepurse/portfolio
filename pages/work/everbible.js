import Head from "next/head";
import {
  CountUp,
  CursorDot,
  Grain,
  SiteFooter,
  SiteNav,
  useScrollReveal,
  NAME,
} from "../../components/site";

export default function EverbibleCase() {
  useScrollReveal();

  return (
    <>
      <Head>
        <title>Everbible — Case Study · {NAME}</title>
        <meta
          name="description"
          content="Case study: Everbible, an offline, ad-free Bible app for Android. Six translations, fourteen topical studies, zero trackers."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Grain />
      <CursorDot />
      <SiteNav />

      {/* ─── HEADER ─── */}
      <header className="case-hero">
        <div className="case-eyebrow rise" style={{ animationDelay: "0.05s" }}>
          ← <a className="link-u" href="/#work">Back to Work</a> &nbsp; / &nbsp; Case Study 03
        </div>

        <h1 className="case-title rise" style={{ animationDelay: "0.2s" }}>
          Everbible<span className="amp">.</span>
        </h1>

        <p className="case-sub rise" style={{ animationDelay: "0.4s" }}>
          An offline Bible reader built with <em>quiet reverence</em> —
          for a category that lost the plot on engagement metrics
          somewhere around 2014.
        </p>

        <div className="case-meta rise" style={{ animationDelay: "0.6s" }}>
          <div><span className="k">Role</span><span className="v">Design · Engineering · Ship</span></div>
          <div><span className="k">Year</span><span className="v">2025 — Present</span></div>
          <div><span className="k">Platform</span><span className="v">Android</span></div>
          <div><span className="k">Status</span><span className="v"><span className="dot" /> Live · Sep ’25</span></div>
          <div className="case-meta-link">
            <a
              className="link-u"
              href="https://play.google.com/store/apps/details?id=com.everbible.app"
              target="_blank"
              rel="noreferrer"
            >
              View on Google Play ↗
            </a>
          </div>
        </div>
      </header>

      {/* ─── STATS ─── */}
      <section className="case-stats">
        <div className="stat reveal">
          <div className="n"><CountUp value={100} /><span className="suf">+</span></div>
          <div className="l">Installs</div>
        </div>
        <div className="stat reveal">
          <div className="n"><CountUp value={6} pad={2} /></div>
          <div className="l">Translations</div>
        </div>
        <div className="stat reveal">
          <div className="n"><CountUp value={14} pad={2} /></div>
          <div className="l">Topical Studies</div>
        </div>
        <div className="stat reveal">
          <div className="n">00</div>
          <div className="l">Trackers</div>
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
            The Bible app, somehow, became a <em>retention product</em>.
          </h2>
          <p className="cs-p reveal">
            Push notifications nagging for streaks. Banner ads selling
            study courses one tap from the Sermon on the Mount.
            Cross-references gated behind a subscription. Account walls
            before you can open Genesis 1. Modern Bible apps optimised
            for the same metrics as a mobile game and ended up feeling
            roughly as sacred as one.
          </p>
          <p className="cs-p reveal">
            For a category whose users are, by definition, looking for
            quiet, contemplation, and care — that is a category-level
            failure of taste. There was room for an app that simply
            respected what it was for.
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
            Treat the text with deference. Build the tools study
            <em> actually needs</em>.
          </h2>
          <p className="cs-p reveal">
            The product is structured in three layers, in order of weight.
            The text comes first, the tools support the text, and the
            companions live one tap deeper for those who want them.
            Nothing in the app interrupts a reading session.
          </p>

          <ol className="layers">
            <li className="reveal">
              <div className="lh"><span className="num">L1</span> The Text</div>
              <p>
                Six public-domain translations — AKJV, ASV, BBE, KJV, WEB,
                YLT — bundled and indexed offline. No download flow, no
                license server, no surprise paywalls on book three of John.
              </p>
            </li>
            <li className="reveal">
              <div className="lh"><span className="num">L2</span> The Tools</div>
              <p>
                Highlighting, bookmarks, notes, full-text search, and a
                verse translation tool. Each one serves study, not
                streaks. The list is short on purpose.
              </p>
            </li>
            <li className="reveal">
              <div className="lh"><span className="num">L3</span> The Companions</div>
              <p>
                Fourteen topical teachings, guided prayers organised by
                theme, and life verses curated for seasons of faith,
                hope, love, peace. Treated like a quiet library, not a
                content feed.
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
            The choices a category-respecting Bible app has to make.
          </h2>

          <div className="tradeoffs">
            <div className="to reveal">
              <div className="to-row">
                <span className="chose">Public-domain translations</span>
                <span className="over">over Modern licensed ones</span>
              </div>
              <p>
                Six freely-licensed translations ship inside the app. The
                trade is no NIV or ESV — the gain is a permanently free,
                permanently offline product with no per-install cost
                stack to recover.
              </p>
            </div>

            <div className="to reveal">
              <div className="to-row">
                <span className="chose">No streaks, no notifications</span>
                <span className="over">over Engagement gamification</span>
              </div>
              <p>
                Reading scripture is not a Duolingo habit. The app refuses
                streak counters, daily-reminder spam, and badges. If
                someone opens it once a year on Christmas Eve, that is a
                successful session.
              </p>
            </div>

            <div className="to reveal">
              <div className="to-row">
                <span className="chose">AI assistance, openly disclosed</span>
                <span className="over">over Pretending nothing is AI</span>
              </div>
              <p>
                Some companion content is AI-assisted. The store listing
                and in-app copy say so plainly, with a clear note that
                it is for inspiration and not a substitute for guidance
                from a spiritual leader. Honesty over polish.
              </p>
            </div>

            <div className="to reveal">
              <div className="to-row">
                <span className="chose">Local-only, no accounts</span>
                <span className="over">over Cloud sync</span>
              </div>
              <p>
                Highlights, notes, and bookmarks live on the device.
                Nothing syncs to a server. The Play Store data-safety
                badge is the rarer green one — “no data collected” — and
                it is honest.
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
            A small, real audience — and the rare honest data-safety badge.
          </h2>
          <p className="cs-p reveal">
            Everbible is live on Google Play in the Books &amp; Reference
            category, with 100+ installs and the rarest of Play Store
            badges: <em>no data shared, no data collected</em>. Updates
            ship on a calm, deliberate cadence — the latest one added a
            new prayers list and refined the search.
          </p>

          <blockquote className="pullquote reveal">
            “Added new Prayer’s list. Added new Quotes &amp; Verses list.
            Enhanced search functionality for more accurate results.
            General bug fixes and performance optimizations.”
            <cite>— Release notes, latest version</cite>
          </blockquote>

          <p className="cs-p reveal">
            This was the project where I learned that some categories
            don’t need bigger swings — they need someone willing to make
            the smaller, quieter version. The people it’s for tend to
            recognise it on sight.
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
            <li className="reveal"><span>—</span> iOS port via a shared text-engine core</li>
            <li className="reveal"><span>—</span> Reading plans — paced, never streak-based</li>
            <li className="reveal"><span>—</span> Side-by-side translation comparison view</li>
            <li className="reveal"><span>—</span> Optional public-domain audio readings</li>
            <li className="reveal"><span>—</span> A clearly-labelled, manually-curated theology library</li>
          </ul>
        </div>
      </section>

      {/* ─── NEXT PROJECT ─── */}
      <section className="next-project">
        <div className="np-eyebrow reveal">Back to the Top</div>
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
