import { Shield, Server, Brain, Check, ArrowRight } from 'lucide-react';

const packages = [
  {
    tier: 'CORE',
    code: 'SVR-CORE™',
    tagline: 'Visibilidad de Riesgos & Monitoreo',
    price: '$1,200 MXN',
    period: '/ mes',
    icon: Shield,
    accentRgb: '148,163,184',
    highlight: false,
    statusLabel: 'BASE',
    features: [
      'Inspección mensual de puntos débiles en la red local.',
      'Reporte ejecutivo mensual de Salud Digital.',
      'Alertas preventivas de fallas y vulnerabilidades.',
    ],
    cta: 'COMENZAR ->',
  },
  {
    tier: 'FORTRESS',
    code: 'SVR-FORTRESS™',
    tagline: 'Carril VIP de Cobro & Continuidad Garantizada',
    price: '$3,800 MXN',
    period: '/ mes',
    icon: Server,
    accentRgb: '125,211,252',
    highlight: true,
    statusLabel: 'MÁS POPULAR',
    features: [
      'Todo lo incluido en el nivel SVR CORE™.',
      'Creación y mantenimiento del Carril VIP de Cobro (Aislamiento de terminales PoS).',
      'Garantía activa de 0 caídas (reconfiguración sin costo ante cambios de ISP).',
    ],
    cta: 'SOLICITAR PROPUESTA ->',
  },
  {
    tier: 'IMPERIUM',
    code: 'SVR-IMPERIUM™',
    tagline: 'Co-Piloto VIP & Director de TI Dedicado',
    price: 'A la medida',
    period: '/ mes',
    icon: Brain,
    accentRgb: '99,102,241',
    highlight: false,
    statusLabel: 'VIP RETAINER',
    features: [
      'Todo lo incluido en CORE™ y FORTRESS™.',
      'Soporte prioritario VIP presencial/remoto en < 2 horas.',
      'Capacitación continua para personal y revisiones presenciales bimestrales.',
    ],
    cta: 'AGENDAR CONSULTA ->',
  },
];

export default function Services() {
  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="services"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #030712 0%, #050919 50%, #030712 100%)' }}
    >
      {/* Subtle neural grid */}
      <div className="absolute inset-0 neural-grid opacity-100 pointer-events-none" />

      {/* Nebula blobs */}
      <div className="absolute left-0 top-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute right-0 bottom-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-16">
          <div className="section-tag justify-center mb-3">Paquetes de Servicio</div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            <span className="text-metallic">Elige tu Nivel de </span>
            <span className="text-quantum">Protección</span>
          </h2>
          <p className="mt-2 max-w-xl mx-auto text-slate-500 text-sm leading-relaxed mb-6">
            Proyectos escalonados diseñados para adaptarse a la etapa de tu empresa — desde
            seguridad básica hasta operaciones autónomas de ciberinteligencia.
          </p>

          {/* Scarcity Banner */}
          <div className="inline-block p-[1px] rounded-xl bg-gradient-to-r from-sky-400/30 via-indigo-500/30 to-sky-400/30 mb-2 text-left">
            <div className="bg-slate-950/80 backdrop-blur-md rounded-xl px-6 py-4 border border-white/5 max-w-3xl mx-auto">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-sky-400" />
                <h3 className="text-sm font-bold tracking-wide text-white uppercase">Programa de Comercios Fundadores</h3>
              </div>
              <ul className="text-sm text-slate-300 space-y-2 list-disc list-outside ml-4">
                <li><span className="text-sky-300 font-semibold">Cupo limitado:</span> Máximo 3 a 5 negocios admitidos por mes en Zibatá y El Marqués para garantizar atención 100% personalizada y premium.</li>
                <li><span className="text-sky-300 font-semibold">Tarifa congelada:</span> Precio de suscripción de por vida para los Comercios Fundadores aceptados.</li>
                <li><span className="text-sky-300 font-semibold">Acreditación oficial:</span> Insignia física y digital de "Comercio Blindado & Seguro" para generar confianza en tus clientes.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            const a = pkg.accentRgb;
            return (
              <div
                key={pkg.tier}
                id={`pkg-${pkg.tier.toLowerCase()}`}
                className={`cb-frame relative rounded-2xl flex flex-col scan-overlay transition-all duration-400 ${pkg.highlight ? 'glass-card-highlight' : 'glass-card'}`}
              >
                <span className="cb-tl" /><span className="cb-tr" />
                <span className="cb-bl" /><span className="cb-br" />

                {/* Top shimmer line for highlighted */}
                {pkg.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg, transparent, rgba(${a},0.7), transparent)` }}
                  />
                )}

                {/* Code strip */}
                <div className="flex items-center justify-between px-5 py-2.5 border-b"
                  style={{ borderColor: `rgba(${a},0.1)` }}
                >
                  <span className="font-mono-tech text-[10px] tracking-widest" style={{ color: `rgba(${a},0.6)` }}>
                    {pkg.code}
                  </span>
                  <span className="font-mono-tech text-[9px] px-2 py-0.5 rounded tracking-widest"
                    style={{ color: `rgba(${a},0.8)`, border: `1px solid rgba(${a},0.2)`, background: `rgba(${a},0.05)` }}
                  >
                    {pkg.statusLabel}
                  </span>
                </div>

                <div className="p-6 flex-1">
                  {/* Icon + tier */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: `rgba(${a},0.08)`,
                        border: `1px solid rgba(${a},0.2)`,
                        boxShadow: `0 0 20px rgba(${a},0.1)`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: `rgba(${a},1)`, filter: `drop-shadow(0 0 6px rgba(${a},0.5))` }} />
                    </div>
                    <div>
                      <p className="font-mono-tech text-[9px] tracking-widest uppercase mb-0.5" style={{ color: `rgba(${a},0.5)` }}>
                        MÓDULO {pkg.tier}
                      </p>
                      <p className="text-sm font-semibold text-slate-200">{pkg.tagline}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-5">
                    <span className="text-2xl font-black text-white">{pkg.price}</span>
                    <span className="font-mono-tech text-xs text-slate-600 ml-2">{pkg.period}</span>
                  </div>

                  {/* Divider */}
                  <div className="h-px mb-5"
                    style={{ background: `linear-gradient(90deg, rgba(${a},0.15), transparent)` }} />

                  {/* Features */}
                  <ul className="space-y-2.5">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: `rgba(${a},0.8)` }} />
                        <span className="text-sm text-slate-400 leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-6 pt-2">
                  <button
                    onClick={scrollToContact}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all duration-250 ${
                      pkg.highlight ? 'btn-quantum-primary' : 'btn-quantum-ghost'
                    }`}
                  >
                    {pkg.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
