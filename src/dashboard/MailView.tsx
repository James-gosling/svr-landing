/**
 * MailView — SVR Mail & Alert Matrix
 *
 * MOCK ENDPOINTS:
 *   - Alert list:  GET  /api/mail/alerts     → replaced by useAppContext().mailAlerts
 *   - Mark read:   PUT  /api/mail/alerts/:id → replaced by useAppContext().markMailRead
 *   - AI summary:  POST /api/chat/summarize  → currently pre-computed in AppContext INITIAL_ALERTS
 *
 * To connect to live feeds:
 *   1. Replace useAppContext().mailAlerts with a fetch('/api/mail/alerts') call inside a useEffect
 *   2. Replace markMailRead() with fetch(`/api/mail/alerts/${id}`, { method:'PUT', body: JSON.stringify({ read:true }) })
 *   3. For AI summaries: fetch('/api/chat/summarize', { method:'POST', body: JSON.stringify({ body: alert.body }) })
 */

import { useState } from 'react';
import { Mail, AlertTriangle, CheckCircle, X, Bot, ChevronRight, Inbox, Zap } from 'lucide-react';
import { useAppContext, type MailAlert } from '../lib/AppContext';

type AlertPriority = 'alta' | 'media' | 'baja';

const PRIORITY_STYLES: Record<AlertPriority, { border: string; icon: React.ElementType; iconColor: string }> = {
  alta:  { border: 'rgba(248,113,113,0.3)',  icon: AlertTriangle, iconColor: '#f87171' },
  media: { border: 'rgba(251,191,36,0.3)',   icon: Mail,          iconColor: '#fbbf24' },
  baja:  { border: 'rgba(100,116,139,0.25)', icon: CheckCircle,   iconColor: '#64748b' },
};

const SRC_COLORS = { Gmail: '#ef4444', Outlook: '#3b82f6' };

export default function MailView() {
  // MOCK ENDPOINT: GET /api/mail/alerts — sourced from AppContext
  const { mailAlerts, markMailRead } = useAppContext();
  const [selected, setSelected] = useState<MailAlert | null>(null);

  const unread = mailAlerts.filter(a => !a.read).length;

  const open = (a: MailAlert) => {
    setSelected(a);
    // MOCK ENDPOINT: PUT /api/mail/alerts/:id
    markMailRead(a.id);
  };

  return (
    <div className="flex h-full">
      {/* ── Alert list ── */}
      <div
        className={`flex flex-col ${selected ? 'hidden lg:flex' : 'flex'} w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 border-r overflow-hidden`}
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0"
          style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(3,7,18,0.4)' }}>
          <div className="flex items-center gap-2.5">
            <Inbox className="w-4 h-4 text-sky-700" />
            <div>
              <h2 className="text-sm font-bold text-white">Alertas & Mail</h2>
              <p className="font-mono-tech text-[9px] text-slate-600 uppercase tracking-widest">
                {unread > 0
                  ? <span style={{ color: '#f87171' }}>{unread} sin leer</span>
                  : 'Todo leído'}
              </p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <div className="px-2 py-1 rounded font-mono-tech text-[9px] text-red-400 uppercase tracking-widest"
              style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}>Gmail</div>
            <div className="px-2 py-1 rounded font-mono-tech text-[9px] text-blue-400 uppercase tracking-widest"
              style={{ background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.2)' }}>Outlook</div>
          </div>
        </div>

        {/* Alert items */}
        <div className="flex-1 overflow-y-auto">
          {mailAlerts.map(a => {
            const p = PRIORITY_STYLES[a.priority as AlertPriority];
            const PIcon = p.icon;
            const isSelected = selected?.id === a.id;
            return (
              <div
                key={a.id}
                onClick={() => open(a)}
                className="px-5 py-4 border-b cursor-pointer transition-all duration-200"
                style={{
                  borderColor: 'rgba(255,255,255,0.04)',
                  background: isSelected
                    ? 'rgba(125,211,252,0.05)'
                    : a.read ? 'transparent' : 'rgba(255,255,255,0.02)',
                }}
                onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.035)'; }}
                onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = a.read ? 'transparent' : 'rgba(255,255,255,0.02)'; }}
              >
                <div className="flex items-start gap-3">
                  <PIcon className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: p.iconColor }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {!a.read && <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />}
                      <span className="font-mono-tech text-[9px] tracking-widest" style={{ color: SRC_COLORS[a.src] }}>{a.src}</span>
                      <span className="font-mono-tech text-[9px] text-slate-700 ml-auto shrink-0">{a.time}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200 leading-snug mb-1 truncate">{a.subject}</p>
                    <p className="text-xs text-slate-600 truncate">{a.preview}</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-700 shrink-0 mt-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Detail panel ── */}
      {selected ? (
        <div className="flex-1 flex flex-col overflow-hidden"
          style={{ animation: 'fadeInPanel 0.2s ease' }}>
          <style>{`@keyframes fadeInPanel { from { opacity:0; transform:translateX(8px); } to { opacity:1; transform:none; } }`}</style>

          {/* Panel header */}
          <div className="flex items-start justify-between px-6 py-4 border-b flex-shrink-0"
            style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(3,7,18,0.4)' }}>
            <div className="flex-1 min-w-0 pr-4">
              <p className="text-sm font-bold text-white leading-snug">{selected.subject}</p>
              <p className="font-mono-tech text-[10px] text-slate-600 mt-1 truncate">{selected.from}</p>
            </div>
            <button onClick={() => setSelected(null)} className="text-slate-600 hover:text-sky-400 transition-colors shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {/* Raw email body */}
            <div className="p-4 rounded-xl text-sm text-slate-400 leading-relaxed whitespace-pre-wrap"
              style={{ background: 'rgba(7,15,40,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="font-mono-tech text-[9px] text-slate-700 uppercase tracking-widest mb-3">Contenido del Mensaje</p>
              {selected.body}
            </div>

            {/* JARVIS executive summary */}
            <div className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(7,15,40,0.7)', border: '1px solid rgba(99,102,241,0.2)', boxShadow: '0 0 30px rgba(99,102,241,0.06)' }}>
              <div className="flex items-center gap-2.5 px-4 py-3 border-b"
                style={{ borderColor: 'rgba(99,102,241,0.15)', background: 'rgba(99,102,241,0.06)' }}>
                <Bot className="w-4 h-4 text-sky-400" style={{ filter: 'drop-shadow(0 0 6px rgba(99,102,241,0.5))' }} />
                {/* MOCK ENDPOINT: POST /api/chat/summarize */}
                <span className="font-mono-tech text-[10px] text-sky-700 uppercase tracking-widest">
                  Resumen Ejecutivo — J.A.R.V.I.S.
                </span>
                <Zap className="w-3 h-3 text-sky-900 ml-auto" />
              </div>
              <div className="px-4 py-4">
                <ul className="space-y-2.5">
                  {selected.summary.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5"
                      style={{ animation: `fadeInPanel 0.25s ease ${i * 0.06}s both` }}>
                      <span className="font-mono-tech text-[10px] text-sky-800 mt-0.5 shrink-0">{String(i+1).padStart(2,'0')}.</span>
                      <span className="text-sm text-slate-300 leading-snug">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick actions */}
            <div>
              <p className="font-mono-tech text-[9px] text-slate-700 uppercase tracking-widest mb-3">
                Acciones Recomendadas por J.A.R.V.I.S.
              </p>
              <div className="flex flex-col gap-2">
                {selected.actions.map((action, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      animation: `fadeInPanel 0.25s ease ${(i + selected.summary.length) * 0.05}s both`,
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget;
                      el.style.borderColor = 'rgba(125,211,252,0.2)';
                      el.style.background  = 'rgba(125,211,252,0.04)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget;
                      el.style.borderColor = 'rgba(255,255,255,0.06)';
                      el.style.background  = 'rgba(255,255,255,0.03)';
                    }}
                  >
                    <span className="font-mono-tech text-[10px] text-sky-800 group-hover:text-sky-600 transition-colors shrink-0">
                      [{String(i+1).padStart(2,'0')}]
                    </span>
                    <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">{action}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-sky-400 transition-colors ml-auto shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 hidden lg:flex items-center justify-center flex-col gap-3">
          <Inbox className="w-12 h-12 text-slate-800" />
          <p className="font-mono-tech text-xs text-slate-700 uppercase tracking-widest">
            Selecciona una alerta para ver el análisis
          </p>
          {unread > 0 && (
            <p className="font-mono-tech text-[10px] text-red-800 uppercase tracking-widest">
              {unread} alerta{unread !== 1 ? 's' : ''} sin leer
            </p>
          )}
        </div>
      )}
    </div>
  );
}
