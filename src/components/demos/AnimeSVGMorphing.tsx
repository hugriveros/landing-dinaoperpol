import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function AnimeSVGMorphing() {
  const logoRef = useRef<HTMLDivElement>(null);
  const crayonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animación de stroke drawing para logo_carabineros.svg
    if (logoRef.current) {
      fetch(`${import.meta.env.BASE_URL}logo_carabineros.svg`)
        .then(res => res.text())
        .then(svgText => {
          if (logoRef.current) {
            logoRef.current.innerHTML = svgText;
            const paths = logoRef.current.querySelectorAll('path, circle, line, polyline, polygon');
            
            paths.forEach((path) => {
              const el = path as SVGGeometryElement;
              const length = el.getTotalLength?.() || 0;
              if (length > 0) {
                el.style.strokeDasharray = `${length}`;
                el.style.strokeDashoffset = `${length}`;
              }
            });

            anime({
              targets: logoRef.current.querySelectorAll('path, circle, line, polyline, polygon'),
              strokeDashoffset: [anime.setDashoffset, 0],
              easing: 'easeInOutSine',
              duration: 2500,
              delay: anime.stagger(150),
              loop: true,
              direction: 'alternate',
            });
          }
        });
    }

    // Animación de stroke + fill para crayon.svg
    if (crayonRef.current) {
      fetch(`${import.meta.env.BASE_URL}crayon.svg`)
        .then(res => res.text())
        .then(svgText => {
          if (crayonRef.current) {
            crayonRef.current.innerHTML = svgText;
            const paths = crayonRef.current.querySelectorAll('path, circle, line');
            
            paths.forEach((path) => {
              const el = path as SVGGeometryElement;
              const length = el.getTotalLength?.() || 0;
              if (length > 0) {
                el.style.strokeDasharray = `${length}`;
                el.style.strokeDashoffset = `${length}`;
              }
            });

            const timeline = anime.timeline({
              loop: true,
            });

            timeline
              .add({
                targets: crayonRef.current.querySelectorAll('path, circle, line'),
                strokeDashoffset: [anime.setDashoffset, 0],
                duration: 2000,
                delay: anime.stagger(100),
                easing: 'easeInOutQuad',
              })
              .add({
                targets: crayonRef.current.querySelectorAll('path, circle, line'),
                fill: ['transparent', '#FF6B6B'],
                duration: 1000,
                easing: 'easeInOutQuad',
              }, '-=500');
          }
        });
    }
  }, []);

  return (
    <section className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Animaciones SVG Avanzadas</h3>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <h4 className="text-sm font-semibold mb-3 text-gray-600">Stroke Drawing - Logo</h4>
          <div ref={logoRef} className="w-48 h-48 flex items-center justify-center" />
        </div>
        <div className="flex flex-col items-center">
          <h4 className="text-sm font-semibold mb-3 text-gray-600">Stroke + Fill - Crayon</h4>
          <div ref={crayonRef} className="w-48 h-48 flex items-center justify-center" />
        </div>
      </div>
    </section>
  );
}
