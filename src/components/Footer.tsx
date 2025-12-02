export default function Footer() {
  return (
    <footer id="footer" className="relative bg-dark-bg text-white py-24 min-h-[60vh]  scroll-mt-32 shadow-2xl overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 pt-34">
        {/* Grid principal del footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Sobre nosotros */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">DIRNAOPERPOL</h3>
            <p className="text-gray-400 leading-relaxed text-sm mb-6">
              Dirección Nacional de Apoyo a las Operaciones Policiales. Comprometidos con la seguridad, 
              el orden público y el bienestar de todos los ciudadanos a través de operaciones 
              coordinadas y eficientes.
            </p>
            
            {/* Redes sociales */}
            <div className="flex gap-4 mt-4">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary-green transition-all duration-300 hover:-translate-y-1"
              >
                <span aria-hidden="true">📘</span>
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary-green transition-all duration-300 hover:-translate-y-1"
              >
                <span aria-hidden="true">🐦</span>
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary-green transition-all duration-300 hover:-translate-y-1"
              >
                <span aria-hidden="true">📷</span>
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary-green transition-all duration-300 hover:-translate-y-1"
              >
                <span aria-hidden="true">📺</span>
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-base font-semibold text-white mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#inicio" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#noticias" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Noticias
                </a>
              </li>
              <li>
                <a href="#quienes-somos" className="text-gray-400 hover:text-white transition-colors text-sm">
                  ¿Quiénes Somos?
                </a>
              </li>
              <li>
                <a href="#footer" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Sitios de interés */}
          <div>
            <h4 className="text-base font-semibold text-white mb-6">Sitios de Interés</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Carabineros de Chile
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Dirección de Bienestar
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Dirección de Finanzas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Portal Normativo
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  CarApp
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-base font-semibold text-white mb-6">Contacto</h4>
            <div className="bg-white/5 p-4 rounded-lg shadow-lg border border-white/5">
              <address className="not-italic space-y-3">
                <div className="flex items-start gap-3 text-gray-300 text-sm">
                  <span className="w-5 text-center" aria-hidden="true">📍</span>
                  <span>Av. Libertador Bernardo O'Higgins 1196, Santiago, Chile</span>
                </div>
                <a href="tel:+56229270000" className="flex items-start gap-3 text-gray-300 text-sm hover:text-secondary-green transition-colors">
                  <span className="w-5 text-center" aria-hidden="true">📞</span>
                  <span>+56 2 2927 0000</span>
                </a>
                <a href="mailto:contacto@dinaoperpol.cl" className="flex items-start gap-3 text-gray-300 text-sm hover:text-secondary-green transition-colors">
                  <span className="w-5 text-center" aria-hidden="true">📧</span>
                  <span>contacto@dinaoperpol.cl</span>
                </a>
                <div className="flex items-start gap-3 text-gray-300 text-sm">
                  <span className="w-5 text-center" aria-hidden="true">🕐</span>
                  <span>Lunes a Viernes: 08:30 - 17:30 hrs</span>
                </div>
              </address>
            </div>
          </div>
        </div>

      </div>

      {/* Footer bottom */}
      <div className="border-t border-white/5 pt-32">
          <div className="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left py-2">
              &copy; 2025 DIRNAOPERPOL - Dirección Nacional de Apoyo a las Operaciones Policiales.
              Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm py-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidad</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Términos de Uso</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Transparencia</a>
            </div>
          </div>
        </div>
    </footer>
  );
}
