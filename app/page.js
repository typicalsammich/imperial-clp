"use client";

import { useEffect, useMemo, useState } from "react";

const phones = [
  { label: "Diego", display: "(951) 880-3103", href: "tel:+19518803103" },
  { label: "Isaiah", display: "(951) 425-0490", href: "tel:+19514250490" }
];

const services = [
  ["Lath & Plaster", "Precise wall systems, clean transitions and durable finishes built for long-term performance."],
  ["Stucco & Re-Stucco", "Full exterior transformations, finish changes and refreshed curb appeal with craftsmanship you can see."],
  ["Repairs & Patching", "Thoughtful repair work that blends with the surrounding surface instead of looking like an obvious patch."],
  ["Additions & Remodels", "Exterior plaster and stucco work for additions, remodels, expansions and property upgrades."],
  ["Custom Exterior Finishes", "Architectural textures and finish details designed to elevate the look of the property."],
  ["Outdoor Living Surfaces", "Plaster and stucco finishes for outdoor kitchens, patio structures and custom masonry-adjacent spaces."]
];

function PhoneChooser({ compact = false }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`phone-wrap ${compact ? "compact" : ""}`}>
      <button className="btn btn-gold" onClick={() => setOpen(v => !v)} aria-expanded={open}>
        Contact Now
        <span className="chev">⌄</span>
      </button>
      {open && (
        <div className="phone-menu">
          <div className="phone-menu-head">
            <span>Choose a line</span>
            <button onClick={() => setOpen(false)} aria-label="Close">×</button>
          </div>
          {phones.map(p => (
            <a key={p.display} href={p.href} className="phone-option">
              <span className="phone-label">{p.label}</span>
              <strong>{p.display}</strong>
              
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function TransformationReveal() {
  const [after, setAfter] = useState(false);

  return (
    <article className={`transformation-reveal ${after ? "show-after" : ""}`}>
      <button
        type="button"
        className="transformation-stage"
        onClick={() => setAfter(v => !v)}
        aria-pressed={after}
        aria-label={after ? "Show before photo" : "Show after photo"}
      >
        <img
          src="/projects/featured-after.jpeg"
          alt="Imperial Crown project before transformation"
          className="transformation-photo transformation-before"
        />
        <img
          src="/projects/featured-before.jpeg"
          alt="Imperial Crown project after transformation"
          className="transformation-photo transformation-after"
        />
        <div className="transformation-shade" />
        <div className="transformation-status">
          <span className="status-kicker">{after ? "AFTER" : "BEFORE"}</span>
          <strong>{after ? "Finished transformation" : "Tap to reveal transformation"}</strong>
          <small>{after ? "Tap to view before" : "See the completed exterior"}</small>
        </div>
      </button>
      <div className="transformation-caption">
        <span>FEATURED TRANSFORMATION</span>
        <h3>Exterior finish transformation</h3>
        <p>Tap the project to move between the original condition and the finished Imperial Crown result.</p>
      </div>
    </article>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const move = (e) => {
      document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
    };
    const over = (e) => {
      const interactive = e.target.closest("a,button,input,select,.compare-range");
      document.body.classList.toggle("cursor-hover", !!interactive);
    };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
    };
  }, []);

  async function submitForm(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus("");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Unable to send.");
      setStatus("Thank you — your request was sent. Imperial Crown can follow up with you directly.");
      e.currentTarget.reset();
    } catch (err) {
      setStatus(err.message || "Unable to send right now. Please call us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Imperial Crown home">
          <img src="/brand/imperial-crown-logo.png" alt="Imperial Crown Lath and Plastering" />
        </a>
        <nav>
          <a href="#services">Services</a>
          <a href="#work">Projects</a>
          <a href="#service-areas">Service Areas</a>
          <a href="#about">About</a>
          <a href="#contact">Estimate</a>
        </nav>
        <PhoneChooser compact />
        <button className={`hamburger ${menuOpen ? "open" : ""}`} type="button"
          aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>
          <span></span><span></span><span></span>
        </button>
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#service-areas" onClick={() => setMenuOpen(false)}>Service Areas</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Request Estimate</a>
          <div className="mobile-menu-lines">
            <a href="tel:+19518803103"><small>Diego</small>(951) 880-3103</a>
            <a href="tel:+19514250490"><small>Isaiah</small>(951) 425-0490</a>
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-media">
          <img src="/projects/project-11.png" alt="Finished Imperial Crown exterior project" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-content">
          <div className="eyebrow reveal">20 YEARS OF CRAFTSMANSHIP</div>
          <h1 className="reveal reveal-delay">
            Southern California stucco & plaster.<br />
            <span>Finished like a statement.</span>
          </h1>
          <p className="hero-copy reveal reveal-delay-2">
            Stucco, plaster and lath craftsmanship for Southern California homeowners, builders and property owners — from repairs and re-stucco to complete exterior finishes.
          </p>
          <div className="hero-actions reveal reveal-delay-3">
            <a className="btn btn-gold" href="#contact">Request an Estimate</a>
            <a className="btn btn-ghost" href="#work">View Transformations</a>
          </div>
        </div>
        <div className="hero-statbar">
          <div><strong>20+</strong><span>Years of experience</span></div>
          <div><strong>6</strong><span>Specialized services</span></div>
          <div><strong>100%</strong><span>Focused on the finish</span></div>
        </div>
      </section>

      <section className="trust-strip">
        <span>RESIDENTIAL</span><i />
        <span>COMMERCIAL</span><i />
        <span>REMODELS</span><i />
        <span>EXTERIOR FINISHES</span><i />
        <span>REPAIRS</span>
      </section>

      <section className="section intro" id="about">
        <div className="section-kicker">IMPERIAL CROWN</div>
        <div className="intro-grid">
          <h2>Stucco and plaster craftsmanship built to finish clean.</h2>
          <div className="intro-copy">
            <p>
              Imperial Crown brings two decades of hands-on experience to lath, plaster, stucco and exterior finish work. The goal is simple: strong prep, clean execution and a finished result that elevates the property.
            </p>
            <a href="#contact" className="text-link">Start your project </a>
          </div>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="section-head">
          <div>
            <div className="section-kicker">WHAT WE DO</div>
            <h2>Stucco, plaster and lath services.</h2>
          </div>
          <p>From repairs to full exterior transformations, every project is approached with finish quality in mind.</p>
        </div>

        <div className="service-rail">
          {services.map((s, i) => (
            <article className="service-item" key={s[0]}>
              <span className="service-no">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s[0]}</h3>
              <p>{s[1]}</p>
              <span className="service-mark">✦</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section work" id="work">
        <div className="section-head">
          <div>
            <div className="section-kicker">REAL TRANSFORMATIONS</div>
            <h2>Move the line. See the difference.</h2>
          </div>
          <p>Selected Imperial Crown work shown with the original project photography you provided.</p>
        </div>

        <TransformationReveal />
      </section>

      <section className="feature-project">
        <div className="feature-image">
          <img src="/projects/project-3.png" alt="Finished outdoor living project" />
        </div>
        <div className="feature-copy">
          <div className="section-kicker">DETAIL MATTERS</div>
          <h2>The finish is what people remember.</h2>
          <p>
            Clean edges. Consistent texture. Thoughtful transitions. Imperial Crown focuses on the details that make exterior work feel complete instead of merely finished.
          </p>
          <div className="metal-rule" />
          <div className="mini-grid">
            <span>Exterior plaster</span>
            <span>Stucco finishes</span>
            <span>Custom details</span>
            <span>Repair blending</span>
          </div>
        </div>
      </section>


      <section className="section service-areas" id="service-areas">
        <div className="section-head">
          <div>
            <div className="section-kicker">SOUTHERN CALIFORNIA SERVICE AREA</div>
            <h2>Serving projects across Southern California.</h2>
          </div>
          <p>Explore dedicated local pages for lath, plaster and stucco services throughout the regions Imperial Crown serves.</p>
        </div>
        <div className="area-directory">
          <a href="/service-areas/los-angeles-county"><span>Los Angeles County</span><small>View service area</small></a>
          <a href="/service-areas/san-diego-county"><span>San Diego County</span><small>View service area</small></a>
          <a href="/service-areas/riverside-county"><span>Riverside County</span><small>View service area</small></a>
          <a href="/service-areas/san-bernardino-county"><span>San Bernardino County</span><small>View service area</small></a>
          <a href="/service-areas/orange-county"><span>Orange County</span><small>View service area</small></a>
        </div>
        <p className="area-note">Inland Empire service includes communities throughout Riverside and San Bernardino counties.</p>
      </section>

      <section className="section process">
        <div className="section-kicker">A CLEANER PROCESS</div>
        <h2>Professional from the first call to the final walkthrough.</h2>
        <div className="process-grid">
          {[
            ["01", "Tell us about the project", "Call either line or send the short estimate form with the service you need."],
            ["02", "Review the scope", "Imperial Crown can discuss the work, project conditions and next steps with you directly."],
            ["03", "Craft the finish", "The work is completed with an emphasis on preparation, clean execution and appearance."],
            ["04", "Final walkthrough", "Review the finished work and make sure the details land the way they should."]
          ].map(([n, h, p]) => (
            <article key={n}>
              <span>{n}</span><h3>{h}</h3><p>{p}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-copy">
          <div className="section-kicker">REQUEST AN ESTIMATE</div>
          <h2>Have a project in mind?</h2>
          <p>Send the basics and Imperial Crown can follow up directly. Prefer to call? Choose either line below.</p>
          <div className="direct-lines">
            {phones.map((p) => (
              <a href={p.href} key={p.display}>
                <span>{p.label}</span>
                <strong>{p.display}</strong>
                
              </a>
            ))}
          </div>
          <a className="instagram-link" href="https://www.instagram.com/imperial_clp/" target="_blank" rel="noreferrer">
            <span className="ig-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                <circle cx="12" cy="12" r="4"></circle>
                <circle cx="17.4" cy="6.7" r="1"></circle>
              </svg>
            </span> @imperial_clp 
          </a>
        </div>

        <form className="contact-form" onSubmit={submitForm}>
          <div className="form-title">Project inquiry</div>
          <div className="form-grid">
            <label>
              <span>First name</span>
              <input name="firstName" required placeholder="First name" />
            </label>
            <label>
              <span>Last name</span>
              <input name="lastName" required placeholder="Last name" />
            </label>
          </div>
          <label>
            <span>Phone number</span>
            <input name="phone" required inputMode="tel" placeholder="(951) 555-0123" />
          </label>
          <label>
            <span>Service needed</span>
            <select name="service" required defaultValue="">
              <option value="" disabled>Select a service</option>
              {services.map(s => <option key={s[0]} value={s[0]}>{s[0]}</option>)}
              <option value="Other / Not sure">Other / Not sure</option>
            </select>
          </label>
          <button className="btn btn-gold full" disabled={submitting}>
            {submitting ? "Sending..." : "Send Estimate Request"}
          </button>
          <p className={`form-status ${status ? "show" : ""}`}>{status}</p>
          <small>By submitting, you’re requesting contact regarding your project.</small>
        </form>
      </section>

      <footer>
        <div className="footer-brand">
          <img src="/brand/imperial-crown-logo.png" alt="Imperial Crown" />
          <p>Lath · Plastering · Stucco · Exterior Finishes</p>
        </div>
        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#work">Projects</a>
          <a href="#contact">Estimate</a>
          <a href="https://www.instagram.com/imperial_clp/" target="_blank" rel="noreferrer">Instagram</a>
        </div>
        <div className="footer-lines">
          <a href="tel:+19518803103">(951) 880-3103</a>
          <a href="tel:+19514250490">(951) 425-0490</a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Imperial Crown Lath & Plastering</span>
          <span>Built around the work.</span>
        </div>
      </footer>

      {scrolled && (
        <div className="mobile-cta">
          <PhoneChooser compact />
          <a className="btn btn-gold" href="#contact">Get Estimate</a>
        </div>
      )}
    </main>
  );
}