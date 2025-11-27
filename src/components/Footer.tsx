export default function Footer() {
  return (
    <footer id="contacto" className="bg-dark-bg text-white py-16">
      <div className="max-w-[1400px] mx-auto px-8">
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
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary-green transition-all duration-300 hover:-translate-y-1"
              >
                📘
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary-green transition-all duration-300 hover:-translate-y-1"
              >
                🐦
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary-green transition-all duration-300 hover:-translate-y-1"
              >
                📷
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary-green transition-all duration-300 hover:-translate-y-1"
              >
                📺
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
                <a href="#contacto" className="text-gray-400 hover:text-white transition-colors text-sm">
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
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <span className="w-5 text-center">📍</span>
                <span>Av. Libertador Bernardo O'Higgins 1196, Santiago</span>
              </div>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <span className="w-5 text-center">📞</span>
                <span>+56 2 92xxxxxx</span>
              </div>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <span className="w-5 text-center">📧</span>
                <span>contacto@carabineros.cl</span>
              </div>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <span className="w-5 text-center">💬</span>
                <span>WhatsApp +56 9xxxxxxxx</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2025 DIRNAOPERPOL - Dirección Nacional de Apoyo a las Operaciones Policiales. 
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
