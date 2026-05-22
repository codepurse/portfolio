import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Head from "next/head";
import {
    CountUp,
    CursorDot,
    Grain,
    NAME,
    SiteFooter,
    SiteNav,
    useScrollReveal,
} from "../../components/site";

const ProductShowcase = dynamic(() => import("../../component/3d/ProductShowcase"), {
  ssr: false,
  loading: () => null,
});

const STATS = {
  docsSaved: 80,
  agents: 22,
  rolloutMin: 4,
  rolloutMax: 8,
  noteFormats: 5,
};

export default function NavixHealthCase() {
  useScrollReveal();

  return (
    <>
      <Head>
        <title>{`Navix Health — Case Study · ${NAME}`}</title>
        <meta
          name="description"
          content="Case study: Navix Health, an AI-native behavioral health EMR + CRM website built to turn a dense product surface into a clear operator-facing story."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Grain />
      <CursorDot />
      <SiteNav />

      <header className="case-hero">
        <div className="case-eyebrow rise" style={{ animationDelay: "0.05s" }}>
          ← <a className="link-u" href="/#work">Back to Work</a> &nbsp; / &nbsp; Case Study 04
        </div>

        <motion.h1
          className="case-title rise"
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
        >
          Navix Health<span className="amp">.</span>
        </motion.h1>

        <motion.p
          className="case-sub rise"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
        >
          A client website and product narrative for an <em>AI-native</em>{" "}
          behavioral health platform — built to explain a complex stack without
          falling into generic SaaS noise.
        </motion.p>

        <motion.div
          className="case-meta rise"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
        >
          <div><span className="k">Role</span><span className="v">Designer · Developer</span></div>
          <div><span className="k">Year</span><span className="v">2026</span></div>
          <div><span className="k">Platform</span><span className="v">Web · B2B SaaS</span></div>
          <div><span className="k">Status</span><span className="v"><span className="dot" /> Live · Published</span></div>
          <div className="case-meta-link">
            <a
              className="link-u"
              href="https://navixhealth.com/"
              target="_blank"
              rel="noreferrer"
            >
              Visit navixhealth.com ↗
            </a>
          </div>
        </motion.div>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <ProductShowcase style={{ height: '60vh' }} />
      </motion.div>

      <section className="case-stats">
        <div className="stat reveal">
          <div className="n"><CountUp value={STATS.docsSaved} /><span className="suf">%</span></div>
          <div className="l">Less documentation time</div>
        </div>
        <div className="stat reveal">
          <div className="n"><CountUp value={STATS.agents} /><span className="suf">+</span></div>
          <div className="l">Named AI agents</div>
        </div>
        <div className="stat reveal">
          <div className="n">{STATS.rolloutMin}-{STATS.rolloutMax}<span className="suf">wk</span></div>
          <div className="l">Claimed rollout window</div>
        </div>
        <div className="stat reveal">
          <div className="n"><CountUp value={STATS.noteFormats} /></div>
          <div className="l">Core note formats</div>
        </div>
      </section>

      <section className="case-section">
        <aside className="cs-side reveal">
          <div className="num">01</div>
          <div className="lbl">The Problem</div>
        </aside>
        <div className="cs-body">
          <h2 className="cs-h reveal">
            Dense product, regulated market, fragmented buyer journey.
          </h2>
          <p className="cs-p reveal">
            Navix is not a one-feature product. It spans EMR, CRM, AI scribing,
            automation, integrations, facility workflows, and a growing compare
            and resource library. In behavioral health, that density is normal.
            On most SaaS sites, it becomes unreadable fast.
          </p>
          <p className="cs-p reveal">
            Challenge was not only to make site look polished. It had to help
            client explain who product is for, why category matters now, and how
            operators, clinicians, and buyers should navigate a large system
            without getting lost or bounced back to sales too early.
          </p>
        </div>
      </section>

      <section className="case-section alt">
        <aside className="cs-side reveal">
          <div className="num">02</div>
          <div className="lbl">Approach</div>
        </aside>
        <div className="cs-body">
          <h2 className="cs-h reveal">
            Turned product sprawl into one <em>readable narrative</em>.
          </h2>
          <p className="cs-p reveal">
            Structure starts with category claim, moves fast into proof, then
            branches into buyer-specific paths. Instead of hiding complexity, site
            organizes it. Goal was clarity under density.
          </p>

          <ol className="layers">
            <li className="reveal">
              <div className="lh"><span className="num">P1</span> Clear category framing</div>
              <p>
                Hero makes core claim immediately: AI-native EMR for behavioral
                health. No vague “all-in-one platform” language before user knows
                what product actually is.
              </p>
            </li>
            <li className="reveal">
              <div className="lh"><span className="num">P2</span> Proof before brochure</div>
              <p>
                Metrics, dashboards, named agents, workflow surfaces, and
                implementation windows show up early. Product feels real before
                long-form detail starts.
              </p>
            </li>
            <li className="reveal">
              <div className="lh"><span className="num">P3</span> Expandable information architecture</div>
              <p>
                Facilities, professionals, guides, comparisons, calculators, and
                documentation all sit inside one coherent nav. Foundation supports
                growth without redesigning whole site every quarter.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="case-section">
        <aside className="cs-side reveal">
          <div className="num">03</div>
          <div className="lbl">Decisions &amp; Trade-offs</div>
        </aside>
        <div className="cs-body">
          <h2 className="cs-h reveal">
            Choices that made complexity legible.
          </h2>

          <div className="tradeoffs">
            <div className="to reveal">
              <div className="to-row">
                <span className="chose">Operator language</span>
                <span className="over">over Generic startup copy</span>
              </div>
              <p>
                Terms like detox, residential, PHP / IOP, utilization review,
                42 CFR Part 2, and admissions CRM signal domain fluency. Right
                buyers read that and know site was built for their world.
              </p>
            </div>

            <div className="to reveal">
              <div className="to-row">
                <span className="chose">Structured density</span>
                <span className="over">over Minimal empty marketing</span>
              </div>
              <p>
                Product has real breadth. Website needed enough surface area to
                match it. Answer was not less information, but better hierarchy:
                sections, labels, visual rhythm, and repetition with purpose.
              </p>
            </div>

            <div className="to reveal">
              <div className="to-row">
                <span className="chose">Productized visuals</span>
                <span className="over">over Abstract SaaS decoration</span>
              </div>
              <p>
                Dashboards, scribes, queues, census panels, and agent states do
                more than decorate. They explain system behavior and help headline
                claims feel earned.
              </p>
            </div>

            <div className="to reveal">
              <div className="to-row">
                <span className="chose">System-first nav</span>
                <span className="over">over Single landing page thinking</span>
              </div>
              <p>
                Site was built as foundation for guides, compare pages, help
                content, and future platform surfaces. Better long-term move than
                shipping one pretty homepage with nowhere to grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="case-section alt">
        <aside className="cs-side reveal">
          <div className="num">04</div>
          <div className="lbl">Outcome</div>
        </aside>
        <div className="cs-body">
          <h2 className="cs-h reveal">
            Live site with clear positioning and room to scale.
          </h2>
          <p className="cs-p reveal">
            Final result is live at <em>navixhealth.com</em> with a full-funnel
            structure: category framing up top, buyer proof in middle, and deeper
            content paths for solution pages, buyer guides, comparisons, and
            resources. Site now works as more than brochure. It acts like sales
            infrastructure.
          </p>

          <blockquote className="pullquote reveal">
            “Cut documentation 80%. Replace 5 systems with one.”{" "}
            <cite>— Homepage value proposition</cite>
          </blockquote>

          <p className="cs-p reveal">
            Best part of project was balancing sharp visual presentation with
            information weight. Not soft, vague, “AI-powered” landing page.
            Real product story. Real buyer paths. Real room for client team to
            keep shipping into site without rewriting core system.
          </p>
        </div>
      </section>

      <section className="case-section">
        <aside className="cs-side reveal">
          <div className="num">05</div>
          <div className="lbl">What’s Next</div>
        </aside>
        <div className="cs-body">
          <ul className="next-list">
            <li className="reveal"><span>—</span> More comparison pages for lower-funnel search intent</li>
            <li className="reveal"><span>—</span> Deeper case studies tied to real facility workflows</li>
            <li className="reveal"><span>—</span> Interactive ROI and switching-cost tools</li>
            <li className="reveal"><span>—</span> Expanded developer platform and implementation docs</li>
          </ul>
        </div>
      </section>

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
