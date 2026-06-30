import { useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, Zap, Cpu } from 'lucide-react';

/* ─────────────────────────────────────────────────────
   Neural Network Canvas — synaptic nodes + constellations
───────────────────────────────────────────────────────*/
type NNode = { x: number; y: number; vx: number; vy: number; r: number; phase: number };
type Star  = { x: number; y: number; size: number; opacity: number; driftX: number; driftY: number; speed: number };

function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const nodes: NNode[] = [];
    const stars: Star[] = [];
    const N = 55;
    const S = 120;
    const MAX_D = 160;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < N; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 1,
        phase: Math.random() * Math.PI * 2,
      });
    }
    for (let i = 0; i < S; i++) {
      stars.push({
        x: Math.random() * 1920,
        y: Math.random() * 1080,
        size: Math.random() * 1.2,
        opacity: Math.random() * 0.6 + 0.1,
        driftX: (Math.random() - 0.5) * 0.15,
        driftY: (Math.random() - 0.5) * 0.08,
        speed: Math.random() * 0.003 + 0.001,
      });
    }

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* ── Star dust layer ── */
      stars.forEach(s => {
        s.x += s.driftX;
        s.y += s.driftY;
        if (s.x > canvas.width + 10)  s.x = -10;
        if (s.x < -10) s.x = canvas.width + 10;
        if (s.y > canvas.height + 10) s.y = -10;
        if (s.y < -10) s.y = canvas.height + 10;
        const twinkle = Math.sin(t * s.speed * 60 + s.opacity) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * twinkle, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity * twinkle * 0.5})`;
        ctx.fill();
      });

      /* ── Move nodes ── */
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        n.phase += 0.018;
      });

      /* ── Axon connections ── */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_D) {
            const alpha = (1 - dist / MAX_D) * 0.18;
            /* Subtle indigo-blue pathway */
            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            grad.addColorStop(0,   `rgba(99,102,241,${alpha})`);
            grad.addColorStop(0.5, `rgba(125,211,252,${alpha * 1.5})`);
            grad.addColorStop(1,   `rgba(99,102,241,${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            /* Traveling synapse pulse dot */
            if (Math.random() < 0.0006) {
              const prog = (Math.sin(t * 0.04) * 0.5 + 0.5);
              const px = nodes[i].x + (nodes[j].x - nodes[i].x) * prog;
              const py = nodes[i].y + (nodes[j].y - nodes[i].y) * prog;
              ctx.beginPath();
              ctx.arc(px, py, 1.5, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(186,230,253,0.9)';
              ctx.fill();
            }
          }
        }
      }

      /* ── Synaptic nodes ── */
      nodes.forEach(n => {
        const pulse = Math.sin(n.phase) * 0.5 + 0.5;
        /* outer glow ring */
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        g.addColorStop(0,   `rgba(125,211,252,${0.12 * pulse})`);
        g.addColorStop(1,   'rgba(125,211,252,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        ctx.fill();
        /* core dot */
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (0.6 + pulse * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186,230,253,${0.4 + pulse * 0.5})`;
        ctx.fill();
      });

      /* ── Nebula-like radial blobs (very faint) ── */
      const blobs = [
        { x: canvas.width * 0.2,  y: canvas.height * 0.3, c: '99,102,241', r: 300 },
        { x: canvas.width * 0.78, y: canvas.height * 0.6, c: '14,165,233', r: 250 },
        { x: canvas.width * 0.5,  y: canvas.height * 0.1, c: '125,211,252', r: 200 },
      ];
      blobs.forEach(b => {
        const bg = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        bg.addColorStop(0,   `rgba(${b.c},0.04)`);
        bg.addColorStop(1,   `rgba(${b.c},0)`);
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      t++;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #030712 0%, #050919 35%, #07051a 65%, #030b14 100%)',
      }}
    >
      {/* Deep quantum glow cores */}
      <div
        className="absolute top-[20%] left-[15%] w-[600px] h-[600px] rounded-full pointer-events-none quantum-glow"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />
      <div
        className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none quantum-glow"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)', filter: 'blur(60px)', animationDelay: '3s' }}
      />

      <NeuralCanvas />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center pt-28 pb-24">

        {/* AI status badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-8"
          style={{
            background: 'rgba(7,15,40,0.7)',
            border: '1px solid rgba(125,211,252,0.15)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 30px rgba(125,211,252,0.06)',
          }}
        >
          <Cpu className="w-3.5 h-3.5 text-sky-400" style={{ filter: 'drop-shadow(0 0 6px rgba(125,211,252,0.6))' }} />
          <span className="font-mono-tech text-[10px] text-sky-400/80 uppercase tracking-[0.2em]">
            [ SYSTEM MODEL: AGENTIC.ACTIVE ] — Agencia Elite de IA y Ciberinteligencia
          </span>
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-300" />
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-[66px] font-black leading-[1.05] tracking-tight mb-6">
          <span className="text-metallic">Ciberinteligencia</span>
          <br />
          <span className="text-quantum text-metallic-shimmer">de Nueva Generación</span>
          <br />
          <span className="text-metallic">para Empresas en Crecimiento</span>
        </h1>

        {/* Subtitle separator */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(125,211,252,0.3))' }} />
          <span className="font-mono-tech text-[10px] text-sky-500/60 uppercase tracking-widest">
            Inteligencia Artificial · Automatización · Defensa Cibernética
          </span>
          <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(270deg, transparent, rgba(125,211,252,0.3))' }} />
        </div>

        <p className="max-w-2xl mx-auto text-base text-slate-400 leading-relaxed mb-10">
          SVR fortalece tu infraestructura comercial, elimina caídas de red y despliega agentes de IA autónomos en WhatsApp para que tu local o comercio en Zibatá nunca pierda una sola venta.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => scrollTo('contact')}
            className="btn-quantum-primary group flex items-center gap-2.5 px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wide"
          >
            Solicitar una Consulta
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo('services')}
            className="btn-quantum-ghost flex items-center gap-2 px-8 py-3.5 rounded-lg text-sm font-semibold"
          >
            Ver Paquetes
          </button>
        </div>

        {/* Trust strip */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-7 text-sm">
          {[
            { icon: ShieldCheck, text: 'Arquitectura zero-trust' },
            { icon: Zap,         text: 'Detección de amenazas con IA' },
            { icon: ShieldCheck, text: 'OWASP & ISO 27001' },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-500">
              <Icon className="w-4 h-4 text-sky-600" />
              <span className="font-mono-tech text-[11px] tracking-wide text-slate-500">{text}</span>
              {i < 2 && <span className="hidden sm:block w-px h-3 bg-slate-800 ml-5" />}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #030712, transparent)' }}
      />
    </section>
  );
}
