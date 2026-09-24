import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listBusinesses = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("businesses").order("desc").collect();
  },
});

export const getBusinessById = query({
  args: { id: v.id("businesses") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const registerBusiness = mutation({
  args: {
    name: v.string(),
    rnc: v.string(),
    ownerName: v.string(),
    email: v.string(),
    whatsapp: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if email already registered
    const existing = await ctx.db
      .query("businesses")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existing) {
      throw new Error("Ya existe un negocio registrado con este correo electrónico.");
    }

    const trialDays = 15;
    const trialEndsAt = new Date(Date.now() + trialDays * 24 * 60 * 60 * 1000).toISOString();

    const id = await ctx.db.insert("businesses", {
      ...args,
      status: "pending", // Admin must approve!
      trialDays,
      trialEndsAt,
      allowedApps: ["invoicing", "dashboard"], // Default initial apps upon approval
      createdAt: new Date().toISOString(),
    });

    return id;
  },
});

export const updateBusinessStatus = mutation({
  args: {
    id: v.id("businesses"),
    status: v.string(),
    trialDays: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const updateData: { status: string; trialDays?: number; trialEndsAt?: string } = {
      status: args.status,
    };
    if (args.trialDays !== undefined) {
      updateData.trialDays = args.trialDays;
      updateData.trialEndsAt = new Date(Date.now() + args.trialDays * 24 * 60 * 60 * 1000).toISOString();
    }
    await ctx.db.patch(args.id, updateData);
  },
});

export const updateBusinessApps = mutation({
  args: {
    id: v.id("businesses"),
    allowedApps: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      allowedApps: args.allowedApps,
    });
  },
});

export const authenticateBusiness = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const business = await ctx.db
      .query("businesses")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (!business || business.password !== args.password) {
      return { success: false, error: "Credenciales inválidas" };
    }

    return { success: true, business };
  },
});
