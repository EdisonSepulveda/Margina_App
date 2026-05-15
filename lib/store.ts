// In-memory mock data store for the Margina demo platform.
// Mutating these via the helpers below keeps the demo session consistent
// across client navigations within the same browser tab.

export type Currency = "USD" | "DOP"
export type SupplierSize = "Pequeña" | "Mediana" | "Grande"

export type Provider = {
  id: string
  name: string
  rnc: string
  erpCode: string
  productOrService: string
  contactName: string
  email: string
  phone: string
  category: string
  size: SupplierSize
  bankAccount: string
  city: string
  country: string
  createdAt: string
}

export type Invoice = {
  id: string
  campaignId: string
  ncf: string
  invoiceNumberErp: string
  issueDate: string
  dueDate: string
  amount: number
  currency: Currency
  supplierCode: string
  status: "Disponible" | "Descontada" | "Pagada"
  discountPercent?: number
  discountAmount?: number
  discountedAt?: string
}

export type Campaign = {
  id: string
  name: string
  projectedDisbursementDate: string
  availableAmount: number
  currency: Currency
  targetSupplierSize: SupplierSize[]
  targetSupplierType: string[]
  expectedReturnPercent: number
  expectedReturnUsd: number
  subscribedAmount: number
  status: "Activo" | "Borrador" | "Cerrado"
  createdAt: string
}

let providers: Provider[] = [
  {
    id: "P-001",
    name: "Grupo Electromecánico SRL",
    rnc: "1-02-34567-8",
    erpCode: "SUP-001",
    productOrService: "Servicios eléctricos",
    contactName: "John Doe",
    email: "john.doe@grupoelectro.do",
    phone: "809-555-1234",
    category: "Electricidad",
    size: "Mediana",
    bankAccount: "0123456789",
    city: "Santo Domingo",
    country: "República Dominicana",
    createdAt: "2026-04-12",
  },
  {
    id: "P-002",
    name: "Print & Office RD SRL",
    rnc: "1-02-34567-9",
    erpCode: "SUP-002",
    productOrService: "Papelería",
    contactName: "María Smith",
    email: "maria.smith@printoffice.do",
    phone: "829-555-4567",
    category: "Papelería",
    size: "Pequeña",
    bankAccount: "9876543210",
    city: "Santiago",
    country: "República Dominicana",
    createdAt: "2026-04-15",
  },
  {
    id: "P-003",
    name: "Soluciones Aponte",
    rnc: "1-30-11122-3",
    erpCode: "SUP-003",
    productOrService: "Cadena de suministro",
    contactName: "Carlos Aponte",
    email: "carlos@aponte.do",
    phone: "809-555-9090",
    category: "Cadena de suministro",
    size: "Grande",
    bankAccount: "5544332211",
    city: "Santo Domingo",
    country: "República Dominicana",
    createdAt: "2026-04-20",
  },
]

let campaigns: Campaign[] = [
  {
    id: "C-001",
    name: "Q2-2026 Campaign",
    projectedDisbursementDate: "2026-06-15",
    availableAmount: 500000,
    currency: "USD",
    targetSupplierSize: ["Mediana", "Grande"],
    targetSupplierType: ["Logística", "Construcción"],
    expectedReturnPercent: 10,
    expectedReturnUsd: 50000,
    subscribedAmount: 250000,
    status: "Activo",
    createdAt: "2026-05-01",
  },
  {
    id: "C-002",
    name: "Year-End 2026",
    projectedDisbursementDate: "2026-12-01",
    availableAmount: 1200000,
    currency: "USD",
    targetSupplierSize: ["Grande"],
    targetSupplierType: ["Construcción"],
    expectedReturnPercent: 12,
    expectedReturnUsd: 144000,
    subscribedAmount: 600000,
    status: "Activo",
    createdAt: "2026-05-05",
  },
]

let invoices: Invoice[] = [
  {
    id: "I-1001",
    campaignId: "C-001",
    ncf: "B0100001234",
    invoiceNumberErp: "INV-2026-0001",
    issueDate: "2026-04-01",
    dueDate: "2026-06-01",
    amount: 150000,
    currency: "DOP",
    supplierCode: "SUP-001",
    status: "Disponible",
  },
  {
    id: "I-1002",
    campaignId: "C-001",
    ncf: "B0100001235",
    invoiceNumberErp: "INV-2026-0002",
    issueDate: "2026-04-05",
    dueDate: "2026-06-05",
    amount: 80000,
    currency: "DOP",
    supplierCode: "SUP-001",
    status: "Disponible",
  },
  {
    id: "I-1003",
    campaignId: "C-001",
    ncf: "B0100001236",
    invoiceNumberErp: "INV-2026-0003",
    issueDate: "2026-04-10",
    dueDate: "2026-06-10",
    amount: 220000,
    currency: "DOP",
    supplierCode: "SUP-002",
    status: "Descontada",
    discountPercent: 2.5,
    discountAmount: 5500,
    discountedAt: "2026-05-02",
  },
  {
    id: "I-1004",
    campaignId: "C-002",
    ncf: "B0100002001",
    invoiceNumberErp: "INV-2026-0101",
    issueDate: "2026-04-20",
    dueDate: "2026-07-20",
    amount: 95000,
    currency: "USD",
    supplierCode: "SUP-003",
    status: "Disponible",
  },
]

export const store = {
  listCampaigns: () => [...campaigns],
  getCampaign: (id: string) => campaigns.find((c) => c.id === id),
  addCampaign: (c: Omit<Campaign, "id" | "createdAt" | "subscribedAmount" | "status">) => {
    const created: Campaign = {
      ...c,
      id: `C-${String(campaigns.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString().slice(0, 10),
      subscribedAmount: 0,
      status: "Activo",
    }
    campaigns = [created, ...campaigns]
    return created
  },

  listProviders: () => [...providers],
  getProviderByEmail: (email: string) =>
    providers.find((p) => p.email.toLowerCase() === email.toLowerCase()),
  getProviderByCode: (code: string) => providers.find((p) => p.erpCode === code),
  addProvider: (p: Omit<Provider, "id" | "createdAt">) => {
    const created: Provider = {
      ...p,
      id: `P-${String(providers.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString().slice(0, 10),
    }
    providers = [created, ...providers]
    return created
  },
  addProvidersBulk: (rows: Omit<Provider, "id" | "createdAt">[]) => {
    const created = rows.map((p, i) => ({
      ...p,
      id: `P-${String(providers.length + 1 + i).padStart(3, "0")}`,
      createdAt: new Date().toISOString().slice(0, 10),
    }))
    providers = [...created, ...providers]
    return created
  },

  listInvoices: () => [...invoices],
  listInvoicesBySupplier: (supplierCode: string) =>
    invoices.filter((i) => i.supplierCode === supplierCode),
  applyDiscount: (invoiceId: string, percent: number, amount: number) => {
    invoices = invoices.map((i) =>
      i.id === invoiceId
        ? {
            ...i,
            status: "Descontada" as const,
            discountPercent: percent,
            discountAmount: amount,
            discountedAt: new Date().toISOString().slice(0, 10),
          }
        : i,
    )
    return invoices.find((i) => i.id === invoiceId)
  },
}

export const formatMoney = (amount: number, currency: Currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount)
