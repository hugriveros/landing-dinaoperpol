import { useEffect, useRef } from 'react';
import anime from 'animejs';

interface AnimatedLogoProps {
  logoPath?: string;
}

export default function AnimatedLogo({ logoPath = '/logo_carabineros.svg' }: AnimatedLogoProps) {
  const logoInnerRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const logoGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animación inicial del logo
    anime({
      targets: logoInnerRef.current,
      keyframes: [
        { rotateY: 0, scale: 0.3, opacity: 0 },
        { rotateY: 180, scale: 1.1, opacity: 1 },
        { rotateY: 360, scale: 1, opacity: 1 }
      ],
      duration: 2000,
      easing: 'easeInOutExpo',
      delay: 1200,
      complete: function() {
        startLoopAnimation();
      }
    });

    function startLoopAnimation() {
      // Rotación continua
      anime({
        targets: logoInnerRef.current,
        rotateY: '+=360',
        duration: 8000,
        easing: 'linear',
        loop: true
      });

      // Flotación vertical
      anime({
        targets: logoContainerRef.current,
        keyframes: [
          { translateY: 0 },
          { translateY: -25 },
          { translateY: 0 }
        ],
        duration: 5000,
        easing: 'easeInOutSine',
        loop: true
      });

      // Pulso del glow
      anime({
        targets: logoGlowRef.current,
        keyframes: [
          { opacity: 0, scale: 0.8 },
          { opacity: 0.6, scale: 1.3 },
          { opacity: 0, scale: 0.8 }
        ],
        duration: 3000,
        easing: 'easeInOutQuad',
        loop: true
      });
    }
  }, []);

  const handleRotate = () => {
    anime.remove(logoInnerRef.current);
    anime({
      targets: logoInnerRef.current,
      keyframes: [
        { rotateY: 180, rotateZ: 180, scale: 1.2 },
        { rotateY: 360, rotateZ: 360, scale: 1 }
      ],
      duration: 1500,
      easing: 'easeInOutExpo',
      complete: () => {
        setTimeout(() => {
          anime({
            targets: logoInnerRef.current,
            rotateY: '+=360',
            duration: 8000,
            easing: 'linear',
            loop: true
          });
        }, 500);
      }
    });
  };

  const handleBounce = () => {
    anime.remove(logoInnerRef.current);
    anime.remove(logoContainerRef.current);

    const timeline = anime.timeline({
      complete: () => {
        setTimeout(() => {
          anime({
            targets: logoInnerRef.current,
            rotateY: '+=360',
            duration: 8000,
            easing: 'linear',
            loop: true
          });
        }, 500);
      }
    });

    timeline
      .add({
        targets: logoContainerRef.current,
        keyframes: [
          { translateY: -120 },
          { translateY: 0 },
          { translateY: -60 },
          { translateY: 0 }
        ],
        duration: 1800,
        easing: 'easeOutElastic(1, .6)'
      })
      .add({
        targets: logoInnerRef.current,
        rotateY: '+=720',
        duration: 1800
      }, 0);
  };

  const handlePulse = () => {
    anime.remove(logoInnerRef.current);
    anime.remove(logoGlowRef.current);

    const timeline = anime.timeline({
      complete: () => {
        setTimeout(() => {
          anime({
            targets: logoInnerRef.current,
            rotateY: '+=360',
            duration: 8000,
            easing: 'linear',
            loop: true
          });
        }, 500);
      }
    });

    timeline
      .add({
        targets: logoInnerRef.current,
        keyframes: [
          { scale: 1.3 },
          { scale: 0.9 },
          { scale: 1.2 },
          { scale: 1 }
        ],
        duration: 1200,
        easing: 'easeInOutQuad'
      })
      .add({
        targets: logoGlowRef.current,
        keyframes: [
          { opacity: 0.8, scale: 1.5 },
          { opacity: 0, scale: 0.8 }
        ],
        duration: 800
      }, 0);
  };

  const handleFloat = () => {
    anime.remove(logoInnerRef.current);
    anime.remove(logoContainerRef.current);

    const timeline = anime.timeline({
      complete: () => {
        setTimeout(() => {
          anime({
            targets: logoInnerRef.current,
            rotateY: '+=360',
            duration: 8000,
            easing: 'linear',
            loop: true
          });
        }, 500);
      }
    });

    timeline
      .add({
        targets: logoContainerRef.current,
        keyframes: [
          { translateY: -40, translateX: 20 },
          { translateY: -80, translateX: -20 },
          { translateY: -40, translateX: 20 },
          { translateY: 0, translateX: 0 }
        ],
        duration: 3000,
        easing: 'easeInOutSine'
      })
      .add({
        targets: logoInnerRef.current,
        rotateY: '+=360',
        duration: 3000,
        easing: 'linear'
      }, 0);
  };

  return (
    <div className="relative flex items-center justify-center opacity-0" style={{ animation: 'fadeInUp 1s ease 0.6s forwards' }}>
      {/* Órbita decorativa */}
      <div 
        className="absolute border-2 border-dashed border-secondary-green/20 rounded-full"
        style={{
          width: '450px',
          height: '450px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'rotateOrbit 30s linear infinite'
        }}
      >
        <div 
          className="absolute w-3 h-3 bg-accent-green rounded-full top-0 left-1/2 -translate-x-1/2"
          style={{ boxShadow: '0 0 20px var(--color-accent-green)' }}
        ></div>
      </div>

      {/* Contenedor del logo */}
      <div 
        ref={logoContainerRef}
        className="relative"
        style={{ 
          width: '350px', 
          height: '350px',
          perspective: '1500px'
        }}
      >
        {/* Glow effect */}
        <div 
          ref={logoGlowRef}
          className="absolute inset-0 rounded-full opacity-0"
          style={{
            background: 'radial-gradient(circle, rgba(0, 168, 98, 0.4) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        ></div>

        {/* Logo inner */}
        <div 
          ref={logoInnerRef}
          className="w-full h-full relative flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <img 
            src={logoPath}
            alt="Logo DIRNAOPERPOL"
            className="w-full h-full object-contain"
            style={{ filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))' }}
          />
        </div>
      </div>
    </div>
  );
}
