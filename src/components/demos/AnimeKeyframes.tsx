import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function AnimeKeyframes() {
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Keyframes básicos con múltiples propiedades
    if (box1Ref.current) {
      anime({
        targets: box1Ref.current,
        keyframes: [
          { translateY: -40, backgroundColor: '#FF6B6B' },
          { translateX: 60, backgroundColor: '#4ECDC4' },
          { translateY: 40, backgroundColor: '#45B7D1' },
          { translateX: 0, backgroundColor: '#96CEB4' },
          { translateY: 0, backgroundColor: '#FFEAA7' },
        ],
        duration: 4000,
        easing: 'easeInOutQuad',
        loop: true,
      });
    }

    // Keyframes avanzados con imagen
    if (imageRef.current) {
      anime({
        targets: imageRef.current,
        keyframes: [
          { translateY: 0, scale: 1, rotate: 0 },
          { translateY: -30, scale: 1.2, rotate: 10 },
          { translateY: -20, scale: 1.1, rotate: -5 },
          { translateY: 0, scale: 1, rotate: 0 },
        ],
        duration: 3000,
        easing: 'easeInOutSine',
        loop: true,
      });
    }

    // Keyframes con property-specific durations
    if (box2Ref.current) {
      anime({
        targets: box2Ref.current,
        translateX: [
          { value: 100, duration: 1000 },
          { value: 0, duration: 800 },
        ],
        translateY: [
          { value: -60, duration: 800 },
          { value: 0, duration: 1000 },
        ],
        scale: [
          { value: 1.5, duration: 600 },
          { value: 1, duration: 1200 },
        ],
        rotate: [
          { value: 180, duration: 1000 },
          { value: 0, duration: 800 },
        ],
        easing: 'easeInOutExpo',
        loop: true,
        delay: 500,
      });
    }
  }, []);

  return (
    <section className="p-6 bg-linear-to-br from-cyan-50 to-blue-50 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Animaciones con Keyframes</h3>
      
      <div className="grid grid-cols-3 gap-6 min-h-[200px]">
        <div className="flex flex-col items-center justify-center">
          <h4 className="text-sm font-semibold mb-3 text-gray-600">Keyframes Multi-property</h4>
          <div
            ref={box1Ref}
            className="w-16 h-16 rounded-lg shadow-lg"
            style={{ backgroundColor: '#FF6B6B' }}
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <h4 className="text-sm font-semibold mb-3 text-gray-600">Imagen con Keyframes</h4>
          <img
            ref={imageRef}
            src={`${import.meta.env.BASE_URL}logo_carabineros.svg`}
            alt="Logo"
            className="w-20 h-20"
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <h4 className="text-sm font-semibold mb-3 text-gray-600">Property-specific Duration</h4>
          <div
            ref={box2Ref}
            className="w-16 h-16 bg-linear-to-br from-purple-400 to-pink-500 rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
