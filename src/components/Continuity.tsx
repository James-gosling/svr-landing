import { Activity, ShieldAlert, CheckCircle2, AlertTriangle, Clock, RefreshCcw } from 'lucide-react';

export default function Continuity() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#030712' }}>
      
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.03) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.03) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="section-tag justify-center mb-3">Continuidad de Negocio</div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-white">
            Pólizas de Resiliencia & <span className="text-emerald-400">Continuidad</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-500 text-sm leading-relaxed">
            Mantenimiento proactivo post-garantía y motores de remediación táctica para asegurar que tu infraestructura nunca se detenga.
          </p>
        </div>

        {/* SVR Guard Grid */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-emerald-400" />
            <h3 className="text-2xl font-bold text-white tracking-tight">SVR Guard™</h3>
            <span className="hidden sm:inline-block px-3 py-1 bg-emerald-950 border border-emerald-800 rounded text-[10px] font-mono-tech text-emerald-400 uppercase tracking-widest">
              Mantenimiento Proactivo
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guard Lite */}
            <div className="glass-card rounded-2xl border border-emerald-900/30 p-8 hover:border-emerald-500/30 transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-lg font-bold text-slate-200">Guard Lite</h4>
                  <p className="text-xs font-mono-tech text-emerald-500 mt-1 uppercase tracking-widest">Cobertura Trimestral</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-white">$3,800 MXN</span>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">/ Trimestre</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  'Mantenimiento preventivo trimestral del host Linux.',
                  'Actualización trimestral de imágenes base Docker.',
                  'Reporte ejecutivo de salud e integridad del sistema.'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Guard Pro */}
            <div className="glass-card rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-8 relative overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.05)]">
              <div className="absolute top-0 right-0 px-4 py-1 bg-emerald-500/20 border-b border-l border-emerald-500/30 rounded-bl-lg text-[10px] font-mono-tech text-emerald-400 uppercase tracking-widest">
                Recomendado
              </div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-lg font-bold text-slate-100">Guard Pro</h4>
                  <p className="text-xs font-mono-tech text-emerald-400 mt-1 uppercase tracking-widest">Cobertura Total</p>
                </div>
                <div className="text-right mt-4 sm:mt-0">
                  <span className="text-xl font-black text-white">$2,500 MXN</span>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">/ Mes</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  'Parches mensuales de SO y contenedores.',
                  'Backup Health Check (pruebas mensuales en frío).',
                  'Depuración de logs y optimización de I/O.',
                  'SLA prioritario de atención (< 4 horas).',
                  'Bolsa de 3 horas mensuales para ajustes menores.'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* SVR Recovery Block */}
        <div className="mt-12 glass-card rounded-2xl border border-purple-500/20 p-1 bg-purple-950/5">
          <div className="rounded-xl border border-purple-500/10 p-8 sm:p-10 bg-slate-950/50">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <ShieldAlert className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">SVR Recovery™</h3>
                  <p className="text-[10px] font-mono-tech text-purple-400 mt-1 uppercase tracking-widest">On-Demand Remediation & Data Restoration Engine</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-center">
                <span className="block text-lg font-black text-white">$1,200 MXN</span>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest">/ Hora de Soporte Táctico</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {[
                { icon: AlertTriangle, text: 'Corrección por factor humano o negligencia (alteración de políticas).' },
                { icon: RefreshCcw, text: 'Restauración rápida de respaldos inmutables ante contingencias lógicas.' },
                { icon: ShieldAlert, text: 'Recuperación y re-encriptación de credenciales maestras comprometidas.' },
                { icon: Clock, text: 'Reconfiguración perimetral de red por cambio de ISP (Telmex, Totalplay).' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <item.icon className="w-4 h-4 text-purple-400 mt-1 shrink-0" />
                  <p className="text-sm text-slate-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
