import React, { useRef } from 'react';
import anime from 'animejs';

export default function AnimeInteractive() {
  const hoverRef = useRef<HTMLDivElement>(null);
  const clickRef = useRef<HTMLImageElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const handleHover = (entering: boolean) => {
    if (!hoverRef.current) return;
    
    anime({
      targets: hoverRef.current.querySelectorAll('img'),
      scale: entering ? 1.2 : 1,
      rotate: entering ? '15deg' : '0deg',
      translateY: entering ? -10 : 0,
      duration: 400,
      easing: 'easeOutElastic(1, .6)',
    });
  };

  const handleClick = () => {
    if (!clickRef.current) return;
    
    anime({
      targets: clickRef.current,
      scale: [1, 1.3, 0.9, 1.1, 1],
      rotate: ['0turn', '1turn'],
      duration: 1000,
      easing: 'easeInOutQuad',
    });
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    anime({
      targets: e.currentTarget,
      scale: 1.1,
      opacity: 0.7,
      duration: 200,
      easing: 'easeOutQuad',
    });
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    anime({
      targets: e.currentTarget,
      scale: [1.1, 0.9, 1],
      opacity: [0.7, 1],
      rotate: ['0deg', '360deg'],
      duration: 600,
      easing: 'easeOutElastic(1, .5)',
    });
  };

  return (
    <section className="p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Animaciones Interactivas</h3>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col items-center">
          <h4 className="text-sm font-semibold mb-3 text-gray-600">Hover Effect</h4>
          <div
            ref={hoverRef}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            className="cursor-pointer"
          >
            <img
              src={`${import.meta.env.BASE_URL}logo_carabineros.svg`}
              alt="Logo"
              className="w-24 h-24"
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h4 className="text-sm font-semibold mb-3 text-gray-600">Click Animation</h4>
          <img
            ref={clickRef}
            src={`${import.meta.env.BASE_URL}crayon.svg`}
            alt="Crayon"
            onClick={handleClick}
            className="w-24 h-24 cursor-pointer"
          />
        </div>

        <div className="flex flex-col items-center">
          <h4 className="text-sm font-semibold mb-3 text-gray-600">Drag & Drop</h4>
          <div
            ref={dragRef}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="cursor-move bg-gradient-to-br from-blue-400 to-purple-500 w-24 h-24 rounded-lg flex items-center justify-center text-white font-bold shadow-lg"
          >
            Arrástra
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white rounded-lg">
        <h4 className="text-sm font-semibold mb-2 text-gray-600">Instrucciones:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• <strong>Hover:</strong> Pasa el mouse sobre el logo</li>
          <li>• <strong>Click:</strong> Haz click en el crayon</li>
          <li>• <strong>Drag:</strong> Arrastra el cuadro morado</li>
        </ul>
      </div>
    </section>
  );
}
