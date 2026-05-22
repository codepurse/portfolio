import { useRef, useEffect } from 'react';

export default function FloatingShapes({ className = '' }) {
  const containerRef = useRef(null);
  const xCoordRef = useRef(null);
  const yCoordRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update high-performance CSS custom properties
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);

      // Calculate parallax offsets based on mouse position relative to center (extremely subtle now)
      const parallaxX = (x / rect.width - 0.5) * 12; // Subtle 12px shift max
      const parallaxY = (y / rect.height - 0.5) * 12;
      containerRef.current.style.setProperty('--parallax-x', `${parallaxX}px`);
      containerRef.current.style.setProperty('--parallax-y', `${parallaxY}px`);

      // Update text directly at 60fps to bypass React re-renders
      if (xCoordRef.current) xCoordRef.current.textContent = `X: ${x.toFixed(1)}`;
      if (yCoordRef.current) yCoordRef.current.textContent = `Y: ${y.toFixed(1)}`;
    };

    globalThis.addEventListener('mousemove', handleMouseMove);
    return () => globalThis.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`blueprint-container ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
        '--mouse-x': '0px',
        '--mouse-y': '0px',
        '--parallax-x': '0px',
        '--parallax-y': '0px',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        /* The structural grid background */
        .blueprint-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(28, 25, 23, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(28, 25, 23, 0.02) 1px, transparent 1px);
          background-size: 80px 80px;
          background-position: center;
          opacity: 0.85;
        }

        /* Minor subgrid division */
        .blueprint-subgrid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(28, 25, 23, 0.01) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(28, 25, 23, 0.01) 1px, transparent 1px);
          background-size: 20px 20px;
          background-position: center;
          opacity: 0.5;
        }

        /* Infinite rotating compass lines in background */
        .blueprint-axis-cross {
          position: absolute;
          top: 30%;
          left: 45%;
          width: 600px;
          height: 600px;
          translate: -50% -50%;
          opacity: 0.04;
          pointer-events: none;
          transform: rotate(15deg);
          animation: blueprint-spin 180s linear infinite;
        }

        /* Mouse-reactive blueprint ruler guides */
        .blueprint-ruler-v {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 1px;
          border-left: 1px dashed rgba(125, 78, 91, 0.08);
          transform: translateX(var(--mouse-x));
          will-change: transform;
        }
        .blueprint-ruler-h {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 1px;
          border-top: 1px dashed rgba(125, 78, 91, 0.08);
          transform: translateY(var(--mouse-y));
          will-change: transform;
        }

        /* Real-time coordinate tag */
        .blueprint-tag {
          position: absolute;
          top: 0;
          left: 0;
          transform: translate(calc(var(--mouse-x) + 20px), calc(var(--mouse-y) + 20px));
          will-change: transform;
          background: rgba(245, 243, 239, 0.9);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(28, 25, 23, 0.08);
          padding: 6px 12px;
          border-radius: 4px;
          font-family: var(--f-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          color: var(--accent);
          display: flex;
          flex-direction: column;
          gap: 2px;
          box-shadow: 0 4px 12px rgba(28, 25, 23, 0.04);
        }

        @keyframes blueprint-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Standard line drawing animation */
        @keyframes blueprint-draw-in {
          0% {
            stroke-dashoffset: var(--dash-size, 1000);
          }
          30% {
            stroke-dashoffset: 0;
          }
          70% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: var(--dash-size, 1000);
          }
        }

        /* Floating blueprint object card */
        .blueprint-object {
          position: absolute;
          pointer-events: auto; /* Allow hovering */
          color: rgba(28, 25, 23, 0.14);
          transition: color 0.45s cubic-bezier(0.25, 1, 0.5, 1), transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
          transform: translate(var(--parallax-x), var(--parallax-y));
          will-change: transform;
        }
        
        .blueprint-object:hover {
          color: var(--accent);
          z-index: 10;
        }

        /* Vector lines with animated drawing behavior */
        .draw-path {
          stroke-dasharray: var(--dash-size, 1000);
          stroke-dashoffset: var(--dash-size, 1000);
          animation: blueprint-draw-in var(--draw-speed, 12s) cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        /* Annotations fade-in as lines complete drawing */
        @keyframes blueprint-text-fade {
          0%, 100% { opacity: 0; }
          25%, 75% { opacity: var(--target-opacity, 0.6); }
        }
        .draw-text {
          animation: blueprint-text-fade var(--draw-speed, 12s) cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      ` }} />

      {/* Grid Backdrops */}
      <div className="blueprint-grid" />
      <div className="blueprint-subgrid" />

      {/* Rotating Background Compass */}
      <svg className="blueprint-axis-cross" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.1">
        <circle cx="50" cy="50" r="48" strokeDasharray="1 3" />
        <circle cx="50" cy="50" r="36" />
        <circle cx="50" cy="50" r="24" strokeDasharray="4 8" />
        <line x1="50" y1="0" x2="50" y2="100" />
        <line x1="0" y1="50" x2="100" y2="50" />
        <line x1="15" y1="15" x2="85" y2="85" />
        <line x1="85" y1="15" x2="15" y2="85" />
      </svg>

      {/* Cursor Guides */}
      <div className="blueprint-ruler-v" />
      <div className="blueprint-ruler-h" />

      {/* Live Coordinates Label */}
      <div className="blueprint-tag">
        <span style={{ fontWeight: 600, color: 'var(--ink)' }}>SYS // ENGINE_ACTIVE</span>
        <span ref={xCoordRef}>X: 0.0</span>
        <span ref={yCoordRef}>Y: 0.0</span>
      </div>

      {/* OBJECT 1: The Golden Ratio Spiral (Top-Left) */}
      <div
        className="blueprint-object"
        style={{
          top: '25%',
          left: '12%',
          width: '260px',
          height: '180px',
          '--parallax-factor': 0.35,
        }}
      >
        <svg viewBox="0 0 260 180" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Fibonacci Grid - subtle static background */}
          <rect x="0" y="0" width="260" height="160" strokeDasharray="2 2" opacity="0.3" />
          <line x1="160" y1="0" x2="160" y2="160" opacity="0.4" />
          <line x1="160" y1="100" x2="260" y2="100" opacity="0.4" />
          <line x1="220" y1="100" x2="220" y2="160" opacity="0.4" />
          <line x1="160" y1="138" x2="220" y2="138" opacity="0.4" />
          
          {/* Golden Spiral Path - Animates Drawing */}
          <path 
            d="M 220,138 A 22,22 0 0,1 220,160 A 60,60 0 0,1 160,100 A 100,100 0 0,1 260,100 A 160,160 0 0,1 160,160 A 260,260 0 0,1 0,0" 
            strokeWidth="1.5" 
            className="draw-path"
            style={{ '--dash-size': '1100', '--draw-speed': '10s' }}
          />

          {/* Annotations - Fades in sync with drawing */}
          <g className="draw-text" style={{ '--draw-speed': '10s', '--target-opacity': '0.6' }}>
            <text x="10" y="20" fontSize="8" fontFamily="var(--f-mono)" fill="currentColor">FIBONACCI SPIRAL // GOLDEN φ</text>
            <text x="10" y="152" fontSize="9" fontFamily="var(--f-serif)" fontStyle="italic" fill="currentColor">a / b = 1.618</text>
          </g>
          
          {/* Dimensional ticks */}
          <line x1="0" y1="172" x2="260" y2="172" stroke="currentColor" opacity="0.3" />
          <line x1="0" y1="168" x2="0" y2="176" stroke="currentColor" opacity="0.4" />
          <line x1="260" y1="168" x2="260" y2="176" stroke="currentColor" opacity="0.4" />
          <text x="112" y="170" fontSize="7" fontFamily="var(--f-mono)" fill="currentColor" opacity="0.5">DIM: 260.00px</text>
        </svg>
      </div>

      {/* OBJECT 2: Bento Grid Layout Wireframe (Top-Right) */}
      <div
        className="blueprint-object"
        style={{
          top: '18%',
          right: '8%',
          width: '240px',
          height: '200px',
          '--parallax-factor': 0.6,
        }}
      >
        <svg viewBox="0 0 240 200" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Wireframe columns - Animated Drawing */}
          <rect 
            x="0" 
            y="0" 
            width="240" 
            height="170" 
            rx="4" 
            className="draw-path"
            style={{ '--dash-size': '820', '--draw-speed': '12s' }}
          />
          <rect x="10" y="10" width="105" height="70" rx="2" strokeDasharray="1 1" opacity="0.5" />
          <rect x="125" y="10" width="105" height="150" rx="2" strokeDasharray="1 1" opacity="0.5" />
          <rect x="10" y="90" width="105" height="70" rx="2" strokeDasharray="1 1" opacity="0.5" />

          {/* Alignment ticks */}
          <line x1="62" y1="0" x2="62" y2="170" strokeDasharray="2 4" opacity="0.3" />
          <line x1="177" y1="0" x2="177" y2="170" strokeDasharray="2 4" opacity="0.3" />

          {/* Labels */}
          <g className="draw-text" style={{ '--draw-speed': '12s', '--target-opacity': '0.8' }}>
            <text x="15" y="30" fontSize="7" fontFamily="var(--f-mono)" fill="currentColor">W_FRM: CARD_01</text>
            <text x="130" y="30" fontSize="7" fontFamily="var(--f-mono)" fill="currentColor">W_FRM: DENSE_T_02</text>
            <text x="10" y="185" fontSize="8" fontFamily="var(--f-mono)" fill="currentColor">BENTO PARTITION // FLX_G: 1</text>
          </g>
        </svg>
      </div>

      {/* OBJECT 3: Vector Bezier Path Spline (Bottom-Left) */}
      <div
        className="blueprint-object"
        style={{
          bottom: '15%',
          left: '18%',
          width: '280px',
          height: '160px',
          '--parallax-factor': 0.45,
        }}
      >
        <svg viewBox="0 0 280 160" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Curve spline - Animated Drawing */}
          <path 
            d="M 20,110 C 80,10 200,150 260,50" 
            strokeWidth="1.5" 
            className="draw-path"
            style={{ '--dash-size': '380', '--draw-speed': '8s' }}
          />

          {/* Anchor Points */}
          <rect x="17" y="107" width="6" height="6" fill="var(--paper)" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
          <rect x="257" y="47" width="6" height="6" fill="var(--paper)" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
          
          {/* Control points */}
          <circle cx="80" cy="10" r="3" fill="currentColor" opacity="0.5" />
          <circle cx="200" cy="150" r="3" fill="currentColor" opacity="0.5" />
          
          {/* Handle Lines */}
          <line x1="20" y1="110" x2="80" y2="10" strokeDasharray="2 2" opacity="0.4" />
          <line x1="260" y1="50" x2="200" y2="150" strokeDasharray="2 2" opacity="0.4" />

          {/* Annotation text */}
          <g className="draw-text" style={{ '--draw-speed': '8s', '--target-opacity': '0.8' }}>
            <text x="25" y="125" fontSize="8" fontFamily="var(--f-mono)" fill="currentColor">P0 (20, 110)</text>
            <text x="200" y="30" fontSize="8" fontFamily="var(--f-mono)" fill="currentColor">P1 [HANDLE] (80, 10)</text>
            <text x="120" y="150" fontSize="8" fontFamily="var(--f-mono)" fill="currentColor">VECTOR SPLINE // BEZIER_C</text>
          </g>
        </svg>
      </div>

      {/* OBJECT 4: Proportion Wheel & Compass Arch (Bottom-Right) */}
      <div
        className="blueprint-object"
        style={{
          bottom: '22%',
          right: '15%',
          width: '200px',
          height: '200px',
          '--parallax-factor': 0.8,
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Compass layout circles - Animated Drawing */}
          <circle 
            cx="100" 
            cy="100" 
            r="80" 
            className="draw-path"
            style={{ '--dash-size': '510', '--draw-speed': '14s' }}
          />
          <circle cx="100" cy="100" r="50" strokeDasharray="3 3" opacity="0.4" />
          <circle cx="100" cy="100" r="20" opacity="0.5" />
          
          {/* Angles */}
          <line x1="100" y1="20" x2="100" y2="180" opacity="0.4" />
          <line x1="20" y1="100" x2="180" y2="100" opacity="0.4" />
          <line x1="43.4" y1="43.4" x2="156.6" y2="156.6" strokeDasharray="4 4" opacity="0.3" />
          
          {/* Triangle of proportions */}
          <polygon points="100,100 156.6,156.6 156.6,100" opacity="0.3" />
          
          {/* Annotations */}
          <g className="draw-text" style={{ '--draw-speed': '14s', '--target-opacity': '0.8' }}>
            <text x="105" y="85" fontSize="7" fontFamily="var(--f-mono)" fill="currentColor">R: 80.0px</text>
            <text x="105" y="115" fontSize="7" fontFamily="var(--f-mono)" fill="currentColor">θ: 45.0°</text>
            <text x="12" y="15" fontSize="8" fontFamily="var(--f-mono)" fill="currentColor">PROPORTION WHEEL // 360°_ALIGN</text>
          </g>
        </svg>
      </div>
    </div>
  );
}