"use client"

import Link from "next/link"
import { useState, useRef } from "react"
import { useParams } from "next/navigation"
import { Sidebar, Topbar, I } from "@/components/shell"

export default function ProviderDiscountPage() {
  const params = useParams()
  const invoiceId = (params?.id as string) || "INV-10234"

  const amount = 5000
  const daysEarly = 45
  const [discountPct, setDiscountPct] = useState(2.5)

  const discountAmt = +((amount * discountPct) / 100).toFixed(2)
  const net = amount - discountAmt
  const apr = +(discountPct / (daysEarly / 365)).toFixed(2)
  const sliderPos = Math.max(0, Math.min(100, ((discountPct - 0.5) / 7.5) * 100))

  const sliderRef = useRef<HTMLDivElement>(null)
  const dragSlider = (clientX: number) => {
    if (!sliderRef.current) return
    const r = sliderRef.current.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (clientX - r.left) / r.width))
    setDiscountPct(+(0.5 + pct * 7.5).toFixed(2))
  }

  const user = { name: "Juan Pérez", email: "jperez@grupoem.com", initials: "JP" }

  const meta: [string, string, string][] = [
    ["NCF", "B0100000123", "mono"],
    ["Issue date", "2025-04-01", "mono"],
    ["Due date", "2025-06-15", "mono"],
    ["Invoice amount", "USD 5,000.00", "mono strong"],
    ["Days to due", "45 days", ""],
    ["Client", "Consorcio Nacional", ""],
  ]

  return (
    <div className="app">
      <Sidebar portal="provider" />
      <div className="main">
        <Topbar crumb={["Supplier portal", "Invoices", invoiceId]} user={user} />
        <div className="content">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 16,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11.5,
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 4,
                }}
              >
                Submit discount
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
                <h2 className="mono" style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>
                  {invoiceId}
                </h2>
                <span className="pill mint">
                  <span className="dot" />
                  Available
                </span>
                <span className="muted small">Q2-2025 Campaign · Consorcio Nacional</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Link href="/provider/invoices" className="btn ghost">
                <I.back /> Back to invoices
              </Link>
              <button className="btn">Decline this invoice</button>
            </div>
          </div>

          {/* Meta strip */}
          <div
            className="card"
            style={{
              padding: "14px 22px",
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: 24,
              marginBottom: 14,
            }}
          >
            {meta.map((k) => (
              <div key={k[0]}>
                <div
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--muted)",
                  }}
                >
                  {k[0]}
                </div>
                <div
                  className={k[2]}
                  style={{
                    fontSize: 13.5,
                    fontWeight: k[2].includes("strong") ? 600 : 500,
                    marginTop: 4,
                  }}
                >
                  {k[1]}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
            {/* Bid input */}
            <div className="card card-pad">
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
                Your discount offer
              </div>
              <div className="muted small" style={{ marginBottom: 18 }}>
                Enter either a percentage or a total discount — the two fields stay in sync.
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto 1fr",
                  gap: 14,
                  alignItems: "flex-end",
                }}
              >
                <div className="field">
                  <label>Discount percentage</label>
                  <div className="input-prefix">
                    <input
                      className="input mono"
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        paddingLeft: 14,
                        paddingRight: 34,
                      }}
                      value={discountPct.toFixed(2)}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value)
                        if (!isNaN(v)) setDiscountPct(v)
                      }}
                    />
                    <span style={{ left: "auto", right: 14, fontSize: 16, color: "var(--muted)" }}>
                      %
                    </span>
                  </div>
                </div>
                <div style={{ padding: "14px 0", color: "var(--muted)", fontSize: 18 }}>=</div>
                <div className="field">
                  <label>Discount amount</label>
                  <div className="input-prefix">
                    <span style={{ fontSize: 14, color: "var(--muted)" }}>USD</span>
                    <input
                      className="input mono"
                      style={{ fontSize: 20, fontWeight: 600, paddingLeft: 42 }}
                      value={discountAmt.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      onChange={(e) => {
                        const v = parseFloat((e.target.value || "").replace(/,/g, ""))
                        if (!isNaN(v)) setDiscountPct(+((v / amount) * 100).toFixed(2))
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Slider */}
              <div style={{ marginTop: 18 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11.5,
                    color: "var(--muted)",
                    marginBottom: 6,
                  }}
                >
                  <span className="mono">0.50%</span>
                  <span className="mono">8.00%</span>
                </div>
                <div
                  ref={sliderRef}
                  onMouseDown={(e) => {
                    dragSlider(e.clientX)
                    const move = (ev: MouseEvent) => dragSlider(ev.clientX)
                    const up = () => {
                      window.removeEventListener("mousemove", move)
                      window.removeEventListener("mouseup", up)
                    }
                    window.addEventListener("mousemove", move)
                    window.addEventListener("mouseup", up)
                  }}
                  style={{
                    position: "relative",
                    height: 8,
                    background: "var(--surface-2)",
                    borderRadius: 99,
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: 8,
                      width: sliderPos + "%",
                      background: "linear-gradient(90deg, var(--mint), var(--mint-deep))",
                      borderRadius: 99,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "calc(" + sliderPos + "% - 9px)",
                      top: -5,
                      width: 18,
                      height: 18,
                      background: "#FFF",
                      border: "2px solid var(--mint-deep)",
                      borderRadius: "50%",
                      boxShadow: "0 1px 3px rgba(0,0,0,.12)",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    color: "var(--muted)",
                    marginTop: 8,
                  }}
                >
                  <span>Less discount, longer wait</span>
                  <span>Aggressive bid, more likely accepted</span>
                </div>
              </div>

              {/* Realtime summary */}
              <div
                style={{
                  marginTop: 22,
                  padding: "14px 16px",
                  background: "var(--surface-2)",
                  border: "1px solid var(--line-2)",
                  borderRadius: 10,
                }}
              >
                <div
                  style={{
                    fontSize: 11.5,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 10,
                  }}
                >
                  Real-time summary
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
                  <Stat
                    label="Invoice amount"
                    value={"USD " + amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  />
                  <Stat
                    label="You give up"
                    value={
                      "USD " + discountAmt.toLocaleString(undefined, { minimumFractionDigits: 2 })
                    }
                  />
                  <Stat
                    label="You receive"
                    value={"USD " + net.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    positive
                  />
                </div>
                <div style={{ height: 1, background: "var(--line)", margin: "14px 0" }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
                  <Stat label="Days early" value={daysEarly + " days"} />
                  <Stat label="Implied APR" value={apr.toFixed(2) + "%"} tone="ink" />
                  <Stat
                    label="Bid percentile"
                    value={apr > 18 ? "Top 25%" : apr > 12 ? "Mid range" : "Low — may not clear"}
                    tone={apr > 18 ? "mint" : apr > 12 ? "amber" : "rose"}
                  />
                </div>
              </div>

              {/* Terms */}
              <div style={{ marginTop: 18 }}>
                <label
                  style={{
                    display: "flex",
                    gap: 10,
                    fontSize: 13,
                    color: "var(--ink-2)",
                    cursor: "pointer",
                  }}
                >
                  <input type="checkbox" defaultChecked style={{ marginTop: 3 }} />
                  <span>
                    I have read and accept the{" "}
                    <a href="#" style={{ color: "var(--ink)", fontWeight: 500 }}>
                      discount terms
                    </a>
                    . This offer is binding once submitted and may be selected without further
                    notice. I commit to issuing a credit note for the discount amount upon
                    acceptance.
                  </span>
                </label>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 18,
                }}
              >
                <span className="muted small">Bid submission closes 2025-06-08 23:59 ADT</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn ghost">Save draft</button>
                  <button className="btn mint">Submit bid</button>
                </div>
              </div>
            </div>

            {/* Side: payment + APR comparison */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="card card-pad">
                <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 14 }}>
                  Payment destination
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: 12,
                    background: "var(--surface-2)",
                    borderRadius: 10,
                    border: "1px solid var(--line-2)",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "var(--ink)",
                      color: "#FFF",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <I.bank />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>Banco Popular Dominicano</div>
                    <div className="mono small" style={{ color: "var(--muted)" }}>
                      Cuenta corriente ····3456
                    </div>
                  </div>
                  <a
                    href="#"
                    style={{
                      fontSize: 11.5,
                      color: "var(--ink-3)",
                      textDecoration: "none",
                    }}
                  >
                    Change →
                  </a>
                </div>
                <div className="muted small" style={{ marginTop: 10 }}>
                  Funds settle on disbursement date · expect 1–2 business days clearing.
                </div>
              </div>

              <div className="card card-pad">
                <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 4 }}>
                  How your APR compares
                </div>
                <div className="muted small" style={{ marginBottom: 14 }}>
                  The lower-cost your offer, the more likely it's selected.
                </div>
                <APRBars apr={apr} />
              </div>

              <div
                className="banner-mint"
                style={{
                  padding: "12px 14px",
                  fontSize: 12,
                  alignItems: "flex-start",
                }}
              >
                <I.help />
                <div>
                  Bids are <strong>blinded</strong> — the buyer cannot see your bid until selection.
                  They see only the aggregate distribution.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  positive,
  tone,
}: {
  label: string
  value: string
  positive?: boolean
  tone?: "mint" | "amber" | "rose" | "ink"
}) {
  const colors: Record<string, string> = {
    mint: "var(--mint-deep)",
    amber: "var(--amber)",
    rose: "var(--rose)",
    ink: "var(--ink)",
  }
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "var(--muted)",
        }}
      >
        {label}
      </div>
      <div
        className="mono"
        style={{
          fontSize: 16,
          fontWeight: 600,
          marginTop: 3,
          color: positive ? "var(--mint-deep)" : tone ? colors[tone] : "var(--ink)",
        }}
      >
        {value}
      </div>
    </div>
  )
}

function APRBars({ apr }: { apr: number }) {
  const rows: [string, number, "rose" | "amber" | "mint" | "slate"][] = [
    ["Factoring (typical)", 28.0, "rose"],
    ["Trade credit line", 22.5, "rose"],
    ["Bank loan (90d)", 16.4, "amber"],
    ["Your bid", apr, "mint"],
    ["Market median", 14.2, "slate"],
  ]
  const max = 30
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {rows.map((r, i) => (
        <div key={i}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 11.5,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                color: r[2] === "mint" ? "var(--mint-deep)" : "var(--ink-3)",
                fontWeight: r[2] === "mint" ? 600 : 400,
              }}
            >
              {r[0]}
            </span>
            <span
              className="mono"
              style={{ color: "var(--ink)", fontWeight: r[2] === "mint" ? 600 : 400 }}
            >
              {r[1].toFixed(2)}%
            </span>
          </div>
          <div
            style={{
              height: 6,
              background: "var(--surface-2)",
              borderRadius: 99,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: (Math.min(r[1], max) / max) * 100 + "%",
                background:
                  r[2] === "mint"
                    ? "linear-gradient(90deg, var(--mint), var(--mint-deep))"
                    : r[2] === "rose"
                      ? "#FB7185"
                      : r[2] === "amber"
                        ? "#F59E0B"
                        : "#94A3B8",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
