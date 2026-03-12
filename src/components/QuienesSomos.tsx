import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import AnimeOrganigrama from './AnimeOrganigrama';
import {
  ShieldCheckIcon, ChartBarIcon, UsersIcon,
  ArchiveBoxIcon, ShoppingCartIcon, CurrencyDollarIcon, ComputerDesktopIcon,
  DocumentTextIcon, TruckIcon, CircleStackIcon, CpuChipIcon, LockClosedIcon,
  MapPinIcon, ShieldExclamationIcon, AcademicCapIcon, ScaleIcon,
  StarIcon, ChevronDownIcon, HeartIcon
} from '@heroicons/react/24/solid';


// ─────────────────────────────────────────────
// Hook de visibilidad
// ─────────────────────────────────────────────
const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0, ...options }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);
  return [elementRef, isVisible] as const;
};



// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

// Todos los ejes (vista compacta — referencia al PEDP)
const todosLosEjes = [
  {
    id: 1,
    numero: "EJE 1",
    titulo: "Fortalecimiento del Carabinero en el Territorio",
    objetivo: "Gestión policial eficaz",
    icon: <MapPinIcon className="w-8 h-8 text-blue-500" />,
    iconBg: 'bg-blue-50',
    neonColor: '#24c570',
    esDirnaoperpol: false,
  },
  {
    id: 2,
    numero: "EJE 2",
    titulo: "Nuevo Modelo de Actuación en Control del Orden Público",
    objetivo: "Gestión policial eficaz + Legitimidad",
    icon: <ShieldExclamationIcon className="w-8 h-8 text-orange-500" />,
    iconBg: 'bg-orange-50',
    neonColor: '#24c570',
    esDirnaoperpol: false,
  },
  {
    id: 3,
    numero: "EJE 3",
    titulo: "Reconocimiento y Fortalecimiento de la Educación",
    objetivo: "Desarrollo del capital humano",
    icon: <AcademicCapIcon className="w-8 h-8 text-purple-500" />,
    iconBg: 'bg-purple-50',
    neonColor: '#24c570',
    esDirnaoperpol: false,
  },
  {
    id: 4,
    numero: "EJE 4",
    titulo: "Refuerzo de la Ética Policial y Control Efectivo",
    objetivo: "Legitimidad institucional",
    icon: <ScaleIcon className="w-8 h-8 text-amber-500" />,
    iconBg: 'bg-amber-50',
    neonColor: '#24c570',
    esDirnaoperpol: false,
  },
  {
    id: 5,
    numero: "EJE 5",
    titulo: "Optimización de la Dotación",
    objetivo: "Eficiencia en el uso de los recursos",
    icon: <ChartBarIcon className="w-8 h-8 text-cyan-500" />,
    iconBg: 'bg-cyan-50',
    neonColor: '#24c570',
    esDirnaoperpol: false,
  },
  {
    id: 6,
    numero: "EJE 6",
    titulo: "Cadena Logística Eficiente de Apoyo a las Funciones Policiales",
    objetivo: "Eficiencia en el uso de los recursos",
    icon: <TruckIcon className="w-8 h-8 text-green-600" />,
    iconBg: 'bg-green-50',
    shadowColor: '#16a34a',
    neonColor: '#24c570',
    esDirnaoperpol: true,
  },
  {
    id: 7,
    numero: "EJE 7",
    titulo: "Modernización del Sistema de Bienestar",
    objetivo: "Desarrollo del capital humano",
    icon: <HeartIcon className="w-8 h-8 text-pink-400" />,
    iconBg: 'bg-pink-50',
    centered: true,
    neonColor: '#ff3b3b',
    esDirnaoperpol: false,
  },
  {
    id: 8,
    numero: "EJE 8",
    titulo: "Transformación Digital",
    objetivo: "Eficiencia en el uso de los recursos",
    icon: <CpuChipIcon className="w-8 h-8 text-indigo-500" />,
    iconBg: 'bg-indigo-50',
    shadowColor: '#6366f1',
    neonColor: '#24c570',
    esDirnaoperpol: true,
  },
];

// Ejes detallados DIRNAOPERPOL
const ejesDetallados = [
  {
    id: 6,
    numero: "EJE 6",
    titulo: "Desarrollo de una Cadena Logística Eficiente de Apoyo a las Funciones Policiales",
    objetivo: "Eficiencia en el uso de los recursos",
    descripcion: "Garantizar que cada carabinero en el territorio cuente oportunamente con los recursos materiales necesarios para cumplir su función policial con profesionalismo y seguridad.",
    icon: <TruckIcon className="w-8 h-8 text-white" />,
    programas: [
      {
        titulo: "Definición de la cadena logística institucional",
        puntos: [
          "Levantar y mapear los procesos actuales del ciclo logístico completo",
          "Definir estándares de calidad, plazos y cobertura para cada eslabón de la cadena",
          "Dotar oportunamente de vestuario, vehículos, armamento y equipamiento tecnológico al personal en terreno",
          "Incorporar criterios de sostenibilidad y eficiencia presupuestaria en las adquisiciones",
          "Establecer indicadores de seguimiento y cumplimiento logístico por área y región",
        ],
        icon: <CircleStackIcon className="w-5 h-5 text-secondary-green" />,
      },
      {
        titulo: "Externalización de funciones de apoyo",
        puntos: [
          "Identificar y analizar qué funciones logísticas no esenciales pueden entregarse a privados",
          "Definir el marco normativo y contractual para la externalización",
          "Liberar personal policial de funciones administrativas y redirigirlo a operaciones de prevención del delito",
          "Establecer una reserva estratégico-táctica interna que garantice continuidad del servicio ante cualquier contingencia",
        ],
        icon: <UsersIcon className="w-5 h-5 text-secondary-green" />,
      },
    ],
  },
  {
    id: 8,
    numero: "EJE 8",
    titulo: "Transformación Digital",
    objetivo: "Eficiencia en el uso de los recursos",
    descripcion: "Modernizar la infraestructura tecnológica, integrar los sistemas informáticos institucionales y garantizar la ciberseguridad, en línea con la Ley N° 21.180 de Transformación Digital del Estado.",
    icon: <CpuChipIcon className="w-8 h-8 text-white" />,
    programas: [
      {
        titulo: "Estrategia digital institucional",
        puntos: [
          "Desarrollar e implementar una hoja de ruta de transformación digital alineada con la política del Estado",
          "Integrar los sistemas administrativos, operacionales y territoriales en una plataforma unificada",
          "Incorporar herramientas de análisis criminal: georreferenciación, imágenes satelitales y modelos predictivos",
          "Proveer a los carabineros en terreno de equipamiento tecnológico y conectividad para la toma de decisiones en tiempo real",
          "Gestionar los recursos humanos, logísticos y financieros asociados a cada fase de implementación digital",
        ],
        icon: <ComputerDesktopIcon className="w-5 h-5 text-secondary-green" />,
      },
      {
        titulo: "Ciberseguridad",
        puntos: [
          "Definir e implementar una política de seguridad de la información institucional",
          "Establecer estándares de protección de datos para los sistemas AUPOL y demás plataformas críticas",
          "Desarrollar capacidades de respuesta ante incidentes de ciberseguridad",
          "Cumplir los estándares exigidos por la normativa nacional de ciberseguridad vigente",
        ],
        icon: <LockClosedIcon className="w-5 h-5 text-secondary-green" />,
      },
    ],
  },
];

const objetivos = [
  { id: 1, bgImage: 'seguridad.png', titulo: "Seguridad Ciudadana", descripcion: "Garantizar la protección y seguridad de todos los ciudadanos mediante operaciones coordinadas y eficientes." },
  { id: 2, bgImage: 'gestion_tecnica.png', titulo: "Gestión Técnica", descripcion: "Implementar sistemas modernos de gestión para optimizar recursos y procesos operacionales." },
  { id: 3, bgImage: 'coordinacion.png', titulo: "Coordinación Nacional", descripcion: "Articular y sincronizar operaciones policiales en todo el territorio nacional." },
  { id: 4, bgImage: 'innovacion.png', titulo: "Innovación", descripcion: "Incorporar tecnología y mejores prácticas para modernizar las operaciones policiales." },
];

const gabinete = [
  { id: 1, title: 'Ayudantía', desc: 'Coordina y organiza las audiencias del Director Nacional.', icon: <UsersIcon className="w-6 h-6 text-white" /> },
  { id: 2, title: 'Oficina de Partes', desc: 'Gestiona documentación institucional y extra institucional.', icon: <DocumentTextIcon className="w-6 h-6 text-white" /> },
  { id: 3, title: 'Asesoría Jurídica', desc: 'Asesora en normativa legal y administrativa institucional.', icon: <ShieldCheckIcon className="w-6 h-6 text-white" /> },
];

const gabineteTenico = [
  { id: 1, title: 'Control y Gestión de Materias Estratégicas', responsable: '', desc: 'Monitoreo de proyectos tecnológicos, telecomunicaciones y equipamiento estratégico.', icon: <ShieldCheckIcon className="w-6 h-6 text-white" /> },
  { id: 2, title: 'Control y Gestión de Cadena de Suministros', responsable: '', desc: 'Análisis y control de procesos logísticos, adquisiciones y abastecimiento institucional.', icon: <ArchiveBoxIcon className="w-6 h-6 text-white" /> },
  { id: 3, title: 'Control y Gestión de Infraestructura', responsable: '', desc: 'Supervisión de proyectos de construcción, mantenimiento y optimización de cuarteles.', icon: <ChartBarIcon className="w-6 h-6 text-white" /> },
];

const direcciones = [
  { id: 1, title: 'Dirección de Logística', desc: 'Gestión integral de recursos y cadena de suministro a nivel nacional.', icon: <ArchiveBoxIcon className="w-6 h-6 text-white" /> },
  { id: 2, title: 'Dirección de Compras Públicas', desc: 'Administración eficiente y transparente de procesos de adquisiciones.', icon: <ShoppingCartIcon className="w-6 h-6 text-white" /> },
  { id: 3, title: 'Dirección de Finanzas', desc: 'Planificación y control presupuestario para optimizar recursos.', icon: <CurrencyDollarIcon className="w-6 h-6 text-white" /> },
  { id: 4, title: 'Dirección de Tecnologías de Información y las Comunicaciones', desc: 'Infraestructura tecnológica y sistemas de información institucional.', icon: <ComputerDesktopIcon className="w-6 h-6 text-white" /> },
];


// ─────────────────────────────────────────────
// COMPONENTE
// ─────────────────────────────────────────────
export default function QuienesSomos() {

  const [sectionRef, sectionVisible] = useIntersectionObserver({ threshold: 0 });

  // Estado para el modal de detalles
  const [modalEjeId, setModalEjeId] = useState<number | null>(null);
  const [expandedProgramas, setExpandedProgramas] = useState<number[]>([]);

  // Flags animación
  const [animatedHeader1, setAnimatedHeader1] = useState(false);
  const [animatedGrid1, setAnimatedGrid1] = useState(false);
  const [animatedHeaderEjesAll, setAnimatedHeaderEjesAll] = useState(false);
  const [animatedGridEjesAll, setAnimatedGridEjesAll] = useState(false);
  const [animatedHeaderDirecciones, setAnimatedHeaderDirecciones] = useState(false);
  const [animatedGridDirecciones, setAnimatedGridDirecciones] = useState(false);
  const [animatedOrganigrama, setAnimatedOrganigrama] = useState(false);

  // Intersection refs
  const [header1Ref, header1Visible] = useIntersectionObserver({ threshold: 0.2 });
  const [grid1Ref, grid1Visible] = useIntersectionObserver({ threshold: 0.1 });
  const [headerEjesAllRef, headerEjesAllVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [gridEjesAllRef, gridEjesAllVisible] = useIntersectionObserver({ threshold: 0.05 });
  const [headerDireccionesRef, headerDireccionesVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [gridDireccionesRef, gridDireccionesVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [organigramaRef, organigramaVisible] = useIntersectionObserver({ threshold: 0.2 });

  // DOM refs
  const title1Ref = useRef(null);
  const grid1ItemsRef = useRef<HTMLDivElement>(null);
  const titleEjesAllRef = useRef(null);
  const gridEjesAllItemsRef = useRef<HTMLDivElement>(null);
  const titleDireccionesRef = useRef(null);
  const gridDireccionesItemsRef = useRef<HTMLDivElement>(null);
  const organigramaContainerRef = useRef(null);

  // ── Animaciones ──

  const animate = (
    target: React.RefObject<any>,
    setAnimated: (v: boolean) => void,
    isVisible: boolean,
    animated: boolean,
    isChildren = false
  ) => {
    if (!sectionVisible) {
      if (isChildren && target.current) anime.set(target.current.children, { opacity: 0, translateY: 10 });
      else anime.set(target.current, { opacity: 0, translateY: 10 });
      setAnimated(false);
    } else if (isVisible && !animated && target.current) {
      setAnimated(true);
      anime({
        targets: isChildren ? target.current.children : target.current,
        translateY: [20, 0],
        opacity: [0, 1],
        delay: isChildren ? anime.stagger(80) : 0,
        duration: isChildren ? 400 : 500,
        easing: 'easeOutQuad',
      });
    }
  };

  useEffect(() => animate(title1Ref, setAnimatedHeader1, header1Visible, animatedHeader1),
    [header1Visible, sectionVisible, animatedHeader1]);

  useEffect(() => animate(grid1ItemsRef, setAnimatedGrid1, grid1Visible, animatedGrid1, true),
    [grid1Visible, sectionVisible, animatedGrid1]);

  useEffect(() => animate(titleEjesAllRef, setAnimatedHeaderEjesAll, headerEjesAllVisible, animatedHeaderEjesAll),
    [headerEjesAllVisible, sectionVisible, animatedHeaderEjesAll]);

  useEffect(() => animate(gridEjesAllItemsRef, setAnimatedGridEjesAll, gridEjesAllVisible, animatedGridEjesAll, true),
    [gridEjesAllVisible, sectionVisible, animatedGridEjesAll]);

  useEffect(() => animate(titleDireccionesRef, setAnimatedHeaderDirecciones, headerDireccionesVisible, animatedHeaderDirecciones),
    [headerDireccionesVisible, sectionVisible, animatedHeaderDirecciones]);

  useEffect(() => animate(gridDireccionesItemsRef, setAnimatedGridDirecciones, gridDireccionesVisible, animatedGridDirecciones, true),
    [gridDireccionesVisible, sectionVisible, animatedGridDirecciones]);

  useEffect(() => {
    if (!sectionVisible) {
      anime.set(organigramaContainerRef.current, { opacity: 0 });
      setAnimatedOrganigrama(false);
    } else if (organigramaVisible && !animatedOrganigrama) {
      setAnimatedOrganigrama(true);
      anime({ targets: organigramaContainerRef.current, opacity: [0, 1], duration: 400, easing: 'easeOutQuad' });
    }
  }, [organigramaVisible, sectionVisible, animatedOrganigrama]);

  // ── Funciones de interacción ──
  
  const handleVerDetalle = (ejeId: number) => {
    setModalEjeId(ejeId);
    setExpandedProgramas([]);
  };

  const closeModal = () => {
    setModalEjeId(null);
    setExpandedProgramas([]);
  };

  const togglePrograma = (idx: number) => {
    setExpandedProgramas(prev => 
      prev.includes(idx) 
        ? prev.filter(i => i !== idx)
        : [...prev, idx]
    );
  };

  const ejeActual = ejesDetallados.find(e => e.id === modalEjeId);



  return (
    <section ref={sectionRef} id="quienes-somos" className="py-24 bg-light-bg overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-8 relative z-10">

        {/* ── SECCIÓN 1: OBJETIVOS ── */}
        <div ref={header1Ref} className="text-center mb-16">
          <div ref={title1Ref} className="opacity-0">
            <div className="text-secondary-green font-semibold text-sm uppercase tracking-[2px] mb-2">NUESTRA MISIÓN</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark mb-4">Objetivos de la Dirección</h2>
            <p className="text-text-light max-w-2xl mx-auto">
              Garantizamos la gestión eficiente de recursos institucionales mediante coordinación estratégica y optimización operacional continua.
            </p>
          </div>
        </div>

        <div ref={grid1Ref}>
          <div ref={grid1ItemsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            {objetivos.map((objetivo) => (
                  <div key={objetivo.id} className="opacity-0 relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group min-h-80">
                    <img
                      src={`${import.meta.env.BASE_URL}${objetivo.bgImage}`}
                      alt={objetivo.titulo}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors duration-300" />
                    <div className="relative h-full p-10 flex flex-col justify-end text-center min-h-80">
                      <h3 className="text-2xl font-bold text-white mb-2 drop-shadow">{objetivo.titulo}</h3>
                      <p className="text-lg text-white/85 leading-relaxed drop-shadow">{objetivo.descripcion}</p>
                    </div>
                  </div>
            ))}
          </div>
        </div>


        {/* ── SECCIÓN 2: TODOS LOS EJES (vista general) ── */}
        <div ref={headerEjesAllRef} className="text-center mb-12">
          <div ref={titleEjesAllRef} className="opacity-0">
            <div className="text-secondary-green font-semibold text-sm uppercase tracking-[2px] mb-2">
              PLAN ESTRATÉGICO DE DESARROLLO POLICIAL "CARABINERO DEL CENTENARIO"
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark mb-4">
              Ejes Estratégicos
            </h2>
            <p className="text-text-light max-w-3xl mx-auto">
             La Dirección Nacional de Gestión de Abastecimiento ejecuta dos ejes estratégicos fundamentales para el fortalecimiento institucional.
            </p>
          </div>
        </div>

        <div ref={gridEjesAllRef}>
          <div ref={gridEjesAllItemsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
            {todosLosEjes.map((eje) => (
              <div
                key={eje.id}
                className={`opacity-0 relative p-8 rounded-2xl border-2 transition-all duration-300 group flex flex-col items-center text-center
                  ${eje.esDirnaoperpol
                    ? 'bg-white border-transparent'
                    : 'bg-white border-transparent'
                  }`}
                style={(eje as any).shadowColor ? {
                  boxShadow: `0 2px 10px 0 ${(eje as any).shadowColor}22`,
                  transform: 'translateY(-4px)',
                  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                } : { boxShadow: 'none', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
                onMouseEnter={e => {
                  const sc = (eje as any).shadowColor;
                  if (sc) {
                    e.currentTarget.style.boxShadow = `0 0 0 1px ${sc}, 0 6px 16px 2px ${sc}33`;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }
                }}
                onMouseLeave={e => {
                  const sc = (eje as any).shadowColor;
                  if (sc) {
                    e.currentTarget.style.boxShadow = `0 4px 18px 0 ${sc}44`;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }
                }}
              >
                {/* Badge DGA */}
                {eje.esDirnaoperpol && (
                  <div className="absolute -top-3 left-4 bg-primary-green text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <StarIcon className="w-3 h-3" />
                    DGA
                  </div>
                )}

                {/* Número del eje */}
                <div className="text-[18px] font-bold tracking-widest mb-5 text-slate-800 uppercase"
                style={{
                      
                    }}
                    >
                  {eje.numero}
                </div>

                {/* Ícono grande */}
                <div className={`rounded-full flex items-center justify-center mb-5 w-16 h-16 transition-transform duration-300 group-hover:scale-110 ${(eje as any).iconBg || 'bg-slate-100'}`}>
                  <div>{eje.icon}</div>
                </div>

                {/* Título */}
                
                  <h3 className="text-base font-bold leading-snug text-slate-800">
                    {eje.titulo}
                  </h3>
             

                {/* Botón ver detalle */}
                {eje.esDirnaoperpol && (
                  <button
                    onClick={() => handleVerDetalle(eje.id)}
                    className="mt-5 flex items-center gap-1 text-slate-500 hover:text-slate-900 text-xs font-semibold transition-all duration-200 hover:gap-2 group/btn"
                  >
                    <span>Ver detalle</span>
                    <ChevronDownIcon className="w-3.5 h-3.5 group-hover/btn:translate-y-0.5 transition-transform" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>


        {/* ── ORGANIGRAMA ── */}
        <div ref={organigramaRef} className="mt-16">
          <div ref={organigramaContainerRef} className="opacity-0">
            <AnimeOrganigrama />
          </div>
        </div>

      </div>

      {/* ── MODAL DE DETALLE ── */}
      {modalEjeId && ejeActual && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="sticky top-0 z-10 bg-gradient-to-br from-primary-green via-secondary-green to-primary-green">
              <div className="relative overflow-hidden">
                {/* Pattern decorativo */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }}></div>
                
                <div className="relative px-8 py-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-6 flex-1">
                      {/* Ícono */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center shadow-xl">
                          {ejeActual.icon}
                        </div>
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full mb-2">
                          <StarIcon className="w-3 h-3 text-white" />
                          <span className="text-white text-xs font-bold tracking-widest">{ejeActual.numero}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight">
                          {ejeActual.titulo}
                        </h3>
                        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full mb-3">
                          <div className="w-2 h-2 rounded-full bg-primary-green"></div>
                          <span className="text-primary-green text-xs font-semibold">{ejeActual.objetivo}</span>
                        </div>
                        <p className="text-white/95 text-sm leading-relaxed">
                          {ejeActual.descripcion}
                        </p>
                      </div>
                    </div>
                    
                    {/* Botón cerrar */}
                    <button
                      onClick={closeModal}
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 flex items-center justify-center transition-all duration-200 group"
                    >
                      <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-green to-secondary-green flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{ejeActual.programas.length}</span>
                  </div>
                  <h4 className="text-xl font-bold text-text-dark">Programas Estratégicos</h4>
                </div>
              </div>

              <div className="space-y-4">
                {ejeActual.programas.map((programa, idx) => (
                  <div key={idx} className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-secondary-green/30 transition-all duration-300">
                    {/* Header del programa */}
                    <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-green/10 to-secondary-green/10 flex items-center justify-center border border-primary-green/20">
                          {programa.icon}
                        </div>
                        <div className="text-left">
                          <div className="text-secondary-green text-xs font-bold tracking-wider mb-0.5 uppercase">
                            Programa {ejeActual.id}.{idx + 1}
                          </div>
                          <h5 className="text-base font-bold text-text-dark">{programa.titulo}</h5>
                        </div>
                      </div>
                    </div>

                    {/* Contenido siempre visible */}
                    <div className="px-6 pb-6 pt-2 bg-gradient-to-br from-gray-50/50 to-white">
                      <ul className="space-y-3 list-disc list-inside">
                        {programa.puntos.map((punto, i) => (
                          <li key={i} className="text-sm text-text-light leading-relaxed marker:text-secondary-green">
                            {punto}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
