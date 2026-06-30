import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/dashboard.css";

const API_BASE = "http://localhost:8888";

function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState("");

  const [profile, setProfile] = useState({ name: "", phone: "" });
  const [security, setSecurity] = useState({
    twoFactor: false,
    recoveryPhone: false,
  });
  const [sessions, setSessions] = useState([]);

  // Auth guard: verify the stored token against the real backend before showing anything
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const payload = decodeToken(token);
    const userEmail = payload?.user || "";
    setEmail(userEmail);

    fetch(`${API_BASE}/pages/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.text())
      .then((text) => {
        let data = null;
        try {
          data = JSON.parse(text);
        } catch {
          data = null;
        }
        if (!data || !data.msg) {
          // auth.js returned a non-JSON "not authorized" response, or the token is invalid
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        setProfile(loadJSON(`profile:${userEmail}`, { name: "", phone: "" }));
        setSecurity(
          loadJSON(`security:${userEmail}`, {
            twoFactor: false,
            recoveryPhone: false,
          }),
        );
        setSessions(loadJSON("sessions", []));
        setChecking(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleLogoutAllDevices = () => {
    localStorage.removeItem("token");
    showToast("Signed out everywhere. Redirecting...");
    setTimeout(() => {
      window.location.href = "/login";
    }, 800);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem(`profile:${email}`, JSON.stringify(profile));
    setEditing(false);
    showToast("Profile saved on this device.");
  };

  const toggleSecurity = (key) => {
    const next = { ...security, [key]: !security[key] };
    setSecurity(next);
    localStorage.setItem(`security:${email}`, JSON.stringify(next));
  };

  const handleDownloadData = () => {
    const blob = new Blob(
      [JSON.stringify({ email, profile, security, sessions }, null, 2)],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "account-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (checking) {
    return <div className="dash-loading">Checking your session...</div>;
  }

  const initial = (profile.name || email || "?").charAt(0).toUpperCase();
  const lastSession = sessions[0];

  return (
    <div className="dash">
      <nav className="dash-nav">
        <div className="dash-nav-left">
          <span className="dash-logo">Acme</span>
          <ul className="dash-nav-links">
            <li className="active">Dashboard</li>
            <li>Activity</li>
            <li>Settings</li>
          </ul>
        </div>
        <div className="dash-nav-right">
          <input className="dash-search" placeholder="Search..." />
          <div className="dash-bell">
            <span>&#128276;</span>
            <span className="dash-bell-dot"></span>
          </div>
          <div className="dash-avatar-wrap">
            <button
              className="dash-avatar"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {initial}
            </button>
            {menuOpen && (
              <div className="dash-avatar-menu">
                <button onClick={handleLogout}>Log out</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="dash-body">
        {toast && <div className="dash-banner">{toast}</div>}

        <header className="dash-header">
          <div>
            <span className="dash-eyebrow">Your account</span>
            <h1 className="dash-greeting">
              Welcome back, <span>{profile.name || email.split("@")[0]}</span>
            </h1>
          </div>
          <span className="dash-last-login">
            last sign-in{" "}
            {lastSession
              ? `${lastSession.time} ${lastSession.date}`
              : "this session"}
          </span>
        </header>

        <div className="dash-grid">
          <div>
            <div className="dash-card">
              <div className="dash-profile-row">
                <div className="dash-profile-avatar">{initial}</div>
                <div>
                  <p className="dash-profile-name">
                    {profile.name || "Add your name"}
                  </p>
                  <p className="dash-profile-email">{email}</p>
                </div>
                <button
                  className="dash-edit-btn"
                  onClick={() => setEditing(!editing)}
                >
                  {editing ? "Close" : "Edit profile"}
                </button>
              </div>

              {editing ? (
                <form className="dash-field-grid" onSubmit={handleSaveProfile}>
                  <div>
                    <p className="dash-field-label">Name</p>
                    <input
                      className="dash-field-input"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <p className="dash-field-label">Phone</p>
                    <input
                      className="dash-field-input"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      placeholder="Add a phone number"
                    />
                  </div>
                  <div className="dash-save-row">
                    <button type="submit" className="dash-save-btn">
                      Save
                    </button>
                    <button
                      type="button"
                      className="dash-cancel-btn"
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="dash-field-grid">
                  <div>
                    <p className="dash-field-label">Phone</p>
                    <p className="dash-field-value">
                      {profile.phone || "Not added"}
                    </p>
                  </div>
                  <div>
                    <p className="dash-field-label">Email</p>
                    <p className="dash-field-value">{email}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="dash-card dash-ledger">
              <p className="dash-card-title">Account ledger</p>
              {sessions.length === 0 ? (
                <p
                  className="dash-field-value"
                  style={{ color: "var(--text-muted)" }}
                >
                  No recorded sign-ins yet on this device.
                </p>
              ) : (
                sessions.slice(0, 8).map((s, i) => (
                  <div className="dash-ledger-entry" key={i}>
                    <span className="dash-ledger-tick">{"\u2014"}</span>
                    <span className="dash-ledger-time">{s.time}</span>
                    <span className="dash-ledger-desc">{s.desc}</span>
                    <span className="dash-ledger-loc">{s.date}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="dash-stack">
            <div className="dash-card">
              <p className="dash-card-title">Overview</p>
              <div className="dash-stat-row">
                <span className="dash-stat-label">Recorded sign-ins</span>
                <span className="dash-stat-value">{sessions.length}</span>
              </div>
              <div className="dash-stat-row">
                <span className="dash-stat-label">Account</span>
                <span className="dash-stat-value">{email}</span>
              </div>
            </div>

            <div className="dash-card">
              <p className="dash-card-title">Security</p>
              <div className="dash-security-item">
                <span className="dash-security-label">Two-factor auth</span>
                <button
                  className={`dash-pill ${security.twoFactor ? "dash-pill-on" : "dash-pill-off"}`}
                  onClick={() => toggleSecurity("twoFactor")}
                >
                  {security.twoFactor ? "on" : "off"}
                </button>
              </div>
              <div className="dash-security-item">
                <span className="dash-security-label">Recovery phone</span>
                <button
                  className={`dash-pill ${security.recoveryPhone ? "dash-pill-on" : "dash-pill-off"}`}
                  onClick={() => toggleSecurity("recoveryPhone")}
                >
                  {security.recoveryPhone ? "on" : "off"}
                </button>
              </div>
            </div>

            <div className="dash-card">
              <p className="dash-card-title">Quick actions</p>
              <div className="dash-quick-actions">
                <button className="dash-quick-btn" onClick={handleDownloadData}>
                  Download my data
                </button>
                <button
                  className="dash-quick-btn danger"
                  onClick={handleLogoutAllDevices}
                >
                  Log out of all devices
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
