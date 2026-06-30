import { useState, useCallback } from 'react';
import { Shield, Linkedin, Github, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FooterModal, { type ModalKey } from './FooterModal';

/* ─── Social links ─── */
const SOCIAL = [
  {
    label: 'WhatsApp',
    href: 'https://wa.link/dblzts',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rodrigo-valdespino-611bb6206/',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/James-gosling',
    icon: Github,
  },
];

/* ─── Package highlight helper ─── */
const PACKAGE_IDS: Record<string, string> = {
  'Paquete CORE':  'pkg-core',
  'Paquete INFRA': 'pkg-infra',
  'Paquete ELITE': 'pkg-elite',
};

function pulseCard(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.style.transition = 'box-shadow 0.3s ease';
  const frames = [
    'rgba(125,211,252,0)',
    'rgba(125,211,252,0.5)',
    'rgba(125,211,252,0.1)',
    'rgba(125,211,252,0.45)',
    'rgba(125,211,252,0)',
  ];
  let i = 0;
  const tick = setInterval(() => {
    if (!el) { clearInterval(tick); return; }
    el.style.boxShadow = `0 0 0 2px ${frames[i % frames.length]}, 0 0 40px ${frames[i % frames.length]}`;
    i++;
    if (i >= frames.length * 2) { clearInterval(tick); el.style.boxShadow = ''; }
  }, 200);
}

/* ─── Link config ─── */
type LinkConfig =
  | { type: 'modal'; key: ModalKey }
  | { type: 'package'; pkg: string }
  | { type: 'modal'; key: ModalKey };

const LINKS: Record<string, Record<string, LinkConfig>> = {
  Empresa: {
    'Acerca de SVR':        { type: 'modal', key: 'acerca' },
    'Casos de Éxito':       { type: 'modal', key: 'casos' },
    'Trabaja con Nosotros': { type: 'modal', key: 'trabaja' },
    'Prensa':               { type: 'modal', key: 'prensa' },
  },
  Servicios: {
    'Paquete CORE':     { type: 'package', pkg: 'Paquete CORE' },
    'Paquete INFRA':    { type: 'package', pkg: 'Paquete INFRA' },
    'Paquete ELITE':    { type: 'package', pkg: 'Paquete ELITE' },
    'Proyectos a Medida': { type: 'modal', key: 'proyectos' },
  },
  Legal: {
    'Política de Privacidad': { type: 'modal', key: 'privacidad' },
    'Términos de Servicio':   { type: 'modal', key: 'terminos' },
    'Política de Seguridad':  { type: 'modal', key: 'seguridad' },
    'Plantilla NDA':          { type: 'modal', key: 'nda' },
  },
};

export default function Footer() {
  const [hoveringPortal, setHoveringPortal] = useState(false);
  const [activeModal, setActiveModal]       = useState<ModalKey | null>(null);
  const navigate = useNavigate();

  const handleLink = useCallback((cfg: LinkConfig) => {
    if (cfg.type === 'modal') {
      setActiveModal(cfg.key);
    } else {
      const id = PACKAGE_IDS[cfg.pkg];
      if (id) {
        const el = document.getElementById(id);
        if (el) {
          pulseCard(id);
        } else {
          // navigate to home first, then pulse after render
          navigate('/');
          setTimeout(() => pulseCard(id), 600);
        }
      }
    }
  }, [navigate]);

  return (
    <>
      <footer
        className="relative pt-16 pb-8 overflow-hidden"
        style={{ background: '#030712', borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        {/* Top quantum accent */}
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(125,211,252,0.25) 30%, rgba(99,102,241,0.25) 70%, transparent 100%)' }} />

        {/* Ambient nebula */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute inset-0 neural-grid opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-10">

            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="relative">
                  <Shield className="w-6 h-6 text-sky-400"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(125,211,252,0.4))' }} />
                  <span className="absolute inset-0 rounded-full blur-sm bg-sky-500/15" />
                </div>
                <div>
                  <div className="text-lg font-black tracking-[0.2em] text-white">
                    SVR<span className="text-sky-400">.</span>
                  </div>
                  <div className="font-mono-tech text-[8px] text-sky-900 tracking-widest uppercase -mt-0.5">
                    Neural Intelligence
                  </div>
                </div>
              </div>

              <p className="font-mono-tech text-xs text-slate-600 leading-relaxed max-w-xs mb-6">
                Servicios elite de IA y Ciberinteligencia para pequeñas y medianas empresas.
                Aseguramos, automatizamos y escalamos tu negocio con precisión.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2">
                {SOCIAL.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 text-slate-600 hover:text-sky-300"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'rgba(125,211,252,0.3)';
                      el.style.boxShadow   = '0 0 15px rgba(125,211,252,0.1)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'rgba(255,255,255,0.07)';
                      el.style.boxShadow   = 'none';
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Nav columns */}
            {Object.entries(LINKS).map(([section, items]) => (
              <div key={section}>
                <p className="font-mono-tech text-[9px] tracking-widest text-sky-900 uppercase mb-4 flex items-center gap-1.5">
                  <span className="text-sky-800">›</span> {section}
                </p>
                <ul className="space-y-2.5">
                  {Object.entries(items).map(([label, cfg]) => (
                    <li key={label}>
                      <button
                        onClick={() => handleLink(cfg)}
                        className="font-mono-tech text-xs text-slate-700 hover:text-sky-400 transition-colors text-left group relative"
                      >
                        <span className="relative">
                          {label}
                          <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-sky-600/50 group-hover:w-full transition-all duration-300" />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)' }} />

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono-tech text-[10px] text-slate-700 tracking-wide">
              &copy; 2026 SVR Intelligence Agency. Todos los derechos reservados.
            </p>

            {/* Dashboard portal */}
            <button
              onClick={() => navigate('/jarvis')}
              onMouseEnter={() => setHoveringPortal(true)}
              onMouseLeave={() => setHoveringPortal(false)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer"
              style={{
                background: hoveringPortal ? 'rgba(125,211,252,0.08)' : 'rgba(125,211,252,0.03)',
                border: hoveringPortal ? '1px solid rgba(125,211,252,0.35)' : '1px solid rgba(125,211,252,0.08)',
                boxShadow: hoveringPortal ? '0 0 20px rgba(125,211,252,0.12), 0 0 40px rgba(125,211,252,0.04)' : 'none',
              }}
            >
              <Activity
                className="w-3 h-3 transition-colors duration-300"
                style={{ color: hoveringPortal ? '#7dd3fc' : '#164e63' }}
              />
              <span
                className="font-mono-tech text-[10px] tracking-widest uppercase transition-all duration-300"
                style={{
                  color: hoveringPortal ? '#7dd3fc' : 'rgba(125,211,252,0.35)',
                  animation: hoveringPortal ? 'quantum-breathe 1.5s ease-in-out infinite' : 'none',
                }}
              >
                {hoveringPortal ? '[ ACCEDER A J.A.R.V.I.S. ]' : 'Todos los Sistemas Operativos'}
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                style={{
                  background: hoveringPortal ? '#7dd3fc' : '#164e63',
                  animation: 'pulse 1.5s cubic-bezier(0.4,0,0.6,1) infinite',
                  boxShadow: hoveringPortal ? '0 0 8px rgba(125,211,252,0.6)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </footer>

      {/* Modal portal */}
      {activeModal && (
        <FooterModal modalKey={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </>
  );
}
