/**
 * CrmView — SVR CRM & Leads Hub
 *
 * MOCK ENDPOINTS:
 *   - Lead list:      GET  /api/leads             → replaced by useAppContext().leads
 *   - Status update:  PUT  /api/leads/:id         → replaced by supabase.from('leads').update()
 *   - Draft generate: POST /api/chat/draft        → replaced by buildJarvisDraft() + typing simulation
 *
 * To swap to local server, replace supabase calls with fetch('/api/leads/:id', { method:'PUT', ... })
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  RefreshCw, Eye, Bot, Mail, ChevronRight,
  X, User, Building2, Layers, Clock, Zap,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAppContext, buildJarvisDraft, type Lead, type LeadStatus } from '../lib/AppContext';

type StatusKey = LeadStatus;

const STATUS_STYLES: Record<StatusKey, { bg: string; border: string; text: string }> = {
  'Nuevo':                       { bg: 'rgba(125,211,252,0.07)', border: 'rgba(125,211,252,0.3)', text: '#7dd3fc' },
  'Procesado por J.A.R.V.I.S.': { bg: 'rgba(99,102,241,0.07)',  border: 'rgba(99,102,241,0.3)',  text: '#818cf8' },
  'Contacto Pendiente':          { bg: 'rgba(251,191,36,0.07)',  border: 'rgba(251,191,36,0.3)',  text: '#fbbf24' },
};

function statusStyle(s: string) {
  return STATUS_STYLES[s as StatusKey] ?? { bg: 'rgba(100,116,139,0.07)', border: 'rgba(100,116,139,0.3)', text: '#94a3b8' };
}

function StatusBadge({ status, isNew }: { status: string; isNew?: boolean }) {
  if (isNew) {
    return (
      <span
        className="font-mono-tech text-[9px] px-2 py-1 rounded-lg tracking-widest uppercase animate-pulse"
        style={{ background: 'rgba(125,211,252,0.12)', border: '1px solid rgba(125,211,252,0.5)', color: '#7dd3fc', boxShadow: '0 0 12px rgba(125,211,252,0.2)' }}
      >
        [ NUEVO ]
      </span>
    );
  }
  const s = statusStyle(status);
  return (
    <span className="font-mono-tech text-[9px] px-2 py-1 rounded-lg tracking-widest uppercase"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}>
      {status}
    </span>
  );
}

function TierBadge({ pkg }: { pkg: string }) {
  const tier = pkg.includes('ELITE') ? 'ELITE' : pkg.includes('INFRA') ? 'INFRA' : 'CORE';
  const colors = {
    ELITE: { text: '#818cf8', border: 'rgba(99,102,241,0.3)' },
    INFRA: { text: '#7dd3fc', border: 'rgba(125,211,252,0.3)' },
    CORE:  { text: '#94a3b8', border: 'rgba(148,163,184,0.3)' },
  }[tier];
  return (
    <span className="font-mono-tech text-[9px] px-2 py-1 rounded tracking-widest"
      style={{ color: colors.text, border: `1px solid ${colors.border}` }}>
      {tier}
    </span>
  );
}

/* ─── Typing-effect hook ─── */
function useTypingEffect(target: string, active: boolean, speedMs = 14) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    if (!active || !target) return;
    setDisplayed('');
    setDone(false);
    idx.current = 0;

    const tick = setInterval(() => {
      idx.current += 3; // advance 3 chars per tick for perceived speed
      setDisplayed(target.slice(0, idx.current));
      if (idx.current >= target.length) {
        clearInterval(tick);
        setDisplayed(target);
        setDone(true);
      }
    }, speedMs);

    return () => clearInterval(tick);
  }, [target, active, speedMs]);

  return { displayed, done };
}

export default function CrmView() {
  const { leads, leadsLoaded, fetchLeads, updateLead } = useAppContext();
  const [selected, setSelected]         = useState<Lead | null>(null);
  const [generating, setGenerating]     = useState(false);
  const [draftTarget, setDraftTarget]   = useState('');
  const [draftActive, setDraftActive]   = useState(false);
  const [editedDraft, setEditedDraft]   = useState('');
  const [copied, setCopied]             = useState(false);
  const [refreshing, setRefreshing]     = useState(false);

  const { displayed: typedDraft, done: typingDone } = useTypingEffect(draftTarget, draftActive);

  /* Load leads on mount if not yet fetched */
  useEffect(() => {
    if (!leadsLoaded) fetchLeads();
  }, [leadsLoaded, fetchLeads]);

  /* Sync typed draft into editable field once complete */
  useEffect(() => {
    if (typingDone && draftTarget) setEditedDraft(draftTarget);
  }, [typingDone, draftTarget]);

  const refresh = async () => {
    setRefreshing(true);
    await fetchLeads();
    setRefreshing(false);
  };

  const openLead = (lead: Lead) => {
    setSelected(lead);
    setDraftTarget('');
    setDraftActive(false);
    setEditedDraft(lead.jarvis_draft ?? '');
    setGenerating(false);
    setCopied(false);
  };

  /* ── MOCK ENDPOINT: POST /api/chat/draft ── */
  const generateResponse = useCallback(async () => {
    if (!selected) return;
    setGenerating(true);
    setDraftTarget('');
    setDraftActive(false);

    // Simulate J.A.R.V.I.S. processing delay (1.6s)
    await new Promise(r => setTimeout(r, 1600));

    // MOCK: buildJarvisDraft() → replace with:
    //   const res = await fetch('/api/chat/draft', { method:'POST', body: JSON.stringify({ lead: selected }) });
    //   const { draft } = await res.json();
    const draft = buildJarvisDraft(selected);

    setGenerating(false);
    setDraftTarget(draft);
    setDraftActive(true);

    // Persist asynchronously — MOCK ENDPOINT: PUT /api/leads/:id
    // Replace with: await fetch(`/api/leads/${selected.id}`, { method:'PUT', body: JSON.stringify({ jarvis_draft: draft, status: 'Procesado por J.A.R.V.I.S.' }) })
    const patch: Partial<Lead> = { jarvis_draft: draft, status: 'Procesado por J.A.R.V.I.S.' };
    supabase.from('leads').update(patch).eq('id', selected.id).then(() => {});
    updateLead(selected.id, patch);
    setSelected(prev => prev ? { ...prev, ...patch } : prev);
  }, [selected, updateLead]);

  const copyDraft = () => {
    const text = typingDone ? editedDraft : typedDraft;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateStatus = async (id: string, status: LeadStatus) => {
    // MOCK ENDPOINT: PUT /api/leads/:id
    await supabase.from('leads').update({ status }).eq('id', id);
    updateLead(id, { status });
    if (selected?.id === id) setSelected(p => p ? { ...p, status } : p);
  };

  const visibleDraft = typingDone ? editedDraft : typedDraft;

  return (
    <div className="flex h-full">
      {/* ── Lead list ── */}
      <div className={`flex flex-col ${selected ? 'hidden lg:flex' : 'flex'} flex-1 min-w-0 overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
          style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(3,7,18,0.4)' }}>
          <div>
            <h2 className="text-sm font-bold text-white">CRM & Leads Hub</h2>
            <p className="font-mono-tech text-[9px] text-slate-600 uppercase tracking-widest mt-0.5">
              {leads.length} lead{leads.length !== 1 ? 's' : ''} registrado{leads.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button onClick={refresh} disabled={refreshing}
            className="btn-quantum-ghost flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono-tech text-[10px] uppercase tracking-widest disabled:opacity-40">
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Actualizar
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto px-6 py-4">
          {!leadsLoaded ? (
            <div className="space-y-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-16 rounded-xl animate-pulse"
                  style={{ background: 'rgba(255,255,255,0.03)' }} />
              ))}
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Layers className="w-10 h-10 text-slate-800 mb-3" />
              <p className="font-mono-tech text-xs text-slate-700 uppercase tracking-widest">Sin leads aún</p>
              <p className="text-xs text-slate-700 mt-1">Envía una solicitud desde el formulario público para verla aquí</p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Column headers */}
              <div className="grid grid-cols-[1fr_1fr_auto_auto_auto] gap-4 px-4 pb-2">
                {['Cliente', 'Empresa', 'Tier', 'Estado', ''].map(h => (
                  <span key={h} className="font-mono-tech text-[9px] text-slate-700 uppercase tracking-widest">{h}</span>
                ))}
              </div>

              {leads.map(lead => (
                <div
                  key={lead.id}
                  onClick={() => openLead(lead)}
                  className="grid grid-cols-[1fr_1fr_auto_auto_auto] gap-4 items-center px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 group"
                  style={{
                    background: selected?.id === lead.id ? 'rgba(125,211,252,0.06)' : 'rgba(255,255,255,0.02)',
                    border: selected?.id === lead.id ? '1px solid rgba(125,211,252,0.2)' : '1px solid rgba(255,255,255,0.05)',
                  }}
                  onMouseEnter={e => {
                    if (selected?.id !== lead.id)
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                  }}
                  onMouseLeave={e => {
                    if (selected?.id !== lead.id)
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                  }}
                >
                  <div className="min-w-0 flex items-center gap-2">
                    {lead._isNew && <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0 animate-pulse" />}
                    <div className="min-w-0">
                      <p className="text-sm text-slate-200 truncate">{lead.full_name}</p>
                      <p className="font-mono-tech text-[9px] text-slate-600 truncate">{lead.business_email}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{lead.company_name}</p>
                  <TierBadge pkg={lead.selected_package} />
                  <StatusBadge status={lead.status} isNew={lead._isNew && lead.status === 'Nuevo'} />
                  <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-sky-400 transition-colors" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Detail panel ── */}
      {selected && (
        <div
          className="w-full lg:w-[440px] xl:w-[500px] flex flex-col border-l overflow-hidden flex-shrink-0"
          style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(5,10,25,0.6)' }}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div>
              <p className="text-sm font-bold text-white">{selected.full_name}</p>
              <p className="font-mono-tech text-[9px] text-slate-600 mt-0.5 uppercase tracking-widest">{selected.company_name}</p>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-slate-700" />
              <button onClick={() => setSelected(null)} className="text-slate-600 hover:text-sky-400 transition-colors ml-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {/* Meta */}
            <div className="space-y-2">
              {[
                { icon: User,      label: 'Nombre',    value: selected.full_name },
                { icon: Mail,      label: 'Email',     value: selected.business_email },
                { icon: Building2, label: 'Empresa',   value: selected.company_name },
                { icon: Layers,    label: 'Paquete',   value: selected.selected_package },
                { icon: Clock,     label: 'Recibido',  value: new Date(selected.created_at).toLocaleString('es') },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <Icon className="w-3.5 h-3.5 text-slate-700 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-mono-tech text-[9px] text-slate-700 uppercase tracking-widest">{label}</p>
                    <p className="text-xs text-slate-300 break-all">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Brief */}
            <div className="p-3 rounded-xl text-xs text-slate-400 leading-relaxed"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="font-mono-tech text-[9px] text-slate-700 uppercase tracking-widest mb-2">Brief del Proyecto</p>
              {selected.project_brief}
            </div>

            {/* Status selector */}
            <div>
              <p className="font-mono-tech text-[9px] text-slate-700 uppercase tracking-widest mb-2">Estado</p>
              <div className="flex flex-wrap gap-2">
                {(['Nuevo', 'Procesado por J.A.R.V.I.S.', 'Contacto Pendiente'] as LeadStatus[]).map(s => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected.id, s)}
                    className="font-mono-tech text-[9px] px-2.5 py-1.5 rounded-lg tracking-widest uppercase transition-all duration-200"
                    style={selected.status === s
                      ? { background: statusStyle(s).bg, border: `1px solid ${statusStyle(s).border}`, color: statusStyle(s).text }
                      : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#475569' }
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* JARVIS draft */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-mono-tech text-[9px] text-slate-700 uppercase tracking-widest flex items-center gap-1.5">
                  <Bot className="w-3 h-3 text-sky-600" /> Borrador J.A.R.V.I.S.
                </p>
                <div className="flex items-center gap-3">
                  {!typingDone && draftActive && (
                    <span className="font-mono-tech text-[9px] text-sky-700 uppercase tracking-widest animate-pulse flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5" /> Generando...
                    </span>
                  )}
                  {(typingDone || !!selected.jarvis_draft) && visibleDraft && (
                    <button onClick={copyDraft}
                      className="font-mono-tech text-[9px] text-sky-600 hover:text-sky-300 uppercase tracking-widest transition-colors">
                      {copied ? 'Copiado' : 'Copiar'}
                    </button>
                  )}
                </div>
              </div>

              {/* No draft yet — show generate button */}
              {!draftTarget && !generating && !selected.jarvis_draft && (
                <button
                  onClick={generateResponse}
                  className="btn-quantum-primary w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-mono-tech text-[10px] uppercase tracking-widest"
                >
                  <Bot className="w-3.5 h-3.5" />
                  Generar Respuesta con J.A.R.V.I.S.
                </button>
              )}

              {/* Processing skeleton */}
              {generating && (
                <div className="space-y-2 p-4 rounded-xl"
                  style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Bot className="w-4 h-4 text-sky-600 animate-pulse" />
                    <span className="font-mono-tech text-[10px] text-sky-700 uppercase tracking-widest">Analizando brief del cliente...</span>
                  </div>
                  {[100, 80, 90, 60].map((w, i) => (
                    <div key={i} className="h-2.5 rounded-full animate-pulse"
                      style={{ width: `${w}%`, background: 'rgba(255,255,255,0.06)', animationDelay: `${i * 0.12}s` }} />
                  ))}
                </div>
              )}

              {/* Typing or completed draft */}
              {(draftActive || !!selected.jarvis_draft) && !generating && (
                <div className="relative">
                  <textarea
                    value={visibleDraft}
                    onChange={e => { if (typingDone) setEditedDraft(e.target.value); }}
                    readOnly={!typingDone}
                    rows={12}
                    className="w-full text-xs text-slate-300 leading-relaxed p-3 rounded-xl resize-none outline-none font-mono-tech"
                    style={{ background: 'rgba(5,10,30,0.7)', border: '1px solid rgba(255,255,255,0.07)' }}
                  />
                  {/* Blinking cursor while typing */}
                  {!typingDone && draftActive && (
                    <span className="inline-block w-1.5 h-3 bg-sky-400 ml-0.5 absolute"
                      style={{ animation: 'coord-blink 0.7s step-end infinite', bottom: 16, right: 16 }} />
                  )}
                </div>
              )}

              {/* Re-generate after completion */}
              {typingDone && (
                <button
                  onClick={generateResponse}
                  className="mt-2 w-full font-mono-tech text-[9px] text-slate-600 hover:text-sky-400 py-1.5 rounded-lg uppercase tracking-widest transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  Regenerar con J.A.R.V.I.S.
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
