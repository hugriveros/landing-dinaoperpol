import { useEffect, useRef, useState } from 'react';
import CrayonContent from './CrayonContent';
import { EyeIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

export default function Director() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Cuando la sección entra en viewport, empezar a animar
        // scrollProgress va de 0 (arriba del viewport) a 1 (completamente visible)
        if (rect.top < windowHeight && rect.bottom > 0) {
          const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
          const progress = Math.min(1, visibleHeight / windowHeight);
          setScrollProgress(progress);
          console.log('Scroll Progress:', progress); // Debug
        } else if (rect.top >= windowHeight) {
          setScrollProgress(0);
        } else if (rect.bottom <= 0) {
          setScrollProgress(1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Inicial
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="quienes-somos" ref={sectionRef} className="py-24 bg-white relative overflow-hidden scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          
          {/* Columna izquierda: Foto del Director (2/5) */}
          <div 
            className="lg:col-span-2 flex justify-center opacity-0 relative min-h-[600px]"
            style={{ animation: 'fadeInUp 1s ease forwards' }}
          >
            <CrayonContent />
          </div>

          {/* Columna derecha: Información (3/5) */}
          <div className="lg:col-span-3 space-y-10">
            
            {/* Nombre y cargo */}
            <div 
              className="opacity-0"
              style={{ animation: 'fadeInUp 1s ease 0.2s forwards' }}
            >
             
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 leading-tight">
                General Inspector<br />
                María Teresa Araya Jiménez
              </h2>
               <div className="inline-block px-4 py-1.5 bg-[#1D7D4D]/10 rounded-full mb-4">
                <p className="text-sm font-semibold text-[#1D7D4D] uppercase tracking-wide">
                  Director Nacional de Apoyo a las Operaciones Policiales
                </p>
              </div>
             
            </div>

            {/* Misión y Visión en cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Misión */}
              <div
                className="group p-6 rounded-xl bg-white/60 border border-[#1D7D4D]/10 hover:border-[#1D7D4D]/30 transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl opacity-0"
                style={{ animation: 'fadeInUp 1s ease 0.4s forwards' }}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl bg-gradient-to-br from-[#1D7D4D] to-[#25a366] shadow-md">
                      <ShieldCheckIcon className="w-6 h-6" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Misión</h3>
                    <p className="text-slate-600 leading-relaxed text-sm mt-2 max-w-prose">
                      "Dirigir, administrar, evaluar y coordinar los procesos de las áreas financieras, logísticas, tecnológicas y de compras públicas, con el propósito de proveer los bienes y servicios para el desempeño de la función policial de Carabineros de Chile a lo largo del territorio nacional."
                    </p>
                  </div>
                </div>
              </div>

              {/* Visión */}
              <div
                className="group p-6 rounded-xl bg-white/60 border border-[#25a366]/10 hover:border-[#25a366]/30 transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl opacity-0"
                style={{ animation: 'fadeInUp 1s ease 0.5s forwards' }}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl bg-gradient-to-br from-[#25a366] to-[#1D7D4D] shadow-md">
                      <EyeIcon className="w-6 h-6" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Visión</h3>
                    <p className="text-slate-600 leading-relaxed text-sm mt-2 max-w-prose">
                      "Ser líderes en la gestión estratégica de recursos institucionales, mediante la innovación y excelencia operacional, garantizando un apoyo de calidad a las operaciones policiales y contribuyendo a la seguridad de la comunidad nacional."
                    </p>
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
