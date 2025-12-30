import { useEffect, useRef } from 'react';
import anime from 'animejs';
import AnimatedLogo from './AnimatedLogo';

export default function Hero() {
  // Refs para elementos a animar
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Timeline principal
    const tl = anime.timeline({
      easing: 'easeOutExpo',
    });

    // Preparación inicial: separar palabras para animarlas individualmente (opcional, pero queda genial)
    if (titleRef.current) {
      // Simplemente animaremos el bloque entero por ahora para mantenerlo simple y robusto,
      // pero con una entrada elástica.
    }

    tl
    // 1. Logo (Entrada con escala y rotación sutil)
    .add({
      targets: logoRef.current,
      scale: [0.8, 1],
      opacity: [0, 1],
      rotate: [-5, 0],
      duration: 1500,
      easing: 'easeOutElastic(1, .6)'
    })
    // 2. Título (Entrada desde abajo)
    .add({
      targets: titleRef.current,
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1200,
      easing: 'easeOutExpo'
    }, '-=1000') // Empezar 1s antes de que termine el logo
    // 3. Párrafo (Entrada suave)
    .add({
      targets: textRef.current,
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutQuad'
    }, '-=800');

  }, []);

  return (
    <section id="inicio" className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-700 pt-16 relative overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={`${import.meta.env.BASE_URL}INICIO.mov`} type="video/mp4" />
      </video>

      {/* Filtro oscuro sobre el video */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Grid animado de fondo (sobre el video) */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 168, 98, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 168, 98, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          animation: 'gridMove 20s linear infinite'
        }}
      ></div>

      {/* Gradientes radiales de fondo */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(0, 135, 81, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(0, 168, 98, 0.1) 0%, transparent 50%)
          `
        }}
      ></div>

      <div className="max-w-[1400px] mx-auto px-8 py-16 relative z-10 min-h-[calc(100vh-180px)] flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Columna izquierda: Texto */}
          <div className="w-full">
            {/* Título Principal */}
            <div className="overflow-hidden"> {/* Wrapper para ocultar entrada desde abajo */}
              <h1
                ref={titleRef}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 opacity-0"
              >
                Dirección Nacional de Gestión Estratégica de Abastecimiento
              </h1>
            </div>

            {/* Descripción */}
            <div className="overflow-hidden">
              <p
                ref={textRef}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl leading-relaxed opacity-0"
              >
                Coordinamos y ejecutamos las operaciones policiales a nivel nacional, garantizando la seguridad ciudadana y el orden público con compromiso y transparencia.
              </p>
            </div>

          </div>

          {/* Columna derecha: Logo animado */}
          <div
            ref={logoRef}
            className="w-full flex items-center justify-center mt-12 lg:mt-0 opacity-0"
          >
            <AnimatedLogo />
          </div>
        </div>
      </div>

      {/* Onda decorativa inferior */}
      <div className="absolute -bottom-px left-0 right-0 z-20">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white"/>
        </svg>
      </div>

      {/* Definición de animación Grid en CSS global o inline style block */}
      <style>{`
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 100px 100px; }
        }
      `}</style>
    </section>
  );
}
