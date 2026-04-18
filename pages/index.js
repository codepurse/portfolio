import Head from "next/head";
import {
  CursorDot,
  Grain,
  LOCATION,
  MagneticLink,
  NAME,
  SiteFooter,
  SiteNav,
  useClock,
  useScrollReveal,
} from "../components/site";

// ─── Page-level content ─────────────────────────────────────────────
const ROLE_LINE1 = "Designer";
const ROLE_LINE2 = "Developer";
const TAGLINE = (
  <>
    I design and build <em>calm, deliberate</em> interfaces for the web —
    blending editorial restraint with engineered precision.
  </>
);
const EMAIL = "hello@yourdomain.com";

// Edit this monthly — the rest of the block stays the same.
const NOW_UPDATED = "April 2026";
const NOW = {
  building: (
    <>
      <strong>A pet companion app</strong> — every vet visit, medication,
      health record, and reminder your pet has, in one quiet place.
      Local-first, in active build.
    </>
  ),
  reading: (
    <>
      <em>The Design of Everyday Things</em> (Norman), and Jenny Odell’s
      <em> Saving Time</em> on and off.
    </>
  ),
  listening: (
    <>
      Nils Frahm, Ólafur Arnalds, and long instrumental evenings.
    </>
  ),
  thinking: (
    <>
      Why the best tools often find the smallest audiences — and why
      that might be the point.
    </>
  ),
};

const PROJECTS = [
  {
    name: "BlockNSFW",
    desc: "A privacy-first content filter for Firefox. Local heuristics, zero telemetry, ~2k active users.",
    stack: ["WebExtensions", "JavaScript", "MV3"],
    year: "2025",
    href: "/work/blocknsfw",
  },
  {
    name: "Qlear",
    desc: "An offline-first, no-account to-do app for Android. Local storage, nine themes, zero trackers.",
    stack: ["Android", "Kotlin", "Local-first"],
    year: "2025",
    href: "/work/qlear",
  },
  {
    name: "Everbible",
    desc: "An offline Bible reader with six translations, fourteen topical studies, and the rarest Play Store badge: no data collected.",
    stack: ["Android", "Kotlin", "Offline"],
    year: "2025",
    href: "/work/everbible",
  },
];
// ─────────────────────────────────────────────────────────────────────

export default function Home() {
  useScrollReveal();
  const time = useClock();

  return (
    <>
      <Head>
        <title>{NAME} — Designer &amp; Developer</title>
        <meta
          name="description"
          content="Portfolio of a designer and developer crafting calm, deliberate interfaces."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Grain />
      <CursorDot />
      <SiteNav />

      {/* ─── HERO ─── */}
      <section className="hero" id="top">
        <div className="meta-tl rise" style={{ animationDelay: "0.1s" }}>
          Independent designer
          <br />
          &amp; developer based
          <br />
          in {LOCATION}
        </div>
        <div className="meta-tr rise" style={{ animationDelay: "0.15s" }}>
          Portfolio
          <br />
          MMXXVI · v04
        </div>

        {/* Rotating studio mark */}
        <div className="studio-mark rise" style={{ animationDelay: "0.55s" }} aria-hidden>
          <svg className="mark-ring" viewBox="0 0 240 240">
            <defs>
              <path
                id="markCircle"
                d="M 120,120 m -98,0 a 98,98 0 1,1 196,0 a 98,98 0 1,1 -196,0"
              />
            </defs>
            <text className="mark-text">
              <textPath href="#markCircle" startOffset="0">
                AVAILABLE FOR SELECT WORK · MMXXVI · DESIGN + ENGINEERING · 
              </textPath>
            </text>
          </svg>

          <div className="mark-glyph">
            <svg viewBox="0 0 100 100">
              <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <line x1="50" y1="14" x2="50" y2="86" />
                <line x1="14" y1="50" x2="86" y2="50" />
                <line x1="24.5" y1="24.5" x2="75.5" y2="75.5" />
                <line x1="75.5" y1="24.5" x2="24.5" y2="75.5" />
                <line x1="50" y1="22" x2="50" y2="78" transform="rotate(22.5 50 50)" />
                <line x1="50" y1="22" x2="50" y2="78" transform="rotate(67.5 50 50)" />
              </g>
            </svg>
          </div>

          <span className="mark-dot" />
        </div>

        {/* Vertical availability stamp — pinned to right edge */}
        <a
          className="avail-stamp rise"
          style={{ animationDelay: "0.7s" }}
          href={`mailto:${EMAIL}`}
          aria-label={`Available for select work. Q2 2026. Email ${EMAIL}`}
        >
          <span className="avail-dot" aria-hidden />
          <span>Accepting 2 projects</span>
          <span className="avail-sep" aria-hidden>/</span>
          <span>Q2 — MMXXVI</span>
          <span className="avail-sep" aria-hidden>/</span>
          <span>{EMAIL}&nbsp;↗</span>
        </a>

        <h1 className="title">
          <span className="l1">
            {ROLE_LINE1}
            <span className="amp">&amp;</span>
          </span>
          <span className="l2">
            {ROLE_LINE2}
            <sup>—02</sup>
          </span>
        </h1>

        <div className="footrow rise" style={{ animationDelay: "0.7s" }}>
          <p className="tagline">{TAGLINE}</p>
          <div className="scroll">
            Scroll <span className="line" />
          </div>
          <div className="place">
            {LOCATION}
            <br />
            {time || "—"}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="about" id="about">
        <div className="label-rot reveal">— About / 01</div>

        <div className="col-prose">
          <div className="sec-num reveal">(01) — Introduction</div>
          <h2 className="lede reveal">
            I’m a multidisciplinary maker working at the seam of <em>design</em>{" "}
            and <em>engineering</em>.
          </h2>
          <p className="body reveal">
            For the past several years I’ve helped startups, studios, and small
            teams ship products that feel considered. My work moves between
            brand systems, interaction design, and front-end engineering — often
            inside the same sprint. I care about typography, performance, and
            the boring details most people skip.
          </p>
          <p className="body reveal">
            Outside client work I write small tools, tinker with type, and run a
            quiet newsletter on craft and the web. Open to selective
            collaboration and full-time roles where taste actually ships.
          </p>
          <div className="signoff reveal">— Currently in {LOCATION}</div>
        </div>

        <aside className="col-facts">
          <div className="fact reveal">
            <div className="k">Focus</div>
            <div className="v">
              Product design<small>Interface, brand, motion</small>
            </div>
          </div>
          <div className="fact reveal">
            <div className="k">Stack</div>
            <div className="v">
              React · Next · TS<small>Node · Postgres · Sass</small>
            </div>
          </div>
          <div className="fact reveal">
            <div className="k">Years</div>
            <div className="v">
              06+<small>Since 2019</small>
            </div>
          </div>
          <div className="fact reveal">
            <div className="k">Tools</div>
            <div className="v">
              Figma · Linear<small>VS Code · Cursor</small>
            </div>
          </div>
        </aside>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="process" id="process">
        <header className="process-head">
          <div className="sec-num reveal">(02) — Process</div>
          <h2 className="reveal">
            How I <em>work</em>.
          </h2>
          <p className="process-sub reveal">
            Four principles, in order. Each one earns the next —
            and most projects live or die in the second.
          </p>
        </header>

        <ol className="principles">
          <li className="principle reveal">
            <div className="num">01</div>
            <div className="verb">Discover</div>
            <p className="prose">
              Sit with the problem before sketching the solution.
              Read the tickets, watch real users, ask the dumb
              question until the actual one surfaces.
            </p>
            <div className="tag">Audits · Interviews · Listening</div>
          </li>

          <li className="principle reveal">
            <div className="num">02</div>
            <div className="verb">Define</div>
            <p className="prose">
              Strip the project to one sentence I’d defend in a
              code review. If we can’t agree on the sentence, the
              design phase isn’t ready to start.
            </p>
            <div className="tag">Brief · Scope · One clear bet</div>
          </li>

          <li className="principle reveal">
            <div className="num">03</div>
            <div className="verb">Design</div>
            <p className="prose">
              Decide in mid-fidelity. Most calls happen in
              wireframes and rough flows; the polish layer is
              short and intentional, never the place to debate
              structure.
            </p>
            <div className="tag">Wireframes · Mocks · Prototype</div>
          </li>

          <li className="principle reveal">
            <div className="num">04</div>
            <div className="verb">Ship</div>
            <p className="prose">
              Build it the way it’ll be maintained — boring code,
              clear naming, real accessibility, zero dark patterns.
              Ship small, ship often, write the docs.
            </p>
            <div className="tag">Build · Deploy · Document</div>
          </li>
        </ol>
      </section>

      {/* ─── WORK ─── */}
      <section className="work" id="work">
        <header className="work-head">
          <div>
            <div className="sec-num reveal" style={{ marginBottom: "16px" }}>(03) — Selected Work</div>
            <h2 className="reveal">
              Selected <em>work</em>
            </h2>
          </div>
          <div className="count reveal">
            ({String(PROJECTS.length).padStart(2, "0")}) &nbsp; · &nbsp; 2023 —
            2025
          </div>
        </header>

        <div className="list">
          {PROJECTS.map((p, i) => (
            <a
              className="row reveal"
              href={p.href}
              key={p.name}
              aria-label={p.name}
            >
              <div className="num">{String(i + 1).padStart(2, "0")}</div>
              <div className="name">{p.name}</div>
              <div className="desc">{p.desc}</div>
              <div className="stack">
                {p.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <div className="arrow" aria-hidden>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M5 19L19 5M19 5H8M19 5V16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="meta-year">{p.year}</div>
            </a>
          ))}
        </div>
      </section>

      {/* ─── NOW ─── */}
      <section className="now" id="now">
        <div className="now-head">
          <div className="eyebrow reveal">Currently</div>
          <h2 className="big reveal">
            Now<span className="amp">.</span>
          </h2>
          <div className="date reveal">
            <span className="live-dot" />
            Updated · {NOW_UPDATED}
          </div>
        </div>

        <dl className="now-list">
          <div className="now-row reveal">
            <dt className="k">Building</dt>
            <dd className="v">{NOW.building}</dd>
          </div>
          <div className="now-row reveal">
            <dt className="k">Reading</dt>
            <dd className="v">{NOW.reading}</dd>
          </div>
          <div className="now-row reveal">
            <dt className="k">Listening</dt>
            <dd className="v">{NOW.listening}</dd>
          </div>
          <div className="now-row reveal">
            <dt className="k">Thinking about</dt>
            <dd className="v">{NOW.thinking}</dd>
          </div>
        </dl>
      </section>

      {/* ─── CONTACT ─── */}
      <section className="contact" id="contact">
        <div className="big reveal">
          Let’s build
          <br />
          something
          <br />
          <em>quietly</em> good.
        </div>
        <div className="right">
          <MagneticLink className="email link-u reveal" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </MagneticLink>
          <div className="socials reveal">
            <a className="link-u" href="#">
              <span className="dash">—</span> GitHub
            </a>
            <a className="link-u" href="#">
              <span className="dash">—</span> Read.cv
            </a>
            <a className="link-u" href="#">
              <span className="dash">—</span> Twitter / X
            </a>
            <a className="link-u" href="#">
              <span className="dash">—</span> LinkedIn
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
