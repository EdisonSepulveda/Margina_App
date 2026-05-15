"use client"

import { Sidebar, Topbar, IDoc, IChev } from "@/components/shell"

export const dynamic = "force-dynamic"

export default function DashboardPage() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Topbar
          crumb={["Workspace", "Dashboard"]}
          actions={
            <select
              className="btn sm"
              style={{ padding: "6px 10px", fontSize: 12, color: "var(--ink-2)" }}
              defaultValue="q2"
            >
              <option value="q2">Q2 2025</option>
              <option value="q1">Q1 2025</option>
              <option value="ytd">Year to date</option>
            </select>
          }
        />
        <div className="content">
          {/* Header: campaign context */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 18,
              gap: 24,
            }}
          >
            <div>
              <div className="page-title">
                <h2>Q2-2025 Discounting Campaign</h2>
                <span className="pill mint">
                  <span className="dot" />
                  Active
                </span>
              </div>
              <div className="page-sub mono" style={{ fontSize: 12.5 }}>
                Period Jun 16 – Jun 30, 2025 · Funds available{" "}
                <strong style={{ color: "var(--ink)" }}>USD 500,000.00</strong> · Target APR 8.00%
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn">
                <IDoc /> Export report
              </button>
              <button className="btn primary">
                <IChev /> Open campaign
              </button>
            </div>
          </div>

          {/* KPIs */}
          <div className="kpi-grid" style={{ marginBottom: 18 }}>
            <div className="kpi">
              <div className="k-lbl">Amount subscribed</div>
              <div className="k-val">$412,800</div>
              <div className="k-sub">82.6% of $500,000 available · 73 invoices</div>
              <div
                style={{
                  marginTop: 10,
                  height: 6,
                  background: "var(--surface-2)",
                  borderRadius: 99,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "82.6%",
                    height: "100%",
                    background: "linear-gradient(90deg, var(--mint), var(--mint-deep))",
                  }}
                />
              </div>
            </div>
            <div className="kpi">
              <div className="k-lbl">Weighted discount</div>
              <div className="k-val">6.78%</div>
              <div className="k-sub">
                vs 6.50% target <span className="k-delta up">▲ 0.28pp</span>
              </div>
            </div>
            <div className="kpi">
              <div className="k-lbl">Estimated APR</div>
              <div className="k-val">9.21%</div>
              <div className="k-sub">
                vs 8.00% target <span className="k-delta up">▲ 1.21pp</span>
              </div>
            </div>
            <div className="kpi">
              <div className="k-lbl">Estimated return (USD)</div>
              <div className="k-val">$28,012</div>
              <div className="k-sub">Settles on disbursement Jun 16</div>
            </div>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14, marginBottom: 14 }}
          >
            {/* Yield chart */}
            <div className="card card-pad">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 12,
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Yield vs market benchmarks</div>
                  <div className="muted small">APR comparison · annualized · USD</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn sm ghost">7D</button>
                  <button className="btn sm" style={{ background: "var(--surface-2)" }}>
                    30D
                  </button>
                  <button className="btn sm ghost">90D</button>
                </div>
              </div>
              <YieldChart />
              <div style={{ display: "flex", gap: 18, marginTop: 14, flexWrap: "wrap" }}>
                <Legend color="var(--mint-deep)" label="Margina · 9.21%" strong />
                <Legend color="var(--ink-3)" label="DR Govt 90-day · 8.05%" />
                <Legend color="#9CA3AF" label="Bank CD 30-day · 6.40%" />
                <Legend color="#CBD5E1" label="Money market · 5.10%" />
              </div>
            </div>

            {/* Allocation */}
            <div className="card card-pad">
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
                Allocation by supplier type
              </div>
              <div className="muted small" style={{ marginBottom: 12 }}>
                Of $412,800 subscribed
              </div>
              <Allocation />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14 }}>
            {/* Campaigns table */}
            <div className="card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 18px",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 600 }}>Recent campaigns</div>
                <a
                  href="/campaigns"
                  style={{ fontSize: 12.5, color: "var(--ink-3)", textDecoration: "none" }}
                >
                  View all →
                </a>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Campaign</th>
                    <th>Disbursement</th>
                    <th className="right">Available</th>
                    <th className="right">Subscribed</th>
                    <th className="right">Est. return</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      ["Q2-2025 Campaign", "2025-06-15", "USD 500,000", "USD 412,800", "$28,012", "Active", "mint"],
                      ["Year-End 2024", "2024-12-01", "DOP 300,000", "DOP 300,000", "DOP 36,000", "Settled", "slate"],
                      ["Summer Bonds", "2025-08-01", "USD 750,000", "USD 102,400", "$6,144", "Bidding", "blue"],
                      ["April Topup", "2025-04-22", "DOP 180,000", "DOP 162,300", "DOP 11,361", "Settled", "slate"],
                    ] as const
                  ).map((r, i) => (
                    <tr key={i}>
                      <td className="strong">{r[0]}</td>
                      <td className="mono">{r[1]}</td>
                      <td className="right mono">{r[2]}</td>
                      <td className="right mono">{r[3]}</td>
                      <td
                        className="right mono"
                        style={{ color: "var(--mint-deep)", fontWeight: 500 }}
                      >
                        {r[4]}
                      </td>
                      <td>
                        <span className={"pill " + r[6]}>
                          <span className="dot" />
                          {r[5]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Activity */}
            <div className="card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 18px",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 600 }}>Activity</div>
                <a
                  href="#"
                  style={{ fontSize: 12.5, color: "var(--ink-3)", textDecoration: "none" }}
                >
                  All events →
                </a>
              </div>
              <div style={{ padding: "6px 4px 8px" }}>
                {(
                  [
                    ["Bid submitted", "12 invoices · USD 38,400 · 6.50%", "Grupo Electromecánico SRL", "2m ago", "mint"],
                    ["Provider invited", "Bulk · 14 suppliers", "Procurement team", "18m ago", "slate"],
                    ["Campaign created", "Summer Bonds · USD 750,000", "Treasury · J. Doe", "2h ago", "blue"],
                    ["Bid submitted", "4 invoices · DOP 25,300 · 7.10%", "Distribuidora Cibao S.A.", "3h ago", "mint"],
                    ["Settlement complete", "Year-End 2024 · DOP 300,000", "System · payment file generated", "Yesterday", "slate"],
                  ] as const
                ).map((e, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 12,
                      padding: "12px 18px",
                      borderBottom: i < 4 ? "1px solid var(--line-2)" : 0,
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 99,
                        background:
                          e[4] === "mint"
                            ? "var(--mint)"
                            : e[4] === "blue"
                              ? "var(--blue)"
                              : "var(--muted-2)",
                        marginTop: 7,
                        flex: "0 0 auto",
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>
                        {e[0]}{" "}
                        <span style={{ color: "var(--muted)", fontWeight: 400 }}>· {e[1]}</span>
                      </div>
                      <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 2 }}>
                        {e[2]}
                      </div>
                    </div>
                    <div
                      className="mono"
                      style={{ fontSize: 11, color: "var(--muted-2)", flex: "0 0 auto" }}
                    >
                      {e[3]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Legend({ color, label, strong }: { color: string; label: string; strong?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
      <span
        className="mono"
        style={{
          fontSize: 11.5,
          color: strong ? "var(--ink)" : "var(--ink-3)",
          fontWeight: strong ? 600 : 400,
        }}
      >
        {label}
      </span>
    </div>
  )
}

function YieldChart() {
  const W = 720
  const H = 200
  const P = { l: 36, r: 12, t: 8, b: 22 }
  const x = (i: number, n: number) => P.l + ((W - P.l - P.r) * i) / (n - 1)
  const y = (v: number) => P.t + (H - P.t - P.b) * (1 - (v - 4) / (10.5 - 4))
  const margina = [7.2, 7.6, 7.4, 7.9, 8.3, 8.0, 8.6, 9.0, 8.8, 9.21]
  const govt = [7.5, 7.7, 7.9, 8.0, 8.1, 8.0, 8.05, 8.0, 8.05, 8.05]
  const bank = [6.0, 6.1, 6.2, 6.3, 6.35, 6.3, 6.35, 6.4, 6.4, 6.4]
  const mm = [4.8, 4.9, 4.9, 5.0, 5.05, 5.0, 5.05, 5.1, 5.1, 5.1]
  const path = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? "M" : "L"}${x(i, arr.length)},${y(v)}`).join(" ")
  const area = (arr: number[]) =>
    path(arr) + ` L${x(arr.length - 1, arr.length)},${y(4)} L${x(0, arr.length)},${y(4)} Z`
  const labels = ["Apr 1", "", "Apr 15", "", "May 1", "", "May 15", "", "Jun 1", "Jun 16"]
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="gMint" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2DD4A4" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#2DD4A4" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[4, 6, 8, 10].map((v) => (
        <g key={v}>
          <line x1={P.l} x2={W - P.r} y1={y(v)} y2={y(v)} stroke="var(--line-2)" />
          <text
            x={P.l - 8}
            y={y(v) + 3}
            textAnchor="end"
            fontSize="10"
            fill="var(--muted-2)"
            fontFamily="Geist Mono, monospace"
          >
            {v}%
          </text>
        </g>
      ))}
      {labels.map((t, i) => (
        <text
          key={i}
          x={x(i, 10)}
          y={H - 6}
          textAnchor="middle"
          fontSize="10"
          fill="var(--muted-2)"
          fontFamily="Geist Mono, monospace"
        >
          {t}
        </text>
      ))}
      <path d={area(margina)} fill="url(#gMint)" />
      <path d={path(mm)} fill="none" stroke="#CBD5E1" strokeWidth="1.5" />
      <path d={path(bank)} fill="none" stroke="#9CA3AF" strokeWidth="1.5" />
      <path
        d={path(govt)}
        fill="none"
        stroke="var(--ink-3)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <path d={path(margina)} fill="none" stroke="var(--mint-deep)" strokeWidth="2.2" />
      <g>
        <circle
          cx={x(9, 10)}
          cy={y(margina[9])}
          r="4"
          fill="var(--mint-deep)"
          stroke="#FFF"
          strokeWidth="2"
        />
        <rect x={x(9, 10) - 60} y={y(margina[9]) - 30} width="58" height="20" rx="4" fill="var(--ink)" />
        <text
          x={x(9, 10) - 31}
          y={y(margina[9]) - 16}
          textAnchor="middle"
          fontSize="11"
          fill="#FFF"
          fontFamily="Geist Mono, monospace"
        >
          9.21%
        </text>
      </g>
    </svg>
  )
}

function Allocation() {
  const data: [string, number, string, string][] = [
    ["Manufacturing", 38, "var(--mint-deep)", "$156,864"],
    ["Logistics", 22, "var(--mint)", "$90,816"],
    ["Construction", 18, "#5BB48E", "$74,304"],
    ["Food & Retail", 14, "#9BCDB2", "$57,792"],
    ["Other", 8, "#CDE4D6", "$33,024"],
  ]
  return (
    <div>
      <div
        style={{
          display: "flex",
          height: 14,
          borderRadius: 8,
          overflow: "hidden",
          marginBottom: 14,
        }}
      >
        {data.map((d, i) => (
          <div key={i} style={{ width: d[1] + "%", background: d[2] }} />
        ))}
      </div>
      {data.map((d, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 0",
            borderBottom: i < data.length - 1 ? "1px solid var(--line-2)" : 0,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 2, background: d[2] }} />
          <div style={{ flex: 1, fontSize: 13 }}>{d[0]}</div>
          <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>
            {d[1]}%
          </div>
          <div
            className="mono"
            style={{ fontSize: 12, fontWeight: 500, minWidth: 72, textAlign: "right" }}
          >
            {d[3]}
          </div>
        </div>
      ))}
    </div>
  )
}
