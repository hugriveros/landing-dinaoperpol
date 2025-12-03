import { useEffect, useRef } from 'react';
import anime from 'animejs';

interface AnimatedLogoProps {
  logoPath?: string;
}

export default function AnimatedLogo({ logoPath = `${import.meta.env.BASE_URL}logo_carabineros.svg` }: AnimatedLogoProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respiración del logo
    anime({
      targets: logoRef.current,
      scale: [1, 1.1, 1],
      duration: 3000,
      easing: 'easeInOutQuad',
      loop: true
    });

    // Pulso del glow de fondo
    anime({
      targets: glowRef.current,
      scale: [1, 1.4, 1],
      opacity: [0.3, 0.7, 0.3],
      duration: 3000,
      easing: 'easeInOutQuad',
      loop: true
    });

    // Animación de partículas: todas salen desde el centro y regresan al centro
    particlesRef.current.forEach((particle, _index) => {
      if (particle) {
        // Ángulo aleatorio para cada partícula
        const randomAngle = Math.random() * 360;
        // Radio aleatorio para variedad
        const randomRadiusX = 350 + Math.random() * 200; // Entre 350-550px
        const randomRadiusY = 200 + Math.random() * 150; // Entre 200-350px
        // Duración aleatoria más lenta
        const randomDuration = 3000 + Math.random() * 2000; // Entre 3-5 segundos
        // Delay aleatorio
        const randomDelay = Math.random() * 1000;

        anime({
          targets: particle,
          translateX: [
            { value: 0, duration: 0 },
            { value: Math.cos(randomAngle * Math.PI / 180) * randomRadiusX, duration: randomDuration, easing: 'easeInOutSine' },
            { value: 0, duration: randomDuration, easing: 'easeInOutSine' }
          ],
          translateY: [
            { value: 0, duration: 0 },
            { value: Math.sin(randomAngle * Math.PI / 180) * randomRadiusY, duration: randomDuration, easing: 'easeInOutSine' },
            { value: 0, duration: randomDuration, easing: 'easeInOutSine' }
          ],
          opacity: [
            { value: 0, duration: 0 },
            { value: 0.8 + Math.random() * 0.2, duration: randomDuration / 2, easing: 'easeInOutSine' },
            { value: 0, duration: randomDuration / 2, easing: 'easeInOutSine' }
          ],
          scale: [
            { value: 0, duration: 0 },
            { value: 1.2 + Math.random() * 0.8, duration: randomDuration / 2, easing: 'easeInOutSine' },
            { value: 0, duration: randomDuration / 2, easing: 'easeInOutSine' }
          ],
          rotate: [
            { value: 0, duration: 0 },
            { value: Math.random() > 0.5 ? 360 : -360, duration: randomDuration, easing: 'easeInOutSine' },
            { value: 0, duration: randomDuration, easing: 'easeInOutSine' }
          ],
          delay: randomDelay,
          loop: true
        });
      }
    });
  }, []);

  return (
    <div className="relative flex items-center justify-center opacity-0" style={{ animation: 'fadeInUp 1s ease 0.6s forwards' }}>
      {/* Glow de fondo */}
      <div 
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full bg-secondary-green/20 blur-3xl"
      />

      {/* Contenedor del logo */}
      <div className="relative" style={{ width: '350px', height: '350px' }}>
        {/* Partículas explosivas */}
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            ref={el => { particlesRef.current[i] = el; }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-linear-to-br from-secondary-green to-primary-green rounded-full"
            style={{ boxShadow: '0 0 20px #25a366' }}
          />
        ))}

        {/* Logo central */}
        <div ref={logoRef} className="absolute inset-0 flex items-center justify-center">
          <img 
            src={logoPath}
            alt="Logo DIRNAOPERPOL"
            className="w-full h-full object-contain"
            style={{ filter: 'drop-shadow(0 0 5px rgba(37, 163, 102, 0.8))' }}
          />
        </div>
      </div>
    </div>
  );
}
