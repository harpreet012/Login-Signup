// ============================================
//  Components/Button.jsx — Premium Button
// ============================================

import React from "react";
import "../Styles/button.css";

/**
 * variant: 'primary' | 'secondary' | 'ghost' | 'danger'
 * size:    'sm' | 'md' | 'lg'
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  type = "button",
  onClick,
  className = "",
  icon = null,
}) => {
  const classes = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? "btn--full" : "",
    loading ? "btn--loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="btn__inner">
          <span className="btn__spinner" aria-hidden="true" />
          <span className="btn__label">Loading…</span>
        </span>
      ) : (
        <span className="btn__inner">
          {icon && (
            <span className="btn__icon" aria-hidden="true">
              {icon}
            </span>
          )}
          <span className="btn__label">{children}</span>
        </span>
      )}
      <span className="btn__shimmer" aria-hidden="true" />
    </button>
  );
};

export default Button;
