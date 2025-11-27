export default function QuienesSomos() {
  const objetivos = [
    {
      id: 1,
      icon: "🛡️",
      titulo: "Seguridad Ciudadana",
      descripcion: "Garantizar la protección y seguridad de todos los ciudadanos mediante operaciones coordinadas y eficientes."
    },
    {
      id: 2,
      icon: "📊",
      titulo: "Gestión Técnica",
      descripcion: "Implementar sistemas modernos de gestión para optimizar recursos y procesos operacionales."
    },
    {
      id: 3,
      icon: "🤝",
      titulo: "Coordinación Nacional",
      descripcion: "Articular y sincronizar operaciones policiales en todo el territorio nacional."
    },
    {
      id: 4,
      icon: "💡",
      titulo: "Innovación",
      descripcion: "Incorporar tecnología y mejores prácticas para modernizar las operaciones policiales."
    }
  ];

  return (
    <section id="quienes-somos" className="py-24 bg-light-bg">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-secondary-green font-semibold text-sm uppercase tracking-[2px] mb-2">
            NUESTRA MISIÓN
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark mb-4">
            Objetivos de la Dirección
          </h2>
        </div>
        


        {/* Grid de objetivos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {objetivos.map((objetivo) => (
            <div 
              key={objetivo.id}
              className="bg-white p-10 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]"
            >
              {/* Icono */}
              <div className="w-[70px] h-[70px] bg-linear-to-br from-primary-green to-secondary-green rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">
                {objetivo.icon}
              </div>
              
              {/* Título */}
              <h3 className="text-xl font-semibold text-text-dark mb-3">
                {objetivo.titulo}
              </h3>
              
              {/* Descripción */}
              <p className="text-text-light text-[0.95rem] leading-relaxed">
                {objetivo.descripcion}
              </p>
            </div>
          ))}
        </div>

        {/* Sección de logros */}
        <div className="mt-24 bg-dark-bg rounded-3xl p-12 md:p-16">
          <div className="text-center mb-12">
            <div className="text-accent-green font-semibold text-sm uppercase tracking-[2px] mb-2">
              RESULTADOS
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Nuestros Logros
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-[700px] mx-auto leading-relaxed">
              Comprometidos con la excelencia y la mejora continua en todas nuestras operaciones.
            </p>
          </div>

          {/* Grid de logros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-white/5 rounded-2xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-105">
              <div className="text-6xl font-extrabold bg-linear-to-r from-accent-green to-[#00f5a0] bg-clip-text text-transparent mb-4">
                95%
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Eficiencia Operacional
              </h3>
              <p className="text-sm text-gray-400">
                Optimización de procesos mediante implementación de sistemas tecnológicos avanzados.
              </p>
            </div>

            <div className="text-center p-8 bg-white/5 rounded-2xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-105">
              <div className="text-6xl font-extrabold bg-linear-to-r from-accent-green to-[#00f5a0] bg-clip-text text-transparent mb-4">
                100%
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Cobertura Nacional
              </h3>
              <p className="text-sm text-gray-400">
                Presencia y coordinación efectiva en todas las regiones del país.
              </p>
            </div>

            <div className="text-center p-8 bg-white/5 rounded-2xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-105">
              <div className="text-6xl font-extrabold bg-linear-to-r from-accent-green to-[#00f5a0] bg-clip-text text-transparent mb-4">
                24/7
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Disponibilidad
              </h3>
              <p className="text-sm text-gray-400">
                Servicio continuo e ininterrumpido para garantizar la seguridad ciudadana.
              </p>
            </div>
          </div>

          
        </div>
                {/* Sección: Organigrama */}
        <div className="mt-24">
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

          <div className="max-w-[1200px] mx-auto px-4 relative">
            <div className="relative flex flex-col items-center gap-8">
              {/* SVG de conexiones entre nodos (posicionado sobre el contenedor) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                <defs>
                  <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#cbd5e1" stopOpacity="1" />
                    <stop offset="100%" stopColor="#94a3b8" stopOpacity="1" />
                  </linearGradient>
                </defs>
                {/* Línea vertical desde director hacia nivel 2 */}
                <line x1="50" y1="22" x2="50" y2="34" stroke="url(#lineGrad)" strokeWidth="0.6" strokeLinecap="round" />
                {/* Conexiones a los tres nodos (usando coordenadas porcentuales) */}
                <line x1="50" y1="36" x2="16.66" y2="76" stroke="url(#lineGrad)" strokeWidth="0.6" strokeLinecap="round" />
                <line x1="50" y1="36" x2="50" y2="76" stroke="url(#lineGrad)" strokeWidth="0.6" strokeLinecap="round" />
                <line x1="50" y1="36" x2="83.33" y2="76" stroke="url(#lineGrad)" strokeWidth="0.6" strokeLinecap="round" />
                {/* Circulos en los puntos de unión */}
                <circle cx="50" cy="22" r="0.9" fill="#e2e8f0" />
                <circle cx="50" cy="36" r="0.7" fill="#e2e8f0" />
                <circle cx="16.66" cy="76" r="0.7" fill="#e2e8f0" />
                <circle cx="50" cy="76" r="0.7" fill="#e2e8f0" />
                <circle cx="83.33" cy="76" r="0.7" fill="#e2e8f0" />
              </svg>
              {/* Nivel 1 */}
              <div className="w-full flex justify-center">
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center max-w-[420px]">
                  <div className="text-sm text-secondary-green font-semibold">Dirección</div>
                  <div className="text-lg font-bold text-text-dark mt-2">Director Nacional</div>
                  <div className="text-sm text-gray-500 mt-1">General Inspector</div>
                </div>
              </div>

              {/* Conexión visual (línea) */}
              <div className="w-px h-6 bg-gray-200" />

              {/* Nivel 2 */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex justify-center">
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center max-w-[320px]">
                    <div className="text-sm text-secondary-green font-semibold">Subdirección</div>
                    <div className="text-md font-semibold text-text-dark mt-2">Operaciones</div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center max-w-[320px]">
                    <div className="text-sm text-secondary-green font-semibold">Subdirección</div>
                    <div className="text-md font-semibold text-text-dark mt-2">Logística y Soporte</div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center max-w-[320px]">
                    <div className="text-sm text-secondary-green font-semibold">Oficinas Técnicas</div>
                    <div className="text-md font-semibold text-text-dark mt-2">Tecnología y Compras</div>
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
