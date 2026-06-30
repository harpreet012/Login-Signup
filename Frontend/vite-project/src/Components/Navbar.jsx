// ============================================
//  Components/Navbar.jsx — Premium Navigation
// ============================================

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import "../Styles/navbar.css";

const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <defs>
      <linearGradient
        id="logo-grad"
        x1="0"
        y1="0"
        x2="28"
        y2="28"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    <rect width="28" height="28" rx="8" fill="url(#logo-grad)" opacity="0.15" />
    <path
      d="M14 5L5 10.5V17.5L14 23L23 17.5V10.5L14 5Z"
      stroke="url(#logo-grad)"
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
    />
    <path
      d="M14 5V23M5 10.5L23 10.5"
      stroke="url(#logo-grad)"
      strokeWidth="1.5"
      opacity="0.5"
    />
  </svg>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);
  const isDashboard = location.pathname === "/dashboard";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  if (isDashboard) return null;

  return (
    <header
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
      role="banner"
    >
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="AuthKit home">
          <LogoIcon />
          <span className="navbar__logo-text">
            Auth<span className="navbar__logo-accent">Kit</span>
          </span>
        </Link>

        {/* Center nav links */}
        {!isAuthPage && (
          <nav className="navbar__links" aria-label="Main navigation">
            <Link to="/#features" className="navbar__link">
              Features
            </Link>
            <Link to="/#workflow" className="navbar__link">
              Workflow
            </Link>
            <Link to="/#stack" className="navbar__link">
              Stack
            </Link>
          </nav>
        )}

        {/* CTA Buttons */}
        <div className="navbar__actions">
          {!isAuthPage ? (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <Link to="/">
              <Button variant="ghost" size="sm">
                ← Home
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className={`navbar__burger ${menuOpen ? "navbar__burger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        {!isAuthPage && (
          <nav className="navbar__mobile-links">
            <Link to="/#features" className="navbar__mobile-link">
              Features
            </Link>
            <Link to="/#workflow" className="navbar__mobile-link">
              Workflow
            </Link>
            <Link to="/#stack" className="navbar__mobile-link">
              Stack
            </Link>
          </nav>
        )}
        <div className="navbar__mobile-actions">
          <Link to="/login" className="navbar__mobile-link">
            Sign In
          </Link>
          <Link to="/signup">
            <Button variant="primary" size="sm" fullWidth>
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
