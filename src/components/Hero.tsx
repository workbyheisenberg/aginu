import React, { useState, useEffect } from 'react';
import { Copy, Check, ChevronRight, Terminal } from 'lucide-react';
import { SonarGrid } from './SonarGrid';

interface HeroProps {
  onOpenInstall: () => void;
  onExploreCommands: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInstall, onExploreCommands }) => {
  const [copied, setCopied] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);
  const [barkMessage, setBarkMessage] = useState<string | null>(null);
  const contractAddress = '0xRH00D948fB83F3B66D6497EbF43Ce8bB1D5e7C21';

  const statusMessages = [
    'Autonomous execution. Zero slippage.',
    'Arbitrage opportunity identified on Uniswap v3 / Curve.',
    'SI swarm consensus locked in 1.2ms.',
    'Private mempool broadcast confirmed.',
    'Frontrun shield active. MEV sandwich evaded.',
  ];
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorBlink((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % statusMessages.length);
    }, 4500);
    return () => clearInterval(msgInterval);
  }, [statusMessages.length]);

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMascotClick = () => {
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
    <section className="relative border-b border-neutral-300 overflow-hidden bg-[#F6F5F0]">
      {/* Interactive SonarGrid radar dot matrix background */}
      <SonarGrid
        color="#111111"
        spacing={26}
        dotRadius={1.3}
        baseOpacity={0.16}
        speed={260}
        ringWidth={90}
        amplitude={2.2}
        pingEvery={2.4}
        interactive={true}
        className="pt-12 pb-20 md:pt-16 md:pb-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Clean Section Tag */}
              <div className="flex items-center gap-2.5 mb-4">
                <span className="font-handjet text-lg font-bold text-neutral-400">01.</span>
                <span className="font-handjet text-xl font-bold tracking-widest text-neutral-700 uppercase">
                  SUPER INTELLIGENCE CLI
                </span>
                <span className="h-px w-12 bg-neutral-300" />
              </div>

              {/* Handjet Display Title with relaxed, spacious line-height and letter-spacing */}
              <h1 className="font-handjet text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-950 tracking-wider sm:tracking-widest leading-[1.08] mb-6 uppercase">
                AGENTIC
                <br />
                <span className="font-handjet text-neutral-800">GENERATIONAL INU</span>
              </h1>

              {/* Value Proposition in Pretendard */}
              <p className="font-pretendard text-sm sm:text-base text-neutral-700 leading-relaxed max-w-xl mb-8">
                Your personal Super Intelligence (SI) CLI for autonomous agentic trading.
                Deploy multi-hop liquidity searchers, frontrun MEV sandwichers, and run sovereign
                swarms directly from your terminal.
              </p>

              {/* Action Buttons & Quick Install Line */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                <button
                  type="button"
                  onClick={onOpenInstall}
                  className="px-6 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-[#F6F5F0] font-pretendard text-sm font-semibold tracking-wide transition-all duration-150 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Get Started</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onExploreCommands}
                  className="px-5 py-3.5 text-neutral-900 hover:text-neutral-950 font-pretendard text-sm font-medium transition-colors border border-neutral-300 hover:border-neutral-950 bg-white/60 flex items-center justify-center gap-2"
                >
                  <Terminal className="w-4 h-4 text-neutral-600" />
                  <span>See How It Works &gt;</span>
                </button>
              </div>

              {/* Robinhood Contract Address Copy Box */}
              <div className="mb-8 p-3 bg-[#EEECE6] border border-neutral-300 flex items-center justify-between max-w-lg shadow-xs">
                <div className="flex items-center gap-2.5 font-mono text-xs text-neutral-800 overflow-x-auto select-all min-w-0">
                  <span className="bg-neutral-950 text-[#F6F5F0] text-xs font-bold px-2 py-0.5 tracking-wider select-none shrink-0 font-handjet">
                    CA
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono select-none hidden sm:inline shrink-0">ROBINHOOD:</span>
                  <span className="font-semibold text-neutral-900 tracking-tight font-mono text-xs sm:text-sm truncate sm:overflow-visible">
                    {contractAddress}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="ml-3 p-1.5 text-neutral-600 hover:text-neutral-950 transition-colors flex items-center gap-1 text-xs font-mono shrink-0"
                  title="Copy Robinhood Contract Address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 text-[11px] font-pretendard font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px] text-neutral-500 font-pretendard">COPY CA</span>
                    </>
                  )}
                </button>
              </div>

              {/* Blinking Live Ticker Line */}
              <div className="font-pretendard text-xs sm:text-sm text-neutral-800 flex items-center gap-2 border-t border-neutral-200/80 pt-4">
                <span className="text-neutral-500 font-mono font-bold">&gt;</span>
                <span className="transition-all duration-300">
                  {statusMessages[msgIndex]}
                </span>
                <span
                  className={`inline-block w-2 h-4 bg-neutral-900 ${
                    cursorBlink ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            </div>

            {/* Right Column: Replaced with Shiba Inu PNG Image */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div
                onClick={handleMascotClick}
                className="w-full max-w-md bg-[#EEECE6]/80 border-2 border-neutral-900 p-4 sm:p-6 relative shadow-md cursor-pointer group select-none transition-all duration-200 hover:shadow-lg"
              >
                {/* Terminal corner accents */}
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-neutral-900" />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-neutral-900" />
                <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-neutral-900" />
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-neutral-900" />

                {/* Header inside frame */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-300 font-mono text-[11px] text-neutral-600">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 bg-neutral-950" />
                    <span className="font-bold">COREINU_SHIBA_SI.PNG</span>
                  </span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>SOVEREIGN AGENT</span>
                  </span>
                </div>

                {/* Floating Interactive Bark / Trade Log Bubble */}
                {barkMessage && (
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 z-30 bg-neutral-950 text-emerald-400 font-mono text-xs px-3.5 py-1.5 border border-emerald-500/80 shadow-xl tracking-wide whitespace-nowrap animate-bounce">
                    {barkMessage}
                  </div>
                )}

                {/* Pixel Dog Image */}
                <div className="relative py-2 px-4 flex items-center justify-center min-h-[300px] overflow-hidden">
                  <img
                    src="/shiba_inu_hero.png"
                    alt="COREINU Shiba Inu Super Intelligence Mascot"
                    className="w-full max-w-[280px] sm:max-w-[320px] h-auto object-contain mx-auto block transition-transform duration-300 group-hover:scale-105"
                    style={{
                      imageRendering: 'pixelated',
                      filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.08))',
                    }}
                  />
                </div>

                {/* Bottom footer inside canvas box */}
                <div className="mt-3 pt-2 border-t border-neutral-300 flex items-center justify-between font-mono text-[10px] text-neutral-500">
                  <span className="text-neutral-700">[CLICK MASCOT TO PROMPT]</span>
                  <span className="text-neutral-900 font-bold">SI-CORE: ONLINE</span>
                </div>
              </div>

              {/* Quick Caption */}
              <div className="mt-3 font-pretendard text-xs text-neutral-600 text-center">
                Sovereign agentic execution. Zero external data leakage.
              </div>
            </div>
          </div>
        </div>
      </SonarGrid>
    </section>
  );
};
