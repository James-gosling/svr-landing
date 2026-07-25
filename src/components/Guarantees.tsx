import { ShieldCheck, Unlock, Activity } from 'lucide-react';

export default function Guarantees() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: '#030712' }}>
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(125,211,252,0.15) 50%, transparent 100%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-black text-white tracking-tight mb-2">
            Confianza y Transparencia
          </h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Nuestra arquitectura se basa en el principio de soberanía digital. Eres dueño de tu infraestructura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: ShieldCheck,
              title: '100% Soberano',
              description: 'Zero vendor lock-in. Eres dueño absoluto de la infraestructura y credenciales configuradas en tu local.',
              color: 'text-sky-400',
              bg: 'bg-sky-400/10'
            },
            {
              icon: Unlock,
              title: 'Sin Contratos Forzosos',
              description: 'Nuestros niveles de blindaje no tienen plazos forzosos ni penalizaciones por cancelación.',
              color: 'text-indigo-400',
              bg: 'bg-indigo-400/10'
            },
            {
              icon: Activity,
              title: 'Transparencia Total',
              description: 'Si decides pausar, las configuraciones de red permanecen activas en tu sitio; únicamente se pausa el soporte VIP y monitoreo.',
              color: 'text-cyan-400',
              bg: 'bg-cyan-400/10'
            }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${item.bg}`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="text-white font-bold mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
