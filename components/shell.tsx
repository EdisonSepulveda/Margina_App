"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment, type ReactNode } from "react"

// ─────────────── Icons (plain named components, no factory) ───────────────
type IconProps = { size?: number }

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "ic",
}

export function IDash({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <rect x="3" y="3" width="7" height="9" />
      <rect x="14" y="3" width="7" height="5" />
      <rect x="14" y="12" width="7" height="9" />
      <rect x="3" y="16" width="7" height="5" />
    </svg>
  )
}
export function ICamp({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <path d="M3 11l18-7-7 18-2.5-7.5L3 11z" />
    </svg>
  )
}
export function IProv({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="6" r="2.5" />
      <path d="M21 14c-.7-1.5-2.2-2.5-4-2.5" />
    </svg>
  )
}
export function IInv({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <path d="M7 3h10l3 3v15l-3-2-3 2-3-2-3 2-3-2V3z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  )
}
export function IBank({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <path d="M3 10l9-6 9 6" />
      <path d="M5 10v8M9 10v8M15 10v8M19 10v8" />
      <path d="M3 20h18" />
    </svg>
  )
}
export function IGear({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  )
}
export function IHelp({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.7" />
      <circle cx="12" cy="17" r=".5" fill="currentColor" />
    </svg>
  )
}
export function IBell({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <path d="M6 8a6 6 0 1 1 12 0c0 6 3 7 3 7H3s3-1 3-7" />
      <path d="M10 21a2 2 0 0 0 4 0" />
    </svg>
  )
}
export function ISearch({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  )
}
export function IPlus({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}
export function IFilt({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <path d="M4 5h16l-6 8v6l-4-2v-4L4 5z" />
    </svg>
  )
}
export function IUpl({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M4 20h16" />
    </svg>
  )
}
export function IDn({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}
export function IChev({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}
export function IBack({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  )
}
export function ICheck({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <path d="M5 12l4 4L19 6" />
    </svg>
  )
}
export function IDot3({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}
export function ITrend({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <path d="M3 17l6-6 4 4 8-9" />
      <path d="M14 6h7v7" />
    </svg>
  )
}
export function ICal({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  )
}
export function IDoc({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6M8 13h8M8 17h5" />
    </svg>
  )
}
export function ILog({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5M21 12H9" />
    </svg>
  )
}
export function IRefresh({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...svgProps}>
      <path d="M21 12a9 9 0 0 1-15.5 6.4L3 16M3 12a9 9 0 0 1 15.5-6.4L21 8" />
      <path d="M21 3v5h-5M3 21v-5h5" />
    </svg>
  )
}

// Namespace object for compatibility with existing `<I.x />` usage.
// Each property points to a plain function component (no factory closures).
export const I = {
  dash: IDash,
  camp: ICamp,
  prov: IProv,
  inv: IInv,
  bank: IBank,
  gear: IGear,
  help: IHelp,
  bell: IBell,
  search: ISearch,
  plus: IPlus,
  filt: IFilt,
  upl: IUpl,
  dn: IDn,
  chev: IChev,
  back: IBack,
  check: ICheck,
  dot3: IDot3,
  trend: ITrend,
  cal: ICal,
  doc: IDoc,
  log: ILog,
  refresh: IRefresh,
}

// ─────────────── Sidebar ───────────────
export function Sidebar({ portal = "company" }: { portal?: "company" | "provider" }) {
  const pathname = usePathname() || ""
  const isActive = (paths: string[]) => paths.some((p) => pathname.startsWith(p))

  const companyNav = [
    { href: "/dashboard", label: "Dashboard", icon: <I.dash />, match: ["/dashboard"] },
    { href: "/campaigns", label: "Campaigns", icon: <I.camp />, match: ["/campaigns"] },
    { href: "/suppliers", label: "Providers", icon: <I.prov />, match: ["/suppliers"] },
    { href: "#", label: "Invoices", icon: <I.inv />, match: ["/invoices"] },
    { href: "#", label: "Payments", icon: <I.bank />, match: ["/payments"] },
  ]
  const providerNav = [
    { href: "/provider/invoices", label: "Invoices", icon: <I.inv />, match: ["/provider/invoices"] },
    { href: "#", label: "History", icon: <I.doc />, match: ["/provider/history"] },
    { href: "#", label: "Account", icon: <I.prov />, match: ["/provider/account"] },
  ]
  const nav = portal === "provider" ? providerNav : companyNav

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">M</div>
        <span className="wm">MARGINA</span>
      </div>

      <div className="nav">
        <div className="nav-section">{portal === "provider" ? "Supplier portal" : "Workspace"}</div>
        {nav.map((n) => (
          <Link key={n.label} href={n.href} className={isActive(n.match) ? "active" : ""}>
            {n.icon}
            <span>{n.label}</span>
          </Link>
        ))}

        <div className="nav-section">Settings</div>
        <a>
          <I.gear />
          <span>Preferences</span>
        </a>
        <a>
          <I.help />
          <span>Help & docs</span>
        </a>
      </div>

      <div className="footer">
        <div className="org">
          <div className="o-logo">{portal === "provider" ? "GE" : "CN"}</div>
          <div>
            <div className="o-name">
              {portal === "provider" ? "Grupo Electromec." : "Consorcio Nacional"}
            </div>
            <div className="o-plan">
              {portal === "provider" ? "Supplier · RNC 1-01" : "Enterprise plan"}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

// ─────────────── Topbar ───────────────
type User = { name: string; email: string; initials: string }

export function Topbar({
  crumb = [],
  user = { name: "John Doe", email: "johndoe@consorcio.do", initials: "JD" },
  actions,
}: {
  crumb?: string[]
  user?: User
  actions?: ReactNode
}) {
  return (
    <div className="topbar">
      <div>
        <div className="crumb">
          {crumb.map((c, i) => (
            <Fragment key={i}>
              <span className={i === crumb.length - 1 ? "here" : ""}>{c}</span>
              {i < crumb.length - 1 && <span>›</span>}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="user">
        {actions}
        <button className="ic-btn" title="Notifications">
          <I.bell />
        </button>
        <div className="user-card">
          <div className="who">
            <div className="nm">{user.name}</div>
            <div className="em">{user.email}</div>
          </div>
          <div className="avatar">{user.initials}</div>
        </div>
      </div>
    </div>
  )
}

// ─────────────── Stepper ───────────────
export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="stepper">
      {steps.map((s, i) => (
        <Fragment key={i}>
          <div className={"step " + (i === current ? "active" : i < current ? "done" : "")}>
            <div className="n">{i < current ? "✓" : i + 1}</div>
            <div className="lbl">{s}</div>
          </div>
          {i < steps.length - 1 && <div className="sep" />}
        </Fragment>
      ))}
    </div>
  )
}

// ─────────────── ActionBar ───────────────
export function ActionBar({
  title,
  count,
  sub,
  left,
  right,
}: {
  title: string
  count?: string
  sub?: string
  left?: ReactNode
  right?: ReactNode
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div className="page-title">
        <h2>{title}</h2>
        {count != null && <span className="count">{count}</span>}
      </div>
      {sub && <div className="page-sub">{sub}</div>}
      <div className="action-bar">
        <div className="left">{left}</div>
        <div className="right">{right}</div>
      </div>
    </div>
  )
}

// ─────────────── Wizard footer ───────────────
export function WizardFooter({
  onBack,
  onNext,
  nextLabel = "Next step",
  backLabel = "Back",
  disabled = false,
  primaryLabel,
}: {
  onBack?: () => void
  onNext?: () => void
  nextLabel?: string
  backLabel?: string
  disabled?: boolean
  primaryLabel?: string
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
      <button className="btn ghost" onClick={onBack}>
        <I.back />
        {backLabel}
      </button>
      <button className="btn primary" onClick={onNext} disabled={disabled}>
        {primaryLabel || nextLabel}
        <I.chev />
      </button>
    </div>
  )
}
