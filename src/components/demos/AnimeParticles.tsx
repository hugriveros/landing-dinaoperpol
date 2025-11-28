import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function AnimeParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 80;

    // Crear partículas dinámicamente
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle absolute w-5 h-5 rounded-full';
      particle.style.left = '50%';
      particle.style.top = '50%';
      
      // Color único: #088152
      particle.style.backgroundColor = '#088152';
      
      container.appendChild(particle);
    }

    const particles = container.querySelectorAll('.particle');

    // Animación de explosión de partículas
    anime({
      targets: particles,
      translateX: () => anime.random(-200, 200),
      translateY: () => anime.random(-200, 200),
      scale: [
        { value: [0, anime.random(0.5, 2)], duration: 1000 },
        { value: 0, duration: 1000 },
      ],
      opacity: [
        { value: 1, duration: 800 },
        { value: 0, duration: 1200 },
      ],
      rotate: () => anime.random(0, 360),
      duration: 3000,
      easing: 'easeOutCubic',
      delay: anime.stagger(50),
      loop: true,
    });

    return () => {
      // Limpiar partículas al desmontar
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <section className="p-6 bg-linear-to-br from-slate-900 to-slate-700 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-white">Sistema de Partículas</h3>
      
      <div className="relative w-full h-96 bg-black/30 rounded-lg overflow-hidden flex items-center justify-center">
        <div ref={containerRef} className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={`${import.meta.env.BASE_URL}logo_carabineros.svg`}
              alt="Logo"
              className="w-24 h-24 opacity-30"
            />
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-300 mt-3">
        Sistema de partículas con explosión radial y colores aleatorios.
      </p>
    </section>
  );
}
