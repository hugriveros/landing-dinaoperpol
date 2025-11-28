import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function AnimeBasicTransforms() {
  const imageRef = useRef<HTMLImageElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Animación de entrada - hero_director.png con transform complejo
    if (imageRef.current) {
      anime({
        targets: imageRef.current,
        translateY: [-100, 0],
        opacity: [0, 1],
        scale: [0.8, 1],
        rotate: [-10, 0],
        duration: 1500,
        easing: 'easeOutElastic(1, .8)',
      });
    }

    // Logo con rotación continua y escala pulsante
    if (logoRef.current) {
      anime({
        targets: logoRef.current,
        scale: [1, 1.15, 1],
        rotate: '1turn',
        duration: 3000,
        easing: 'easeInOutQuad',
        loop: true,
      });
    }
  }, []);

  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Transformaciones Básicas</h3>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <h4 className="text-sm font-semibold mb-3 text-gray-600">Entrada Elástica</h4>
          <img
            ref={imageRef}
            src={`${import.meta.env.BASE_URL}hero_director.png`}
            alt="Director"
            className="w-40 h-40 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col items-center">
          <h4 className="text-sm font-semibold mb-3 text-gray-600">Rotación + Escala Loop</h4>
          <img
            ref={logoRef}
            src={`${import.meta.env.BASE_URL}logo_carabineros.svg`}
            alt="Logo"
            className="w-32 h-32"
          />
        </div>
      </div>
    </section>
  );
}
