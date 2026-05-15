"use client"

import Link from "next/link"
import { I } from "@/components/shell"

export default function ProviderInvitePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(135deg, #0A1225 0%, #14213D 100%)",
        padding: 24,
      }}
    >
      <div
        style={{
          width: 520,
          maxWidth: "100%",
          background: "#FFF",
          borderRadius: 18,
          padding: "32px 36px",
          boxShadow: "0 24px 60px rgba(0,0,0,.35)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "linear-gradient(135deg, #2DD4A4, #0EA071)",
              display: "grid",
              placeItems: "center",
              color: "#03261A",
              fontWeight: 800,
              fontSize: 16,
              letterSpacing: "-0.02em",
            }}
          >
            M
          </div>
          <span style={{ fontWeight: 600, letterSpacing: "0.04em" }}>MARGINA</span>
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            marginBottom: 6,
          }}
        >
          You're almost there.
        </div>
        <div className="muted" style={{ fontSize: 13.5, marginBottom: 24 }}>
          <strong style={{ color: "var(--ink)" }}>Consorcio Nacional</strong> has invited you to
          participate in a financing campaign. Pick how you'd like to continue.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link
            href="/provider/invoices"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "16px 18px",
              border: "1px solid var(--ink)",
              background: "var(--ink)",
              color: "#FFF",
              borderRadius: 12,
              cursor: "pointer",
              textAlign: "left",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(45,212,164,.18)",
                display: "grid",
                placeItems: "center",
                color: "var(--mint)",
              }}
            >
              <I.prov />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Create an account</div>
              <div style={{ fontSize: 12, color: "#B8C0D4", marginTop: 2 }}>
                Manage all your invoices and future campaigns securely.
              </div>
            </div>
            <I.chev />
          </Link>
          <Link
            href="/provider/invoices"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "16px 18px",
              border: "1px solid var(--line)",
              background: "var(--surface)",
              color: "var(--ink)",
              borderRadius: 12,
              cursor: "pointer",
              textAlign: "left",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "var(--surface-2)",
                display: "grid",
                placeItems: "center",
                color: "var(--ink)",
              }}
            >
              <I.log />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Use one-time access</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                Proceed with a secure single-use link — no registration required.
              </div>
            </div>
            <I.chev />
          </Link>
        </div>

        <div className="muted small" style={{ marginTop: 20, textAlign: "center" }}>
          By continuing you agree to Margina's{" "}
          <a href="#" style={{ color: "var(--ink-3)" }}>
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" style={{ color: "var(--ink-3)" }}>
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  )
}
