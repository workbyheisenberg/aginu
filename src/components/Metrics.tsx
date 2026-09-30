import React, { useState } from 'react';
import { AsciiDecorativeBorder } from './AsciiDecorativeBorder';
import { Activity, ShieldCheck, Gauge, Coins } from 'lucide-react';

export const Metrics: React.FC = () => {
  const [activeSpeedTest, setActiveSpeedTest] = useState(false);
  const [currentLatency, setCurrentLatency] = useState('1.18ms');

  const runLatencyPing = () => {
    setActiveSpeedTest(true);
    setTimeout(() => {
      const pings = ['0.84ms', '1.02ms', '1.14ms', '0.96ms', '1.21ms'];
      const randomPing = pings[Math.floor(Math.random() * pings.length)];
      setCurrentLatency(randomPing);
      setActiveSpeedTest(false);
    }, 380);
  };

  return (
    <section id="metrics" className="py-16 md:py-24 bg-[#F6F5F0] border-b border-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Decorative ASCII Hatch Border matching reference */}
        <div className="w-full flex items-center justify-between text-neutral-400 text-xs font-mono select-none overflow-hidden mb-8">
          <span className="tracking-widest">------+-------+----------------------------------+</span>
          <span className="hidden sm:inline tracking-widest">-------------------+-------+------</span>
        </div>

        {/* 4 Quantitative Proof Metrics matching reference typography */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center my-6">
          {/* Metric 1 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-4 h-4 text-neutral-600" />
              <span className="text-[11px] font-pretendard font-semibold uppercase tracking-wider text-neutral-500">
                Routed Volume
              </span>
            </div>
            <div className="font-handjet text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-950 tabular-nums leading-none">
              $4.8B+
            </div>
            <div className="text-xs font-pretendard text-neutral-600 mt-2">
              Across 80+ DEX Liquidity Graphs
            </div>
          </div>

          {/* Metric 2 */}
          <div className="flex flex-col items-center cursor-pointer group" onClick={runLatencyPing}>
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="w-4 h-4 text-neutral-600" />
              <span className="text-[11px] font-pretendard font-semibold uppercase tracking-wider text-neutral-500">
                Mean Latency
              </span>
            </div>
            <div className="font-handjet text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-950 tabular-nums group-hover:text-emerald-700 transition-colors leading-none">
              {currentLatency}
            </div>
            <div className="text-xs font-pretendard text-neutral-600 mt-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{activeSpeedTest ? 'PINGING...' : 'Click to re-ping node'}</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-neutral-600" />
              <span className="text-[11px] font-pretendard font-semibold uppercase tracking-wider text-neutral-500">
                Agent Cycles
              </span>
            </div>
            <div className="font-handjet text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-950 tabular-nums leading-none">
              1.4M+
            </div>
            <div className="text-xs font-pretendard text-neutral-600 mt-2">
              Autonomous Swarm Executions
            </div>
          </div>

          {/* Metric 4 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-neutral-600" />
              <span className="text-[11px] font-pretendard font-semibold uppercase tracking-wider text-neutral-500">
                MEV Shield Rate
              </span>
            </div>
            <div className="font-handjet text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-950 tabular-nums leading-none">
              99.99%
            </div>
            <div className="text-xs font-pretendard text-neutral-600 mt-2">
              Zero Sandwich Compromises
            </div>
          </div>
        </div>

        {/* Bottom Decorative ASCII Hatch Border matching reference */}
        <div className="w-full flex items-center justify-between text-neutral-400 text-xs font-mono select-none overflow-hidden mt-8">
          <span className="tracking-widest">------+-------+----------------------------------+</span>
          <span className="hidden sm:inline tracking-widest">-------------------+-------+------</span>
        </div>
      </div>
    </section>
  );
};
