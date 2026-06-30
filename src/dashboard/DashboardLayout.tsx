import { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import {
  Bot, LayoutGrid, Terminal, Mail,
  Shield, ChevronLeft, Menu, X, Activity, Cpu,
} from 'lucide-react';
import ChatView from './ChatView';
import CrmView from './CrmView';
import TelemetryView from './TelemetryView';
import MailView from './MailView';

const NAV_ITEMS = [
  { path: 'chat',      label: 'IA Comando',      sub: 'J.A.R.V.I.S. Chat',    icon: Bot },
  { path: 'crm',       label: 'CRM & Leads',     sub: 'Hub de Clientes',       icon: LayoutGrid },
  { path: 'telemetry', label: 'Telemetría',       sub: 'Shell & Logs',          icon: Terminal },
  { path: 'mail',      label: 'Alertas & Mail',   sub: 'Matriz de Mensajes',    icon: Mail },
];

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#020617' }}>

      {/* ── Sidebar ── */}
      <aside
        className="flex-shrink-0 flex flex-col transition-all duration-300 relative z-30"
        style={{
          width: collapsed ? 64 : 240,
          background: 'rgba(3,7,18,0.95)',
          borderRight: '1px solid rgba(125,211,252,0.08)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(125,211,252,0.4), transparent)' }} />

        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b flex-shrink-0"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <div className="relative shrink-0">
            <Shield className="w-6 h-6 text-sky-400"
              style={{ filter: 'drop-shadow(0 0 8px rgba(125,211,252,0.5))' }} />
            <span className="absolute inset-0 rounded-full blur-sm bg-sky-500/15" />
          </div>
          {!collapsed && (
            <div className="leading-none min-w-0">
              <div className="text-sm font-black tracking-widest text-white">SVR<span className="text-sky-400">.</span></div>
              <div className="font-mono-tech text-[8px] text-sky-900 tracking-widest uppercase">Command Center</div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(c => !c)}
            className="ml-auto shrink-0 text-slate-600 hover:text-sky-400 transition-colors hidden lg:block"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Status chip */}
        {!collapsed && (
          <div className="mx-3 mt-3 flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{ background: 'rgba(125,211,252,0.04)', border: '1px solid rgba(125,211,252,0.08)' }}>
            <Activity className="w-3 h-3 text-sky-700 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="font-mono-tech text-[9px] text-sky-800 tracking-widest uppercase truncate">JARVIS ONLINE</div>
              <div className="font-mono-tech text-[8px] text-sky-900/60">Model: AGENTIC.v3.1</div>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse shrink-0" />
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ path, label, sub, icon: Icon }) => (
            <NavLink
              key={path}
              to={`/jarvis/${path}`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'text-sky-300'
                    : 'text-slate-500 hover:text-slate-300'
                }`
              }
              style={({ isActive }) => isActive ? {
                background: 'rgba(125,211,252,0.08)',
                border: '1px solid rgba(125,211,252,0.15)',
                boxShadow: '0 0 20px rgba(125,211,252,0.05)',
              } : {
                border: '1px solid transparent',
              }}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && (
                <div className="min-w-0">
                  <div className="text-xs font-semibold truncate">{label}</div>
                  <div className="font-mono-tech text-[9px] text-slate-600 truncate group-hover:text-slate-500 transition-colors">{sub}</div>
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Back to site */}
        <div className="p-3 border-t flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <button
            onClick={() => navigate('/')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg font-mono-tech text-[10px] text-slate-600 hover:text-sky-400 transition-colors uppercase tracking-widest ${collapsed ? 'justify-center' : ''}`}
            style={{ border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <ChevronLeft className="w-3 h-3 shrink-0" />
            {!collapsed && 'Volver al Sitio'}
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-6 h-16 flex-shrink-0"
          style={{
            background: 'rgba(2,6,23,0.8)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(o => !o)}
            className="lg:hidden text-slate-500 hover:text-sky-400 transition-colors">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Cpu className="w-4 h-4 text-sky-700 hidden sm:block" />
          <span className="font-mono-tech text-[10px] text-sky-800 uppercase tracking-widest hidden sm:block">
            SVR Intelligence · Operational Core
          </span>

          <div className="ml-auto flex items-center gap-3">
            {/* Live indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded"
              style={{ background: 'rgba(125,211,252,0.04)', border: '1px solid rgba(125,211,252,0.1)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="font-mono-tech text-[9px] text-sky-800 uppercase tracking-widest">Sistema Activo</span>
            </div>
          </div>
        </header>

        {/* Panel */}
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route index element={<ChatView />} />
            <Route path="chat" element={<ChatView />} />
            <Route path="crm" element={<CrmView />} />
            <Route path="telemetry" element={<TelemetryView />} />
            <Route path="mail" element={<MailView />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
