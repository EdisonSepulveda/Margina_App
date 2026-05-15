"use client"

import Link from "next/link"
import { I } from "@/components/shell"

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "var(--bg)",
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 720, width: "100%", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg, #2DD4A4, #0EA071)",
              display: "grid",
              placeItems: "center",
              color: "#03261A",
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: "-0.02em",
            }}
          >
            M
          </div>
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "var(--ink)",
            }}
          >
            MARGINA
          </span>
        </div>

        <h1
          style={{
            fontSize: 40,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            margin: "0 0 12px",
          }}
        >
          Dynamic discounting, built for Latin America.
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "var(--ink-3)",
            margin: "0 auto 32px",
            maxWidth: 560,
            lineHeight: 1.55,
          }}
        >
          Companies with excess cash and large supplier networks post liquidity. Suppliers bid
          discounts for prompt payment. Everyone wins on price and timing.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
            maxWidth: 560,
            margin: "0 auto",
          }}
        >
          <Link
            href="/dashboard"
            className="btn primary"
            style={{ padding: "14px 18px", fontSize: 14 }}
          >
            <I.dash /> Company portal
          </Link>
          <Link
            href="/provider/login"
            className="btn"
            style={{ padding: "14px 18px", fontSize: 14 }}
          >
            <I.prov /> Supplier portal
          </Link>
        </div>

        <div className="muted small" style={{ marginTop: 32 }}>
          High-fidelity wireframes · 4 deliverables · reverse factoring + dynamic discounting
        </div>
      </div>
    </div>
  )
}
