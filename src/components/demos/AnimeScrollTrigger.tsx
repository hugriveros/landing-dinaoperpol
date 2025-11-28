import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function AnimeScrollTrigger() {
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px',
    };

    const animateOnScroll = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          
          if (target === section1Ref.current) {
            anime({
              targets: section1Ref.current.querySelectorAll('.scroll-item'),
              translateX: [-100, 0],
              opacity: [0, 1],
              delay: anime.stagger(100),
              duration: 800,
              easing: 'easeOutQuad',
            });
          }
          
          if (target === section2Ref.current) {
            anime({
              targets: section2Ref.current.querySelectorAll('.scroll-item'),
              scale: [0, 1],
              rotate: [-180, 0],
              opacity: [0, 1],
              delay: anime.stagger(150),
              duration: 1000,
              easing: 'easeOutElastic(1, .5)',
            });
          }
          
          if (target === section3Ref.current) {
            anime({
              targets: section3Ref.current.querySelectorAll('.scroll-item'),
              translateY: [100, 0],
              opacity: [0, 1],
              scale: [0.5, 1],
              delay: anime.stagger(100, { from: 'center' }),
              duration: 900,
              easing: 'easeOutBack',
            });
          }
        }
      });
    };

    const observer = new IntersectionObserver(animateOnScroll, observerOptions);

    if (section1Ref.current) observer.observe(section1Ref.current);
    if (section2Ref.current) observer.observe(section2Ref.current);
    if (section3Ref.current) observer.observe(section3Ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Animaciones Activadas por Scroll</h3>
      <p className="text-sm text-gray-600 mb-6">Scroll dentro de este contenedor para ver las animaciones</p>
      
      <div className="h-96 overflow-y-auto space-y-8 bg-white rounded-lg p-4">
        <div ref={section1Ref} className="min-h-[200px] bg-blue-100 rounded-lg p-4">
          <h4 className="font-semibold mb-4">Slide desde la izquierda</h4>
          <div className="flex gap-4">
            <img src={`${import.meta.env.BASE_URL}logo_carabineros.svg`} className="scroll-item w-16 h-16 opacity-0" alt="Logo" />
            <img src={`${import.meta.env.BASE_URL}crayon.svg`} className="scroll-item w-16 h-16 opacity-0" alt="Crayon" />
            <img src={`${import.meta.env.BASE_URL}hero_director.png`} className="scroll-item w-16 h-16 object-cover rounded opacity-0" alt="Director" />
          </div>
        </div>

        <div ref={section2Ref} className="min-h-[200px] bg-purple-100 rounded-lg p-4">
          <h4 className="font-semibold mb-4">Scale + Rotación</h4>
          <div className="flex gap-4 justify-center">
            <img src={`${import.meta.env.BASE_URL}logo_carabineros.svg`} className="scroll-item w-20 h-20 opacity-0" alt="Logo" />
            <img src={`${import.meta.env.BASE_URL}crayon.svg`} className="scroll-item w-20 h-20 opacity-0" alt="Crayon" />
          </div>
        </div>

        <div ref={section3Ref} className="min-h-[200px] bg-green-100 rounded-lg p-4">
          <h4 className="font-semibold mb-4">Desde abajo con stagger central</h4>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="scroll-item opacity-0 bg-green-400 h-16 rounded-lg flex items-center justify-center text-white font-bold">
                {i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
