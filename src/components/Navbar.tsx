import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detectar si pasamos la sección de inicio (para mostrar logo)
      const heroSection = document.getElementById('inicio');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight - 100;
        setShowLogo(window.scrollY > heroBottom);
      }
      // Detectar sección activa usando offsets y altura del nav (más determinista)
      const navEl = document.querySelector('nav');
      const navHeight = navEl ? Math.round(navEl.getBoundingClientRect().height) : 80;
      const sectionIds = ['inicio', 'quienes-somos', 'noticias', 'footer'];
      let currentActive = 'inicio';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop - navHeight - 16; // pequeño margen
        if (window.scrollY >= top) {
          currentActive = id;
        }
      }
      setActiveSection(currentActive);
    };

    handleScroll(); // Ejecutar al montar
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Nota: la detección de sección activa se realiza en el listener de scroll

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calcular offset por el nav fijo para que la sección no quede oculta debajo del navbar
      const navEl = document.querySelector('nav');
      const navHeight = navEl ? navEl.getBoundingClientRect().height : 80;
      const targetY = element.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      scrolled ? 'py-2 shadow-lg' : 'py-4 shadow-md'
    }`} style={{
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(10px)'
    }}>
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex justify-center items-center gap-10">
          {/* Menu izquierdo */}
          <div className="hidden md:flex items-center gap-10">
            <button
              onClick={() => scrollToSection('inicio')}
              className={`font-medium text-[0.95rem] transition-all duration-300 relative group ${
                activeSection === 'inicio' ? 'text-primary-green' : 'text-text-dark hover:text-primary-green'
              }`}
            >
              Inicio
              <span className={`absolute bottom-[-5px] left-0 h-0.5 bg-secondary-green transition-all duration-300 ${
                activeSection === 'inicio' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
            <button
              onClick={() => scrollToSection('quienes-somos')}
              className={`font-medium text-[0.95rem] transition-all duration-300 relative group ${
                activeSection === 'quienes-somos' ? 'text-primary-green' : 'text-text-dark hover:text-primary-green'
              }`}
            >
              ¿Quiénes somos?
              <span className={`absolute bottom-[-5px] left-0 h-0.5 bg-secondary-green transition-all duration-300 ${
                activeSection === 'quienes-somos' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
          </div>

          {/* Logo centrado */}
          <div className="flex items-center gap-4">
            {/* Logo animado que aparece al hacer scroll */}
            <div className={`transition-all duration-500 overflow-hidden ${
              showLogo ? 'w-12 opacity-100' : 'w-0 opacity-0'
            }`}>
              <img
                src={`${import.meta.env.BASE_URL}logo_carabineros.svg`} 
                alt="DIRNAOPERPOL"
                className="w-12 h-12 object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-primary-green to-secondary-green bg-clip-text text-transparent">
              DGEA
            </h1>
          </div>

          {/* Menu derecho */}
          <div className="hidden md:flex items-center gap-10">
            <button
              onClick={() => scrollToSection('noticias')}
              className={`font-medium text-[0.95rem] transition-all duration-300 relative group ${
                activeSection === 'noticias' ? 'text-primary-green' : 'text-text-dark hover:text-primary-green'
              }`}
            >
              Noticias
              <span className={`absolute bottom-[-5px] left-0 h-0.5 bg-secondary-green transition-all duration-300 ${
                activeSection === 'noticias' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
            <button
                onClick={() => scrollToSection('footer')}
              className={`font-medium text-[0.95rem] transition-all duration-300 relative group ${
                activeSection === 'footer' ? 'text-primary-green' : 'text-text-dark hover:text-primary-green'
              }`}
            >
              Contacto
              <span className={`absolute bottom-[-5px] left-0 h-0.5 bg-secondary-green transition-all duration-300 ${
                activeSection === 'footer' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-dark hover:text-primary-green"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden ">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => scrollToSection('inicio')}
              className="block w-full text-left px-3 py-2 text-text-dark hover:bg-gray-50 hover:text-primary-green rounded-md font-medium transition-all"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('quienes-somos')}
              className="block w-full text-left px-3 py-2 text-text-dark hover:bg-gray-50 hover:text-primary-green rounded-md font-medium transition-all"
            >
              ¿Quiénes somos?
            </button>
            
            <button
              onClick={() => scrollToSection('noticias')}
              className="block w-full text-left px-3 py-2 text-text-dark hover:bg-gray-50 hover:text-primary-green rounded-md font-medium transition-all"
            >
              Noticias
            </button>
            <button
                onClick={() => scrollToSection('footer')}
              className="block w-full text-left px-3 py-2 text-text-dark hover:bg-gray-50 hover:text-primary-green rounded-md font-medium transition-all"
            >
              Contacto
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
