"use client"

import Link from "next/link"
import { useState } from "react"
import { Sidebar, Topbar, I } from "@/components/shell"

type Row = [string, string, string, string, string, string, string, string, string, string]
const ROWS: Row[] = [
  ["INV-10234", "B0100000123", "2025-04-01", "2025-06-15", "Consorcio Nacional", "USD", "5,000.00", "Available", "mint", "Q2-2025 Campaign"],
  ["INV-10235", "B0100000124", "2025-04-04", "2025-06-15", "Consorcio Nacional", "USD", "8,400.00", "Available", "mint", "Q2-2025 Campaign"],
  ["INV-10198", "B0100000118", "2025-03-15", "2025-05-20", "Consorcio Nacional", "USD", "3,200.00", "Submitted", "blue", "Q2-2025 Campaign"],
  ["INV-10211", "B0100000120", "2025-03-22", "2025-05-25", "Consorcio Nacional", "USD", "6,750.00", "Accepted", "mint", "Q2-2025 Campaign"],
  ["INV-10130", "B0100000098", "2025-02-12", "2025-04-15", "Consorcio Nacional", "DOP", "125,000.00", "Funded", "slate", "April Topup"],
  ["INV-10142", "B0100000102", "2025-02-18", "2025-04-22", "Consorcio Nacional", "DOP", "42,400.00", "Funded", "slate", "April Topup"],
  ["INV-10089", "B0100000080", "2025-01-30", "2025-03-30", "Consorcio Nacional", "USD", "2,100.00", "Rejected", "rose", "Q1-2025 Campaign"],
  ["INV-10056", "B0100000071", "2025-01-12", "2025-03-12", "Consorcio Nacional", "USD", "1,840.00", "Cancelled by supplier", "slate", "Q1-2025 Campaign"],
]

const TABS: [string, number, string?][] = [
  ["All", 8],
  ["Available", 2, "mint-pill"],
  ["Submitted", 1],
  ["Accepted", 1],
  ["Funded", 2],
  ["Rejected", 1],
  ["Cancelled", 1],
]

export default function ProviderInvoicesPage() {
  const [activeTab, setActiveTab] = useState(0)
  const user = { name: "Juan Pérez", email: "jperez@grupoem.com", initials: "JP" }

  return (
    <div className="app">
      <Sidebar portal="provider" />
      <div className="main">
        <Topbar crumb={["Supplier portal", "Invoices"]} user={user} />
        <div className="content">
          {/* Active campaign banner */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              background: "linear-gradient(135deg, #0A1225 0%, #14213D 100%)",
              color: "#FFF",
              padding: "18px 22px",
              borderRadius: 14,
              marginBottom: 18,
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: "rgba(45,212,164,.18)",
                display: "grid",
                placeItems: "center",
                color: "var(--mint)",
              }}
            >
              <I.camp size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 11.5,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#B8C0D4",
                }}
              >
                Open for bidding
              </div>
              <div style={{ fontSize: 17, fontWeight: 600, marginTop: 2 }}>
                Q2-2025 Campaign · Consorcio Nacional
              </div>
              <div style={{ fontSize: 12.5, color: "#B8C0D4", marginTop: 2 }}>
                Submit discounts by <span className="mono">2025-06-08 23:59</span> · Disbursement{" "}
                <span className="mono">2025-06-15</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11.5, color: "#B8C0D4" }}>You have</div>
              <div
                className="mono"
                style={{ fontSize: 22, fontWeight: 600, color: "var(--mint)" }}
              >
                2 invoices
              </div>
              <div style={{ fontSize: 11.5, color: "#B8C0D4" }}>available · USD 13,400</div>
            </div>
            <Link href="/provider/invoices/INV-10234" className="btn mint">
              Review & bid →
            </Link>
          </div>

          <div className="page-title">
            <h2>My invoices</h2>
            <span className="count">{ROWS.length} invoices · 2 awaiting your bid</span>
          </div>
          <div className="page-sub">
            All invoices Consorcio Nacional has uploaded for you. Submit a discount on Available
            invoices to qualify for early payment.
          </div>

          <div className="action-bar">
            <div className="left">
              <span style={{ fontSize: 12, color: "var(--muted)", marginRight: 6 }}>Filters:</span>
              {["Client", "Status", "NCF", "Issue date", "Due date", "Amount"].map((f) => (
                <button key={f} className="btn sm">
                  {f} <I.dn />
                </button>
              ))}
            </div>
            <div className="right">
              <div className="search">
                <I.search />
                <input placeholder="Search invoice # or NCF" />
              </div>
            </div>
          </div>

          <div className="tabs">
            {TABS.map(([label, n, hint], i) => (
              <button
                key={label}
                onClick={() => setActiveTab(i)}
                className={"btn sm " + (i === activeTab ? "active" : "")}
                style={
                  hint === "mint-pill" && i !== activeTab
                    ? {
                        background: "var(--mint-soft)",
                        color: "var(--mint-ink)",
                        borderColor: "#BFEFD9",
                      }
                    : {}
                }
              >
                {label}
                <span style={{ opacity: 0.7, marginLeft: 4 }}>{n}</span>
              </button>
            ))}
          </div>

          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  <th>ERP invoice #</th>
                  <th>NCF</th>
                  <th>Issue date</th>
                  <th>Due date</th>
                  <th>Client</th>
                  <th>Campaign</th>
                  <th>Currency</th>
                  <th className="right">Amount</th>
                  <th>Status</th>
                  <th style={{ width: 120 }}></th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={i}>
                    <td className="mono strong">{r[0]}</td>
                    <td className="mono">{r[1]}</td>
                    <td className="mono">{r[2]}</td>
                    <td className="mono">{r[3]}</td>
                    <td>{r[4]}</td>
                    <td className="muted small">{r[9]}</td>
                    <td>{r[5]}</td>
                    <td className="right mono strong">{r[6]}</td>
                    <td>
                      <span className={"pill " + r[8]}>
                        <span className="dot" />
                        {r[7]}
                      </span>
                    </td>
                    <td>
                      {r[7] === "Available" ? (
                        <Link href={`/provider/invoices/${r[0]}`} className="btn sm primary">
                          Submit discount
                        </Link>
                      ) : (
                        <button className="btn sm ghost">View</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
