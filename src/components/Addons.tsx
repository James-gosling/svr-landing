import { Bot, MessageSquare, Filter, RefreshCw, CalendarCheck, Zap } from 'lucide-react';

export default function Addons() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#030712' }}>
      {/* Cyan Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.03) 0%, transparent 70%)', filter: 'blur(100px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 border-l-2 border-cyan-500 pl-6">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            <span className="font-mono-tech text-[10px] text-cyan-400 tracking-widest uppercase">Módulos de Expansión</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
            SVR Sentinel™
          </h2>
          <p className="text-cyan-200/60 font-mono-tech text-sm tracking-wide">
            Autonomous 24/7 Sales & Conversion Agent
          </p>
        </div>

        {/* Main Card */}
        <div className="glass-card rounded-2xl border border-cyan-500/20 p-8 sm:p-10 relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Features */}
            <div>
              <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" /> Pilares del Motor de Ventas
              </h3>
              <div className="space-y-6">
                {[
                  { icon: MessageSquare, title: 'Atracción Inmediata', desc: 'Captación multicanal en tiempo real.' },
                  { icon: Filter, title: 'Calificación Estricta', desc: 'Filtrado inteligente de prospectos según intención y presupuesto.' },
                  { icon: RefreshCw, title: 'Retención & Reactivación', desc: 'Secuencias automáticas de seguimiento y reactivación de bases frías.' },
                  { icon: CalendarCheck, title: 'Rendimiento Comercial', desc: 'Agendamiento directo y sincronizado en calendarios 24/7.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-cyan-950/50 border border-cyan-900/50 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-300">{item.title}</h4>
                      <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commercial Info */}
            <div className="flex flex-col justify-center">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
                <h4 className="text-xs font-mono-tech text-slate-400 uppercase tracking-widest mb-4">Nota de Infraestructura</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Integración desplegada sobre infraestructura <span className="text-slate-200 font-semibold">GoHighLevel (GHL)</span>. 
                  El setup y la configuración son independientes a la infraestructura física de SVR. 
                  Los costos del SaaS, consumo de API (Twilio/WhatsApp) y tokens de LLM son cubiertos directamente por el cliente.
                </p>
              </div>

              <div className="flex items-center justify-between border border-cyan-900/50 bg-cyan-950/20 rounded-xl p-5">
                <div>
                  <p className="text-[10px] font-mono-tech text-cyan-400/70 uppercase tracking-widest">Inversión</p>
                  <p className="text-sm font-bold text-white mt-1">Setup e Implementación a Medida</p>
                </div>
                <div className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs font-mono-tech text-cyan-400 uppercase tracking-wide">
                  Add-on Externo
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
