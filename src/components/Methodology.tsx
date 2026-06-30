import { Search, ShieldCheck, Rocket, Activity } from 'lucide-react';
import type { ElementType } from 'react';

/* ─── Synapse SVG connector (desktop) ─── */
function SynapseConnector({ color }: { color: string }) {
  return (
    <svg
      className="hidden lg:block absolute top-[52px]"
      style={{ left: '14%', right: '14%', width: '72%', height: '20px', pointerEvents: 'none', overflow: 'visible' }}
      viewBox="0 0 600 20"
      preserveAspectRatio="none"
    >
      {/* Static axon path */}
      <line x1="0" y1="10" x2="600" y2="10"
        stroke={`rgba(${color},0.2)`} strokeWidth="1" strokeDasharray="4 6" />
      {/* Animated pulse dot 1 */}
      <circle r="2.5" fill={`rgba(${color},0.9)`}>
        <animateMotion dur="3s" repeatCount="indefinite" begin="0s">
          <mpath><path d="M0,10 L600,10" /></mpath>
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Animated pulse dot 2 */}
      <circle r="1.8" fill={`rgba(${color},0.7)`}>
        <animateMotion dur="3s" repeatCount="indefinite" begin="1s">
          <mpath><path d="M0,10 L600,10" /></mpath>
        </animateMotion>
        <animate attributeName="opacity" values="0;0.8;0.8;0" dur="3s" repeatCount="indefinite" begin="1s" />
      </circle>
    </svg>
  );
}

/* ─── Neural Hub icon ─── */
function NeuralHub({
  icon: Icon,
  accentColor,
  accentRgb,
  step,
}: {
  icon: ElementType;
  accentColor: string;
  accentRgb: string;
  step: number;
}) {
  return (
    <div className="relative flex items-center justify-center w-[88px] h-[88px] lg:w-[100px] lg:h-[100px] shrink-0 neural-hub">
      {/* Outer orbit ring */}
      <div
        className="hub-ring-1 absolute inset-0 rounded-full"
        style={{ border: `1px dashed rgba(${accentRgb},0.2)` }}
      />
      {/* Inner orbit ring */}
      <div
        className="hub-ring-2 absolute inset-[14px] rounded-full"
        style={{ border: `1px solid rgba(${accentRgb},0.15)` }}
      />
      {/* Glow core */}
      <div
        className="absolute inset-[24px] rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(${accentRgb},0.15) 0%, transparent 70%)`,
          border: `1px solid rgba(${accentRgb},0.3)`,
          boxShadow: `0 0 20px rgba(${accentRgb},0.15), inset 0 0 15px rgba(${accentRgb},0.08)`,
        }}
      />
      {/* Icon */}
      <Icon
        className="relative z-10 w-6 h-6 lg:w-7 lg:h-7"
        style={{ color: accentColor, filter: `drop-shadow(0 0 10px ${accentColor}80)` }}
      />
      {/* Step badge */}
      <span
        className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center font-mono-tech text-[9px] font-black z-20"
        style={{
          background: '#030712',
          border: `1px solid rgba(${accentRgb},0.4)`,
          color: accentColor,
          boxShadow: `0 0 8px rgba(${accentRgb},0.3)`,
        }}
      >
        {step}
      </span>
    </div>
  );
}

const steps = [
  {
    label: 'Fase 1',
    icon: Search,
    title: 'Diagnóstico (F1)',
    description:
      'Levantamiento presencial de requerimientos en el establecimiento, análisis de herramientas digitales y estructuración de la matriz teórica de riesgos.',
    accentColor: '#7dd3fc',
    accentRgb: '125,211,252',
  },
  {
    label: 'Fase 2',
    icon: ShieldCheck,
    title: 'Inmunización (F2)',
    description:
      'Ejecución técnica de contramedidas, aislamiento lógico de redes inalámbricas de cobro y endurecimiento de directivas en dispositivos anfitriones.',
    accentColor: '#818cf8',
    accentRgb: '129,140,248',
  },
  {
    label: 'Fase 3',
    icon: Rocket,
    title: 'Autonomía (F3)',
    description:
      'Redacción y entrega formal de los manuales interactivos de procedimientos de SVR y sesión de mentoría estratégica para capacitar al cliente.',
    accentColor: '#38bdf8',
    accentRgb: '56,189,248',
  },
];

export default function Methodology() {
  return (
    <section
      id="methodology"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #030712 0%, #060e1f 50%, #030712 100%)' }}
    >
      {/* Quantum glow blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      <div className="absolute inset-0 neural-grid opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-tag justify-center mb-3">Nuestro Proceso</div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            <span className="text-metallic">Una Metodología Probada </span>
            <span className="text-quantum">en 3 Fases</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-500 text-sm leading-relaxed">
            Cada proyecto de SVR sigue un marco operativo disciplinado — desde el diagnóstico
            inicial hasta la defensa autónoma continua.
          </p>
          {/* AI model coordinate tag */}
          <div className="mt-3 coord-tag">
            [ NEURAL.PIPELINE: SEQUENTIAL / DEPTH: 3 / STATUS: OPERATIONAL ]
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Synapse connector */}
          <SynapseConnector color="125,211,252" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6">
            {steps.map((step, idx) => (
              <div
                key={step.label}
                className="flex lg:flex-col items-start lg:items-center gap-5 lg:gap-0 group"
              >
                <NeuralHub
                  icon={step.icon}
                  accentColor={step.accentColor}
                  accentRgb={step.accentRgb}
                  step={idx + 1}
                />

                {/* Mobile axon connector */}
                {idx < steps.length - 1 && (
                  <div className="lg:hidden w-px h-10 self-start mt-2 ml-11 shrink-0"
                    style={{ background: `linear-gradient(180deg, rgba(${step.accentRgb},0.3), transparent)` }}
                  />
                )}

                {/* Text */}
                <div className="lg:text-center lg:mt-6 lg:px-1">
                  <p className="font-mono-tech text-[10px] tracking-widest uppercase mb-1"
                    style={{ color: step.accentColor, opacity: 0.8 }}
                  >
                    {step.label}
                  </p>
                  <h3 className="text-sm font-bold text-slate-200 mb-2 leading-snug">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '< 48h', label: 'Entrega del Diagnóstico Inicial',        code: 'EVL.01' },
            { value: '99.7%', label: 'Precisión en Detección de Amenazas',     code: 'DET.02' },
            { value: '60%',   label: 'Reducción de Superficie de Ataque',      code: 'HDN.03' },
            { value: '24/7',  label: 'Monitoreo Continuo con IA',              code: 'MON.04' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-xl p-5 text-center relative"
            >
              <div className="absolute top-2 right-3">
                <span className="font-mono-tech text-[8px] text-slate-700">{stat.code}</span>
              </div>
              <p
                className="text-2xl font-black mb-1 text-quantum"
                style={{ filter: 'drop-shadow(0 0 12px rgba(125,211,252,0.3))' }}
              >
                {stat.value}
              </p>
              <p className="font-mono-tech text-[10px] text-slate-600 leading-snug uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
