import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import AnimeOrganigrama from './demos/AnimeOrganigrama';
import { ShieldCheckIcon, ChartBarIcon, UsersIcon, LightBulbIcon, ArchiveBoxIcon, ShoppingCartIcon, CurrencyDollarIcon, ComputerDesktopIcon, DocumentTextIcon } from '@heroicons/react/24/solid';

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
  const [animatedHeaderDirecciones, setAnimatedHeaderDirecciones] = useState(false);
  const [animatedGridDirecciones, setAnimatedGridDirecciones] = useState(false);
  const [animatedOrganigrama, setAnimatedOrganigrama] = useState(false);

  // --- REFS INDIVIDUALES ---
  const [header1Ref, header1Visible] = useIntersectionObserver({ threshold: 0.2 });
  const [grid1Ref, grid1Visible] = useIntersectionObserver({ threshold: 0.1 });
  const [header2Ref, header2Visible] = useIntersectionObserver({ threshold: 0.2 });
  const [grid2Ref, grid2Visible] = useIntersectionObserver({ threshold: 0.1 });
  const [headerDireccionesRef, headerDireccionesVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [gridDireccionesRef, gridDireccionesVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [organigramaRef, organigramaVisible] = useIntersectionObserver({ threshold: 0.2 });

  // Refs DOM
  const title1Ref = useRef(null);
  const grid1ItemsRef = useRef<HTMLDivElement>(null);
  const title2Ref = useRef(null);
  const grid2ItemsRef = useRef<HTMLDivElement>(null);
  const titleDireccionesRef = useRef(null);
  const gridDireccionesItemsRef = useRef<HTMLDivElement>(null);
  const organigramaContainerRef = useRef(null);

  // --- LÓGICA DE ANIMACIÓN ---

  // 1. Header Objetivos
  useEffect(() => {
    // Si salimos de la sección completa -> RESET
    if (!sectionVisible) {
      anime.set(title1Ref.current, { opacity: 0, translateY: 10 });
      setAnimatedHeader1(false); // Permitir animar de nuevo la próxima vez
    }
    // Si el elemento es visible Y no se ha animado en esta "sesión" -> ANIMAR
    else if (header1Visible && !animatedHeader1) {
      setAnimatedHeader1(true); // Marcar como animado
      anime({
        targets: title1Ref.current,
        translateY: [20, 0],
        opacity: [0, 1],
        easing: 'easeOutQuad',
        duration: 500,
        delay: 0
      });
    }
  }, [header1Visible, sectionVisible, animatedHeader1]);

  // 2. Grid Objetivos
  useEffect(() => {
    if (!sectionVisible) {
      if(grid1ItemsRef.current) anime.set(grid1ItemsRef.current.children, { opacity: 0, translateY: 10 });
      setAnimatedGrid1(false);
    } else if (grid1Visible && !animatedGrid1 && grid1ItemsRef.current) {
      setAnimatedGrid1(true);
      anime({
        targets: grid1ItemsRef.current.children,
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(80),
        duration: 400,
        easing: 'easeOutQuad'
      });
    }
  }, [grid1Visible, sectionVisible, animatedGrid1]);

  // 3. Header Servicios (Sin Comillas)
  useEffect(() => {
    if (!sectionVisible) {
      anime.set(title2Ref.current, { opacity: 0, translateY: 10 });
      setAnimatedHeader2(false);
    } else if (header2Visible && !animatedHeader2) {
      setAnimatedHeader2(true);
      anime({
        targets: title2Ref.current,
        translateY: [20, 0],
        opacity: [0, 1],
        easing: 'easeOutQuad',
        duration: 500,
        delay: 0
      });
    }
  }, [header2Visible, sectionVisible, animatedHeader2]);

  // 4. Grid Servicios
  useEffect(() => {
    if (!sectionVisible) {
      if(grid2ItemsRef.current) anime.set(grid2ItemsRef.current.children, { opacity: 0, translateY: 10 });
      setAnimatedGrid2(false);
    } else if (grid2Visible && !animatedGrid2 && grid2ItemsRef.current) {
      setAnimatedGrid2(true);
      anime({
        targets: grid2ItemsRef.current.children,
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(80),
        duration: 400,
        easing: 'easeOutQuad'
      });
    }
  }, [grid2Visible, sectionVisible, animatedGrid2]);

  // 5. Header Direcciones Dependientes
  useEffect(() => {
    if (!sectionVisible) {
      anime.set(titleDireccionesRef.current, { opacity: 0, translateY: 10 });
      setAnimatedHeaderDirecciones(false);
    } else if (headerDireccionesVisible && !animatedHeaderDirecciones) {
      setAnimatedHeaderDirecciones(true);
      anime({
        targets: titleDireccionesRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        easing: 'easeOutQuad',
        duration: 500,
        delay: 0
      });
    }
  }, [headerDireccionesVisible, sectionVisible, animatedHeaderDirecciones]);

  // 6. Grid Direcciones Dependientes
  useEffect(() => {
    if (!sectionVisible) {
      if(gridDireccionesItemsRef.current) anime.set(gridDireccionesItemsRef.current.children, { opacity: 0, translateY: 10 });
      setAnimatedGridDirecciones(false);
    } else if (gridDireccionesVisible && !animatedGridDirecciones && gridDireccionesItemsRef.current) {
      setAnimatedGridDirecciones(true);
      anime({
        targets: gridDireccionesItemsRef.current.children,
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(80),
        duration: 400,
        easing: 'easeOutQuad'
      });
    }
  }, [gridDireccionesVisible, sectionVisible, animatedGridDirecciones]);

  // 7. Organigrama
  useEffect(() => {
    if (!sectionVisible) {
      anime.set(organigramaContainerRef.current, { opacity: 0 });
      setAnimatedOrganigrama(false);
    } else if (organigramaVisible && !animatedOrganigrama) {
      setAnimatedOrganigrama(true);
      anime({
        targets: organigramaContainerRef.current,
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutQuad'
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

  const gabinete = [
      { id: 1, title: 'Ayudantía', desc: 'Coordina y organiza las audiencias del Director Nacional.', icon: <UsersIcon className="w-6 h-6 text-white"/> },
      { id: 2, title: 'Oficina de Partes', desc: 'Gestiona documentación institucional y extra institucional.', icon: <DocumentTextIcon className="w-6 h-6 text-white"/> },
      { id: 3, title: 'Asesoría Jurídica', desc: 'Asesora en normativa legal y administrativa institucional.', icon: <ShieldCheckIcon className="w-6 h-6 text-white"/> }
  ];

  const gabineteTenico = [
      { id: 1, title: 'Control y Gestión de Materias Estratégicas', responsable: '', desc: 'Monitoreo de proyectos tecnológicos, telecomunicaciones y equipamiento estratégico.', icon: <ShieldCheckIcon className="w-6 h-6 text-white"/> },
      { id: 2, title: 'Control y Gestión de Cadena de Suministros', responsable: '', desc: 'Análisis y control de procesos logísticos, adquisiciones y abastecimiento institucional.', icon: <ArchiveBoxIcon className="w-6 h-6 text-white"/> },
      { id: 3, title: 'Control y Gestión de Infraestructura', responsable: '', desc: 'Supervisión de proyectos de construcción, mantenimiento y optimización de cuarteles.', icon: <ChartBarIcon className="w-6 h-6 text-white"/> }
  ];

  const direcciones = [
      { id: 1, title: 'Dirección de Logística', desc: 'Gestión integral de recursos y cadena de suministro a nivel nacional.', icon: <ArchiveBoxIcon className="w-6 h-6 text-white"/> },
      { id: 2, title: 'Dirección de Compras Públicas', desc: 'Administración eficiente y transparente de procesos de adquisiciones.', icon: <ShoppingCartIcon className="w-6 h-6 text-white"/> },
      { id: 3, title: 'Dirección de Finanzas', desc: 'Planificación y control presupuestario para optimizar recursos.', icon: <CurrencyDollarIcon className="w-6 h-6 text-white"/> },
      { id: 4, title: 'Dirección de Tecnologias de Información y las Comunicaciones', desc: 'Infraestructura tecnológica y sistemas de información institucional.', icon: <ComputerDesktopIcon className="w-6 h-6 text-white"/> }
  ];

  return (
    // REFERENCIA PRINCIPAL DE LA SECCIÓN PARA EL RESET
    <section ref={sectionRef} id="quienes-somos" className="py-24 bg-light-bg overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        {/* --- SECCIÓN 1: OBJETIVOS --- */}
        <div ref={header1Ref} className="text-center mb-32">
            <div ref={title1Ref} className="opacity-0">
                <div className="text-secondary-green font-semibold text-sm uppercase tracking-[2px] mb-2">NUESTRA MISIÓN</div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark mb-4">Objetivos de la Dirección</h2>
                <p className="text-text-light max-w-2xl mx-auto">
                  Garantizamos la gestión eficiente de recursos institucionales mediante coordinación estratégica y optimización operacional continua.
                </p>
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
        {/* --- SECCIÓN 2: ÁREAS DE GESTIÓN --- */}
      
        {/* <div className="mt-46">
            <div ref={header2Ref} className="text-center mb-24 relative">
              <div ref={title2Ref} className="opacity-0">
                    <div className="text-secondary-green font-semibold text-sm uppercase tracking-[2px] mb-2">ESTRUCTURA ORGANIZACIONAL</div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark mb-4 relative inline-block">Áreas de Gestión</h2>
                    <p className="text-lg md:text-xl text-text-light max-w-[800px] mx-auto leading-relaxed mt-4">
                      Coordinamos y optimizamos recursos estratégicos para el desempeño operacional policial a nivel nacional.
                    </p>
              </div>
            </div>

            {/* Timeline Layout Moderno */}
            {/* <div className="relative max-w-7xl mx-auto"> */}
              {/* Línea vertical central - solo desktop */}
              {/* <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-linear-to-b from-slate-800 via-[#0F172A] to-slate-800 h-full opacity-20"></div> */}

              {/* 1. Gabinete - Izquierda */}
              {/* <div className="relative mb-24">
                <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                  <div className="lg:text-right mb-8 lg:mb-0">
                    <div className="inline-block lg:float-right">
                      <div className="flex items-center justify-center lg:justify-end mb-4">
                        <div className="bg-[#0F172A] px-8 py-3 rounded-2xl shadow-lg">
                          <h3 className="text-2xl md:text-3xl font-extrabold text-white">Gabinete</h3>
                        </div>
                      </div>
                      <p className="text-text-light max-w-md lg:ml-auto mb-6">
                        Vincula la Dirección con las Altas Reparticiones y coordina el trabajo de las Direcciones dependientes.
                      </p>
                    </div>
                  </div> */}
                  
                  {/* Círculo central */}
                  {/* <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-secondary-green rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {gabinete.map((item) => (
                      <div key={item.id} className="group">
                        <div className="bg-white p-5 rounded-xl border-2 border-gray-100 hover:border-secondary-green/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-linear-to-br from-primary-green to-secondary-green rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200 shadow-md">
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-base font-bold text-text-dark mb-1 group-hover:text-secondary-green transition-colors">{item.title}</h4>
                              <p className="text-sm text-text-light leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div> */}

              {/* 2. Gabinete Técnico - Derecha */}
              {/* <div className="relative mb-24" ref={grid2Ref}>
                <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                  <div className="lg:order-2 mb-8 lg:mb-0">
                    <div className="flex items-center justify-center lg:justify-start mb-4">
                      <div className="bg-[#0F172A] px-8 py-3 rounded-2xl shadow-lg">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white">Gabinete Técnico</h3>
                      </div>
                    </div>
                    <p className="text-text-light max-w-md mb-6">
                      Asesora técnicamente al Director en áreas logísticas, tecnológicas, compras públicas y finanzas mediante información estratégica.
                    </p>
                  </div> */}
                  
                  {/* Círculo central */}
                  {/* <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-secondary-green rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className="lg:order-1 grid grid-cols-1 gap-4" ref={grid2ItemsRef}>
                    {gabineteTenico.map((area) => (
                      <div key={area.id} className="opacity-0 group">
                        <div className="bg-linear-to-br from-white to-gray-50 p-6 rounded-xl border-2 border-gray-100 hover:border-secondary-green/40 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"> */}
                          {/* Decoración de fondo */}
                          {/* <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-green/5 rounded-full blur-3xl"></div>
                          
                          <div className="relative flex items-start gap-5">
                            <div className="w-16 h-16 bg-linear-to-br from-primary-green to-secondary-green rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                              {area.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-base font-extrabold text-text-dark mb-2 leading-tight group-hover:text-secondary-green transition-colors">{area.title}</h4>
                              <div className="inline-block bg-secondary-green/10 px-3 py-1 rounded-full mb-3">
                                <p className="text-xs text-secondary-green font-bold">{area.responsable}</p>
                              </div>
                              <p className="text-sm text-text-light leading-relaxed">{area.desc}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div> */}

              {/* 3. Gestión Técnica y Mejora Continua - Izquierda */}
              {/* <div className="relative mb-24">
                <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                  <div className="lg:text-right mb-8 lg:mb-0">
                    <div className="inline-block lg:float-right">
                      <div className="flex items-center justify-center lg:justify-end mb-4">
                        <div className="bg-[#0F172A] px-8 py-3 rounded-2xl shadow-lg">
                          <h3 className="text-xl md:text-xl font-extrabold text-white">Departamento Gestión Técnica y Mejora Continua</h3>
                        </div>
                      </div>
                      <p className="text-text-light max-w-md lg:ml-auto mb-6">
                        Implementa sistemas de control de gestión basados en KPI's y Balanced Scorecard, promoviendo la innovación y eficiencia institucional.
                      </p>
                    </div>
                  </div> */}
                  
                  {/* Círculo central */}
                  {/* <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-secondary-green rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-xl border-2 border-gray-100 hover:border-secondary-green/30 shadow-sm hover:shadow-lg transition-all duration-200 group">
                      <div className="w-12 h-12 bg-linear-to-br from-secondary-green to-primary-green rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-md">
                        <ChartBarIcon className="w-6 h-6 text-white" />
                      </div>
                      <h5 className="font-bold text-text-dark mb-2">Control de Gestión</h5>
                      <p className="text-sm text-text-light leading-relaxed">Monitoreo con Power BI y SAP-BI de indicadores estratégicos.</p>
                    </div>
                    
                    <div className="bg-white p-5 rounded-xl border-2 border-gray-100 hover:border-secondary-green/30 shadow-sm hover:shadow-lg transition-all duration-200 group">
                      <div className="w-12 h-12 bg-linear-to-br from-secondary-green to-primary-green rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-md">
                        <LightBulbIcon className="w-6 h-6 text-white" />
                      </div>
                      <h5 className="font-bold text-text-dark mb-2">Innovación</h5>
                      <p className="text-sm text-text-light leading-relaxed">Evaluación de proyectos y mejora continua (Ciclo PDCA).</p>
                    </div>
                    
                    <div className="bg-white p-5 rounded-xl border-2 border-gray-100 hover:border-secondary-green/30 shadow-sm hover:shadow-lg transition-all duration-200 group">
                      <div className="w-12 h-12 bg-linear-to-br from-secondary-green to-primary-green rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-md">
                        <DocumentTextIcon className="w-6 h-6 text-white" />
                      </div>
                      <h5 className="font-bold text-text-dark mb-2">Normativa</h5>
                      <p className="text-sm text-text-light leading-relaxed">Elaboración de Directivas y Manuales institucionales.</p>
                    </div>
                    
                    <div className="bg-white p-5 rounded-xl border-2 border-gray-100 hover:border-secondary-green/30 shadow-sm hover:shadow-lg transition-all duration-200 group">
                      <div className="w-12 h-12 bg-linear-to-br from-secondary-green to-primary-green rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-md">
                        <UsersIcon className="w-6 h-6 text-white" />
                      </div>
                      <h5 className="font-bold text-text-dark mb-2">Capacitación</h5>
                      <p className="text-sm text-text-light leading-relaxed">Programas en planificación y análisis de datos.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
        
            {/* Direcciones Dependientes */}
            <div className="mt-40">
              <div ref={headerDireccionesRef} className="text-center mb-12">
                <div ref={titleDireccionesRef} className="opacity-0">
                  <div className="text-secondary-green font-semibold text-sm uppercase tracking-[2px] mb-2">NUESTRAS</div>
                  <h3 className="text-4xl md:text-5xl font-extrabold text-text-dark mb-4">Direcciones Dependientes</h3>
                  <p className="text-text-light max-w-2xl mx-auto">
                    Altas Reparticiones especializadas que gestionan recursos financieros, logísticos, tecnológicos y de compras públicas.
                  </p>
                </div>
              </div>
              <div ref={gridDireccionesRef}>
                <div ref={gridDireccionesItemsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {direcciones.map((dir) => (
                      <div key={dir.id} className="opacity-0 bg-white p-8 rounded-2xl text-center border border-gray-100 hover:border-secondary-green/30 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                          <div className="w-14 h-14 bg-linear-to-br from-primary-green to-secondary-green rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                              {dir.icon}
                          </div>
                          <h4 className="text-lg font-bold text-text-dark mb-2">{dir.title}</h4>
                          <p className="text-sm text-text-light leading-relaxed">{dir.desc}</p>
                      </div>
                  ))}
                </div>
              </div>
            </div>

           
           
        {/* </div> */}
        {/* --- ORGANIGRAMA --- */}
          <div ref={organigramaRef} className="mt-34">
            <div ref={organigramaContainerRef} className="opacity-0">
                <AnimeOrganigrama />
            </div>
          </div>
      </div>
    </section>
  );
}
