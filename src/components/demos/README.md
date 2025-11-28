# Anime.js Demo Suite - DINAOPERPOL

Suite completa de ejemplos profesionales de anime.js usando recursos multimedia del proyecto.

## 📁 Estructura de Componentes

Todos los componentes de demostración están en `src/components/demos/`:

### 1. **AnimeBasicTransforms.tsx**
- Transformaciones básicas: translate, scale, rotate, opacity
- Entrada elástica con hero_director.png
- Rotación continua con logo_carabineros.svg
- **Técnicas:** easeOutElastic, transform combinations, loop

### 2. **AnimeStaggerEffects.tsx**
- Grid stagger con efecto de onda desde el centro
- Stagger secuencial de imágenes
- **Técnicas:** anime.stagger(), grid stagger, from: 'center', direction: 'alternate'

### 3. **AnimeSVGMorphing.tsx**
- Stroke drawing del logo_carabineros.svg
- Stroke + fill animation del crayon.svg
- **Técnicas:** getTotalLength(), strokeDasharray, strokeDashoffset, timeline

### 4. **AnimeTimeline.tsx**
- Timeline compleja con múltiples elementos
- Control play/pause interactivo
- Sincronización precisa con offsets negativos
- **Técnicas:** anime.timeline(), autoplay control, relative offsets ('-=500')

### 5. **AnimeScrollTrigger.tsx**
- Animaciones activadas por scroll
- IntersectionObserver integration
- Tres secciones con efectos distintos
- **Técnicas:** IntersectionObserver API, threshold, rootMargin

### 6. **AnimeInteractive.tsx**
- Hover effects con elasticidad
- Click animations con rotación
- Drag & drop con feedback visual
- **Técnicas:** event handlers, easeOutElastic, user interaction

### 7. **AnimeKeyframes.tsx**
- Keyframes multi-property
- Property-specific durations
- Secuencias complejas de transformación
- **Técnicas:** keyframes array, property-specific timing

### 8. **AnimeMotionPath.tsx**
- Motion path siguiendo SVG paths
- Rotación automática según ángulo del path
- Múltiples elementos en diferentes paths
- **Técnicas:** anime.path(), SVG path following, angle rotation

### 9. **AnimeTextEffects.tsx**
- Letter-by-letter animation
- Word scale effects
- Wave effect con caracteres
- Contador animado
- **Técnicas:** text splitting, stagger, value animation

### 10. **AnimeParticles.tsx**
- Sistema de partículas con explosión radial
- Colores aleatorios
- Scale y opacity dinámicos
- **Técnicas:** dynamic DOM creation, anime.random(), particle systems

### 11. **AnimeMorphing.tsx**
- Morphing entre formas geométricas SVG
- Cambio de color sincronizado
- Estado actual visible
- **Técnicas:** SVG path morphing, d attribute animation, fill animation

## 🎨 Recursos Multimedia Utilizados

- `logo_carabineros.svg` - Logo institucional
- `crayon.svg` - Elemento decorativo
- `hero_director.png` - Imagen del director

## 🚀 Cómo Usar

### Ver los demos
```bash
pnpm dev
```

Navega a: `http://localhost:4321/demo`

### Importar componentes individuales
```tsx
import AnimeBasicTransforms from './components/demos/AnimeBasicTransforms';

function MyPage() {
  return <AnimeBasicTransforms />;
}
```

### Importar la suite completa
```tsx
import AnimeDemoSuite from './components/demos/AnimeDemoSuite';

function DemoPage() {
  return <AnimeDemoSuite />;
}
```

## 🛠️ Técnicas Avanzadas Implementadas

1. **Easing Functions**
   - easeOutElastic, easeOutBounce, easeInOutQuad, easeOutExpo, easeInOutSine

2. **Stagger Effects**
   - anime.stagger() con grid
   - from: 'center', 'first', 'last'
   - custom delays

3. **Timeline Control**
   - autoplay: false
   - play/pause programático
   - relative offsets
   - labels y callbacks

4. **SVG Animations**
   - Stroke drawing
   - Path morphing
   - Fill animations
   - Motion paths

5. **Interactividad**
   - IntersectionObserver
   - Event handlers
   - User-triggered animations
   - State management

6. **Performance**
   - Cleanup en useEffect
   - anime.remove() para memory leaks
   - Conditional rendering

## 📊 Compatibilidad

- React 18+
- anime.js 3.2.2
- TypeScript
- Tailwind CSS

## 🎯 Aplicaciones en el Sitio Web

Estos ejemplos pueden aplicarse directamente a:
- Hero section (transforms, timeline)
- Galería de imágenes (stagger, scroll trigger)
- Formularios (interactive, text effects)
- Loading states (particles, morphing)
- Secciones informativas (SVG animations)

## 📝 Notas de Implementación

- Todos los componentes usan `useEffect` con cleanup
- SVGs se cargan dinámicamente con fetch
- Responsive design con Tailwind
- Accesibilidad: aria-hidden en elementos decorativos
- Performance: animaciones con requestAnimationFrame de anime.js
