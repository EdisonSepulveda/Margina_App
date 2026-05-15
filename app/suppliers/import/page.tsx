"use client"

import { useRouter } from "next/navigation"
import { useState, type ReactNode } from "react"
import { Sidebar, Topbar, Stepper, WizardFooter, I } from "@/components/shell"

const STEPS = ["Upload providers file", "Provider field mapping", "Review & confirm"]

const PROVIDERS: [string, string, string, string, string, string, string, string][] = [
  ["Grupo Electromecánico SRL", "1-01-23456-7", "CLI-001", "Suministros industriales", "Juan Pérez", "jperez@grupoem.com", "809-555-1234", "Electrical"],
  ["Distribuidora Cibao S.A.", "1-02-34567-8", "CLI-002", "Distribución de víveres", "Carlos Fernández", "cfernandez@distribcibao.com", "829-111-8899", "Food Supply"],
  ["Print & Office RD SRL", "1-03-45678-9", "CLI-003", "Papelería y suministros", "Andrea Martínez", "amartinez@poroffice.com", "849-222-4455", "Office Supplies"],
  ["Servicios Caribeños EIRL", "1-04-56789-0", "CLI-004", "Limpieza industrial", "Luis Peña", "lpena@sercaribe.com", "809-333-1122", "General Services"],
  ["Refrigeración Tropical", "1-05-67890-1", "CLI-005", "Equipos de refrigeración", "María Sánchez", "msanchez@refritrop.do", "829-444-9911", "HVAC"],
]

export default function BulkImportPage() {
  const [step, setStep] = useState(0)
  const router = useRouter()

  const next = () => {
    if (step >= STEPS.length - 1) {
      router.push("/suppliers?added=1")
      return
    }
    setStep((s) => s + 1)
  }
  const back = () => {
    if (step === 0) router.push("/suppliers")
    else setStep((s) => s - 1)
  }

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Topbar crumb={["Workspace", "Providers", "Bulk upload"]} />
        <div className="content">
          <div className="page-title">
            <h2>Bulk upload providers</h2>
            <span className="count">
              Step {step + 1} of {STEPS.length} · {STEPS[step]}
            </span>
          </div>
          <div className="page-sub">
            Add many suppliers at once from your ERP export. We'll handle invitation emails.
          </div>
          <Stepper steps={STEPS} current={step} />

          {step === 0 && <Step1 />}
          {step === 1 && <Step2 />}
          {step === 2 && <Step3 />}

          <WizardFooter
            onBack={back}
            onNext={next}
            primaryLabel={
              step === STEPS.length - 1 ? "Create 5 providers & send invites" : undefined
            }
            nextLabel={step === 0 ? "Continue to mapping" : undefined}
          />
        </div>
      </div>
    </div>
  )
}

function Step1() {
  return (
    <div className="card card-pad">
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
        Upload your providers file
      </div>
      <div className="muted small" style={{ marginBottom: 18 }}>
        Each row should represent one supplier. We'll pre-match common column names.
      </div>

      <div
        style={{
          border: "1.5px dashed #D6D3CD",
          borderRadius: 14,
          padding: "42px 28px",
          background: "var(--surface-2)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 54,
            height: 54,
            margin: "0 auto 14px",
            borderRadius: 14,
            background: "#FFF",
            border: "1px solid var(--line)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <I.upl size={22} />
        </div>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Drop your providers file here</div>
        <div className="muted small" style={{ margin: "4px 0 16px" }}>
          CSV or Excel · up to 10MB
        </div>
        <button className="btn primary">Choose file</button>
      </div>

      <div style={{ marginTop: 18 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 600 }}>Need a template?</div>
          <a href="#" style={{ fontSize: 12.5, color: "var(--ink-3)", textDecoration: "none" }}>
            View field reference →
          </a>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {[
            ["providers_template.csv", "CSV, 14 columns, UTF-8"],
            ["providers_template.xlsx", "Excel 2007+ with samples"],
          ].map((t) => (
            <div
              key={t[0]}
              style={{
                flex: 1,
                padding: "12px 14px",
                border: "1px solid var(--line)",
                borderRadius: 8,
                background: "var(--surface)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "var(--surface-2)",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--ink-3)",
                }}
              >
                <I.doc />
              </div>
              <div style={{ flex: 1 }}>
                <div className="mono" style={{ fontSize: 12.5, fontWeight: 500 }}>
                  {t[0]}
                </div>
                <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{t[1]}</div>
              </div>
              <button className="btn ghost sm">Download</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Step2() {
  const cols = [
    "company_name",
    "rnc",
    "erp_id",
    "product",
    "contact_name",
    "contact_email",
    "phone",
    "category",
    "size",
    "bank",
    "account",
    "city",
    "country",
  ]
  const mapping: [string, string, string | null, boolean][] = [
    ["Company", "Grupo Electromecánico SRL; Print & Office RD SRL", "company_name", true],
    ["RNC", "1-01-23456-7; 1-03-45678-9", "rnc", false],
    ["ERP code", "CLI-001; CLI-003", "erp_id", true],
    ["Product or service", "Suministros industriales; Papelería", "product", true],
    ["Contact name", "Juan Pérez; Andrea Martínez", "contact_name", true],
    ["Email", "jperez@grupoem.com; amartinez@…", "contact_email", true],
    ["Phone", "809-555-1234; 849-222-4455", "phone", false],
    ["Category", "Electrical; Office Supplies", "category", true],
    ["Size", "Medium; Small", null, false],
    ["Bank account", "123-456-7890; 987-654-3210", null, true],
    ["City", "Santo Domingo; Santiago", null, true],
    ["Country", "DO; DO", null, true],
  ]
  return (
    <div className="card">
      <div
        style={{
          padding: "16px 22px",
          borderBottom: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Map columns to Margina fields</div>
          <div className="muted small">
            8 of 12 fields auto-matched from{" "}
            <span className="mono">providers_q2.csv</span>
          </div>
        </div>
        <span className="pill mint">
          <span className="dot" />8 / 12 mapped
        </span>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "24%" }}>Provider field</th>
            <th style={{ width: "40%" }}>CSV example data</th>
            <th>CSV column</th>
          </tr>
        </thead>
        <tbody>
          {mapping.map((m, i) => (
            <tr key={i}>
              <td className="strong">
                {m[0]}
                {m[3] && <span style={{ color: "var(--rose)", marginLeft: 4 }}>*</span>}
              </td>
              <td className="mono" style={{ color: "var(--ink-3)", fontSize: 12 }}>
                {m[1]}
              </td>
              <td>
                <select
                  className="select"
                  defaultValue={m[2] || ""}
                  style={{ width: "100%", maxWidth: 280 }}
                >
                  <option value="">Select column…</option>
                  {cols.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Step3() {
  return (
    <>
      <div className="card">
        <div
          style={{
            padding: "14px 22px",
            borderBottom: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>
              Review providers{" "}
              <span className="muted" style={{ fontWeight: 400, marginLeft: 8 }}>
                5 valid · 0 errors · 1 duplicate skipped
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="pill mint">
              <span className="dot" />
              Ready to import
            </span>
            <button className="btn sm ghost">
              <I.doc /> Download log
            </button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>RNC</th>
              <th>ERP code</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {PROVIDERS.map((r, i) => (
              <tr key={i}>
                <td className="strong">{r[0]}</td>
                <td className="mono">{r[1]}</td>
                <td className="mono">{r[2]}</td>
                <td>{r[4]}</td>
                <td className="mono small" style={{ color: "var(--ink-3)" }}>
                  {r[5]}
                </td>
                <td className="mono small">{r[6]}</td>
                <td>
                  <span className="tag">{r[7]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="banner-mint" style={{ marginTop: 14, padding: "12px 16px", fontSize: 12.5 }}>
        <I.check />
        <div>
          On confirmation, each contact receives an email from{" "}
          <span className="mono">no-reply@margina.com</span> with credentials to register on the
          supplier portal.
        </div>
      </div>
    </>
  )
}
