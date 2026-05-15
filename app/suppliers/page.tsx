"use client"

import Link from "next/link"
import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Sidebar, Topbar, ActionBar, I } from "@/components/shell"

function AddedBanner() {
  const params = useSearchParams()
  if (params?.get("added") !== "1") return null
  return (
    <div className="banner-mint" style={{ marginBottom: 14 }}>
      <I.check />
      <strong>5 providers added.</strong>
      <span>
        Invitation emails were sent to each contact. You'll be notified when they accept.
      </span>
    </div>
  )
}

const PROVIDERS: [string, string, string, string, string, string, string, string, string][] = [
  ["Grupo Electromecánico SRL", "1-01-23456-7", "CLI-001", "Suministros industriales", "Juan Pérez", "jperez@grupoem.com", "809-555-1234", "Electrical", "Medium"],
  ["Distribuidora Cibao S.A.", "1-02-34567-8", "CLI-002", "Distribución de víveres", "Carlos Fernández", "cfernandez@distribcibao.com", "829-111-8899", "Food Supply", "Large"],
  ["Print & Office RD SRL", "1-03-45678-9", "CLI-003", "Papelería y suministros", "Andrea Martínez", "amartinez@poroffice.com", "849-222-4455", "Office Supplies", "Small"],
  ["Servicios Caribeños EIRL", "1-04-56789-0", "CLI-004", "Limpieza industrial", "Luis Peña", "lpena@sercaribe.com", "809-333-1122", "General Services", "Small"],
  ["Refrigeración Tropical", "1-05-67890-1", "CLI-005", "Equipos de refrigeración", "María Sánchez", "msanchez@refritrop.do", "829-444-9911", "HVAC", "Medium"],
  ["Constructora La Pinta", "1-06-78901-2", "CLI-006", "Materiales de construcción", "Pedro Almonte", "palmonte@lapinta.com.do", "809-555-3322", "Construction", "Large"],
  ["Tech Solutions Caribe", "1-07-89012-3", "CLI-007", "Software & hardware", "Ana Reyes", "areyes@techcaribe.com", "849-777-2200", "Tech", "Medium"],
]

const TABS: [string, number][] = [
  ["All", 142],
  ["Active", 128],
  ["Pending invite", 8],
  ["Registered", 120],
  ["Archived", 6],
]

export default function SuppliersPage() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Topbar crumb={["Workspace", "Providers"]} />
        <div className="content">
          <Suspense fallback={null}>
            <AddedBanner />
          </Suspense>

          <ActionBar
            title="Providers"
            count={`${PROVIDERS.length} of 142 total`}
            left={
              <>
                <Link href="/suppliers/add" className="btn primary">
                  <I.plus /> Add provider
                </Link>
                <Link href="/suppliers/import" className="btn">
                  <I.upl /> Bulk upload
                </Link>
                <button className="btn">
                  <I.filt /> Filters
                </button>
              </>
            }
            right={
              <div className="search">
                <I.search />
                <input placeholder="Search by RNC, name, contact…" />
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
                  <th style={{ width: 38 }}>
                    <input type="checkbox" />
                  </th>
                  <th>Company</th>
                  <th>RNC</th>
                  <th>ERP code</th>
                  <th>Product / service</th>
                  <th>Contact</th>
                  <th>Category</th>
                  <th>Size</th>
                  <th>Status</th>
                  <th style={{ width: 36 }}></th>
                </tr>
              </thead>
              <tbody>
                {PROVIDERS.map((r, i) => (
                  <tr key={i}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <div className="strong">{r[0]}</div>
                      <div className="muted small">{r[3]}</div>
                    </td>
                    <td className="mono">{r[1]}</td>
                    <td className="mono">{r[2]}</td>
                    <td className="muted small">{r[3]}</td>
                    <td>
                      <div style={{ fontSize: 13 }}>{r[4]}</div>
                      <div className="mono small" style={{ color: "var(--muted)" }}>
                        {r[5]} · {r[6]}
                      </div>
                    </td>
                    <td>
                      <span className="tag">{r[7]}</span>
                    </td>
                    <td>{r[8]}</td>
                    <td>
                      <span className={"pill " + (i === 4 ? "amber" : "mint")}>
                        <span className="dot" />
                        {i === 4 ? "Pending invite" : "Registered"}
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
        </div>
      </div>
    </div>
  )
}
