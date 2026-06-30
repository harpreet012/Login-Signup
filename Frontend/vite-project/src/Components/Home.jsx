// ============================================
//  pages/Home.jsx — Premium Landing Page
// ============================================

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../Components/Button";
import "../Styles/home.css";

/* ─── Icon Components ─── */
const ShieldIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const LockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const ZapIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const KeyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="M21 2l-9.6 9.6M15.5 7.5l3 3" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="14"
    height="14"
  >
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

/* ─── Hero Illustration ─── */
const HeroIllustration = () => (
  <div className="hero-illustration" aria-hidden="true">
    <div className="hero-card hero-card--main">
      <div className="hero-card__header">
        <div className="hero-card__dot hero-card__dot--red" />
        <div className="hero-card__dot hero-card__dot--yellow" />
        <div className="hero-card__dot hero-card__dot--green" />
        <span className="hero-card__title">Secure Auth</span>
      </div>
      <div className="hero-card__body">
        <div className="hero-card__field">
          <span className="hero-card__field-label">Email</span>
          <div className="hero-card__field-value">user@example.com</div>
        </div>
        <div className="hero-card__field">
          <span className="hero-card__field-label">Password</span>
          <div className="hero-card__field-value hero-card__field-value--dots">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="hero-card__btn">
          <div className="hero-card__btn-bar" />
          <span>Sign In</span>
        </div>
      </div>
    </div>

    <div className="hero-badge hero-badge--jwt">
      <div className="hero-badge__icon">
        <ShieldIcon />
      </div>
      <div>
        <div className="hero-badge__title">JWT Issued</div>
        <div className="hero-badge__sub">Token active · 1h</div>
      </div>
    </div>

    <div className="hero-badge hero-badge--secure">
      <div className="hero-badge__icon hero-badge__icon--green">
        <LockIcon />
      </div>
      <div>
        <div className="hero-badge__title">Encrypted</div>
        <div className="hero-badge__sub">bcrypt · 12 rounds</div>
      </div>
    </div>

    <div className="hero-ring hero-ring--1" />
    <div className="hero-ring hero-ring--2" />
    <div className="hero-orb hero-orb--1" />
    <div className="hero-orb hero-orb--2" />
  </div>
);

/* ─── Feature Card ─── */
const FeatureCard = ({ icon, title, desc, color }) => (
  <article className={`feature-card feature-card--${color}`}>
    <div className="feature-card__icon">{icon}</div>
    <h3 className="feature-card__title">{title}</h3>
    <p className="feature-card__desc">{desc}</p>
    <div className="feature-card__glow" aria-hidden="true" />
  </article>
);

/* ─── Workflow Step ─── */
const WorkflowStep = ({ num, label, sub, isLast }) => (
  <div className="workflow-step">
    <div className="workflow-step__track">
      <div className="workflow-step__num">{num}</div>
      {!isLast && (
        <div className="workflow-step__line">
          <div className="workflow-step__line-fill" />
        </div>
      )}
    </div>
    <div className="workflow-step__content">
      <div className="workflow-step__label">{label}</div>
      <div className="workflow-step__sub">{sub}</div>
    </div>
  </div>
);

/* ─── Tech Pill ─── */
const TechPill = ({ name, color }) => (
  <div className={`tech-pill tech-pill--${color}`}>{name}</div>
);

/* ─── Home Page ─── */
const Home = () => {
  const heroRef = useRef(null);

  // Simple scroll-reveal using IntersectionObserver
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal--visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="home" ref={heroRef}>
      {/* ── Ambient background ── */}
      <div className="home__bg" aria-hidden="true">
        <div className="home__bg-orb home__bg-orb--1" />
        <div className="home__bg-orb home__bg-orb--2" />
        <div className="home__bg-orb home__bg-orb--3" />
        <div className="home__bg-grid" />
      </div>

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero__content">
          <div className="neon-badge">
            <span className="badge-dot" />
            Production-Ready Auth System
          </div>

          <h1 id="hero-heading" className="hero__heading">
            Secure Authentication
            <span className="gradient-text"> for Modern</span>
            <br />
            Applications
          </h1>

          <p className="hero__sub">
            A full-stack MERN authentication system featuring JWT tokens, bcrypt
            encryption, protected routes, and a premium dashboard — built for
            developers who refuse to compromise on quality.
          </p>

          <div className="hero__ctas">
            <Link to="/signup">
              <Button variant="primary" size="lg" icon={<ArrowRightIcon />}>
                Get Started
              </Button>
            </Link>
            <Link to="/#features">
              <Button variant="secondary" size="lg">
                Explore Features
              </Button>
            </Link>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-val">256-bit</span>
              <span className="hero__stat-label">Encryption</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-val">JWT</span>
              <span className="hero__stat-label">Stateless Auth</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-val">MERN</span>
              <span className="hero__stat-label">Full Stack</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <HeroIllustration />
        </div>
      </section>

      {/* ════════════════════════════════════
          FEATURES
      ════════════════════════════════════ */}
      <section
        className="features section"
        id="features"
        aria-labelledby="features-heading"
      >
        <div className="section-container">
          <div className="section-header reveal">
            <div className="neon-badge">
              <span className="badge-dot" />
              Features
            </div>
            <h2 id="features-heading" className="section-title">
              Everything you need,
              <br />
              <span className="gradient-text">nothing you don't</span>
            </h2>
            <p className="section-sub">
              Built with industry best practices from day one.
            </p>
          </div>

          <div className="features__grid">
            <div className="reveal">
              <FeatureCard
                icon={<ShieldIcon />}
                color="violet"
                title="JWT Authentication"
                desc="Stateless, signed tokens verify identity on every request without server-side session storage."
              />
            </div>
            <div className="reveal">
              <FeatureCard
                icon={<LockIcon />}
                color="cyan"
                title="Password Encryption"
                desc="Passwords are hashed with bcrypt using 12 salt rounds — virtually impossible to reverse."
              />
            </div>
            <div className="reveal">
              <FeatureCard
                icon={<KeyIcon />}
                color="pink"
                title="Protected Routes"
                desc="Bearer token middleware guards sensitive endpoints and auto-redirects unauthenticated users."
              />
            </div>
            <div className="reveal">
              <FeatureCard
                icon={<ZapIcon />}
                color="emerald"
                title="Fast Performance"
                desc="Vite-powered React front-end with optimized Axios calls delivers sub-100ms UI responses."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          WORKFLOW
      ════════════════════════════════════ */}
      <section
        className="workflow section"
        id="workflow"
        aria-labelledby="workflow-heading"
      >
        <div className="section-container">
          <div className="section-header reveal">
            <div className="neon-badge">
              <span className="badge-dot" />
              Workflow
            </div>
            <h2 id="workflow-heading" className="section-title">
              Simple, secure
              <br />
              <span className="gradient-text">end-to-end flow</span>
            </h2>
          </div>

          <div className="workflow__steps reveal">
            <WorkflowStep
              num="01"
              label="Register"
              sub="Create account with email & password"
            />
            <WorkflowStep
              num="02"
              label="Login"
              sub="Submit credentials via secure POST"
            />
            <WorkflowStep
              num="03"
              label="JWT Issued"
              sub="Server returns a signed bearer token"
            />
            <WorkflowStep
              num="04"
              label="Dashboard"
              sub="Token unlocks protected API endpoints"
            />
            <WorkflowStep
              num="05"
              label="Logout"
              isLast
              sub="Token cleared, session ended"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          TECH STACK
      ════════════════════════════════════ */}
      <section
        className="stack section"
        id="stack"
        aria-labelledby="stack-heading"
      >
        <div className="section-container">
          <div className="section-header reveal">
            <div className="neon-badge">
              <span className="badge-dot" />
              Tech Stack
            </div>
            <h2 id="stack-heading" className="section-title">
              Developer-first
              <br />
              <span className="gradient-text">technologies</span>
            </h2>
          </div>

          <div className="stack__grid reveal">
            <TechPill name="React" color="cyan" />
            <TechPill name="Express" color="violet" />
            <TechPill name="JWT" color="pink" />
            <TechPill name="Axios" color="emerald" />
            <TechPill name="Node.js" color="cyan" />
            <TechPill name="MongoDB" color="violet" />
            <TechPill name="bcrypt" color="pink" />
            <TechPill name="Vite" color="emerald" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════ */}
      <section className="cta-banner section reveal">
        <div className="section-container">
          <div className="cta-banner__card">
            <div
              className="cta-banner__orb cta-banner__orb--1"
              aria-hidden="true"
            />
            <div
              className="cta-banner__orb cta-banner__orb--2"
              aria-hidden="true"
            />
            <div className="neon-badge">
              <span className="badge-dot" />
              Ready to ship?
            </div>
            <h2 className="cta-banner__title">
              Build something
              <br />
              <span className="gradient-text">worth protecting</span>
            </h2>
            <p className="cta-banner__sub">
              Sign up in seconds and start exploring your secure dashboard.
            </p>
            <div className="cta-banner__actions">
              <Link to="/signup">
                <Button variant="primary" size="lg" icon={<ArrowRightIcon />}>
                  Create Account
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FOOTER
      ════════════════════════════════════ */}
      <footer className="footer">
        <div className="section-container">
          <div className="footer__inner">
            <div className="footer__brand">
              <span className="footer__logo">
                Auth<span className="gradient-text">Kit</span>
              </span>
              <p className="footer__tagline">
                Secure authentication for modern applications.
              </p>
            </div>

            <nav className="footer__links" aria-label="Footer navigation">
              <Link to="/#features" className="footer__link">
                Features
              </Link>
              <Link to="/#workflow" className="footer__link">
                Workflow
              </Link>
              <Link to="/login" className="footer__link">
                Sign In
              </Link>
              <Link to="/signup" className="footer__link">
                Sign Up
              </Link>
            </nav>
          </div>

          <div className="footer__bottom">
            <p className="footer__copy">
              © {new Date().getFullYear()} AuthKit — Built with React, Express &
              JWT
            </p>
            <div className="footer__badges">
              <span className="footer__badge">MERN Stack</span>
              <span className="footer__badge">Open Source</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;
