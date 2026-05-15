"use client"

import Link from "next/link"
import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Sidebar, Topbar, ActionBar, I } from "@/components/shell"

function CreatedBanner() {
  const params = useSearchParams()
  if (params?.get("created") !== "1") return null
  return (
    <div className="banner-mint" style={{ marginBottom: 14 }}>
      <I.check />
      <strong>Campaign created.</strong>
      <span>
        Q2-2025 Campaign is now active. 142 invoices were uploaded and supplier invites sent.
      </span>
      <Link href="#" style={{ marginLeft: "auto" }}>
        View campaign →
      </Link>
    </div>
  )
}

type Row = [string, string, string, string, string, string, string, string, string]
const ROWS: Row[] = [
  ["Q2-2025 Campaign", "USD 500,000", "2025-06-15", "Construction, Tech", "Medium & Large", "8.5%", "USD 42,500", "Active", "mint"],
  ["Summer Bonds", "USD 750,000", "2025-08-01", "Logistics", "Large", "7.0%", "USD 52,500", "Bidding", "blue"],
  ["Year-End 2024", "DOP 300,000", "2024-12-01", "Agribusiness", "Small", "12.0%", "DOP 36,000", "Settled", "slate"],
  ["April Topup", "DOP 180,000", "2025-04-22", "Retail, Food", "Small & Medium", "9.4%", "DOP 16,920", "Settled", "slate"],
  ["Q1-2025 Campaign", "USD 240,000", "2025-03-10", "Manufacturing", "Medium", "8.8%", "USD 21,120", "Settled", "slate"],
  ["Holiday Cash", "USD 120,000", "2024-11-22", "Hospitality", "Small", "9.6%", "USD 11,520", "Cancelled", "rose"],
]
const TABS: [string, number][] = [
  ["All", 6],
  ["Active", 1],
  ["Bidding", 1],
  ["Settled", 3],
  ["Cancelled", 1],
]

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Topbar crumb={["Workspace", "Campaigns"]} />
        <div className="content">
          <Suspense fallback={null}>
            <CreatedBanner />
          </Suspense>

          <ActionBar
            title="Campaigns"
            count={`${ROWS.length} total`}
            left={
              <>
                <Link href="/campaigns/new" className="btn primary">
                  <I.plus /> New campaign
                </Link>
                <button className="btn">
                  <I.filt /> Filters
                </button>
              </>
            }
            right={
              <div className="search">
                <I.search />
                <input placeholder="Search by name, supplier, NCF…" />
              </div>
            }
          />

          <div className="tabs">
            {TABS.map(([label, n], i) => (
              <button
                key={label}
                onClick={() => setActiveTab(i)}
                className={"btn sm " + (i === activeTab ? "active" : "")}
              >
                {label}
                <span style={{ opacity: 0.6, marginLeft: 4 }}>{n}</span>
              </button>
            ))}
          </div>

          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  <th>Campaign name</th>
                  <th>Available amount</th>
                  <th>Disbursement</th>
                  <th>Supplier type</th>
                  <th>Supplier size</th>
                  <th className="right">Exp. return %</th>
                  <th className="right">Est. return</th>
                  <th>Status</th>
                  <th style={{ width: 36 }}></th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={i}>
                    <td className="strong">{r[0]}</td>
                    <td className="mono">{r[1]}</td>
                    <td className="mono">{r[2]}</td>
                    <td>{r[3]}</td>
                    <td>{r[4]}</td>
                    <td
                      className="right mono"
                      style={{ color: "var(--mint-deep)", fontWeight: 500 }}
                    >
                      {r[5]}
                    </td>
                    <td className="right mono">{r[6]}</td>
                    <td>
                      <span className={"pill " + r[8]}>
                        <span className="dot" />
                        {r[7]}
                      </span>
                    </td>
                    <td>
                      <button className="btn ghost icon">
                        <I.dot3 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 12,
              color: "var(--muted)",
              fontSize: 12.5,
            }}
          >
            <span>
              Showing 1–{ROWS.length} of {ROWS.length}
            </span>
            <div style={{ display: "flex", gap: 4 }}>
              <button className="btn sm ghost" disabled>
                ‹
              </button>
              <button className="btn sm" style={{ background: "var(--surface-2)" }}>
                1
              </button>
              <button className="btn sm ghost" disabled>
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
