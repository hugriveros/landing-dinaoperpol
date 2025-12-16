import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
import { 
  ShieldCheckIcon, 
  UserGroupIcon, 
  BuildingOfficeIcon,
  ServerIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/solid';

// Estilos para animación de líneas
const lineAnimationStyles = `
  @keyframes flowParticles {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 100% 100%;
    }
  }
  
  .org-line-animated {
    background: linear-gradient(
      to bottom,
      #0F172A 0%,
      #25a366 25%,
      #0F172A 50%,
      #25a366 75%,
      #0F172A 100%
    );
    background-size: 100% 400%;
    animation: flowParticles 4s linear infinite;
    box-shadow: 0 0 8px rgba(37, 163, 102, 0.3);
  }
  
  .org-line-horizontal-animated {
    background: linear-gradient(
      to right,
      #0F172A 0%,
      #25a366 25%,
      #0F172A 50%,
      #25a366 75%,
      #0F172A 100%
    );
    background-size: 400% 100%;
    animation: flowParticles 4s linear infinite;
    box-shadow: 0 0 8px rgba(37, 163, 102, 0.3);
  }
`;

// Componente de partículas (igual que DirectorParticles)
function OrganigramaParticles({ imageSrc, altText }: { imageSrc: string; altText: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 100;

    container.querySelectorAll('.particle').forEach(p => p.remove());

    const customSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="68" fill="none" viewBox="0 0 568 628">
      <mask id="a" width="568" height="629" x="0" y="-1" maskUnits="userSpaceOnUse" style="mask-type:luminance">
        <path fill="#fff" d="M0 627.444h567.477V0H0v627.444Z"/>
      </mask>
      <g mask="url(#a)">
        <path fill="#24A165" d="M226.86 568.281c-20.297-10.535-73.069-14.096-96.46-17.471-39.341-5.454-81.795-42.612-102.904-74.821C5.89 442.76 2.656 399.413 4.956 365.224c4.203-63.383 50.604-105.995 44.62-158.152-3.364-28.715-45.28-79.235-20.76-107.034 1.584-1.772 2.753-2.373 2.753-2.373 23.764-18.33 43.358-33.916 60.572-59.316 4.543-6.823 11.883-11.833 20.308-11.687l1.878.044c18.092-.19 30.154 16.085 59.817 13.466 43.537-3.697 55.419-35.767 109.541-35.691 0 0 6.888 0 16.054 1.13 56.508 6.926 71.882 57.154 139.848 23.989 4.113-2.02 8.906-2.938 13.474-2.894l1.816-.044c8.418-.146 15.771 4.864 20.448 11.687 17.776 26.436 36.166 40.647 60.956 59.554 14.302 10.422 10.011 36.994 4.062 51.025-21.062 49.954-36.582 64.597-8.427 121.86 13.291 27.17 28.167 59.438 30.504 94.436 2.247 34.189-.989 77.536-22.587 110.765-20.91 32.209-63.488 69.367-102.474 74.821-23.78 3.375-76.628 6.936-96.894 17.471-22.206 11.685-41.914 31.652-56.78 51.671-14.872-20.019-34.602-39.986-56.825-51.671Z"/>
      </g>
    </svg>`;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle absolute';
      particle.style.left = '50%';
      particle.style.top = '50%';
      
      if (i % 2 === 0) {
        particle.className += ' w-3 h-3 rounded-full';
        particle.style.backgroundColor = '#24A165';
      } else {
        particle.className += ' w-5 h-5';
        particle.innerHTML = customSVG;
      }
      
      container.appendChild(particle);
    }

    const particles = container.querySelectorAll('.particle');

    anime({
      targets: particles,
      translateX: () => anime.random(-300, 300),
      translateY: () => anime.random(-350, 70),
      scale: [
        { value: [0, anime.random(2.8, 3.2)], duration: 1200 },
        { value: 0, duration: 600 },
      ],
      opacity: [
        { value: [0, 1], duration: 800 },
        { value: 0, duration: 1200 },
      ],
      rotate: () => anime.random(0, 0),
      duration: 3500,
      easing: 'easeOutCubic',
      delay: anime.stagger(250),
      loop: true,
    });

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="relative w-[700px] h-[600px] flex items-center justify-center">
        <img
          src={imageSrc}
          alt={altText}
          loading="lazy"
          className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-104 h-auto z-10"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 97%, rgba(0,0,0,0.8) 99%, rgba(0,0,0,0) 100%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 95%, rgba(0,0,0,0.3) 98%, rgba(0,0,0,0) 100%)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%'
          }}
        />
        <div ref={containerRef} className="absolute inset-0 flex items-center justify-center" />
      </div>
    </div>
  );
}

interface OrgNode {
  id: number;
  name: string;
  position: string;
  department: string;
  image: string;
  description: string;
  color: string;
  level: number;
  parentId: number | null;
}

const orgData: OrgNode[] = [
  // Nivel 0 - Dirección Nacional
  {
    id: 0,
    name: 'Dirección Nacional de Apoyo a las Operaciones Policiales',
    position: 'Director Nacional',
    department: 'DINAOPERPOL',
    image: 'hero_director.png',
    description: '"Dirigir, administrar, evaluar y coordinar los procesos de las áreas financieras, logísticas, tecnológicas y de compras públicas, con el propósito de proveer los bienes y servicios para el desempeño de la función policial de Carabineros de Chile a lo largo del territorio nacional."',
    color: '#088152',
    level: 0,
    parentId: null,
  },
  // Direcciones Principales (Nivel 1 eliminado - ahora directamente bajo Director)
  {
    id: 4,
    name: 'Dirección de Logística',
    position: 'Director de Logística',
    department: 'Dirección de Logística',
    image: 'hero_logistica.png',
    description: '"Dirigir y coordinar la gestión integral de recursos logísticos, administrar la cadena de suministro institucional, proveer bienes y servicios necesarios para el desempeño de la función policial y optimizar los procesos de almacenamiento y distribución a nivel nacional."',
    color: '#1D7D4D',
    level: 2,
    parentId: 0,
  },
  {
    id: 5,
    name: 'Dirección de Compras Públicas',
    position: 'Director de Compras Públicas',
    department: 'Dirección de Compras Públicas',
    image: '',
    description: '"Dirigir y coordinar los procesos de adquisición y compras públicas institucionales, gestionar licitaciones en conformidad con la normativa vigente, administrar el Plan Anual de Compras y garantizar la transparencia y eficiencia en los procesos de adquisición."',
    color: '#25a366',
    level: 2,
    parentId: 0,
  },
  {
    id: 6,
    name: 'Dirección de Finanzas',
    position: 'Director de Finanzas',
    department: 'Dirección de Finanzas',
    image: 'hero_finanzas.png',
    description: '"Dirigir y administrar la gestión financiera, presupuestaria y contable institucional, coordinar la ejecución presupuestaria, controlar los recursos financieros y elaborar análisis económico-financieros para la toma de decisiones del Alto Mando."',
    color: '#2D9963',
    level: 2,
    parentId: 0,
  },
  {
    id: 7,
    name: 'Dirección de Tecnologías de la Información y las Comunicaciones',
    position: 'Director de TIC',
    department: 'Dirección de TIC',
    image: 'hero_tic.png',
    description: '"Dirigir y coordinar la gestión de infraestructura tecnológica institucional, administrar sistemas de información, garantizar la seguridad informática, proveer soluciones tecnológicas innovadoras y gestionar las comunicaciones digitales a nivel nacional."',
    color: '#35AF6F',
    level: 2,
    parentId: 0,
  },
];

export  function AnimeOrganigrama() {
  const [expandedNode, setExpandedNode] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Estados y refs para animaciones
  const [sectionRef, sectionVisible] = useIntersectionObserver({ threshold: 0 });
  const [animatedHeader, setAnimatedHeader] = useState(false);
  const [animatedGrid, setAnimatedGrid] = useState(false);
  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [gridContainerRef, gridContainerVisible] = useIntersectionObserver({ threshold: 0.1 });
  const headerTitleRef = useRef(null);

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

  // Animación del grid
  useEffect(() => {
    if (!sectionVisible) {
      if(gridRef.current) anime.set(gridRef.current.querySelectorAll('.org-item'), { opacity: 0, scale: 0, translateY: 50 });
      setAnimatedGrid(false);
    } else if (gridContainerVisible && !animatedGrid && gridRef.current) {
      setAnimatedGrid(true);
      const items = gridRef.current.querySelectorAll('.org-item');
      anime({
        targets: items,
        scale: [0, 1],
        opacity: [0, 1],
        translateY: [50, 0],
        delay: anime.stagger(100, { from: 'center' }),
        duration: 800,
        easing: 'easeOutElastic(1, .6)',
      });
    }
  }, [gridContainerVisible, sectionVisible, animatedGrid]);

  const handleExpand = (nodeId: number) => {
    setExpandedNode(nodeId);
  };

  const handleCollapse = () => {
    setExpandedNode(null);
  };

  const selectedNode = orgData.find(node => node.id === expandedNode);

  // Organizar nodos por nivel
  const nodesByLevel = orgData.reduce((acc, node) => {
    if (!acc[node.level]) acc[node.level] = [];
    acc[node.level].push(node);
    return acc;
  }, {} as Record<number, OrgNode[]>);

  return (
    <>
      <style>{lineAnimationStyles}</style>
      <section ref={sectionRef} className="p-8 ">
        <div ref={headerRef} className="text-center mb-24">
          <div ref={headerTitleRef} className="opacity-0">
            <div className="text-secondary-green font-semibold text-sm uppercase tracking-[2px] mb-2">
              ESTRUCTURA
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark mb-4">
              Organigrama
            </h2>
            <p className="text-gray-600 max-w-[800px] mx-auto mt-3">
              Representación de la estructura jerárquica de la Dirección y sus unidades.
            </p>
          </div>
        </div>
      
      <div ref={gridContainerRef}>
      <div ref={gridRef} className="space-y-12 max-w-7xl mx-auto">
        {/* Nivel 0 - Dirección Nacional */}
        {nodesByLevel[0] && (
          <div className="flex justify-center">
            {nodesByLevel[0].map((node) => (
              <div
                key={node.id}
                className="org-item cursor-pointer group"
                onClick={() => handleExpand(node.id)}
                role="button"
                tabIndex={0}
                aria-label={`Ver detalles de ${node.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleExpand(node.id);
                  }
                }}
              >
                <div className="relative overflow-hidden bg-linear-to-br from-[#0F172A] to-slate-900 rounded-2xl shadow-xl hover:shadow-2xl border-2 border-[#0F172A] hover:border-secondary-green/40 transition-all duration-500 hover:-translate-y-2 w-full max-w-[500px] focus-within:ring-4 focus-within:ring-primary-green/50">
                  <div className="absolute inset-0 bg-linear-to-br from-secondary-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative h-56 bg-linear-to-br from-[#0F172A] to-slate-900 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-40 h-40 rounded-full p-1 bg-linear-to-br from-primary-green via-secondary-green to-[#35AF6F] shadow-lg">
                        <img
                          src={`${import.meta.env.BASE_URL}${node.image}`}
                          alt={`${node.position} - ${node.name}`}
                          loading="lazy"
                          className="w-full h-full object-cover rounded-full border-4 border-[#0F172A] group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="relative p-7">
                    <h4 className="font-bold text-xl text-white leading-tight mb-2">{node.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-secondary-green font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary-green" />
                      <span>{node.department}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-secondary-green/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-4 h-4 text-secondary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Nivel 2 - Direcciones Principales (4 nodos) */}
        {nodesByLevel[2] && (
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-[2100px] mx-auto">
              {nodesByLevel[2].map((node) => (
                <div key={node.id} className="relative flex justify-center">
                  <div
                    className="org-item cursor-pointer group w-[350px] h-[420px]"
                    onClick={() => handleExpand(node.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Ver detalles de ${node.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleExpand(node.id);
                      }
                    }}
                  >
                    <div className="relative overflow-hidden bg-linear-to-br from-[#0F172A] to-slate-900 rounded-2xl shadow-xl hover:shadow-2xl border-2 border-[#0F172A] hover:border-secondary-green/40 transition-all duration-500 hover:-translate-y-2 w-full h-full flex flex-col focus-within:ring-4 focus-within:ring-primary-green/50">
                      <div className="absolute inset-0 bg-linear-to-br from-secondary-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative h-56 bg-linear-to-br from-[#0F172A] to-slate-900 overflow-hidden shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-40 h-40 rounded-full p-1 bg-linear-to-br from-primary-green via-secondary-green to-[#35AF6F] shadow-lg">
                            <img
                              src={`${import.meta.env.BASE_URL}${node.image}`}
                              alt={`${node.position} - ${node.name}`}
                              loading="lazy"
                              className="w-full h-full object-cover rounded-full border-4 border-[#0F172A] group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="relative p-7 flex-1 flex flex-col justify-center">
                        <h4 className="font-bold text-xl text-white leading-tight mb-2">{node.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-secondary-green font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary-green" />
                          <span>{node.department}</span>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-secondary-green/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                        <svg className="w-4 h-4 text-secondary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nivel 3 - Oculto (nodos movidos a nivel 2) */}
        {false && nodesByLevel[3] && (
          <div className="relative">
            <div className="absolute left-1/2 -top-12 w-0.5 h-12 bg-primary-green" />
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {nodesByLevel[3].map((node) => (
                <div key={node.id} className="relative">
                  <div className="absolute left-1/2 -top-12 w-0.5 h-12 bg-primary-green" />
                  
                  <div
                    className="org-item cursor-pointer group"
                    onClick={() => handleExpand(node.id)}
                  >
                    <div className="relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-500 hover:-translate-y-2">
                      <div className="absolute inset-0 bg-linear-to-br from-primary-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative h-40 bg-linear-to-br from-primary-green/6 to-white overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={`${import.meta.env.BASE_URL}${node.image}`}
                            alt={node.name}
                            className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </div>
                      <div className="relative p-5">
                        <h4 className="font-bold text-base text-gray-800 mb-2 leading-tight">{node.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-emerald-600">
                          <div className="w-1 h-1 rounded-full bg-emerald-500" />
                          <span>{node.department}</span>
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
      </section>

      {/* Overlay y vista expandida - usando portal para escapar del overflow-hidden */}
      {expandedNode !== null && typeof document !== 'undefined' && createPortal(
        <>
          <div
            ref={overlayRef}
            className="fixed inset-0 bg-slate-50/30 backdrop-blur-md z-999"
            style={{ animation: 'fadeIn 300ms ease-out' }}
            onClick={handleCollapse}
          />
          <div
            ref={expandedRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="organigrama-modal-title"
            className="fixed inset-0 z-999 flex items-center justify-center p-4 md:p-6"
            style={{ animation: 'fadeIn 300ms ease-out' }}
          >
            <div className="relative w-full max-w-5xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh] border border-slate-200"
              style={{ animation: 'slideUp 300ms ease-out' }}
            >
            {selectedNode && (
              <div className="expanded-content h-full overflow-y-auto">
                {/* Botón cerrar */}
                <button
                  onClick={handleCollapse}
                  aria-label="Cerrar detalle del organigrama"
                  className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-slate-700 transition-all hover:scale-105 border border-slate-200 shadow-sm focus:outline-none focus:ring-4 focus:ring-primary-green/50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Sección estilo Director */}
                <section className="bg-linear-to-br from-gray-50 to-white relative overflow-hidden">
                  <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8">
                      
                      {/* Columna izquierda: Foto del Director (2/5) - STICKY */}
                      <div className="lg:col-span-2 lg:sticky lg:top-8 lg:self-start py-8 md:py-16">
                        <div 
                          className="flex justify-center opacity-0 relative min-h-[300px] md:min-h-[500px]"
                          style={{ animation: 'fadeInUp 1s ease forwards' }}
                        >
                          <OrganigramaParticles 
                            imageSrc={`${import.meta.env.BASE_URL}${selectedNode.image}`}
                            altText={`${selectedNode.position} - ${selectedNode.name}`}
                          />
                        </div>
                      </div>

                      {/* Columna derecha: Información (3/5) - SCROLLEABLE */}
                      <div className="lg:col-span-3 space-y-6 py-8 md:py-16">
                        
                        {/* Nombre y cargo */}
                        <div 
                          className="opacity-0"
                          style={{ animation: 'fadeInUp 1s ease 0.2s forwards' }}
                        >
                          <h2 id="organigrama-modal-title" className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
                            {selectedNode.name}
                          </h2>
                          <div className="inline-block px-4 py-1.5 bg-primary-green/10 rounded-full">
                            <p className="text-xs font-semibold text-primary-green uppercase tracking-wide">
                              {selectedNode.position}
                            </p>
                          </div>
                        </div>

                        {/* Descripción */}
                        <div 
                          className=" "
                          style={{ animation: 'fadeInUp 1s ease 0.3s forwards' }}
                        >
                          <div className="flex items-start gap-4">

                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-slate-900 mb-2">Alta Repartición</h3>
                              <p className="text-slate-700 leading-relaxed text-sm">
                                {selectedNode.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Información adicional según el nivel */}
                        {selectedNode.level === 0 && (
                          <>
                            {/* Título de secciones */}
                            <div 
                              className="opacity-0 mt-8"
                              style={{ animation: 'fadeInUp 1s ease 0.4s forwards' }}
                            >
                              <div className="flex items-center gap-3 mb-6">
                                <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
                                <h3 className="text-xl font-bold text-slate-900">Secciones de la Dirección</h3>
                                <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              {/* Gabinete */}
                              <div 
                                className="p-6 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 opacity-0"
                                style={{ animation: 'fadeInUp 1s ease 0.5s forwards' }}
                              >
                                <div className="flex items-start gap-4">
                                  <div className="shrink-0">
                                    <div className="w-20 h-20 rounded-full p-0.5 bg-linear-to-br from-[#1D7D4D] to-primary-green shadow-lg">
                                      <img
                                        src={`${import.meta.env.BASE_URL}hero_director.png`}
                                        alt="Jefe de Gabinete DINAOPERPOL"
                                        loading="lazy"
                                        className="w-full h-full object-cover rounded-full border-2 border-white"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                      <div>
                                        <h4 className="text-lg font-bold text-slate-900">Gabinete</h4>
                                        <p className="text-xs text-primary-green font-semibold">Jefe de Gabinete</p>
                                      </div>
                                    </div>
                                    <p className="text-sm text-slate-700 mb-3">Vincular a la Dirección Nacional con las Altas Reparticiones, coordinar el trabajo de las Direcciones dependientes, monitorear la gestión administrativa y supervisar el control de documentación.</p>
                                    <div className="bg-gray-50 rounded-lg p-3">
                                      <p className="text-xs font-semibold text-gray-700 mb-2">Secciones:</p>
                                      <div className="space-y-1.5">
                                        <div className="flex items-center gap-2 text-slate-700 text-sm">
                                          <div className="w-1.5 h-1.5 rounded-full bg-primary-green"></div>
                                          <span>Ayudantía</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-700 text-sm">
                                          <div className="w-1.5 h-1.5 rounded-full bg-secondary-green"></div>
                                          <span>Oficina de Partes</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-700 text-sm">
                                          <div className="w-1.5 h-1.5 rounded-full bg-[#35AF6F]"></div>
                                          <span>Asesoría Jurídica</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Gabinete Técnico */}
                              <div 
                                className="p-6 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 opacity-0"
                                style={{ animation: 'fadeInUp 1s ease 0.6s forwards' }}
                              >
                                <div className="flex items-start gap-4">
                                  <div className="shrink-0">
                                    <div className="w-20 h-20 rounded-full p-0.5 bg-linear-to-br from-secondary-green to-[#35AF6F] shadow-lg">
                                      <img
                                        src={`${import.meta.env.BASE_URL}hero_director.png`}
                                        alt="Jefe de Gabinete Técnico DINAOPERPOL"
                                        loading="lazy"
                                        className="w-full h-full object-cover rounded-full border-2 border-white"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-lg font-bold text-slate-900">Gabinete Técnico</h4>
                                    <p className="text-xs text-secondary-green font-semibold mb-2">Jefe de Gabinete Técnico</p>
                                    <p className="text-sm text-slate-700">Asesorar técnicamente al Director Nacional en las áreas logísticas, tecnológicas, compras públicas y finanzas, evaluando alternativas y proyectos de innovación, elaborando directivas y manuales de procesos.</p>
                                  </div>
                                </div>
                              </div>

                              {/* Departamento Gestión Técnica */}
                              <div 
                                className="p-6 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 opacity-0"
                                style={{ animation: 'fadeInUp 1s ease 0.7s forwards' }}
                              >
                                <div className="flex items-start gap-4">
                                  <div className="shrink-0">
                                    <div className="w-20 h-20 rounded-full p-0.5 bg-linear-to-br from-primary-green to-secondary-green shadow-lg">
                                      <img
                                        src={`${import.meta.env.BASE_URL}hero_director.png`}
                                        alt="Jefe de Departamento Gestión Técnica DINAOPERPOL"
                                        loading="lazy"
                                        className="w-full h-full object-cover rounded-full border-2 border-white"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-lg font-bold text-slate-900">Departamento Gestión Técnica y Mejora Continua</h4>
                                    <p className="text-xs text-primary-green font-semibold mb-2">Jefe de Departamento</p>
                                    <p className="text-sm text-slate-700">Apoyar al Gabinete Técnico en la asesoría técnica especializada, análisis de procesos institucionales, desarrollo de proyectos de mejora continua y seguimiento de iniciativas estratégicas.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {selectedNode.level === 1 && selectedNode.id === 1 && (
                          <div 
                            className="p-6 rounded-xl bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 opacity-0"
                            style={{ animation: 'fadeInUp 1s ease 0.4s forwards' }}
                          >
                            <div className="flex items-start gap-4">
                              <div className="shrink-0">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white bg-linear-to-br from-secondary-green to-primary-green shadow-md">
                                  <UserGroupIcon className="w-6 h-6" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-slate-900 mb-3">Secciones del Gabinete</h3>
                              <div className="space-y-2">
                                  <div className="flex items-center gap-3 p-3 rounded-lg bg-linear-to-r from-primary-green/5 to-transparent">
                                    <div className="w-2 h-2 rounded-full bg-primary-green"></div>
                                    <span className="text-slate-700 font-medium">Ayudantía</span>
                                  </div>
                                  <div className="flex items-center gap-3 p-3 rounded-lg bg-linear-to-r from-secondary-green/5 to-transparent">
                                    <div className="w-2 h-2 rounded-full bg-secondary-green"></div>
                                    <span className="text-slate-700 font-medium">Oficina de Partes</span>
                                  </div>
                                  <div className="flex items-center gap-3 p-3 rounded-lg bg-linear-to-r from-[#35AF6F]/5 to-transparent">
                                    <div className="w-2 h-2 rounded-full bg-[#35AF6F]"></div>
                                    <span className="text-slate-700 font-medium">Asesoría Jurídica</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedNode.level === 1 && selectedNode.id !== 1 && (
                          <div 
                            className="p-6 rounded-xl bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 opacity-0"
                            style={{ animation: 'fadeInUp 1s ease 0.4s forwards' }}
                          >
                            <div className="flex items-start gap-4">
                              <div className="shrink-0">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white bg-linear-to-br from-secondary-green to-primary-green shadow-md">
                                  <ShieldCheckIcon className="w-6 h-6" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Coordinación Técnica</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                  Responsable de coordinar las actividades técnicas entre la Dirección Nacional y las áreas dependientes, asegurando la fluidez de la comunicación institucional y el cumplimiento de los objetivos estratégicos.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedNode.level === 2 && (
                          <div 
                            className="p-6 rounded-xl bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 opacity-0"
                            style={{ animation: 'fadeInUp 1s ease 0.4s forwards' }}
                          >
                            <div className="flex items-start gap-4">
                              <div className="shrink-0">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white bg-linear-to-br from-secondary-green to-primary-green shadow-md">
                                  {selectedNode.id === 4 && <BuildingOfficeIcon className="w-6 h-6" />}
                                  {selectedNode.id === 5 && <ShoppingCartIcon className="w-6 h-6" />}
                                  {selectedNode.id === 6 && <CurrencyDollarIcon className="w-6 h-6" />}
                                  {selectedNode.id === 7 && <ServerIcon className="w-6 h-6" />}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Alta Repartición</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                  Dirección estratégica de nivel superior que depende directamente de la Dirección Nacional, con autonomía en la gestión de su área específica y responsabilidad sobre procesos institucionales críticos.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                      </div>

                    </div>
                  </div>
                </section>
              </div>
            )}
            </div>
          </div>

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
        </>,
        document.body
      )}
    </>
  );
}

export default AnimeOrganigrama;
