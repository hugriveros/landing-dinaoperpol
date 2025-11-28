import React, { useState, useRef, useEffect } from 'react';
import anime from 'animejs';
import { 
  ShieldCheckIcon, 
  UserGroupIcon, 
  DocumentTextIcon, 
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  ScaleIcon,
  ChartBarIcon,
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
          className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[26rem] h-auto z-10"
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
  // Nivel 1 - Gabinetes y Departamento
  {
    id: 1,
    name: 'Gabinete',
    position: 'Jefe de Gabinete',
    department: 'Gabinete DINAOPERPOL',
    image: 'hero_director.png',
    description: '"Vincular a la Dirección Nacional con las Altas Reparticiones, coordinar el trabajo de las Direcciones dependientes, monitorear la gestión administrativa y supervisar el control de documentación que ingresa y egresa de la Dirección. Incluye las secciones de Ayudantía, Oficina de Partes y Asesoría Jurídica."',
    color: '#1D7D4D',
    level: 1,
    parentId: 0,
  },
  {
    id: 2,
    name: 'Gabinete Técnico',
    position: 'Jefe de Gabinete Técnico',
    department: 'Gabinete Técnico DINAOPERPOL',
    image: 'hero_director.png',    
    description: '"Asesorar técnicamente al Director Nacional en las áreas logísticas, tecnológicas, compras públicas y finanzas, evaluando alternativas y proyectos de innovación, elaborando directivas y manuales de procesos, efectuando seguimiento presupuestario y analítico de auditorías."',
    color: '#25a366',
    level: 1,
    parentId: 0,
  },
  {
    id: 3,
    name: 'Departamento Gestión Técnica y Mejora Continua',
    position: 'Jefe de Departamento',
    department: 'Gestión Técnica DINAOPERPOL',
    image: 'hero_director.png',
    description: '"Apoyar al Gabinete Técnico en la asesoría técnica especializada, análisis de procesos institucionales, desarrollo de proyectos de mejora continua y seguimiento de iniciativas estratégicas en las áreas de gestión de la Dirección Nacional."',
    color: '#088152',
    level: 1,
    parentId: 0,
  },
  // Nivel 2 - Direcciones Principales
  {
    id: 4,
    name: 'Dirección de Logística',
    position: 'Director de Logística',
    department: 'Dirección de Logística',
    image: 'hero_director.png',
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
    image: 'hero_director.png',
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
    image: 'hero_director.png',
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
    image: 'hero_director.png',
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

  useEffect(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.querySelectorAll('.org-item');

    // Animación de entrada con stagger
    anime({
      targets: items,
      scale: [0, 1],
      opacity: [0, 1],
      translateY: [50, 0],
      delay: anime.stagger(100, { from: 'center' }),
      duration: 800,
      easing: 'easeOutElastic(1, .6)',
    });
  }, []);

  const handleExpand = (nodeId: number, event: React.MouseEvent<HTMLDivElement>) => {
    const clickedElement = event.currentTarget;
    const rect = clickedElement.getBoundingClientRect();

    setExpandedNode(nodeId);

    // Animar overlay con efecto de fade y blur
    setTimeout(() => {
      if (overlayRef.current) {
        anime({
          targets: overlayRef.current,
          opacity: [0, 1],
          duration: 500,
          easing: 'easeOutCubic',
        });
      }

      // Animar expansión del card con efecto más dramático
      if (expandedRef.current) {
        // Posicionar el elemento expandido en la posición del click
        expandedRef.current.style.position = 'fixed';
        expandedRef.current.style.top = `${rect.top}px`;
        expandedRef.current.style.left = `${rect.left}px`;
        expandedRef.current.style.width = `${rect.width}px`;
        expandedRef.current.style.height = `${rect.height}px`;
        expandedRef.current.style.opacity = '1';
        expandedRef.current.style.borderRadius = '1rem';

        // Animar a pantalla completa con escala y rotación sutil
        anime({
          targets: expandedRef.current,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          borderRadius: '0px',
          duration: 700,
          easing: 'easeInOutQuart',
        });

        // Animar contenido interno con stagger
        const content = expandedRef.current.querySelector('.expanded-content');
        if (content) {
          const children = content.querySelectorAll('.animate-item');
          anime({
            targets: children,
            opacity: [0, 1],
            translateY: [40, 0],
            delay: anime.stagger(80, { start: 400 }),
            duration: 600,
            easing: 'easeOutCubic',
          });
        }
      }
    }, 10);
  };

  const handleCollapse = () => {
    // Animar contenido primero
    if (expandedRef.current) {
      const content = expandedRef.current.querySelector('.expanded-content');
      if (content) {
        anime({
          targets: content,
          opacity: [1, 0],
          translateY: [0, -20],
          duration: 300,
          easing: 'easeInCubic',
        });
      }

      // Animar card con efecto de implosión
      anime({
        targets: expandedRef.current,
        scale: [1, 0.95],
        opacity: [1, 0],
        duration: 400,
        delay: 200,
        easing: 'easeInQuart',
        complete: () => {
          setExpandedNode(null);
        },
      });
    }

    // Animar overlay
    if (overlayRef.current) {
      anime({
        targets: overlayRef.current,
        opacity: [1, 0],
        duration: 400,
        delay: 200,
        easing: 'easeInCubic',
      });
    }
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
      <section className="p-8 ">
                  <div className="text-center mb-10">
            <div className="text-secondary-green font-semibold text-sm uppercase tracking-[2px] mb-2">
              ESTRUCTURA
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark">
              Organigrama
            </h2>
            <p className="text-gray-600 max-w-[800px] mx-auto mt-3">
              Representación de la estructura jerárquica de la Dirección y sus unidades.
            </p>
          </div>
      
      <div ref={gridRef} className="space-y-12 max-w-7xl mx-auto">
        {/* Nivel 0 - Dirección Nacional */}
        {nodesByLevel[0] && (
          <div className="flex justify-center">
            {nodesByLevel[0].map((node) => (
              <div
                key={node.id}
                className="org-item cursor-pointer group"
                onClick={(e) => handleExpand(node.id, e)}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-2xl shadow-xl hover:shadow-2xl border-2 border-[#0F172A] hover:border-[#25a366]/40 transition-all duration-500 hover:-translate-y-2 w-96">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#25a366]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative h-48 bg-gradient-to-br from-[#0F172A] to-slate-900 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F] shadow-lg">
                        <img
                          src={`${import.meta.env.BASE_URL}${node.image}`}
                          alt={node.name}
                          className="w-full h-full object-cover rounded-full border-4 border-[#0F172A] group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="relative p-6">
                    <h4 className="font-bold text-lg text-white leading-tight mb-2">{node.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-[#25a366] font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#25a366]" />
                      <span>{node.department}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#25a366]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-4 h-4 text-[#25a366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Nivel 1 - Gabinetes y Departamento (3 nodos) */}
        {nodesByLevel[1] && (
          <div className="relative">
            {/* Línea vertical principal desde Nivel 0 */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-16 w-1 h-12 org-line-animated rounded-full" />
            {/* Línea horizontal que conecta los 3 nodos del nivel 1 */}
            <div className="absolute left-[16.67%] right-[16.67%] h-1 org-line-horizontal-animated rounded-full" style={{ top: '-4px' }} />
            
            <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
              {nodesByLevel[1].map((node) => (
                <div key={node.id} className="relative">
                  {/* Línea vertical desde línea horizontal hasta cada nodo */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-1 org-line-animated rounded-full" style={{ top: '-4px', height: '4px' }} />
                  
                  <div
                    className="org-item cursor-pointer group"
                    onClick={(e) => handleExpand(node.id, e)}
                  >
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-xl shadow-lg hover:shadow-xl border border-[#0F172A] hover:border-[#25a366]/40 transition-all duration-500 hover:-translate-y-1 w-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#25a366]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative h-40 bg-gradient-to-br from-[#0F172A] to-slate-900 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F] shadow-md">
                            <img
                              src={`${import.meta.env.BASE_URL}${node.image}`}
                              alt={node.name}
                              className="w-full h-full object-cover rounded-full border-3 border-[#0F172A] group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="relative p-4">
                        <h4 className="font-bold text-base text-white mb-2">{node.name}</h4>
                        <div className="text-xs text-[#25a366] flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-[#25a366]" />
                          <span>{node.department}</span>
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-[#25a366]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <svg className="w-3.5 h-3.5 text-[#25a366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nivel 2 - Direcciones Principales (4 nodos) */}
        {nodesByLevel[2] && (
          <div className="relative">
            {/* Línea vertical principal desde Nivel 0 */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-16 w-1 h-12 org-line-animated rounded-full" />
            {/* Línea horizontal que conecta las 4 direcciones */}
            <div className="absolute left-[12.5%] right-[12.5%] h-1 org-line-horizontal-animated rounded-full" style={{ top: '-4px' }} />
            
            <div className="grid grid-cols-4 gap-4 max-w-6xl mx-auto">
              {nodesByLevel[2].map((node) => (
                <div key={node.id} className="relative">
                  {/* Línea vertical desde línea horizontal hasta cada dirección */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-1 org-line-animated rounded-full" style={{ top: '-4px', height: '4px' }} />
                  <div
                    className="org-item cursor-pointer group h-full"
                    onClick={(e) => handleExpand(node.id, e)}
                  >
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-lg shadow-md hover:shadow-lg border border-[#0F172A] hover:border-[#25a366]/40 transition-all duration-500 hover:-translate-y-1 h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#25a366]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative h-36 bg-gradient-to-br from-[#0F172A] to-slate-900 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full p-0.5 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F] shadow-sm">
                            <img
                              src={`${import.meta.env.BASE_URL}${node.image}`}
                              alt={node.name}
                              className="w-full h-full object-cover rounded-full border-2 border-[#0F172A] group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="relative p-3">
                        <h4 className="font-semibold text-sm text-white mb-2 leading-tight">{node.name}</h4>
                        <div className="text-xs text-[#25a366]">{node.department}</div>
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
            <div className="absolute left-1/2 -top-12 w-0.5 h-12 bg-[#1D7D4D]" />
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {nodesByLevel[3].map((node) => (
                <div key={node.id} className="relative">
                  <div className="absolute left-1/2 -top-12 w-0.5 h-12 bg-[#1D7D4D]" />
                  
                  <div
                    className="org-item cursor-pointer group"
                    onClick={(e) => handleExpand(node.id, e)}
                  >
                    <div className="relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-500 hover:-translate-y-2">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1D7D4D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative h-40 bg-gradient-to-br from-[#1D7D4D]/6 to-white overflow-hidden">
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
      </section>

      {/* Overlay y vista expandida */}
      {expandedNode !== null && (
        <>
          <div
            ref={overlayRef}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            style={{ opacity: 0 }}
            onClick={handleCollapse}
          />
          <div
            ref={expandedRef}
            className="fixed z-50 bg-gradient-to-br from-white via-gray-50 to-emerald-50 shadow-2xl overflow-hidden"
            style={{ opacity: 0 }}
          >
            {selectedNode && (
              <div className="expanded-content h-full overflow-y-auto bg-white">
                {/* Botón cerrar */}
                <button
                  onClick={handleCollapse}
                  className="fixed top-6 right-6 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:rotate-90 z-50"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Sección estilo Director */}
                <section className="py-24 bg-white relative overflow-hidden">
                  <div className="max-w-[1400px] mx-auto px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                      
                      {/* Columna izquierda: Foto del Director (2/5) */}
                      <div 
                        className="lg:col-span-2 flex justify-center opacity-0 relative min-h-[600px]"
                        style={{ animation: 'fadeInUp 1s ease forwards' }}
                      >
                        <OrganigramaParticles 
                          imageSrc={`${import.meta.env.BASE_URL}hero_director.png`}
                          altText={selectedNode.name}
                        />
                      </div>

                      {/* Columna derecha: Información (3/5) */}
                      <div className="lg:col-span-3 space-y-10">
                        
                        {/* Nombre y cargo */}
                        <div 
                          className="opacity-0"
                          style={{ animation: 'fadeInUp 1s ease 0.2s forwards' }}
                        >
                          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 leading-tight">
                            {selectedNode.name}
                          </h2>
                          <div className="inline-block px-4 py-1.5 bg-[#1D7D4D]/10 rounded-full mb-4">
                            <p className="text-sm font-semibold text-[#1D7D4D] uppercase tracking-wide">
                              {selectedNode.position}
                            </p>
                          </div>
                        </div>

                        {/* Descripción */}
                        <div 
                          className="group p-6 rounded-xl bg-white/60 border border-[#1D7D4D]/10 hover:border-[#1D7D4D]/30 transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl opacity-0"
                          style={{ animation: 'fadeInUp 1s ease 0.4s forwards' }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white bg-gradient-to-br from-[#1D7D4D] to-[#25a366] shadow-md">
                                <DocumentTextIcon className="w-6 h-6" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-slate-900 mb-2">Descripción</h3>
                              <p className="text-slate-600 leading-relaxed text-sm">
                                {selectedNode.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Información adicional según el nivel */}
                        {selectedNode.level === 0 && (
                          <div 
                            className="group p-6 rounded-xl bg-white/60 border border-[#25a366]/10 hover:border-[#25a366]/30 transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl opacity-0"
                            style={{ animation: 'fadeInUp 1s ease 0.5s forwards' }}
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white bg-gradient-to-br from-[#25a366] to-[#1D7D4D] shadow-md">
                                  <UserGroupIcon className="w-6 h-6" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Áreas de Gestión</h3>
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="flex items-center gap-2 text-slate-700 text-sm">
                                    <div className="w-2 h-2 rounded-full bg-[#1D7D4D]"></div>
                                    <span>Finanzas</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-slate-700 text-sm">
                                    <div className="w-2 h-2 rounded-full bg-[#25a366]"></div>
                                    <span>Logística</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-slate-700 text-sm">
                                    <div className="w-2 h-2 rounded-full bg-[#1D7D4D]"></div>
                                    <span>Tecnología</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-slate-700 text-sm">
                                    <div className="w-2 h-2 rounded-full bg-[#25a366]"></div>
                                    <span>Compras Públicas</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedNode.level === 1 && selectedNode.id === 1 && (
                          <div 
                            className="group p-6 rounded-xl bg-white/60 border border-[#25a366]/10 hover:border-[#25a366]/30 transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl opacity-0"
                            style={{ animation: 'fadeInUp 1s ease 0.5s forwards' }}
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white bg-gradient-to-br from-[#25a366] to-[#1D7D4D] shadow-md">
                                  <UserGroupIcon className="w-6 h-6" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Secciones del Gabinete</h3>
                                <div className="space-y-3">
                                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-[#1D7D4D]/5 to-transparent">
                                    <div className="w-2 h-2 rounded-full bg-[#1D7D4D]"></div>
                                    <span className="text-slate-700 font-medium">Ayudantía</span>
                                  </div>
                                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-[#25a366]/5 to-transparent">
                                    <div className="w-2 h-2 rounded-full bg-[#25a366]"></div>
                                    <span className="text-slate-700 font-medium">Oficina de Partes</span>
                                  </div>
                                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-[#35AF6F]/5 to-transparent">
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
                            className="group p-6 rounded-xl bg-white/60 border border-[#25a366]/10 hover:border-[#25a366]/30 transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl opacity-0"
                            style={{ animation: 'fadeInUp 1s ease 0.5s forwards' }}
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white bg-gradient-to-br from-[#25a366] to-[#1D7D4D] shadow-md">
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
                            className="group p-6 rounded-xl bg-white/60 border border-[#25a366]/10 hover:border-[#25a366]/30 transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl opacity-0"
                            style={{ animation: 'fadeInUp 1s ease 0.5s forwards' }}
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white bg-gradient-to-br from-[#25a366] to-[#1D7D4D] shadow-md">
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
        </>
      )}
    </>
  );
}

export default AnimeOrganigrama;
