import { Bus } from "lucide-react";
import React from "react";

export default function FallbackScreen() {
  return (
    <div
      style={{ backgroundColor: "#364F6B" }}
      className="min-vh-100 d-flex justify-content-center align-items-center"
    >
      <div
        style={{ height: "50px", width: "100%" }}
        className="d-flex justify-content-center align-items-center text-white"
      >
        <Bus size={55} className="me-3" />
        <h1>BusPro</h1>
      </div>
    </div>
  );
}
