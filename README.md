# Margina — High-Fidelity Wireframes

Faithful implementation of the Margina design package (`Design/Margina.zip`,
`High-Fidelity Wireframes.html`). Reverse factoring + dynamic discounting platform
for Latin America.

Built with **Next.js 15 + React 19 + Tailwind v4**. Visual styling is driven by the
design tokens in `app/globals.css` (Geist typography, warm off-white background,
deep-navy ink, mint accent) — no React UI library, no shadcn.

## Run

```bash
cd Software/Front-end/margina-app
pnpm install   # or npm install
pnpm dev       # http://localhost:3000
```

## Design tokens

| Token | Value |
|---|---|
| Background | `#FAFAF7` |
| Surface (cards) | `#FFFFFF` |
| Ink (primary) | `#0A1225` |
| Mint (accent) | `#2DD4A4` · deep `#16A07B` · soft `#E6FAF2` · ink `#064E3B` |
| Typography | Geist (sans) + Geist Mono (numbers) |
| Radius | 6 / 10 / 14 px |
| Shadow | `0 1px 2px rgba(10,18,37,.04)` |

The sidebar is the deep ink color, 232 px wide; the active nav item gets a mint
inset border + soft mint tint. Status pills come in `mint / amber / rose / blue /
slate` variants. Tabular numbers everywhere there's money (`.mono` class).

## Routes (4 deliverables, 12 artboards)

| # | Route | Artboard |
|---|---|---|
| **Company · Dashboard** | | |
| 1 | `/dashboard` | KPIs, yield-vs-benchmarks SVG chart, allocation by supplier type, recent campaigns, activity feed |
| **Company · Campaigns** | | |
| 2 | `/campaigns` | List + status tabs |
| 3 | `/campaigns/new` (step 1) | Setup form + market benchmark rate cards |
| 4 | `/campaigns/new` (step 2) | Upload AP file with ERP templates |
| 5 | `/campaigns/new` (step 3) | Field mapping table (NCF / ERP / dates / amount / code / currency) |
| 6 | `/campaigns/new` (step 4) | Review summary + invoices preview |
| 7 | `/campaigns?created=1` | List with "Campaign created" banner |
| **Company · Providers** | | |
| 8 | `/suppliers` | List with status tabs + checkbox selection |
| 9 | `/suppliers/add` | Single-provider form (Company / Contacts / Banking) |
| 10 | `/suppliers/import` (3 steps) | Bulk upload → mapping → review |
| 11 | `/suppliers?added=1` | List with "5 providers added" banner |
| **Supplier · Discount** | | |
| 12 | `/provider/login` | Invite landing (account vs. one-time access) |
| 13 | `/provider/invoices` | Invoices list with active-campaign hero banner |
| 14 | `/provider/invoices/[id]` | Submit-discount detail: live % ↔ amount sync, slider, real-time summary (Days early / Implied APR / Bid percentile), APR comparison bars |

## File map

```
app/
  layout.tsx                      Geist font, root layout
  globals.css                     full design system (ported from Margina.zip styles.css)
  page.tsx                        landing — pick a portal
  dashboard/page.tsx              Dashboard
  campaigns/
    page.tsx                      list + banner via ?created=1
    new/page.tsx                  4-step wizard
  suppliers/
    page.tsx                      list + banner via ?added=1
    add/page.tsx                  single-add
    import/page.tsx               3-step bulk wizard
  provider/
    login/page.tsx                invite landing
    invoices/page.tsx             invoices list
    invoices/[id]/page.tsx        submit discount detail

components/
  shell.tsx                       Icons (I), Sidebar, Topbar, Stepper, ActionBar, WizardFooter
```

## What's interactive

- All form fields are live (controlled where it matters).
- Wizards advance with `Next step` and complete with a success-banner redirect
  (`?created=1` / `?added=1`).
- `/provider/invoices/[id]`: discount % ↔ amount stay in sync as you type; the
  slider is draggable; the real-time summary and APR comparison bars react to the
  current value (`apr = discountPct / (daysEarly / 365)`).

## Notes

- The first iteration of this app (shadcn-based, with an in-memory store) was
  replaced wholesale to match the high-fidelity design. The store is no longer
  used; data is co-located with each artboard. Re-introducing a real store would
  swap `const ROWS = [...]` for fetches.
- The dark provider-invite background gradient (`#0A1225 → #14213D`) and the
  navy hero banner on `/provider/invoices` match the design exactly.
