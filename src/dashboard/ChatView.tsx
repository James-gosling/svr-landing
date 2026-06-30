import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Copy, FileText, Download, Loader2, Cpu, Zap } from 'lucide-react';

type Role = 'user' | 'assistant';
type Message = { id: string; role: Role; text: string; ts: Date; thinking?: boolean };

const QUICK_PROMPTS = [
  'Redacta un informe de postura de seguridad',
  'Explica qué es zero-trust architecture',
  'Genera una lista de vulnerabilidades OWASP Top 10',
  'Crea un plan de respuesta a incidentes',
];

const JARVIS_REPLIES: Record<string, string> = {
  default: `**Análisis completado.**

He procesado tu solicitud con el modelo AGENTIC.v3.1. Aquí tienes un resumen ejecutivo:

\`\`\`bash
# Resultado del análisis
STATUS: OPERACIONAL
CONFIANZA: 98.7%
TIEMPO_PROCESO: 1.2s
\`\`\`

**Puntos clave identificados:**

1. La infraestructura presenta vectores de ataque en capas de red perimetral
2. Recomiendo implementar segmentación de red con políticas zero-trust
3. Los agentes de monitoreo están activos y operando dentro de parámetros normales

**Próximos pasos sugeridos:**
- Ejecutar auditoría OWASP Top-10 completa
- Revisar configuraciones de contenedores Docker
- Actualizar políticas IAM en todos los entornos

¿Deseas que profundice en algún punto específico?`,
};

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-sky-400"
          style={{ animation: `node-pulse 1.2s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg, onCopy }: { msg: Message; onCopy: (t: string) => void }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1"
        style={isUser
          ? { background: 'rgba(125,211,252,0.1)', border: '1px solid rgba(125,211,252,0.2)' }
          : { background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)' }
        }
      >
        {isUser
          ? <User className="w-4 h-4 text-sky-400" />
          : <Bot className="w-4 h-4 text-indigo-400" style={{ filter: 'drop-shadow(0 0 6px rgba(99,102,241,0.6))' }} />
        }
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
        {msg.thinking ? (
          <div
            className="px-4 py-3 rounded-2xl rounded-tl-sm"
            style={{ background: 'rgba(7,15,40,0.8)', border: '1px solid rgba(99,102,241,0.15)' }}
          >
            <TypingDots />
          </div>
        ) : (
          <>
            <div
              className="px-4 py-3 rounded-2xl text-sm leading-relaxed text-slate-300 whitespace-pre-wrap"
              style={isUser
                ? { background: 'rgba(125,211,252,0.08)', border: '1px solid rgba(125,211,252,0.15)', borderRadius: '16px 16px 4px 16px' }
                : { background: 'rgba(7,15,40,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px 16px 16px 16px' }
              }
            >
              {msg.text}
            </div>

            {/* Action buttons — only for assistant */}
            {!isUser && (
              <div className="flex flex-wrap gap-1.5">
                {[
                  { icon: Copy,     label: 'Copiar Código',         action: () => onCopy(msg.text) },
                  { icon: FileText, label: 'Crear Nota Markdown',   action: () => onCopy(`# Nota\n\n${msg.text}`) },
                  { icon: Download, label: 'Exportar Documentación',action: () => onCopy(msg.text) },
                ].map(({ icon: Icon, label, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono-tech text-[9px] uppercase tracking-widest text-slate-500 hover:text-sky-300 transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(125,211,252,0.2)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
                  >
                    <Icon className="w-3 h-3" />
                    {label}
                  </button>
                ))}
              </div>
            )}

            {/* Timestamp */}
            <span className="font-mono-tech text-[9px] text-slate-700 px-1">
              {msg.ts.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default function ChatView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      text: `**J.A.R.V.I.S. en línea.**\n\nSistema de Inteligencia Artificial Avanzada de SVR operativo. Puedo ayudarte con análisis de seguridad, generación de informes, redacción de respuestas a clientes, consultas técnicas y automatización de flujos operativos.\n\n¿Qué necesitas hoy?`,
      ts: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: text.trim(), ts: new Date() };
    const thinkingMsg: Message = { id: Date.now() + '-t', role: 'assistant', text: '', ts: new Date(), thinking: true };

    setMessages(p => [...p, userMsg, thinkingMsg]);
    setInput('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 1600 + Math.random() * 800));

    setMessages(p => [
      ...p.filter(m => !m.thinking),
      { id: Date.now() + '-a', role: 'assistant', text: JARVIS_REPLIES.default, ts: new Date() },
    ]);
    setLoading(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Panel header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b flex-shrink-0"
        style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(3,7,18,0.4)' }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)' }}>
          <Bot className="w-4 h-4 text-indigo-400" style={{ filter: 'drop-shadow(0 0 6px rgba(99,102,241,0.5))' }} />
        </div>
        <div>
          <div className="text-sm font-bold text-white">J.A.R.V.I.S.</div>
          <div className="font-mono-tech text-[9px] text-indigo-700 uppercase tracking-widest">
            Inteligencia Artificial de Comando
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {copied && (
            <span className="font-mono-tech text-[9px] text-sky-400 uppercase tracking-widest animate-pulse">
              Copiado
            </span>
          )}
          <Zap className="w-3.5 h-3.5 text-indigo-600" />
          <span className="font-mono-tech text-[9px] text-slate-700 uppercase tracking-widest hidden sm:block">
            [ MODEL: AGENTIC.v3.1 ]
          </span>
        </div>
      </div>

      {/* Quick prompts */}
      <div className="flex gap-2 px-6 py-3 border-b flex-shrink-0 overflow-x-auto"
        style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        {QUICK_PROMPTS.map(q => (
          <button
            key={q}
            onClick={() => send(q)}
            disabled={loading}
            className="shrink-0 font-mono-tech text-[10px] text-slate-500 hover:text-sky-300 px-3 py-1.5 rounded-lg transition-all duration-200 disabled:opacity-40"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', whiteSpace: 'nowrap' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(125,211,252,0.2)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.map(msg => (
          <MessageBubble key={msg.id} msg={msg} onCopy={handleCopy} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-6 pb-6 flex-shrink-0">
        <div
          className="flex items-end gap-3 p-3 rounded-2xl"
          style={{ background: 'rgba(7,15,40,0.7)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)' }}
        >
          <Cpu className="w-4 h-4 text-slate-700 mb-2.5 shrink-0" />
          <textarea
            rows={1}
            value={input}
            onChange={e => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'; }}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="Escribe un comando para J.A.R.V.I.S. (Enter para enviar, Shift+Enter para nueva línea)..."
            className="flex-1 bg-transparent outline-none text-sm text-slate-200 resize-none min-h-[36px] leading-relaxed placeholder:font-mono-tech placeholder:text-slate-700 placeholder:text-[11px]"
          />
          <button
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            className="btn-quantum-primary shrink-0 w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-40 disabled:transform-none"
          >
            {loading
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <Send className="w-4 h-4" />
            }
          </button>
        </div>
        <p className="font-mono-tech text-[9px] text-slate-800 text-center mt-2 tracking-widest uppercase">
          J.A.R.V.I.S. · SVR Neural Intelligence · Respuestas simuladas en modo demo
        </p>
      </div>
    </div>
  );
}
