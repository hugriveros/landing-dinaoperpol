import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function AnimeStaggerEffects() {
  const gridRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Grid stagger con efecto de onda
    if (gridRef.current) {
      const boxes = gridRef.current.querySelectorAll('.stagger-box');
      anime({
        targets: boxes,
        scale: [0, 1],
        opacity: [0, 1],
        translateY: [-50, 0],
        delay: anime.stagger(100, { grid: [4, 4], from: 'center' }),
        duration: 800,
        easing: 'easeOutExpo',
        loop: true,
        direction: 'alternate',
      });
    }

    // Stagger de imágenes con dirección from: 'first'
    if (imagesRef.current) {
      const imgs = imagesRef.current.querySelectorAll('img');
      anime({
        targets: imgs,
        translateX: [-100, 0],
        opacity: [0, 1],
        rotate: [-45, 0],
        delay: anime.stagger(200),
        duration: 1000,
        easing: 'easeOutCubic',
        loop: true,
        direction: 'alternate',
      });
    }
  }, []);

  return (
    <section className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Efectos Stagger (Escalonados)</h3>
      
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3 text-gray-600">Grid Stagger desde el centro</h4>
        <div ref={gridRef} className="grid grid-cols-4 gap-2">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="stagger-box w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-md shadow"
            />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3 text-gray-600">Imágenes con Stagger Secuencial</h4>
        <div ref={imagesRef} className="flex gap-4 justify-center">
          <img src={`${import.meta.env.BASE_URL}logo_carabineros.svg`} alt="Logo 1" className="w-16 h-16" />
          <img src={`${import.meta.env.BASE_URL}crayon.svg`} alt="Crayon" className="w-16 h-16" />
          <img src={`${import.meta.env.BASE_URL}logo_carabineros.svg`} alt="Logo 2" className="w-16 h-16" />
          <img src={`${import.meta.env.BASE_URL}hero_director.png`} alt="Director" className="w-16 h-16 object-cover rounded" />
        </div>
      </div>
    </section>
  );
}
