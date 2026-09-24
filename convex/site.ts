import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getSiteConfig = query({
  args: {},
  handler: async (ctx) => {
    const config = await ctx.db
      .query("siteConfig")
      .filter((q) => q.eq(q.field("key"), "current"))
      .first();
    return config;
  },
});

export const updateSiteConfig = mutation({
  args: {
    colors: v.optional(
      v.object({
        primaryBlue: v.string(),
        lightBlue: v.string(),
        darkNavy: v.string(),
        grayLight: v.string(),
        grayDark: v.string(),
      })
    ),
    hero: v.optional(
      v.object({
        headlineMain: v.string(),
        headlineGradient: v.string(),
        subheadline: v.string(),
        description: v.string(),
        ctaPrimary: v.string(),
        ctaSecondary: v.string(),
        badgeText: v.string(),
        heroMode: v.string(),
        customImageUrl: v.string(),
      })
    ),
    sections: v.optional(
      v.array(
        v.object({
          id: v.string(),
          name: v.string(),
          visible: v.boolean(),
          order: v.number(),
        })
      )
    ),
    portfolioItems: v.optional(
      v.array(
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
        })
      )
    ),
    appsPortal: v.optional(
      v.object({
        badge: v.string(),
        title: v.string(),
        description: v.string(),
        itbisRate: v.number(),
        propinaRate: v.number(),
      })
    ),
    animations: v.optional(
      v.object({
        speed: v.string(),
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
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("siteConfig")
      .filter((q) => q.eq(q.field("key"), "current"))
      .first();

    const timestamp = new Date().toISOString();

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...(args.colors ? { colors: args.colors } : {}),
        ...(args.hero ? { hero: args.hero } : {}),
        ...(args.sections ? { sections: args.sections } : {}),
        ...(args.portfolioItems ? { portfolioItems: args.portfolioItems } : {}),
        ...(args.appsPortal ? { appsPortal: args.appsPortal } : {}),
        ...(args.animations ? { animations: args.animations } : {}),
        ...(args.sectionTexts ? { sectionTexts: args.sectionTexts } : {}),
        updatedAt: timestamp,
      });
      return existing._id;
    } else {
      const defaultDoc = {
        key: "current",
        colors: args.colors || {
          primaryBlue: "#2D4AFF",
          lightBlue: "#4EA1FF",
          darkNavy: "#0F2D6B",
          grayLight: "#F2F4F8",
          grayDark: "#333333",
        },
        hero: args.hero || {
          headlineMain: "SOLUCIONES DIGITALES\nPARA NEGOCIOS",
          headlineGradient: "QUE QUIEREN MÁS.",
          subheadline: "Transformamos ideas en experiencias digitales que ayudan a tu negocio a crecer.",
          description: "Estrategia, diseño y tecnología trabajando juntos para crear una presencia digital que realmente genere impacto.",
          ctaPrimary: "Impulsa tu negocio",
          ctaSecondary: "Explorar servicios",
          badgeText: "Ideas • Estrategia • Resultados",
          heroMode: "both",
          customImageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        },
        sections: args.sections || [
          { id: "hero", name: "Hero Principal", visible: true, order: 1 },
          { id: "appsPortal", name: "Portal de Aplicaciones Estratégicas", visible: true, order: 2 },
          { id: "valueProp", name: "Propuesta de Valor (3 Pilares)", visible: true, order: 3 },
          { id: "about", name: "Sobre Nosotros (Misión/Visión/Valores)", visible: true, order: 4 },
          { id: "services", name: "Servicios (Bento Grid)", visible: true, order: 5 },
          { id: "whyRae", name: "¿Por qué RAE? (4 Pilares)", visible: true, order: 6 },
          { id: "process", name: "Proceso de Trabajo (Roadmap)", visible: true, order: 7 },
          { id: "portfolio", name: "Portafolio / Trabajo que habla por nosotros", visible: false, order: 8 },
          { id: "results", name: "Resultados e Impacto", visible: true, order: 9 },
          { id: "cta", name: "Llamada a la Acción (CTA)", visible: true, order: 10 },
          { id: "contact", name: "Formulario de Contacto", visible: true, order: 11 },
        ],
        portfolioItems: args.portfolioItems || [],
        appsPortal: args.appsPortal || {
          badge: "RAE Marketing APPs",
          title: "Portal digital de aplicaciones estratégicas",
          description: "Accede de forma unificada a las herramientas de control estratégico que tenemos desplegadas para tus operaciones. Nuestra suite líder: RAE Business Management & Vault System.",
          itbisRate: 18,
          propinaRate: 10,
        },
        updatedAt: timestamp,
      };
      const id = await ctx.db.insert("siteConfig", defaultDoc);
      return id;
    }
  },
});

// Contact Inbox Mutations & Queries
export const listContactMessages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("contactMessages").order("desc").collect();
  },
});

export const submitContactMessage = mutation({
  args: {
    name: v.string(),
    company: v.string(),
    email: v.string(),
    whatsapp: v.string(),
    service: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("contactMessages", {
      ...args,
      status: "unread",
      createdAt: new Date().toISOString(),
    });
    return id;
  },
});

export const updateMessageStatus = mutation({
  args: {
    id: v.id("contactMessages"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const deleteMessage = mutation({
  args: {
    id: v.id("contactMessages"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Storage upload
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const getImageUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
