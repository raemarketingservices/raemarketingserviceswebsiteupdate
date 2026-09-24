import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// INVOICES
export const listInvoices = query({
  args: { businessId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("invoices")
      .filter((q) => q.eq(q.field("businessId"), args.businessId))
      .order("desc")
      .collect();
  },
});

export const createInvoice = mutation({
  args: {
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
    status: v.string(),
    date: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("invoices", args);
  },
});

export const deleteInvoice = mutation({
  args: { id: v.id("invoices") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// EXPENSES
export const listExpenses = query({
  args: { businessId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("expenses")
      .filter((q) => q.eq(q.field("businessId"), args.businessId))
      .order("desc")
      .collect();
  },
});

export const createExpense = mutation({
  args: {
    businessId: v.string(),
    description: v.string(),
    category: v.string(),
    amount: v.number(),
    supplier: v.string(),
    date: v.string(),
    receiptUrl: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("expenses", args);
  },
});

export const deleteExpense = mutation({
  args: { id: v.id("expenses") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// EMPLOYEES
export const listEmployees = query({
  args: { businessId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("employees")
      .filter((q) => q.eq(q.field("businessId"), args.businessId))
      .order("desc")
      .collect();
  },
});

export const createEmployee = mutation({
  args: {
    businessId: v.string(),
    fullName: v.string(),
    position: v.string(),
    department: v.string(),
    salary: v.number(),
    phone: v.string(),
    email: v.string(),
    hireDate: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("employees", args);
  },
});

export const deleteEmployee = mutation({
  args: { id: v.id("employees") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// INVENTORY
export const listInventory = query({
  args: { businessId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("inventory")
      .filter((q) => q.eq(q.field("businessId"), args.businessId))
      .collect();
  },
});

export const createInventoryItem = mutation({
  args: {
    businessId: v.string(),
    name: v.string(),
    sku: v.string(),
    category: v.string(),
    quantity: v.number(),
    minQuantity: v.number(),
    costPrice: v.number(),
    salePrice: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("inventory", args);
  },
});

export const updateInventoryItem = mutation({
  args: {
    id: v.id("inventory"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { quantity: args.quantity });
  },
});

export const deleteInventoryItem = mutation({
  args: { id: v.id("inventory") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
