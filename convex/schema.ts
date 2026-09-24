import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Global site configuration and visual builder blocks
  siteConfig: defineTable({
    key: v.string(), // "current"
    colors: v.object({
      primaryBlue: v.string(),
      lightBlue: v.string(),
      darkNavy: v.string(),
      grayLight: v.string(),
      grayDark: v.string(),
    }),
    hero: v.object({
      headlineMain: v.string(),
      headlineGradient: v.string(),
      subheadline: v.string(),
      description: v.string(),
      ctaPrimary: v.string(),
      ctaSecondary: v.string(),
      badgeText: v.string(),
      heroMode: v.string(), // "mockups" | "image" | "both"
      customImageUrl: v.string(),
    }),
    sections: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        visible: v.boolean(),
        order: v.number(),
      })
    ),
    portfolioItems: v.array(
      v.object({
        id: v.string(),
        title: v.string(),
        category: v.string(),
        tagline: v.string(),
        client: v.string(),
        clientType: v.string(),
        summary: v.string(),
        challenge: v.string(),
        solution: v.string(),
        resultsHeadline: v.string(),
        servicesProvided: v.array(v.string()),
        imageBg: v.string(),
        accentBadge: v.string(),
        visible: v.boolean(),
        gradient: v.optional(v.string()),
      })
    ),
    appsPortal: v.object({
      badge: v.string(),
      title: v.string(),
      description: v.string(),
      itbisRate: v.number(),
      propinaRate: v.number(),
    }),
    animations: v.optional(
      v.object({
        speed: v.string(), // "normal" | "slow" | "fast"
        enableFloating: v.boolean(),
        enableGlows: v.boolean(),
      })
    ),
    sectionTexts: v.optional(
      v.object({
        valuePropTitle: v.optional(v.string()),
        valuePropSubtitle: v.optional(v.string()),
        aboutTitle: v.optional(v.string()),
        aboutSubtitle: v.optional(v.string()),
        servicesTitle: v.optional(v.string()),
        servicesSubtitle: v.optional(v.string()),
        whyRaeTitle: v.optional(v.string()),
        whyRaeSubtitle: v.optional(v.string()),
        processTitle: v.optional(v.string()),
        processSubtitle: v.optional(v.string()),
        resultsTitle: v.optional(v.string()),
        resultsSubtitle: v.optional(v.string()),
        ctaTitle: v.optional(v.string()),
        ctaSubtitle: v.optional(v.string()),
        ctaButtonText: v.optional(v.string()),
        contactTitle: v.optional(v.string()),
        contactSubtitle: v.optional(v.string()),
        contactBadge: v.optional(v.string()),
      })
    ),
    updatedAt: v.string(),
  }),

  // Contact form submissions (Inbox)
  contactMessages: defineTable({
    name: v.string(),
    company: v.string(),
    email: v.string(),
    whatsapp: v.string(),
    service: v.string(),
    message: v.string(),
    status: v.string(), // "unread" | "read" | "replied" | "archived"
    createdAt: v.string(),
  }),

  // Registered client businesses
  businesses: defineTable({
    name: v.string(),
    rnc: v.string(),
    ownerName: v.string(),
    email: v.string(),
    whatsapp: v.string(),
    password: v.string(),
    status: v.string(), // "pending" | "trial" | "active" | "suspended"
    trialDays: v.number(),
    trialEndsAt: v.string(),
    allowedApps: v.array(v.string()),
    createdAt: v.string(),
    notes: v.optional(v.string()),
  }),

  // Business Invoices (Facturación)
  invoices: defineTable({
    businessId: v.string(),
    invoiceNumber: v.string(),
    clientName: v.string(),
    clientRnc: v.string(),
    clientEmail: v.optional(v.string()),
    clientPhone: v.optional(v.string()),
    items: v.array(
      v.object({
        description: v.string(),
        quantity: v.number(),
        price: v.number(),
        total: v.number(),
      })
    ),
    subtotal: v.number(),
    itbis: v.number(),
    propinaLegal: v.number(),
    total: v.number(),
    status: v.string(), // "paid" | "pending"
    date: v.string(),
    dueDate: v.optional(v.string()),
    notes: v.optional(v.string()),
  }),

  // Business Expenses (Gastos / Salidas)
  expenses: defineTable({
    businessId: v.string(),
    description: v.string(),
    category: v.string(),
    amount: v.number(),
    supplier: v.string(),
    date: v.string(),
    receiptUrl: v.optional(v.string()),
    notes: v.optional(v.string()),
  }),

  // Business Employees (Manejo de Empleados)
  employees: defineTable({
    businessId: v.string(),
    fullName: v.string(),
    position: v.string(),
    department: v.string(),
    salary: v.number(),
    phone: v.string(),
    email: v.string(),
    hireDate: v.string(),
    status: v.string(), // "active" | "inactive"
  }),

  // Business Inventory (Manejo de Stock)
  inventory: defineTable({
    businessId: v.string(),
    name: v.string(),
    sku: v.string(),
    category: v.string(),
    quantity: v.number(),
    minQuantity: v.number(),
    costPrice: v.number(),
    salePrice: v.number(),
  }),
});
