import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import AnimeOrganigrama from './demos/AnimeOrganigrama';
import { ShieldCheckIcon, ChartBarIcon, UsersIcon, LightBulbIcon, ArchiveBoxIcon, ShoppingCartIcon, CurrencyDollarIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';

// Hook personalizado de visibilidad
const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0, ...options }); // threshold 0 para detectar cualquier píxel visible

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return [elementRef, isVisible] as const;
};

export default function QuienesSomos() {
  // --- CONTROLADOR MAESTRO DE LA SECCIÓN ---
  // Detectamos si la sección completa es visible o no
  const [sectionRef, sectionVisible] = useIntersectionObserver({ threshold: 0 });

  // --- ESTADOS DE ANIMACIÓN (Flags para "ya se animó") ---
  // Esto evita parpadeos si subes y bajas dentro de la misma sección
  const [animatedHeader1, setAnimatedHeader1] = useState(false);
  const [animatedGrid1, setAnimatedGrid1] = useState(false);
  const [animatedHeader2, setAnimatedHeader2] = useState(false);
  const [animatedGrid2, setAnimatedGrid2] = useState(false);
  const [animatedOrganigrama, setAnimatedOrganigrama] = useState(false);

  // --- REFS INDIVIDUALES ---
  const [header1Ref, header1Visible] = useIntersectionObserver({ threshold: 0.2 });
  const [grid1Ref, grid1Visible] = useIntersectionObserver({ threshold: 0.1 });
  const [header2Ref, header2Visible] = useIntersectionObserver({ threshold: 0.2 });
  const [grid2Ref, grid2Visible] = useIntersectionObserver({ threshold: 0.1 });
  const [organigramaRef, organigramaVisible] = useIntersectionObserver({ threshold: 0.2 });

  // Refs DOM
  const title1Ref = useRef(null);
  const grid1ItemsRef = useRef<HTMLDivElement>(null);
  const title2Ref = useRef(null);
  const grid2ItemsRef = useRef<HTMLDivElement>(null);
  const organigramaContainerRef = useRef(null);

  // --- LÓGICA DE ANIMACIÓN ---

  // 1. Header Objetivos
  useEffect(() => {
    // Si salimos de la sección completa -> RESET
    if (!sectionVisible) {
      anime.set(title1Ref.current, { opacity: 0, translateY: 30 });
      setAnimatedHeader1(false); // Permitir animar de nuevo la próxima vez
    } 
    // Si el elemento es visible Y no se ha animado en esta "sesión" -> ANIMAR
    else if (header1Visible && !animatedHeader1) {
      setAnimatedHeader1(true); // Marcar como animado
      anime({
        targets: title1Ref.current,
        translateY: [30, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 100
      });
    }
  }, [header1Visible, sectionVisible, animatedHeader1]);

  // 2. Grid Objetivos
  useEffect(() => {
    if (!sectionVisible) {
      if(grid1ItemsRef.current) anime.set(grid1ItemsRef.current.children, { opacity: 0, translateY: 50 });
      setAnimatedGrid1(false);
    } else if (grid1Visible && !animatedGrid1 && grid1ItemsRef.current) {
      setAnimatedGrid1(true);
      anime({
        targets: grid1ItemsRef.current.children,
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(150),
        easing: 'spring(1, 80, 10, 0)'
      });
    }
  }, [grid1Visible, sectionVisible, animatedGrid1]);

  // 3. Header Servicios (Sin Comillas)
  useEffect(() => {
    if (!sectionVisible) {
      anime.set(title2Ref.current, { opacity: 0, translateY: 30 });
      setAnimatedHeader2(false);
    } else if (header2Visible && !animatedHeader2) {
      setAnimatedHeader2(true);
      anime({
        targets: title2Ref.current,
        translateY: [30, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 100
      });
    }
  }, [header2Visible, sectionVisible, animatedHeader2]);

  // 4. Grid Servicios
  useEffect(() => {
    if (!sectionVisible) {
      if(grid2ItemsRef.current) anime.set(grid2ItemsRef.current.children, { opacity: 0, translateY: 50 });
      setAnimatedGrid2(false);
    } else if (grid2Visible && !animatedGrid2 && grid2ItemsRef.current) {
      setAnimatedGrid2(true);
      anime({
        targets: grid2ItemsRef.current.children,
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(150),
        easing: 'spring(1, 80, 10, 0)'
      });
    }
  }, [grid2Visible, sectionVisible, animatedGrid2]);

  // 5. Organigrama
  useEffect(() => {
    if (!sectionVisible) {
      anime.set(organigramaContainerRef.current, { opacity: 0, scale: 0.9 });
      setAnimatedOrganigrama(false);
    } else if (organigramaVisible && !animatedOrganigrama) {
      setAnimatedOrganigrama(true);
      anime({
        targets: organigramaContainerRef.current,
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo'
      });
    }
  }, [organigramaVisible, sectionVisible, animatedOrganigrama]);


  // Datos
  const objetivos = [
    { id: 1, icon: <ShieldCheckIcon className="w-6 h-6 text-white" />, titulo: "Seguridad Ciudadana", descripcion: "Garantizar la protección y seguridad de todos los ciudadanos mediante operaciones coordinadas y eficientes." },
    { id: 2, icon: <ChartBarIcon className="w-6 h-6 text-white" />, titulo: "Gestión Técnica", descripcion: "Implementar sistemas modernos de gestión para optimizar recursos y procesos operacionales." },
    { id: 3, icon: <UsersIcon className="w-6 h-6 text-white" />, titulo: "Coordinación Nacional", descripcion: "Articular y sincronizar operaciones policiales en todo el territorio nacional." },
    { id: 4, icon: <LightBulbIcon className="w-6 h-6 text-white" />, titulo: "Innovación", descripcion: "Incorporar tecnología y mejores prácticas para modernizar las operaciones policiales." }
  ];

  const servicios = [
      { id: 1, title: 'Logística', desc: 'Gestión integral de recursos y cadena de suministro institucional a nivel nacional.', icon: <ArchiveBoxIcon className="w-6 h-6 text-white"/> },
      { id: 2, title: 'Compras Públicas', desc: 'Administración eficiente y transparente de procesos de adquisiciones institucionales.', icon: <ShoppingCartIcon className="w-6 h-6 text-white"/> },
      { id: 3, title: 'Finanzas', desc: 'Planificación y control presupuestario para optimizar recursos financieros.', icon: <CurrencyDollarIcon className="w-6 h-6 text-white"/> },
      { id: 4, title: 'Tecnología', desc: 'Infraestructura tecnológica y sistemas de información de vanguardia.', icon: <ComputerDesktopIcon className="w-6 h-6 text-white"/> }
  ];

  return (
    // REFERENCIA PRINCIPAL DE LA SECCIÓN PARA EL RESET
    <section ref={sectionRef} id="quienes-somos" className="py-24 bg-light-bg overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        {/* --- SECCIÓN 1: OBJETIVOS --- */}
        <div ref={header1Ref} className="text-center mb-32">
            <div ref={title1Ref} className="opacity-0">
                <div className="text-secondary-green font-semibold text-sm uppercase tracking-[2px] mb-2">NUESTRA MISIÓN</div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark ">Objetivos de la Dirección</h2>
            </div>
        </div>
        <div ref={grid1Ref} >
            <div ref={grid1ItemsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {objetivos.map((objetivo) => (
                <div key={objetivo.id} className="opacity-0 bg-white p-8 rounded-2xl text-center border border-gray-100 hover:border-secondary-green/30 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                    <div className="w-14 h-14 bg-linear-to-br from-primary-green to-secondary-green rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        {objetivo.icon}
                    </div>
                    <h3 className="text-lg font-bold text-text-dark mb-2">{objetivo.titulo}</h3>
                    <p className="text-sm text-text-light leading-relaxed">{objetivo.descripcion}</p>
                </div>
            ))}
            </div>
        </div>
        {/* --- SECCIÓN 2: SERVICIOS --- */}
        <div className="mt-46">
            <div ref={header2Ref} className="text-center mb-32 relative">
                 <div ref={title2Ref} className="opacity-0">
                    <div className="text-secondary-green font-semibold text-sm uppercase tracking-[2px] mb-2">NUESTROS SERVICIOS</div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark mb-4 relative inline-block">Áreas de Gestión</h2>
                    <p className="text-lg md:text-xl text-text-light max-w-[700px] mx-auto leading-relaxed mt-4">
                    Coordinamos y optimizamos recursos estratégicos para el desempeño operacional policial.
                    </p>
                 </div>
            </div>

            <div ref={grid2Ref}>
                <div ref={grid2ItemsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {servicios.map((servicio) => (
                        <div key={servicio.id} className="opacity-0 bg-white p-8 rounded-2xl text-center border border-gray-100 hover:border-secondary-green/30 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                            <div className="w-14 h-14 bg-linear-to-br from-primary-green to-secondary-green rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                {servicio.icon}
                            </div>
                            <h3 className="text-lg font-bold text-text-dark mb-2">{servicio.title}</h3>
                            <p className="text-sm text-text-light leading-relaxed">{servicio.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        {/* --- ORGANIGRAMA --- */}
        <div className="mt-34">
          <AnimeOrganigrama />
        </div>

      </div>
    </section>
  );
}
