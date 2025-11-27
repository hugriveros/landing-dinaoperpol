import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detectar si pasamos la sección de inicio
      const heroSection = document.getElementById('inicio');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight - 100;
        setShowLogo(window.scrollY > heroBottom);
      }

      // Detectar sección activa
      const sections = ['inicio', 'quienes-somos', 'noticias', 'contacto'];
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    handleScroll(); // Ejecutar al montar
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
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
              DIRNAOPERPOL
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
              onClick={() => scrollToSection('contacto')}
              className={`font-medium text-[0.95rem] transition-all duration-300 relative group ${
                activeSection === 'contacto' ? 'text-primary-green' : 'text-text-dark hover:text-primary-green'
              }`}
            >
              Contacto
              <span className={`absolute bottom-[-5px] left-0 h-0.5 bg-secondary-green transition-all duration-300 ${
                activeSection === 'contacto' ? 'w-full' : 'w-0 group-hover:w-full'
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
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => scrollToSection('quienes-somos')}
              className="block w-full text-left px-3 py-2 text-text-dark hover:bg-gray-50 hover:text-primary-green rounded-md font-medium transition-all"
            >
              ¿Quiénes somos?
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="block w-full text-left px-3 py-2 text-text-dark hover:bg-gray-50 hover:text-primary-green rounded-md font-medium transition-all"
            >
              Contacto
            </button>
            <button
              onClick={() => scrollToSection('inicio')}
              className="block w-full text-left px-3 py-2 text-text-dark hover:bg-gray-50 hover:text-primary-green rounded-md font-medium transition-all"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('noticias')}
              className="block w-full text-left px-3 py-2 text-text-dark hover:bg-gray-50 hover:text-primary-green rounded-md font-medium transition-all"
            >
              Noticias
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
