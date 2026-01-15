import React from 'react';
import AnimeBasicTransforms from './AnimeBasicTransforms';
import AnimeStaggerEffects from './AnimeStaggerEffects';
import AnimeSVGMorphing from './AnimeSVGMorphing';
import AnimeTimeline from './AnimeTimeline';
import AnimeScrollTrigger from './AnimeScrollTrigger';
import AnimeInteractive from './AnimeInteractive';
import AnimeKeyframes from './AnimeKeyframes';
import AnimeMotionPath from './AnimeMotionPath';
import AnimeTextEffects from './AnimeTextEffects';
import AnimeParticles from './AnimeParticles';
import AnimeMorphing from './AnimeMorphing';
import AnimeOrganigrama from '../AnimeOrganigrama';

export default function AnimeDemoSuite() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Anime.js - Suite de Demos Profesionales
        </h1>
        <p className="text-lg text-gray-600">
          Ejemplos avanzados de animación usando recursos del sitio web
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {/* Fila 1: Básicos y Stagger */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimeBasicTransforms />
          <AnimeStaggerEffects />
        </div>

        {/* Fila 2: SVG y Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimeSVGMorphing />
          <AnimeTimeline />
        </div>

        {/* Fila 3: Scroll e Interactivos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimeScrollTrigger />
          <AnimeInteractive />
        </div>

        {/* Fila 4: Keyframes y Motion Path */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimeKeyframes />
          <AnimeMotionPath />
        </div>

        {/* Fila 5: Texto y Partículas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimeTextEffects />
          <AnimeParticles />
        </div>

        {/* Fila 6: Morphing (full width) */}
        <AnimeMorphing />

        {/* Fila 7: Organigrama Interactivo (full width) */}
        <AnimeOrganigrama />
      </div>

      <footer className="text-center mt-12 p-6 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">
          Todos los ejemplos utilizan recursos multimedia del proyecto: logo_carabineros.svg, crayon.svg, hero_director.png
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Powered by anime.js v3.2.2
        </p>
      </footer>
    </div>
  );
}
