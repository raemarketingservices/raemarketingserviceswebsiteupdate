import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';
import { portfolioData } from '../data/portfolioData';
import type { ProjectItem } from '../types';

export interface SectionBlock {
  id: string;
  name: string;
  visible: boolean;
  order: number;
}

export interface SiteConfig {
  colors: {
    primaryBlue: string;
    lightBlue: string;
    darkNavy: string;
    grayLight: string;
    grayDark: string;
  };
  hero: {
    headlineMain: string;
    headlineGradient: string;
    subheadline: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badgeText: string;
    heroMode: 'mockups' | 'image' | 'both';
    customImageUrl: string;
  };
  sections: SectionBlock[];
  portfolioItems: ProjectItem[];
  appsPortal: {
    badge: string;
    title: string;
    description: string;
    itbisRate: number;
    propinaRate: number;
  };
  animations?: {
    speed: 'normal' | 'slow' | 'fast';
    enableFloating: boolean;
    enableGlows: boolean;
  };
  sectionTexts?: {
    valuePropTitle?: string;
    valuePropSubtitle?: string;
    aboutTitle?: string;
    aboutSubtitle?: string;
    servicesTitle?: string;
    servicesSubtitle?: string;
    whyRaeTitle?: string;
    whyRaeSubtitle?: string;
    processTitle?: string;
    processSubtitle?: string;
    resultsTitle?: string;
    resultsSubtitle?: string;
    ctaTitle?: string;
    ctaSubtitle?: string;
    ctaButtonText?: string;
    contactTitle?: string;
    contactSubtitle?: string;
    contactBadge?: string;
  };
}

export interface ContactMessage {
  id: string;
  _convexId?: Id<'contactMessages'>;
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  service: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  createdAt: string;
}

export interface BusinessAccount {
  id: string;
  _convexId?: Id<'businesses'>;
  name: string;
  rnc: string;
  ownerName: string;
  email: string;
  whatsapp: string;
  password?: string;
  status: 'pending' | 'trial' | 'active' | 'suspended';
  trialDays: number;
  trialEndsAt: string;
  allowedApps: string[];
  createdAt: string;
  notes?: string;
}

export interface InvoiceItem {
  id: string;
  _convexId?: Id<'invoices'>;
  businessId: string;
  invoiceNumber: string;
  clientName: string;
  clientRnc: string;
  clientEmail?: string;
  clientPhone?: string;
  items: {
    description: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  subtotal: number;
  itbis: number;
  propinaLegal: number;
  total: number;
  status: 'paid' | 'pending';
  date: string;
  dueDate?: string;
  notes?: string;
}

export interface ExpenseItem {
  id: string;
  _convexId?: Id<'expenses'>;
  businessId: string;
  description: string;
  category: string;
  amount: number;
  supplier: string;
  date: string;
  notes?: string;
}

export interface EmployeeItem {
  id: string;
  _convexId?: Id<'employees'>;
  businessId: string;
  fullName: string;
  position: string;
  department: string;
  salary: number;
  phone: string;
  email: string;
  hireDate: string;
  status: 'active' | 'inactive';
}

export interface InventoryItem {
  id: string;
  _convexId?: Id<'inventory'>;
  businessId: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  minQuantity: number;
  costPrice: number;
  salePrice: number;
}

interface SiteContextType {
  config: SiteConfig;
  updateColors: (colors: SiteConfig['colors']) => void;
  updateHero: (hero: Partial<SiteConfig['hero']>) => void;
  updateSections: (sections: SectionBlock[]) => void;
  toggleSectionVisibility: (sectionId: string) => void;
  moveSectionOrder: (sectionId: string, direction: 'up' | 'down') => void;
  updatePortfolioItems: (items: ProjectItem[]) => void;
  updateAppsPortalConfig: (portal: Partial<SiteConfig['appsPortal']>) => void;
  updateAnimations: (anim: Partial<NonNullable<SiteConfig['animations']>>) => void;
  updateSectionTexts: (texts: Partial<NonNullable<SiteConfig['sectionTexts']>>) => void;
  resetToDefaults: () => void;

  // Contact messages
  messages: ContactMessage[];
  addMessage: (msg: Omit<ContactMessage, 'id' | 'status' | 'createdAt' | '_convexId'>) => void;
  markMessageStatus: (id: string, status: ContactMessage['status']) => void;
  deleteMessage: (id: string) => void;

  // Businesses
  businesses: BusinessAccount[];
  registerBusiness: (biz: Omit<BusinessAccount, 'id' | 'status' | 'trialDays' | 'trialEndsAt' | 'allowedApps' | 'createdAt' | '_convexId'>) => Promise<{ success: boolean; message: string }>;
  updateBusinessStatus: (id: string, status: BusinessAccount['status'], trialDays?: number) => void;
  updateBusinessApps: (id: string, allowedApps: string[]) => void;

  // Operations
  invoices: InvoiceItem[];
  addInvoice: (inv: Omit<InvoiceItem, 'id' | '_convexId'>) => void;
  deleteInvoice: (id: string) => void;
  expenses: ExpenseItem[];
  addExpense: (exp: Omit<ExpenseItem, 'id' | '_convexId'>) => void;
  deleteExpense: (id: string) => void;
  employees: EmployeeItem[];
  addEmployee: (emp: Omit<EmployeeItem, 'id' | '_convexId'>) => void;
  deleteEmployee: (id: string) => void;
  inventory: InventoryItem[];
  addInventoryItem: (item: Omit<InventoryItem, 'id' | '_convexId'>) => void;
  deleteInventoryItem: (id: string) => void;

  // Active logged-in business
  activeBusiness: BusinessAccount | null;
  loginBusiness: (email: string, password: string) => { success: boolean; error?: string };
  logoutBusiness: () => void;

  // Sync state
  isConvexSynced: boolean;
}

// ─── Defaults ────────────────────────────────────────────────────────────────

const defaultSections: SectionBlock[] = [
  { id: 'hero', name: 'Hero Principal', visible: true, order: 1 },
  { id: 'appsPortal', name: 'Portal de Aplicaciones Estratégicas', visible: true, order: 2 },
  { id: 'valueProp', name: 'Propuesta de Valor (3 Pilares)', visible: true, order: 3 },
  { id: 'about', name: 'Sobre Nosotros (Misión / Visión / Valores)', visible: true, order: 4 },
  { id: 'services', name: 'Servicios (Bento Grid)', visible: true, order: 5 },
  { id: 'whyRae', name: '¿Por qué RAE? (4 Pilares)', visible: true, order: 6 },
  { id: 'process', name: 'Proceso de Trabajo (Roadmap)', visible: true, order: 7 },
  { id: 'portfolio', name: 'Portafolio (Trabajo que habla por nosotros)', visible: false, order: 8 },
  { id: 'results', name: 'Resultados e Impacto', visible: true, order: 9 },
  { id: 'cta', name: 'Llamada a la Acción (CTA)', visible: true, order: 10 },
  { id: 'contact', name: 'Formulario de Contacto', visible: true, order: 11 },
];

const defaultHeroConfig: SiteConfig['hero'] = {
  headlineMain: 'SOLUCIONES DIGITALES\nPARA NEGOCIOS',
  headlineGradient: 'QUE QUIEREN MÁS.',
  subheadline: 'Transformamos ideas en experiencias digitales que ayudan a tu negocio a crecer.',
  description: 'Estrategia, diseño y tecnología trabajando juntos para crear una presencia digital que realmente genere impacto.',
  ctaPrimary: 'Impulsa tu negocio',
  ctaSecondary: 'Explorar servicios',
  badgeText: 'Ideas • Estrategia • Resultados',
  heroMode: 'both',
  customImageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
};

const defaultColors: SiteConfig['colors'] = {
  primaryBlue: '#2D4AFF',
  lightBlue: '#4EA1FF',
  darkNavy: '#0F2D6B',
  grayLight: '#F2F4F8',
  grayDark: '#333333',
};

const defaultAppsPortal: SiteConfig['appsPortal'] = {
  badge: 'RAE Marketing APPs',
  title: 'Portal digital de aplicaciones estratégicas',
  description: 'Accede de forma unificada a las herramientas de control estratégico que tenemos desplegadas para tus operaciones. Nuestra suite líder: RAE Business Management & Vault System.',
  itbisRate: 18,
  propinaRate: 10,
};

const defaultAnimations: NonNullable<SiteConfig['animations']> = {
  speed: 'normal',
  enableFloating: true,
  enableGlows: true,
};

const defaultSectionTexts: NonNullable<SiteConfig['sectionTexts']> = {
  valuePropTitle: 'Estrategia, creatividad y tecnología al servicio de tu negocio.',
  valuePropSubtitle: 'No hacemos acciones aisladas. Creamos soluciones digitales que se complementan entre sí para atraer prospectos, mejorar tu imagen y multiplicar tus conversiones.',
  aboutTitle: 'Más que una agencia, un aliado para hacer crecer tu presencia digital.',
  aboutSubtitle: 'Creemos que los negocios no necesitan más publicaciones al azar: necesitan una estrategia clara, una imagen visual prémium y sistemas digitales que generen confianza y ventas reales.',
  servicesTitle: 'Soluciones integrales para cada etapa de tu crecimiento digital.',
  servicesSubtitle: 'Un ecosistema completo diseñado para marcas que quieren liderar su sector con diseño prémium, automatización y campañas efectivas.',
  whyRaeTitle: 'Por qué los negocios eligen trabajar con nosotros.',
  whyRaeSubtitle: 'Combinamos dirección de arte prémium con ingeniería de conversión y automatización para que tu inversión digital genere un retorno medible.',
  processTitle: 'Un proceso estructurado para construir resultados sólidos.',
  processSubtitle: 'Desde el análisis de tu negocio hasta el lanzamiento y la optimización continua, te acompañamos con claridad en cada paso.',
  resultsTitle: 'Métricas reales para marcas que buscan impacto comercial.',
  resultsSubtitle: 'Cada página web, campaña y automatización que construimos tiene un objetivo claro: generar resultados para tu empresa.',
  ctaTitle: '¿Listo para llevar la presencia digital de tu negocio al siguiente nivel?',
  ctaSubtitle: 'Hablemos de tus metas y diseñemos una solución digital que realmente te ayude a crecer y diferenciarte en el mercado.',
  ctaButtonText: 'Conversar por WhatsApp',
  contactTitle: 'Hagamos grandes cosas juntos.',
  contactSubtitle: 'Completa el formulario o escríbenos directamente. Analizaremos tu proyecto y te responderemos con una propuesta estratégica personalizada.',
  contactBadge: 'Contacto Directo',
};

const initialSiteConfig: SiteConfig = {
  colors: defaultColors,
  hero: defaultHeroConfig,
  sections: defaultSections,
  portfolioItems: portfolioData.map((p) => ({ ...p, visible: true })),
  appsPortal: defaultAppsPortal,
  animations: defaultAnimations,
  sectionTexts: defaultSectionTexts,
};

// ─── Sample seed data (shown if Convex has no records yet) ───────────────────

const seedBusinesses: BusinessAccount[] = [
  {
    id: 'biz-demo-1',
    name: 'Restaurante Gourmet Punta Cana',
    rnc: '131-89472-3',
    ownerName: 'Carlos M. Santana',
    email: 'carlos@restaurantegourmet.do',
    whatsapp: '809 555 1234',
    password: 'demo',
    status: 'trial',
    trialDays: 30,
    trialEndsAt: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000).toISOString(),
    allowedApps: ['invoicing', 'expenses', 'dashboard', 'inventory', 'employees'],
    createdAt: new Date().toISOString(),
    notes: 'Aprobado para prueba de 30 días.',
  },
  {
    id: 'biz-demo-2',
    name: 'Clínica Dental Sonrisas',
    rnc: '101-77823-1',
    ownerName: 'Dra. Patricia Reyes',
    email: 'contacto@sonrisasrd.com',
    whatsapp: '829 444 8899',
    password: 'demo',
    status: 'pending',
    trialDays: 15,
    trialEndsAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    allowedApps: ['invoicing', 'dashboard'],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    notes: 'Esperando aprobación de RAE Admin.',
  },
];

const seedMessages: ContactMessage[] = [
  {
    id: 'msg-01',
    name: 'Alejandro Morales',
    company: 'Distribuidora Morales SRL',
    email: 'alejandro@distribuidoramorales.com',
    whatsapp: '809 812 4433',
    service: 'Diseño de páginas web',
    message: 'Hola equipo de RAE. Necesitamos rediseñar nuestro portal corporativo e integrar un catálogo de productos con botón directo a WhatsApp. ¿Podríamos coordinar una videollamada?',
    status: 'unread',
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: 'msg-02',
    name: 'Lic. Giselle Fernández',
    company: 'Fernández & Asociados Abogados',
    email: 'gfernandez@lexabogados.do',
    whatsapp: '829 332 9901',
    service: 'Automatización para negocios',
    message: 'Buenas tardes. Me interesa automatizar la recepción de consultas de clientes en WhatsApp y conectarlo con un formulario para agendar asesorías legales.',
    status: 'read',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
];

const seedInvoices: InvoiceItem[] = [
  {
    id: 'inv-101',
    businessId: 'biz-demo-1',
    invoiceNumber: 'B01-000001',
    clientName: 'Hotel Las Terrenas SRL',
    clientRnc: '130-99882-1',
    items: [
      { description: 'Catering Buffet Ejecutivo 50 personas', quantity: 1, price: 45000, total: 45000 },
      { description: 'Bebidas artesanales y cócteles', quantity: 50, price: 250, total: 12500 },
    ],
    subtotal: 57500,
    itbis: 10350,
    propinaLegal: 5750,
    total: 73600,
    status: 'paid',
    date: new Date().toISOString().split('T')[0],
  },
];

const seedExpenses: ExpenseItem[] = [
  {
    id: 'exp-101',
    businessId: 'biz-demo-1',
    description: 'Compra de Insumos & Mariscos Frescos',
    category: 'Materia Prima',
    amount: 18400,
    supplier: 'Distribuidora del Caribe',
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: 'exp-102',
    businessId: 'biz-demo-1',
    description: 'Servicio de Electricidad & Gas',
    category: 'Servicios Básicos',
    amount: 9200,
    supplier: 'Distribuidora Eléctrica del Este',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
];

const seedEmployees: EmployeeItem[] = [
  {
    id: 'emp-101',
    businessId: 'biz-demo-1',
    fullName: 'Manuel Almonte',
    position: 'Chef Principal',
    department: 'Cocina',
    salary: 45000,
    phone: '809 333 4455',
    email: 'manuel@restaurantegourmet.do',
    hireDate: '2025-01-15',
    status: 'active',
  },
  {
    id: 'emp-102',
    businessId: 'biz-demo-1',
    fullName: 'Laura Valdez',
    position: 'Encargada de Sala & Reservas',
    department: 'Atención al Cliente',
    salary: 32000,
    phone: '809 777 8899',
    email: 'laura@restaurantegourmet.do',
    hireDate: '2025-03-01',
    status: 'active',
  },
];

const seedInventory: InventoryItem[] = [
  {
    id: 'inv-item-1',
    businessId: 'biz-demo-1',
    name: 'Vino Tinto Reserva Especial',
    sku: 'VIN-RES-01',
    category: 'Bebidas',
    quantity: 48,
    minQuantity: 12,
    costPrice: 650,
    salePrice: 1600,
  },
  {
    id: 'inv-item-2',
    businessId: 'biz-demo-1',
    name: 'Corte de Carne Angus 400g',
    sku: 'CAR-ANG-02',
    category: 'Alimentos',
    quantity: 35,
    minQuantity: 10,
    costPrice: 520,
    salePrice: 1250,
  },
];

// ─── Helper: map Convex doc to local interface ────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapMsg(d: any): ContactMessage {
  return {
    id: d._id as string,
    _convexId: d._id as Id<'contactMessages'>,
    name: d.name,
    company: d.company,
    email: d.email,
    whatsapp: d.whatsapp,
    service: d.service,
    message: d.message,
    status: d.status as ContactMessage['status'],
    createdAt: d.createdAt,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBiz(d: any): BusinessAccount {
  return {
    id: d._id as string,
    _convexId: d._id as Id<'businesses'>,
    name: d.name,
    rnc: d.rnc,
    ownerName: d.ownerName,
    email: d.email,
    whatsapp: d.whatsapp,
    password: d.password,
    status: d.status as BusinessAccount['status'],
    trialDays: d.trialDays,
    trialEndsAt: d.trialEndsAt,
    allowedApps: d.allowedApps,
    createdAt: d.createdAt,
    notes: d.notes,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapInvoice(d: any): InvoiceItem {
  return {
    id: d._id as string,
    _convexId: d._id as Id<'invoices'>,
    businessId: d.businessId,
    invoiceNumber: d.invoiceNumber,
    clientName: d.clientName,
    clientRnc: d.clientRnc,
    clientEmail: d.clientEmail,
    clientPhone: d.clientPhone,
    items: d.items,
    subtotal: d.subtotal,
    itbis: d.itbis,
    propinaLegal: d.propinaLegal,
    total: d.total,
    status: d.status as InvoiceItem['status'],
    date: d.date,
    dueDate: d.dueDate,
    notes: d.notes,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapExpense(d: any): ExpenseItem {
  return {
    id: d._id as string,
    _convexId: d._id as Id<'expenses'>,
    businessId: d.businessId,
    description: d.description,
    category: d.category,
    amount: d.amount,
    supplier: d.supplier,
    date: d.date,
    notes: d.notes,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEmployee(d: any): EmployeeItem {
  return {
    id: d._id as string,
    _convexId: d._id as Id<'employees'>,
    businessId: d.businessId,
    fullName: d.fullName,
    position: d.position,
    department: d.department,
    salary: d.salary,
    phone: d.phone,
    email: d.email,
    hireDate: d.hireDate,
    status: d.status as EmployeeItem['status'],
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapInventory(d: any): InventoryItem {
  return {
    id: d._id as string,
    _convexId: d._id as Id<'inventory'>,
    businessId: d.businessId,
    name: d.name,
    sku: d.sku,
    category: d.category,
    quantity: d.quantity,
    minQuantity: d.minQuantity,
    costPrice: d.costPrice,
    salePrice: d.salePrice,
  };
}

function hexToRgbSpace(hex: string): string {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return `${r} ${g} ${b}`;
  }
  const r = parseInt(clean.substring(0, 2), 16) || 45;
  const g = parseInt(clean.substring(2, 4), 16) || 74;
  const b = parseInt(clean.substring(4, 6), 16) || 255;
  return `${r} ${g} ${b}`;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ── LOCAL config state (synced to Convex siteConfig table) ──────────────
  const [config, setConfig] = useState<SiteConfig>(initialSiteConfig);

  // Active logged-in business (client-side session only)
  const [activeBusiness, setActiveBusiness] = useState<BusinessAccount | null>(null);

  // ── Convex queries (reactive — auto-update on change) ───────────────────
  const convexConfig = useQuery(api.site.getSiteConfig);
  const convexMessages = useQuery(api.site.listContactMessages);
  const convexBusinesses = useQuery(api.businesses.listBusinesses);

  // Operations: only query for active business
  const activeBusinessConvexId = activeBusiness?._convexId ?? activeBusiness?.id ?? '';
  const convexInvoices = useQuery(
    api.operations.listInvoices,
    activeBusinessConvexId ? { businessId: activeBusinessConvexId } : 'skip'
  );
  const convexExpenses = useQuery(
    api.operations.listExpenses,
    activeBusinessConvexId ? { businessId: activeBusinessConvexId } : 'skip'
  );
  const convexEmployees = useQuery(
    api.operations.listEmployees,
    activeBusinessConvexId ? { businessId: activeBusinessConvexId } : 'skip'
  );
  const convexInventory = useQuery(
    api.operations.listInventory,
    activeBusinessConvexId ? { businessId: activeBusinessConvexId } : 'skip'
  );

  // ── Convex mutations ─────────────────────────────────────────────────────
  const mutUpdateSiteConfig = useMutation(api.site.updateSiteConfig);
  const mutSubmitContact = useMutation(api.site.submitContactMessage);
  const mutUpdateMsgStatus = useMutation(api.site.updateMessageStatus);
  const mutDeleteMsg = useMutation(api.site.deleteMessage);
  const mutRegisterBusiness = useMutation(api.businesses.registerBusiness);
  const mutUpdateBizStatus = useMutation(api.businesses.updateBusinessStatus);
  const mutUpdateBizApps = useMutation(api.businesses.updateBusinessApps);
  const mutCreateInvoice = useMutation(api.operations.createInvoice);
  const mutDeleteInvoice = useMutation(api.operations.deleteInvoice);
  const mutCreateExpense = useMutation(api.operations.createExpense);
  const mutDeleteExpense = useMutation(api.operations.deleteExpense);
  const mutCreateEmployee = useMutation(api.operations.createEmployee);
  const mutDeleteEmployee = useMutation(api.operations.deleteEmployee);
  const mutCreateInventory = useMutation(api.operations.createInventoryItem);
  const mutDeleteInventory = useMutation(api.operations.deleteInventoryItem);

  // ── Sync Convex site config → local state ────────────────────────────────
  useEffect(() => {
    if (convexConfig) {
      setConfig({
        colors: convexConfig.colors as SiteConfig['colors'],
        hero: {
          ...convexConfig.hero,
          heroMode: convexConfig.hero.heroMode as SiteConfig['hero']['heroMode'],
        },
        sections: convexConfig.sections as SectionBlock[],
        portfolioItems: (convexConfig.portfolioItems as unknown) as ProjectItem[],
        appsPortal: convexConfig.appsPortal,
        animations: (convexConfig.animations as SiteConfig['animations']) || defaultAnimations,
        sectionTexts: (convexConfig.sectionTexts as SiteConfig['sectionTexts']) || defaultSectionTexts,
      });
    }
  }, [convexConfig]);

  // ── Derived lists from Convex (fall back to seed data while loading) ─────
  const messages: ContactMessage[] = convexMessages
    ? convexMessages.map(mapMsg)
    : seedMessages;

  const businesses: BusinessAccount[] = convexBusinesses
    ? convexBusinesses.map(mapBiz)
    : seedBusinesses;

  // Keep activeBusiness in sync when businesses update from Convex
  useEffect(() => {
    if (activeBusiness && convexBusinesses) {
      const fresh = convexBusinesses.find((b) => b._id === activeBusiness._convexId);
      if (fresh) setActiveBusiness(mapBiz(fresh));
    }
    // Auto-login demo business if Convex has no businesses yet (first load)
    if (activeBusiness === null && convexBusinesses === undefined) {
      setActiveBusiness(seedBusinesses[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convexBusinesses]);

  const invoices: InvoiceItem[] = convexInvoices
    ? convexInvoices.map(mapInvoice)
    : activeBusiness
    ? seedInvoices.filter((i) => i.businessId === activeBusiness.id)
    : [];

  const expenses: ExpenseItem[] = convexExpenses
    ? convexExpenses.map(mapExpense)
    : activeBusiness
    ? seedExpenses.filter((e) => e.businessId === activeBusiness.id)
    : [];

  const employees: EmployeeItem[] = convexEmployees
    ? convexEmployees.map(mapEmployee)
    : activeBusiness
    ? seedEmployees.filter((e) => e.businessId === activeBusiness.id)
    : [];

  const inventory: InventoryItem[] = convexInventory
    ? convexInventory.map(mapInventory)
    : activeBusiness
    ? seedInventory.filter((i) => i.businessId === activeBusiness.id)
    : [];

  const isConvexSynced = convexConfig !== undefined;

  // ── Apply live colors & animation switches to document root ───────────────
  useEffect(() => {
    if (config.colors) {
      if (config.colors.primaryBlue) {
        document.documentElement.style.setProperty('--brand-blue-rgb', hexToRgbSpace(config.colors.primaryBlue));
      }
      if (config.colors.lightBlue) {
        document.documentElement.style.setProperty('--brand-light-rgb', hexToRgbSpace(config.colors.lightBlue));
      }
      if (config.colors.darkNavy) {
        document.documentElement.style.setProperty('--brand-navy-rgb', hexToRgbSpace(config.colors.darkNavy));
      }
    }

    if (config.animations) {
      // Speed → CSS duration variable consumed by all floating/pulse animations
      const durations: Record<string, string> = { slow: '10s', normal: '6s', fast: '3s' };
      document.documentElement.style.setProperty(
        '--float-duration',
        durations[config.animations.speed] ?? '6s'
      );

      if (!config.animations.enableFloating) {
        document.documentElement.classList.add('disable-floating');
      } else {
        document.documentElement.classList.remove('disable-floating');
      }

      if (!config.animations.enableGlows) {
        document.documentElement.classList.add('disable-glows');
      } else {
        document.documentElement.classList.remove('disable-glows');
      }
    }
  }, [config.colors, config.animations]);

  // ── Config mutation helpers ───────────────────────────────────────────────

  const pushConfigUpdate = useCallback(
    async (patch: Partial<{
      colors: SiteConfig['colors'];
      hero: SiteConfig['hero'];
      sections: SectionBlock[];
      portfolioItems: ProjectItem[];
      appsPortal: SiteConfig['appsPortal'];
      animations: SiteConfig['animations'];
      sectionTexts: SiteConfig['sectionTexts'];
    }>) => {
      try {
        await mutUpdateSiteConfig(patch as Parameters<typeof mutUpdateSiteConfig>[0]);
      } catch (e) {
        console.warn('Convex sync error:', e);
      }
    },
    [mutUpdateSiteConfig]
  );

  const updateColors = useCallback((colors: SiteConfig['colors']) => {
    setConfig((prev) => ({ ...prev, colors }));
    pushConfigUpdate({ colors });
  }, [pushConfigUpdate]);

  const updateHero = useCallback((hero: Partial<SiteConfig['hero']>) => {
    setConfig((prev) => {
      const merged = { ...prev.hero, ...hero };
      pushConfigUpdate({ hero: merged });
      return { ...prev, hero: merged };
    });
  }, [pushConfigUpdate]);

  const updateSections = useCallback((sections: SectionBlock[]) => {
    setConfig((prev) => ({ ...prev, sections }));
    pushConfigUpdate({ sections });
  }, [pushConfigUpdate]);

  const toggleSectionVisibility = useCallback((sectionId: string) => {
    setConfig((prev) => {
      const sections = prev.sections.map((s) =>
        s.id === sectionId ? { ...s, visible: !s.visible } : s
      );
      pushConfigUpdate({ sections });
      return { ...prev, sections };
    });
  }, [pushConfigUpdate]);

  const moveSectionOrder = useCallback((sectionId: string, direction: 'up' | 'down') => {
    setConfig((prev) => {
      const sorted = [...prev.sections].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex((s) => s.id === sectionId);
      if (index === -1) return prev;
      if (direction === 'up' && index > 0) {
        const temp = sorted[index].order;
        sorted[index].order = sorted[index - 1].order;
        sorted[index - 1].order = temp;
      } else if (direction === 'down' && index < sorted.length - 1) {
        const temp = sorted[index].order;
        sorted[index].order = sorted[index + 1].order;
        sorted[index + 1].order = temp;
      }
      pushConfigUpdate({ sections: sorted });
      return { ...prev, sections: sorted };
    });
  }, [pushConfigUpdate]);

  const updatePortfolioItems = useCallback((items: ProjectItem[]) => {
    setConfig((prev) => ({ ...prev, portfolioItems: items }));
    pushConfigUpdate({ portfolioItems: items });
  }, [pushConfigUpdate]);

  const updateAppsPortalConfig = useCallback((portal: Partial<SiteConfig['appsPortal']>) => {
    setConfig((prev) => {
      const merged = { ...prev.appsPortal, ...portal };
      pushConfigUpdate({ appsPortal: merged });
      return { ...prev, appsPortal: merged };
    });
  }, [pushConfigUpdate]);

  const updateAnimations = useCallback((anim: Partial<NonNullable<SiteConfig['animations']>>) => {
    setConfig((prev) => {
      const merged = { ...(prev.animations || defaultAnimations), ...anim };
      pushConfigUpdate({ animations: merged });
      return { ...prev, animations: merged };
    });
  }, [pushConfigUpdate]);

  const updateSectionTexts = useCallback((texts: Partial<NonNullable<SiteConfig['sectionTexts']>>) => {
    setConfig((prev) => {
      const merged = { ...(prev.sectionTexts || defaultSectionTexts), ...texts };
      pushConfigUpdate({ sectionTexts: merged });
      return { ...prev, sectionTexts: merged };
    });
  }, [pushConfigUpdate]);

  const resetToDefaults = useCallback(() => {
    setConfig(initialSiteConfig);
    pushConfigUpdate({
      colors: defaultColors,
      hero: defaultHeroConfig,
      sections: defaultSections,
      appsPortal: defaultAppsPortal,
      animations: defaultAnimations,
      sectionTexts: defaultSectionTexts,
    });
  }, [pushConfigUpdate]);

  // ── Messages ─────────────────────────────────────────────────────────────

  const addMessage = useCallback(
    (msg: Omit<ContactMessage, 'id' | 'status' | 'createdAt' | '_convexId'>) => {
      mutSubmitContact(msg).catch(console.error);
    },
    [mutSubmitContact]
  );

  const markMessageStatus = useCallback(
    (id: string, status: ContactMessage['status']) => {
      const found = messages.find((m) => m.id === id);
      const convexId = found?._convexId ?? (id as Id<'contactMessages'>);
      mutUpdateMsgStatus({ id: convexId, status }).catch(console.error);
    },
    [messages, mutUpdateMsgStatus]
  );

  const deleteMessage = useCallback(
    (id: string) => {
      const found = messages.find((m) => m.id === id);
      const convexId = found?._convexId ?? (id as Id<'contactMessages'>);
      mutDeleteMsg({ id: convexId }).catch(console.error);
    },
    [messages, mutDeleteMsg]
  );

  // ── Businesses ───────────────────────────────────────────────────────────

  const registerBusiness = useCallback(
    async (
      bizData: Omit<BusinessAccount, 'id' | 'status' | 'trialDays' | 'trialEndsAt' | 'allowedApps' | 'createdAt' | '_convexId'>
    ): Promise<{ success: boolean; message: string }> => {
      try {
        await mutRegisterBusiness({
          name: bizData.name,
          rnc: bizData.rnc,
          ownerName: bizData.ownerName,
          email: bizData.email,
          whatsapp: bizData.whatsapp,
          password: bizData.password ?? '',
        });
        return {
          success: true,
          message: '¡Registro exitoso! Tu solicitud ha sido enviada al administrador de RAE para su aprobación y asignación de período de prueba.',
        };
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Error desconocido al registrar.';
        return { success: false, message: msg };
      }
    },
    [mutRegisterBusiness]
  );

  const updateBusinessStatus = useCallback(
    (id: string, status: BusinessAccount['status'], trialDays?: number) => {
      const found = businesses.find((b) => b.id === id);
      const convexId = found?._convexId ?? (id as Id<'businesses'>);
      mutUpdateBizStatus({ id: convexId, status, trialDays }).catch(console.error);
    },
    [businesses, mutUpdateBizStatus]
  );

  const updateBusinessApps = useCallback(
    (id: string, allowedApps: string[]) => {
      const found = businesses.find((b) => b.id === id);
      const convexId = found?._convexId ?? (id as Id<'businesses'>);
      mutUpdateBizApps({ id: convexId, allowedApps }).catch(console.error);
    },
    [businesses, mutUpdateBizApps]
  );

  // ── Operations ───────────────────────────────────────────────────────────

  const addInvoice = useCallback(
    (inv: Omit<InvoiceItem, 'id' | '_convexId'>) => {
      mutCreateInvoice({
        businessId: inv.businessId,
        invoiceNumber: inv.invoiceNumber,
        clientName: inv.clientName,
        clientRnc: inv.clientRnc,
        clientEmail: inv.clientEmail,
        clientPhone: inv.clientPhone,
        items: inv.items,
        subtotal: inv.subtotal,
        itbis: inv.itbis,
        propinaLegal: inv.propinaLegal,
        total: inv.total,
        status: inv.status,
        date: inv.date,
        notes: inv.notes,
      }).catch(console.error);
    },
    [mutCreateInvoice]
  );

  const deleteInvoice = useCallback(
    (id: string) => {
      const found = invoices.find((i) => i.id === id);
      const convexId = found?._convexId ?? (id as Id<'invoices'>);
      mutDeleteInvoice({ id: convexId }).catch(console.error);
    },
    [invoices, mutDeleteInvoice]
  );

  const addExpense = useCallback(
    (exp: Omit<ExpenseItem, 'id' | '_convexId'>) => {
      mutCreateExpense({
        businessId: exp.businessId,
        description: exp.description,
        category: exp.category,
        amount: exp.amount,
        supplier: exp.supplier,
        date: exp.date,
        notes: exp.notes,
      }).catch(console.error);
    },
    [mutCreateExpense]
  );

  const deleteExpense = useCallback(
    (id: string) => {
      const found = expenses.find((e) => e.id === id);
      const convexId = found?._convexId ?? (id as Id<'expenses'>);
      mutDeleteExpense({ id: convexId }).catch(console.error);
    },
    [expenses, mutDeleteExpense]
  );

  const addEmployee = useCallback(
    (emp: Omit<EmployeeItem, 'id' | '_convexId'>) => {
      mutCreateEmployee({
        businessId: emp.businessId,
        fullName: emp.fullName,
        position: emp.position,
        department: emp.department,
        salary: emp.salary,
        phone: emp.phone,
        email: emp.email,
        hireDate: emp.hireDate,
        status: emp.status,
      }).catch(console.error);
    },
    [mutCreateEmployee]
  );

  const deleteEmployee = useCallback(
    (id: string) => {
      const found = employees.find((e) => e.id === id);
      const convexId = found?._convexId ?? (id as Id<'employees'>);
      mutDeleteEmployee({ id: convexId }).catch(console.error);
    },
    [employees, mutDeleteEmployee]
  );

  const addInventoryItem = useCallback(
    (item: Omit<InventoryItem, 'id' | '_convexId'>) => {
      mutCreateInventory({
        businessId: item.businessId,
        name: item.name,
        sku: item.sku,
        category: item.category,
        quantity: item.quantity,
        minQuantity: item.minQuantity,
        costPrice: item.costPrice,
        salePrice: item.salePrice,
      }).catch(console.error);
    },
    [mutCreateInventory]
  );

  const deleteInventoryItem = useCallback(
    (id: string) => {
      const found = inventory.find((i) => i.id === id);
      const convexId = found?._convexId ?? (id as Id<'inventory'>);
      mutDeleteInventory({ id: convexId }).catch(console.error);
    },
    [inventory, mutDeleteInventory]
  );

  // ── Business Auth ─────────────────────────────────────────────────────────

  const loginBusiness = useCallback(
    (email: string, password: string): { success: boolean; error?: string } => {
      const biz = businesses.find(
        (b) => b.email.toLowerCase() === email.toLowerCase() && b.password === password
      );
      if (!biz) return { success: false, error: 'Correo o contraseña incorrectos.' };
      if (biz.status === 'pending')
        return { success: false, error: 'Tu cuenta está pendiente de aprobación por el administrador de RAE.' };
      if (biz.status === 'suspended')
        return { success: false, error: 'Tu cuenta ha sido suspendida. Contacta a soporte de RAE Marketing Services.' };
      if (biz.status === 'trial') {
        const now = new Date().getTime();
        const end = new Date(biz.trialEndsAt).getTime();
        if (now > end)
          return { success: false, error: 'Tu período de prueba ha expirado. Por favor contacta al administrador para activar tu plan comercial.' };
      }
      setActiveBusiness(biz);
      return { success: true };
    },
    [businesses]
  );

  const logoutBusiness = useCallback(() => {
    setActiveBusiness(null);
  }, []);

  return (
    <SiteContext.Provider
      value={{
        config,
        updateColors,
        updateHero,
        updateSections,
        toggleSectionVisibility,
        moveSectionOrder,
        updatePortfolioItems,
        updateAppsPortalConfig,
        updateAnimations,
        updateSectionTexts,
        resetToDefaults,
        messages,
        addMessage,
        markMessageStatus,
        deleteMessage,
        businesses,
        registerBusiness,
        updateBusinessStatus,
        updateBusinessApps,
        invoices,
        addInvoice,
        deleteInvoice,
        expenses,
        addExpense,
        deleteExpense,
        employees,
        addEmployee,
        deleteEmployee,
        inventory,
        addInventoryItem,
        deleteInventoryItem,
        activeBusiness,
        loginBusiness,
        logoutBusiness,
        isConvexSynced,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
