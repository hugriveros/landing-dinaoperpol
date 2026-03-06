import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import DirectorParticles from './DirectorParticles';
import { EyeIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

// Reutilizamos el hook de IntersectionObserver para consistencia
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

export default function Director() {
  // Control maestro de la sección
  const [sectionRef, sectionVisible] = useIntersectionObserver({ threshold: 0 });
  // Refs para animaciones
  const photoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  // Estados para evitar re-animaciones internas
  const [animated, setAnimated] = useState(false);

  // Efecto de Animación Principal
  useEffect(() => {
    // 1. Si salimos completamente -> RESET
    if (!sectionVisible) {
      setAnimated(false);
      // Reset estilos inmediatamente
      anime.set(photoRef.current, { opacity: 0, translateX: -50 });
      anime.set(titleRef.current, { opacity: 0, translateY: 30 });
      if (cardsContainerRef.current) {
        // @ts-ignore
        anime.set(cardsContainerRef.current.children, { opacity: 0, translateY: 30 });
      }
    }
    // 2. Si entramos y no se ha animado -> ANIMAR
    else if (sectionVisible && !animated) {
      setAnimated(true);

      // Línea de tiempo para coordinar todo
      const tl = anime.timeline({
        easing: 'easeOutExpo',
      });

      tl
      // A. Foto del Director (Desde la izquierda)
      .add({
        targets: photoRef.current,
        opacity: [0, 1],
        translateX: [-50, 0],
        duration: 1200,
        delay: 200 // Pequeña pausa al inicio
      })
      // B. Título y Cargo (Desde abajo)
      .add({
        targets: titleRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000
      }, '-=800') // Empezar 800ms antes de que termine la foto
      // C. Cards Misión/Visión (Stagger/Cascada)
      .add({
        targets: cardsContainerRef.current ? Array.from(cardsContainerRef.current.children) : [], // Hijos del grid
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(200), // 200ms entre cada tarjeta
        duration: 1000,
        easing: 'spring(1, 80, 10, 0)' // Mismo efecto rebote que la sección anterior
      }, '-=600');
    }
  }, [sectionVisible, animated]);

  return (
    <section
      id="director"
      ref={sectionRef} // Ref para el observer maestro
      className="py-24 bg-white relative overflow-hidden scroll-mt-24"
    >
      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Columna izquierda: Foto del Director (2/5) */}
          <div
            ref={photoRef}
            className="lg:col-span-2 flex justify-center opacity-0 relative min-h-[600px]"
          >
            <DirectorParticles />
          </div>

          {/* Columna derecha: Información (3/5) */}
          <div className="lg:col-span-3 space-y-10">

            {/* Nombre y cargo */}
            <div ref={titleRef} className="opacity-0">
              <div className="text-secondary-green font-bold text-xl md:text-2xl uppercase tracking-[2px] mb-4">
                ¿QUIÉNES SOMOS?
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark mb-6 leading-tight">
                Dirección Nacional de Gestión de Abastecimiento
              </h2>
              <h3 className="text-2xl lg:text-3xl font-bold text-text-dark mb-3 leading-tight">
                General Inspector<br />
                María Teresa Araya Jiménez
              </h3>
                <div className="inline-block px-4 py-1.5 bg-primary-green/10 rounded-full mb-4">
                <p className="text-sm font-semibold text-primary-green uppercase tracking-wide">
                  Director Nacional de Gestión de Abastecimiento
                </p>
              </div>
            </div>

            {/* Misión y Visión en cards */}
            <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Misión */}
              <div
                className="group p-6 rounded-xl bg-white/60 border border-transparent opacity-0"
                style={{ boxShadow: '0 6px 18px 0 rgba(0,0,0,0.10)', transform: 'translateY(-3px)', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 0 1px #16a34a, 0 6px 16px 2px #16a34a33'; e.currentTarget.style.transform = 'translateY(-6px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 18px 0 rgba(0,0,0,0.10)'; }}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-50 group-hover:scale-110 transition-transform duration-300">
                      <ShieldCheckIcon className="w-6 h-6 text-green-600" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Misión</h3>
                    <p className="text-slate-600 leading-relaxed text-sm mt-2 max-w-prose">
                      "Dirigir, administrar, evaluar y coordinar los procesos de las áreas financieras, logísticas, tecnológicas y de compras públicas, con el propósito de proveer los bienes y servicios para el desempeño de la función policial de Carabineros de Chile a lo largo del territorio nacional."
                    </p>
                  </div>
                </div>
              </div>

              {/* Visión */}
              <div
                className="group p-6 rounded-xl bg-white/60 border border-transparent opacity-0"
                style={{ boxShadow: '0 6px 18px 0 rgba(0,0,0,0.10)', transform: 'translateY(-3px)', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 0 1px #3b82f6, 0 6px 16px 2px #3b82f633'; e.currentTarget.style.transform = 'translateY(-6px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 18px 0 rgba(0,0,0,0.10)'; }}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50 group-hover:scale-110 transition-transform duration-300">
                      <EyeIcon className="w-6 h-6 text-blue-500" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Visión</h3>
                    <p className="text-slate-600 leading-relaxed text-sm mt-2 max-w-prose">
                      "Ser líderes en la gestión estratégica de recursos institucionales, mediante la innovación y excelencia operacional, garantizando un apoyo de calidad a las operaciones policiales y contribuyendo a la seguridad de la comunidad nacional."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
