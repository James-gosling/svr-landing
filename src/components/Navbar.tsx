import { useState, useEffect } from 'react';
import { Shield, Menu, X, Activity } from 'lucide-react';

const NAV = [
  { id: 'services',    label: 'Servicios' },
  { id: 'methodology', label: 'Metodología' },
  { id: 'contact',     label: 'Contacto' },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b'
          : ''
      }`}
      style={scrolled ? {
        background: 'rgba(3,7,18,0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderColor: 'rgba(255,255,255,0.06)',
        boxShadow: '0 4px 40px rgba(0,0,0,0.5)',
      } : {}}
    >
      {/* Top quantum accent */}
      {scrolled && (
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(125,211,252,0.4) 40%, rgba(99,102,241,0.4) 60%, transparent 100%)' }}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-2.5 group">
          <div className="relative">
            <Shield className="w-6 h-6 text-sky-400 transition-colors group-hover:text-sky-300"
              style={{ filter: 'drop-shadow(0 0 8px rgba(125,211,252,0.5))' }} />
            <span className="absolute inset-0 rounded-full blur-md bg-sky-500/15 group-hover:bg-sky-400/25 transition-all" />
          </div>
          <div className="leading-none">
            <div className="text-lg font-black tracking-[0.18em] text-white group-hover:text-sky-100 transition-colors">
              SVR<span className="text-sky-400">.</span>
            </div>
            <div className="font-mono-tech text-[8px] text-sky-900 tracking-[0.35em] uppercase hidden sm:block">
              Neural Intelligence
            </div>
          </div>
        </button>

        {/* Status chip */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full"
          style={{ background: 'rgba(125,211,252,0.04)', border: '1px solid rgba(125,211,252,0.1)' }}
        >
          <Activity className="w-3 h-3 text-sky-600" />
          <span className="font-mono-tech text-[9px] text-sky-700 uppercase tracking-widest">Sistemas Operativos</span>
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map(({ id, label }) => (
            <button key={id} onClick={() => scrollTo(id)}
              className="relative font-mono-tech text-[11px] tracking-widest text-slate-500 hover:text-sky-300 transition-colors uppercase group"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-sky-500/60 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => scrollTo('contact')}
          className="btn-quantum-ghost hidden md:flex items-center gap-2 px-5 py-2 rounded-lg text-[11px] font-semibold tracking-widest uppercase"
        >
          Solicitar Consulta
        </button>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-slate-500 hover:text-sky-400 transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4 border-b"
          style={{
            background: 'rgba(3,7,18,0.96)',
            backdropFilter: 'blur(20px)',
            borderColor: 'rgba(255,255,255,0.06)',
          }}
        >
          {NAV.map(({ id, label }) => (
            <button key={id} onClick={() => scrollTo(id)}
              className="font-mono-tech text-[11px] tracking-widest text-slate-500 hover:text-sky-300 transition-colors uppercase text-left border-b pb-3"
              style={{ borderColor: 'rgba(255,255,255,0.05)' }}
            >
              <span className="text-sky-800 mr-2">//</span>{label}
            </button>
          ))}
          <button onClick={() => scrollTo('contact')}
            className="btn-quantum-ghost mt-1 px-5 py-2.5 rounded-lg font-mono-tech text-[11px] tracking-widest uppercase"
          >
            Solicitar Consulta
          </button>
        </div>
      )}
    </header>
  );
}
