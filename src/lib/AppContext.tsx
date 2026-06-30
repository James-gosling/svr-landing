/**
 * AppContext — Central state bridge for the SVR Intelligence SPA.
 *
 * MOCK ENDPOINT MARKERS:
 *   - Lead insert:    POST /api/leads           (replace supabase.from('leads').insert)
 *   - Lead fetch:     GET  /api/leads            (replace supabase.from('leads').select)
 *   - Draft generate: POST /api/chat/draft       (replace generateDraft() in this file)
 *   - Chat reply:     POST /api/chat/completion  (replace JARVIS_REPLY constant in ChatView)
 *
 * To swap to a local Express/Fastify server:
 *   1. Replace the supabase calls below with: await fetch('/api/leads', { method:'POST', body: JSON.stringify(lead) })
 *   2. Replace generateDraft() with: await fetch('/api/chat/draft', { method:'POST', body: JSON.stringify({ lead }) })
 */

import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import { supabase } from './supabase';

/* ─── Types ─── */
export type LeadStatus = 'Nuevo' | 'Procesado por J.A.R.V.I.S.' | 'Contacto Pendiente';

export type Lead = {
  id: string;
  created_at: string;
  full_name: string;
  business_email: string;
  company_name: string;
  selected_package: string;
  project_brief: string;
  status: LeadStatus;
  jarvis_draft: string | null;
  _isNew?: boolean; // ephemeral UI flag — not persisted
};

export type MailAlert = {
  id: string;
  from: string;
  subject: string;
  preview: string;
  body: string;
  src: 'Gmail' | 'Outlook';
  priority: 'alta' | 'media' | 'baja';
  time: string;
  read: boolean;
  summary: string[];
  actions: string[];
};

/* ─── Context shape ─── */
type AppCtx = {
  leads: Lead[];
  leadsLoaded: boolean;
  fetchLeads: () => Promise<void>;
  pushLead: (lead: Omit<Lead, 'id' | 'created_at' | 'status' | 'jarvis_draft' | '_isNew'>) => Promise<void>;
  updateLead: (id: string, patch: Partial<Lead>) => void;
  mailAlerts: MailAlert[];
  markMailRead: (id: string) => void;
};

const Ctx = createContext<AppCtx | null>(null);

export function useAppContext() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAppContext must be used inside AppProvider');
  return ctx;
}

/* ─── Pre-populated high-priority mail alerts ─── */
const INITIAL_ALERTS: MailAlert[] = [
  {
    id: 'mail-1',
    from: 'security-alerts@cloudprovider.io',
    subject: 'CRÍTICO: Actividad sospechosa detectada en cuenta AWS',
    preview: 'Se detectaron 14 intentos de acceso fallidos a tu cuenta root desde IP 185.220.x.x...',
    body: 'Se detectaron 14 intentos de acceso fallidos a tu cuenta root desde IP 185.220.101.47 (Tor exit node) entre las 03:14 y 03:28 UTC. El sistema de defensa automática ha bloqueado la IP, pero recomendamos revisar los logs de CloudTrail inmediatamente y activar MFA obligatorio en todas las cuentas privilegiadas.',
    src: 'Gmail',
    priority: 'alta',
    time: 'hace 12m',
    read: false,
    summary: [
      '14 intentos de acceso fallidos desde nodo Tor (185.220.101.47)',
      'IP bloqueada automáticamente por sistema de defensa perimetral',
      'Cuentas root sin MFA activo — riesgo crítico identificado',
      'Período de actividad: 03:14 – 03:28 UTC',
    ],
    actions: ['Activar MFA en todas las cuentas', 'Revisar CloudTrail logs', 'Rotar credenciales IAM', 'Generar reporte de incidente'],
  },
  {
    id: 'mail-2',
    from: 'devops@acme-corp.com',
    subject: 'Re: Propuesta INFRA — Revisión de arquitectura pendiente',
    preview: 'Hola, hemos revisado la propuesta de SVR y tenemos algunas preguntas sobre el timeline...',
    body: 'Hola equipo SVR, hemos revisado la propuesta de endurecimiento de infraestructura y tenemos interés en proceder. Necesitamos claridad sobre: (1) Timeline de implementación, (2) Impacto en uptime durante la migración, (3) Soporte post-implementación incluido. Podemos agendar llamada esta semana.',
    src: 'Outlook',
    priority: 'alta',
    time: 'hace 1h',
    read: false,
    summary: [
      'Cliente ACME Corp interesado en proceder con módulo INFRA',
      '3 preguntas pendientes: timeline, impacto en uptime, soporte post-implementación',
      'Disponibilidad para llamada esta semana confirmada',
    ],
    actions: ['Responder con timeline detallado', 'Preparar SLA de uptime', 'Agendar demo técnica', 'Asignar a J.A.R.V.I.S. para redactar propuesta'],
  },
  {
    id: 'mail-3',
    from: 'noreply@github.com',
    subject: 'Dependabot: 3 vulnerabilidades críticas en svr/core-api',
    preview: 'Se encontraron vulnerabilidades de seguridad en tus dependencias: express@4.18.1, lodash@4.17.20...',
    body: 'Dependabot ha identificado 3 vulnerabilidades críticas (CVE-2024-29041, CVE-2024-28863, CVE-2024-30260) en el repositorio svr/core-api. Las dependencias afectadas son express@4.18.1 (path traversal), lodash@4.17.20 (prototype pollution), y axios@1.6.2 (SSRF). Se recomienda actualizar inmediatamente.',
    src: 'Gmail',
    priority: 'alta',
    time: 'hace 2h',
    read: false,
    summary: [
      '3 CVEs críticos en svr/core-api: path traversal (Express), prototype pollution (Lodash), SSRF (Axios)',
      'Repositorio afectado: svr/core-api (rama: main)',
      'Parches disponibles — actualización directa sin breaking changes',
    ],
    actions: ['Actualizar Express a 4.19.x', 'Actualizar Lodash a 4.17.21', 'Actualizar Axios a 1.7.x', 'Ejecutar npm audit fix'],
  },
  {
    id: 'mail-4',
    from: 'facturacion@digitalocean.com',
    subject: 'Factura #INV-2026-0589 disponible — $847.00 USD',
    preview: 'Tu factura de junio está lista. Resumen: 3x Droplets, 1x Managed DB, 2x Spaces...',
    body: 'Tu factura de junio 2026 está disponible. Desglose: Droplets (3x) $180, Managed PostgreSQL $60, Spaces Object Storage $7, Load Balancer $12, Floating IPs $8. Total antes de créditos: $847.00. Crédito aplicado: -$50.00. Total a cobrar: $797.00 el 1 de julio.',
    src: 'Outlook',
    priority: 'baja',
    time: 'hace 5h',
    read: true,
    summary: [
      'Factura mensual Digital Ocean por $797.00 USD (neto tras créditos)',
      'Componentes: 3 Droplets, PostgreSQL gestionado, almacenamiento S3-compatible',
      'Cargo automático programado para el 1 de julio',
    ],
    actions: ['Revisar desglose de costos', 'Verificar tarjeta de crédito registrada', 'Descargar PDF para contabilidad'],
  },
  {
    id: 'mail-5',
    from: 'alerts@uptimerobot.com',
    subject: 'RESUELTO: svr-api.agency estuvo caído por 3 minutos',
    preview: 'Tu monitor svr-api.agency se recuperó después de un incidente de 3 minutos...',
    body: 'Monitor: svr-api.agency (HTTPS)\nEstado: RECUPERADO\nDuración del incidente: 3 minutos (04:12 – 04:15 UTC)\nCausa probable: timeout de health check post-deploy. El sistema se auto-recuperó. Próxima revisión recomendada del pipeline CI/CD para añadir warm-up period post-deploy.',
    src: 'Gmail',
    priority: 'baja',
    time: 'hace 8h',
    read: true,
    summary: [
      'Incidente resuelto — downtime de 3 minutos en svr-api.agency',
      'Causa probable: timeout de health check post-deploy v3.1.4',
      'Auto-recuperación exitosa sin intervención manual',
    ],
    actions: ['Revisar logs post-deploy', 'Añadir warm-up al pipeline CI/CD', 'Actualizar runbook de incidentes'],
  },
];

/* ─── Draft generator (MOCK: replace with POST /api/chat/draft) ─── */
export function buildJarvisDraft(lead: Lead): string {
  const tier = lead.selected_package.split('—')[0].trim();
  const briefSnippet = lead.project_brief.slice(0, 120) + (lead.project_brief.length > 120 ? '...' : '');
  return `Estimado/a ${lead.full_name},

Gracias por contactar con SVR Intelligence. Hemos analizado detalladamente la descripción de su proyecto en ${lead.company_name} y confirmamos que nuestro módulo **${tier}** responde de manera precisa a sus necesidades operativas y de seguridad.

Basándonos en su brief:
"${briefSnippet}"

Hemos identificado los siguientes vectores de prioridad para su organización:
• Evaluación inicial de la superficie de ataque perimetral
• Revisión de políticas IAM y accesos privilegiados
• Hardening de infraestructura según estándares CIS/NIST
• Configuración de monitoreo continuo con alertas en tiempo real

**Próximos Pasos Sugeridos:**

Le proponemos iniciar con una **sesión de diagnóstico técnico de 90 minutos** — sin costo y sin compromiso — donde mapearemos su infraestructura actual y definiremos el alcance exacto del engagement.

¿Tiene disponibilidad esta semana para una llamada de 30 minutos?

Quedamos a su disposición.

Atentamente,
Equipo SVR Intelligence
intelligence@svr.agency | +1 (555) SVR-INTEL`;
}

/* ─── Provider ─── */
export function AppProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads]           = useState<Lead[]>([]);
  const [leadsLoaded, setLoaded]    = useState(false);
  const [mailAlerts, setMailAlerts] = useState<MailAlert[]>(INITIAL_ALERTS);
  const newLeadIds = useRef<Set<string>>(new Set());

  /* ── GET /api/leads — fetch from Supabase ── */
  const fetchLeads = useCallback(async () => {
    // MOCK ENDPOINT: GET /api/leads
    // Replace with: const res = await fetch('/api/leads'); const data = await res.json();
    const { data } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    const rows = (data ?? []) as Lead[];
    setLeads(rows.map(r => ({
      ...r,
      _isNew: newLeadIds.current.has(r.id),
    })));
    setLoaded(true);
  }, []);

  /* ── POST /api/leads — insert from contact form ──
     Wrapped in try/catch so a network/database failure cannot interrupt the
     parent UI flow (e.g., the Pageclip native form submission). The Supabase
     write is best-effort for the internal CRM mirror; Pageclip is the source of truth. */
  const pushLead = useCallback(async (
    payload: Omit<Lead, 'id' | 'created_at' | 'status' | 'jarvis_draft' | '_isNew'>
  ) => {
    try {
      // MOCK ENDPOINT: POST /api/leads
      // Replace with:
      //   const res = await fetch('/api/leads', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      //   const inserted = await res.json();
      const { data, error } = await supabase
        .from('leads')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.warn('[AppContext] pushLead — Supabase insert failed (non-blocking):', error.message);
        return;
      }

      if (data) {
        const newLead: Lead = {
          ...(data as Lead),
          status: 'Nuevo',
          _isNew: true,
        };
        newLeadIds.current.add(newLead.id);
        setLeads(prev => [newLead, ...prev]);
      }
    } catch (err) {
      // Swallow network errors — the public form must continue regardless.
      console.warn('[AppContext] pushLead — network failure (non-blocking):', err);
    }
  }, []);

  /* ── Optimistic local update (status, draft) ── */
  const updateLead = useCallback((id: string, patch: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...patch } : l));
  }, []);

  /* ── Mail read state ── */
  const markMailRead = useCallback((id: string) => {
    setMailAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  }, []);

  return (
    <Ctx.Provider value={{ leads, leadsLoaded, fetchLeads, pushLead, updateLead, mailAlerts, markMailRead }}>
      {children}
    </Ctx.Provider>
  );
}
