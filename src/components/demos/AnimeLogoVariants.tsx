import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

export default function AnimeLogoVariants() {
  const [selectedVariant, setSelectedVariant] = useState<number>(1);

  const variants = [
    { id: 1, name: 'Rotación 3D Continua', description: 'Rotación suave en Y con flotación' },
    { id: 2, name: 'Pulso Energético', description: 'Pulsos de escala con ondas de energía' },
    { id: 3, name: 'Órbita Circular', description: 'Movimiento circular con rotación' },
    { id: 4, name: 'Doble Hélice', description: 'Rotación en X e Y simultánea' },
    { id: 5, name: 'Explosión Partículas', description: 'Partículas que orbitan el logo' },
    { id: 6, name: 'Matrix Digital', description: 'Efecto de escaneo digital' },
    { id: 7, name: 'Espiral Magnética', description: 'Espiral de partículas magnéticas' },
    { id: 8, name: 'Ondas Gravitacionales', description: 'Ondas que distorsionan el espacio' },
    { id: 9, name: 'Cubo Holográfico', description: 'Logo en cubo 3D giratorio' },
    { id: 10, name: 'Aurora Boreal', description: 'Luces ondulantes tipo aurora' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-[#0F172A] to-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Variantes de Animación del Logo
          </h1>
          <p className="text-xl text-gray-400">
            Selecciona una animación para previsualizar diferentes efectos
          </p>
        </div>

        {/* Selector de variantes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                selectedVariant === variant.id
                  ? 'border-[#25a366] bg-[#25a366]/20 shadow-lg shadow-[#25a366]/50'
                  : 'border-white/10 bg-white/5 hover:border-[#25a366]/50'
              }`}
            >
              <div className="text-white font-semibold text-sm mb-1">{variant.name}</div>
              <div className="text-gray-400 text-xs">{variant.description}</div>
            </button>
          ))}
        </div>

        {/* Preview Area */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-12 border border-white/10 min-h-[600px] flex items-center justify-center relative overflow-hidden">
          {/* Renderizar variante seleccionada */}
          {selectedVariant === 1 && <Variant1 />}
          {selectedVariant === 2 && <Variant2 />}
          {selectedVariant === 3 && <Variant3 />}
          {selectedVariant === 4 && <Variant4 />}
          {selectedVariant === 5 && <Variant5 />}
          {selectedVariant === 6 && <Variant6 />}
          {selectedVariant === 7 && <Variant7 />}
          {selectedVariant === 8 && <Variant8 />}
          {selectedVariant === 9 && <Variant9 />}
          {selectedVariant === 10 && <Variant10 />}
        </div>

        {/* Descripción detallada */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-2">
            {variants.find(v => v.id === selectedVariant)?.name}
          </h3>
          <p className="text-gray-400">
            {variants.find(v => v.id === selectedVariant)?.description}
          </p>
        </div>
      </div>
    </section>
  );
}

// Variante 1: Rotación 3D Continua con Flotación
function Variant1() {
  const logoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Rotación continua del logo
    anime({
      targets: logoRef.current,
      rotateY: 360,
      duration: 8000,
      easing: 'linear',
      loop: true
    });

    // Flotación vertical
    anime({
      targets: containerRef.current,
      translateY: [-20, 20, -20],
      duration: 5000,
      easing: 'easeInOutSine',
      loop: true
    });

    // Rotación de órbita
    anime({
      targets: orbitRef.current,
      rotate: 360,
      duration: 30000,
      easing: 'linear',
      loop: true
    });

    // Pulso del glow
    anime({
      targets: glowRef.current,
      scale: [1, 1.3, 1],
      opacity: [0.3, 0.6, 0.3],
      duration: 3000,
      easing: 'easeInOutQuad',
      loop: true
    });
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Órbita decorativa */}
      <div 
        ref={orbitRef}
        className="absolute border-2 border-dashed border-[#25a366]/30 rounded-full"
        style={{ width: '500px', height: '500px' }}
      >
        <div className="absolute w-4 h-4 bg-[#25a366] rounded-full top-0 left-1/2 -translate-x-1/2 shadow-lg shadow-[#25a366]" />
      </div>

      {/* Glow effect */}
      <div 
        ref={glowRef}
        className="absolute w-96 h-96 rounded-full bg-[#25a366]/30 blur-3xl"
      />

      {/* Logo container */}
      <div ref={containerRef} className="relative" style={{ perspective: '1500px' }}>
        <div ref={logoRef} style={{ transformStyle: 'preserve-3d' }}>
          <img 
            src={`${import.meta.env.BASE_URL}logo_carabineros.svg`}
            alt="Logo"
            className="w-80 h-80"
            style={{ filter: 'drop-shadow(0 20px 40px rgba(37, 163, 102, 0.4))' }}
          />
        </div>
      </div>
    </div>
  );
}

// Variante 2: Pulso Energético
function Variant2() {
  const logoRef = useRef<HTMLDivElement>(null);
  const wave1Ref = useRef<HTMLDivElement>(null);
  const wave2Ref = useRef<HTMLDivElement>(null);
  const wave3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pulso del logo
    anime({
      targets: logoRef.current,
      scale: [1, 1.15, 1],
      duration: 2000,
      easing: 'easeInOutQuad',
      loop: true
    });

    // Ondas expansivas
    const waveAnimation = (target: HTMLElement | null, delay: number) => {
      anime({
        targets: target,
        scale: [0.8, 2.5],
        opacity: [0.6, 0],
        duration: 2000,
        delay: delay,
        easing: 'easeOutQuad',
        loop: true
      });
    };

    waveAnimation(wave1Ref.current, 0);
    waveAnimation(wave2Ref.current, 666);
    waveAnimation(wave3Ref.current, 1333);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ondas de energía */}
      <div ref={wave1Ref} className="absolute w-80 h-80 border-4 border-[#25a366] rounded-full" />
      <div ref={wave2Ref} className="absolute w-80 h-80 border-4 border-[#1D7D4D] rounded-full" />
      <div ref={wave3Ref} className="absolute w-80 h-80 border-4 border-[#35AF6F] rounded-full" />

      {/* Logo */}
      <div ref={logoRef} className="relative z-10">
        <img 
          src={`${import.meta.env.BASE_URL}logo_carabineros.svg`}
          alt="Logo"
          className="w-64 h-64"
          style={{ filter: 'drop-shadow(0 0 30px rgba(37, 163, 102, 0.8))' }}
        />
      </div>
    </div>
  );
}

// Variante 3: Órbita Circular
function Variant3() {
  const logoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Movimiento circular del logo
    anime({
      targets: containerRef.current,
      translateX: [
        { value: 100, duration: 2000 },
        { value: 0, duration: 2000 },
        { value: -100, duration: 2000 },
        { value: 0, duration: 2000 }
      ],
      translateY: [
        { value: 0, duration: 2000 },
        { value: 100, duration: 2000 },
        { value: 0, duration: 2000 },
        { value: -100, duration: 2000 }
      ],
      easing: 'easeInOutSine',
      loop: true
    });

    // Rotación del logo
    anime({
      targets: logoRef.current,
      rotate: 360,
      duration: 8000,
      easing: 'linear',
      loop: true
    });

    // Partículas orbitando
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        anime({
          targets: particle,
          rotate: 360,
          duration: 5000 + index * 1000,
          easing: 'linear',
          loop: true
        });
      }
    });
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Partículas orbitando */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          ref={el => { particlesRef.current[i] = el; }}
          className="absolute"
          style={{ width: '300px', height: '300px' }}
        >
          <div 
            className="absolute w-3 h-3 bg-[#25a366] rounded-full top-0 left-1/2 -translate-x-1/2"
            style={{ boxShadow: '0 0 20px #25a366' }}
          />
        </div>
      ))}

      {/* Logo */}
      <div ref={containerRef}>
        <div ref={logoRef}>
          <img 
            src={`${import.meta.env.BASE_URL}logo_carabineros.svg`}
            alt="Logo"
            className="w-64 h-64"
            style={{ filter: 'drop-shadow(0 10px 30px rgba(37, 163, 102, 0.5))' }}
          />
        </div>
      </div>
    </div>
  );
}

// Variante 4: Doble Hélice
function Variant4() {
  const logoRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Rotación doble del logo
    anime({
      targets: logoRef.current,
      rotateX: 360,
      rotateY: 360,
      duration: 6000,
      easing: 'linear',
      loop: true
    });

    // Animación del grid
    anime({
      targets: gridRef.current,
      translateY: [-50, 0],
      duration: 2000,
      easing: 'linear',
      loop: true
    });
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Grid animado de fondo */}
      <div 
        ref={gridRef}
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(37, 163, 102, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 163, 102, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Logo */}
      <div style={{ perspective: '1500px' }}>
        <div ref={logoRef} style={{ transformStyle: 'preserve-3d' }}>
          <img 
            src={`${import.meta.env.BASE_URL}logo_carabineros.svg`}
            alt="Logo"
            className="w-80 h-80"
            style={{ filter: 'drop-shadow(0 20px 40px rgba(37, 163, 102, 0.6))' }}
          />
        </div>
      </div>
    </div>
  );
}

// Variante 5: Explosión de Partículas
function Variant5() {
  const logoRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Respiración del logo
    anime({
      targets: logoRef.current,
      scale: [1, 1.1, 1],
      duration: 3000,
      easing: 'easeInOutQuad',
      loop: true
    });

    // Animación de partículas
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        const angle = (360 / 12) * index;
        const radius = 200;
        
        anime({
          targets: particle,
          translateX: [
            { value: Math.cos(angle * Math.PI / 180) * radius, duration: 1500 },
            { value: 0, duration: 1500 }
          ],
          translateY: [
            { value: Math.sin(angle * Math.PI / 180) * radius, duration: 1500 },
            { value: 0, duration: 1500 }
          ],
          opacity: [
            { value: 1, duration: 750 },
            { value: 0, duration: 750 }
          ],
          scale: [
            { value: 1, duration: 750 },
            { value: 0, duration: 750 }
          ],
          delay: index * 100,
          easing: 'easeOutQuad',
          loop: true
        });
      }
    });
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Partículas */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          ref={el => { particlesRef.current[i] = el; }}
          className="absolute w-4 h-4 bg-gradient-to-br from-[#25a366] to-[#1D7D4D] rounded-full"
          style={{ boxShadow: '0 0 20px #25a366' }}
        />
      ))}

      {/* Logo */}
      <div ref={logoRef} className="relative z-10">
        <img 
          src={`${import.meta.env.BASE_URL}logo_carabineros.svg`}
          alt="Logo"
          className="w-64 h-64"
          style={{ filter: 'drop-shadow(0 0 40px rgba(37, 163, 102, 0.8))' }}
        />
      </div>
    </div>
  );
}

// Variante 6: Matrix Digital
function Variant6() {
  const logoRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const hexagonsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Rotación lenta del logo
    anime({
      targets: logoRef.current,
      rotateY: 360,
      duration: 10000,
      easing: 'linear',
      loop: true
    });

    // Línea de escaneo
    anime({
      targets: scanLineRef.current,
      translateY: [-400, 400],
      opacity: [0, 1, 0],
      duration: 3000,
      easing: 'linear',
      loop: true
    });

    // Hexágonos parpadeantes
    hexagonsRef.current.forEach((hex, index) => {
      if (hex) {
        anime({
          targets: hex,
          opacity: [0.2, 0.8, 0.2],
          scale: [0.8, 1.1, 0.8],
          duration: 2000,
          delay: index * 200,
          easing: 'easeInOutQuad',
          loop: true
        });
      }
    });
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Hexágonos de fondo */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          ref={el => { hexagonsRef.current[i] = el; }}
          className="absolute border-2 border-[#25a366]/30"
          style={{
            width: `${150 + i * 50}px`,
            height: `${150 + i * 50}px`,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}
        />
      ))}

      {/* Línea de escaneo */}
      <div 
        ref={scanLineRef}
        className="absolute w-full h-1 bg-gradient-to-r from-transparent via-[#25a366] to-transparent"
        style={{ boxShadow: '0 0 20px #25a366' }}
      />

      {/* Logo */}
      <div style={{ perspective: '1500px' }}>
        <div ref={logoRef} className="relative z-10" style={{ transformStyle: 'preserve-3d' }}>
          <img 
            src={`${import.meta.env.BASE_URL}logo_carabineros.svg`}
            alt="Logo"
            className="w-72 h-72"
            style={{ filter: 'drop-shadow(0 0 50px rgba(37, 163, 102, 0.9))' }}
          />
        </div>
      </div>
    </div>
  );
}

// Variante 7: Espiral Magnética
function Variant7() {
  const logoRef = useRef<HTMLDivElement>(null);
  const spiralParticlesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Rotación del logo
    anime({
      targets: logoRef.current,
      rotateZ: 360,
      duration: 10000,
      easing: 'linear',
      loop: true
    });

    // Partículas en espiral
    spiralParticlesRef.current.forEach((particle, index) => {
      if (particle) {
        const radius = 150 + index * 15;
        const duration = 3000 + index * 200;
        
        anime({
          targets: particle,
          translateX: [
            { value: radius * Math.cos(0), duration: duration / 4 },
            { value: radius * Math.cos(Math.PI / 2), duration: duration / 4 },
            { value: radius * Math.cos(Math.PI), duration: duration / 4 },
            { value: radius * Math.cos(3 * Math.PI / 2), duration: duration / 4 }
          ],
          translateY: [
            { value: radius * Math.sin(0), duration: duration / 4 },
            { value: radius * Math.sin(Math.PI / 2), duration: duration / 4 },
            { value: radius * Math.sin(Math.PI), duration: duration / 4 },
            { value: radius * Math.sin(3 * Math.PI / 2), duration: duration / 4 }
          ],
          scale: [1, 1.5, 1],
          opacity: [0.3, 1, 0.3],
          easing: 'linear',
          loop: true
        });
      }
    });
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Partículas en espiral */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={el => { spiralParticlesRef.current[i] = el; }}
          className="absolute w-4 h-4 bg-gradient-to-r from-[#25a366] to-[#35AF6F] rounded-full"
          style={{ boxShadow: '0 0 15px #25a366' }}
        />
      ))}

      {/* Logo */}
      <div ref={logoRef} className="relative z-10">
        <img 
          src={`${import.meta.env.BASE_URL}logo_carabineros.svg`}
          alt="Logo"
          className="w-64 h-64"
          style={{ filter: 'drop-shadow(0 0 30px rgba(37, 163, 102, 0.7))' }}
        />
      </div>
    </div>
  );
}

// Variante 8: Ondas Gravitacionales
function Variant8() {
  const logoRef = useRef<HTMLDivElement>(null);
  const wavesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Distorsión del logo
    anime({
      targets: logoRef.current,
      scaleX: [1, 1.15, 0.85, 1],
      scaleY: [1, 0.85, 1.15, 1],
      duration: 4000,
      easing: 'easeInOutSine',
      loop: true
    });

    // Ondas concéntricas
    wavesRef.current.forEach((wave, index) => {
      if (wave) {
        anime({
          targets: wave,
          scale: [0.5, 3],
          opacity: [0.8, 0],
          rotate: [0, 180],
          duration: 3000,
          delay: index * 400,
          easing: 'easeOutQuad',
          loop: true
        });
      }
    });
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ondas gravitacionales */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          ref={el => { wavesRef.current[i] = el; }}
          className="absolute w-64 h-64 rounded-full"
          style={{
            border: '3px solid rgba(37, 163, 102, 0.3)',
            borderStyle: 'dashed'
          }}
        />
      ))}

      {/* Logo con distorsión */}
      <div ref={logoRef} className="relative z-10">
        <img 
          src={`${import.meta.env.BASE_URL}logo_carabineros.svg`}
          alt="Logo"
          className="w-72 h-72"
          style={{ filter: 'drop-shadow(0 0 40px rgba(37, 163, 102, 0.8))' }}
        />
      </div>
    </div>
  );
}

// Variante 9: Cubo Holográfico
function Variant9() {
  const cubeRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const edgesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Rotación del cubo
    anime({
      targets: cubeRef.current,
      rotateX: 360,
      rotateY: 360,
      duration: 12000,
      easing: 'linear',
      loop: true
    });

    // Pulso del logo
    anime({
      targets: logoRef.current,
      scale: [1, 1.05, 1],
      duration: 2000,
      easing: 'easeInOutQuad',
      loop: true
    });

    // Líneas de aristas brillantes
    edgesRef.current.forEach((edge, index) => {
      if (edge) {
        anime({
          targets: edge,
          opacity: [0.2, 1, 0.2],
          duration: 1500,
          delay: index * 150,
          easing: 'easeInOutQuad',
          loop: true
        });
      }
    });
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '2000px' }}>
      {/* Cubo holográfico */}
      <div ref={cubeRef} className="relative" style={{ transformStyle: 'preserve-3d', width: '300px', height: '300px' }}>
        {/* Aristas del cubo */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            ref={el => { edgesRef.current[i] = el; }}
            className="absolute bg-gradient-to-r from-[#25a366] to-[#1D7D4D] rounded-full"
            style={{
              width: i < 4 ? '300px' : i < 8 ? '2px' : '300px',
              height: i < 4 ? '2px' : i < 8 ? '300px' : '2px',
              boxShadow: '0 0 10px #25a366',
              transform: `
                ${i === 0 ? 'translateZ(150px)' : ''}
                ${i === 1 ? 'translateZ(-150px)' : ''}
                ${i === 2 ? 'rotateX(90deg) translateZ(150px)' : ''}
                ${i === 3 ? 'rotateX(90deg) translateZ(-150px)' : ''}
                ${i === 4 ? 'rotateY(90deg) translateZ(150px) translateX(-150px)' : ''}
                ${i === 5 ? 'rotateY(90deg) translateZ(150px) translateX(150px)' : ''}
                ${i === 6 ? 'rotateY(90deg) translateZ(-150px) translateX(-150px)' : ''}
                ${i === 7 ? 'rotateY(90deg) translateZ(-150px) translateX(150px)' : ''}
              `
            }}
          />
        ))}

        {/* Logo en el centro */}
        <div ref={logoRef} className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
          <img 
            src={`${import.meta.env.BASE_URL}logo_carabineros.svg`}
            alt="Logo"
            className="w-48 h-48"
            style={{ filter: 'drop-shadow(0 0 30px rgba(37, 163, 102, 0.9))' }}
          />
        </div>
      </div>
    </div>
  );
}

// Variante 10: Aurora Boreal
function Variant10() {
  const logoRef = useRef<HTMLDivElement>(null);
  const auroraLinesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Flotación del logo
    anime({
      targets: logoRef.current,
      translateY: [-15, 15, -15],
      rotateZ: [-3, 3, -3],
      duration: 6000,
      easing: 'easeInOutSine',
      loop: true
    });

    // Líneas de aurora ondulantes
    auroraLinesRef.current.forEach((line, index) => {
      if (line) {
        anime({
          targets: line,
          translateX: [
            { value: -50, duration: 2000 },
            { value: 50, duration: 2000 },
            { value: -50, duration: 2000 }
          ],
          scaleY: [
            { value: 1, duration: 1000 },
            { value: 1.3, duration: 1000 },
            { value: 0.7, duration: 1000 },
            { value: 1, duration: 1000 }
          ],
          opacity: [0.3, 0.7, 0.3],
          delay: index * 300,
          easing: 'easeInOutSine',
          loop: true
        });
      }
    });
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Líneas de aurora */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={el => { auroraLinesRef.current[i] = el; }}
          className="absolute h-full"
          style={{
            width: '60px',
            left: `${10 + i * 10}%`,
            background: `linear-gradient(to bottom, 
              transparent 0%, 
              rgba(37, 163, 102, ${0.2 + i * 0.05}) 20%, 
              rgba(29, 125, 77, ${0.3 + i * 0.05}) 50%, 
              rgba(53, 175, 111, ${0.2 + i * 0.05}) 80%, 
              transparent 100%)`,
            filter: 'blur(15px)',
            transform: `skewX(${-10 + i * 2}deg)`
          }}
        />
      ))}

      {/* Logo */}
      <div ref={logoRef} className="relative z-10">
        <img 
          src={`${import.meta.env.BASE_URL}logo_carabineros.svg`}
          alt="Logo"
          className="w-80 h-80"
          style={{ filter: 'drop-shadow(0 10px 50px rgba(37, 163, 102, 0.6))' }}
        />
      </div>
    </div>
  );
}
