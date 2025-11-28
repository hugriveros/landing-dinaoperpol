import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

export default function AnimeMorphing() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [morphState, setMorphState] = useState(0);

  useEffect(() => {
    if (!svgRef.current) return;

    const paths = [
      // Círculo
      'M 200,200 m -100,0 a 100,100 0 1,0 200,0 a 100,100 0 1,0 -200,0',
      // Cuadrado
      'M 100,100 L 300,100 L 300,300 L 100,300 Z',
      // Estrella
      'M 200,100 L 220,170 L 290,170 L 230,210 L 250,280 L 200,240 L 150,280 L 170,210 L 110,170 L 180,170 Z',
      // Triángulo
      'M 200,100 L 300,280 L 100,280 Z',
    ];

    const morphPath = svgRef.current.querySelector('#morph-path') as SVGPathElement;
    
    if (morphPath) {
      anime({
        targets: morphPath,
        d: [
          { value: paths[1] },
          { value: paths[2] },
          { value: paths[3] },
          { value: paths[0] },
        ],
        duration: 8000,
        easing: 'easeInOutQuad',
        loop: true,
        update: (anim) => {
          const progress = Math.floor((anim.progress / 100) * 4);
          setMorphState(progress % 4);
        },
      });
    }

    // Animación adicional de fill y stroke
    anime({
      targets: '#morph-path',
      fill: [
        { value: '#FF6B6B' },
        { value: '#4ECDC4' },
        { value: '#45B7D1' },
        { value: '#96CEB4' },
        { value: '#FF6B6B' },
      ],
      strokeWidth: [2, 8, 2],
      duration: 8000,
      easing: 'easeInOutQuad',
      loop: true,
    });
  }, []);

  const shapeNames = ['Círculo', 'Cuadrado', 'Estrella', 'Triángulo'];

  return (
    <section className="p-6 bg-linear-to-br from-rose-50 to-orange-50 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Morphing de Formas SVG</h3>
      
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-center mb-4">
          <svg ref={svgRef} width="400" height="400" viewBox="0 0 400 400">
            <path
              id="morph-path"
              d="M 200,200 m -100,0 a 100,100 0 1,0 200,0 a 100,100 0 1,0 -200,0"
              fill="#FF6B6B"
              stroke="#333"
              strokeWidth="2"
            />
          </svg>
        </div>
        
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">
            Forma actual: <span className="text-indigo-600">{shapeNames[morphState]}</span>
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-3">
        Morphing suave entre diferentes formas geométricas con cambio de color.
      </p>
    </section>
  );
}
