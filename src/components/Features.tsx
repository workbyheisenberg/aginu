import React, { useState, useEffect } from 'react';
import { Zap, ShieldCheck, Cpu, Terminal, Play, RefreshCw } from 'lucide-react';
import { AsciiDecorativeBorder } from './AsciiDecorativeBorder';

interface RouteSimState {
  pair: string;
  hop1: string;
  hop2: string;
  split: string;
  latency: string;
  profit: string;
  gasSaved: string;
}

export const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'routing' | 'shield' | 'swarms' | 'local'>('routing');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(3);
  const [simResult, setSimResult] = useState<RouteSimState>({
    pair: 'ETH / USDC',
    hop1: 'Uniswap v3 0.05% (58%)',
    hop2: 'Curve TriCrypto (42%)',
    split: 'Dynamic Splitting',
    latency: '1.24ms',
    profit: '+0.48% ($1,290.40)',
    gasSaved: '42,000 gas (~$3.10)',
  });

  const runSimulation = () => {
    setIsSimulating(true);
    setSimStep(0);

    const timer1 = setTimeout(() => setSimStep(1), 350);
    const timer2 = setTimeout(() => setSimStep(2), 750);
    const timer3 = setTimeout(() => {
      setSimStep(3);
      setIsSimulating(false);
      // alternate pairs for dynamic feeling
      const pairs = [
        {
          pair: 'SOL / USDC',
          hop1: 'Raydium CLMM (65%)',
          hop2: 'Orca Whirlpool (35%)',
          split: 'Jup-Graph Splitting',
          latency: '0.88ms',
          profit: '+0.62% ($840.10)',
          gasSaved: '0.00015 SOL',
        },
        {
          pair: 'ETH / USDC',
          hop1: 'Uniswap v3 0.05% (58%)',
          hop2: 'Curve TriCrypto (42%)',
          split: 'Dynamic Splitting',
          latency: '1.24ms',
          profit: '+0.48% ($1,290.40)',
          gasSaved: '42,000 gas (~$3.10)',
        },
        {
          pair: 'WBTC / USDT',
          hop1: 'Maverick v2 (70%)',
          hop2: 'Uniswap v3 (30%)',
          split: 'Multi-hop Optimal',
          latency: '1.42ms',
          profit: '+0.31% ($2,140.00)',
          gasSaved: '56,000 gas',
        },
      ];
      const next = pairs[Math.floor(Math.random() * pairs.length)];
      setSimResult(next);
    }, 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  return (
    <section id="features" className="py-20 md:py-28 bg-[#F6F5F0] border-b border-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          <div className="lg:col-span-6">
            <div className="text-xs font-mono font-medium tracking-wider text-neutral-600 mb-3 flex items-center gap-2">
              <span className="text-neutral-400 font-bold">02.</span>
              <span>CAPABILITIES</span>
              <span className="h-px w-8 bg-neutral-300" />
            </div>
            <h2 className="font-handjet text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 uppercase leading-none">
              BUILT FOR
              <br />
              REAL EXECUTION
            </h2>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="font-pretendard text-sm sm:text-base text-neutral-700 leading-relaxed max-w-xl">
              COREINU combines sovereign decentralized liquidity graph routing with autonomous
              agentic intelligence. Save slippage costs, bypass predatory MEV sandwichers, and run
              sovereign quantitative trading loops with sub-millisecond precision.
            </p>
          </div>
        </div>

        {/* 4 Feature Pillars matching reference icon-and-text styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Feature 1 */}
          <div
            onClick={() => setActiveTab('routing')}
            className={`p-5 border transition-all cursor-pointer ${
              activeTab === 'routing'
                ? 'bg-[#EEECE6] border-neutral-950 shadow-xs'
                : 'bg-transparent border-neutral-300 hover:border-neutral-500'
            }`}
          >
            <div className="w-9 h-9 border border-neutral-950 flex items-center justify-center mb-4 bg-white text-neutral-950">
              <Zap className="w-5 h-5 stroke-[1.8]" />
            </div>
            <h3 className="font-handjet text-2xl font-bold text-neutral-950 mb-1">
              Autonomous Routing
            </h3>
            <p className="font-pretendard text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
              Sub-millisecond route optimization across 80+ decentralized exchanges and CLOBs with
              dynamic order splitting.
            </p>
          </div>

          {/* Feature 2 */}
          <div
            onClick={() => setActiveTab('shield')}
            className={`p-5 border transition-all cursor-pointer ${
              activeTab === 'shield'
                ? 'bg-[#EEECE6] border-neutral-950 shadow-xs'
                : 'bg-transparent border-neutral-300 hover:border-neutral-500'
            }`}
          >
            <div className="w-9 h-9 border border-neutral-950 flex items-center justify-center mb-4 bg-white text-neutral-950">
              <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
            </div>
            <h3 className="font-handjet text-2xl font-bold text-neutral-950 mb-1">
              MEV Frontrun Guard
            </h3>
            <p className="font-pretendard text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
              Pre-flight fork simulation and private mempool bundle submission prevent toxic frontruns
              and sandwich arbitrageurs.
            </p>
          </div>

          {/* Feature 3 */}
          <div
            onClick={() => setActiveTab('swarms')}
            className={`p-5 border transition-all cursor-pointer ${
              activeTab === 'swarms'
                ? 'bg-[#EEECE6] border-neutral-950 shadow-xs'
                : 'bg-transparent border-neutral-300 hover:border-neutral-500'
            }`}
          >
            <div className="w-9 h-9 border border-neutral-950 flex items-center justify-center mb-4 bg-white text-neutral-950">
              <Cpu className="w-5 h-5 stroke-[1.8]" />
            </div>
            <h3 className="font-handjet text-2xl font-bold text-neutral-950 mb-1">
              Agentic Swarms
            </h3>
            <p className="font-pretendard text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
              Multi-agent SI debate: Alpha Hunter, Risk Sentinel, and Executioner confirm consensus
              prior to order submission.
            </p>
          </div>

          {/* Feature 4 */}
          <div
            onClick={() => setActiveTab('local')}
            className={`p-5 border transition-all cursor-pointer ${
              activeTab === 'local'
                ? 'bg-[#EEECE6] border-neutral-950 shadow-xs'
                : 'bg-transparent border-neutral-300 hover:border-neutral-500'
            }`}
          >
            <div className="w-9 h-9 border border-neutral-950 flex items-center justify-center mb-4 bg-white text-neutral-950">
              <Terminal className="w-5 h-5 stroke-[1.8]" />
            </div>
            <h3 className="font-handjet text-2xl font-bold text-neutral-950 mb-1">
              Sovereign &amp; Local
            </h3>
            <p className="font-pretendard text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
              Zero cloud telemetry. Private RPC support, local hardware key signing, and self-hosted
              execution loops.
            </p>
          </div>
        </div>

        {/* Interactive Feature Terminal Animation Demo */}
        <div className="bg-[#EEECE6] border border-neutral-300 p-4 sm:p-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-neutral-300 gap-2">
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-800">
              <span className="w-2.5 h-2.5 bg-neutral-950 inline-block" />
              <span className="font-bold">LIVE SI EXECUTION DEMO</span>
              <span className="text-neutral-400">::</span>
              <span className="text-neutral-600">simulated liquidity stream</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-neutral-500">
                ACTIVE: {activeTab.toUpperCase()}
              </span>
              <button
                type="button"
                onClick={runSimulation}
                disabled={isSimulating}
                className="px-3 py-1 bg-neutral-950 hover:bg-neutral-800 text-[#F6F5F0] text-xs font-mono flex items-center gap-1.5 transition-colors active:scale-95 disabled:opacity-60"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>SIMULATING...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>RUN TEST</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Terminal Animation Display */}
          <div className="bg-neutral-950 text-neutral-100 p-4 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto shadow-inner border border-neutral-800">
            <div className="text-neutral-400 mb-2">
              $ coreinu route --pair {simResult.pair} --auto-split --simulate-mev
            </div>

            {simStep >= 0 && (
              <div className="text-neutral-300">
                [00.01ms] Querying liquidity pools across 80+ AMM graphs...
              </div>
            )}

            {simStep >= 1 && (
              <div className="text-neutral-300">
                [00.45ms] Fork simulated on block #21940192: Slippage 0.012% | Sandwich risk: ZERO
              </div>
            )}

            {simStep >= 2 && (
              <div className="text-emerald-400 font-bold">
                [00.82ms] SI Swarm consensus: Optimal route synthesized with dynamic order split
              </div>
            )}

            {simStep >= 3 && (
              <div className="mt-3 pt-3 border-t border-neutral-800 space-y-1">
                <div className="text-neutral-300">
                  ROUTE GRAPH:{' '}
                  <span className="text-amber-400">{simResult.pair}</span>
                </div>
                <div className="pl-4 text-neutral-400">
                  ├── Route A: <span className="text-white">{simResult.hop1}</span>
                </div>
                <div className="pl-4 text-neutral-400">
                  └── Route B: <span className="text-white">{simResult.hop2}</span>
                </div>
                <div className="mt-2 text-emerald-400">
                  RESULT: Latency: {simResult.latency} | Alpha Gain: {simResult.profit} | Gas Saved: {simResult.gasSaved}
                </div>
                <div className="text-neutral-500 text-[11px] pt-1">
                  &gt; Broadcast ready via private Flashbots bundle (block inclusion priority: 99.8%)
                </div>
              </div>
            )}
          </div>

          <AsciiDecorativeBorder variant="hatch" className="mt-4" />
        </div>
      </div>
    </section>
  );
};
