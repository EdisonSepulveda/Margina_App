"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import { Sidebar, Topbar, I } from "@/components/shell"

export default function AddProviderPage() {
  const router = useRouter()
  const create = () => router.push("/suppliers?added=1")

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Topbar crumb={["Workspace", "Providers", "Add provider"]} />
        <div className="content">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 18,
            }}
          >
            <div>
              <div className="page-title">
                <h2>Add provider</h2>
              </div>
              <div className="page-sub">
                When you save, the contact will receive a welcome email to complete their profile and
                create a user.
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Link href="/suppliers" className="btn ghost">
                Cancel
              </Link>
              <button className="btn">Save & add another</button>
              <button className="btn primary" onClick={create}>
                Create provider
              </button>
            </div>
          </div>

          <Section title="Company">
            <div className="form-grid three">
              <Field label="Company name" req>
                <input className="input" placeholder="e.g. Distribuidora Cibao S.A." />
              </Field>
              <Field label="RNC">
                <input className="input mono" placeholder="1-01-23456-7" />
              </Field>
              <Field label="ERP code" req>
                <input className="input mono" placeholder="CLI-008" />
              </Field>
              <Field label="Product or service" req className="span-2">
                <input
                  className="input"
                  placeholder="e.g. Suministros industriales y eléctricos"
                />
              </Field>
              <Field label="Category" req>
                <select className="select" defaultValue="">
                  <option value="" disabled>
                    Select category
                  </option>
                  <option>Electrical</option>
                  <option>Food Supply</option>
                  <option>Construction</option>
                  <option>Tech</option>
                  <option>HVAC</option>
                </select>
              </Field>
              <Field label="Size">
                <select className="select" defaultValue="">
                  <option value="" disabled>
                    Select size
                  </option>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </Field>
              <Field label="City" req>
                <input className="input" placeholder="Santo Domingo" />
              </Field>
              <Field label="Country" req>
                <select className="select" defaultValue="DO">
                  <option value="DO">Dominican Republic</option>
                  <option>Haiti</option>
                  <option>Puerto Rico</option>
                </select>
              </Field>
            </div>
          </Section>

          <Section
            title="Contacts"
            action={
              <button className="btn sm ghost">
                <I.plus /> Add contact
              </button>
            }
          >
            <div className="form-grid three">
              <Field label="Contact name" req>
                <input className="input" placeholder="Juan Pérez" />
              </Field>
              <Field label="Email" req>
                <input className="input" placeholder="jperez@grupoem.com" />
              </Field>
              <Field label="Phone">
                <input className="input mono" placeholder="809-555-1234" />
              </Field>
            </div>
          </Section>

          <Section title="Banking">
            <div className="form-grid three">
              <Field label="Bank" req>
                <select className="select" defaultValue="">
                  <option value="" disabled>
                    Select bank
                  </option>
                  <option>Banco Popular Dominicano</option>
                  <option>Banco BHD</option>
                  <option>Banco de Reservas</option>
                  <option>Scotiabank</option>
                </select>
              </Field>
              <Field label="Account type">
                <select className="select" defaultValue="corriente">
                  <option value="corriente">Cuenta corriente</option>
                  <option value="ahorros">Cuenta de ahorros</option>
                </select>
              </Field>
              <Field label="Bank account" req>
                <input className="input mono" placeholder="123-456-7890" />
              </Field>
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
                fontSize: 12,
                color: "var(--ink-3)",
              }}
            >
              <I.help />
              <div>
                Banking details are encrypted at rest. The supplier can also complete this from their
                portal.
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

function Section({
  title,
  action,
  children,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="card card-pad" style={{ marginBottom: 14 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-2)" }}>{title}</div>
        {action}
      </div>
      {children}
    </div>
  )
}

function Field({
  label,
  req,
  className,
  children,
}: {
  label: string
  req?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <div className={"field " + (className || "")}>
      <label>
        {label}
        {req && <span className="req">*</span>}
      </label>
      {children}
    </div>
  )
}
