import React, { useState } from 'react';
import { Terminal, Users, Cpu, Rocket, ArrowRight } from 'lucide-react';

interface UseCasesProps {
  onSelectUseCase?: (cmd: string) => void;
}

export const UseCases: React.FC<UseCasesProps> = ({ onSelectUseCase }) => {
  const [activeCase, setActiveCase] = useState<number | null>(null);

  const cases = [
    {
      icon: Terminal,
      title: 'Quantitative Degens',
      desc: 'Delta-neutral yield farming, cross-DEX flash arbitrage, and liquidation catching with sub-millisecond latency.',
      command: 'coreinu agent deploy --strategy flash-arb --capital 50ETH',
    },
    {
      icon: Users,
      title: 'Algorithmic Desks',
      desc: 'Institutional risk bounds, deterministic order routing, and cold-enclave signing for multimillion-dollar books.',
      command: 'coreinu desk init --multi-sig 3-of-5 --max-slippage 0.03%',
    },
    {
      icon: Cpu,
      title: 'Swarm Builders',
      desc: 'Chain multiple SI agents into decentralized research, auditing, and execution pipelines using simple prompts.',
      command: 'coreinu swarm compose --agents alpha,risk,hedger',
    },
    {
      icon: Rocket,
      title: 'Active Traders',
      desc: 'Turn natural language prompts into optimized multi-hop swaps without paying predatory MEV sandwiches.',
      command: 'coreinu route "swap 100k USDC to ETH without price impact"',
    },
  ];

  return (
    <section id="use-cases" className="py-20 md:py-28 bg-[#F6F5F0] border-b border-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-mono font-medium tracking-wider text-neutral-600 mb-3 flex items-center gap-2">
            <span className="text-neutral-400 font-bold">05.</span>
            <span>USE CASES</span>
            <span className="h-px w-8 bg-neutral-300" />
          </div>
          <h2 className="font-handjet text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 uppercase leading-none mb-4">
            DESIGNED FOR SCALE
          </h2>
          <p className="font-pretendard text-sm sm:text-base text-neutral-700 leading-relaxed">
            From solo on-chain searchers to high-frequency quantitative desks, COREINU adapts to your
            execution strategy.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cases.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = activeCase === idx;
            return (
              <div
                key={item.title}
                onMouseEnter={() => setActiveCase(idx)}
                onMouseLeave={() => setActiveCase(null)}
                className={`p-6 border transition-all duration-200 flex flex-col justify-between ${
                  isHovered
                    ? 'bg-[#EEECE6] border-neutral-950 shadow-xs translate-y-[-2px]'
                    : 'bg-transparent border-neutral-300 hover:border-neutral-500'
                }`}
              >
                <div>
                  <div className="w-10 h-10 border border-neutral-950 flex items-center justify-center mb-5 bg-white text-neutral-950">
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <h3 className="font-handjet text-2xl font-bold text-neutral-950 mb-2">
                    {item.title}
                  </h3>
                  <p className="font-pretendard text-xs sm:text-[13px] text-neutral-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-300/80">
                  <div className="font-mono text-[10px] text-neutral-500 mb-1">EXAMPLE CLI CMD:</div>
                  <div className="font-mono text-[11px] text-neutral-900 truncate bg-white/70 p-1.5 border border-neutral-300">
                    $ {item.command}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
