export default function Noticias() {
  const noticias = [
    {
      id: 1,
      titulo: "Implementación de Nuevo Sistema SAP",
      fecha: "21 de Noviembre, 2025",
      descripcion: "La Dirección implementa sistema ERP SAP para optimizar la gestión operacional y mejorar la eficiencia en todos los procesos.",
      icon: "📰"
    },
    {
      id: 2,
      titulo: "Operativo Nacional Exitoso",
      fecha: "18 de Noviembre, 2025",
      descripcion: "Coordinación efectiva de operaciones policiales a nivel nacional resultando en mejoras significativas en seguridad ciudadana.",
      icon: "🎯"
    },
    {
      id: 3,
      titulo: "Reconocimiento Institucional",
      fecha: "15 de Noviembre, 2025",
      descripcion: "La Dirección recibe reconocimiento por innovación en gestión técnica y mejora continua de procesos operacionales.",
      icon: "🏆"
    }
  ];

  return (
    <section id="noticias" className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-secondary-green font-semibold text-sm uppercase tracking-[2px] mb-2">
            ACTUALIZACIONES
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark mb-4">
            Noticias Destacadas
          </h2>
          <p className="text-lg md:text-xl text-text-light max-w-[700px] mx-auto leading-relaxed">
            Mantente informado sobre nuestras últimas operaciones, logros y actualizaciones institucionales.
          </p>
        </div>

        {/* Grid de noticias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {noticias.map((noticia) => (
            <a 
              key={noticia.id}
              href="#noticias"
              className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer hover:-translate-y-2 group block"
            >
              {/* Imagen/Icon */}
              <div className="w-full h-[220px] bg-gradient-to-br from-primary-green to-secondary-green flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                {noticia.icon}
              </div>
              
              {/* Contenido */}
              <div className="p-6">
                <div className="text-text-light text-sm mb-2">
                  {noticia.fecha}
                </div>
                <h3 className="text-xl font-semibold text-text-dark mb-3 leading-snug group-hover:text-[#25a366] transition-colors">
                  {noticia.titulo}
                </h3>
                <p className="text-text-light text-[0.95rem] leading-relaxed mb-4">
                  {noticia.descripcion}
                </p>
                <div className="flex items-center gap-2 text-[#25a366] font-medium text-sm">
                  Leer más
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Botón Ver Más Noticias */}
        <div className="text-center mt-12">
          <a 
            href="#noticias" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1D7D4D] to-[#25a366] text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-[#25a366]/50 transition-all duration-300 hover:scale-105"
          >
            Ver Todas las Noticias
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
