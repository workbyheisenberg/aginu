import React, { useState } from 'react';
import { Terminal, Cpu, ShieldAlert, BarChart3, ArrowRight, Check } from 'lucide-react';
import { AsciiDecorativeBorder } from './AsciiDecorativeBorder';

export const Workbench: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'swarms' | 'risk' | 'chart'>('terminal');
  const [activeActionMsg, setActiveActionMsg] = useState<string | null>(null);

  // Simulated live candlestick ASCII chart
  const asciiChart = `
  ETH/USDC 5M [SI-ROUTED]
  $3,480 ┤                ┌─┐
  $3,475 ┤           ┌─┐  │ │
  $3,470 ┤      ┌─┐  │ │  │ │  ┌─┐
  $3,465 ┤ ┌─┐  │ │  │ │  └─┘  │ │
  $3,460 ┤ │ │  │ │  └─┘       │ │
  $3,455 ┼─┴─┴──┴─┴────────────┴─┴─────────►
         12:00 12:05 12:10 12:15 12:20 (UTC)
  SPREAD: +48 bps | SLIPPAGE: 0.009% | ALPHA: HIGH
  `;

  const handleActionClick = (title: string, output: string) => {
    setActiveActionMsg(`${title}\n${output}`);
  };

  return (
    <section id="workbench" className="py-20 md:py-28 bg-[#F6F5F0] border-b border-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Descriptive Text & Features */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="text-xs font-mono font-medium tracking-wider text-neutral-600 mb-3 flex items-center gap-2">
              <span className="text-neutral-400 font-bold">04.</span>
              <span>PRODUCT</span>
              <span className="h-px w-8 bg-neutral-300" />
            </div>

            <h2 className="font-handjet text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 uppercase leading-none mb-6">
              POWERFUL
              <br />
              EXPERIENCE
            </h2>

            <p className="font-pretendard text-sm sm:text-base text-neutral-700 leading-relaxed mb-8">
              A sovereign, deterministic interface designed for speed, mathematical rigor, and
              uncompromising focus. COREINU SI CLI fits naturally into your native terminal workflow.
            </p>

            {/* Checkmark Features matching reference list */}
            <div className="space-y-3.5 mb-8">
              <div className="flex items-center gap-3 font-pretendard text-xs sm:text-sm text-neutral-800">
                <Check className="w-4 h-4 text-neutral-950 stroke-[2.5]" />
                <span>Chat or prompt your SI autonomous agent directly</span>
              </div>
              <div className="flex items-center gap-3 font-pretendard text-xs sm:text-sm text-neutral-800">
                <Check className="w-4 h-4 text-neutral-950 stroke-[2.5]" />
                <span>Real-time multi-agent swarm consensus logs</span>
              </div>
              <div className="flex items-center gap-3 font-pretendard text-xs sm:text-sm text-neutral-800">
                <Check className="w-4 h-4 text-neutral-950 stroke-[2.5]" />
                <span>Sub-millisecond route calculation &amp; orderbook depth</span>
              </div>
              <div className="flex items-center gap-3 font-pretendard text-xs sm:text-sm text-neutral-800">
                <Check className="w-4 h-4 text-neutral-950 stroke-[2.5]" />
                <span>Sync across local machines, VPS, and cold enclaves</span>
              </div>
            </div>

            <div className="font-pretendard text-xs text-neutral-500">
              Interactive terminal daemon running on localhost:9092
            </div>
          </div>

          {/* Right Column: Workbench Frame matching the reference image layout */}
          <div className="lg:col-span-7">
            <div className="bg-[#EEECE6] border border-neutral-300 p-4 sm:p-6 shadow-xs relative">
              <AsciiDecorativeBorder variant="hatch" className="mb-3" />

              {/* Main Dual-Pane Container */}
              <div className="bg-[#F6F5F0] border border-neutral-300 grid grid-cols-1 md:grid-cols-12 min-h-[420px] overflow-hidden">
                {/* Left Mini Sidebar */}
                <div className="md:col-span-4 bg-[#EEECE6] border-r border-neutral-300 p-4 flex flex-col justify-between">
                  <div>
                    {/* Brand mark */}
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-7 h-7 flex items-center justify-center">
                        <img
                          src="/coreinu_logo.png"
                          alt="COREINU Logo"
                          className="w-full h-full object-contain block"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      </div>
                      <span className="font-handjet text-xl font-bold text-neutral-950 tracking-wider">
                        AGI
                      </span>
                    </div>

                    {/* Nav tabs matching reference */}
                    <div className="space-y-1.5">
                      <button
                        type="button"
                        onClick={() => setActiveTab('terminal')}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-pretendard font-medium text-left transition-colors ${
                          activeTab === 'terminal'
                            ? 'bg-neutral-950 text-white font-semibold'
                            : 'text-neutral-700 hover:bg-neutral-200/80'
                        }`}
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Terminal</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('swarms')}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-pretendard font-medium text-left transition-colors ${
                          activeTab === 'swarms'
                            ? 'bg-neutral-950 text-white font-semibold'
                            : 'text-neutral-700 hover:bg-neutral-200/80'
                        }`}
                      >
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Swarms</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('risk')}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-pretendard font-medium text-left transition-colors ${
                          activeTab === 'risk'
                            ? 'bg-neutral-950 text-white font-semibold'
                            : 'text-neutral-700 hover:bg-neutral-200/80'
                        }`}
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Risk Engine</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('chart')}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-pretendard font-medium text-left transition-colors ${
                          activeTab === 'chart'
                            ? 'bg-neutral-950 text-white font-semibold'
                            : 'text-neutral-700 hover:bg-neutral-200/80'
                        }`}
                      >
                        <BarChart3 className="w-3.5 h-3.5" />
                        <span>Depth Chart</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-300 font-mono text-[10px] text-neutral-500">
                    <div>SOVEREIGN NODE</div>
                    <div className="text-emerald-700 font-semibold">ONLINE // 0.9ms</div>
                  </div>
                </div>

                {/* Right Content Pane matching reference layout */}
                <div className="md:col-span-8 p-4 sm:p-6 flex flex-col justify-between">
                  {activeTab === 'terminal' && (
                    <div>
                      {/* Greeting Header */}
                      <div className="mb-4">
                        <h4 className="font-handjet text-2xl font-bold text-neutral-950">
                          Ready for execution,
                        </h4>
                        <p className="font-pretendard text-xs text-neutral-600">
                          Autonomous SI swarms are monitoring mempool feeds.
                        </p>
                      </div>

                      {/* Interactive Action Cards */}
                      <div className="space-y-2 mb-4">
                        <button
                          type="button"
                          onClick={() =>
                            handleActionClick(
                              'MEMPOOL ALPHA SUMMARY',
                              'Scanned 14 DEX pools: 3 profitable routing paths found with zero sandwich vulnerability. Estimated net alpha: +$1,840.00'
                            )
                          }
                          className="w-full text-left p-2.5 bg-white border border-neutral-300 hover:border-neutral-950 text-xs font-pretendard font-medium text-neutral-800 flex items-center justify-between transition-colors group"
                        >
                          <span>&gt; Summarize latest mempool alpha</span>
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-950 transition-colors" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleActionClick(
                              'DELTA-NEUTRAL EXECUTION PLAN',
                              'Pair: SOL/USDC. Long spot on Orca Whirlpool + Short perp on Hyperliquid. Basis yield: 24.2% APR, liquidation buffer: 4.8σ.'
                            )
                          }
                          className="w-full text-left p-2.5 bg-white border border-neutral-300 hover:border-neutral-950 text-xs font-pretendard font-medium text-neutral-800 flex items-center justify-between transition-colors group"
                        >
                          <span>&gt; Create a delta-neutral execution plan</span>
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-950 transition-colors" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleActionClick(
                              'CROSS-CHAIN LIQUIDITY DISCOVERY',
                              'Aggregating EVM, Solana & Monad liquidity graphs. Dynamic pathing latency: 1.1ms across 84 bridges and aggregators.'
                            )
                          }
                          className="w-full text-left p-2.5 bg-white border border-neutral-300 hover:border-neutral-950 text-xs font-pretendard font-medium text-neutral-800 flex items-center justify-between transition-colors group"
                        >
                          <span>&gt; Discover cross-chain liquidity paths</span>
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-950 transition-colors" />
                        </button>
                      </div>

                      {/* Feedback Output Banner */}
                      {activeActionMsg && (
                        <div className="p-3 bg-neutral-950 text-emerald-400 font-mono text-xs border border-neutral-800 shadow-xs mb-3 whitespace-pre-wrap">
                          {activeActionMsg}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'swarms' && (
                    <div className="space-y-2">
                      <div className="font-handjet text-2xl font-bold text-neutral-950 mb-2">
                        ACTIVE AGENT SWARM CONSENSUS
                      </div>
                      <div className="p-2.5 bg-white border border-neutral-300 space-y-1 font-pretendard text-xs">
                        <div className="text-neutral-900 font-bold">[ALPHA-AGENT #01]</div>
                        <div className="text-neutral-600">
                          Identified 38 bps spread between Uniswap and Camelot DEX.
                        </div>
                      </div>
                      <div className="p-2.5 bg-white border border-neutral-300 space-y-1 font-pretendard text-xs">
                        <div className="text-neutral-900 font-bold">[RISK-SENTINEL #02]</div>
                        <div className="text-emerald-700 font-medium">
                          Audited slippage bounds. Max loss threshold: 0.02%. Consensus APPROVED.
                        </div>
                      </div>
                      <div className="p-2.5 bg-neutral-950 text-neutral-100 border border-neutral-900 space-y-1 font-pretendard text-xs">
                        <div className="text-sky-400 font-bold">[EXECUTION-NODE #03]</div>
                        <div className="text-neutral-300">
                          Committed private bundle via Flashbots builder. Block #21940201.
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'risk' && (
                    <div className="space-y-3 font-pretendard text-xs">
                      <div className="font-handjet text-2xl font-bold text-neutral-950 mb-1">
                        DETERMINISTIC RISK BOUNDARIES
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 bg-white border border-neutral-300">
                          <div className="text-neutral-500 text-[10px] font-semibold">MAX SLIPPAGE</div>
                          <div className="font-handjet text-2xl font-bold text-neutral-900">0.05%</div>
                        </div>
                        <div className="p-2.5 bg-white border border-neutral-300">
                          <div className="text-neutral-500 text-[10px] font-semibold">MEV PROTECTION</div>
                          <div className="font-handjet text-2xl font-bold text-emerald-700">ENFORCED</div>
                        </div>
                        <div className="p-2.5 bg-white border border-neutral-300">
                          <div className="text-neutral-500 text-[10px] font-semibold">MAX POSITION / TX</div>
                          <div className="font-handjet text-2xl font-bold text-neutral-900">150 ETH</div>
                        </div>
                        <div className="p-2.5 bg-white border border-neutral-300">
                          <div className="text-neutral-500 text-[10px] font-semibold">KILL-SWITCH</div>
                          <div className="font-handjet text-2xl font-bold text-neutral-900">ARMED</div>
                        </div>
                      </div>
                      <div className="text-[12px] text-neutral-600 bg-[#EEECE6] p-2.5 border border-neutral-300 leading-relaxed">
                        Rule: Automatically halt daemon if 2 consecutive simulated runs deviate &gt; 1.5σ from historical volatility.
                      </div>
                    </div>
                  )}

                  {activeTab === 'chart' && (
                    <div>
                      <div className="font-handjet text-2xl font-bold text-neutral-950 mb-1">
                        ASCII REAL-TIME DEPTH MATRIX
                      </div>
                      <pre className="bg-neutral-950 text-emerald-400 p-3 text-[11px] font-mono leading-tight overflow-x-auto border border-neutral-800">
                        {asciiChart}
                      </pre>
                    </div>
                  )}

                  {/* Bottom input area matching reference */}
                  <div className="pt-3 border-t border-neutral-300 flex items-center justify-between text-[11px] font-mono text-neutral-600">
                    <span>STATUS: 24/7 RUNTIME</span>
                    <span>COREINU-DAEMON v2.4.0</span>
                  </div>
                </div>
              </div>

              <AsciiDecorativeBorder variant="hatch" className="mt-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
