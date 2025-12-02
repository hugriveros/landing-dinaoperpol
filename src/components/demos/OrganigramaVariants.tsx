import { useState } from 'react';

interface OrgNode {
  id: number;
  name: string;
  position: string;
  department: string;
  image: string;
  level: number;
}

const orgData: OrgNode[] = [
  {
    id: 0,
    name: 'Dirección Nacional de Apoyo a las Operaciones Policiales',
    position: 'Director Nacional',
    department: 'DINAOPERPOL',
    image: 'hero_director.png',
    level: 0,
  },
  {
    id: 1,
    name: 'Gabinete',
    position: 'Jefe de Gabinete',
    department: 'Gabinete DINAOPERPOL',
    image: 'hero_director.png',
    level: 1,
  },
  {
    id: 2,
    name: 'Gabinete Técnico',
    position: 'Jefe de Gabinete Técnico',
    department: 'Gabinete Técnico DINAOPERPOL',
    image: 'hero_director.png',
    level: 1,
  },
  {
    id: 3,
    name: 'Departamento Gestión Técnica',
    position: 'Jefe de Departamento',
    department: 'Gestión Técnica DINAOPERPOL',
    image: 'hero_director.png',
    level: 1,
  },
  {
    id: 4,
    name: 'Dirección de Logística',
    position: 'Director de Logística',
    department: 'Dirección de Logística',
    image: 'hero_logistica.png',
    level: 2,
  },
  {
    id: 5,
    name: 'Dirección de Compras Públicas',
    position: 'Director de Compras Públicas',
    department: 'Dirección de Compras Públicas',
    image: 'hero_director.png',
    level: 2,
  },
  {
    id: 6,
    name: 'Dirección de Finanzas',
    position: 'Director de Finanzas',
    department: 'Dirección de Finanzas',
    image: 'hero_finanzas.png',
    level: 2,
  },
  {
    id: 7,
    name: 'Dirección de TIC',
    position: 'Director de TIC',
    department: 'Dirección de TIC',
    image: 'hero_tic.png',
    level: 2,
  },
];

// Componente auxiliar para avatar que puede mostrar imagen o iniciales
function Avatar({ image, name, showImage }: { image: string; name: string; showImage: boolean }) {
  if (showImage && image) {
    return (
      <img
        src={`${import.meta.env.BASE_URL}${image}`}
        alt={name}
        className="w-full h-full object-cover rounded-full"
      />
    );
  }

  // Si no mostramos imagen (ya vista o no disponible), mostrar iniciales discretas
  const initials = name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0B1220] text-white font-bold rounded-full">
      {initials}
    </div>
  );
}

export default function OrganigramaVariants() {
  const [selectedVariant, setSelectedVariant] = useState<number>(1);

  const variants = [
    {
      id: 1,
      name: 'Cascada con SVG Responsivo',
      description: 'Líneas SVG que se adaptan automáticamente al tamaño de pantalla',
    },
    {
      id: 2,
      name: 'Acordeón Vertical',
      description: 'Organigrama colapsable ideal para móviles',
    },
    {
      id: 3,
      name: 'Tarjetas con Iconos de Conexión',
      description: 'Iconos de flechas en lugar de líneas',
    },
    {
      id: 4,
      name: 'Lista Jerárquica Indentada',
      description: 'Diseño en lista con indentación para mostrar jerarquía',
    },
    {
      id: 5,
      name: 'Tabs por Nivel',
      description: 'Pestañas para cambiar entre niveles jerárquicos',
    },
    {
      id: 6,
      name: 'Grid Responsivo con Bordes',
      description: 'Bordes decorativos en lugar de líneas conectoras',
    },
    {
      id: 7,
      name: 'Timeline Horizontal',
      description: 'Organigrama en formato timeline deslizable',
    },
    {
      id: 8,
      name: 'Árbol Radial',
      description: 'Diseño circular con el director en el centro',
    },
  ];

  // Variante 1: Cascada con SVG Responsivo
  const Variant1SVG = () => {
    const nodesByLevel = orgData.reduce((acc, node) => {
      if (!acc[node.level]) acc[node.level] = [];
      acc[node.level].push(node);
      return acc;
    }, {} as Record<number, OrgNode[]>);

    // Sets para evitar repetir imágenes por nivel (solo para esta variante)
    const seenLevel1 = new Set<string>();
    const seenLevel2 = new Set<string>();

    

    return (
      <div className="relative">
        {/* Nivel 0 */}
        <div className="flex justify-center mb-16">
          <div className="w-full max-w-md bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-xl p-6 shadow-xl border border-[#25a366]/30">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F] flex-shrink-0">
                <img
                  src={`${import.meta.env.BASE_URL}${nodesByLevel[0][0].image}`}
                  alt={nodesByLevel[0][0].name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">{nodesByLevel[0][0].name}</h3>
                <p className="text-[#25a366] text-xs">{nodesByLevel[0][0].department}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Icono de flecha hacia abajo */}
        <div className="flex justify-center -mt-10 mb-6">
          <div className="w-8 h-8 bg-[#1D7D4D] rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Nivel 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {(() => {
            const seenImages = new Set<string>();
            return nodesByLevel[1]?.map((node) => {
              const showImg = (() => { if (seenImages.has(node.image)) return false; seenImages.add(node.image); return true; })();
              return (
                <div key={node.id} className="bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-lg p-4 shadow-lg border border-[#25a366]/20">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F]">
                      <Avatar image={node.image} name={node.name} showImage={showImg} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xs mb-1">{node.name}</h4>
                      <p className="text-[#25a366] text-xs">{node.department}</p>
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>

        {/* Icono de flecha hacia abajo */}
        <div className="flex justify-center -mt-6 mb-6">
          <div className="w-8 h-8 bg-[#1D7D4D] rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Nivel 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {(() => {
            const seenImages = new Set<string>();
            return nodesByLevel[2]?.map((node) => {
              const showImg = (() => { if (seenImages.has(node.image)) return false; seenImages.add(node.image); return true; })();
              return (
                <div key={node.id} className="bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-lg p-4 shadow-lg border border-[#25a366]/20">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F]">
                      <Avatar image={node.image} name={node.name} showImage={showImg} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xs mb-1">{node.name}</h4>
                      <p className="text-[#25a366] text-xs">{node.department}</p>
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>
    );
  };

  // Variante 2: Acordeón Vertical
  const Variant2Accordion = () => {
    const [openLevels, setOpenLevels] = useState<number[]>([0, 1, 2]);

    const toggleLevel = (level: number) => {
      setOpenLevels(prev =>
        prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
      );
    };

    const nodesByLevel = orgData.reduce((acc, node) => {
      if (!acc[node.level]) acc[node.level] = [];
      acc[node.level].push(node);
      return acc;
    }, {} as Record<number, OrgNode[]>);

    const levelTitles = ['Dirección Nacional', 'Gabinetes y Departamentos', 'Direcciones'];

    return (
      <div className="space-y-4 max-w-4xl mx-auto">
        {Object.entries(nodesByLevel).map(([level, nodes]) => (
          <div key={level} className="border border-[#25a366]/30 rounded-xl overflow-hidden bg-gradient-to-br from-[#0F172A] to-slate-900">
            <button
              onClick={() => toggleLevel(Number(level))}
              className="w-full p-4 flex items-center justify-between hover:bg-[#1D7D4D]/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1D7D4D] rounded-full flex items-center justify-center text-white font-bold">
                  {nodes.length}
                </div>
                <h3 className="text-white font-bold text-lg">{levelTitles[Number(level)]}</h3>
              </div>
              <svg
                className={`w-6 h-6 text-[#25a366] transition-transform ${openLevels.includes(Number(level)) ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openLevels.includes(Number(level)) && (
              <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                {(() => {
                  const seenImages = new Set<string>();
                  return nodes.map((node) => {
                    const showImg = (() => { if (seenImages.has(node.image)) return false; seenImages.add(node.image); return true; })();
                    return (
                      <div key={node.id} className="bg-slate-800/50 rounded-lg p-4 border border-[#25a366]/20">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F] flex-shrink-0">
                            <Avatar image={node.image} name={node.name} showImage={showImg} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-bold text-sm truncate">{node.name}</h4>
                            <p className="text-[#25a366] text-xs truncate">{node.department}</p>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Variante 3: Tarjetas con Iconos de Conexión
  const Variant3IconConnections = () => {
    const nodesByLevel = orgData.reduce((acc, node) => {
      if (!acc[node.level]) acc[node.level] = [];
      acc[node.level].push(node);
      return acc;
    }, {} as Record<number, OrgNode[]>);

    return (
      <div className="space-y-8">
        {/* Nivel 0 */}
        <div className="flex justify-center">
          <div className="w-full max-w-lg bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-xl p-6 shadow-2xl border-2 border-[#25a366]">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F] flex-shrink-0">
                <img
                  src={`${import.meta.env.BASE_URL}${nodesByLevel[0][0].image}`}
                  alt={nodesByLevel[0][0].name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-base mb-1">{nodesByLevel[0][0].name}</h3>
                <p className="text-[#25a366] text-sm">{nodesByLevel[0][0].department}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Iconos conectores */}
        <div className="flex justify-center gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-8 h-8 bg-[#1D7D4D] rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          ))}
        </div>

        {/* Nivel 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(() => {
            const seenImages = new Set<string>();
            return nodesByLevel[1]?.map((node) => {
              const showImg = (() => { if (seenImages.has(node.image)) return false; seenImages.add(node.image); return true; })();
              return (
                <div key={node.id}>
                  <div className="bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-lg p-5 shadow-lg border border-[#25a366]/30">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F]">
                        <Avatar image={node.image} name={node.name} showImage={showImg} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-1">{node.name}</h4>
                        <p className="text-[#25a366] text-xs">{node.department}</p>
                      </div>
                    </div>
                  </div>
                  {/* Icono conector hacia nivel 2 */}
                  <div className="flex justify-center my-4">
                    <div className="w-6 h-6 bg-[#25a366] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>

        {/* Nivel 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(() => {
            const seenImages = new Set<string>();
            return nodesByLevel[2]?.map((node) => {
              const showImg = (() => { if (seenImages.has(node.image)) return false; seenImages.add(node.image); return true; })();
              return (
                <div key={node.id} className="bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-lg p-4 shadow-lg border border-[#25a366]/20">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F]">
                      <Avatar image={node.image} name={node.name} showImage={showImg} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xs mb-1">{node.name}</h4>
                      <p className="text-[#25a366] text-xs">{node.department}</p>
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>
    );
  };

  // Variante 4: Lista Jerárquica Indentada
  const Variant4Indented = () => {
    const nodesByLevel = orgData.reduce((acc, node) => {
      if (!acc[node.level]) acc[node.level] = [];
      acc[node.level].push(node);
      return acc;
    }, {} as Record<number, OrgNode[]>);

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Nivel 0 */}
        <div className="bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-xl p-6 border-l-4 border-[#1D7D4D] shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F]">
              <img
                src={`${import.meta.env.BASE_URL}${nodesByLevel[0][0].image}`}
                alt={nodesByLevel[0][0].name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="text-[#25a366] text-xs font-semibold mb-1">NIVEL 0 - DIRECCIÓN NACIONAL</div>
              <h3 className="text-white font-bold text-base">{nodesByLevel[0][0].name}</h3>
              <p className="text-gray-400 text-sm">{nodesByLevel[0][0].department}</p>
            </div>
          </div>
        </div>

        {/* Nivel 1 */}
        <div className="pl-8 space-y-4">
          <div className="text-[#25a366] text-sm font-bold uppercase tracking-wide mb-2">
            ↳ Nivel 1 - Gabinetes y Departamentos
          </div>
          {(() => {
            const seenImages = new Set<string>();
            return nodesByLevel[1]?.map((node) => {
              const showImg = (() => { if (seenImages.has(node.image)) return false; seenImages.add(node.image); return true; })();
              return (
                <div key={node.id} className="bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-lg p-4 border-l-4 border-[#25a366] shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F]">
                      <Avatar image={node.image} name={node.name} showImage={showImg} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">{node.name}</h4>
                      <p className="text-[#25a366] text-xs">{node.department}</p>
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>

        {/* Nivel 2 */}
        <div className="pl-16 space-y-4">
          <div className="text-[#25a366] text-sm font-bold uppercase tracking-wide mb-2">
            ↳ Nivel 2 - Direcciones
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(() => {
              const seenImages = new Set<string>();
              return nodesByLevel[2]?.map((node) => {
                const showImg = (() => { if (seenImages.has(node.image)) return false; seenImages.add(node.image); return true; })();
                return (
                  <div key={node.id} className="bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-lg p-4 border-l-4 border-[#35AF6F] shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F]">
                        <Avatar image={node.image} name={node.name} showImage={showImg} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm">{node.name}</h4>
                        <p className="text-[#25a366] text-xs">{node.department}</p>
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>
    );
  };

  // Variante 5: Tabs por Nivel
  const Variant5Tabs = () => {
    const [activeTab, setActiveTab] = useState(0);

    const nodesByLevel = orgData.reduce((acc, node) => {
      if (!acc[node.level]) acc[node.level] = [];
      acc[node.level].push(node);
      return acc;
    }, {} as Record<number, OrgNode[]>);

    const tabs = [
      { level: 0, title: 'Dirección Nacional', color: 'from-[#1D7D4D] to-[#25a366]' },
      { level: 1, title: 'Gabinetes', color: 'from-[#25a366] to-[#35AF6F]' },
      { level: 2, title: 'Direcciones', color: 'from-[#35AF6F] to-[#1D7D4D]' },
    ];

    return (
      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tabs.map((tab, index) => (
            <button
              key={tab.level}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-lg font-bold text-sm transition-all ${
                activeTab === index
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                  : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
              }`}
            >
              {tab.title}
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {nodesByLevel[tab.level]?.length || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          {tabs.map((tab, index) => (
            <div
              key={tab.level}
              className={`${activeTab === index ? 'block' : 'hidden'} animate-fadeIn`}
            >
              <div className={`grid gap-6 ${
                tab.level === 0 ? 'grid-cols-1 max-w-2xl mx-auto' :
                tab.level === 1 ? 'grid-cols-1 md:grid-cols-3' :
                'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              }`}>
                {(() => {
                  const seenImages = new Set<string>();
                  return nodesByLevel[tab.level]?.map((node) => {
                    const showImg = (() => { if (seenImages.has(node.image)) return false; seenImages.add(node.image); return true; })();
                    return (
                      <div
                        key={node.id}
                        className={`bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-xl shadow-xl border border-[#25a366]/30 overflow-hidden hover:scale-105 transition-transform ${
                          tab.level === 0 ? 'p-8' : 'p-5'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center gap-4">
                          <div className={`rounded-full p-1 bg-gradient-to-br ${tab.color} ${
                            tab.level === 0 ? 'w-24 h-24' : 'w-16 h-16'
                          }`}>
                            <Avatar image={node.image} name={node.name} showImage={showImg} />
                          </div>
                          <div>
                            <h3 className={`text-white font-bold mb-2 ${tab.level === 0 ? 'text-lg' : 'text-sm'}`}>
                              {node.name}
                            </h3>
                            <p className="text-[#25a366] text-xs">{node.position}</p>
                            <p className="text-gray-400 text-xs mt-1">{node.department}</p>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Variante 6: Grid Responsivo con Bordes
  const Variant6GridBorders = () => {
    const nodesByLevel = orgData.reduce((acc, node) => {
      if (!acc[node.level]) acc[node.level] = [];
      acc[node.level].push(node);
      return acc;
    }, {} as Record<number, OrgNode[]>);

    return (
      <div className="space-y-12">
        {/* Nivel 0 */}
        <div className="relative">
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#1D7D4D] via-[#25a366] to-[#35AF6F] rounded-xl blur opacity-75"></div>
              <div className="relative bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F]">
                    <img
                      src={`${import.meta.env.BASE_URL}${nodesByLevel[0][0].image}`}
                      alt={nodesByLevel[0][0].name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">{nodesByLevel[0][0].name}</h3>
                    <p className="text-[#25a366] text-xs">{nodesByLevel[0][0].department}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Decoración inferior */}
          <div className="flex justify-center mt-4">
            <div className="w-1 h-8 bg-gradient-to-b from-[#25a366] to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Nivel 1 */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nodesByLevel[1]?.map((node, _index) => (
              <div key={node.id} className="relative">
                {/* Decoración superior */}
                <div className="flex justify-center mb-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-transparent to-[#25a366] rounded-full"></div>
                </div>
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#25a366] to-[#35AF6F] rounded-lg blur opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-lg p-4">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F]">
                        <img
                          src={`${import.meta.env.BASE_URL}${node.image}`}
                          alt={node.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-xs mb-1">{node.name}</h4>
                        <p className="text-[#25a366] text-xs">{node.department}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decoración inferior */}
                <div className="flex justify-center mt-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-[#25a366] to-transparent rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nivel 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {nodesByLevel[2]?.map((node) => (
            <div key={node.id} className="relative">
              {/* Decoración superior */}
              <div className="flex justify-center mb-2">
                <div className="w-1 h-4 bg-gradient-to-b from-transparent to-[#35AF6F] rounded-full"></div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#35AF6F] to-[#1D7D4D] rounded-lg blur opacity-40 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-lg p-3">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F]">
                      <img
                        src={`${import.meta.env.BASE_URL}${node.image}`}
                        alt={node.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xs mb-1">{node.name}</h4>
                      <p className="text-[#25a366] text-xs">{node.department}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Variante 7: Timeline Horizontal
  const Variant7Timeline = () => {
    const seenL1 = new Set<string>();
    const seenL2 = new Set<string>();

    return (
      <div className="max-w-6xl mx-auto">
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-8 min-w-max px-4">
            {/* Nivel 0 */}
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-full p-6 border-4 border-[#1D7D4D] shadow-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full p-0.5 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F] mb-2">
                    <img
                      src={`${import.meta.env.BASE_URL}${orgData[0].image}`}
                      alt={orgData[0].name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <p className="text-white font-bold text-xs">DINAOPERPOL</p>
                </div>
              </div>
              <div className="mt-4 text-center max-w-[160px]">
                <h4 className="text-white font-bold text-xs mb-1">Nivel 0</h4>
                <p className="text-[#25a366] text-xs">Dirección Nacional</p>
              </div>
            </div>

            {/* Flecha */}
            <div className="flex items-center">
              <div className="w-12 h-1 bg-gradient-to-r from-[#1D7D4D] to-[#25a366]"></div>
              <svg className="w-6 h-6 text-[#25a366]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Nivel 1 */}
            {orgData.filter(n => n.level === 1).map((node, _index) => {
              const showImg = !seenL1.has(node.image);
              if (showImg) seenL1.add(node.image);
              return (
                <div key={node.id} className="flex flex-col items-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-full p-4 border-2 border-[#25a366] shadow-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto rounded-full p-0.5 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F] mb-1">
                        <Avatar image={node.image} name={node.name} showImage={showImg} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center max-w-[128px]">
                    <h4 className="text-white font-bold text-xs mb-1">{node.name}</h4>
                    <p className="text-[#25a366] text-xs">{node.department}</p>
                  </div>
                </div>
              );
            })}

            {/* Flecha */}
            <div className="flex items-center">
              <div className="w-12 h-1 bg-gradient-to-r from-[#25a366] to-[#35AF6F]"></div>
              <svg className="w-6 h-6 text-[#35AF6F]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Nivel 2 */}
            {orgData.filter(n => n.level === 2).map((node) => {
              const showImg = !seenL2.has(node.image);
              if (showImg) seenL2.add(node.image);
              return (
                <div key={node.id} className="flex flex-col items-center">
                  <div className="w-28 h-28 bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-full p-3 border-2 border-[#35AF6F] shadow-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 mx-auto rounded-full p-0.5 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F]">
                        <Avatar image={node.image} name={node.name} showImage={showImg} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center max-w-[112px]">
                    <h4 className="text-white font-bold text-xs mb-1">{node.name}</h4>
                    <p className="text-[#25a366] text-xs">{node.department}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Variante 8: Árbol Radial
  const Variant8Radial = () => {
    const level1Nodes = orgData.filter(n => n.level === 1);
    const level2Nodes = orgData.filter(n => n.level === 2);
    const seenInner = new Set<string>();
    const seenOuter = new Set<string>();

    return (
      <div className="relative w-full max-w-5xl mx-auto h-[800px] flex items-center justify-center">
        {/* Centro - Nivel 0 */}
        <div className="absolute z-20">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#1D7D4D] via-[#25a366] to-[#35AF6F] rounded-full blur-lg opacity-75 animate-pulse"></div>
            <div className="relative w-48 h-48 bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-full p-6 border-4 border-[#1D7D4D] shadow-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full p-1 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F] mb-2">
                  <img
                    src={`${import.meta.env.BASE_URL}${orgData[0].image}`}
                    alt={orgData[0].name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <p className="text-white font-bold text-sm">DINAOPERPOL</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nivel 1 - Círculo interno */}
        {level1Nodes.map((node, index) => {
          const angle = (index * 120 - 90) * (Math.PI / 180);
          const radius = 250;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const showImg = !seenInner.has(node.image);
          if (showImg) seenInner.add(node.image);
          return (
            <div
              key={node.id}
              className="absolute z-10"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <div className="relative">
                {/* Línea conectora */}
                <div 
                  className="absolute w-1 bg-gradient-to-r from-[#25a366] to-transparent rounded-full"
                  style={{
                    height: `${radius - 96}px`,
                    left: '50%',
                    bottom: '100%',
                    transform: `translateX(-50%) rotate(${-angle * (180 / Math.PI) + 90}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                />
                <div className="w-32 h-32 bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-full p-4 border-2 border-[#25a366] shadow-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-14 h-14 mx-auto rounded-full p-0.5 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F] mb-1">
                      <Avatar image={node.image} name={node.name} showImage={showImg} />
                    </div>
                    <p className="text-white font-bold text-xs">{node.name.split(' ')[0]}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Nivel 2 - Círculo externo */}
        {level2Nodes.map((node, index) => {
          const angle = (index * 90 - 45) * (Math.PI / 180);
          const radius = 400;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const showImg = !seenOuter.has(node.image);
          if (showImg) seenOuter.add(node.image);
          return (
            <div
              key={node.id}
              className="absolute z-5"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <div className="relative">
                {/* Línea conectora */}
                <div 
                  className="absolute w-0.5 bg-gradient-to-r from-[#35AF6F]/50 to-transparent rounded-full"
                  style={{
                    height: `${radius - 96}px`,
                    left: '50%',
                    bottom: '100%',
                    transform: `translateX(-50%) rotate(${-angle * (180 / Math.PI) + 90}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                />
                <div className="w-28 h-28 bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-full p-3 border-2 border-[#35AF6F] shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-full p-0.5 bg-gradient-to-br from-[#1D7D4D] via-[#25a366] to-[#35AF6F] mb-1">
                      <Avatar image={node.image} name={node.name} showImage={showImg} />
                    </div>
                    <p className="text-white font-bold text-xs">{node.name.includes('TIC') ? 'TIC' : node.name.split(' ')[2]}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderVariant = () => {
    switch (selectedVariant) {
      case 1:
        return <Variant1SVG />;
      case 2:
        return <Variant2Accordion />;
      case 3:
        return <Variant3IconConnections />;
      case 4:
        return <Variant4Indented />;
      case 5:
        return <Variant5Tabs />;
      case 6:
        return <Variant6GridBorders />;
      case 7:
        return <Variant7Timeline />;
      case 8:
        return <Variant8Radial />;
      default:
        return <Variant1SVG />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0F172A] to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F172A] to-slate-900 border-b border-[#25a366]/30 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-white mb-2">Variantes de Organigrama</h1>
          <p className="text-[#25a366]">Explora diferentes diseños responsivos para el organigrama</p>
        </div>
      </div>

      {/* Selector de Variantes */}
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant.id)}
              className={`p-4 rounded-xl text-left transition-all ${
                selectedVariant === variant.id
                  ? 'bg-gradient-to-br from-[#1D7D4D] to-[#25a366] text-white shadow-xl scale-105'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-800 border border-[#25a366]/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  selectedVariant === variant.id ? 'bg-white/20' : 'bg-[#25a366]/20'
                }`}>
                  <span className={`font-bold ${selectedVariant === variant.id ? 'text-white' : 'text-[#25a366]'}`}>
                    {variant.id}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm mb-1">{variant.name}</h3>
                  <p className={`text-xs ${selectedVariant === variant.id ? 'text-white/80' : 'text-gray-400'}`}>
                    {variant.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Contenedor del Organigrama */}
        <div className="bg-slate-800/30 rounded-2xl p-8 border border-[#25a366]/20 min-h-[600px]">
          {renderVariant()}
        </div>

        {/* Info adicional */}
        <div className="mt-8 bg-slate-800/50 rounded-xl p-6 border border-[#25a366]/20">
          <h3 className="text-white font-bold mb-2">💡 Recomendaciones</h3>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>• <strong className="text-[#25a366]">Variante 1-3:</strong> Mejores para desktop con diseño visual</li>
            <li>• <strong className="text-[#25a366]">Variante 2, 4:</strong> Óptimas para móviles (colapsa verticalmente)</li>
            <li>• <strong className="text-[#25a366]">Variante 5:</strong> Excelente para navegación por niveles</li>
            <li>• <strong className="text-[#25a366]">Variante 6-8:</strong> Diseños más creativos y modernos</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
