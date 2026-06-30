import { useState, FormEvent } from 'react';
import {
  Send, CheckCircle, AlertCircle, Loader2,
  Mail, User, Building2, FileText, Cpu, Lock,
} from 'lucide-react';
import { useAppContext } from '../lib/AppContext';

type FormData = {
  full_name: string;
  business_email: string;
  company_name: string;
  selected_package: string;
  project_brief: string;
};

const PACKAGES = [
  'CORE — Seguridad Base',
  'INFRA — Endurecimiento de Infraestructura',
  'ELITE — Retainer de Inteligencia Completo',
];

const INITIAL: FormData = {
  full_name: '', business_email: '', company_name: '',
  selected_package: '', project_brief: '',
};

function validate(data: FormData): Record<string, string> {
  const e: Record<string, string> = {};
  if (!data.full_name.trim())        e.full_name        = 'El nombre completo es requerido.';
  if (!data.business_email.trim())   e.business_email   = 'El correo empresarial es requerido.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.business_email))
                                     e.business_email   = 'Ingresa una dirección de correo válida.';
  if (!data.company_name.trim())     e.company_name     = 'El nombre de la empresa es requerido.';
  if (!data.selected_package)        e.selected_package = 'Por favor selecciona un paquete.';
  if (!data.project_brief.trim())    e.project_brief    = 'Una descripción breve del proyecto es requerida.';
  return e;
}

function InputField({
  label, icon: Icon, error, children,
}: { label: string; icon: React.ElementType; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 font-mono-tech text-[10px] text-sky-700/80 uppercase tracking-widest mb-2">
        <Icon className="w-3 h-3" />
        <span className="text-sky-800">›</span> {label}
        <span className="text-slate-600 ml-0.5">*</span>
      </label>
      {children}
      {error && (
        <p className="mt-1.5 font-mono-tech text-[10px] text-red-400/80 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" />{error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const { pushLead } = useAppContext();
  const [form,        setForm]        = useState<FormData>(INITIAL);
  const [errors,      setErrors]      = useState<Record<string,string>>({});
  const [status,      setStatus]      = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [serverError, setServerError] = useState('');

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
      setForm(p => ({ ...p, [field]: e.target.value }));
      if (errors[field]) setErrors(p => ({ ...p, [field]: '' }));
    };

  const handleSubmit = (e: FormEvent) => {
    const ve = validate(form);
    if (Object.keys(ve).length) {
      e.preventDefault();
      setErrors(ve);
      return;
    }

    setStatus('loading');
    setServerError('');

    // Internal registry — Supabase persistence runs in parallel.
    // pushLead handles its own try/catch so a network failure cannot break the Pageclip submit flow.
    pushLead({
      full_name:        form.full_name.trim(),
      business_email:   form.business_email.trim().toLowerCase(),
      company_name:     form.company_name.trim(),
      selected_package: form.selected_package,
      project_brief:    form.project_brief.trim(),
    });

    // NOTE: do NOT call e.preventDefault() — the native form must POST to Pageclip via the hidden iframe.
    setTimeout(() => {
      setStatus('success');
      setForm(INITIAL);
    }, 1500);
  };

  const inputCls = (hasErr: boolean) =>
    `neuro-input ${hasErr ? '!border-red-500/40 focus:!border-red-400/60 focus:!shadow-[0_0_0_1px_rgba(239,68,68,0.15)]' : ''}`;

  return (
    <section
      id="contact"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #030712 0%, #050919 50%, #030712 100%)' }}
    >
      {/* Quantum nebula glows */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(125,211,252,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute inset-0 neural-grid opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left panel ── */}
          <div>
            <div className="section-tag mb-3">Contáctanos</div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-5">
              <span className="text-metallic">Inicia tu</span>
              <br />
              <span className="text-quantum">Consulta de Seguridad</span>
            </h2>
            <p className="text-slate-500 leading-relaxed text-sm mb-8">
              Cuéntanos sobre tu empresa y agendaremos una consulta sin compromiso.
              Nuestros analistas revisarán tu postura actual y trazarán un plan de
              proyecto personalizado.
            </p>

            {/* Contact meta */}
            <div className="space-y-3 mb-8">
              {[
                { icon: Mail,      label: 'CONTACTO DIRECTO',   value: 'intelligence@svr.agency' },
                { icon: Building2, label: 'TIEMPO DE RESPUESTA', value: 'Dentro de 4 horas hábiles' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass-card flex items-center gap-4 p-3.5 rounded-xl">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(125,211,252,0.06)', border: '1px solid rgba(125,211,252,0.12)' }}>
                    <Icon className="w-4 h-4 text-sky-400" />
                  </div>
                  <div>
                    <p className="font-mono-tech text-[9px] text-sky-900 tracking-widest">{label}</p>
                    <p className="font-mono-tech text-xs text-slate-300">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Compliance badges */}
            <div className="flex flex-wrap gap-2">
              {['Alineado SOC 2', 'ISO 27001', 'Certificado OWASP', 'Cumplimiento GDPR'].map(b => (
                <span key={b} className="font-mono-tech text-[9px] px-2.5 py-1.5 rounded-lg tracking-widest text-slate-600 uppercase"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* ── Form panel ── */}
          <div
            className="cb-frame glass-card-highlight scan-overlay rounded-2xl relative"
          >
            <span className="cb-tl" /><span className="cb-tr" />
            <span className="cb-bl" /><span className="cb-br" />

            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b rounded-t-2xl"
              style={{
                borderColor: 'rgba(255,255,255,0.06)',
                background: 'rgba(125,211,252,0.03)',
              }}
            >
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-sky-600" style={{ filter: 'drop-shadow(0 0 4px rgba(125,211,252,0.5))' }} />
                <span className="font-mono-tech text-[10px] text-sky-700/70 tracking-widest">
                  SECURE TRANSMISSION · AES-256 ENCRYPTED
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-sky-900" />
                <span className="font-mono-tech text-[9px] text-sky-900/60">TLS 1.3</span>
              </div>
            </div>

            <div className="p-6">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 float-gentle"
                    style={{
                      background: 'rgba(125,211,252,0.06)',
                      border: '1px solid rgba(125,211,252,0.2)',
                      boxShadow: '0 0 40px rgba(125,211,252,0.1)',
                    }}
                  >
                    <CheckCircle className="w-8 h-8 text-sky-400"
                      style={{ filter: 'drop-shadow(0 0 10px rgba(125,211,252,0.6))' }} />
                  </div>
                  <p className="section-tag justify-center mb-2">Transmisión Exitosa</p>
                  <h3 className="text-xl font-bold text-white mb-2">Solicitud de Consulta Recibida</h3>
                  <p className="font-mono-tech text-xs text-slate-500 max-w-xs leading-relaxed">
                    Nuestros analistas revisarán tu solicitud y se pondrán en contacto contigo
                    dentro de 4 horas hábiles.
                  </p>
                  <button onClick={() => setStatus('idle')}
                    className="btn-quantum-ghost mt-6 px-6 py-2 rounded-lg font-mono-tech text-xs tracking-widest uppercase">
                    Enviar Otra Solicitud
                  </button>
                </div>
              ) : (
                <form
                  action="https://send.pageclip.co/6r17oXo9fonSBc88urzsbwGjRJZell5h"
                  method="POST"
                  target="pageclip_submit_iframe"
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-4"
                >
                  <InputField label="Nombre Completo" icon={User} error={errors.full_name}>
                    <input type="text" name="full_name" placeholder="Juan Pérez"
                      value={form.full_name} onChange={set('full_name')}
                      className={inputCls(!!errors.full_name)} />
                  </InputField>

                  <InputField label="Correo Empresarial" icon={Mail} error={errors.business_email}>
                    <input type="email" name="email" placeholder="juan@empresa.com"
                      value={form.business_email} onChange={set('business_email')}
                      className={inputCls(!!errors.business_email)} />
                  </InputField>

                  <InputField label="Nombre de la Empresa" icon={Building2} error={errors.company_name}>
                    <input type="text" name="company_name" placeholder="Mi Empresa S.A."
                      value={form.company_name} onChange={set('company_name')}
                      className={inputCls(!!errors.company_name)} />
                  </InputField>

                  <InputField label="Paquete Seleccionado" icon={Lock} error={errors.selected_package}>
                    <select name="selected_package" value={form.selected_package} onChange={set('selected_package')}
                      className={`${inputCls(!!errors.selected_package)} appearance-none cursor-pointer`}
                      style={{ background: 'rgba(5,10,30,0.7)' }}
                    >
                      <option value="" disabled>Selecciona un nivel de servicio...</option>
                      {PACKAGES.map(p => (
                        <option key={p} value={p} style={{ background: '#050919' }}>{p}</option>
                      ))}
                    </select>
                  </InputField>

                  <InputField label="Descripción del Proyecto" icon={FileText} error={errors.project_brief}>
                    <textarea name="project_brief" rows={4}
                      placeholder="Describe tu infraestructura actual, principales preocupaciones y lo que esperas lograr..."
                      value={form.project_brief} onChange={set('project_brief')}
                      className={`${inputCls(!!errors.project_brief)} resize-none`}
                    />
                  </InputField>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3 rounded-lg font-mono-tech text-xs text-red-400/80"
                      style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.15)' }}>
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />{serverError}
                    </div>
                  )}

                  <button type="submit" disabled={status === 'loading'}
                    className="btn-quantum-primary w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-semibold"
                  >
                    {status === 'loading'
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando Solicitud...</>
                      : <><Send className="w-3.5 h-3.5" /> Enviar Solicitud de Consulta</>
                    }
                  </button>

                  <p className="text-center font-mono-tech text-[10px] text-slate-700 tracking-wide">
                    Al enviar, aceptas nuestra política de privacidad. Sin spam — nunca.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
     <iframe name="pageclip_submit_iframe" style={{ display: 'none' }}></iframe>
    </section>
  );
}
