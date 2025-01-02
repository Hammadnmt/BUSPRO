import React from "react";

export default function UserNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
      <div className="px-3 container">
        <div className="d-flex">
          <div className="me-4">SVG</div>
          <div className="navbar-brand" aria-label="bookie">
            Bookie
          </div>
        </div>
        <div className="d-flex align-items-center ml-auto navbar-nav gap-3">
          <div className="d-md-block d-none nav-item">Login</div>
          <div className="nav-item">Register</div>
        </div>
      </div>
    </nav>
  );
}
