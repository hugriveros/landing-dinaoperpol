import React, { useEffect, useRef } from 'react';

type Props = {
  baseUrl?: string;
};

export default function MapaChile({ baseUrl = '/' }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    let selectedRegion: Element | null = null;
    const listeners: Array<{ el: Element | Document; type: string; fn: EventListener }> = [];

    function ensureTrailingSlash(s: string) {
      return s.endsWith('/') ? s : `${s}/`;
    }

    async function loadSvg() {
      try {
        const base = ensureTrailingSlash(baseUrl || '/');
        const url = `${base}cl.svg`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`No se pudo cargar ${url}`);
        const svgText = await res.text();
        if (!mounted || !containerRef.current) return;

        containerRef.current.innerHTML = svgText;
        // ensure container is positioned so absolute tooltip can be placed inside
        try { (containerRef.current as HTMLDivElement).style.position = 'relative'; } catch (e) {}

        const svgEl = containerRef.current.querySelector('svg');
        if (!svgEl) return;

        // inject gradient defs to SVG so regions can use gradient fills
        const svgNS = 'http://www.w3.org/2000/svg';
        const defs = document.createElementNS(svgNS, 'defs');

        const makeLinear = (id: string, stop1: string, stop2: string) => {
          const g = document.createElementNS(svgNS, 'linearGradient');
          g.setAttribute('id', id);
          g.setAttribute('x1', '0%');
          g.setAttribute('y1', '0%');
          g.setAttribute('x2', '0%');
          g.setAttribute('y2', '100%');
          const s1 = document.createElementNS(svgNS, 'stop');
          s1.setAttribute('offset', '0%');
          s1.setAttribute('stop-color', stop1);
          const s2 = document.createElementNS(svgNS, 'stop');
          s2.setAttribute('offset', '100%');
          s2.setAttribute('stop-color', stop2);
          g.appendChild(s1);
          g.appendChild(s2);
          return g;
        };

        // colors: match page gradients
        const baseGrad = makeLinear('mapBaseGradient', '#1D7D4D', '#2AA06A');
        const hoverGrad = makeLinear('mapHoverGradient', '#2AA06A', '#39C57F');
        const selectedGrad = makeLinear('mapSelectedGradient', '#0B5E3A', '#07301F');
        defs.appendChild(baseGrad);
        defs.appendChild(hoverGrad);
        defs.appendChild(selectedGrad);
        svgEl.insertBefore(defs, svgEl.firstChild);

        // helpers to apply fills to groups and child shapes, and enable pointer events
        const applyFill = (el: Element, fill: string) => {
          try {
            const tag = (el as Element).tagName.toLowerCase();
            if (tag === 'g') {
              el.querySelectorAll('path, polygon, rect, circle, ellipse').forEach((child) => {
                try { (child as SVGElement).style.fill = fill; } catch (e) { /* ignore */ }
              });
            } else {
              try { (el as SVGElement).style.fill = fill; } catch (e) { /* ignore */ }
            }
          } catch (e) { /* ignore */ }
        };

        const enablePointer = (el: Element) => {
          try {
            (el as SVGElement).style.cursor = 'pointer';
            (el as SVGElement).style.pointerEvents = 'auto';
            if ((el as Element).tagName.toLowerCase() === 'g') {
              el.querySelectorAll('path, polygon, rect, circle, ellipse').forEach((child) => {
                try { (child as SVGElement).style.pointerEvents = 'auto'; } catch (e) { /* ignore */ }
              });
            }
          } catch (e) { /* ignore */ }
        };

        // overlays map: we create clones placed on top so we never move original nodes
        const overlays = new WeakMap<Element, Element>();

        // lista editable de datos por región (fácil de editar y mantener)
        // Estructura: id (código región), deaoperpoles (array con encargado, grado, anexo)
        const regionData: Array<{ id: string; deaoperpoles: Array<{ encargado: string; grado: string; anexo: string }> }> = [
          { id: 'CLAP', deaoperpoles: [{ encargado: 'Juan Pérez González', grado: 'Capitán', anexo: '1001' }] },
          { id: 'CLTA', deaoperpoles: [{ encargado: 'María Silva Rojas', grado: 'Teniente', anexo: '1002' }] },
          { id: 'CLAN', deaoperpoles: [{ encargado: 'Carlos Muñoz Torres', grado: 'Mayor', anexo: '1003' }] },
          { id: 'CLAT', deaoperpoles: [{ encargado: 'Ana Díaz Fernández', grado: 'Capitán', anexo: '1004' }] },
          { id: 'CLCO', deaoperpoles: [{ encargado: 'Luis Ramírez Castro', grado: 'Teniente Coronel', anexo: '1005' }] },
          { id: 'CLVS', deaoperpoles: [{ encargado: 'Patricia Soto Núñez', grado: 'Mayor', anexo: '1006' }] },
          { id: 'CLRM', deaoperpoles: [
            { encargado: 'Roberto Vargas Morales', grado: 'Coronel', anexo: '1007' },
            { encargado: 'Andrea Contreras Muñoz', grado: 'Teniente Coronel', anexo: '1008' },
            { encargado: 'Javier Campos Bravo', grado: 'Mayor', anexo: '1009' },
            { encargado: 'Carolina Prado Lagos', grado: 'Capitán', anexo: '1010' }
          ] },
          { id: 'CLLI', deaoperpoles: [{ encargado: 'Carmen Flores Castillo', grado: 'Capitán', anexo: '1011' }] },
          { id: 'CLML', deaoperpoles: [{ encargado: 'José Vega Pinto', grado: 'Mayor', anexo: '1012' }] },
          { id: 'CLNB', deaoperpoles: [{ encargado: 'Laura Herrera Bravo', grado: 'Teniente', anexo: '1013' }] },
          { id: 'CLBI', deaoperpoles: [{ encargado: 'Fernando Reyes Guzmán', grado: 'Teniente Coronel', anexo: '1014' }] },
          { id: 'CLAR', deaoperpoles: [{ encargado: 'Mónica Valdés Jiménez', grado: 'Mayor', anexo: '1015' }] },
          { id: 'CLLR', deaoperpoles: [{ encargado: 'Diego Fuentes Paredes', grado: 'Capitán', anexo: '1016' }] },
          { id: 'CLLL', deaoperpoles: [{ encargado: 'Sofía Navarro Ponce', grado: 'Teniente Coronel', anexo: '1017' }] },
          { id: 'CLAI', deaoperpoles: [{ encargado: 'Andrés Medina Ortiz', grado: 'Mayor', anexo: '1018' }] },
          { id: 'CLMA', deaoperpoles: [{ encargado: 'Claudia Rojas Espinoza', grado: 'Capitán', anexo: '1019' }] },
        ];

        // create tooltip element (hidden by default)
        try {
          const tip = document.createElement('div');
          tip.className = 'map-tooltip';
          tip.style.position = 'absolute';
          tip.style.pointerEvents = 'none';
          tip.style.opacity = '0';
          tip.style.transition = 'opacity .12s ease, transform .12s ease';
          containerRef.current?.appendChild(tip);
          tooltipRef.current = tip;
        } catch (e) { /* ignore */ }

        const makeOverlay = (region: Element, cls?: string, fill?: string) => {
          try {
            if (overlays.has(region)) return overlays.get(region) as Element;
            const clone = region.cloneNode(true) as Element;
            clone.classList.add('region', 'overlay');
            if (cls) clone.classList.add(cls);
            try { (clone as SVGElement).style.pointerEvents = 'none'; } catch (e) {}
            if (fill) applyFill(clone, fill);
            svgEl.appendChild(clone);
            overlays.set(region, clone);
            return clone;
          } catch (e) {
            return null as unknown as Element;
          }
        };

        const removeOverlay = (region: Element) => {
          try {
            const ov = overlays.get(region);
            if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
            overlays.delete(region);
          } catch (e) { /* ignore */ }
        };

        const deselectCurrent = () => {
          if (!selectedRegion) return;
          try {
            applyFill(selectedRegion, 'url(#mapBaseGradient)');
            (selectedRegion as Element).classList.remove('selected');
            try { (selectedRegion as SVGElement).style.stroke = ''; (selectedRegion as SVGElement).style.strokeWidth = ''; (selectedRegion as SVGElement).style.filter = ''; } catch (e) {}
            // remove any overlay clone for the selected region
            try { removeOverlay(selectedRegion); } catch (e) { /* ignore */ }
          } catch (e) { /* ignore */ }
          selectedRegion = null;
        };

        // target only explicit region shapes inside the features group (id starts with CL)
        const featuresGroup = svgEl.querySelector('#features') || svgEl;
        const regions = featuresGroup.querySelectorAll('path[id^="CL"], polygon[id^="CL"], rect[id^="CL"]');
        regions.forEach((region) => {
          if (!region.classList.contains('region')) region.classList.add('region');

          // enable pointer and apply gradient base fill on the exact shape
          enablePointer(region);
          applyFill(region, 'url(#mapBaseGradient)');

          const getName = () => region.getAttribute('data-name') || region.getAttribute('name') || region.id || 'Región';

          // accessibility attributes
          try {
            const nameAttr = getName();
            region.setAttribute('role', 'button');
            region.setAttribute('aria-label', nameAttr);
            region.setAttribute('tabindex', '0');
          } catch (e) { /* ignore */ }

          const onClick = (e: Event) => {
            e.preventDefault();
            // ensure doc-level click doesn't immediately deselect
            try { (e as Event & { stopPropagation?: () => void }).stopPropagation?.(); } catch (er) {}

            // toggle deselect if clicking the already selected region
            if (selectedRegion === region) {
              deselectCurrent();
              return;
            }

            // reset previous selection (keep its fill) and remove its overlay
            if (selectedRegion && selectedRegion !== region) {
              try { (selectedRegion as Element).classList.remove('selected'); } catch (e) {}
              applyFill(selectedRegion, 'url(#mapBaseGradient)');
              try {
                (selectedRegion as SVGElement).style.stroke = '';
                (selectedRegion as SVGElement).style.strokeWidth = '';
                (selectedRegion as SVGElement).style.filter = '';
              } catch (err) { /* ignore */ }
              try { removeOverlay(selectedRegion); } catch (e) { /* ignore */ }
            }

            // select current shape
            try { (region as Element).classList.add('selected'); } catch (e) {}
            applyFill(region, 'url(#mapBaseGradient)');
            try {
              (region as SVGElement).style.stroke = '#093f2a';
              (region as SVGElement).style.strokeWidth = '1.8';
              (region as SVGElement).style.filter = 'drop-shadow(0 10px 30px rgba(3,80,47,0.18))';
            } catch (err) { /* ignore */ }

            // create a selected overlay clone so the visual stays on top without moving originals
            try { makeOverlay(region, 'selected', 'url(#mapSelectedGradient)'); } catch (err) { /* ignore */ }

            selectedRegion = region;
          };

          const onEnter = (ev: Event) => {
            // create hover overlay clone (visual on top)
            try { const ov = makeOverlay(region, undefined, 'url(#mapHoverGradient)'); if (ov) ov.classList.add('raised'); } catch (e) { /* ignore */ }
            try { region.classList.add('raised'); } catch (e) {}
            if (!region.classList.contains('selected')) {
              applyFill(region, 'url(#mapBaseGradient)');
            }
            // show tooltip to the side of cursor with extended info (grado + encargado + anexo)
            try {
              const me = ev as MouseEvent;
              const tip = tooltipRef.current;
              if (tip) {
                const id = region.id || '';
                const meta = regionData.find((r) => r.id === id);
                const regionName = getName();
                const fullTitle = `Deaoperpol Region ${regionName}`;
                
                let content = `<div class="tt-title">${fullTitle}</div>`;
                if (meta && meta.deaoperpoles.length > 0) {
                  meta.deaoperpoles.forEach((deao, idx) => {
                    content += `<div class="tt-enc">${deao.grado} ${deao.encargado}</div><div class="tt-anexo">Anexo: ${deao.anexo}</div>`;
                    if (idx < meta.deaoperpoles.length - 1) {
                      content += `<div class="tt-separator"></div>`;
                    }
                  });
                } else {
                  content += `<div class="tt-enc">Sin asignar</div>`;
                }
                
                tip.innerHTML = content;
                const contRect = containerRef.current!.getBoundingClientRect();
                const x = me.clientX - contRect.left;
                const y = me.clientY - contRect.top;
                // position based on screen size: above cursor on mobile, to the right on desktop
                const isMobile = window.innerWidth <= 640;
                if (isMobile) {
                  tip.style.left = `${x}px`;
                  tip.style.top = `${y - 80}px`;
                  tip.style.transform = 'translateX(-50%) translateY(0) scale(1)';
                } else {
                  tip.style.left = `${x + 35}px`;
                  tip.style.top = `${y - 40}px`;
                  tip.style.transform = 'translateY(-50%) scale(1)';
                }
                tip.style.opacity = '1';
              }
            } catch (e) { /* ignore */ }
          };

          const onMove = (ev: Event) => {
            try {
              const me = ev as MouseEvent;
              const tip = tooltipRef.current;
              if (tip && containerRef.current) {
                const contRect = containerRef.current.getBoundingClientRect();
                const x = me.clientX - contRect.left;
                const y = me.clientY - contRect.top;
                // position based on screen size: above cursor on mobile, to the right on desktop
                const isMobile = window.innerWidth <= 640;
                if (isMobile) {
                  tip.style.left = `${x}px`;
                  tip.style.top = `${y - 80}px`;
                } else {
                  tip.style.left = `${x + 35}px`;
                  tip.style.top = `${y - 40}px`;
                }
              }
            } catch (e) { /* ignore */ }
          };

          const onLeave = () => {
            // remove hover overlay and restore visuals
            try { removeOverlay(region); } catch (e) { /* ignore */ }
            try { region.classList.remove('raised'); } catch (e) {}

            // hide tooltip
            try {
              const tip = tooltipRef.current;
              if (tip) {
                tip.style.opacity = '0';
                const isMobile = window.innerWidth <= 640;
                if (isMobile) {
                  tip.style.transform = 'translateX(-50%) translateY(0) scale(0.95)';
                } else {
                  tip.style.transform = 'translateY(-50%) scale(0.95)';
                }
              }
            } catch (e) { /* ignore */ }

            if (!region.classList.contains('selected')) {
              applyFill(region, 'url(#mapBaseGradient)');
            }
          };

          region.addEventListener('click', onClick as EventListener);
          region.addEventListener('mouseenter', onEnter as EventListener);
          region.addEventListener('mousemove', onMove as EventListener);
          region.addEventListener('mouseleave', onLeave as EventListener);

          // keyboard activation for accessibility
          const onKeyRegion = (kev: KeyboardEvent) => {
            if (kev.key === 'Enter' || kev.key === ' ') {
              onClick(kev as unknown as Event);
            }
          };
          region.addEventListener('keydown', onKeyRegion as EventListener);

          listeners.push({ el: region, type: 'click', fn: onClick as EventListener });
          listeners.push({ el: region, type: 'mouseenter', fn: onEnter as EventListener });
          listeners.push({ el: region, type: 'mousemove', fn: onMove as EventListener });
          listeners.push({ el: region, type: 'mouseleave', fn: onLeave as EventListener });
          listeners.push({ el: region, type: 'keydown', fn: onKeyRegion as EventListener });
        });

        // click outside to deselect
        const onDocClick = (ev: Event) => {
          const t = ev.target as Element | null;
          if (!t) return;
          // if clicked a region shape, ignore (region handler stops propagation)
          if (t.closest && t.closest('path[id^="CL"], polygon[id^="CL"], rect[id^="CL"]')) return;
          deselectCurrent();
        };
        document.addEventListener('click', onDocClick);
        listeners.push({ el: document, type: 'click', fn: onDocClick });

        const onKey = (ev: KeyboardEvent) => {
          if (ev.key === 'Escape' && selectedRegion) {
            applyFill(selectedRegion, 'url(#mapBaseGradient)');
            try {
              (selectedRegion as SVGElement).style.stroke = '';
              (selectedRegion as SVGElement).style.strokeWidth = '';
            } catch (e) { /* ignore */ }
            selectedRegion.classList.remove('selected');
            selectedRegion = null;
          }
        };

        document.addEventListener('keydown', onKey);
        listeners.push({ el: document, type: 'keydown', fn: onKey });
      } catch (err) {
        // solo log
        // eslint-disable-next-line no-console
        console.error('MapaChile:', err);
      }
    }

    loadSvg();

    return () => {
      mounted = false;
      // remove listeners
      listeners.forEach(({ el, type, fn }) => {
        try {
          (el as Element | Document).removeEventListener(type, fn);
        } catch (e) {
          /* ignore */
        }
      });
      // cleanup classes
      const svgContainer = containerRef.current;
      if (svgContainer) {
        const svgEl = svgContainer.querySelector('svg');
        if (svgEl) {
          const featuresGroup = svgEl.querySelector('#features') || svgEl;
          const regions = featuresGroup.querySelectorAll('path[id^="CL"], polygon[id^="CL"], rect[id^="CL"]');
          regions.forEach((region) => {
            region.classList.remove('region', 'selected', 'raised');
          });
        }
        svgContainer.innerHTML = '';
      }
    };
  }, [baseUrl]);

  return (
    <div className="p-3 sm:p-6 rounded-xl bg-white transition-all duration-300 animate-fade-in-up w-full max-w-[98%] sm:max-w-[95%] mx-auto my-12 overflow-x-hidden">
      <div className="text-center mb-4 sm:mb-8">
        <p className="text-sm font-semibold text-secondary-green uppercase tracking-wider mb-2">
          COBERTURA NACIONAL
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
          Nuestros DEAOPERPOLES
        </h2>
      </div>

      <div ref={containerRef} id="map-svg-container" className="w-full h-auto flex justify-center relative"></div>

      <style>{`
        /* SVG responsivo y sombra más suave */
        #map-svg-container { display:flex; justify-content:center; align-items:center; position: relative; overflow: visible; }
        #map-svg-container svg { width: 150%; max-width: 2200px; height: auto; filter: drop-shadow(0 24px 48px rgba(2,6,23,0.10)); border-radius: 12px; overflow: visible; transition: transform .25s ease; }
        
        /* En móvil, hacer el mapa mucho más grande pero ocultar desbordamiento horizontal del SVG */
        @media (max-width: 640px) {
          #map-svg-container { padding: 0.5rem 0; }
          #map-svg-container svg { width: 400%; max-width: 400%; margin: 0 auto; clip-path: inset(0); }
        }

        /* Transiciones y comportamiento de regiones (no sobrescribimos fills de gradiente) */
        .region { cursor: pointer; transition: transform .22s ease, filter .18s ease; vector-effect: non-scaling-stroke; }
        .region path, .region polygon, .region rect, .region circle, .region ellipse { transition: fill .22s ease, transform .18s ease; transform-origin: center; }

        /* Hover: elevación y sombra sutil; .raised se controla por JS para poder traer al frente */
        .region.raised { transform: translateY(-8px) scale(1.02); filter: drop-shadow(0 10px 26px rgba(3,80,47,0.14)); }
        .region:focus { outline: none; transform: translateY(-8px) scale(1.02); }

        /* overlays: clones placed above originals; don't capture pointer events */
        .overlay { pointer-events: none; transition: transform .22s ease, filter .18s ease; }

        /* tooltip - tema oscuro */
        .map-tooltip { background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%); color: #e0e0e0; padding: .7rem .9rem; border-radius: .6rem; font-weight:600; font-size: .9rem; box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08); white-space: normal; text-align:left; transform: translateY(-50%) scale(0.95); min-width: 240px; backdrop-filter: blur(12px); z-index: 9999; }
        .map-tooltip .tt-title { font-weight: 700; margin-bottom: .4rem; font-size: .85rem; text-transform: uppercase; letter-spacing: .5px; color: #4ade80; border-bottom: 1px solid rgba(74,222,128,0.25); padding-bottom: .35rem; }
        .map-tooltip .tt-enc { font-weight: 600; font-size: .88rem; opacity: .95; margin-bottom: .25rem; color: #f0f0f0; }
        .map-tooltip .tt-anexo { font-size: .75rem; opacity: .85; margin-top: .25rem; margin-bottom: .3rem; color: #a0a0a0; }
        .map-tooltip .tt-separator { height: 1px; background: rgba(255,255,255,0.1); margin: .5rem 0; }

        /* Selección: mayor énfasis sin cambiar el fill (se mantiene el gradiente). Se usa stroke y sombra extras */
        .region.selected { stroke: #093f2a !important; stroke-width: 1.8 !important; filter: drop-shadow(0 10px 30px rgba(3,80,47,0.18)); }

        /* Pequeños ajustes de accesibilidad visual */
        .region[tabindex]:focus-visible { outline: 3px solid rgba(29,125,77,0.18); outline-offset: 3px; }
      `}</style>
    </div>
  );
}
