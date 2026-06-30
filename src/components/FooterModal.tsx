import { useEffect, useRef } from 'react';
import { X, Shield, Zap, Brain, Lock, FileText, Users, Newspaper, Building2, AlertTriangle } from 'lucide-react';

export type ModalKey =
  | 'acerca'
  | 'casos'
  | 'trabaja'
  | 'prensa'
  | 'proyectos'
  | 'privacidad'
  | 'terminos'
  | 'seguridad'
  | 'nda';

const CONTENT: Record<ModalKey, { title: string; icon: React.ElementType; tag: string; body: React.ReactNode }> = {

  /* ─── EMPRESA ─── */
  acerca: {
    title: 'Acerca de SVR',
    icon: Brain,
    tag: 'EMPRESA · MANIFIESTO',
    body: (
      <div className="space-y-6 text-sm text-slate-400 leading-relaxed">
        <p className="text-base text-slate-200 font-semibold leading-relaxed">
          SVR Intelligence Agency nació de una premisa simple: las empresas en crecimiento merecen el mismo
          nivel de defensa cibernética que las corporaciones Fortune 500. Sin concesiones. Sin tecnicismos innecesarios.
          Solo resultados medibles.
        </p>
        <div className="h-px" style={{ background: 'linear-gradient(90deg, rgba(125,211,252,0.2), transparent)' }} />
        <section>
          <h3 className="font-mono-tech text-xs text-sky-600 uppercase tracking-widest mb-3">Nuestra Misión</h3>
          <p>
            Integramos Inteligencia Artificial avanzada con metodologías de defensa proactiva para blindar
            la infraestructura digital de las PYMEs antes de que los adversarios encuentren la puerta abierta.
            No respondemos a incidentes — los prevenimos.
          </p>
        </section>
        <section>
          <h3 className="font-mono-tech text-xs text-sky-600 uppercase tracking-widest mb-3">Principios Fundamentales</h3>
          <ul className="space-y-2.5">
            {[
              ['Arquitectura Zero-Trust', 'Ninguna entidad, interna o externa, recibe confianza implícita. Cada acceso es verificado, registrado y auditado.'],
              ['IA como Multiplicador de Fuerza', 'Los agentes autónomos de J.A.R.V.I.S. operan 24/7, detectando anomalías, generando inteligencia y ejecutando respuestas en milisegundos.'],
              ['Transparencia Radical', 'Cada decisión técnica es documentada. Nuestros clientes comprenden exactamente qué se despliega en su infraestructura y por qué.'],
              ['Defensa Continua', 'La postura de seguridad no es un estado estático. Es un proceso vivo que evoluciona con el panorama de amenazas globales.'],
            ].map(([title, desc]) => (
              <li key={title as string} className="flex gap-3">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-sky-500/60 shrink-0" />
                <span><span className="text-slate-200 font-medium">{title}:</span> {desc}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="font-mono-tech text-xs text-sky-600 uppercase tracking-widest mb-3">Capacidades Tecnológicas</h3>
          <div className="grid grid-cols-2 gap-2">
            {['Pentest Ofensivo', 'Hardening de Infraestructura', 'Automatización con IA', 'OSINT & Threat Intel',
              'Cumplimiento OWASP', 'Arquitectura de Red Segura', 'Monitoreo Persistente', 'Respuesta a Incidentes'].map(c => (
              <div key={c} className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{ background: 'rgba(125,211,252,0.04)', border: '1px solid rgba(125,211,252,0.1)' }}>
                <Zap className="w-3 h-3 text-sky-700 shrink-0" />
                <span className="font-mono-tech text-[10px] text-slate-500 uppercase tracking-wider">{c}</span>
              </div>
            ))}
          </div>
        </section>
        <div className="p-4 rounded-xl" style={{ background: 'rgba(125,211,252,0.04)', border: '1px solid rgba(125,211,252,0.12)' }}>
          <p className="font-mono-tech text-[11px] text-sky-700 italic leading-relaxed">
            "En SVR no vendemos software. Vendemos certeza. La certeza de que tu empresa puede escalar,
            innovar y competir sin convertirse en el próximo titular de una brecha de datos."
          </p>
          <p className="font-mono-tech text-[10px] text-slate-700 mt-2">— Rodrigo Valdespino, Fundador &amp; Director de Estrategia</p>
        </div>
      </div>
    ),
  },

  casos: {
    title: 'Casos de Éxito',
    icon: Shield,
    tag: 'EMPRESA · EXPEDIENTES CLASIFICADOS',
    body: (
      <div className="space-y-5 text-sm">
        <p className="text-slate-500 font-mono-tech text-[11px] uppercase tracking-widest">
          // Identidades de clientes redactadas por acuerdo NDA · Expedientes desclasificados para evaluación
        </p>

        {[
          {
            code: 'PROJECT ALPHA',
            badge: 'AUTOMATIZACIÓN · LOGÍSTICA',
            status: 'COMPLETADO',
            statusColor: '#4ade80',
            year: '2025',
            summary: 'Proveedor logístico regional con 340 empleados y operaciones en 4 países. Procesos manuales críticos exponían ventanas de vulnerabilidad de hasta 6 horas.',
            results: [
              '90% de procesos operativos críticos automatizados con agentes IA',
              'Reducción de superficie de ataque en 78% tras hardening de infraestructura',
              'Tiempo de detección de anomalías: de 4.2h a 11 minutos',
              'ROI del proyecto en 4.5 meses post-implementación',
            ],
            tech: ['Docker Swarm', 'J.A.R.V.I.S. Agents', 'Zero-Trust IAM', 'SIEM Personalizado'],
          },
          {
            code: 'PROJECT SHIELD',
            badge: 'CIBERDEFENSA · SECTOR FINANCIERO',
            status: 'ACTIVO',
            statusColor: '#7dd3fc',
            year: '2025',
            summary: 'Nodo financiero procesando +$2M diarios en transacciones. Objetivo de ransomware confirmado tras análisis de inteligencia en foros de la dark web.',
            results: [
              'Ataque de ransomware RaaS prevenido 72 horas antes del vector de entrada detectado',
              'Implementación de backups cifrados air-gapped con recuperación < 15 minutos',
              'Auditoría completa OWASP Top-10 con 0 vulnerabilidades críticas residuales',
              'Cumplimiento PCI-DSS alcanzado en ciclo de 6 semanas',
            ],
            tech: ['Threat Intelligence Feeds', 'EDR Endpoint', 'Vault Encryption', 'Network Micro-segmentation'],
          },
          {
            code: 'PROJECT NEXUS',
            badge: 'INTEGRACIÓN IA · SALUD DIGITAL',
            status: 'COMPLETADO',
            statusColor: '#4ade80',
            year: '2026',
            summary: 'Plataforma de telemedicina con datos sensibles de 80,000 pacientes. Regulación GDPR y HIPAA como requisito mandatorio.',
            results: [
              'Pipeline de cifrado end-to-end implementado en 3 capas de infraestructura',
              'Agentes IA para triaje de alertas: 94% de falsos positivos eliminados',
              'Certificación ISO 27001 obtenida en primer ciclo de auditoría',
              'Tiempo medio de respuesta a incidentes: 4.3 minutos',
            ],
            tech: ['AES-256 Pipeline', 'HIPAA-Compliant Infra', 'AI Triage Engine', 'Audit Trail Immutable'],
          },
        ].map(c => (
          <div key={c.code} className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(7,15,40,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center justify-between px-5 py-3 border-b"
              style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center gap-3">
                <span className="font-mono-tech text-xs font-bold text-white tracking-widest">{c.code}</span>
                <span className="font-mono-tech text-[9px] px-2 py-0.5 rounded tracking-widest text-slate-500 uppercase"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}>{c.badge}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.statusColor }} />
                <span className="font-mono-tech text-[9px] tracking-widest" style={{ color: c.statusColor }}>{c.status}</span>
                <span className="font-mono-tech text-[9px] text-slate-700 ml-2">{c.year}</span>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-slate-400 text-sm leading-relaxed">{c.summary}</p>
              <div>
                <p className="font-mono-tech text-[9px] text-sky-800 uppercase tracking-widest mb-2">Resultados Verificados</p>
                <ul className="space-y-1.5">
                  {c.results.map(r => (
                    <li key={r} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-sky-600 mt-0.5 shrink-0">›</span>{r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {c.tech.map(t => (
                  <span key={t} className="font-mono-tech text-[9px] px-2 py-1 rounded tracking-widest text-sky-800 uppercase"
                    style={{ background: 'rgba(125,211,252,0.05)', border: '1px solid rgba(125,211,252,0.12)' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },

  trabaja: {
    title: 'Trabaja con Nosotros',
    icon: Users,
    tag: 'EMPRESA · RECLUTAMIENTO DE ÉLITE',
    body: (
      <div className="space-y-6 text-sm">
        <div className="p-4 rounded-xl" style={{ background: 'rgba(125,211,252,0.04)', border: '1px solid rgba(125,211,252,0.12)' }}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-sky-500" />
            <span className="font-mono-tech text-[10px] text-sky-500 uppercase tracking-widest">Alerta de Reclutamiento Activo</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            SVR no contrata por CVs. Contratamos por mentalidad, habilidad demostrable y hambre de resolver
            problemas que la mayoría ni sabe que existen. Si estás leyendo esto, probablemente ya pasaste
            el primer filtro.
          </p>
        </div>

        {[
          {
            role: 'Ingeniero de IA & Automatización',
            code: 'SRV-AI-01',
            type: 'Remoto · Full-time',
            color: '#818cf8',
            reqs: [
              'Dominio de Python, LangChain, y arquitecturas de agentes autónomos',
              'Experiencia construyendo pipelines de datos en producción (no en notebooks)',
              'Comprensión profunda de prompt engineering y fine-tuning de LLMs',
              'Capacidad de integrar soluciones IA en infraestructuras empresariales existentes',
            ],
          },
          {
            role: 'Ingeniero de Ciberseguridad Ofensiva',
            code: 'SVR-SEC-02',
            type: 'Remoto · Contrato / Full-time',
            color: '#f87171',
            reqs: [
              'Certificación OSCP, CEH o equivalente demostrable en práctica',
              'Experiencia en red teaming, pentest web y análisis de malware',
              'Conocimiento profundo de frameworks MITRE ATT&CK y OWASP',
              'Mentalidad adversarial: piensas como atacante para defender como experto',
            ],
          },
          {
            role: 'Arquitecto de Infraestructura Cloud',
            code: 'SVR-INF-03',
            type: 'Remoto · Full-time',
            color: '#7dd3fc',
            reqs: [
              'Dominio de AWS/GCP/Azure con enfoque en security-by-design',
              'Experiencia con Kubernetes, Docker y orquestación de microservicios',
              'Implementación de políticas IAM, VPC seguras y network segmentation',
              'Familiaridad con compliance frameworks (SOC 2, ISO 27001, GDPR)',
            ],
          },
        ].map(j => (
          <div key={j.code} className="rounded-xl p-5"
            style={{ background: 'rgba(7,15,40,0.6)', border: `1px solid rgba(255,255,255,0.07)` }}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">{j.role}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono-tech text-[9px] text-slate-700 tracking-widest">{j.code}</span>
                  <span className="font-mono-tech text-[9px] tracking-widest" style={{ color: j.color }}>{j.type}</span>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 animate-pulse" style={{ background: j.color }} />
            </div>
            <ul className="space-y-1.5">
              {j.reqs.map(r => (
                <li key={r} className="flex items-start gap-2 text-xs text-slate-500">
                  <span className="shrink-0 mt-0.5" style={{ color: j.color }}>›</span>{r}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(125,211,252,0.04)', border: '1px solid rgba(125,211,252,0.12)' }}>
          <p className="font-mono-tech text-[10px] text-sky-700 uppercase tracking-widest mb-1">Envía tu candidatura</p>
          <p className="font-mono-tech text-xs text-slate-400">careers@svr.agency — Asunto: [CÓDIGO DE POSICIÓN] + Portafolio</p>
        </div>
      </div>
    ),
  },

  prensa: {
    title: 'Sala de Prensa',
    icon: Newspaper,
    tag: 'EMPRESA · COMUNICACIONES OFICIALES',
    body: (
      <div className="space-y-5 text-sm">
        <p className="font-mono-tech text-[10px] text-slate-700 uppercase tracking-widest">
          // Comunicados oficiales · SVR Intelligence Agency · 2026
        </p>

        {[
          {
            date: '15 de Enero, 2026',
            type: 'LANZAMIENTO OFICIAL',
            typeColor: '#7dd3fc',
            title: 'SVR Intelligence Agency abre operaciones formales en el mercado latinoamericano de ciberseguridad empresarial',
            body: 'SVR Intelligence Agency anuncia su lanzamiento oficial, ofreciendo un modelo de servicio inédito en el mercado: la convergencia entre inteligencia artificial de agentes autónomos y ciberseguridad proactiva diseñada específicamente para las necesidades y presupuestos de las pequeñas y medianas empresas en crecimiento. La agencia nace como respuesta a un vacío crítico: el 73% de los ciberataques exitosos en 2025 afectaron a organizaciones con menos de 500 empleados, precisamente porque carecían de acceso a defensas de nivel empresarial.',
          },
          {
            date: '3 de Marzo, 2026',
            type: 'PRODUCTO',
            typeColor: '#818cf8',
            title: 'SVR lanza J.A.R.V.I.S.: el primer sistema de inteligencia agentic aplicado a la ciberdefensa para PYMEs',
            body: 'SVR presenta J.A.R.V.I.S. (Joint Autonomous Response & Vigilance Intelligence System), un sistema de IA diseñado para operar como analista de seguridad autónomo 24/7. J.A.R.V.I.S. integra feeds de inteligencia de amenazas en tiempo real, análisis de comportamiento de red y generación de respuestas automatizadas, democratizando capacidades que antes requerían equipos de seguridad de 15 o más personas.',
          },
          {
            date: '28 de Mayo, 2026',
            type: 'RECONOCIMIENTO',
            typeColor: '#fbbf24',
            title: 'SVR Intelligence Agency reconocida como una de las 10 agencias de ciberseguridad emergentes más prometedoras de la región',
            body: 'El análisis de mercado independiente CyberWatch LATAM 2026 posiciona a SVR entre las diez agencias de ciberseguridad con mayor proyección en América Latina, destacando su modelo de integración IA-seguridad, la efectividad demostrada de sus metodologías y su enfoque diferenciado en el segmento PYME. SVR atribuye el reconocimiento a la calidad de sus ingenieros y a su compromiso con resultados medibles sobre promesas de marketing.',
          },
        ].map(n => (
          <article key={n.title} className="rounded-xl overflow-hidden"
            style={{ background: 'rgba(7,15,40,0.5)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center justify-between px-5 py-2.5 border-b"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <span className="font-mono-tech text-[9px] tracking-widest uppercase px-2 py-0.5 rounded"
                style={{ color: n.typeColor, border: `1px solid ${n.typeColor}40`, background: `${n.typeColor}0d` }}>
                {n.type}
              </span>
              <span className="font-mono-tech text-[9px] text-slate-700">{n.date}</span>
            </div>
            <div className="p-5">
              <h3 className="text-sm font-semibold text-slate-200 leading-snug mb-3">{n.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{n.body}</p>
            </div>
          </article>
        ))}

        <div className="p-3 rounded-lg text-center" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="font-mono-tech text-[10px] text-slate-700 uppercase tracking-widest">
            Consultas de prensa: press@svr.agency
          </p>
        </div>
      </div>
    ),
  },

  /* ─── SERVICIOS ─── */
  proyectos: {
    title: 'Proyectos a Medida',
    icon: Building2,
    tag: 'SERVICIOS · ARQUITECTURA ENTERPRISE',
    body: (
      <div className="space-y-6 text-sm text-slate-400 leading-relaxed">
        <p className="text-slate-200 text-base font-semibold">
          Para organizaciones cuya complejidad supera los marcos predefinidos, SVR diseña soluciones
          de arquitectura completamente personalizadas — desde cero, sin compromisos.
        </p>
        <div className="h-px" style={{ background: 'linear-gradient(90deg, rgba(125,211,252,0.2), transparent)' }} />

        {[
          {
            title: 'Arquitectura de Seguridad Empresarial a Escala',
            desc: 'Diseño e implementación de infraestructuras de seguridad multi-capa para organizaciones con requerimientos regulatorios complejos, operaciones distribuidas globalmente o ecosistemas tecnológicos heredados (legacy). Incluye análisis de brecha, roadmap técnico detallado y acompañamiento en cada fase de implementación.',
            icon: '01',
          },
          {
            title: 'Integración Profunda de IA en Operaciones',
            desc: 'Despliegue de agentes autónomos de IA integrados directamente en los flujos operativos del cliente: desde sistemas de aprobación de crédito y triaje de soporte hasta análisis predictivo de amenazas. Cada agente es entrenado con el contexto específico del negocio del cliente.',
            icon: '02',
          },
          {
            title: 'Consolidación de Stack Tecnológico',
            desc: 'Auditoría completa del ecosistema tecnológico existente, identificación de redundancias, vectores de ataque por integración deficiente y plan de consolidación hacia una arquitectura coherente, segura y escalable. Ideal para empresas post-adquisición o con crecimiento acelerado no planificado.',
            icon: '03',
          },
          {
            title: 'Programa de Seguridad como Servicio (SaaS)',
            desc: 'Modelo de retainer estratégico donde SVR actúa como el equipo de seguridad dedicado del cliente. Incluye asignación de ingeniero senior, reuniones ejecutivas quincenales, gestión continua de vulnerabilidades y respuesta a incidentes con SLA garantizado.',
            icon: '04',
          },
        ].map(s => (
          <div key={s.title} className="flex gap-4">
            <span className="font-mono-tech text-2xl font-black text-slate-800 shrink-0 leading-none mt-0.5">{s.icon}</span>
            <div>
              <h3 className="text-slate-200 font-semibold mb-1.5">{s.title}</h3>
              <p className="text-xs leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}

        <div className="p-4 rounded-xl" style={{ background: 'rgba(125,211,252,0.04)', border: '1px solid rgba(125,211,252,0.12)' }}>
          <p className="font-mono-tech text-[10px] text-sky-700 uppercase tracking-widest mb-1">Proceso de Consulta</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Cada proyecto a medida comienza con una sesión de descubrimiento de 90 minutos sin costo.
            Documentamos tu ecosistema actual, mapeamos objetivos de negocio y entregamos una propuesta
            técnica detallada en 72 horas. Contacto: intelligence@svr.agency
          </p>
        </div>
      </div>
    ),
  },

  /* ─── LEGAL ─── */
  privacidad: {
    title: 'Política de Privacidad',
    icon: Lock,
    tag: 'LEGAL · PROTECCIÓN DE DATOS',
    body: (
      <div className="space-y-5 text-sm text-slate-400 leading-relaxed">
        <p className="font-mono-tech text-[10px] text-slate-700 uppercase tracking-widest">
          Versión 2.1 · Vigente desde el 1 de enero de 2026 · SVR Intelligence Agency
        </p>

        {[
          {
            title: '1. Responsable del Tratamiento',
            content: 'SVR Intelligence Agency (en adelante, "SVR") es la entidad responsable del tratamiento de los datos personales recopilados a través de este sitio web y en el contexto de la prestación de sus servicios. Para cualquier consulta relacionada con el tratamiento de sus datos, puede contactarnos en: privacy@svr.agency.',
          },
          {
            title: '2. Datos que Recopilamos',
            content: 'Recopilamos exclusivamente los datos necesarios para la prestación del servicio contratado: nombre completo, correo electrónico empresarial, nombre de la empresa, descripción del proyecto y el paquete de servicios seleccionado. No recopilamos datos sensibles, de categoría especial, ni información que no sea estrictamente necesaria para iniciar la relación comercial.',
          },
          {
            title: '3. Base Legal del Tratamiento',
            content: 'El tratamiento de sus datos se basa en: (a) el consentimiento explícito otorgado al enviar el formulario de contacto; (b) la ejecución de un contrato de servicios en los casos en que exista relación contractual; y (c) el interés legítimo de SVR en la prevención del fraude y la seguridad de sus sistemas.',
          },
          {
            title: '4. Finalidades del Tratamiento',
            content: 'Sus datos serán tratados para: gestionar consultas y solicitudes de servicio, ejecutar los contratos de servicios pactados, enviar comunicaciones comerciales cuando haya dado su consentimiento explícito, cumplir con obligaciones legales y regulatorias aplicables, y mejorar la calidad de nuestros servicios.',
          },
          {
            title: '5. Conservación de Datos',
            content: 'Los datos de contacto se conservan durante el tiempo necesario para gestionar la consulta o relación comercial, y por un período adicional de 3 años para cumplir con obligaciones legales. Los datos de clientes activos se conservan durante la vigencia del contrato más 5 años.',
          },
          {
            title: '6. Derechos del Interesado',
            content: 'Puede ejercer en cualquier momento sus derechos de acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición, enviando una solicitud a privacy@svr.agency con el asunto "EJERCICIO DE DERECHOS". Responderemos en un plazo máximo de 30 días hábiles.',
          },
          {
            title: '7. Seguridad de los Datos',
            content: 'SVR implementa medidas técnicas y organizativas de seguridad de nivel avanzado, incluyendo cifrado AES-256 en reposo y en tránsito, acceso con principio de mínimo privilegio, autenticación multifactor obligatoria para todos los accesos a sistemas que traten datos personales, y auditorías de seguridad trimestrales.',
          },
        ].map(s => (
          <section key={s.title}>
            <h3 className="font-mono-tech text-[11px] text-sky-600 uppercase tracking-widest mb-2">{s.title}</h3>
            <p className="text-xs leading-relaxed">{s.content}</p>
          </section>
        ))}
      </div>
    ),
  },

  terminos: {
    title: 'Términos de Servicio',
    icon: FileText,
    tag: 'LEGAL · CONDICIONES DE USO',
    body: (
      <div className="space-y-5 text-sm text-slate-400 leading-relaxed">
        <p className="font-mono-tech text-[10px] text-slate-700 uppercase tracking-widest">
          Versión 1.4 · Vigente desde el 1 de enero de 2026 · SVR Intelligence Agency
        </p>

        {[
          {
            title: '1. Objeto y Ámbito de Aplicación',
            content: 'Los presentes Términos de Servicio regulan el acceso y uso del sitio web de SVR Intelligence Agency, así como la contratación de los servicios de ciberseguridad, inteligencia artificial y automatización ofrecidos. La utilización del sitio implica la aceptación plena de estos términos.',
          },
          {
            title: '2. Descripción de los Servicios',
            content: 'SVR ofrece servicios profesionales de ciberseguridad y automatización con IA, incluyendo evaluaciones de seguridad, hardening de infraestructura, despliegue de agentes de IA y monitoreo continuo de amenazas. Los detalles específicos de cada servicio quedan definidos en el Acuerdo de Nivel de Servicio (SLA) individual.',
          },
          {
            title: '3. Consentimiento para Auditorías de Seguridad',
            content: 'Al contratar servicios de evaluación o pentest, el cliente otorga explícitamente autorización a SVR para realizar análisis de vulnerabilidades, pruebas de penetración y acceso controlado a los sistemas definidos en el alcance acordado. Cualquier actividad fuera de dicho alcance requiere autorización adicional por escrito.',
          },
          {
            title: '4. Monitoreo Zero-Trust y Cumplimiento',
            content: 'Los servicios de monitoreo continuo implican la recopilación y análisis de metadatos de red, logs de sistemas y eventos de seguridad. Esta actividad se realiza exclusivamente dentro del perímetro técnico autorizado por el cliente y en conformidad con las regulaciones locales aplicables sobre protección de datos.',
          },
          {
            title: '5. Limitación de Responsabilidad',
            content: 'SVR actúa como asesor técnico y proveedor de servicios de seguridad. Si bien implementamos las mejores prácticas disponibles, la seguridad absoluta no puede ser garantizada por ninguna entidad. SVR no será responsable de daños derivados de ataques sofisticados que superen las defensas implementadas en el alcance del servicio contratado.',
          },
          {
            title: '6. Propiedad Intelectual',
            content: 'Los informes, metodologías, herramientas personalizadas y documentación técnica generada por SVR son propiedad intelectual de SVR Intelligence Agency, salvo acuerdo expreso en contrario. El cliente recibe una licencia de uso no exclusiva para los entregables dentro del alcance del proyecto contratado.',
          },
          {
            title: '7. Ley Aplicable y Jurisdicción',
            content: 'Los presentes términos se rigen por las leyes aplicables en el territorio de operación de cada cliente. Las partes se someten a los tribunales competentes del domicilio de SVR para la resolución de cualquier controversia derivada de la interpretación o aplicación de estos términos.',
          },
        ].map(s => (
          <section key={s.title}>
            <h3 className="font-mono-tech text-[11px] text-sky-600 uppercase tracking-widest mb-2">{s.title}</h3>
            <p className="text-xs leading-relaxed">{s.content}</p>
          </section>
        ))}
      </div>
    ),
  },

  seguridad: {
    title: 'Política de Seguridad',
    icon: Shield,
    tag: 'LEGAL · POSTURA DE SEGURIDAD',
    body: (
      <div className="space-y-5 text-sm text-slate-400 leading-relaxed">
        <p className="text-slate-200 font-semibold text-base leading-relaxed">
          SVR Intelligence Agency adhiere sin excepción a metodologías de sombrero blanco (white-hat),
          marcos regulatorios internacionales y prácticas de ingeniería de seguridad de nivel élite.
        </p>
        <div className="h-px" style={{ background: 'linear-gradient(90deg, rgba(125,211,252,0.2), transparent)' }} />

        {[
          {
            title: 'Metodología White-Hat y Ética Profesional',
            content: 'Todos los compromisos de seguridad son ejecutados exclusivamente dentro del alcance técnico y legal explícitamente autorizado por el cliente. SVR mantiene un Código de Ética interno que prohíbe categóricamente cualquier actividad que no cuente con autorización documentada. Todos los profesionales de SVR firman acuerdos de conducta ética vinculantes.',
          },
          {
            title: 'Marco OWASP y Estándares de Seguridad',
            content: 'Las evaluaciones de seguridad de aplicaciones web siguen rigurosamente el OWASP Testing Guide v4.2 y el OWASP Top-10 más reciente. Para infraestructura, aplicamos los marcos CIS Benchmarks y NIST Cybersecurity Framework. Las evaluaciones de red utilizan los estándares PTES (Penetration Testing Execution Standard).',
          },
          {
            title: 'Cifrado y Protección de Datos',
            content: 'Todos los datos del cliente, incluyendo código fuente, credenciales de auditoría, hallazgos y entregables, son cifrados con AES-256 en reposo y TLS 1.3 en tránsito. Las claves de cifrado son gestionadas mediante sistemas de gestión de secretos (Vault) con rotación automática. Ningún dato del cliente se almacena fuera de los entornos acordados contractualmente.',
          },
          {
            title: 'Divulgación Responsable',
            content: 'SVR opera un programa de divulgación responsable interno. Cualquier vulnerabilidad crítica identificada durante un compromiso es comunicada al cliente dentro de las 4 horas siguientes al hallazgo. Los entregables finales incluyen vectores de ataque, pruebas de concepto y recomendaciones de remediación priorizadas por criticidad.',
          },
          {
            title: 'Certificaciones y Cumplimiento',
            content: 'Los profesionales de SVR mantienen certificaciones vigentes incluyendo OSCP, CEH, CISSP y AWS Security Specialty, entre otras. Los procesos internos de SVR cumplen con los requisitos de ISO 27001, y nos encontramos en proceso de certificación formal durante 2026.',
          },
          {
            title: 'Reporte de Vulnerabilidades',
            content: 'Si has identificado una vulnerabilidad en los sistemas de SVR, te rogamos la reportes a security@svr.agency con el asunto "RESPONSIBLE DISCLOSURE". Nos comprometemos a responder en 48 horas hábiles, mantener confidencialidad y reconocer públicamente tu contribución si lo deseas.',
          },
        ].map(s => (
          <section key={s.title}>
            <h3 className="font-mono-tech text-[11px] text-sky-600 uppercase tracking-widest mb-2">{s.title}</h3>
            <p className="text-xs leading-relaxed">{s.content}</p>
          </section>
        ))}
      </div>
    ),
  },

  nda: {
    title: 'Plantilla NDA',
    icon: FileText,
    tag: 'LEGAL · ACUERDO DE CONFIDENCIALIDAD',
    body: (
      <div className="space-y-5 text-sm text-slate-400 leading-relaxed">
        <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(125,211,252,0.04)', border: '1px solid rgba(125,211,252,0.12)' }}>
          <p className="font-mono-tech text-[10px] text-sky-600 uppercase tracking-widest mb-1">
            Documento de Referencia · No Vinculante sin Firma
          </p>
          <p className="font-mono-tech text-[9px] text-slate-700">
            Este documento es una plantilla estándar. El NDA definitivo se personaliza y firma digitalmente previo a cualquier compromiso.
          </p>
        </div>

        <div className="p-5 rounded-xl space-y-5"
          style={{ background: 'rgba(7,15,40,0.5)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'inherit' }}>
          <div className="text-center space-y-1 pb-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            <p className="text-[10px] font-mono-tech text-slate-600 uppercase tracking-widest">Acuerdo de No Divulgación Mutua</p>
            <p className="text-base font-bold text-white">MUTUAL NON-DISCLOSURE AGREEMENT</p>
            <p className="text-[10px] font-mono-tech text-slate-700">SVR Intelligence Agency · Versión Estándar 2026</p>
          </div>

          {[
            {
              title: '1. Las Partes',
              content: 'El presente Acuerdo de No Divulgación (en adelante "Acuerdo") es celebrado entre SVR Intelligence Agency (en adelante "SVR") y [NOMBRE DE LA EMPRESA CLIENTE] (en adelante "El Cliente"), de manera colectiva referidos como "Las Partes".',
            },
            {
              title: '2. Definición de Información Confidencial',
              content: 'Se considerará "Información Confidencial" cualquier dato, documento, código fuente, arquitectura de sistemas, credenciales de acceso, métricas empresariales, hallazgos de seguridad, estrategias comerciales, datos de clientes, y cualquier otra información técnica u operativa que sea compartida entre las Partes en el contexto de la evaluación, negociación o ejecución de servicios, independientemente de si fue etiquetada explícitamente como confidencial.',
            },
            {
              title: '3. Obligaciones de Confidencialidad',
              content: 'Cada Parte se compromete a: (a) mantener la Información Confidencial de la otra Parte en estricto secreto; (b) no divulgar dicha información a terceros sin consentimiento escrito previo; (c) utilizar la Información Confidencial exclusivamente para los fines del proyecto acordado; (d) implementar medidas de seguridad equivalentes o superiores a las utilizadas para proteger su propia información confidencial, pero en ningún caso inferiores a un estándar de cuidado razonable.',
            },
            {
              title: '4. Protección de Métricas Empresariales y Código',
              content: 'SVR se compromete expresamente a que ninguna métrica de negocio, código propietario, arquitectura de sistemas, base de datos de clientes ni cualquier activo digital del Cliente será utilizado, replicado, analizado fuera del alcance acordado, ni compartido con entidad alguna. Todo el material del Cliente es tratado como activo de máxima clasificación.',
            },
            {
              title: '5. Vigencia',
              content: 'El presente Acuerdo entrará en vigor en la fecha de su firma y permanecerá vigente por un período de 3 (tres) años, extendiéndose automáticamente por períodos anuales consecutivos salvo notificación escrita de terminación con 30 días de antelación.',
            },
            {
              title: '6. Sanciones por Incumplimiento',
              content: 'El incumplimiento de cualquier obligación establecida en este Acuerdo dará derecho a la Parte afectada a reclamar daños y perjuicios, incluyendo daños emergentes, lucro cesante y daño reputacional demostrable. SVR mantiene un seguro de responsabilidad civil profesional para garantizar la solvencia ante cualquier reclamación legítima.',
            },
          ].map(s => (
            <section key={s.title}>
              <h3 className="font-mono-tech text-[10px] text-sky-700 uppercase tracking-widest mb-1.5">{s.title}</h3>
              <p className="text-[11px] leading-relaxed text-slate-500">{s.content}</p>
            </section>
          ))}

          <div className="grid grid-cols-2 gap-8 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            {['SVR Intelligence Agency', '[Empresa Cliente]'].map(p => (
              <div key={p} className="space-y-3">
                <p className="font-mono-tech text-[9px] text-slate-700 uppercase tracking-widest">{p}</p>
                <div className="h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
                <div className="space-y-1">
                  <p className="font-mono-tech text-[9px] text-slate-800">Nombre: _______________</p>
                  <p className="font-mono-tech text-[9px] text-slate-800">Cargo: ________________</p>
                  <p className="font-mono-tech text-[9px] text-slate-800">Fecha: ________________</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl" style={{ background: 'rgba(125,211,252,0.04)', border: '1px solid rgba(125,211,252,0.12)' }}>
          <p className="font-mono-tech text-[10px] text-sky-700 uppercase tracking-widest mb-1">Para firmar este NDA</p>
          <p className="text-xs text-slate-500">Contacta a legal@svr.agency indicando el nombre de tu empresa. Te enviaremos el documento personalizado con firma digital DocuSign en menos de 24 horas hábiles.</p>
        </div>
      </div>
    ),
  },
};

type Props = { modalKey: ModalKey; onClose: () => void };

export default function FooterModal({ modalKey, onClose }: Props) {
  const { title, icon: Icon, tag, body } = CONTENT[modalKey];
  const overlayRef = useRef<HTMLDivElement>(null);

  /* Close on backdrop click */
  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  /* Prevent body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      style={{
        background: 'rgba(2,6,23,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:scale(1); } }
      `}</style>

      <div
        className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-2xl"
        style={{
          background: 'rgba(5,10,30,0.92)',
          border: '1px solid rgba(125,211,252,0.15)',
          boxShadow: '0 0 80px rgba(125,211,252,0.06), 0 40px 80px rgba(0,0,0,0.6)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(125,211,252,0.5), rgba(99,102,241,0.4), transparent)' }} />

        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b flex-shrink-0"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(125,211,252,0.08)', border: '1px solid rgba(125,211,252,0.18)' }}>
            <Icon className="w-4 h-4 text-sky-400" style={{ filter: 'drop-shadow(0 0 6px rgba(125,211,252,0.5))' }} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-white">{title}</h2>
            <p className="font-mono-tech text-[9px] text-sky-800 uppercase tracking-widest mt-0.5">{tag}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-sky-300 transition-all duration-200 shrink-0"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(125,211,252,0.3)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-6" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e3a5f transparent' }}>
          {body}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t flex items-center justify-between flex-shrink-0"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <span className="font-mono-tech text-[9px] text-slate-800 uppercase tracking-widest">
            SVR Intelligence Agency · 2026
          </span>
          <button onClick={onClose}
            className="btn-quantum-ghost px-4 py-1.5 rounded-lg font-mono-tech text-[10px] uppercase tracking-widest">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
