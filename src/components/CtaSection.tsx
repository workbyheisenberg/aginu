import React, { useState } from 'react';
import { ArrowRight, Terminal } from 'lucide-react';

interface CtaSectionProps {
  onOpenInstall: () => void;
  onExploreCommands: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenInstall, onExploreCommands }) => {
  const [barkMessage, setBarkMessage] = useState<string | null>(null);

  const handleMascotClick = () => {
    const quotes = [
      'WOOF: MEMPOOL PROTECTED',
      'FLASHBOTS BUNDLE MINED IN 0.6MS',
      'ARBITRAGE ROUTE COMMITTED',
      'LOCAL KEY ENCLAVE SECURED',
    ];
    const randomMsg = quotes[Math.floor(Math.random() * quotes.length)];
    setBarkMessage(randomMsg);
    setTimeout(() => {
      setBarkMessage(null);
    }, 2800);
  };

  return (
    <section className="bg-neutral-950 text-white pt-16 pb-12 sm:pt-20 sm:pb-16 border-b border-neutral-800 relative overflow-hidden">
      {/* Clean solid dark background without any grid */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="font-handjet text-lg font-bold text-sky-400">07.</span>
              <span className="font-handjet text-xl font-bold tracking-widest text-neutral-300 uppercase">
                DEPLOY SOVEREIGN AGENT
              </span>
              <span className="h-px w-12 bg-neutral-800" />
            </div>

            <h2 className="font-handjet text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wider sm:tracking-widest text-white uppercase leading-[1.08] mb-6">
              AGENTIC
              <br />
              <span className="font-handjet text-neutral-300">GENERATIONAL INU</span>
            </h2>

            <p className="font-pretendard text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl mb-8">
              Your sovereign Super Intelligence assistant for on-chain trading and autonomous execution.
              Deployable in seconds. Zero cloud telemetry.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={onOpenInstall}
                className="px-6 py-3.5 bg-white hover:bg-neutral-200 text-neutral-950 font-pretendard text-xs sm:text-sm font-bold tracking-wide transition-all duration-150 active:scale-98 shadow-sm flex items-center justify-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreCommands}
                className="px-5 py-3.5 text-neutral-300 hover:text-white font-pretendard text-xs sm:text-sm font-medium transition-colors border border-neutral-800 hover:border-neutral-600 bg-neutral-900/60 flex items-center justify-center gap-2"
              >
                <Terminal className="w-4 h-4 text-sky-400" />
                <span>See How It Works &gt;</span>
              </button>
            </div>
          </div>

          {/* Right Column: Replaced ASCII with Shiba Inu Image similar to Hero */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onClick={handleMascotClick}
              className="w-full max-w-md bg-neutral-900/90 border-2 border-neutral-700 p-4 sm:p-6 relative shadow-2xl cursor-pointer group select-none transition-all duration-200 hover:border-neutral-500"
            >
              {/* Terminal corner ticks */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-sky-400" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-sky-400" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-sky-400" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-sky-400" />

              {/* Header inside frame */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800 font-mono text-[11px] text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-neutral-200">COREINU_SHIBA_SI.PNG</span>
                </span>
                <span className="text-sky-400 font-semibold">SOVEREIGN BINARY</span>
              </div>

              {/* Floating Alert Bubble */}
              {barkMessage && (
                <div className="absolute top-14 left-1/2 -translate-x-1/2 z-30 bg-neutral-950 text-emerald-400 font-mono text-xs px-3.5 py-1.5 border border-emerald-400/80 shadow-2xl tracking-wide whitespace-nowrap animate-bounce">
                  {barkMessage}
                </div>
              )}

              {/* Shiba Inu Image */}
              <div className="relative py-2 px-4 flex items-center justify-center min-h-[280px] overflow-hidden bg-neutral-950/60 border border-neutral-800/80">
                <img
                  src="/shiba_inu_hero.png"
                  alt="COREINU Shiba Inu Super Intelligence Mascot"
                  className="w-full max-w-[260px] sm:max-w-[290px] h-auto object-contain mx-auto block transition-transform duration-300 group-hover:scale-105"
                  style={{
                    imageRendering: 'pixelated',
                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.6))',
                  }}
                />
              </div>

              {/* Bottom footer inside frame */}
              <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center justify-between font-mono text-[10px] text-neutral-400">
                <span className="text-neutral-500">[CLICK MASCOT TO PROMPT]</span>
                <span className="text-emerald-400 font-bold">STATUS: READY // ENCLAVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
