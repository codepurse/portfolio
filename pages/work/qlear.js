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

const GP_ID = "com.qlear.app";
const GP_API = `/api/gp-stats?id=${GP_ID}`;

const FALLBACK = {
  installs: "100+",
  themes: 9,
};

function useGpStats() {
  const [data, setData] = useState(FALLBACK);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;

    fetch(GP_API)
      .then((r) => {
        if (!r.ok) throw new Error(`GP ${r.status}`);
        return r.json();
      })
      .then((d) => {
        if (cancelled) return;
        setData({
          rating: d.rating,
          reviewCount: d.reviewCount,
          installText: d.installText || FALLBACK.installs,
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}

export default function QlearCase() {
  useScrollReveal();
  const gp = useGpStats();

  return (
    <>
      <Head>
        <title>Qlear — Case Study · {NAME}</title>
        <meta
          name="description"
          content="Case study: Qlear, an offline-first, privacy-respecting to-do app for Android. No accounts, no sync, no ads."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Grain />
      <CursorDot />
      <SiteNav />

      {/* ─── HEADER ─── */}
      <header className="case-hero">
        <div className="case-eyebrow rise" style={{ animationDelay: "0.05s" }}>
          ← <a className="link-u" href="/#work">Back to Work</a> &nbsp; / &nbsp; Case Study 02
        </div>

        <h1 className="case-title rise" style={{ animationDelay: "0.2s" }}>
          Qlear<span className="amp">.</span>
        </h1>

        <p className="case-sub rise" style={{ animationDelay: "0.4s" }}>
          An <em>offline-first</em> task manager built on a single,
          stubborn idea — your to-do list shouldn’t ask for your email.
        </p>

        <div className="case-meta rise" style={{ animationDelay: "0.6s" }}>
          <div><span className="k">Role</span><span className="v">Design · Engineering · Ship</span></div>
          <div><span className="k">Year</span><span className="v">2025 — Present</span></div>
          <div><span className="k">Platform</span><span className="v">Android</span></div>
          <div><span className="k">Status</span><span className="v"><span className="dot" /> Live · Nov ’25</span></div>
          <div className="case-meta-link">
            <a
              className="link-u"
              href="https://play.google.com/store/apps/details?id=com.qlear.app"
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
          <div className="n">{gp?.installText ?? FALLBACK.installs}</div>
          <div className="l">Installs</div>
        </div>
        <div className="stat reveal">
          <div className="n"><CountUp value={FALLBACK.themes} pad={2} /></div>
          <div className="l">Themes</div>
        </div>
        <div className="stat reveal">
          <div className="n">00</div>
          <div className="l">Trackers</div>
        </div>
        <div className="stat reveal">
          <div className="n">100</div>
          <div className="l">Local %</div>
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
            The to-do app, somehow, became a <em>surveillance product</em>.
          </h2>
          <p className="cs-p reveal">
            Every major task app now wants an account, a subscription, a
            sync server, an inbox of marketing email, and the right to
            quietly read your habits in aggregate. Writing down a grocery
            list has become a transaction.
          </p>
          <p className="cs-p reveal">
            Even the “minimal” ones tend to ship with analytics SDKs, push
            ads behind a free tier, or gate basic features. There is a
            small but real audience of people who would rather use
            something that does less, asks for nothing, and stays out of
            their way. Qlear is for them.
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
            Strip the surface. Keep the <em>essentials</em>. Refuse the rest.
          </h2>
          <p className="cs-p reveal">
            The product is intentionally three things — a Today view, a
            Week view, and a Stats view. Goals live one tap deeper. There
            is no inbox, no team workspace, no AI assistant, no cross-app
            integrations. Every feature was weighed against “could the user
            do without this?” and most lost.
          </p>

          <ol className="layers">
            <li className="reveal">
              <div className="lh"><span className="num">P1</span> Local-only storage</div>
              <p>
                Tasks live in on-device storage. No accounts, no servers,
                no sync layer to maintain or breach. Manual export gives
                the user a real backup — a file they own.
              </p>
            </li>
            <li className="reveal">
              <div className="lh"><span className="num">P2</span> Three surfaces, no creep</div>
              <p>
                Today, Week, Stats. Goals are nested under Stats. New
                features have to displace something existing — additive
                growth is how to-do apps die.
              </p>
            </li>
            <li className="reveal">
              <div className="lh"><span className="num">P3</span> Statistics computed locally</div>
              <p>
                Streaks, completion rates, weekly trends — all derived
                from the local task store at render time. No telemetry
                round-trip, no “personalised insights” that mean ads.
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
            The choices that shaped the product.
          </h2>

          <div className="tradeoffs">
            <div className="to reveal">
              <div className="to-row">
                <span className="chose">Local-only</span>
                <span className="over">over Cloud sync</span>
              </div>
              <p>
                A reinstall is a reset unless the user backed up — and
                that’s the contract. In return: no leaks, no breaches,
                no “service unavailable,” no recurring infrastructure cost
                to recover from a free user base.
              </p>
            </div>

            <div className="to reveal">
              <div className="to-row">
                <span className="chose">Themes</span>
                <span className="over">over Custom colour pickers</span>
              </div>
              <p>
                Nine considered themes beat infinite user-built ones. The
                same instinct that made me design the app — restraint over
                surface area — applies to how it gets personalised.
              </p>
            </div>

            <div className="to reveal">
              <div className="to-row">
                <span className="chose">Free + optional donation</span>
                <span className="over">over Subscription</span>
              </div>
              <p>
                The core is free, forever. A small donation surface lives
                in settings for the people who want to fund it. Charging
                rent on a to-do list is a category mistake.
              </p>
            </div>

            <div className="to reveal">
              <div className="to-row">
                <span className="chose">Android-first</span>
                <span className="over">over Cross-platform launch</span>
              </div>
              <p>
                Android’s local storage APIs, sideloading culture, and
                tolerance for niche utilities suit the audience. iOS can
                follow once the shape of the product is settled.
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
            Small numbers, on purpose — and the right ones.
          </h2>
          <p className="cs-p reveal">
            Qlear is live on Google Play with 100+ installs and a
            content-safe-for-everyone rating. Every install came through
            organic search — people typing variants of <em>“no ads”</em>,
            <em>“offline”</em>, <em>“no account”</em> into the store and
            finding the app that was built for that exact query.
          </p>

          <blockquote className="pullquote reveal">
            “Drastically improved performance when rendering the task list.
            Fixed issues on the billing support page. Made numerous other
            fixes. Thank you all for your support.”
            <cite>— Release notes, v latest</cite>
          </blockquote>

          <p className="cs-p reveal">
            The thesis was that a small but real audience exists for
            quiet tools — and that the way to find them is to refuse
            growth tactics that would compromise the product. So far, the
            data says yes. The pace is patient on purpose.
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
            <li className="reveal"><span>—</span> iOS port via a shared local-storage core</li>
            <li className="reveal"><span>—</span> Home-screen widgets for today’s tasks</li>
            <li className="reveal"><span>—</span> Encrypted backup format for power users</li>
            <li className="reveal"><span>—</span> A small library of goal templates — no AI suggestions</li>
            <li className="reveal"><span>—</span> A public, honest changelog page on the marketing site</li>
          </ul>
        </div>
      </section>

      {/* ─── NEXT PROJECT ─── */}
      <section className="next-project">
        <div className="np-eyebrow reveal">Next Case Study</div>
        <a className="np-link reveal" href="/work/everbible">
          <span className="np-name">Everbible</span>
          <span className="np-arrow" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 19L19 5M19 5H8M19 5V16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
        <div className="np-meta reveal">2025 · Offline Bible reader</div>
      </section>

      <SiteFooter />
    </>
  );
}
