import React, { useState } from 'react';
import { 
  X, 
  Receipt, 
  DollarSign, 
  Users, 
  Package, 
  BarChart3, 
  Database, 
  Plus, 
  Trash2, 
  Printer, 
  CheckCircle2, 
  Clock, 
  LogOut, 
  Building2, 
  TrendingUp,
  ArrowDownRight,
  ArrowUpRight
} from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface BusinessPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const BusinessPortalModal: React.FC<BusinessPortalModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const { 
    activeBusiness, 
    loginBusiness, 
    logoutBusiness, 
    registerBusiness,
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
  } = useSite();

  const [authMode, setAuthMode] = useState<'login' | 'register'>(initialMode);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'invoicing' | 'expenses' | 'employees' | 'inventory' | 'vault'>('dashboard');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('carlos@restaurantegourmet.do');
  const [loginPass, setLoginPass] = useState('demo');
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [regData, setRegData] = useState({
    name: '',
    rnc: '',
    ownerName: '',
    email: '',
    whatsapp: '',
    password: '',
  });
  const [regSuccessMessage, setRegSuccessMessage] = useState('');
  const [regError, setRegError] = useState('');

  // Invoice creation state
  const [newInv, setNewInv] = useState({
    clientName: '',
    clientRnc: '',
    clientPhone: '',
    applyItbis: true,
    applyPropina: false,
    items: [
      { description: '', quantity: 1, price: 0 }
    ],
  });
  const [selectedInvoiceToPrint, setSelectedInvoiceToPrint] = useState<any | null>(null);

  // Expense creation state
  const [newExp, setNewExp] = useState({
    description: '',
    category: 'Materia Prima',
    amount: '',
    supplier: '',
    date: new Date().toISOString().split('T')[0],
  });

  // Employee creation state
  const [newEmp, setNewEmp] = useState({
    fullName: '',
    position: '',
    department: 'Operaciones',
    salary: '',
    phone: '',
    email: '',
  });

  // Inventory creation state
  const [newStock, setNewStock] = useState({
    name: '',
    sku: '',
    category: 'General',
    quantity: '',
    minQuantity: '5',
    costPrice: '',
    salePrice: '',
  });

  if (!isOpen) return null;

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = loginBusiness(loginEmail, loginPass);
    if (!res.success) {
      setLoginError(res.error || 'Error al iniciar sesión');
    }
  };

  // Handle Register
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccessMessage('');

    if (!regData.name || !regData.email || !regData.whatsapp) {
      setRegError('Por favor completa todos los campos requeridos.');
      return;
    }

    const res = await registerBusiness(regData);
    if (!res.success) {
      setRegError(res.message);
    } else {
      setRegSuccessMessage(res.message);
      setRegData({
        name: '',
        rnc: '',
        ownerName: '',
        email: '',
        whatsapp: '',
        password: '',
      });
    }
  };

  // Current Business specific data
  const currentBizId = activeBusiness?.id || '';
  const bizInvoices = invoices.filter((i) => i.businessId === currentBizId);
  const bizExpenses = expenses.filter((e) => e.businessId === currentBizId);
  const bizEmployees = employees.filter((e) => e.businessId === currentBizId);
  const bizInventory = inventory.filter((i) => i.businessId === currentBizId);

  // Financial aggregates
  const totalInvoiced = bizInvoices.reduce((acc, curr) => acc + curr.total, 0);
  const totalExpenses = bizExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const netBalance = totalInvoiced - totalExpenses;

  // Add Item to Invoice form
  const handleAddInvoiceItem = () => {
    setNewInv({
      ...newInv,
      items: [...newInv.items, { description: '', quantity: 1, price: 0 }],
    });
  };

  const handleInvoiceItemChange = (index: number, field: string, value: any) => {
    const updated = [...newInv.items];
    updated[index] = { ...updated[index], [field]: value };
    setNewInv({ ...newInv, items: updated });
  };

  const handleRemoveInvoiceItem = (index: number) => {
    if (newInv.items.length <= 1) return;
    setNewInv({
      ...newInv,
      items: newInv.items.filter((_, i) => i !== index),
    });
  };

  const handleCreateInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInv.clientName) return;

    const computedItems = newInv.items.map((item) => ({
      ...item,
      quantity: Number(item.quantity) || 1,
      price: Number(item.price) || 0,
      total: (Number(item.quantity) || 1) * (Number(item.price) || 0),
    }));

    const subtotal = computedItems.reduce((acc, i) => acc + i.total, 0);
    const itbis = newInv.applyItbis ? Math.round(subtotal * 0.18) : 0;
    const propinaLegal = newInv.applyPropina ? Math.round(subtotal * 0.10) : 0;
    const total = subtotal + itbis + propinaLegal;

    addInvoice({
      businessId: currentBizId,
      invoiceNumber: `B01-00000${bizInvoices.length + 1}`,
      clientName: newInv.clientName,
      clientRnc: newInv.clientRnc || 'Consumidor Final',
      clientPhone: newInv.clientPhone,
      items: computedItems,
      subtotal,
      itbis,
      propinaLegal,
      total,
      status: 'paid',
      date: new Date().toISOString().split('T')[0],
    });

    setNewInv({
      clientName: '',
      clientRnc: '',
      clientPhone: '',
      applyItbis: true,
      applyPropina: false,
      items: [{ description: '', quantity: 1, price: 0 }],
    });
  };

  // Check app permission
  const hasAppAccess = (appId: string) => {
    if (!activeBusiness) return false;
    return activeBusiness.allowedApps.includes(appId);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-brand-navy/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="bg-[#0F2D6B] text-white p-4 sm:p-6 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-extrabold flex items-center justify-center text-sm shadow-sm">
              RAE
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-white">
                  RAE Business & Vault System
                </h2>
                <span className="text-[10px] font-bold uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full">
                  Portal de Aplicaciones
                </span>
              </div>
              <p className="text-xs text-blue-200">
                Control estratégico de facturación, stock, gastos y empleados
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {activeBusiness && (
              <button
                type="button"
                onClick={logoutBusiness}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-colors"
                title="Cerrar sesión del negocio"
              >
                <LogOut size={14} />
                <span>Salir</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Cerrar portal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col">
          
          {/* Case 1: NOT LOGGED IN -> Show Login or Registration form */}
          {!activeBusiness ? (
            <div className="max-w-xl mx-auto my-auto p-6 sm:p-10 w-full">
              
              {/* Tabs Switcher */}
              <div className="flex rounded-2xl bg-slate-200/80 p-1 mb-8">
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setRegSuccessMessage(''); }}
                  className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    authMode === 'login' ? 'bg-white text-brand-navy shadow-xs' : 'text-slate-600 hover:text-brand-navy'
                  }`}
                >
                  Entrar a Mi Negocio
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('register'); setLoginError(''); }}
                  className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    authMode === 'register' ? 'bg-white text-brand-navy shadow-xs' : 'text-slate-600 hover:text-brand-navy'
                  }`}
                >
                  Registrar Negocio Gratis
                </button>
              </div>

              {authMode === 'login' ? (
                /* LOGIN FORM */
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle">
                  <h3 className="text-xl font-extrabold text-brand-navy mb-2">
                    Iniciar Sesión en Tu Negocio
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Ingresa con las credenciales asignadas o prueba con el negocio demo.
                  </p>

                  {loginError && (
                    <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                      {loginError}
                    </div>
                  )}

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                        Correo del Negocio
                      </label>
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-brand-blue focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        required
                        value={loginPass}
                        onChange={(e) => setLoginPass(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-brand-blue focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-colors"
                    >
                      Ingresar al Dashboard
                    </button>
                  </form>

                  {/* Demo Helper Box */}
                  <div className="mt-6 p-4 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-brand-navy">
                    <span className="font-bold block mb-1">💡 Credenciales para Demo Rápido:</span>
                    <p className="text-slate-600">Email: <code className="font-bold text-brand-blue">carlos@restaurantegourmet.do</code></p>
                    <p className="text-slate-600">Password: <code className="font-bold text-brand-blue">demo</code> (Negocio en prueba activa)</p>
                  </div>
                </div>
              ) : (
                /* REGISTRATION FORM */
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle">
                  <h3 className="text-xl font-extrabold text-brand-navy mb-2">
                    Registrar Nuevo Negocio
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Completa la información. El administrador de RAE aprobará tu registro y te asignará un período de prueba gratuito de 15 a 30 días.
                  </p>

                  {regError && (
                    <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                      {regError}
                    </div>
                  )}

                  {regSuccessMessage ? (
                    <div className="p-6 text-center bg-emerald-50 rounded-2xl border border-emerald-200">
                      <CheckCircle2 size={36} className="text-emerald-600 mx-auto mb-2" />
                      <h4 className="text-base font-extrabold text-brand-navy mb-2">
                        ¡Solicitud de Registro Enviada!
                      </h4>
                      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                        {regSuccessMessage}
                      </p>
                      <button
                        type="button"
                        onClick={() => { setAuthMode('login'); setRegSuccessMessage(''); }}
                        className="bg-brand-blue text-white text-xs font-bold py-2.5 px-6 rounded-xl"
                      >
                        Ir al Acceso de Negocios
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                            Nombre del Negocio *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ej: Cafetería Central SRL"
                            value={regData.name}
                            onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-blue focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                            RNC / Cédula
                          </label>
                          <input
                            type="text"
                            placeholder="Ej: 131-00000-1"
                            value={regData.rnc}
                            onChange={(e) => setRegData({ ...regData, rnc: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-blue focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                            Propietario / Contacto *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Tu nombre completo"
                            value={regData.ownerName}
                            onChange={(e) => setRegData({ ...regData, ownerName: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-blue focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                            WhatsApp / Teléfono *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="809 000 0000"
                            value={regData.whatsapp}
                            onChange={(e) => setRegData({ ...regData, whatsapp: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-blue focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                          Correo Electrónico *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="contacto@tuempresa.com"
                          value={regData.email}
                          onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-blue focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                          Contraseña de Acceso *
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="Crea una contraseña segura"
                          value={regData.password}
                          onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-blue focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-colors"
                      >
                        Enviar Solicitud de Registro Gratuita
                      </button>
                    </form>
                  )}
                </div>
              )}

            </div>
          ) : (
            /* Case 2: LOGGED IN -> Full Business SaaS Workspace */
            <div className="flex-1 flex flex-col">
              
              {/* Business Status & Trial Banner */}
              <div className="bg-white px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-navy border border-blue-100 flex items-center justify-center font-bold">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-base text-brand-navy">
                        {activeBusiness.name}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        RNC: {activeBusiness.rnc || 'N/A'}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      Propietario: {activeBusiness.ownerName} • {activeBusiness.email}
                    </span>
                  </div>
                </div>

                {/* Status & Trial Period Indicator */}
                <div className="flex items-center gap-3">
                  {activeBusiness.status === 'trial' && (
                    <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-3.5 py-1.5 rounded-full text-xs font-bold">
                      <Clock size={14} className="text-amber-500" />
                      <span>Prueba Asignada: {activeBusiness.trialDays} Días</span>
                    </div>
                  )}

                  {activeBusiness.status === 'active' && (
                    <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                      <CheckCircle2 size={14} />
                      <span>Licencia Activa</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={logoutBusiness}
                    className="sm:hidden text-xs text-rose-600 font-bold px-2 py-1"
                  >
                    Salir
                  </button>
                </div>
              </div>

              {/* Navigation Tabs (Only shows allowed apps assigned by Admin) */}
              <div className="bg-white px-6 border-b border-slate-200 overflow-x-auto flex gap-2">
                
                <button
                  type="button"
                  onClick={() => setActiveTab('dashboard')}
                  className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                    activeTab === 'dashboard'
                      ? 'border-brand-blue text-brand-blue'
                      : 'border-transparent text-slate-500 hover:text-brand-navy'
                  }`}
                >
                  <BarChart3 size={15} />
                  <span>Dashboard Financiero</span>
                </button>

                {hasAppAccess('invoicing') && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('invoicing')}
                    className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                      activeTab === 'invoicing'
                        ? 'border-brand-blue text-brand-blue'
                        : 'border-transparent text-slate-500 hover:text-brand-navy'
                    }`}
                  >
                    <Receipt size={15} />
                    <span>Facturación en PDF</span>
                  </button>
                )}

                {hasAppAccess('expenses') && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('expenses')}
                    className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                      activeTab === 'expenses'
                        ? 'border-brand-blue text-brand-blue'
                        : 'border-transparent text-slate-500 hover:text-brand-navy'
                    }`}
                  >
                    <DollarSign size={15} />
                    <span>Control de Gastos</span>
                  </button>
                )}

                {hasAppAccess('inventory') && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('inventory')}
                    className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                      activeTab === 'inventory'
                        ? 'border-brand-blue text-brand-blue'
                        : 'border-transparent text-slate-500 hover:text-brand-navy'
                    }`}
                  >
                    <Package size={15} />
                    <span>Manejo de Stock</span>
                  </button>
                )}

                {hasAppAccess('employees') && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('employees')}
                    className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                      activeTab === 'employees'
                        ? 'border-brand-blue text-brand-blue'
                        : 'border-transparent text-slate-500 hover:text-brand-navy'
                    }`}
                  >
                    <Users size={15} />
                    <span>Manejo de Empleados</span>
                  </button>
                )}

                {hasAppAccess('vault') && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('vault')}
                    className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                      activeTab === 'vault'
                        ? 'border-brand-blue text-brand-blue'
                        : 'border-transparent text-slate-500 hover:text-brand-navy'
                    }`}
                  >
                    <Database size={15} />
                    <span>Vault & Automatización</span>
                  </button>
                )}

              </div>

              {/* Sub-view Content based on active tab */}
              <div className="p-6 flex-1 overflow-y-auto">
                
                {/* 1. DASHBOARD FINANCIERO */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-6">
                    {/* Metrics Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                            Total Facturado (Entradas)
                          </span>
                          <span className="text-2xl font-extrabold text-emerald-600 font-mono">
                            RD$ {totalInvoiced.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {bizInvoices.length} facturas emitidas
                          </span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <ArrowUpRight size={24} />
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                            Total Gastos (Salidas)
                          </span>
                          <span className="text-2xl font-extrabold text-rose-600 font-mono">
                            RD$ {totalExpenses.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {bizExpenses.length} egresos registrados
                          </span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                          <ArrowDownRight size={24} />
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                            Balance Operativo Neto
                          </span>
                          <span className={`text-2xl font-extrabold font-mono ${netBalance >= 0 ? 'text-brand-blue' : 'text-rose-600'}`}>
                            RD$ {netBalance.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            Margen bruto saludable
                          </span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center">
                          <TrendingUp size={24} />
                        </div>
                      </div>
                    </div>

                    {/* Recent Invoices & Expenses side-by-side */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Recent Invoices */}
                      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-bold text-brand-navy">
                            Últimas Facturas Emitidas
                          </h4>
                          <button
                            onClick={() => setActiveTab('invoicing')}
                            className="text-xs font-bold text-brand-blue hover:underline"
                          >
                            Ver todas
                          </button>
                        </div>
                        {bizInvoices.length === 0 ? (
                          <p className="text-xs text-slate-400 py-6 text-center">No hay facturas emitidas todavía.</p>
                        ) : (
                          <div className="space-y-2.5">
                            {bizInvoices.slice(0, 4).map((inv) => (
                              <div key={inv.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs">
                                <div>
                                  <span className="font-bold text-brand-navy block">{inv.clientName}</span>
                                  <span className="text-[10px] text-slate-400">{inv.invoiceNumber} • {inv.date}</span>
                                </div>
                                <span className="font-mono font-extrabold text-emerald-600">
                                  RD$ {inv.total.toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Recent Expenses */}
                      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-bold text-brand-navy">
                            Últimos Gastos Registrados
                          </h4>
                          <button
                            onClick={() => setActiveTab('expenses')}
                            className="text-xs font-bold text-brand-blue hover:underline"
                          >
                            Ver todos
                          </button>
                        </div>
                        {bizExpenses.length === 0 ? (
                          <p className="text-xs text-slate-400 py-6 text-center">No hay gastos registrados todavía.</p>
                        ) : (
                          <div className="space-y-2.5">
                            {bizExpenses.slice(0, 4).map((exp) => (
                              <div key={exp.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs">
                                <div>
                                  <span className="font-bold text-brand-navy block">{exp.description}</span>
                                  <span className="text-[10px] text-slate-400">{exp.category} • {exp.date}</span>
                                </div>
                                <span className="font-mono font-extrabold text-rose-600">
                                  - RD$ {exp.amount.toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                )}

                {/* 2. FACTURACIÓN EN PDF (Invoicing & Tax compliance) */}
                {activeTab === 'invoicing' && (
                  <div className="space-y-6">
                    {/* Create Invoice Form */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                      <h4 className="text-sm font-bold text-brand-navy mb-4 flex items-center gap-2">
                        <Receipt size={16} className="text-brand-blue" />
                        <span>Nueva Factura Comercial (ITBIS 18% + Propina 10%)</span>
                      </h4>

                      <form onSubmit={handleCreateInvoiceSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Cliente *</label>
                            <input
                              type="text"
                              required
                              placeholder="Nombre del cliente o empresa"
                              value={newInv.clientName}
                              onChange={(e) => setNewInv({ ...newInv, clientName: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">RNC Cliente</label>
                            <input
                              type="text"
                              placeholder="RNC o Cédula fiscal"
                              value={newInv.clientRnc}
                              onChange={(e) => setNewInv({ ...newInv, clientRnc: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Teléfono</label>
                            <input
                              type="tel"
                              placeholder="Teléfono o WhatsApp"
                              value={newInv.clientPhone}
                              onChange={(e) => setNewInv({ ...newInv, clientPhone: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Items rows */}
                        <div className="space-y-2 pt-2">
                          <label className="block text-[11px] font-bold text-slate-600 uppercase">Detalle de Productos / Servicios:</label>
                          {newInv.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <input
                                type="text"
                                required
                                placeholder="Descripción del producto o servicio"
                                value={item.description}
                                onChange={(e) => handleInvoiceItemChange(idx, 'description', e.target.value)}
                                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:outline-none"
                              />
                              <input
                                type="number"
                                min="1"
                                placeholder="Cant."
                                value={item.quantity}
                                onChange={(e) => handleInvoiceItemChange(idx, 'quantity', e.target.value)}
                                className="w-20 px-3 py-2 rounded-xl border border-slate-200 text-xs text-center focus:border-brand-blue focus:outline-none"
                              />
                              <input
                                type="number"
                                min="0"
                                placeholder="Precio RD$"
                                value={item.price || ''}
                                onChange={(e) => handleInvoiceItemChange(idx, 'price', e.target.value)}
                                className="w-28 px-3 py-2 rounded-xl border border-slate-200 text-xs text-right focus:border-brand-blue focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveInvoiceItem(idx)}
                                className="p-2 text-slate-400 hover:text-rose-500 rounded-lg"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={handleAddInvoiceItem}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-blue-700 py-1"
                          >
                            <Plus size={13} />
                            <span>Agregar otra línea</span>
                          </button>
                        </div>

                        {/* Tax Toggles */}
                        <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-100 text-xs">
                          <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                            <input
                              type="checkbox"
                              checked={newInv.applyItbis}
                              onChange={(e) => setNewInv({ ...newInv, applyItbis: e.target.checked })}
                              className="rounded text-brand-blue"
                            />
                            <span>Aplicar ITBIS (18%)</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                            <input
                              type="checkbox"
                              checked={newInv.applyPropina}
                              onChange={(e) => setNewInv({ ...newInv, applyPropina: e.target.checked })}
                              className="rounded text-brand-blue"
                            />
                            <span>Aplicar Propina Legal (10%)</span>
                          </label>

                          <div className="ml-auto">
                            <button
                              type="submit"
                              className="bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs py-2.5 px-6 rounded-xl shadow-xs"
                            >
                              Emitir y Guardar Factura
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>

                    {/* Invoices List */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                      <h4 className="text-sm font-bold text-brand-navy mb-4">
                        Registro de Facturas Emitidas
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px]">
                              <th className="pb-3">No. Factura</th>
                              <th className="pb-3">Cliente</th>
                              <th className="pb-3">Fecha</th>
                              <th className="pb-3 text-right">Subtotal</th>
                              <th className="pb-3 text-right">ITBIS (18%)</th>
                              <th className="pb-3 text-right">Total RD$</th>
                              <th className="pb-3 text-center">Acciones</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {bizInvoices.map((inv) => (
                              <tr key={inv.id} className="hover:bg-slate-50/80">
                                <td className="py-3 font-mono font-bold text-brand-navy">{inv.invoiceNumber}</td>
                                <td className="py-3 font-medium">{inv.clientName}</td>
                                <td className="py-3 text-slate-500">{inv.date}</td>
                                <td className="py-3 text-right font-mono">RD$ {inv.subtotal.toLocaleString()}</td>
                                <td className="py-3 text-right font-mono">RD$ {inv.itbis.toLocaleString()}</td>
                                <td className="py-3 text-right font-mono font-extrabold text-emerald-600">
                                  RD$ {inv.total.toLocaleString()}
                                </td>
                                <td className="py-3 text-center">
                                  <div className="flex items-center justify-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => setSelectedInvoiceToPrint(inv)}
                                      className="p-1.5 text-brand-blue hover:bg-blue-50 rounded-lg"
                                      title="Imprimir / Ver formato PDF"
                                    >
                                      <Printer size={15} />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => deleteInvoice(inv.id)}
                                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                                      title="Eliminar factura"
                                    >
                                      <Trash2 size={15} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                )}

                {/* 3. CONTROL DE GASTOS */}
                {activeTab === 'expenses' && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                      <h4 className="text-sm font-bold text-brand-navy mb-4 flex items-center gap-2">
                        <DollarSign size={16} className="text-rose-500" />
                        <span>Registrar Nuevo Gasto / Salida</span>
                      </h4>

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!newExp.description || !newExp.amount) return;
                          addExpense({
                            businessId: currentBizId,
                            description: newExp.description,
                            category: newExp.category,
                            amount: Number(newExp.amount),
                            supplier: newExp.supplier || 'Proveedor Local',
                            date: newExp.date,
                          });
                          setNewExp({
                            description: '',
                            category: 'Materia Prima',
                            amount: '',
                            supplier: '',
                            date: new Date().toISOString().split('T')[0],
                          });
                        }}
                        className="grid grid-cols-1 sm:grid-cols-4 gap-4"
                      >
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Descripción del Gasto *</label>
                          <input
                            type="text"
                            required
                            placeholder="Ej: Pago de alquiler o insumos"
                            value={newExp.description}
                            onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Categoría</label>
                          <select
                            value={newExp.category}
                            onChange={(e) => setNewExp({ ...newExp, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:outline-none bg-white"
                          >
                            <option value="Materia Prima">Materia Prima</option>
                            <option value="Servicios Básicos">Servicios Básicos</option>
                            <option value="Nómina">Nómina</option>
                            <option value="Publicidad & Marketing">Publicidad & Marketing</option>
                            <option value="Mantenimiento">Mantenimiento</option>
                            <option value="Otro">Otro</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Monto RD$ *</label>
                          <input
                            type="number"
                            required
                            min="1"
                            placeholder="Monto"
                            value={newExp.amount}
                            onChange={(e) => setNewExp({ ...newExp, amount: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-4 flex justify-end">
                          <button
                            type="submit"
                            className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs py-2 px-6 rounded-xl"
                          >
                            Registrar Salida
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Expenses Table */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                      <h4 className="text-sm font-bold text-brand-navy mb-4">
                        Historial de Gastos
                      </h4>
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px]">
                            <th className="pb-3">Descripción</th>
                            <th className="pb-3">Categoría</th>
                            <th className="pb-3">Proveedor</th>
                            <th className="pb-3">Fecha</th>
                            <th className="pb-3 text-right">Monto RD$</th>
                            <th className="pb-3 text-center">Acción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {bizExpenses.map((exp) => (
                            <tr key={exp.id} className="hover:bg-slate-50">
                              <td className="py-3 font-semibold text-brand-navy">{exp.description}</td>
                              <td className="py-3 text-slate-600">{exp.category}</td>
                              <td className="py-3 text-slate-500">{exp.supplier}</td>
                              <td className="py-3 text-slate-400">{exp.date}</td>
                              <td className="py-3 text-right font-mono font-bold text-rose-600">
                                - RD$ {exp.amount.toLocaleString()}
                              </td>
                              <td className="py-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => deleteExpense(exp.id)}
                                  className="text-slate-400 hover:text-rose-600 p-1"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 4. MANEJO DE EMPLEADOS */}
                {activeTab === 'employees' && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                      <h4 className="text-sm font-bold text-brand-navy mb-4 flex items-center gap-2">
                        <Users size={16} className="text-brand-blue" />
                        <span>Agregar Nuevo Empleado</span>
                      </h4>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!newEmp.fullName) return;
                          addEmployee({
                            businessId: currentBizId,
                            fullName: newEmp.fullName,
                            position: newEmp.position || 'Colaborador',
                            department: newEmp.department,
                            salary: Number(newEmp.salary) || 0,
                            phone: newEmp.phone || 'N/A',
                            email: newEmp.email || 'N/A',
                            hireDate: new Date().toISOString().split('T')[0],
                            status: 'active',
                          });
                          setNewEmp({
                            fullName: '',
                            position: '',
                            department: 'Operaciones',
                            salary: '',
                            phone: '',
                            email: '',
                          });
                        }}
                        className="grid grid-cols-1 sm:grid-cols-4 gap-4"
                      >
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Nombre Completo *</label>
                          <input
                            type="text"
                            required
                            placeholder="Nombre del empleado"
                            value={newEmp.fullName}
                            onChange={(e) => setNewEmp({ ...newEmp, fullName: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Cargo / Puesto</label>
                          <input
                            type="text"
                            placeholder="Ej: Encargado de Ventas"
                            value={newEmp.position}
                            onChange={(e) => setNewEmp({ ...newEmp, position: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Salario Mensual RD$</label>
                          <input
                            type="number"
                            placeholder="Salario RD$"
                            value={newEmp.salary}
                            onChange={(e) => setNewEmp({ ...newEmp, salary: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Teléfono</label>
                          <input
                            type="tel"
                            placeholder="Teléfono"
                            value={newEmp.phone}
                            onChange={(e) => setNewEmp({ ...newEmp, phone: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="sm:col-span-4 flex justify-end">
                          <button
                            type="submit"
                            className="bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs py-2 px-6 rounded-xl"
                          >
                            Guardar Empleado
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {bizEmployees.map((emp) => (
                        <div key={emp.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                {emp.status}
                              </span>
                              <button
                                type="button"
                                onClick={() => deleteEmployee(emp.id)}
                                className="text-slate-400 hover:text-rose-600 p-1"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                            <h4 className="font-extrabold text-sm text-brand-navy">{emp.fullName}</h4>
                            <p className="text-xs text-brand-blue font-semibold">{emp.position}</p>
                            <p className="text-[11px] text-slate-500 mt-1">Tel: {emp.phone}</p>
                          </div>
                          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[10px] text-slate-400 uppercase">Salario:</span>
                            <span className="font-mono font-bold text-xs text-brand-navy">RD$ {emp.salary.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. MANEJO DE STOCK */}
                {activeTab === 'inventory' && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                      <h4 className="text-sm font-bold text-brand-navy mb-4 flex items-center gap-2">
                        <Package size={16} className="text-amber-500" />
                        <span>Agregar Producto a Inventario</span>
                      </h4>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!newStock.name) return;
                          addInventoryItem({
                            businessId: currentBizId,
                            name: newStock.name,
                            sku: newStock.sku || `SKU-${Date.now().toString().slice(-4)}`,
                            category: newStock.category,
                            quantity: Number(newStock.quantity) || 0,
                            minQuantity: Number(newStock.minQuantity) || 5,
                            costPrice: Number(newStock.costPrice) || 0,
                            salePrice: Number(newStock.salePrice) || 0,
                          });
                          setNewStock({
                            name: '',
                            sku: '',
                            category: 'General',
                            quantity: '',
                            minQuantity: '5',
                            costPrice: '',
                            salePrice: '',
                          });
                        }}
                        className="grid grid-cols-1 sm:grid-cols-4 gap-4"
                      >
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Nombre del Producto *</label>
                          <input
                            type="text"
                            required
                            placeholder="Nombre del artículo"
                            value={newStock.name}
                            onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Cantidad Inicial *</label>
                          <input
                            type="number"
                            required
                            placeholder="Stock"
                            value={newStock.quantity}
                            onChange={(e) => setNewStock({ ...newStock, quantity: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Precio Venta RD$</label>
                          <input
                            type="number"
                            placeholder="Precio"
                            value={newStock.salePrice}
                            onChange={(e) => setNewStock({ ...newStock, salePrice: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="sm:col-span-4 flex justify-end">
                          <button
                            type="submit"
                            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2 px-6 rounded-xl"
                          >
                            Guardar en Stock
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                      <h4 className="text-sm font-bold text-brand-navy mb-4">Inventario Actual</h4>
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px]">
                            <th className="pb-3">SKU</th>
                            <th className="pb-3">Producto</th>
                            <th className="pb-3 text-center">En Stock</th>
                            <th className="pb-3 text-right">Precio Venta</th>
                            <th className="pb-3 text-center">Acción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {bizInventory.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50">
                              <td className="py-3 font-mono text-slate-400">{item.sku}</td>
                              <td className="py-3 font-bold text-brand-navy">{item.name}</td>
                              <td className="py-3 text-center font-mono font-bold">
                                <span className={`px-2 py-0.5 rounded-full ${item.quantity <= item.minQuantity ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-700'}`}>
                                  {item.quantity} un.
                                </span>
                              </td>
                              <td className="py-3 text-right font-mono font-bold">RD$ {item.salePrice.toLocaleString()}</td>
                              <td className="py-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => deleteInventoryItem(item.id)}
                                  className="text-slate-400 hover:text-rose-600 p-1"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 6. VAULT & AUTOMATIZACIONES */}
                {activeTab === 'vault' && (
                  <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                      <Database size={32} />
                    </div>
                    <h4 className="text-lg font-extrabold text-brand-navy">
                      RAE Vault System Activo
                    </h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                      Tus transacciones, facturas y respaldos operativos se sincronizan en tiempo real con cifrado AES-256 en la nube de RAE Marketing Services y Convex Cloud.
                    </p>
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Conexión Segura Establecida</span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

        </div>

      </div>

      {/* Printable Receipt Modal */}
      {selectedInvoiceToPrint && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedInvoiceToPrint(null)}
        >
          <div 
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-slate-300 text-slate-800 text-xs font-sans print:m-0 print:p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center pb-4 border-b border-slate-200 mb-4">
              <h3 className="font-extrabold text-base text-brand-navy uppercase">{activeBusiness?.name}</h3>
              <p className="text-[10px] text-slate-500">RNC: {activeBusiness?.rnc || '101-00000-0'}</p>
              <p className="text-[10px] text-slate-500">Factura de Crédito Fiscal / Consumo</p>
              <span className="font-mono font-bold text-xs text-brand-blue block mt-1">
                {selectedInvoiceToPrint.invoiceNumber}
              </span>
            </div>

            <div className="mb-4 text-[11px] space-y-1">
              <p><strong>Cliente:</strong> {selectedInvoiceToPrint.clientName}</p>
              <p><strong>RNC:</strong> {selectedInvoiceToPrint.clientRnc}</p>
              <p><strong>Fecha:</strong> {selectedInvoiceToPrint.date}</p>
            </div>

            <table className="w-full text-[11px] mb-4">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase text-[9px]">
                  <th className="text-left pb-1">Desc.</th>
                  <th className="text-center pb-1">Cant.</th>
                  <th className="text-right pb-1">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedInvoiceToPrint.items.map((item: any, i: number) => (
                  <tr key={i}>
                    <td className="py-1.5">{item.description}</td>
                    <td className="py-1.5 text-center">{item.quantity}</td>
                    <td className="py-1.5 text-right font-mono">RD$ {item.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t border-slate-200 pt-2 space-y-1 text-right text-[11px]">
              <p>Subtotal: <span className="font-mono">RD$ {selectedInvoiceToPrint.subtotal.toLocaleString()}</span></p>
              <p>ITBIS (18%): <span className="font-mono">RD$ {selectedInvoiceToPrint.itbis.toLocaleString()}</span></p>
              {selectedInvoiceToPrint.propinaLegal > 0 && (
                <p>Propina Legal (10%): <span className="font-mono">RD$ {selectedInvoiceToPrint.propinaLegal.toLocaleString()}</span></p>
              )}
              <p className="text-sm font-extrabold text-brand-navy pt-1 border-t border-slate-200">
                TOTAL: <span className="font-mono text-emerald-600">RD$ {selectedInvoiceToPrint.total.toLocaleString()}</span>
              </p>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 bg-brand-blue text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                <Printer size={14} />
                <span>Imprimir / Guardar PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedInvoiceToPrint(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-xl text-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
