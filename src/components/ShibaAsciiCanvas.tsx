import React, { useEffect, useRef, useState } from 'react';

interface ShibaAsciiCanvasProps {
  theme?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ShibaAsciiCanvas: React.FC<ShibaAsciiCanvasProps> = ({
  theme = 'light',
  className = '',
  size = 'lg',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [barkMessage, setBarkMessage] = useState<string | null>(null);
  const [visualMode, setVisualMode] = useState<'scanline' | 'ascii' | 'glitch'>('scanline');
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -100, y: -100, active: false });
  const animFrameRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  // Shiba Inu geometric silhouette definition normalized to [0, 1] x [0, 1]
  // Generates whether a normalized coordinate (nx, ny) is inside the Shiba Inu body
  const isInsideShiba = (nx: number, ny: number): { inside: boolean; type?: 'body' | 'ear' | 'eye' | 'snout' | 'tail' | 'collar' } => {
    // Canvas bounds: x in [0.15, 0.85], y in [0.08, 0.92]
    
    // 1. Left Ear: triangle roughly (0.34, 0.10) to (0.28, 0.28) and (0.42, 0.24)
    const inLeftEar = (
      nx >= 0.28 && nx <= 0.44 &&
      ny >= 0.10 && ny <= 0.30 &&
      ny >= 0.10 + (0.34 - nx) * 2.8 &&
      ny >= 0.10 + (nx - 0.34) * 1.9
    );

    // Left inner ear cutout (negative space / lighter)
    const inLeftInnerEar = inLeftEar && (
      nx >= 0.31 && nx <= 0.39 && ny >= 0.15 && ny <= 0.26
    );

    // 2. Right Ear: triangle roughly (0.64, 0.09) to (0.55, 0.23) and (0.72, 0.27)
    const inRightEar = (
      nx >= 0.54 && nx <= 0.72 &&
      ny >= 0.09 && ny <= 0.29 &&
      ny >= 0.09 + (0.64 - nx) * 1.9 &&
      ny >= 0.09 + (nx - 0.64) * 2.6
    );

    // Right inner ear cutout
    const inRightInnerEar = inRightEar && (
      nx >= 0.59 && nx <= 0.67 && ny >= 0.14 && ny <= 0.25
    );

    // 3. Head shape: foxy rounded diamond/oval centered around (0.49, 0.33)
    const dxHead = (nx - 0.49) / 0.21;
    const dyHead = (ny - 0.32) / 0.17;
    const headDistance = dxHead * dxHead + dyHead * dyHead;
    const inHead = headDistance <= 1.0;

    // Head chubby cheeks widening at lower-mid face
    const inCheeks = (
      ny >= 0.28 && ny <= 0.42 &&
      nx >= 0.25 && nx <= 0.73 &&
      Math.abs(nx - 0.49) <= 0.24 * (1 - Math.pow((ny - 0.35) / 0.10, 2) * 0.4)
    );

    // Eyes: almond shaped negative spaces
    const inLeftEye = (
      Math.pow((nx - 0.40) / 0.035, 2) + Math.pow((ny - 0.30) / 0.02, 2) <= 1.0
    );
    const inRightEye = (
      Math.pow((nx - 0.58) / 0.035, 2) + Math.pow((ny - 0.30) / 0.02, 2) <= 1.0
    );

    // Snout / Nose: small triangle at (0.49, 0.37)
    const inNose = (
      ny >= 0.36 && ny <= 0.395 &&
      Math.abs(nx - 0.49) <= (ny - 0.36) * 0.75
    );

    // Muzzle line: small line down from nose
    const inMuzzleLine = (
      Math.abs(nx - 0.49) <= 0.006 && ny > 0.395 && ny <= 0.42
    );

    // 4. Neck & Chest ruff:
    const inChest = (
      ny >= 0.40 && ny <= 0.58 &&
      Math.abs(nx - 0.49) <= (0.19 + (ny - 0.40) * 0.12)
    );

    // 5. Main Torso / Body:
    const inTorso = (
      ny >= 0.48 && ny <= 0.76 &&
      nx >= 0.30 && nx <= 0.72 &&
      Math.pow((nx - 0.51) / 0.21, 2) + Math.pow((ny - 0.62) / 0.18, 2) <= 1.0
    );

    // 6. Curled Tail! (Signature Shiba Inu sickle tail on the right side curving upward)
    const dxTail = (nx - 0.75) / 0.11;
    const dyTail = (ny - 0.48) / 0.16;
    const tailDist = dxTail * dxTail + dyTail * dyTail;
    const inTailArch = tailDist <= 1.0 && tailDist >= 0.35 && nx >= 0.68;
    const inTailTip = (
      Math.pow((nx - 0.72) / 0.065, 2) + Math.pow((ny - 0.36) / 0.06, 2) <= 1.0
    );
    const inTail = inTailArch || inTailTip;

    // 7. Legs & Paws:
    // Front Left Leg
    const inFrontLeftLeg = (
      nx >= 0.34 && nx <= 0.42 && ny >= 0.70 && ny <= 0.89
    );
    // Front Right Leg
    const inFrontRightLeg = (
      nx >= 0.45 && nx <= 0.53 && ny >= 0.70 && ny <= 0.89
    );
    // Back Left Leg (slightly behind)
    const inBackLeftLeg = (
      nx >= 0.56 && nx <= 0.63 && ny >= 0.72 && ny <= 0.88
    );
    // Back Right Leg
    const inBackRightLeg = (
      nx >= 0.65 && nx <= 0.72 && ny >= 0.71 && ny <= 0.88
    );

    // Base ground shadow/pedestal hatching lines:
    const inGroundHatch = (
      ny >= 0.89 && ny <= 0.93 &&
      nx >= 0.24 && nx <= 0.78
    );

    // Exclusions (negative space):
    if (inLeftInnerEar || inRightInnerEar) {
      return { inside: false, type: 'ear' };
    }
    if (inLeftEye || inRightEye) {
      return { inside: false, type: 'eye' };
    }

    // Nose & snout detail is positive
    if (inNose || inMuzzleLine) {
      return { inside: true, type: 'snout' };
    }

    if (inLeftEar || inRightEar) {
      return { inside: true, type: 'ear' };
    }
    if (inTail) {
      return { inside: true, type: 'tail' };
    }
    if (inHead || inCheeks || inChest || inTorso || inFrontLeftLeg || inFrontRightLeg || inBackLeftLeg || inBackRightLeg || inGroundHatch) {
      return { inside: true, type: 'body' };
    }

    return { inside: false };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const asciiChars = [' ', '·', ':', '-', '=', '+', '*', '#', '%', '@', '█'];
    const tradingGlyphs = ['$', '▲', '▼', '◈', '0', '1', 'S', 'I', 'C', 'O', 'R', 'E'];

    const render = () => {
      timeRef.current += 0.035;
      const time = timeRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, width, height);

      // Base colors
      const isDark = theme === 'dark';
      const mainColor = isDark ? '#FFFFFF' : '#111111';
      const dimColor = isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(17, 17, 17, 0.25)';
      const accentColor = isDark ? '#38BDF8' : '#2563EB';

      // Scanline grid parameters
      const numLines = size === 'sm' ? 48 : size === 'md' ? 64 : 84;
      const lineSpacing = height / numLines;
      const charWidth = size === 'sm' ? 7 : 8;

      ctx.font = `${size === 'sm' ? '9px' : '10px'} "JetBrains Mono", monospace`;
      ctx.textBaseline = 'middle';

      // Scan beam pulse position (sweeping down)
      const sweepY = ((time * 0.4) % 1.2 - 0.1) * height;

      for (let i = 0; i < numLines; i++) {
        const y = i * lineSpacing + lineSpacing * 0.5;
        const ny = y / height;

        // Check distance to mouse
        const dyMouse = Math.abs(y - mouse.y);
        const isNearSweep = Math.abs(y - sweepY) < 28;

        // Horizontal scanline rendering
        // In the reference image: Horizontal strip lines with varying width and hatching
        let spanStart = -1;
        let spanEnd = -1;

        // Step across x
        const numCols = Math.floor(width / charWidth);
        for (let col = 0; col < numCols; col++) {
          const x = col * charWidth + charWidth * 0.5;
          const nx = x / width;

          // Wave distortion on mouse hover
          let testNx = nx;
          let testNy = ny;
          if (mouse.active) {
            const distToMouse = Math.hypot(x - mouse.x, y - mouse.y);
            if (distToMouse < 110) {
              const ripple = Math.sin(distToMouse * 0.1 - time * 4) * 0.015;
              testNx += ripple;
              testNy += ripple * 0.5;
            }
          }

          const { inside, type } = isInsideShiba(testNx, testNy);

          if (inside) {
            if (spanStart === -1) spanStart = x;
            spanEnd = x;

            if (visualMode === 'ascii' || (mouse.active && Math.hypot(x - mouse.x, y - mouse.y) < 70)) {
              // ASCII / Matrix Mode
              const charIndex = Math.floor((Math.sin(x * 0.05 + y * 0.05 + time * 2) * 0.5 + 0.5) * (asciiChars.length - 1));
              const glyph = (mouse.active && Math.random() < 0.08) 
                ? tradingGlyphs[Math.floor(Math.random() * tradingGlyphs.length)]
                : asciiChars[charIndex];
              
              ctx.fillStyle = (mouse.active && Math.hypot(x - mouse.x, y - mouse.y) < 45) ? accentColor : mainColor;
              ctx.fillText(glyph, x - charWidth * 0.5, y);
            }
          } else {
            // Draw peripheral edge hatch lines like reference image
            // In the reference, horizontal dashed lines extend outward around the cat
            const distToCenter = Math.abs(nx - 0.49);
            if (ny > 0.08 && ny < 0.94 && distToCenter > 0.25 && distToCenter < 0.48) {
              const hatchWave = Math.sin(ny * 40 + nx * 10);
              if (hatchWave > 0.75 && (col % 2 === 0)) {
                ctx.fillStyle = dimColor;
                ctx.fillRect(x - 2, y - 0.5, 4, 1);
              }
            }
          }
        }

        // Draw solid scanline segment if in scanline mode
        if (visualMode !== 'ascii' && spanStart !== -1 && spanEnd !== -1) {
          const lineWidth = spanEnd - spanStart;
          const strokeThickness = isNearSweep ? 3.0 : (size === 'sm' ? 2 : 2.5);

          // Add slight glitch displacement if mouse is active and near
          let offsetX = 0;
          if (mouse.active && dyMouse < 60) {
            offsetX = Math.sin(y * 0.2 + time * 5) * 4;
          }

          ctx.fillStyle = isNearSweep ? accentColor : mainColor;
          ctx.fillRect(spanStart + offsetX, y - strokeThickness * 0.5, lineWidth, strokeThickness);

          // Hatching dots on the ends (like reference image)
          ctx.fillStyle = dimColor;
          ctx.fillRect(spanStart + offsetX - 12, y - 0.5, 6, 1);
          ctx.fillRect(spanStart + offsetX - 22, y - 0.5, 4, 1);
          ctx.fillRect(spanEnd + offsetX + 6, y - 0.5, 6, 1);
          ctx.fillRect(spanEnd + offsetX + 16, y - 0.5, 4, 1);
        }
      }

      // Draw subtle terminal crosshair when hovering
      if (mouse.active) {
        ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(37, 99, 235, 0.4)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);

        // Crosshairs
        ctx.beginPath();
        ctx.moveTo(mouse.x - 20, mouse.y);
        ctx.lineTo(mouse.x + 20, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 20);
        ctx.lineTo(mouse.x, mouse.y + 20);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.fillStyle = isDark ? '#38BDF8' : '#2563EB';
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillText(`SI_NODE: [${Math.round(mouse.x)}, ${Math.round(mouse.y)}]`, mouse.x + 12, mouse.y - 8);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [theme, size, visualMode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
    if (!isHovered) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
    setIsHovered(false);
  };

  const handleCanvasClick = () => {
    const quotes = [
      'WOOF: 42 BPS ARBITRAGE EXECUTED ON-CHAIN',
      'SI CONSENSUS REACHED: +1.84 ETH PROFIT',
      'MEMPOOL SHIELD ACTIVE: MEV SANDWICH BLOCKED',
      'SOVEREIGN NODE: 0.8MS ROUTE CONFIRMED',
      'AGENT SWARM DEPLOYED: DELTA-NEUTRAL SAFE',
    ];
    const randomMsg = quotes[Math.floor(Math.random() * quotes.length)];
    setBarkMessage(randomMsg);
    setTimeout(() => {
      setBarkMessage(null);
    }, 3200);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCanvasClick}
      className={`relative select-none cursor-crosshair group ${className}`}
      style={{
        aspectRatio: '1 / 1.08',
      }}
      title="Hover to interact, click to trigger SI trading pulse"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Retro Status Badge on Top Right */}
      <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 bg-neutral-900/80 text-neutral-100 text-[10px] font-mono tracking-wider border border-neutral-700/60 shadow-xs backdrop-blur-xs">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>SI_SHIBA_v2</span>
      </div>

      {/* Floating Interactive Bark / Trade Log Bubble */}
      {barkMessage && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 bg-neutral-950 text-emerald-400 font-mono text-[11px] px-3 py-1.5 border border-emerald-500/80 shadow-lg tracking-wide whitespace-nowrap animate-bounce">
          {barkMessage}
        </div>
      )}

      {/* Control Switcher Bottom Right */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setVisualMode('scanline');
          }}
          className={`px-1.5 py-0.5 text-[9px] font-mono border transition-colors ${
            visualMode === 'scanline'
              ? 'bg-neutral-950 text-white border-neutral-800'
              : 'bg-white/80 text-neutral-700 border-neutral-300 hover:bg-neutral-100'
          }`}
        >
          SCANLINE
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setVisualMode('ascii');
          }}
          className={`px-1.5 py-0.5 text-[9px] font-mono border transition-colors ${
            visualMode === 'ascii'
              ? 'bg-neutral-950 text-white border-neutral-800'
              : 'bg-white/80 text-neutral-700 border-neutral-300 hover:bg-neutral-100'
          }`}
        >
          ASCII
        </button>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-2 left-2 text-[9px] font-mono text-neutral-400 opacity-60 pointer-events-none group-hover:opacity-100 transition-opacity">
        [CLICK TO PROMPT DOG]
      </div>
    </div>
  );
};
