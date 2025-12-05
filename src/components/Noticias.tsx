import { useState, useRef, useEffect } from 'react';
import anime from 'animejs';

// Hook personalizado de visibilidad
const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0, ...options });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return [elementRef, isVisible] as const;
};

interface Noticia {
  id: number;
  titulo: string;
  fecha: string;
  descripcion: string;
  icon: string;
  image?: string;
  categoria: string;
}

export default function Noticias() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const progressIntervalRef = useRef<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const progressRef = useRef<number>(0);

  // Estados y refs para animaciones
  const [sectionRef, sectionVisible] = useIntersectionObserver({ threshold: 0 });
  const [animatedHeader, setAnimatedHeader] = useState(false);
  const [animatedCarousel, setAnimatedCarousel] = useState(false);
  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [carouselRef, carouselVisible] = useIntersectionObserver({ threshold: 0.1 });
  const headerTitleRef = useRef(null);
  const carouselContainerRef = useRef(null);

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

  const changeSlide = (direction: 'next' | 'prev') => {
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % noticias.length
      : (currentIndex - 1 + noticias.length) % noticias.length;

    // Fade out rápido
    setIsVisible(false);
    
    // Cambiar contenido después de fade out
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setProgress(0);
      progressRef.current = 0;
      setIsVisible(true); // Fade in
    }, 200);
  };

  const handlePrevious = () => {
    changeSlide('prev');
  };

  const handleNext = () => {
    changeSlide('next');
  };

  const handleOpenDetail = () => {
    setShowDetail(true);
    setTimeout(() => {
      try { closeBtnRef.current?.focus(); } catch {}
    }, 100);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  // Animación del header
  useEffect(() => {
    if (!sectionVisible) {
      anime.set(headerTitleRef.current, { opacity: 0, translateY: 30 });
      setAnimatedHeader(false);
    } else if (headerVisible && !animatedHeader) {
      setAnimatedHeader(true);
      anime({
        targets: headerTitleRef.current,
        translateY: [30, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 100
      });
    }
  }, [headerVisible, sectionVisible, animatedHeader]);

  // Animación del carrusel
  useEffect(() => {
    if (!sectionVisible) {
      anime.set(carouselContainerRef.current, { opacity: 0, scale: 0.9 });
      setAnimatedCarousel(false);
    } else if (carouselVisible && !animatedCarousel) {
      setAnimatedCarousel(true);
      anime({
        targets: carouselContainerRef.current,
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo'
      });
    }
  }, [carouselVisible, sectionVisible, animatedCarousel]);

  // Control del modal
  useEffect(() => {
    if (!showDetail) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseDetail();
    };

    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [showDetail]);

  // Autoplay con progreso
  useEffect(() => {
    const TICK = 100;

    const start = () => {
      if (progressIntervalRef.current) return;
      progressRef.current = 0;
      setProgress(0);
      
      progressIntervalRef.current = window.setInterval(() => {
        progressRef.current += TICK;
        const pct = Math.min(100, Math.round((progressRef.current / STORY_DURATION) * 100));
        setProgress(pct);
        
        if (progressRef.current >= STORY_DURATION) {
          progressRef.current = 0;
          setProgress(0);
          changeSlide('next');
        }
      }, TICK) as unknown as number;
    };

    const stop = () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };

    if (!showDetail) start();
    else stop();

    return () => stop();
  }, [showDetail, currentIndex]);

  // Cleanup global al desmontar
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="noticias" className="pt-36 pb-40 bg-linear-to-b from-white to-gray-50">
      <div className="max-w-[1400px] mx-auto px-8 mb-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10">
          <div ref={headerTitleRef} className="opacity-0">
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
        </div>

        {/* Carrusel Instagram Stories Style */}
        <div ref={carouselRef} className="relative md:h-[860px] h-auto flex items-center justify-center rounded-2xl">
          <div ref={carouselContainerRef} className="opacity-0 relative flex items-center justify-center w-full">
            {/* Smartphone SVG (decorativo) */}
            <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none z-0">
              <img
                src={`${import.meta.env.BASE_URL}smart_phone.svg`}
                alt=""
                aria-hidden="true"
                className="w-[270px] md:w-[400px] lg:w-[400px] h-auto max-w-full"
              />
            </div>

            {/* Contenedor de historias */}
            <div className="relative w-full max-w-[360px] md:w-[360px] h-[640px] md:h-[720px] z-10 mx-auto">{/* Barra de progreso superior */}
            {/* Barra de progreso superior */}
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

            {/* Tarjeta de noticia con transición CSS simple */}
            <button
              type="button"
              onClick={handleOpenDetail}
              className="absolute inset-0 bg-transparent rounded-3xl shadow-2xl overflow-hidden cursor-pointer hover:scale-[1.02] text-left focus:outline-none focus:ring-2 focus:ring-primary-green"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 200ms ease-in-out, transform 300ms ease-out'
              }}
              aria-label={`Abrir detalle ${noticias[currentIndex].titulo}`}
            >
              {/* Fondo con gradiente e icon */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary-green via-secondary-green to-[#35AF6F] z-0" />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black/80 z-10" />
                <span className="relative z-20 text-[120px] md:text-[180px] drop-shadow-2xl opacity-85">
                  {noticias[currentIndex].icon}
                </span>
              </div>

              {/* Contenido inferior */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <span className="inline-block px-3 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-xs font-bold mb-3 border border-white/30">
                  {noticias[currentIndex].categoria}
                </span>
                <h3 className="text-white font-bold text-xl mb-2 leading-tight drop-shadow-lg">
                  {noticias[currentIndex].titulo}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed mb-2 drop-shadow-md line-clamp-2">
                  {noticias[currentIndex].descripcion}
                </p>
                <span className="text-white/70 text-xs flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {noticias[currentIndex].fecha}
                </span>
                
                <div className="mt-3 flex items-center gap-1.5 text-white/70 text-xs">
                  <svg className="w-3.5 h-3.5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  <span>Toca para ver más</span>
                </div>
              </div>
            </button>

            {/* Botones de navegación */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-xl transition-all border border-white/20 hover:scale-110 active:scale-95"
              aria-label="Noticia anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-xl transition-all border border-white/20 hover:scale-110 active:scale-95"
              aria-label="Noticia siguiente"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          </div>
        </div>

        {/* Modal de detalle */}
        {showDetail && (
            <div 
              role="dialog" 
              aria-modal="true" 
              aria-labelledby="noticias-modal-title" 
              className="fixed inset-0 bg-slate-50/30 backdrop-blur-md z-999 flex items-center justify-center p-6"
              style={{
                animation: 'fadeIn 300ms ease-out'
              }}
            >
              <div 
                ref={modalRef} 
                className="relative w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
                style={{
                  animation: 'slideUp 300ms ease-out'
                }}
              >
                <button
                  ref={closeBtnRef}
                  onClick={handleCloseDetail}
                  aria-label="Cerrar detalle"
                  className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-slate-700 transition-transform hover:scale-105 border border-slate-200 shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="md:grid md:grid-cols-2">
                  {/* Visual */}
                  <div className="relative h-56 md:h-auto md:min-h-80 flex items-center justify-center bg-linear-to-br from-primary-green via-secondary-green to-[#35AF6F]">
                    <div className="relative z-10 text-[96px] md:text-[120px] drop-shadow-sm text-white">
                      {noticias[currentIndex].icon}
                    </div>
                    <div className="absolute -bottom-8 left-8 md:left-10 z-20">
                      <span className="inline-block px-3 py-1.5 bg-white/10 text-white rounded-full text-xs font-semibold border border-white/12 shadow-sm">
                        {noticias[currentIndex].categoria}
                      </span>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-6 md:p-10 lg:p-12 bg-white text-slate-900">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <span className="inline-block px-3 py-2 bg-secondary-green/10 text-secondary-green rounded-full text-sm font-bold border border-secondary-green/20">
                          {noticias[currentIndex].categoria}
                        </span>
                        <span className="text-slate-500 text-sm">{noticias[currentIndex].fecha}</span>
                      </div>
                    </div>

                    <h2 id="noticias-modal-title" className="text-slate-900 font-extrabold text-3xl md:text-4xl mb-4 leading-tight">
                      {noticias[currentIndex].titulo}
                    </h2>

                    <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-6">
                      {noticias[currentIndex].descripcion}
                    </p>

                    <div className="space-y-6 pt-4 border-t border-slate-100 mt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center bg-linear-to-br from-primary-green via-secondary-green to-[#35AF6F] shadow-sm">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-slate-900 font-bold text-lg mb-2">Detalles de la Noticia</h3>
                          <p className="text-slate-700 leading-relaxed">
                            {noticias[currentIndex].descripcion} Esta noticia representa un hito importante en nuestro desarrollo institucional y refleja el compromiso continuo con la excelencia operacional y el servicio a la comunidad.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center bg-linear-to-br from-primary-green via-secondary-green to-[#35AF6F] shadow-sm">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-slate-900 font-bold text-lg mb-2">Impacto Institucional</h3>
                          <p className="text-slate-700 leading-relaxed">
                            Esta iniciativa fortalece nuestra capacidad operativa y mejora la eficiencia en los procesos clave de la institución, beneficiando directamente a todo el personal y a la ciudadanía que servimos.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Estilos CSS para animaciones del modal */}
        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
