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
  icon?: string;
  video?: string;
  categoria: string;
}

interface NoticiaProyecto {
  id: number;
  titulo: string;
  fecha: string;
  descripcion: string;
  detalleCompleto: string;
  icon: string;
  categoria: string;
}

export default function Noticias() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showProyectoDetail, setShowProyectoDetail] = useState(false);
  const [selectedProyecto, setSelectedProyecto] = useState<NoticiaProyecto | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const proyectoModalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const progressRef = useRef<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Estados y refs para animaciones
  const [sectionRef, sectionVisible] = useIntersectionObserver({ threshold: 0 });
  const [animatedHeader, setAnimatedHeader] = useState(false);
  const [animatedCarousel, setAnimatedCarousel] = useState(false);
  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [carouselRef, carouselVisible] = useIntersectionObserver({ threshold: 0.1 });
  const headerTitleRef = useRef(null);
  const carouselContainerRef = useRef(null);

  // Estados para el carrusel horizontal
  const [offset, setOffset] = useState(0);
  const [, setHoveredIndex] = useState<number | null>(null);
  const horizontalCarouselRef = useRef<HTMLDivElement>(null);
  const [animatedHorizontalHeader, setAnimatedHorizontalHeader] = useState(false);
  const [animatedHorizontalCarousel, setAnimatedHorizontalCarousel] = useState(false);
  const [horizontalHeaderRef, horizontalHeaderVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [horizontalCarouselContainerRef, horizontalCarouselVisible] = useIntersectionObserver({ threshold: 0.1 });
  const horizontalHeaderTitleRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(10000); // Duración dinámica del video

  const noticias: Noticia[] = [
    {
      id: 1,
      titulo: "Aniversario Departamento Finanzas",
      fecha: "2025",
      descripcion: "Celebración del aniversario del Departamento de Finanzas reconociendo su labor estratégica.",
      video: "ANIVERSARIO DEPTO FINANZAS.mp4",
      categoria: "Institucional"
    },
    {
      id: 2,
      titulo: "Aniversario L.6",
      fecha: "05 de Agosto, 2025",
      descripcion: "Conmemoración del aniversario del Departamento L.6 y su contribución operacional.",
      video: "ANIVERSARIO L.6 05-08-25.mov",
      categoria: "Institucional"
    },
    {
      id: 3,
      titulo: "Aniversario MICC",
      fecha: "2025",
      descripcion: "Celebración del aniversario del Módulo de Información y Control de Carabineros.",
      video: "ANIVERSARIO MICC.mov",
      categoria: "Institucional"
    },
    {
      id: 4,
      titulo: "Día del SOM 2025",
      fecha: "2025",
      descripcion: "Conmemoración del Día del Servicio de Orden y Movilización institucional.",
      video: "DIA DEL SOM 2025.mp4",
      categoria: "Celebración"
    },
    {
      id: 5,
      titulo: "Video Aniversario Depto L.6",
      fecha: "05 de Junio, 2025",
      descripcion: "Video conmemorativo del aniversario del Departamento L.6 institucional.",
      video: "VIDEO ANIVERSARIO DEPTO L.6 05-06-25.mov",
      categoria: "Institucional"
    },
    {
      id: 6,
      titulo: "Día de la Ingeniería",
      fecha: "13 de Mayo, 2025",
      descripcion: "Celebración del Día de la Ingeniería y reconocimiento al personal técnico.",
      video: "VIDEO DIA DE LA INGENIERIA 13-05-25.mov",
      categoria: "Celebración"
    },
    {
      id: 7,
      titulo: "Día de la Madre",
      fecha: "10 de Mayo, 2025",
      descripcion: "Homenaje institucional en el Día de la Madre a funcionarias y familias.",
      video: "VIDEO DIA DE LA MADRE 10-05-25.mov",
      categoria: "Celebración"
    },
    {
      id: 8,
      titulo: "Lanzamiento Subasta Inversa Electrónica",
      fecha: "19 de Junio, 2025",
      descripcion: "Lanzamiento oficial del sistema de Subasta Inversa Electrónica institucional.",
      video: "VIDEO SUBASTA INVERSA ELECTRONICA LANZAMIENTO 19-06-25.mov",
      categoria: "Tecnología"
    }
  ];

  const proyectos: NoticiaProyecto[] = [
    {
      id: 1,
      titulo: "Modernización Sistema SAP Institucional",
      fecha: "Noviembre 2025",
      descripcion: "Implementación exitosa del sistema ERP SAP para optimizar la gestión de recursos y procesos operacionales.",
      detalleCompleto: "La Dirección Nacional de Abastecimiento y Operaciones Policiales ha completado exitosamente la implementación del sistema ERP SAP, modernizando la gestión integral de recursos institucionales. Este proyecto ha permitido centralizar la información, automatizar procesos críticos y mejorar la toma de decisiones estratégicas a nivel nacional. El sistema incluye módulos de logística, finanzas, compras públicas y gestión de activos, beneficiando directamente a todas las unidades operativas del país.",
      icon: "💻",
      categoria: "Tecnología"
    },
    {
      id: 2,
      titulo: "Optimización Red Logística Nacional",
      fecha: "Octubre 2025",
      descripcion: "Reestructuración de la cadena de suministro para mejorar tiempos de respuesta en abastecimiento operacional.",
      detalleCompleto: "Proyecto estratégico que ha rediseñado completamente la red logística institucional, implementando nuevos centros de distribución regionales y sistemas de gestión de inventario automatizados. La iniciativa ha reducido los tiempos de entrega en un 40% y ha mejorado significativamente la disponibilidad de recursos críticos para las operaciones policiales. Se han establecido protocolos de respuesta rápida para situaciones de emergencia y se ha optimizado el uso de recursos de transporte.",
      icon: "📦",
      categoria: "Logística"
    },
    {
      id: 3,
      titulo: "Infraestructura Tecnológica de Última Generación",
      fecha: "Septiembre 2025",
      descripcion: "Actualización completa de la infraestructura TIC con servidores de alta disponibilidad y seguridad.",
      detalleCompleto: "Inversión mayor en modernización tecnológica que ha transformado la capacidad operativa institucional. Se han instalado servidores de última generación con arquitectura redundante, sistemas de respaldo automatizados y medidas de ciberseguridad avanzadas. La nueva infraestructura soporta aplicaciones críticas 24/7, garantiza la continuidad operacional y ha mejorado drásticamente los tiempos de respuesta de los sistemas informáticos. Incluye datacenter principal y sitio de contingencia para asegurar disponibilidad permanente.",
      icon: "🖥️",
      categoria: "Infraestructura"
    },
    {
      id: 4,
      titulo: "Programa de Capacitación en Compras Públicas",
      fecha: "Agosto 2025",
      descripcion: "Formación especializada en procesos de adquisición pública para personal institucional.",
      detalleCompleto: "Programa integral de capacitación que ha formado a más de 200 funcionarios en procedimientos de compras públicas, normativa vigente y uso de plataformas electrónicas. Las jornadas han incluido talleres prácticos, análisis de casos reales y certificación profesional. Este proyecto ha fortalecido las competencias del personal, mejorado la eficiencia en procesos de adquisición y asegurado el cumplimiento de estándares de transparencia y probidad institucional.",
      icon: "📚",
      categoria: "Formación"
    },
    {
      id: 5,
      titulo: "Sistema de Gestión de Activos Institucionales",
      fecha: "Julio 2025",
      descripcion: "Plataforma digital para control y seguimiento de patrimonio y equipamiento policial.",
      detalleCompleto: "Desarrollo e implementación de sistema integral que permite el registro, seguimiento y control de todos los activos institucionales mediante tecnología RFID y códigos QR. La plataforma facilita inventarios automáticos, genera alertas de mantenimiento preventivo y optimiza la asignación de recursos. Ha mejorado significativamente la trazabilidad del equipamiento, reducido pérdidas y permitido una mejor planificación presupuestaria para renovación de activos.",
      icon: "📊",
      categoria: "Gestión"
    },
    {
      id: 6,
      titulo: "Alianza Estratégica Interinstitucional",
      fecha: "Junio 2025",
      descripcion: "Convenio de cooperación con instituciones públicas para optimizar recursos compartidos.",
      detalleCompleto: "Acuerdo marco de colaboración con organismos del Estado que establece mecanismos de coordinación para compras consolidadas, uso compartido de infraestructura y transferencia de buenas prácticas. La alianza ha generado importantes ahorros presupuestarios, mejorado la calidad de servicios y fortalecido las capacidades operacionales mediante sinergias interinstitucionales. Incluye protocolos de respuesta coordinada ante emergencias y programas de capacitación conjunta.",
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
      
      // Reproducir video si existe
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }, 200);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
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

  const handleOpenProyectoDetail = (proyecto: NoticiaProyecto) => {
    setSelectedProyecto(proyecto);
    setShowProyectoDetail(true);
    setTimeout(() => {
      try { closeBtnRef.current?.focus(); } catch {}
    }, 100);
  };

  const handleCloseProyectoDetail = () => {
    setShowProyectoDetail(false);
    setSelectedProyecto(null);
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

  // Animación del header horizontal
  useEffect(() => {
    if (!sectionVisible) {
      anime.set(horizontalHeaderTitleRef.current, { opacity: 0, translateY: 30 });
      setAnimatedHorizontalHeader(false);
    } else if (horizontalHeaderVisible && !animatedHorizontalHeader) {
      setAnimatedHorizontalHeader(true);
      anime({
        targets: horizontalHeaderTitleRef.current,
        translateY: [30, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 100
      });
    }
  }, [horizontalHeaderVisible, sectionVisible, animatedHorizontalHeader]);

  // Animación del carrusel horizontal
  useEffect(() => {
    if (!sectionVisible) {
      anime.set(horizontalCarouselRef.current, { opacity: 0, translateX: -50 });
      setAnimatedHorizontalCarousel(false);
    } else if (horizontalCarouselVisible && !animatedHorizontalCarousel) {
      setAnimatedHorizontalCarousel(true);
      anime({
        targets: horizontalCarouselRef.current,
        translateX: [-50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 200
      });
    }
  }, [horizontalCarouselVisible, sectionVisible, animatedHorizontalCarousel]);

  // Control del modal
  useEffect(() => {
    if (!showDetail && !showProyectoDetail) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseDetail();
        handleCloseProyectoDetail();
      }
    };

    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [showDetail, showProyectoDetail]);

  // Autoplay con progreso basado en la duración real del video
  useEffect(() => {
    const TICK = 100;

    const start = () => {
      if (progressIntervalRef.current) return;
      progressRef.current = 0;
      setProgress(0);
      
      progressIntervalRef.current = window.setInterval(() => {
        if (videoRef.current && noticias[currentIndex].video) {
          // Usar el tiempo actual del video
          const currentTime = videoRef.current.currentTime * 1000;
          const duration = videoRef.current.duration * 1000;
          
          if (duration && !isNaN(duration)) {
            const pct = Math.min(100, Math.round((currentTime / duration) * 100));
            setProgress(pct);
          }
        } else {
          // Fallback para noticias sin video (10 segundos)
          progressRef.current += TICK;
          const pct = Math.min(100, Math.round((progressRef.current / videoDuration) * 100));
          setProgress(pct);
          
          if (progressRef.current >= videoDuration) {
            progressRef.current = 0;
            setProgress(0);
            changeSlide('next');
          }
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
  }, [showDetail, currentIndex, videoDuration]);

  // Manejar eventos del video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setVideoDuration(video.duration * 1000);
      }
    };

    const handleVideoEnded = () => {
      changeSlide('next');
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleVideoEnded);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleVideoEnded);
    };
  }, [currentIndex]);

  // Cleanup global al desmontar
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, []);

  // Escuchar evento personalizado para abrir proyecto específico
  useEffect(() => {
    const handleOpenProyecto = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: number }>;
      const proyectoId = customEvent.detail.id;
      const proyecto = proyectos.find(p => p.id === proyectoId);
      if (proyecto) {
        handleOpenProyectoDetail(proyecto);
      }
    };

    window.addEventListener('openProyecto', handleOpenProyecto);

    return () => {
      window.removeEventListener('openProyecto', handleOpenProyecto);
    };
  }, [proyectos]);

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
              Historias Destacadas
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
            <div className="relative w-full max-w-[360px] md:w-[360px] h-[640px] md:h-[720px] z-10 mx-auto">
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

              {/* Tarjeta de noticia con video */}
              <div
                className="absolute inset-0 bg-transparent rounded-3xl shadow-2xl overflow-hidden group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 200ms ease-in-out, transform 300ms ease-out'
                }}
              >
                {/* Video de fondo */}
                {noticias[currentIndex].video ? (
                  <div className="absolute inset-0">
                    <video
                      ref={videoRef}
                      src={`${import.meta.env.BASE_URL}${noticias[currentIndex].video}`}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted={isMuted}
                      playsInline
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/80 z-10" />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-primary-green via-secondary-green to-[#35AF6F] z-0" />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black/80 z-10" />
                    <span className="relative z-20 text-[120px] md:text-[180px] drop-shadow-2xl opacity-85">
                      {noticias[currentIndex].icon}
                    </span>
                  </div>
                )}

                {/* Botón de mute */}
                {noticias[currentIndex].video && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    className="absolute top-16 right-4 z-50 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                    aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                  >
                    {isMuted ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )}
                  </button>
                )}

                {/* Contenido inferior sobrepuesto */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
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
                </div>
              </div>

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
              className="fixed inset-0 bg-slate-50/30 backdrop-blur-md z-999 flex items-center justify-center p-4 md:p-6"
              style={{
                animation: 'fadeIn 300ms ease-out'
              }}
            >
              <div
                ref={modalRef}
                className="relative w-full max-w-5xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] overflow-y-auto"
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
                  <div className="p-4 md:p-10 lg:p-12 bg-white text-slate-900">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 md:gap-4">
                        <span className="inline-block px-3 py-2 bg-secondary-green/10 text-secondary-green rounded-full text-xs md:text-sm font-bold border border-secondary-green/20">
                          {noticias[currentIndex].categoria}
                        </span>
                        <span className="text-slate-500 text-xs md:text-sm hidden sm:block">{noticias[currentIndex].fecha}</span>
                      </div>
                    </div>

                    <h2 id="noticias-modal-title" className="text-slate-900 font-extrabold text-2xl md:text-3xl lg:text-4xl mb-4 leading-tight">
                      {noticias[currentIndex].titulo}
                    </h2>

                    <p className="text-slate-700 text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
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

        {/* Nueva Sección: Noticias Destacadas con Carrusel Horizontal */}
      </div>
      
      {/* Contenedor full-width fuera del max-w */}
      <div id="noticias-proyectos" className="mt-32 w-full px-5">
        <div className="max-w-[1400px] mx-auto px-8">
          <div ref={horizontalHeaderRef} className="text-center mb-12">
            <div ref={horizontalHeaderTitleRef} className="opacity-0">
              <div className="text-secondary-green font-semibold text-sm uppercase tracking-[2px] mb-2">
                MÁS INFORMACIÓN
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark mb-4">
                Noticias
              </h2>
              <p className="text-lg md:text-xl text-text-light max-w-[700px] mx-auto leading-relaxed">
                Explora todas nuestras publicaciones y mantente al día con las novedades institucionales.
              </p>
            </div>
          </div>
        </div>

        <div ref={horizontalCarouselContainerRef} className="relative h-[520px] overflow-hidden w-full">
          <div 
            ref={horizontalCarouselRef}
            className="flex gap-6 absolute left-0 top-8 px-8"
          >
              {proyectos.map((proyecto, index) => (
                <div
                  key={proyecto.id}
                  className="w-[340px] flex-shrink-0 group cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleOpenProyectoDetail(proyecto)}
                >
                  <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-[#0F172A] rounded-2xl overflow-hidden border border-[#25a366]/40 transition-all duration-500 hover:scale-105 hover:shadow-[#25a366]/20 hover:shadow-2xl hover:border-[#25a366]/80 h-[440px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#25a366]/0 to-[#1D7D4D]/0 group-hover:from-[#25a366]/10 group-hover:to-[#1D7D4D]/10 transition-all duration-500" />
                    
                    {/* Icono del proyecto */}
                    <div className="h-[170px] bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F] flex items-center justify-center text-6xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute inset-0 bg-[#25a366]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative z-10 transition-transform duration-500 group-hover:scale-110">{proyecto.icon}</span>
                    </div>
                    
                    <div className="p-6 relative">
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-block px-3 py-1.5 text-[#25a366] rounded-full text-xs font-bold">
                          {proyecto.categoria}
                        </span>
                        <span className="text-gray-500 text-xs">{proyecto.fecha}</span>
                      </div>
                      <h3 className="text-white font-bold text-base mb-3 leading-tight group-hover:text-[#25a366] transition-colors line-clamp-2">{proyecto.titulo}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{proyecto.descripcion}</p>
                      <div className="mt-4 flex items-center text-[#25a366] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        Ver proyecto
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1D7D4D] via-[#25a366] to-[#35AF6F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const cardWidth = 340;
                const gap = 24;
                const scrollAmount = cardWidth + gap;
                const newOffset = Math.min(offset + scrollAmount, 0);
                setOffset(newOffset);
                if (horizontalCarouselRef.current) {
                  anime({
                    targets: horizontalCarouselRef.current,
                    translateX: newOffset,
                    duration: 700,
                    easing: 'easeInOutCubic'
                  });
                }
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-linear-to-br from-primary-green to-secondary-green hover:from-secondary-green hover:to-[#35AF6F] backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => {
                const cardWidth = 340;
                const gap = 24;
                const scrollAmount = cardWidth + gap;
                const containerWidth = horizontalCarouselContainerRef.current?.offsetWidth || window.innerWidth;
                const totalWidth = proyectos.length * (cardWidth + gap);
                const maxOffset = -(totalWidth - containerWidth + 32); // +32 para padding
                const newOffset = Math.max(offset - scrollAmount, maxOffset);
                setOffset(newOffset);
                if (horizontalCarouselRef.current) {
                  anime({
                    targets: horizontalCarouselRef.current,
                    translateX: newOffset,
                    duration: 700,
                    easing: 'easeInOutCubic'
                  });
                }
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-linear-to-br from-primary-green to-secondary-green hover:from-secondary-green hover:to-[#35AF6F] backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal de detalle de proyectos */}
        {showProyectoDetail && selectedProyecto && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="proyecto-modal-title"
            className="fixed inset-0 bg-slate-50/30 backdrop-blur-md z-[9999] flex items-center justify-center p-4 md:p-6"
            style={{
              animation: 'fadeIn 300ms ease-out'
            }}
          >
            <div
              ref={proyectoModalRef}
              className="relative w-full max-w-5xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] overflow-y-auto"
              style={{
                animation: 'slideUp 300ms ease-out'
              }}
            >
              <button
                ref={closeBtnRef}
                onClick={handleCloseProyectoDetail}
                aria-label="Cerrar detalle"
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-slate-700 transition-transform hover:scale-105 border border-slate-200 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="md:grid md:grid-cols-2">
                {/* Visual */}
                <div className="relative h-56 md:h-auto md:min-h-[500px] flex items-center justify-center bg-linear-to-br from-primary-green via-secondary-green to-[#35AF6F] overflow-hidden">
                  <div className="relative z-10 text-[120px] md:text-[180px] drop-shadow-2xl opacity-95 text-white">
                    {selectedProyecto.icon}
                  </div>
                  <div className="absolute bottom-8 left-8 md:left-10 z-20">
                    <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-semibold border border-white/30 shadow-sm">
                      {selectedProyecto.categoria}
                    </span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6 md:p-10 lg:p-12 bg-white text-slate-900">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-3 py-2 bg-secondary-green/10 text-secondary-green rounded-full text-xs md:text-sm font-bold border border-secondary-green/20">
                      {selectedProyecto.categoria}
                    </span>
                    <span className="text-slate-500 text-xs md:text-sm">{selectedProyecto.fecha}</span>
                  </div>

                  <h2 id="proyecto-modal-title" className="text-slate-900 font-extrabold text-2xl md:text-3xl lg:text-4xl mb-4 leading-tight">
                    {selectedProyecto.titulo}
                  </h2>

                  <p className="text-slate-600 text-sm md:text-base lg:text-lg leading-relaxed mb-4 font-semibold">
                    {selectedProyecto.descripcion}
                  </p>

                  <div className="space-y-4 pt-4 border-t border-slate-100 mt-4">
                    <h3 className="text-slate-900 font-bold text-lg mb-3">Descripción del Proyecto</h3>
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                      {selectedProyecto.detalleCompleto}
                    </p>
                  </div>

                  <div className="space-y-4 pt-6 mt-6 border-t border-slate-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center bg-linear-to-br from-primary-green via-secondary-green to-[#35AF6F] shadow-sm">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-slate-900 font-bold text-base mb-2">Impacto Institucional</h3>
                        <p className="text-slate-700 text-sm leading-relaxed">
                          Este proyecto representa un avance significativo en la modernización institucional, mejorando la eficiencia operativa y fortaleciendo las capacidades de gestión a nivel nacional.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </section>
  );
}
