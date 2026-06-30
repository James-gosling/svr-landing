/**
 * TelemetryView — SVR Telemetry & Local Shell
 *
 * MOCK ENDPOINTS:
 *   - System metrics: GET /api/telemetry/metrics  → currently mocked as static values
 *   - Log stream:     GET /api/telemetry/logs     → currently mocked with setInterval (every 3s)
 *   - Command exec:   POST /api/shell/exec        → currently simulated with local switch
 *
 * To connect to local server:
 *   1. Replace setInterval log mock with an EventSource('/api/telemetry/logs') SSE stream
 *   2. Replace execCmd() switch with: fetch('/api/shell/exec', { method:'POST', body: JSON.stringify({ cmd }) })
 */

import { useState, useEffect, useRef } from 'react';
import { Terminal, ChevronRight, Circle, Square, Activity, Cpu, HardDrive, Wifi } from 'lucide-react';

type LogLevel = 'INFO' | 'WARN' | 'OK' | 'ERR';
type LogLine = { id: number; ts: string; level: LogLevel; msg: string };

/* ── MOCK ENDPOINT: GET /api/telemetry/logs ──
   Replace this pool with an SSE EventSource connection for real log streaming */
const LOG_POOL: Omit<LogLine, 'id' | 'ts'>[] = [
  { level: 'OK',   msg: 'Docker container [n8n-SVR] listening on port 5678...' },
  { level: 'INFO', msg: 'Scanning outbound node ports 443, 8080, 5678...' },
  { level: 'INFO', msg: 'Syncing Gmail workspace stream → svr@intelligence.agency' },
  { level: 'OK',   msg: 'Container [svr-nginx:latest] — RUNNING [CPU: 0.2% | MEM: 48MB]' },
  { level: 'INFO', msg: 'J.A.R.V.I.S. inference cycle completed [tokens: 2,148 | latency: 340ms]' },
  { level: 'OK',   msg: 'Container [svr-api:3.1] — RUNNING [CPU: 1.1% | MEM: 124MB]' },
  { level: 'WARN', msg: 'Elevated latency on edge node eu-west-2 [312ms > threshold 200ms]' },
  { level: 'INFO', msg: 'OWASP scan initiated on domain client-demo.svr.agency...' },
  { level: 'OK',   msg: 'Redis cache hit rate: 97.3% [KEYS: 4,291]' },
  { level: 'OK',   msg: 'Encrypted backup completed → s3://svr-vault/2026-06-02 [AES-256]' },
  { level: 'INFO', msg: 'Updating threat signature feeds — MITRE ATT&CK v14...' },
  { level: 'OK',   msg: 'TLS certificate auto-renewed [expires: 2027-06-02]' },
  { level: 'WARN', msg: 'SSH brute-force attempt from 185.220.101.x — blocked by firewall rule #47' },
  { level: 'OK',   msg: 'CI/CD pipeline completed — deploy v3.1.4 → production [0 errors]' },
  { level: 'INFO', msg: 'J.A.R.V.I.S. knowledge base sync [docs: 14,802 | vectors: 892,441]' },
  { level: 'OK',   msg: 'Docker Scout — 0 critical vulnerabilities in current image set' },
  { level: 'ERR',  msg: 'Webhook timeout: slack-notify [attempt 1/3, retrying in 5s...]' },
  { level: 'OK',   msg: 'Webhook recovered — slack-notify responded 200 OK [retry 2]' },
  { level: 'INFO', msg: 'Syncing Outlook enterprise stream → 3 new messages queued' },
  { level: 'OK',   msg: 'Global health check passed — all 6 services nominal' },
  { level: 'INFO', msg: 'Container [svr-jarvis:3.1] — model context window reset [tokens cleared]' },
  { level: 'OK',   msg: 'Firewall rule audit complete — 0 open unnecessary ports' },
  { level: 'INFO', msg: 'Network topology scan complete — 12 nodes mapped, 0 anomalies' },
  { level: 'WARN', msg: 'Disk usage on /var/log at 78% — rotate logs recommended' },
  { level: 'OK',   msg: 'Log rotation executed — freed 2.1 GB on /var/log' },
];

const DOCKER_CONTAINERS = [
  { name: 'svr-nginx',    image: 'nginx:1.25-alpine',  status: 'running', cpu: '0.2%',  mem: '48 MB',  uptime: '14d 6h' },
  { name: 'svr-api',      image: 'node:20-alpine',      status: 'running', cpu: '1.1%',  mem: '124 MB', uptime: '14d 6h' },
  { name: 'svr-jarvis',   image: 'svr/jarvis:3.1',      status: 'running', cpu: '3.4%',  mem: '512 MB', uptime: '14d 6h' },
  { name: 'svr-redis',    image: 'redis:7-alpine',      status: 'running', cpu: '0.4%',  mem: '62 MB',  uptime: '14d 6h' },
  { name: 'svr-postgres', image: 'postgres:16-alpine',  status: 'running', cpu: '0.8%',  mem: '186 MB', uptime: '14d 6h' },
  { name: 'svr-monitor',  image: 'svr/sentinel:1.2',    status: 'paused',  cpu: '0.0%',  mem: '24 MB',  uptime: '2d 1h'  },
];

const SYSTEM_METRICS = [
  { icon: Cpu,       label: 'CPU',     value: '18%',    sub: '8 cores' },
  { icon: HardDrive, label: 'RAM',     value: '6.2 GB', sub: 'de 16 GB' },
  { icon: Activity,  label: 'NET I/O', value: '12 MB/s',sub: 'eth0' },
  { icon: Wifi,      label: 'UPTIME',  value: '99.97%', sub: '14d 6h' },
];

const LEVEL_STYLES: Record<LogLevel, { color: string; label: string }> = {
  INFO: { color: '#7dd3fc', label: 'INFO' },
  OK:   { color: '#4ade80', label: 'OK  ' },
  WARN: { color: '#fbbf24', label: 'WARN' },
  ERR:  { color: '#f87171', label: 'ERR ' },
};

/* MOCK ENDPOINT: POST /api/shell/exec */
const COMMAND_RESPONSES: Record<string, string> = {
  'docker ps':    'Listando 6 contenedores activos (svr-nginx, svr-api, svr-jarvis, svr-redis, svr-postgres, svr-monitor)',
  'docker stats': 'svr-jarvis: CPU 3.4% | MEM 512MB | svr-api: CPU 1.1% | MEM 124MB',
  'help':         'Comandos disponibles: docker ps | docker stats | uptime | status | ports | clear',
  'uptime':       'Sistema activo hace 14 días, 6 horas, 23 minutos | carga media: 0.42',
  'status':       'Todos los sistemas operativos. J.A.R.V.I.S.: ACTIVO. Amenazas activas: 0.',
  'ports':        'Puertos en escucha: 80 (nginx), 443 (nginx-ssl), 3000 (api), 5678 (n8n), 6379 (redis)',
  'clear':        '__CLEAR__',
};

function nowTs() {
  return new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function TelemetryView() {
  const [logs, setLogs]       = useState<LogLine[]>([]);
  const [cmd, setCmd]         = useState('');
  const [counter, setCounter] = useState(0);
  const logsRef               = useRef<HTMLDivElement>(null);
  const poolIdx               = useRef(0);

  /* Seed 12 initial log lines */
  useEffect(() => {
    const seed: LogLine[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      ts: nowTs(),
      ...LOG_POOL[i % LOG_POOL.length],
    }));
    setLogs(seed);
    setCounter(12);
    poolIdx.current = 12;
  }, []);

  /* ── MOCK ENDPOINT: GET /api/telemetry/logs ──
     Replace with: const es = new EventSource('/api/telemetry/logs'); es.onmessage = e => pushLine(JSON.parse(e.data)) */
  useEffect(() => {
    const id = setInterval(() => {
      const entry = LOG_POOL[poolIdx.current % LOG_POOL.length];
      poolIdx.current++;
      setLogs(prev => {
        const next = [...prev.slice(-100), { id: Date.now(), ts: nowTs(), ...entry }];
        return next;
      });
      setCounter(c => c + 1);
    }, 3000); // ← 3-second stream interval as specified
    return () => clearInterval(id);
  }, []);

  /* Auto-scroll to bottom whenever logs update */
  useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [logs]);

  const execCmd = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' || !cmd.trim()) return;
    const command = cmd.trim().toLowerCase();
    // MOCK ENDPOINT: POST /api/shell/exec
    // Replace with: const res = await fetch('/api/shell/exec', { method:'POST', body: JSON.stringify({ cmd: command }) }); const { output } = await res.json();
    const response = COMMAND_RESPONSES[command] ?? `bash: ${cmd.trim()}: command not found`;

    if (response === '__CLEAR__') {
      setLogs([]);
    } else {
      setLogs(prev => [
        ...prev,
        { id: Date.now(),     ts: nowTs(), level: 'INFO', msg: `$ ${cmd.trim()}` },
        { id: Date.now() + 1, ts: nowTs(), level: 'OK',   msg: response },
      ]);
    }
    setCmd('');
  };

  return (
    <div className="flex flex-col h-full p-5 gap-4">

      {/* System metrics bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-shrink-0">
        {SYSTEM_METRICS.map(m => (
          <div key={m.label} className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: 'rgba(7,15,40,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <m.icon className="w-4 h-4 text-sky-700 shrink-0" />
            <div className="min-w-0">
              <div className="font-mono-tech text-[9px] text-slate-700 uppercase tracking-widest">{m.label}</div>
              <div className="text-sm font-bold text-sky-300">{m.value}</div>
              <div className="font-mono-tech text-[9px] text-slate-700">{m.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 min-h-0">

        {/* ── Live log terminal ── */}
        <div className="flex flex-col rounded-2xl overflow-hidden"
          style={{ background: 'rgba(3,7,18,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
          {/* Titlebar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b flex-shrink-0"
            style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#f87171' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#fbbf24' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#4ade80' }} />
            </div>
            <span className="font-mono-tech text-[10px] text-slate-700 ml-2 tracking-widest">
              svr@intelligence:~$ — Stream de Logs SVR
            </span>
            <div className="ml-auto flex items-center gap-2">
              <span className="font-mono-tech text-[9px] text-slate-800">[{counter} entradas]</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono-tech text-[9px] text-green-800 uppercase tracking-widest">LIVE 3s</span>
            </div>
          </div>

          {/* Log lines — auto-scroll container */}
          <div
            ref={logsRef}
            className="flex-1 overflow-y-auto p-4 space-y-0.5 font-mono-tech text-[11px]"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e3a5f transparent' }}
          >
            {logs.map(line => {
              const s = LEVEL_STYLES[line.level];
              return (
                <div key={line.id} className="flex gap-2 leading-relaxed">
                  <span className="text-slate-700 shrink-0 tabular-nums">{line.ts}</span>
                  <span className="shrink-0 w-10" style={{ color: s.color }}>[{s.label}]</span>
                  <span className="text-slate-400">{line.msg}</span>
                </div>
              );
            })}
            {/* Blinking cursor */}
            <div className="flex gap-2 mt-1 items-center">
              <span className="text-slate-700 tabular-nums">{nowTs()}</span>
              <span className="text-sky-600">$</span>
              <span className="inline-block w-2 h-3.5 bg-sky-400 opacity-80 ml-0.5"
                style={{ animation: 'coord-blink 1s step-end infinite' }} />
            </div>
          </div>

          {/* Command input */}
          <div className="px-4 pb-3 pt-2 border-t flex items-center gap-2 flex-shrink-0"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <span className="font-mono-tech text-xs text-sky-600 shrink-0">$</span>
            <input
              type="text"
              value={cmd}
              onChange={e => setCmd(e.target.value)}
              onKeyDown={execCmd}
              placeholder="Escribe un comando (help para ver opciones)..."
              className="flex-1 bg-transparent outline-none font-mono-tech text-xs text-slate-300 placeholder:text-slate-700"
            />
            <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
          </div>
        </div>

        {/* ── Docker containers ── */}
        <div className="flex flex-col rounded-2xl overflow-hidden"
          style={{ background: 'rgba(3,7,18,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2 px-4 py-2.5 border-b flex-shrink-0"
            style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <Terminal className="w-3.5 h-3.5 text-sky-700" />
            <span className="font-mono-tech text-[10px] text-slate-700 tracking-widest uppercase">Docker Containers</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {DOCKER_CONTAINERS.map(c => (
              <div key={c.name} className="rounded-lg px-3 py-2.5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono-tech text-[10px] text-slate-300">{c.name}</span>
                  {c.status === 'running'
                    ? <Circle className="w-2.5 h-2.5 fill-green-400 text-green-400" />
                    : <Square className="w-2.5 h-2.5 text-yellow-500" />
                  }
                </div>
                <div className="font-mono-tech text-[9px] text-slate-700 mb-1.5 truncate">{c.image}</div>
                <div className="flex gap-3">
                  <span className="font-mono-tech text-[9px] text-sky-800">CPU: {c.cpu}</span>
                  <span className="font-mono-tech text-[9px] text-sky-800">MEM: {c.mem}</span>
                </div>
                <div className="font-mono-tech text-[9px] text-slate-800 mt-0.5">UP {c.uptime}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
