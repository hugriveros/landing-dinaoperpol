import AnimeOrganigrama from './demos/AnimeOrganigrama';

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
              <div className="text-6xl font-extrabold bg-linear-to-r from-accent-green to-secondary-green bg-clip-text text-transparent mb-4">
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
              <div className="text-6xl font-extrabold bg-linear-to-r from-accent-green to-secondary-green bg-clip-text text-transparent mb-4">
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
              <div className="text-6xl font-extrabold bg-linear-to-r from-accent-green to-secondary-green bg-clip-text text-transparent mb-4">
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

        {/* Sección de Servicios */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <div className="text-secondary-green font-semibold text-sm uppercase tracking-[2px] mb-2">
              NUESTROS SERVICIOS
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark mb-4">
              Áreas de Gestión
            </h2>
            <p className="text-lg md:text-xl text-text-light max-w-[700px] mx-auto leading-relaxed">
              Coordinamos y optimizamos recursos estratégicos para el desempeño operacional policial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-secondary-green/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-linear-to-br from-primary-green to-secondary-green rounded-xl flex items-center justify-center text-2xl mb-4">
                📦
              </div>
              <h3 className="text-lg font-bold text-text-dark mb-2">Logística</h3>
              <p className="text-sm text-text-light leading-relaxed">
                Gestión integral de recursos y cadena de suministro institucional a nivel nacional.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-secondary-green/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-linear-to-br from-primary-green to-secondary-green rounded-xl flex items-center justify-center text-2xl mb-4">
                🛒
              </div>
              <h3 className="text-lg font-bold text-text-dark mb-2">Compras Públicas</h3>
              <p className="text-sm text-text-light leading-relaxed">
                Administración eficiente y transparente de procesos de adquisiciones institucionales.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-secondary-green/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-linear-to-br from-primary-green to-secondary-green rounded-xl flex items-center justify-center text-2xl mb-4">
                💰
              </div>
              <h3 className="text-lg font-bold text-text-dark mb-2">Finanzas</h3>
              <p className="text-sm text-text-light leading-relaxed">
                Planificación y control presupuestario para optimizar recursos financieros.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-secondary-green/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-linear-to-br from-primary-green to-secondary-green rounded-xl flex items-center justify-center text-2xl mb-4">
                💻
              </div>
              <h3 className="text-lg font-bold text-text-dark mb-2">Tecnología</h3>
              <p className="text-sm text-text-light leading-relaxed">
                Infraestructura tecnológica y sistemas de información de vanguardia.
              </p>
            </div>
          </div>
        </div>

        {/* Organigrama Animado */}
        <div className="mt-24">
          <AnimeOrganigrama />
        </div>
      </div>
    </section>
  );
}
