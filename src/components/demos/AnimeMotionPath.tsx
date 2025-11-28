import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function AnimeMotionPath() {
  const logoRef = useRef<HTMLDivElement>(null);
  const directorRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Motion path con logo siguiendo un path SVG
    if (logoRef.current && svgRef.current) {
      const path = svgRef.current.querySelector('#motion-path-1') as SVGPathElement;
      if (path) {
        anime({
          targets: logoRef.current,
          translateX: anime.path(path).x,
          translateY: anime.path(path).y,
          rotate: anime.path(path).angle,
          easing: 'linear',
          duration: 5000,
          loop: true,
        });
      }
    }

    // Motion path más complejo con director
    if (directorRef.current && svgRef.current) {
      const path = svgRef.current.querySelector('#motion-path-2') as SVGPathElement;
      if (path) {
        anime({
          targets: directorRef.current,
          translateX: anime.path(path).x,
          translateY: anime.path(path).y,
          rotate: anime.path(path).angle,
          scale: [
            { value: 1, duration: 0 },
            { value: 1.2, duration: 2500 },
            { value: 1, duration: 2500 },
          ],
          easing: 'easeInOutQuad',
          duration: 6000,
          loop: true,
        });
      }
    }
  }, []);

  return (
    <section className="p-6 bg-linear-to-br from-emerald-50 to-teal-50 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Motion Path Animations</h3>
      
      <div className="relative w-full h-96 bg-white rounded-lg overflow-hidden">
        <svg ref={svgRef} className="absolute inset-0 w-full h-full" viewBox="0 0 600 400">
          {/* Path 1 - Circular */}
          <path
            id="motion-path-1"
            d="M 150 200 Q 200 100, 300 150 T 450 200 Q 400 300, 300 250 T 150 200"
            fill="none"
            stroke="#E0E0E0"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          
          {/* Path 2 - Wave */}
          <path
            id="motion-path-2"
            d="M 50 350 Q 150 280, 200 350 T 350 350 Q 450 280, 550 350"
            fill="none"
            stroke="#E0E0E0"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>

        {/* Logo siguiendo path 1 */}
        <div
          ref={logoRef}
          className="absolute top-0 left-0 w-12 h-12 flex items-center justify-center"
          style={{ transform: 'translate(150px, 200px)' }}
        >
          <img
            src={`${import.meta.env.BASE_URL}logo_carabineros.svg`}
            alt="Logo"
            className="w-full h-full"
          />
        </div>

        {/* Director siguiendo path 2 */}
        <div
          ref={directorRef}
          className="absolute top-0 left-0 w-16 h-16"
          style={{ transform: 'translate(50px, 350px)' }}
        >
          <img
            src={`${import.meta.env.BASE_URL}hero_director.png`}
            alt="Director"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-3">
        Los elementos siguen paths SVG personalizados con rotación automática según el ángulo del path.
      </p>
    </section>
  );
}
