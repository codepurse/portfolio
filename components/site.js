import { useEffect, useRef, useState } from "react";

export const NAME = "Sunny Sharma";
export const LOCATION = "Mumbai · IND";

/* ────────────────────────────────────────────────────────────
   Hooks
   ──────────────────────────────────────────────────────────── */

export function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const t = d.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      });
      setTime(`${t} IST`);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ────────────────────────────────────────────────────────────
   CountUp — animated number, fires when in view
   ──────────────────────────────────────────────────────────── */

export function CountUp({
  value,
  decimals = 0,
  pad = 0,
  duration = 1500,
  className,
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    // Honour reduced-motion: jump straight to final value
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
              setDisplay(value * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setDisplay(value);
            };
            requestAnimationFrame(tick);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [value, duration]);

  let str;
  if (decimals > 0) {
    str = display.toFixed(decimals);
  } else if (pad > 0) {
    str = String(Math.floor(display)).padStart(pad, "0");
  } else if (value >= 1000) {
    str = Math.floor(display).toLocaleString();
  } else {
    str = String(Math.floor(display));
  }

  return <span ref={ref} className={className}>{str}</span>;
}

/* ────────────────────────────────────────────────────────────
   MagneticLink — element subtly pulls toward the cursor
   ──────────────────────────────────────────────────────────── */

export function MagneticLink({
  children,
  className = "",
  href,
  radius = 160,
  strength = 0.32,
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf;

    const move = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        const factor = (1 - dist / radius) * strength;
        target.x = dx * factor;
        target.y = dy * factor;
      } else {
        target.x = 0;
        target.y = 0;
      }
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      el.style.transform = `translate(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      el.style.transform = "";
    };
  }, [radius, strength]);

  return (
    <a ref={ref} className={`magnetic ${className}`} href={href} {...props}>
      {children}
    </a>
  );
}

/* ────────────────────────────────────────────────────────────
   Components
   ──────────────────────────────────────────────────────────── */

export function Grain() {
  return <div className="grain" />;
}

export function CursorDot() {
  const dotRef = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current;
    let x = window.innerWidth / 2,
      y = window.innerHeight / 2;
    let tx = x,
      ty = y;
    let raf;

    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const enter = () => dot?.classList.add("is-link");
    const leave = () => dot?.classList.remove("is-link");

    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      if (dot)
        dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move);
    const els = document.querySelectorAll("a, button, .row, .link-u");
    els.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      els.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);
  return <div ref={dotRef} className="cursor-dot" />;
}

export function SiteNav() {
  const time = useClock();
  const [open, setOpen] = useState(false);

  // Lock body scroll while menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className={`nav ${open ? "is-open" : ""}`}>
        <a className="brand link-u" href="/" onClick={close}>
          {NAME}
        </a>
        <div className="links">
          <a className="link-u" href="/#about">About</a>
          <a className="link-u" href="/#process">Process</a>
          <a className="link-u" href="/#work">Work</a>
          <a className="link-u" href="/#contact">Contact</a>
        </div>
        <div className="status">
          <span style={{ color: "var(--accent)" }}>●</span>&nbsp; Available · {time || "—"}
        </div>
        <button
          className={`nav-toggle ${open ? "is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="nt-label">{open ? "Close" : "Menu"}</span>
          <span className="nt-icon" aria-hidden>
            <span /><span />
          </span>
        </button>
      </nav>

      <div
        className={`mobile-menu ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      >
        <div className="mm-eyebrow">— Index</div>

        <ol className="mobile-links">
          <li><a href="/#about"   onClick={close}><span className="num">01</span><span>About</span></a></li>
          <li><a href="/#process" onClick={close}><span className="num">02</span><span>Process</span></a></li>
          <li><a href="/#work"    onClick={close}><span className="num">03</span><span>Work</span></a></li>
          <li><a href="/#now"     onClick={close}><span className="num">04</span><span>Now</span></a></li>
          <li><a href="/#contact" onClick={close}><span className="num">05</span><span>Contact</span></a></li>
        </ol>

        <div className="mm-foot">
          <div>{NAME}</div>
          <div>
            <span style={{ color: "var(--accent)" }}>●</span>&nbsp; Available · {time || "—"}
          </div>
        </div>
      </div>
    </>
  );
}

export function SiteFooter() {
  const time = useClock();
  return (
    <footer className="foot">
      <div>© {new Date().getFullYear()} — {NAME}</div>
      <div className="center">Designed &amp; built in-house</div>
      <div className="right">v04 · {time || "—"}</div>
    </footer>
  );
}
