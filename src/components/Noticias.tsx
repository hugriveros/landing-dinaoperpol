import { useState, useRef, useEffect } from 'react';
import anime from 'animejs';
import { noticiasVideos as noticias, proyectos, noticiaUrl } from '../data/noticias';

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

export default function Noticias() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const progressIntervalRef = useRef<number | null>(null);
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

  // Estado de paginación para noticias
  const [currentPage, setCurrentPage] = useState(1);
  const NOTICIAS_PER_PAGE = 6;
  const [animatedHorizontalHeader, setAnimatedHorizontalHeader] = useState(false);
  const [horizontalHeaderRef, horizontalHeaderVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [horizontalCarouselContainerRef] = useIntersectionObserver({ threshold: 0.1 });
  const horizontalHeaderTitleRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(10000); // Duración dinámica del video


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

    start();

    return () => stop();
  }, [currentIndex, videoDuration]);

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

        {/* Nueva Sección: Noticias Destacadas con Carrusel Horizontal */}
      </div>
      
      {/* Sección noticias: destacadas + grid paginado */}
      <div id="noticias-proyectos" className="mt-32 w-full">
        <div className="max-w-[1400px] mx-auto px-8">

          {/* ── Header ── */}
          <div ref={horizontalHeaderRef} className="text-center mb-14">
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

          {/* ── Noticias Destacadas ── */}
          {(() => {
            const destacadas = proyectos.filter(p => p.destacada);
            if (destacadas.length === 0) return null;
            return (
              <div className="mb-20">
                  <div className="flex items-center gap-3 mb-8">
                  <span className="text-lg font-bold text-slate-800">Noticias Destacadas</span>
                  <div className="h-px flex-1 bg-gray-300" />
                  
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {destacadas.map((proyecto) => (
                    <a
                      key={proyecto.id}
                      href={noticiaUrl(proyecto.titulo, proyecto.id)}
                      className="group cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex gap-0"
                    >
                      {/* Franja lateral: portada o gradiente */}
                      <div className="w-28 shrink-0 relative overflow-hidden">
                        {proyecto.portada ? (
                          <img
                            src={`${import.meta.env.BASE_URL}${proyecto.portada}`}
                            alt={proyecto.titulo}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-linear-to-br from-primary-green via-secondary-green to-[#35AF6F]" />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                      {/* Contenido */}
                      <div className="flex-1 p-5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-secondary-green font-semibold bg-secondary-green/8 px-2 py-0.5 rounded-full">{proyecto.categoria}</span>
                            <span className="text-xs text-gray-400">{proyecto.fecha}</span>
                          </div>
                          <h3 className="font-bold text-slate-800 text-base leading-snug mb-2 group-hover:text-secondary-green transition-colors line-clamp-2">{proyecto.titulo}</h3>
                          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{proyecto.descripcion}</p>
                        </div>
                        <div className="mt-3 flex items-center text-secondary-green text-sm font-semibold gap-1">
                          Leer más
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* ── Últimas Noticias + Paginación ── */}
          {(() => {
            const noDestacadas = proyectos;
            const totalPages = Math.ceil(noDestacadas.length / NOTICIAS_PER_PAGE);
            const paginated = noDestacadas.slice(
              (currentPage - 1) * NOTICIAS_PER_PAGE,
              currentPage * NOTICIAS_PER_PAGE
            );
            return (
              <div ref={horizontalCarouselContainerRef}>
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-lg font-bold text-slate-800">Últimas Noticias</span>
                  <div className="h-px flex-1 bg-gray-300" />
                  <span className="text-sm text-gray-500">{noDestacadas.length} publicaciones</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginated.map((proyecto) => (
                    <a
                      key={proyecto.id}
                      href={noticiaUrl(proyecto.titulo, proyecto.id)}
                      className="group cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {/* Cabecera: portada o gradiente */}
                      <div className="h-36 relative overflow-hidden">
                        {proyecto.portada ? (
                          <img
                            src={`${import.meta.env.BASE_URL}${proyecto.portada}`}
                            alt={proyecto.titulo}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-linear-to-br from-primary-green via-secondary-green to-[#35AF6F]" />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                      {/* Contenido */}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-secondary-green font-semibold bg-secondary-green/8 px-2 py-0.5 rounded-full">{proyecto.categoria}</span>
                          <span className="text-xs text-gray-400">{proyecto.fecha}</span>
                        </div>
                        <h3 className="font-bold text-slate-800 text-sm leading-snug mb-2 group-hover:text-secondary-green transition-colors line-clamp-2">{proyecto.titulo}</h3>
                        <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 flex-1">{proyecto.descripcion}</p>
                        <div className="mt-3 flex items-center text-secondary-green text-xs font-semibold gap-1">
                          Leer más
                          <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-secondary-green hover:text-white hover:border-secondary-green disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                      aria-label="Página anterior"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-full text-sm font-semibold transition-all duration-200 ${
                          page === currentPage
                            ? 'bg-secondary-green text-white shadow-md shadow-secondary-green/30'
                            : 'border border-gray-200 text-gray-600 hover:bg-secondary-green/10 hover:border-secondary-green/30'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-secondary-green hover:text-white hover:border-secondary-green disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                      aria-label="Página siguiente"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            );
          })()}

        </div>
      </div>
    </section>
  );
}
