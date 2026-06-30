// ============================================
//  Components/Input.jsx — Floating Label Input
// ============================================

import React, { useState, useId } from "react";
import "../Styles/input.css";

const EyeOpenIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = " ",
  error = "",
  icon = null,
  name,
  autoComplete,
  required = false,
}) => {
  const [showPwd, setShowPwd] = useState(false);
  const uid = useId();
  const isPassword = type === "password";
  const inputType = isPassword ? (showPwd ? "text" : "password") : type;

  return (
    <div
      className={`input-group ${error ? "input-group--error" : ""} ${value ? "input-group--filled" : ""}`}
    >
      <div className="input-wrap">
        {icon && (
          <span className="input-icon input-icon--left" aria-hidden="true">
            {icon}
          </span>
        )}
        <input
          id={uid}
          className={`input-field ${icon ? "input-field--icon" : ""}`}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${uid}-error` : undefined}
        />
        <label
          htmlFor={uid}
          className={`input-label ${icon ? "input-label--icon" : ""}`}
        >
          {label}
          {required && (
            <span className="input-required" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
        {isPassword && (
          <button
            type="button"
            className="input-eye"
            onClick={() => setShowPwd(!showPwd)}
            aria-label={showPwd ? "Hide password" : "Show password"}
            tabIndex={0}
          >
            {showPwd ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </button>
        )}
        <span className="input-focus-ring" aria-hidden="true" />
      </div>
      {error && (
        <p id={`${uid}-error`} className="input-error" role="alert">
          <span className="input-error__icon" aria-hidden="true">
            ⚠
          </span>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
