import { useState, useEffect, useRef } from 'react';
import anime from 'animejs';

interface Noticia {
  id: number;
  titulo: string;
  fecha: string;
  descripcion: string;
  icon: string;
  categoria: string;
}

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

export default function CarouselVariants() {
  const [selectedVariant, setSelectedVariant] = useState<number>(1);

  const variants = [
    { id: 1, name: 'Carrusel 3D Coverflow', description: 'Efecto de portadas con perspectiva 3D' },
    { id: 2, name: 'Carrusel Horizontal Smooth', description: 'Deslizamiento suave con parallax' },
    { id: 3, name: 'Carrusel Stack Cards', description: 'Tarjetas apiladas con transición elegante' },
    { id: 4, name: 'Carrusel Vertical Timeline', description: 'Timeline vertical con scroll animado' },
    { id: 5, name: 'Carrusel Fade Crossfade', description: 'Transiciones de fundido cruzado' },
    { id: 6, name: 'Carrusel Flip Cards', description: 'Tarjetas que rotan en 3D' },
  ];

  // Variante 1: Carrusel 3D Coverflow
  const Variant1Coverflow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!carouselRef.current) return;
      
      const cards = carouselRef.current.querySelectorAll('.carousel-card');
      
      cards.forEach((card, index) => {
        const offset = index - currentIndex;
        const element = card as HTMLElement;
        const isActive = offset === 0;
        
        anime({
          targets: element,
          translateX: offset * 350,
          translateZ: Math.abs(offset) * -250,
          rotateY: offset * 30,
          opacity: Math.abs(offset) <= 2 ? 1 - Math.abs(offset) * 0.25 : 0,
          scale: isActive ? 1.1 : 0.85 - Math.abs(offset) * 0.08,
          duration: 900,
          easing: 'easeOutCubic'
        });
      });
    }, [currentIndex]);

    const next = () => setCurrentIndex((prev) => (prev + 1) % noticias.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + noticias.length) % noticias.length);

    return (
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden bg-linear-to-b from-slate-900/50 to-transparent rounded-xl py-8">
        <div 
          ref={carouselRef}
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: '1200px' }}
        >
          {noticias.map((noticia, index) => (
            <button
              key={noticia.id}
              type="button"
              className="carousel-card absolute w-[320px] cursor-pointer group text-left focus:outline-none focus:ring-2 focus:ring-primary-green"
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Seleccionar noticia ${noticia.titulo}`}
            >
              <div className="relative bg-linear-to-br from-slate-800 via-slate-900 to-[#0F172A] rounded-2xl shadow-2xl overflow-hidden border border-secondary-green/40 transition-all duration-300 hover:border-secondary-green/70">
                <div className="absolute inset-0 bg-linear-to-br from-secondary-green/5 via-transparent to-primary-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="h-[190px] bg-linear-to-br from-primary-green via-secondary-green to-[#35AF6F] flex items-center justify-center text-7xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold">
                    {noticia.categoria}
                  </div>
                  <span className="relative z-10 drop-shadow-2xl">{noticia.icon}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-white font-bold text-lg mb-2 leading-tight group-hover:text-[#25a366] transition-colors">{noticia.titulo}</h3>
                  <p className="text-gray-400 text-xs mb-3 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-[#25a366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {noticia.fecha}
                  </p>
                  <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">{noticia.descripcion}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-primary-green via-secondary-green to-[#35AF6F] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
        
        <button
          onClick={prev}
          className="absolute left-8 z-20 w-14 h-14 bg-gradient-to-br from-[#1D7D4D] to-[#25a366] hover:from-[#25a366] hover:to-[#35AF6F] rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-8 z-20 w-14 h-14 bg-gradient-to-br from-[#1D7D4D] to-[#25a366] hover:from-[#25a366] hover:to-[#35AF6F] rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {noticias.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-10 bg-gradient-to-r from-[#1D7D4D] to-[#25a366]' 
                  : 'w-2 bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  // Variante 2: Carrusel Horizontal Smooth
  const Variant2Smooth = () => {
    const [offset, setOffset] = useState(0);
    const [, setHoveredIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
      const newOffset = direction === 'left' 
        ? Math.min(offset + 360, 0) 
        : Math.max(offset - 360, -(noticias.length - 3) * 360);
      
      setOffset(newOffset);

      if (containerRef.current) {
        anime({
          targets: containerRef.current,
          translateX: newOffset,
          duration: 700,
          easing: 'easeInOutCubic'
        });
      }
    };

    return (
      <div className="relative h-[520px] overflow-hidden bg-gradient-to-b from-slate-900/30 to-transparent rounded-xl p-8">
        <div 
          ref={containerRef}
          className="flex gap-6 absolute left-8 top-8"
        >
          {noticias.map((noticia, _index) => (
            <div
              key={noticia.id}
              className="w-[340px] flex-shrink-0 group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-[#0F172A] rounded-2xl shadow-2xl overflow-hidden border border-[#25a366]/40 transition-all duration-500 hover:scale-105 hover:shadow-[#25a366]/20 hover:shadow-2xl hover:border-[#25a366]/80">
                <div className="absolute inset-0 bg-gradient-to-br from-[#25a366]/0 to-[#1D7D4D]/0 group-hover:from-[#25a366]/10 group-hover:to-[#1D7D4D]/10 transition-all duration-500" />
                <div className="h-[170px] bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F] flex items-center justify-center text-6xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-[#25a366]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 transition-transform duration-500 group-hover:scale-110">{noticia.icon}</span>
                </div>
                <div className="p-6 relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-[#25a366]/20 to-[#1D7D4D]/20 text-[#25a366] rounded-full text-xs font-bold">
                      {noticia.categoria}
                    </span>
                    <span className="text-gray-500 text-xs">{noticia.fecha}</span>
                  </div>
                  <h3 className="text-white font-bold text-base mb-3 leading-tight group-hover:text-[#25a366] transition-colors">{noticia.titulo}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{noticia.descripcion}</p>
                  <div className="mt-4 flex items-center text-[#25a366] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Leer más
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
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-gradient-to-br from-[#1D7D4D] to-[#25a366] hover:from-[#25a366] hover:to-[#35AF6F] backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-gradient-to-br from-[#1D7D4D] to-[#25a366] hover:from-[#25a366] hover:to-[#35AF6F] backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };

  // Variante 3: Stack Cards
  const Variant3Stack = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const stackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!stackRef.current) return;
      
      const cards = stackRef.current.querySelectorAll('.stack-card');
      
      cards.forEach((card, index) => {
        const offset = index - currentIndex;
        const element = card as HTMLElement;
        
        if (offset < 0) {
          // Tarjetas ya vistas
          anime({
            targets: element,
            translateX: -400,
            opacity: 0,
            scale: 0.8,
            duration: 400,
            easing: 'easeInQuad'
          });
        } else {
          // Tarjetas en el stack
          anime({
            targets: element,
            translateY: offset * 20,
            translateX: 0,
            scale: 1 - offset * 0.05,
            opacity: offset <= 2 ? 1 : 0,
            zIndex: 10 - offset,
            duration: 600,
            easing: 'easeOutQuad'
          });
        }
      });
    }, [currentIndex]);

    const next = () => {
      if (currentIndex < noticias.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    };

    const reset = () => setCurrentIndex(0);

    return (
      <div className="relative h-[550px] flex items-center justify-center">
        <div ref={stackRef} className="relative w-[400px] h-[500px]">
          {noticias.map((noticia, _index) => (
            <div
              key={noticia.id}
              className="stack-card absolute top-0 left-0 w-full bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-2xl shadow-2xl overflow-hidden border-2 border-[#25a366]/40"
            >
              <div className="h-[200px] bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F] flex items-center justify-center text-8xl">
                {noticia.icon}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-[#25a366]/20 text-[#25a366] rounded-full text-xs font-bold">
                    {noticia.categoria}
                  </span>
                  <span className="text-gray-400 text-xs">{noticia.fecha}</span>
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{noticia.titulo}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{noticia.descripcion}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-12 flex gap-4">
          <button
            onClick={next}
            disabled={currentIndex >= noticias.length - 1}
            className="px-6 py-3 bg-[#1D7D4D] hover:bg-[#25a366] disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors shadow-lg"
          >
            Siguiente
          </button>
          {currentIndex >= noticias.length - 1 && (
            <button
              onClick={reset}
              className="px-6 py-3 bg-[#25a366] hover:bg-[#1D7D4D] text-white rounded-lg font-semibold transition-colors shadow-lg"
            >
              Reiniciar
            </button>
          )}
        </div>

        <div className="absolute top-8 right-8 text-white font-bold text-lg">
          {currentIndex + 1} / {noticias.length}
        </div>
      </div>
    );
  };

  // Variante 4: Timeline Vertical
  const Variant4Timeline = () => {
    const [scrollY, setScrollY] = useState(0);
    const timelineRef = useRef<HTMLDivElement>(null);

    const handleScroll = (direction: 'up' | 'down') => {
      const newScrollY = direction === 'up' 
        ? Math.min(scrollY + 250, 0) 
        : Math.max(scrollY - 250, -(noticias.length - 2) * 250);
      
      setScrollY(newScrollY);

      if (timelineRef.current) {
        anime({
          targets: timelineRef.current,
          translateY: newScrollY,
          duration: 700,
          easing: 'easeInOutCubic'
        });
      }
    };

    return (
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#1D7D4D] via-[#25a366] to-[#35AF6F]" />
        
        <div ref={timelineRef} className="relative">
          {noticias.map((noticia, index) => (
            <div key={noticia.id} className="flex items-center gap-8 mb-[250px]">
              {index % 2 === 0 ? (
                <>
                  <div className="w-[350px] bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-xl shadow-xl p-6 border border-[#25a366]/30">
                    <div className="flex items-start gap-4">
                      <div className="text-5xl">{noticia.icon}</div>
                      <div className="flex-1">
                        <span className="inline-block px-2 py-1 bg-[#25a366]/20 text-[#25a366] rounded text-xs font-semibold mb-2">
                          {noticia.categoria}
                        </span>
                        <h3 className="text-white font-bold text-base mb-2">{noticia.titulo}</h3>
                        <p className="text-gray-400 text-xs mb-2">{noticia.fecha}</p>
                        <p className="text-gray-300 text-sm">{noticia.descripcion}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#25a366] border-4 border-[#0F172A] z-10" />
                  <div className="w-[350px]" />
                </>
              ) : (
                <>
                  <div className="w-[350px]" />
                  <div className="w-6 h-6 rounded-full bg-[#25a366] border-4 border-[#0F172A] z-10" />
                  <div className="w-[350px] bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-xl shadow-xl p-6 border border-[#25a366]/30">
                    <div className="flex items-start gap-4">
                      <div className="text-5xl">{noticia.icon}</div>
                      <div className="flex-1">
                        <span className="inline-block px-2 py-1 bg-[#25a366]/20 text-[#25a366] rounded text-xs font-semibold mb-2">
                          {noticia.categoria}
                        </span>
                        <h3 className="text-white font-bold text-base mb-2">{noticia.titulo}</h3>
                        <p className="text-gray-400 text-xs mb-2">{noticia.fecha}</p>
                        <p className="text-gray-300 text-sm">{noticia.descripcion}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => handleScroll('up')}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-10 h-10 bg-[#1D7D4D] hover:bg-[#25a366] rounded-full flex items-center justify-center text-white shadow-xl transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <button
          onClick={() => handleScroll('down')}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-10 h-10 bg-[#1D7D4D] hover:bg-[#25a366] rounded-full flex items-center justify-center text-white shadow-xl transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    );
  };

  // Variante 5: Fade Crossfade (Instagram Stories Style)
  // Placeholder temporal: implementación completa deshabilitada mientras se corrige parsing
  const Variant5Fade = () => {
    return (
      <div className="relative h-[680px] flex items-center justify-center bg-linear-to-b from-slate-950 to-slate-900">
        <div className="text-white">Variant5Fade temporal (deshabilitado)</div>
      </div>
    );
  };

  // Variante 6: Flip Cards
  const Variant6Flip = () => {
    const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    const handleFlip = (index: number) => {
      if (flippedIndex === index) {
        setFlippedIndex(null);
      } else {
        setFlippedIndex(index);
      }

      if (cardsRef.current) {
        const card = cardsRef.current.children[index] as HTMLElement;
        const front = card.querySelector('.card-front') as HTMLElement;
        const back = card.querySelector('.card-back') as HTMLElement;

        if (flippedIndex === index) {
          // Flip back
          anime({
            targets: front,
            rotateY: [180, 0],
            opacity: [0, 1],
            duration: 600,
            easing: 'easeInOutQuad'
          });
          anime({
            targets: back,
            rotateY: [0, -180],
            opacity: [1, 0],
            duration: 600,
            easing: 'easeInOutQuad'
          });
        } else {
          // Flip to back
          anime({
            targets: front,
            rotateY: [0, 180],
            opacity: [1, 0],
            duration: 600,
            easing: 'easeInOutQuad'
          });
          anime({
            targets: back,
            rotateY: [-180, 0],
            opacity: [0, 1],
            duration: 600,
            easing: 'easeInOutQuad'
          });
        }
      }
    };

    return (
      <div className="relative min-h-[650px] py-8">
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {noticias.map((noticia, index) => (
            <div
              key={noticia.id}
              className="relative h-[300px] cursor-pointer"
              style={{ perspective: '1000px' }}
              onClick={() => handleFlip(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                  e.preventDefault();
                  handleFlip(index);
                }
              }}
            >
              {/* Front */}
              <div className="card-front absolute inset-0 bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-xl shadow-xl overflow-hidden border border-[#25a366]/30">
                <div className="h-[150px] bg-gradient-to-br from-[#1D7D4D] to-[#25a366] flex items-center justify-center text-6xl">
                  {noticia.icon}
                </div>
                <div className="p-5">
                  <span className="inline-block px-3 py-1 bg-[#25a366]/20 text-[#25a366] rounded-full text-xs font-semibold mb-2">
                    {noticia.categoria}
                  </span>
                  <h3 className="text-white font-bold text-base mb-2">{noticia.titulo}</h3>
                  <p className="text-gray-400 text-xs">{noticia.fecha}</p>
                </div>
                <div className="absolute bottom-4 right-4 text-[#25a366] text-xs font-semibold flex items-center gap-1">
                  Ver más
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Back */}
              <div 
                className="card-back absolute inset-0 bg-gradient-to-br from-[#1D7D4D] to-[#25a366] rounded-xl shadow-xl p-6 opacity-0"
                style={{ transform: 'rotateY(-180deg)' }}
              >
                <div className="h-full flex flex-col">
                  <div className="text-5xl mb-4">{noticia.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-3">{noticia.titulo}</h3>
                  <p className="text-white/90 text-sm leading-relaxed flex-1">{noticia.descripcion}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-white/80 text-xs">{noticia.fecha}</span>
                    <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-semibold transition-colors">
                      Leer más
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderVariant = () => {
    switch (selectedVariant) {
      case 1:
        return <Variant1Coverflow />;
      case 2:
        return <Variant2Smooth />;
      case 3:
        return <Variant3Stack />;
      case 4:
        return <Variant4Timeline />;
      case 5:
        return <Variant5Fade />;
      case 6:
        return <Variant6Flip />;
      default:
        return <Variant1Coverflow />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0F172A] to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F172A] to-slate-900 border-b border-[#25a366]/30 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-white mb-2">Carruseles de Noticias</h1>
          <p className="text-[#25a366]">6 variantes elegantes e interactivas con anime.js</p>
        </div>
      </div>

      {/* Selector */}
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant.id)}
              className={`p-5 rounded-xl text-left transition-all ${
                selectedVariant === variant.id
                  ? 'bg-gradient-to-br from-[#1D7D4D] to-[#25a366] text-white shadow-2xl scale-105'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-800 border border-[#25a366]/20'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                  selectedVariant === variant.id ? 'bg-white/20 text-white' : 'bg-[#25a366]/20 text-[#25a366]'
                }`}>
                  {variant.id}
                </div>
                <h3 className="font-bold text-base flex-1">{variant.name}</h3>
              </div>
              <p className={`text-sm ${selectedVariant === variant.id ? 'text-white/90' : 'text-gray-400'}`}>
                {variant.description}
              </p>
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="bg-slate-800/30 rounded-2xl p-8 border border-[#25a366]/20">
          {renderVariant()}
        </div>

        {/* Info */}
        <div className="mt-8 bg-slate-800/50 rounded-xl p-6 border border-[#25a366]/20">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#25a366]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Características de cada variante
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[#25a366] font-semibold mb-1">• Coverflow 3D</p>
              <p className="text-gray-300">Perspectiva 3D con rotación, ideal para destacar el elemento central</p>
            </div>
            <div>
              <p className="text-[#25a366] font-semibold mb-1">• Horizontal Smooth</p>
              <p className="text-gray-300">Deslizamiento fluido, perfecto para visualizar múltiples elementos</p>
            </div>
            <div>
              <p className="text-[#25a366] font-semibold mb-1">• Stack Cards</p>
              <p className="text-gray-300">Tarjetas apiladas, excelente para enfoque secuencial</p>
            </div>
            <div>
              <p className="text-[#25a366] font-semibold mb-1">• Vertical Timeline</p>
              <p className="text-gray-300">Línea de tiempo cronológica, ideal para noticias ordenadas</p>
            </div>
            <div>
              <p className="text-[#25a366] font-semibold mb-1">• Fade Crossfade</p>
              <p className="text-gray-300">Transiciones suaves con autoplay, minimalista y elegante</p>
            </div>
            <div>
              <p className="text-[#25a366] font-semibold mb-1">• Flip Cards</p>
              <p className="text-gray-300">Interacción flip 3D, perfecto para revelar información adicional</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
