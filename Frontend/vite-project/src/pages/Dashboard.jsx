import "../Styles/dashboard.css";

const sessions = [
  { time: "09:41", desc: "Signed in", loc: "Sohna, IN \u00b7 Chrome" },
  { time: "Yesterday", desc: "Password changed", loc: "Sohna, IN \u00b7 Chrome" },
  { time: "Jun 27", desc: "Signed in", loc: "Gurugram, IN \u00b7 Firefox" },
  { time: "Jun 24", desc: "Profile updated", loc: "Sohna, IN \u00b7 Chrome" },
  { time: "Jun 18", desc: "Signed in", loc: "Sohna, IN \u00b7 Mobile app" },
];

export default function Dashboard() {
  const user = {
    name: "Harpreet",
    email: "harpreet012@email.com",
    initials: "H",
    plan: "Free",
    joined: "Mar 2025",
    phone: "Not added",
  };

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
          <div className="dash-avatar">{user.initials}</div>
        </div>
      </nav>

      <div className="dash-body">
        <header className="dash-header">
          <h1 className="dash-greeting">
            Welcome back, <span>{user.name}</span>
          </h1>
          <span className="dash-last-login">last sign-in 09:41 today</span>
        </header>

        <div className="dash-grid">
          {/* Left column */}
          <div>
            <div className="dash-card">
              <div className="dash-profile-row">
                <div className="dash-profile-avatar">{user.initials}</div>
                <div>
                  <p className="dash-profile-name">{user.name}</p>
                  <p className="dash-profile-email">{user.email}</p>
                </div>
                <button className="dash-edit-btn">Edit profile</button>
              </div>

              <div className="dash-field-grid">
                <div>
                  <p className="dash-field-label">Plan</p>
                  <p className="dash-field-value">{user.plan}</p>
                </div>
                <div>
                  <p className="dash-field-label">Member since</p>
                  <p className="dash-field-value">{user.joined}</p>
                </div>
                <div>
                  <p className="dash-field-label">Phone</p>
                  <p className="dash-field-value">{user.phone}</p>
                </div>
                <div>
                  <p className="dash-field-label">Email</p>
                  <p className="dash-field-value">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="dash-card dash-ledger">
              <p className="dash-card-title">Account ledger</p>
              {sessions.map((s, i) => (
                <div className="dash-ledger-entry" key={i}>
                  <span className="dash-ledger-tick">{"\u2014"}</span>
                  <span className="dash-ledger-time">{s.time}</span>
                  <span className="dash-ledger-desc">{s.desc}</span>
                  <span className="dash-ledger-loc">{s.loc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="dash-stack">
            <div className="dash-card">
              <p className="dash-card-title">Overview</p>
              <div className="dash-stat-row">
                <span className="dash-stat-label">Logins this month</span>
                <span className="dash-stat-value">14</span>
              </div>
              <div className="dash-stat-row">
                <span className="dash-stat-label">Devices linked</span>
                <span className="dash-stat-value">3</span>
              </div>
              <div className="dash-stat-row">
                <span className="dash-stat-label">Storage used</span>
                <span className="dash-stat-value">1.2 GB</span>
              </div>
            </div>

            <div className="dash-card">
              <p className="dash-card-title">Security</p>
              <div className="dash-security-item">
                <span className="dash-security-label">Two-factor auth</span>
                <span className="dash-pill dash-pill-off">off</span>
              </div>
              <div className="dash-security-item">
                <span className="dash-security-label">Verified email</span>
                <span className="dash-pill dash-pill-on">on</span>
              </div>
              <div className="dash-security-item">
                <span className="dash-security-label">Recovery phone</span>
                <span className="dash-pill dash-pill-off">off</span>
              </div>
            </div>

            <div className="dash-card">
              <p className="dash-card-title">Quick actions</p>
              <div className="dash-quick-actions">
                <button className="dash-quick-btn">Change password</button>
                <button className="dash-quick-btn">Enable two-factor auth</button>
                <button className="dash-quick-btn">Download my data</button>
                <button className="dash-quick-btn">Log out of all devices</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}