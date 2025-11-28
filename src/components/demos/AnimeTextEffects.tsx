import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

export default function AnimeTextEffects() {
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);
  const counterRef = useRef({ value: 0 });

  useEffect(() => {
    // Efecto de letras individuales
    if (text1Ref.current) {
      const letters = text1Ref.current.querySelectorAll('.letter');
      anime.timeline({ loop: true })
        .add({
          targets: letters,
          translateY: [-100, 0],
          opacity: [0, 1],
          easing: 'easeOutExpo',
          duration: 1400,
          delay: (el, i) => 50 * i,
        })
        .add({
          targets: letters,
          translateY: [0, 100],
          opacity: [1, 0],
          easing: 'easeInExpo',
          duration: 1200,
          delay: (el, i) => 30 * i,
        }, '+=2000');
    }

    // Efecto de palabras con scale
    if (text2Ref.current) {
      const words = text2Ref.current.querySelectorAll('.word');
      anime.timeline({ loop: true })
        .add({
          targets: words,
          scale: [0, 1],
          opacity: [0, 1],
          rotate: [-10, 0],
          easing: 'easeOutElastic(1, .5)',
          duration: 1000,
          delay: (el, i) => 200 * i,
        })
        .add({
          targets: words,
          scale: [1, 0],
          opacity: [1, 0],
          easing: 'easeInBack',
          duration: 800,
          delay: (el, i) => 100 * i,
        }, '+=2500');
    }

    // Efecto wave con caracteres
    if (text3Ref.current) {
      const chars = text3Ref.current.querySelectorAll('.char');
      anime({
        targets: chars,
        translateY: [
          { value: -20, duration: 300 },
          { value: 0, duration: 300 },
        ],
        delay: anime.stagger(80, { start: 0 }),
        loop: true,
        easing: 'easeInOutSine',
      });
    }

    // Contador animado
    anime({
      targets: counterRef.current,
      value: [0, 2024],
      round: 1,
      duration: 3000,
      easing: 'easeOutExpo',
      update: () => {
        setCounter(Math.round(counterRef.current.value));
      },
      loop: true,
      direction: 'alternate',
      delay: 1000,
    });
  }, []);

  const splitText = (text: string, className: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className={className}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const splitWords = (text: string, className: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className={`${className} inline-block mr-2`}>
        {word}
      </span>
    ));
  };

  return (
    <section className="p-6 bg-linear-to-br from-violet-50 to-purple-50 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Efectos de Texto Avanzados</h3>
      
      <div className="space-y-8">
        <div className="bg-white rounded-lg p-6 text-center">
          <h4 className="text-sm font-semibold mb-4 text-gray-600">Letter by Letter</h4>
          <div ref={text1Ref} className="text-3xl font-bold text-blue-600">
            {splitText('DINAOPERPOL', 'letter inline-block')}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 text-center">
          <h4 className="text-sm font-semibold mb-4 text-gray-600">Word Scale Effect</h4>
          <div ref={text2Ref} className="text-2xl font-bold text-purple-600">
            {splitWords('Carabineros de Chile', 'word')}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 text-center">
          <h4 className="text-sm font-semibold mb-4 text-gray-600">Wave Effect</h4>
          <div ref={text3Ref} className="text-3xl font-bold text-teal-600">
            {splitText('ANIMACIÓN', 'char inline-block')}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 text-center">
          <h4 className="text-sm font-semibold mb-4 text-gray-600">Animated Counter</h4>
          <div className="text-5xl font-bold text-indigo-600">
            {counter}
          </div>
        </div>
      </div>
    </section>
  );
}
