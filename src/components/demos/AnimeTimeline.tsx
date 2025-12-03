import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

export default function AnimeTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const timelineRef = useRef<anime.AnimeTimelineInstance | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = anime.timeline({
      autoplay: false,
      loop: true,
    });

    tl
      .add({
        targets: '.tl-director',
        translateX: [-300, 0],
        opacity: [0, 1],
        scale: [0.5, 1],
        duration: 1000,
        easing: 'easeOutElastic(1, .6)',
      })
      .add({
        targets: '.tl-logo',
        rotate: ['0turn', '2turn'],
        scale: [0, 1],
        opacity: [0, 1],
        duration: 1500,
        easing: 'easeOutBack',
      }, '-=500')
      .add({
        targets: '.tl-crayon',
        translateY: [-200, 0],
        rotate: [-180, 0],
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutBounce',
      }, '-=700')
      .add({
        targets: '.tl-text',
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.8, 1],
        duration: 800,
        easing: 'easeOutQuad',
      }, '-=400');

    timelineRef.current = tl;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.pause();
      }
    };
  }, []);

  const handlePlay = () => {
    if (timelineRef.current) {
      if (isPlaying) {
        timelineRef.current.pause();
      } else {
        timelineRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="p-6 bg-linear-to-br from-green-50 to-teal-50 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Timeline Compleja con Control</h3>
      
      <div ref={containerRef} className="relative h-64 mb-4 bg-white rounded-lg p-6 overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}hero_director.png`}
          alt="Director"
          className="tl-director absolute top-8 left-8 w-24 h-24 object-cover rounded-full shadow-lg"
        />
        <img
          src={`${import.meta.env.BASE_URL}logo_carabineros.svg`}
          alt="Logo"
          className="tl-logo absolute top-8 right-8 w-20 h-20"
        />
        <img
          src={`${import.meta.env.BASE_URL}crayon.svg`}
          alt="Crayon"
          className="tl-crayon absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-16"
        />
        <div className="tl-text absolute bottom-8 right-8 text-lg font-bold text-indigo-600">
          Timeline Profesional
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handlePlay}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors font-semibold"
        >
          {isPlaying ? 'Pausar' : 'Reproducir'}
        </button>
      </div>
    </section>
  );
}
