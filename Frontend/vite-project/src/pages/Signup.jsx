import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Fill in all fields.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!agreed) {
      setError("Accept the terms to continue.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8888/pages/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!data.token) {
        setError(data.msg || "Couldn't create your account. Try again.");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Couldn't reach the server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const strength = Math.min(
    4,
    [form.password.length >= 8, /[A-Z]/.test(form.password), /[0-9]/.test(form.password), /[^A-Za-z0-9]/.test(form.password)].filter(
      Boolean
    ).length
  );

  return (
    <div className="auth">
      <div className="auth-glow auth-glow-teal"></div>
      <div className="auth-glow auth-glow-pink"></div>

      <div className="auth-card">
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Start your free account in a minute</p>

        <div className="auth-social-row">
          <button type="button" className="auth-social-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A10.99 10.99 0 0 0 12 23z" />
              <path d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.12-1.44.34-2.1V7.05H2.18A10.99 10.99 0 0 0 1 12c0 1.77.42 3.45 1.18 4.95l3.66-2.85z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.85C6.71 7.3 9.14 5.38 12 5.38z" />
            </svg>
            Google
          </button>
          <button type="button" className="auth-social-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.36 1c.1 1.1-.32 2.18-.96 2.97-.66.8-1.78 1.42-2.87 1.33-.13-1.07.38-2.18 1-2.88.7-.79 1.93-1.38 2.83-1.42zM20.7 17.27c-.55 1.27-.81 1.83-1.52 2.95-.99 1.56-2.38 3.5-4.11 3.52-1.53.02-1.92-1-4-1-2.07 0-2.5.97-4.02 1-1.66.03-2.93-1.69-3.92-3.24C.91 17.13-.4 12.6 1.4 9.55c.9-1.53 2.5-2.5 4.23-2.52 1.5-.03 2.92 1.02 3.83 1.02.91 0 2.64-1.26 4.45-1.07.76.03 2.88.3 4.25 2.3-.11.07-2.54 1.49-2.51 4.43.03 3.52 3.08 4.69 3.13 4.71-.03.08-.5 1.7-1.08 2.85z" />
            </svg>
            Apple
          </button>
        </div>

        <div className="auth-divider">or sign up with email</div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="name">
              Full name
            </label>
            <div className="auth-input-wrap">
              <input
                id="name"
                name="name"
                type="text"
                className="auth-input"
                placeholder="Jane Cooper"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="email">
              Email
            </label>
            <div className="auth-input-wrap">
              <input
                id="email"
                name="email"
                type="email"
                className="auth-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="password">
              Password
            </label>
            <div className="auth-input-wrap">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="auth-input has-toggle"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="auth-toggle-visibility"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {form.password.length > 0 && (
              <div className="auth-strength">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className={`auth-strength-bar ${i < strength ? "filled" : ""}`}></span>
                ))}
              </div>
            )}
          </div>

          <label className="auth-terms">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            <span>
              I agree to the <span className="auth-link">Terms of service</span> and{" "}
              <span className="auth-link">Privacy policy</span>
            </span>
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="auth-footer" style={{ marginTop: "22px" }}>
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}