"use client"

import { useRouter } from "next/navigation"
import { useState, type ReactNode } from "react"
import { Sidebar, Topbar, Stepper, WizardFooter, I } from "@/components/shell"

const STEPS = ["Campaign setup", "Upload invoice file", "Invoice field mapping", "Review & confirm"]

export default function NewCampaignPage() {
  const [step, setStep] = useState(0)
  const router = useRouter()

  const next = () => {
    if (step >= STEPS.length - 1) {
      router.push("/campaigns?created=1")
      return
    }
    setStep((s) => s + 1)
  }
  const back = () => {
    if (step === 0) router.push("/campaigns")
    else setStep((s) => s - 1)
  }

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Topbar crumb={["Workspace", "Campaigns", "New campaign"]} />
        <div className="content">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 8,
            }}
          >
            <div className="page-title">
              <h2>New campaign</h2>
              <span className="count">
                Step {step + 1} of {STEPS.length} · {STEPS[step]}
              </span>
            </div>
            <button className="btn ghost sm">Save draft</button>
          </div>
          <div className="page-sub">
            Set up a discounting campaign, upload your AP file and confirm before notifying suppliers.
          </div>

          <Stepper steps={STEPS} current={step} />

          {step === 0 && <Step1 />}
          {step === 1 && <Step2 />}
          {step === 2 && <Step3 />}
          {step === 3 && <Step4 />}

          <WizardFooter
            onBack={back}
            onNext={next}
            primaryLabel={step === STEPS.length - 1 ? "Create campaign & notify suppliers" : undefined}
          />
        </div>
      </div>
    </div>
  )
}

// ───────── Step 1: Setup ─────────
function Step1() {
  return (
    <>
      <div className="card card-pad">
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>Campaign details</div>
          <div className="muted small">
            Fields marked with <span style={{ color: "var(--rose)" }}>*</span> are required.
          </div>
        </div>
        <div className="form-grid">
          <Field label="Campaign name" req>
            <input className="input" placeholder="e.g. Q3-2025 Campaign" defaultValue="Q2-2025 Campaign" />
          </Field>
          <Field label="Available amount to allocate" req>
            <div className="input-prefix">
              <span>USD</span>
              <input className="input mono" defaultValue="500,000.00" />
            </div>
          </Field>
          <Field label="Projected disbursement date" req hint="Payments will be released on or before this date.">
            <input className="input mono" type="text" defaultValue="2025-06-15" />
          </Field>
          <Field label="Currency" req>
            <select className="select" defaultValue="USD">
              <option>USD</option>
              <option>DOP</option>
              <option>EUR</option>
            </select>
          </Field>
          <Field label="Target supplier size(s)" hint="Limits which suppliers receive an invite.">
            <select className="select" defaultValue="ml">
              <option value="all">All sizes</option>
              <option value="ml">Medium & Large</option>
              <option value="s">Small</option>
              <option value="l">Large only</option>
            </select>
          </Field>
          <Field label="Target supplier type(s)">
            <div
              className="input"
              style={{ padding: "8px 10px", display: "flex", flexWrap: "wrap", gap: 4, minHeight: 38 }}
            >
              <span className="tag">Construction</span>
              <span className="tag">Tech</span>
              <span
                className="tag"
                style={{ background: "transparent", borderStyle: "dashed", color: "var(--muted)", cursor: "pointer" }}
              >
                + Add
              </span>
            </div>
          </Field>
          <Field label="Expected return percentage">
            <div className="input-prefix">
              <input className="input mono" defaultValue="8.50" style={{ paddingLeft: 14 }} />
              <span style={{ left: "auto", right: 12, color: "var(--muted)" }}>%</span>
            </div>
          </Field>
          <Field label="Expected return (USD)" hint="Auto-calculated from % × available amount.">
            <div className="input-prefix">
              <span>USD</span>
              <input className="input mono" defaultValue="42,500.00" />
            </div>
          </Field>
        </div>
      </div>

      <ReturnsBenchmark />
    </>
  )
}

function ReturnsBenchmark() {
  const rates: [string, string, string, "mint" | "blue" | "slate"][] = [
    ["Bank deposit (30d)", "6.40%", "BHD León", "slate"],
    ["Money market", "5.10%", "Popular MM", "slate"],
    ["DR Govt 90-day", "8.05%", "Cetes RD", "blue"],
    ["Reverse repo", "7.20%", "BC RD", "slate"],
    ["Margina expected", "8.50%", "Your target · this campaign", "mint"],
  ]
  return (
    <div className="card card-pad" style={{ marginTop: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>Market benchmark</div>
          <div className="muted small">
            Reference rates for short-term liquidity instruments. Calibrate your expected return against the market.
          </div>
        </div>
        <button className="btn sm ghost">
          <I.refresh /> Refresh rates
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1.4fr", gap: 10 }}>
        {rates.map((m, i) => (
          <div
            key={i}
            style={{
              border: "1px solid " + (m[3] === "mint" ? "#BFEFD9" : "var(--line)"),
              background: m[3] === "mint" ? "var(--mint-soft)" : "var(--surface)",
              borderRadius: 10,
              padding: "12px 14px",
            }}
          >
            <div
              style={{
                fontSize: 11.5,
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {m[0]}
            </div>
            <div
              className="mono"
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: m[3] === "mint" ? "var(--mint-ink)" : "var(--ink)",
                margin: "4px 0 2px",
              }}
            >
              {m[1]}
            </div>
            <div
              style={{
                fontSize: 11.5,
                color: m[3] === "mint" ? "var(--mint-deep)" : "var(--muted)",
              }}
            >
              {m[2]}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ───────── Step 2: Upload ─────────
function Step2() {
  return (
    <>
      <div className="card card-pad">
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
          Upload your accounts payable file
        </div>
        <div className="muted small" style={{ marginBottom: 18 }}>
          Supports CSV, Excel (.xlsx) or JSON exports from your ERP. Maximum 10 MB.
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
              color: "var(--ink)",
            }}
          >
            <I.upl size={22} />
          </div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Drop your file here</div>
          <div className="muted small" style={{ margin: "4px 0 16px" }}>
            or browse from your computer
          </div>
          <button className="btn primary">Choose file</button>
          <div className="muted small" style={{ marginTop: 14 }}>
            Accepted: .csv, .xlsx, .json · Up to 10MB
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
          {[
            ["SAP Business One", "sap.csv template"],
            ["Oracle NetSuite", "netsuite.xlsx template"],
            ["Microsoft Dynamics 365", "dynamics.csv template"],
            ["QuickBooks", "quickbooks.csv template"],
          ].map((t) => (
            <div
              key={t[0]}
              style={{
                flex: 1,
                padding: "10px 12px",
                border: "1px solid var(--line)",
                borderRadius: 8,
                background: "var(--surface)",
              }}
            >
              <div style={{ fontSize: 12.5, fontWeight: 500 }}>{t[0]}</div>
              <a
                href="#"
                style={{ fontSize: 11.5, color: "var(--ink-3)", textDecoration: "none" }}
              >
                Download {t[1]} →
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="card card-pad" style={{ marginTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: "var(--surface-2)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <I.doc />
            </div>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>ap_export_2025-05-12.csv</div>
              <div className="muted small">428 KB · 142 invoices · uploaded just now</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="pill mint">
              <span className="dot" />
              Parsed
            </span>
            <button className="btn ghost sm">Replace</button>
            <button className="btn ghost sm">
              <I.dot3 />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// ───────── Step 3: Mapping ─────────
function Step3() {
  const cols = [
    "NCF (B0…)",
    "invoice_id",
    "sup_code",
    "currency",
    "issue_dt",
    "due_dt",
    "total_amount",
    "sup_email",
  ]
  type MapRow = { field: string; sample: string; mapped: string | null; required: boolean }
  const mapping: MapRow[] = [
    { field: "NCF", sample: "B0100001234; E3100002345", mapped: "NCF (B0…)", required: true },
    { field: "Invoice Number in ERP", sample: "INV-2025-00123; FAC-34567", mapped: "invoice_id", required: true },
    { field: "Invoice Issue Date", sample: "2025-04-01; 2025-04-12", mapped: "issue_dt", required: true },
    { field: "Invoice Due Date", sample: "2025-05-01; 2025-05-15", mapped: "due_dt", required: true },
    { field: "Invoice Amount", sample: "150,000.00; 12,500.50", mapped: "total_amount", required: true },
    { field: "Supplier Code", sample: "SUP-001; SUP-014", mapped: "sup_code", required: true },
    { field: "Currency", sample: "DOP; USD", mapped: "currency", required: false },
    { field: "Supplier Email", sample: "jperez@grupoem.com", mapped: null, required: false },
  ]
  return (
    <>
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
            <div style={{ fontSize: 14, fontWeight: 600 }}>
              Map your CSV columns to Margina fields
            </div>
            <div className="muted small">
              We pre-matched 6 of 8 fields based on column names. Verify the values, then map the rest.
            </div>
          </div>
          <span className="pill mint">
            <span className="dot" />6 / 8 mapped
          </span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "28%" }}>Margina field</th>
              <th style={{ width: "40%" }}>CSV example data</th>
              <th>CSV column</th>
            </tr>
          </thead>
          <tbody>
            {mapping.map((m, i) => (
              <tr key={i}>
                <td className="strong">
                  {m.field}
                  {m.required && (
                    <span style={{ color: "var(--rose)", marginLeft: 4 }}>*</span>
                  )}
                </td>
                <td className="mono" style={{ color: "var(--ink-3)", fontSize: 12 }}>
                  {m.sample}
                </td>
                <td>
                  <select
                    className="select"
                    defaultValue={m.mapped || ""}
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

      <div
        style={{
          display: "flex",
          gap: 10,
          padding: "12px 16px",
          background: "var(--surface-2)",
          border: "1px solid var(--line)",
          borderRadius: 10,
          marginTop: 14,
          fontSize: 12.5,
          color: "var(--ink-3)",
        }}
      >
        <I.help />
        <div>
          <strong style={{ color: "var(--ink)" }}>5 unrecognized suppliers</strong> · 3 rows reference
          supplier codes not yet in your directory. We'll prompt you to create them before sending invites.
        </div>
      </div>
    </>
  )
}

// ───────── Step 4: Review ─────────
function Step4() {
  const invoices = [
    ["SUP-001", "B0100001234", "INV-2025-00123", "2025-04-01", "2025-05-01", "DOP", "150,000.00"],
    ["SUP-001", "B0100001235", "INV-2025-00124", "2025-04-03", "2025-05-03", "DOP", "85,400.00"],
    ["SUP-014", "E3100002345", "INV-2025-00125", "2025-04-04", "2025-05-04", "USD", "12,500.50"],
    ["SUP-003", "B0100001236", "INV-2025-00126", "2025-04-05", "2025-05-05", "DOP", "42,800.00"],
    ["SUP-021", "B0100001237", "INV-2025-00127", "2025-04-05", "2025-05-06", "DOP", "9,200.00"],
    ["SUP-008", "E3100002346", "INV-2025-00128", "2025-04-06", "2025-05-06", "USD", "24,750.00"],
    ["SUP-014", "B0100001238", "INV-2025-00129", "2025-04-07", "2025-05-07", "DOP", "67,300.00"],
  ]
  const summary: [string, string, string?][] = [
    ["Campaign name", "Q2-2025 Campaign"],
    ["Available amount", "USD 500,000.00", "mono"],
    ["Projected disbursement", "2025-06-15", "mono"],
    ["Currency", "USD"],
    ["Supplier type", "Construction, Tech"],
    ["Supplier size", "Medium & Large"],
    ["Expected return %", "8.50%", "mono"],
    ["Expected return", "USD 42,500.00", "mono"],
  ]
  return (
    <>
      <div className="card card-pad">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Campaign summary</div>
            <div className="muted small">Confirm details before notifying suppliers.</div>
          </div>
          <a href="#" style={{ fontSize: 12.5, color: "var(--ink-3)", textDecoration: "none" }}>
            Edit
          </a>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "18px 24px",
            marginTop: 16,
          }}
        >
          {summary.map((k, i) => (
            <div key={i}>
              <div
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "var(--muted)",
                  marginBottom: 4,
                }}
              >
                {k[0]}
              </div>
              <div className={k[2] || ""} style={{ fontSize: 14, fontWeight: 500 }}>
                {k[1]}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
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
              Invoices in this campaign{" "}
              <span className="muted" style={{ fontWeight: 400, marginLeft: 8 }}>
                142 total · 38 suppliers
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, fontSize: 12.5 }}>
            <span className="pill">
              <span className="dot" />
              Sum: USD 482,300 + DOP 8,914,500
            </span>
            <button className="btn sm ghost">
              <I.doc /> Download list
            </button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Supplier code</th>
              <th>NCF</th>
              <th>Invoice # (ERP)</th>
              <th>Issue date</th>
              <th>Due date</th>
              <th>Currency</th>
              <th className="right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((r, i) => (
              <tr key={i}>
                <td className="mono">{r[0]}</td>
                <td className="mono">{r[1]}</td>
                <td className="mono">{r[2]}</td>
                <td className="mono">{r[3]}</td>
                <td className="mono">{r[4]}</td>
                <td>{r[5]}</td>
                <td className="right mono strong">{r[6]}</td>
              </tr>
            ))}
            <tr>
              <td
                colSpan={7}
                style={{ textAlign: "center", color: "var(--muted)", fontSize: 12.5, padding: 14 }}
              >
                + 135 more invoices
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        className="banner-mint"
        style={{ marginTop: 14, alignItems: "flex-start", padding: "12px 16px", fontSize: 12.5 }}
      >
        <I.check />
        <div>
          When you create this campaign, <strong>38 suppliers</strong> will receive an email with the
          invitation to submit discount bids. Suppliers that aren't yet onboarded will get an
          account-creation link or a single-use token.
        </div>
      </div>
    </>
  )
}

// ───────── helpers ─────────
function Field({
  label,
  req,
  hint,
  children,
}: {
  label: string
  req?: boolean
  hint?: string
  children: ReactNode
}) {
  return (
    <div className="field">
      <label>
        {label}
        {req && <span className="req">*</span>}
      </label>
      {children}
      {hint && <div className="hint">{hint}</div>}
    </div>
  )
}
