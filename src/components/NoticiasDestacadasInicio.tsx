import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

interface Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  fecha: string;
  imagen: string;
  icon: string;
}

export default function NoticiasDestacadasInicio() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const sideCardsRef = useRef<HTMLDivElement>(null);
  const bottomCardsRef = useRef<HTMLDivElement>(null);

  const [animatedHeader, setAnimatedHeader] = useState(false);
  const [animatedMain, setAnimatedMain] = useState(false);
  const [animatedSide, setAnimatedSide] = useState(false);
  const [animatedBottom, setAnimatedBottom] = useState(false);

  // Array completo de proyectos (las mismas del componente Noticias - NoticiaProyecto)
  const todasLasNoticias: Noticia[] = [
    {
      id: 1,
      titulo: "Modernización Sistema SAP Institucional",
      fecha: "Noviembre 2025",
      descripcion: "Implementación exitosa del sistema ERP SAP para optimizar la gestión de recursos y procesos operacionales.",
      categoria: "Tecnología",
      imagen: '/landing-dinaoperpol/hero_finanzas.png',
      icon: "💻"
    },
    {
      id: 2,
      titulo: "Optimización Red Logística Nacional",
      fecha: "Octubre 2025",
      descripcion: "Reestructuración de la cadena de suministro para mejorar tiempos de respuesta en abastecimiento operacional.",
      categoria: "Logística",
      imagen: '/landing-dinaoperpol/hero_logistica.png',
      icon: "📦"
    },
    {
      id: 3,
      titulo: "Infraestructura Tecnológica de Última Generación",
      fecha: "Septiembre 2025",
      descripcion: "Actualización completa de la infraestructura TIC con servidores de alta disponibilidad y seguridad.",
      categoria: "Infraestructura",
      imagen: '/landing-dinaoperpol/hero_tic.png',
      icon: "🖥️"
    },
    {
      id: 4,
      titulo: "Programa de Capacitación en Compras Públicas",
      fecha: "Agosto 2025",
      descripcion: "Formación especializada en procesos de adquisición pública para personal institucional.",
      categoria: "Formación",
      imagen: '/landing-dinaoperpol/hero_director.png',
      icon: "📚"
    },
    {
      id: 5,
      titulo: "Sistema de Gestión de Activos Institucionales",
      fecha: "Julio 2025",
      descripcion: "Plataforma digital para control y seguimiento de patrimonio y equipamiento policial.",
      categoria: "Gestión",
      imagen: '/landing-dinaoperpol/hero_finanzas.png',
      icon: "📊"
    },
    {
      id: 6,
      titulo: "Alianza Estratégica Interinstitucional",
      fecha: "Junio 2025",
      descripcion: "Convenio de cooperación con instituciones públicas para optimizar recursos compartidos.",
      categoria: "Alianzas",
      imagen: '/landing-dinaoperpol/hero_logistica.png',
      icon: "🤝"
    }
  ];

  // Tomar las últimas 6 noticias (todos los proyectos)
  const noticiasRecientes = todasLasNoticias.slice(0, 6);
  const noticiasPrincipales = [noticiasRecientes[0]];
  const noticiasSecundarias = noticiasRecientes.slice(1, 3);
  const noticiasRegionales = noticiasRecientes.slice(3, 6);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === headerRef.current && !animatedHeader) {
              anime({
                targets: headerRef.current,
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 1000,
                easing: 'easeOutExpo'
              });
              setAnimatedHeader(true);
            }
            if (entry.target === mainCardRef.current && !animatedMain) {
              anime({
                targets: mainCardRef.current,
                opacity: [0, 1],
                scale: [0.95, 1],
                duration: 1000,
                delay: 200,
                easing: 'easeOutExpo'
              });
              setAnimatedMain(true);
            }
            if (entry.target === sideCardsRef.current && !animatedSide) {
              const cards = sideCardsRef.current.querySelectorAll('.side-card');
              anime({
                targets: cards,
                opacity: [0, 1],
                translateX: [30, 0],
                duration: 800,
                delay: anime.stagger(150, { start: 400 }),
                easing: 'easeOutExpo'
              });
              setAnimatedSide(true);
            }
            if (entry.target === bottomCardsRef.current && !animatedBottom) {
              const cards = bottomCardsRef.current.querySelectorAll('.bottom-card');
              anime({
                targets: cards,
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
                delay: anime.stagger(150, { start: 600 }),
                easing: 'easeOutExpo'
              });
              setAnimatedBottom(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (mainCardRef.current) observer.observe(mainCardRef.current);
    if (sideCardsRef.current) observer.observe(sideCardsRef.current);
    if (bottomCardsRef.current) observer.observe(bottomCardsRef.current);

    return () => observer.disconnect();
  }, [animatedHeader, animatedMain, animatedSide, animatedBottom]);

  return (
    <section ref={sectionRef} id="inicio-noticias" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <div className="text-secondary-green font-semibold text-sm uppercase tracking-[2px] mb-2">
             ACTUALIZACIONES
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark mb-4">
             Últimas Noticias
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Mantente informado sobre nuestras actividades y logros más recientes
          </p>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Noticia principal (izquierda) */}
          <div ref={mainCardRef} className="lg:col-span-2 opacity-0">
            {noticiasPrincipales.map((noticia) => (
              <div
                key={noticia.id}
                className="group relative h-[500px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-green via-secondary-green to-[#35AF6F] flex items-center justify-center">
                  <span className="text-[120px] drop-shadow-2xl">{noticia.icon}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <span className="inline-block px-3 py-1.5 bg-secondary-green/90 rounded-full text-xs font-bold mb-4">
                    {noticia.categoria}
                  </span>
                  <h3 className="text-3xl font-bold mb-3 leading-tight group-hover:text-secondary-green transition-colors">
                    {noticia.titulo}
                  </h3>
                  <p className="text-gray-200 text-base leading-relaxed mb-4">
                    {noticia.descripcion}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {noticia.fecha}
                    </span>
                    <button
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('openProyecto', { detail: { id: noticia.id } }));
                      }}
                      className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-secondary-green hover:bg-primary-green rounded-full text-white text-sm font-bold transition-all hover:scale-105"
                    >
                      Ver más Detalle
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Noticias secundarias (derecha) */}
          <div ref={sideCardsRef} className="space-y-6">
            {noticiasSecundarias.map((noticia) => (
              <div
                key={noticia.id}
                className="side-card group relative h-[238px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 opacity-0"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-green via-secondary-green to-[#35AF6F] flex items-center justify-center">
                  <span className="text-[80px] drop-shadow-2xl">{noticia.icon}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="inline-block px-3 py-1 bg-secondary-green/90 rounded-full text-xs font-bold mb-3">
                    {noticia.categoria}
                  </span>
                  <h4 className="text-lg font-bold mb-2 leading-tight group-hover:text-secondary-green transition-colors line-clamp-2">
                    {noticia.titulo}
                  </h4>
                  <p className="text-gray-200 text-sm leading-relaxed line-clamp-2 mb-3">
                    {noticia.descripcion}
                  </p>
                  <button
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('openProyecto', { detail: { id: noticia.id } }));
                    }}
                    className="inline-flex items-center gap-1 text-secondary-green hover:text-white text-xs font-bold transition-colors"
                  >
                    Ver más Detalle
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Noticias regionales (abajo) */}
        <div ref={bottomCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {noticiasRegionales.map((noticia) => (
            <div
              key={noticia.id}
              className="bottom-card group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl border border-gray-100 hover:border-secondary-green/30 transition-all duration-500 hover:-translate-y-2 opacity-0"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-green via-secondary-green to-[#35AF6F] flex items-center justify-center">
                <span className="text-[80px] drop-shadow-2xl">{noticia.icon}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-secondary-green/90 rounded-full text-xs font-bold text-white">
                  {noticia.categoria}
                </span>
              </div>
              
              <div className="p-6">
                <h4 className="text-lg font-bold text-text-dark mb-2 leading-tight group-hover:text-secondary-green transition-colors line-clamp-2">
                  {noticia.titulo}
                </h4>
                <p className="text-text-light text-sm leading-relaxed line-clamp-2 mb-3">
                  {noticia.descripcion}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-xs flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {noticia.fecha}
                  </span>
                  <button
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('openProyecto', { detail: { id: noticia.id } }));
                    }}
                    className="inline-flex items-center gap-1 text-secondary-green hover:text-primary-green text-xs font-bold transition-colors"
                  >
                    Ver más Detalle
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón Ver más noticias */}
        <div className="text-center mt-12">
          <a
            href="#noticias-proyectos"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-green to-secondary-green text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:from-secondary-green hover:to-primary-green transition-all duration-300 hover:scale-105"
          >
            Ver más Noticias
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
