import { useState, useRef, useEffect } from 'react';
import anime from 'animejs';

interface Noticia {
  id: number;
  titulo: string;
  fecha: string;
  descripcion: string;
  icon: string;
  categoria: string;
}

export default function Noticias() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const currentRef = useRef<any>(null);
  const nextRef = useRef<any>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<any>(null);

  const STORY_DURATION = 10000; // 10 segundos por historia

  const noticias: Noticia[] = [
    {
      id: 1,
      titulo: "Implementación de Nuevo Sistema SAP",
      fecha: "21 de Noviembre, 2025",
      descripcion: "La Dirección implementa sistema ERP SAP para optimizar la gestión operacional y mejorar la eficiencia en todos los procesos.",
      icon: "📰",
      categoria: "Tecnología"
    },
    {
      id: 2,
      titulo: "Operativo Nacional Exitoso",
      fecha: "18 de Noviembre, 2025",
      descripcion: "Coordinación efectiva de operaciones policiales a nivel nacional resultando en mejoras significativas en seguridad ciudadana.",
      icon: "🎯",
      categoria: "Operaciones"
    },
    {
      id: 3,
      titulo: "Reconocimiento Institucional",
      fecha: "15 de Noviembre, 2025",
      descripcion: "La Dirección recibe reconocimiento por innovación en gestión técnica y mejora continua de procesos operacionales.",
      icon: "🏆",
      categoria: "Logros"
    },
    {
      id: 4,
      titulo: "Capacitación en Liderazgo",
      fecha: "12 de Noviembre, 2025",
      descripcion: "Programa de desarrollo de habilidades directivas para fortalecer el liderazgo institucional en todos los niveles.",
      icon: "📚",
      categoria: "Formación"
    },
    {
      id: 5,
      titulo: "Modernización de Infraestructura",
      fecha: "08 de Noviembre, 2025",
      descripcion: "Inversión en actualización tecnológica y mejora de instalaciones para optimizar servicios a nivel nacional.",
      icon: "🏗️",
      categoria: "Infraestructura"
    },
    {
      id: 6,
      titulo: "Convenio Interinstitucional",
      fecha: "05 de Noviembre, 2025",
      descripcion: "Alianza estratégica con instituciones públicas para fortalecer la cooperación y mejorar la eficiencia operativa.",
      icon: "🤝",
      categoria: "Alianzas"
    }
  ];

  const changeSlide = (direction: 'next' | 'prev', opts?: { force?: boolean }) => {
    const force = opts?.force === true;

    // Si hay una animación en curso y NO es una acción forzada por el usuario, no interrumpimos
    if (timelineRef.current && !force) return;

    // Si la acción es forzada por el usuario, abortamos/pausamos la timeline y restauramos estilos
    if (timelineRef.current && force) {
      try {
        timelineRef.current.pause();
      } catch {}
      timelineRef.current = null;
      try {
        if (currentRef.current) anime.set(currentRef.current, { opacity: 1, scale: 1, translateX: 0, zIndex: 20 });
        if (nextRef.current) anime.set(nextRef.current, { opacity: 0, scale: 1, translateX: 0, zIndex: 10 });
      } catch {}
      setIsAnimating(false);
    }

    if (isAnimating && !force) return;

    const newIndex = direction === 'next'
      ? (currentIndex + 1) % noticias.length
      : (currentIndex - 1 + noticias.length) % noticias.length;

    setNextIndex(newIndex);
    setIsAnimating(true);
    setShowDetail(false);

    // Esperar actualización del DOM con doble requestAnimationFrame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!currentRef.current || !nextRef.current) {
          setCurrentIndex(newIndex);
          setIsAnimating(false);
          return;
        }

        // Preparar capas para animación: next encima del current
        anime.set(currentRef.current, { opacity: 1, scale: 1, translateX: 0, zIndex: 20 });
        anime.set(nextRef.current, { opacity: 0, scale: 1, translateX: 0, zIndex: 20 });

        // Reducir repaints: quitar sombra durante la animación
        const prevShadowCurrent = currentRef.current.style.boxShadow;
        const prevShadowNext = nextRef.current.style.boxShadow;
        try {
          currentRef.current.style.boxShadow = 'none';
          nextRef.current.style.boxShadow = 'none';
        } catch {}

        const timeline = anime.timeline({
          easing: 'cubicBezier(.22,.9,.28,1)',
          duration: 640,
          complete: () => {
            // Al completar, actualizar índice y limpiar estilos para la siguiente transición
            setCurrentIndex(newIndex);
            // resetear progreso una vez que la nueva historia está visible para evitar salto visual
            setProgress(0);
            setIsAnimating(false);
            try {
                  // Restaurar sombras y estilos
                  if (currentRef.current) currentRef.current.style.boxShadow = prevShadowCurrent || '';
                  if (nextRef.current) nextRef.current.style.boxShadow = prevShadowNext || '';
                  if (currentRef.current) anime.set(currentRef.current, { opacity: 1, scale: 1, translateX: 0, zIndex: 20 });
                  if (nextRef.current) anime.set(nextRef.current, { opacity: 0, scale: 1, translateX: 0, zIndex: 10 });
                } catch {
                  // elementos pudieron haberse desmontado
                }
            timelineRef.current = null;
          }
        });

        // Guardar referencia para poder abortar la animación desde handlers
        timelineRef.current = timeline;

        timeline
          .add({
            targets: currentRef.current,
            opacity: [1, 0],
            scale: [1, 0.985],
            translateX: [-4, -8]
          })
          .add({
            targets: nextRef.current,
            opacity: [0, 1],
            scale: [1.02, 1],
            translateX: [16, 0]
          }, '-=560');
      });
    });
  };

  // Gestionar progreso de la barra
  useEffect(() => {
    // El progreso sigue corriendo incluso durante la animación; solo se pausa si se abre el detalle
    if (showDetail) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      return;
    }

    setProgress(0);
    const startTime = Date.now();

    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / STORY_DURATION) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        // Intentar avanzar; changeSlide ignorará si ya está animando
        changeSlide('next');
      }
    }, 16);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentIndex, showDetail]);

  // Cleanup defensivo del interval al desmontar el componente
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, []);

  const handleOpenDetail = () => {
    setShowDetail(true);
    
    setTimeout(() => {
      if (modalRef.current) {
        anime({
          targets: modalRef.current,
          opacity: [0, 1],
          scale: [0.95, 1],
          duration: 400,
          easing: 'easeOutCubic'
        });
      }
    }, 0);
  };

  const handleCloseDetail = () => {
    if (modalRef.current) {
      anime({
        targets: modalRef.current,
        opacity: [1, 0],
        scale: [1, 0.95],
        duration: 300,
        easing: 'easeInCubic',
        complete: () => {
          setShowDetail(false);
        }
      });
    } else {
      setShowDetail(false);
    }
  };

  const handlePrevious = () => {
    changeSlide('prev', { force: true });
  };

  const handleNext = () => {
    changeSlide('next', { force: true });
  };

  return (
    <section id="noticias" className="pt-36 pb-40  bg-linear-to-b from-white to-gray-50">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-secondary-green font-semibold text-sm uppercase tracking-[2px] mb-2">
            ACTUALIZACIONES
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark mb-4">
            Noticias Destacadas
          </h2>
          <p className="text-lg md:text-xl text-text-light max-w-[700px] mx-auto leading-relaxed">
            Mantente informado sobre nuestras últimas operaciones, logros y actualizaciones institucionales.
          </p>
        </div>

        {/* Carrusel Instagram Stories Style */}
        <div className="relative md:h-[860px] h-auto flex items-center justify-center rounded-2xl">
          {/* Smartphone SVG (decorative) - visible en md+ y oculto en móvil */}
          <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none z-0">
            <img
              src={`${import.meta.env.BASE_URL}smart_phone.svg`}
              alt=""
              aria-hidden="true"
              className="w-[270px] md:w-[400px] lg:w-[400px] h-auto max-w-full"
            />
          </div>
          {/* Contenedor de historias - Proporción móvil 9:16 */}
          <div className="relative w-full max-w-[360px] md:w-[360px] h-[640px] md:h-[720px] z-10">
          {/* Barra de progreso superior (siempre visible, encima de las capas) */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-[360px] z-50 px-3 flex gap-1.5 pointer-events-none">
            {noticias.map((_, index) => (
              <div key={index} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{
                    width: index < currentIndex ? '100%' : index === currentIndex ? `${progress}%` : '0%',
                    transition: index === currentIndex ? 'none' : 'width 0.3s ease'
                  }}
                />
              </div>
            ))}
          </div>

            <button
              ref={currentRef}
              type="button"
              onClick={handleOpenDetail}
              className="absolute inset-0 bg-transparent rounded-3xl shadow-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300 text-left focus:outline-none focus:ring-2 focus:ring-primary-green z-20"
                style={{ willChange: 'opacity, transform', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
              aria-label={`Abrir detalle ${noticias[currentIndex].titulo}`}
            >

              {/* Imagen/Icon de fondo grande - usar overlay para legibilidad, smartphone SVG queda detrás */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                {/* Fondo verde gradiente detrás del overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-primary-green via-secondary-green to-[#35AF6F] z-0" />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black/80 z-10" />
                <span className="relative z-20 text-[120px] md:text-[180px] drop-shadow-2xl opacity-85">{noticias[currentIndex].icon}</span>
              </div>

              {/* Contenido inferior */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <span className="inline-block px-3 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-xs font-bold mb-3 border border-white/30">
                  {noticias[currentIndex].categoria}
                </span>
                <h3 className="text-white font-bold text-xl mb-2 leading-tight drop-shadow-lg">{noticias[currentIndex].titulo}</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-2 drop-shadow-md line-clamp-2">{noticias[currentIndex].descripcion}</p>
                <span className="text-white/70 text-xs flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {noticias[currentIndex].fecha}
                </span>
                
                {/* Indicador "Toca para ver más" */}
                <div className="mt-3 flex items-center gap-1.5 text-white/70 text-xs">
                  <svg className="w-3.5 h-3.5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  <span>Toca para ver más</span>
                </div>
              </div>
            </button>

            <div
              ref={nextRef}
              className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-950 to-black rounded-3xl shadow-2xl overflow-hidden opacity-0 pointer-events-none"
              style={{ willChange: 'opacity, transform', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
            >
              {/* Imagen/Icon de fondo grande */}
              <div className="absolute inset-0 bg-linear-to-br from-primary-green via-secondary-green to-[#35AF6F] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black/90" />
                <span className="relative z-10 text-[180px] drop-shadow-2xl opacity-80">{noticias[nextIndex].icon}</span>
              </div>

              {/* Contenido inferior */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <span className="inline-block px-3 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-xs font-bold mb-3 border border-white/30">
                  {noticias[nextIndex].categoria}
                </span>
                <h3 className="text-white font-bold text-xl mb-2 leading-tight drop-shadow-lg">{noticias[nextIndex].titulo}</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-2 drop-shadow-md line-clamp-2">{noticias[nextIndex].descripcion}</p>
                <span className="text-white/70 text-xs flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {noticias[nextIndex].fecha}
                </span>
              </div>
              </div>

            {/* Botones de navegación lateral */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-xl transition-all border border-white/20 hover:scale-110 active:scale-95"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-xl transition-all border border-white/20 hover:scale-110 active:scale-95"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Modal de detalle pantalla completa */}
          {showDetail && (
            <div className="fixed inset-0 bg-[#0F172A]/98 backdrop-blur-xl z-9999 flex items-center justify-center animate-fadeIn">
              <div ref={modalRef} className="relative w-full h-full bg-linear-to-br from-slate-900 via-slate-950 to-black shadow-2xl overflow-hidden" style={{ opacity: 0 }}>
                {/* Header con imagen de fondo */}
                <div className="relative h-80 bg-linear-to-br from-primary-green via-secondary-green to-[#35AF6F] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black/80" />
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
                  <span className="relative z-10 text-[200px] drop-shadow-2xl">{noticias[currentIndex].icon}</span>
                  
                  {/* Botón cerrar */}
                  <button
                    onClick={handleCloseDetail}
                    className="absolute top-6 right-6 z-20 w-12 h-12 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all hover:scale-110 border border-white/20"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Contenido scrollable */}
                <div className="overflow-y-auto h-[calc(100vh-20rem)] p-8 md:p-12">
                  {/* Meta información */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="inline-block px-4 py-2 bg-secondary-green/20 text-secondary-green rounded-full text-sm font-bold border border-secondary-green/30">
                      {noticias[currentIndex].categoria}
                    </span>
                    <span className="text-white/60 text-sm flex items-center gap-2">
                      <svg className="w-4 h-4 text-secondary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {noticias[currentIndex].fecha}
                    </span>
                  </div>

                  {/* Título */}
                  <h2 className="text-white font-bold text-4xl md:text-5xl mb-6 leading-tight">
                    {noticias[currentIndex].titulo}
                  </h2>

                  {/* Descripción */}
                  <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8">
                    {noticias[currentIndex].descripcion}
                  </p>

                  <div className="space-y-6 pt-6 border-t border-white/10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 shrink-0 bg-secondary-green/20 rounded-xl flex items-center justify-center border border-secondary-green/30">
                        <svg className="w-6 h-6 text-secondary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg mb-2">Detalles de la Noticia</h3>
                        <p className="text-white/80 leading-relaxed">
                          {noticias[currentIndex].descripcion} Esta noticia representa un hito importante en nuestro desarrollo institucional y 
                          refleja el compromiso continuo con la excelencia operacional y el servicio a la comunidad.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 shrink-0 bg-secondary-green/20 rounded-xl flex items-center justify-center border border-secondary-green/30">
                        <svg className="w-6 h-6 text-secondary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg mb-2">Impacto Institucional</h3>
                        <p className="text-white/80 leading-relaxed">
                          Esta iniciativa fortalece nuestra capacidad operativa y mejora la eficiencia en los procesos clave de la institución,
                          beneficiando directamente a todo el personal y a la ciudadanía que servimos.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Botón CTA */}
                  <div className="mt-10 flex gap-4">
                    <button className="flex-1 py-4 bg-linear-to-r from-primary-green to-secondary-green text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-secondary-green/40 transition-all hover:scale-[1.02]">
                      Leer Artículo Completo
                    </button>
                    <button 
                      onClick={handleCloseDetail}
                      className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold text-lg rounded-xl border border-white/20 transition-all hover:scale-[1.02]"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botón 'Ver Todas las Noticias' eliminado a pedido del usuario */}
      </div>
    </section>
  );
}
