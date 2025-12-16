import { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function DirectorParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 100; // Más partículas para cubrir el área

    // Limpiar partículas existentes
    container.querySelectorAll('.particle').forEach(p => p.remove());

    // SVG personalizado
    const customSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="68" fill="none" viewBox="0 0 568 628">
      <mask id="a" width="568" height="629" x="0" y="-1" maskUnits="userSpaceOnUse" style="mask-type:luminance">
        <path fill="#fff" d="M0 627.444h567.477V0H0v627.444Z"/>
      </mask>
      <g mask="url(#a)">
        <path fill="#24A165" d="M226.86 568.281c-20.297-10.535-73.069-14.096-96.46-17.471-39.341-5.454-81.795-42.612-102.904-74.821C5.89 442.76 2.656 399.413 4.956 365.224c4.203-63.383 50.604-105.995 44.62-158.152-3.364-28.715-45.28-79.235-20.76-107.034 1.584-1.772 2.753-2.373 2.753-2.373 23.764-18.33 43.358-33.916 60.572-59.316 4.543-6.823 11.883-11.833 20.308-11.687l1.878.044c18.092-.19 30.154 16.085 59.817 13.466 43.537-3.697 55.419-35.767 109.541-35.691 0 0 6.888 0 16.054 1.13 56.508 6.926 71.882 57.154 139.848 23.989 4.113-2.02 8.906-2.938 13.474-2.894l1.816-.044c8.418-.146 15.771 4.864 20.448 11.687 17.776 26.436 36.166 40.647 60.956 59.554 14.302 10.422 10.011 36.994 4.062 51.025-21.062 49.954-36.582 64.597-8.427 121.86 13.291 27.17 28.167 59.438 30.504 94.436 2.247 34.189-.989 77.536-22.587 110.765-20.91 32.209-63.488 69.367-102.474 74.821-23.78 3.375-76.628 6.936-96.894 17.471-22.206 11.685-41.914 31.652-56.78 51.671-14.872-20.019-34.602-39.986-56.825-51.671Z"/>
      </g>
    </svg>`;

    // Crear partículas dinámicamente (alternando círculos y SVG)
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle absolute';
      particle.style.left = '50%';
      particle.style.top = '50%';
      // Alternar entre círculo y SVG personalizado
      if (i % 2 === 0) {
        // Círculo
        particle.className += ' w-3 h-3 rounded-full';
        particle.style.backgroundColor = '#24A165';
      } else {
        // SVG personalizado (más pequeño)
        particle.className += ' w-5 h-5';
        particle.innerHTML = customSVG;
      }
      container.appendChild(particle);
    }

    const particles = container.querySelectorAll('.particle');

    // Animación de explosión de partículas
    anime({
      targets: particles,
      translateX: () => anime.random(-300, 300),
      translateY: () => anime.random(-350, 70),
      scale: [
        { value: [0, anime.random(2.8, 3.2)], duration: 1200 },
        { value: 0, duration: 600 },
      ],
      opacity: [
        { value: [0, 1], duration: 800 },
        { value: 0, duration: 1200 },
      ],
      rotate: () => anime.random(0, 0),
      duration: 3500,
      easing: 'easeOutCubic',
      delay: anime.stagger(250),
      loop: true,
    });

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="relative w-[700px] h-[600px] flex items-center justify-center">
        {/* Imagen hero_director */}
        <img
          src={`${import.meta.env.BASE_URL}hero_director.png`}
          alt="General Inspector María Teresa Araya Jiménez - Director Nacional DINAOPERPOL"
          loading="lazy"
          className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-104 h-auto z-10"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 97%, rgba(0,0,0,0.8) 99%, rgba(0,0,0,0) 100%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 95%, rgba(0,0,0,0.3) 98%, rgba(0,0,0,0) 100%)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%'
          }}
        />
        {/* Sistema de partículas detrás de la imagen */}
        <div ref={containerRef} className="absolute inset-0 flex items-center justify-center" />
      </div>
    </div>
  );
}
