export default function Footer() {
  return (
    <footer id="footer" className="relative bg-slate-900 text-white scroll-mt-32 shadow-2xl overflow-hidden">
      {/* Gradiente superior para transición suave */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" />

      {/* Contenedor principal con flexbox para empujar el footer bottom hacia abajo */}
      <div className="min-h-[85vh] flex flex-col">
        {/* Contenido principal del footer - crece para ocupar espacio disponible */}
        <div className="flex-1 py-20">
          <div className="max-w-[1400px] mx-auto px-8 relative z-10">
            {/* Grid principal del footer */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-16">
              {/* Sobre nosotros - 4 columnas */}
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-green to-secondary-green rounded-lg flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">DINAOPERPOL</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm mb-6">
                  Dirección Nacional de Apoyo a las Operaciones Policiales. Comprometidos con la seguridad, 
                  el orden público y el bienestar de todos los ciudadanos a través de operaciones 
                  coordinadas y eficientes.
                </p>
                
                {/* Redes sociales con heroicons */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Síguenos</h4>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="#"
                      aria-label="Instagram"
                      className="group w-11 h-11 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-primary-green hover:to-secondary-green transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-white/10"
                    >
                      <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5c2.07 0 2.32.01 3.14.05.78.04 1.31.17 1.62.28.41.16.7.35 1.01.66.31.31.5.6.66 1.01.11.31.24.84.28 1.62.04.82.05 1.07.05 3.14s-.01 2.32-.05 3.14c-.04.78-.17 1.31-.28 1.62-.16.41-.35.7-.66 1.01-.31.31-.6.5-1.01.66-.31.11-.84.24-1.62.28-.82.04-1.07.05-3.14.05s-2.32-.01-3.14-.05c-.78-.04-1.31-.17-1.62-.28-.41-.16-.7-.35-1.01-.66-.31-.31-.5-.6-.66-1.01-.11-.31-.24-.84-.28-1.62-.04-.82-.05-1.07-.05-3.14s.01-2.32.05-3.14c.04-.78.17-1.31.28-1.62.16-.41.35-.7.66-1.01.31-.31.6-.5 1.01-.66.31-.11.84-.24 1.62-.28.82-.04 1.07-.05 3.14-.05M12 3c-2.11 0-2.37.01-3.2.05-.82.04-1.38.18-1.87.38-.51.2-.94.47-1.37.9-.43.43-.7.86-.9 1.37-.2.49-.34 1.05-.38 1.87C3.01 9.63 3 9.89 3 12s.01 2.37.05 3.2c.04.82.18 1.38.38 1.87.2.51.47.94.9 1.37.43.43.86.7 1.37.9.49.2 1.05.34 1.87.38.83.04 1.09.05 3.2.05s2.37-.01 3.2-.05c.82-.04 1.38-.18 1.87-.38.51-.2.94-.47 1.37-.9.43-.43.7-.86.9-1.37.2-.49.34-1.05.38-1.87.04-.83.05-1.09.05-3.2s-.01-2.37-.05-3.2c-.04-.82-.18-1.38-.38-1.87-.2-.51-.47-.94-.9-1.37-.43-.43-.86-.7-1.37-.9-.49-.2-1.05-.34-1.87-.38C14.37 3.01 14.11 3 12 3z" />
                      
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-label="YouTube"
                      className="group w-11 h-11 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-primary-green hover:to-secondary-green transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-white/10"
                    >
                      <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-label="CarApp"
                      className="group w-11 h-11 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-primary-green hover:to-secondary-green transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-white/10"
                    >
                      <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-label="X (Twitter)"
                      className="group w-11 h-11 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-primary-green hover:to-secondary-green transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-white/10"
                    >
                      <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Enlaces rápidos - 2 columnas */}
              <div className="lg:col-span-2">
                <h4 className="text-base font-semibold text-white mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Enlaces Rápidos
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#inicio" className="text-gray-300 hover:text-secondary-green transition-colors text-sm flex items-center gap-2 group">
                      <svg className="w-4 h-4 text-gray-500 group-hover:text-secondary-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Inicio
                    </a>
                  </li>
                  <li>
                    <a href="#noticias" className="text-gray-300 hover:text-secondary-green transition-colors text-sm flex items-center gap-2 group">
                      <svg className="w-4 h-4 text-gray-500 group-hover:text-secondary-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Noticias
                    </a>
                  </li>
                  <li>
                    <a href="#quienes-somos" className="text-gray-300 hover:text-secondary-green transition-colors text-sm flex items-center gap-2 group">
                      <svg className="w-4 h-4 text-gray-500 group-hover:text-secondary-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      ¿Quiénes Somos?
                    </a>
                  </li>
                  <li>
                    <a href="#footer" className="text-gray-300 hover:text-secondary-green transition-colors text-sm flex items-center gap-2 group">
                      <svg className="w-4 h-4 text-gray-500 group-hover:text-secondary-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Contacto
                    </a>
                  </li>
                </ul>
              </div>

              {/* Sitios de interés - 3 columnas */}
              <div className="lg:col-span-3">
                <h4 className="text-base font-semibold text-white mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  Sitios de Interés
                </h4>
                <ul className="space-y-2.5">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-secondary-green transition-colors text-sm flex items-center gap-2 group">
                      <svg className="w-3.5 h-3.5 text-gray-500 group-hover:text-secondary-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Ministerio de Seguridad Pública
                    </a>
                  </li>
                  <li>
                    <a href="https://www.carabineros.cl" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-secondary-green transition-colors text-sm flex items-center gap-2 group">
                      <svg className="w-3.5 h-3.5 text-gray-500 group-hover:text-secondary-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Carabineros de Chile
                    </a>
                  </li>
                  <li>
                    <a href="https://anci.gob.cl" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-secondary-green transition-colors text-sm flex items-center gap-2 group">
                      <svg className="w-3.5 h-3.5 text-gray-500 group-hover:text-secondary-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      ANCI (Agencia Nacional de Ciberseguridad)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.mercadopublico.cl" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-secondary-green transition-colors text-sm flex items-center gap-2 group">
                      <svg className="w-3.5 h-3.5 text-gray-500 group-hover:text-secondary-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Mercado Público
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-secondary-green transition-colors text-sm flex items-center gap-2 group">
                      <svg className="w-3.5 h-3.5 text-gray-500 group-hover:text-secondary-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      DILOCAR
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-secondary-green transition-colors text-sm flex items-center gap-2 group">
                      <svg className="w-3.5 h-3.5 text-gray-500 group-hover:text-secondary-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      DIFINCAR
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-secondary-green transition-colors text-sm flex items-center gap-2 group">
                      <svg className="w-3.5 h-3.5 text-gray-500 group-hover:text-secondary-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      DIRTIC
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-secondary-green transition-colors text-sm flex items-center gap-2 group">
                      <svg className="w-3.5 h-3.5 text-gray-500 group-hover:text-secondary-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      DICOPUC
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-secondary-green transition-colors text-sm flex items-center gap-2 group">
                      <svg className="w-3.5 h-3.5 text-gray-500 group-hover:text-secondary-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Depto. Gestión Técnica y Mejora Continua
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contacto - 3 columnas */}
              <div className="lg:col-span-3">
                <h4 className="text-base font-semibold text-white mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contacto
                </h4>
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-white/10">
                  <address className="not-italic space-y-3.5">
                    <div className="flex items-start gap-3 text-gray-300 text-sm group">
                      <svg className="w-5 h-5 text-secondary-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="leading-relaxed">Av. Libertador Bernardo O'Higgins 1196, Santiago, Chile</span>
                    </div>
                    <a href="tel:+56229270000" className="flex items-center gap-3 text-gray-300 text-sm hover:text-secondary-green transition-colors group">
                      <svg className="w-5 h-5 text-secondary-green flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>+56 2 2927 0000</span>
                    </a>
                    <a href="mailto:contacto@dinaoperpol.cl" className="flex items-center gap-3 text-gray-300 text-sm hover:text-secondary-green transition-colors group">
                      <svg className="w-5 h-5 text-secondary-green flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>contacto@dinaoperpol.cl</span>
                    </a>
                    <div className="flex items-center gap-3 text-gray-300 text-sm">
                      <svg className="w-5 h-5 text-secondary-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Lunes a Viernes: 08:30 - 17:30 hrs</span>
                    </div>
                  </address>
                </div>
              </div>
            </div>

            {/* Minimapa de ubicación */}
            <div className="mb-0">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <div className="w-full h-64 md:h-72 lg:h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.4486697849445!2d-70.66885492347195!3d-33.44246817339698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5a0f0c0f0f1%3A0x1234567890abcdef!2sAv.%20Libertador%20Bernardo%20O&#39;Higgins%201196%2C%20Santiago!5e0!3m2!1ses!2scl!4v1234567890123!5m2!1ses!2scl"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación DINAOPERPOL"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom - ahora está dentro del contenedor flex y se empuja hacia abajo */}
        <div className="border-t border-white/10 mt-auto">
          <div className="max-w-[1400px] mx-auto px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-gray-400 text-sm text-center md:text-left">
                &copy; 2025 DINAOPERPOL - Dirección Nacional de Apoyo a las Operaciones Policiales.
                Todos los derechos reservados.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-secondary-green transition-colors flex items-center gap-1.5 group">
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Política de Privacidad
                </a>
                <a href="#" className="text-gray-400 hover:text-secondary-green transition-colors flex items-center gap-1.5 group">
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Términos de Uso
                </a>
                <a href="#" className="text-gray-400 hover:text-secondary-green transition-colors flex items-center gap-1.5 group">
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Transparencia
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
