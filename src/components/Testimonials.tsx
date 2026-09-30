import React from 'react';
import { UserCheck } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote:
        '“COREINU completely replaced our custom routing scripts. The multi-hop split execution saved our fund over $85,000 in slippage in the first month alone.”',
      author: 'Marcus Vance',
      role: 'Lead Quantitative Trader, Parallax Alpha',
    },
    {
      quote:
        '“The local-first philosophy is essential for us. My private keys never touch a cloud server, and the MEV shield has prevented every single sandwich attack.”',
      author: 'Dr. Aris Chen',
      role: 'Founding Engineer, ZeroEx Capital',
    },
    {
      quote:
        '“Running autonomous SI swarms from a single CLI command feels like having an entire quantitative research desk monitoring the mempool 24/7.”',
      author: 'Elena Rostova',
      role: 'Independent On-Chain Searcher',
    },
  ];

  return (
    <section id="testimonials" className="relative py-20 md:py-28 bg-[#F6F5F0] border-b border-neutral-300 overflow-hidden">
      {/* Subtle background retro grid lines moved from hero */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, #111111 1px, transparent 1px), linear-gradient(to bottom, #111111 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          <div className="lg:col-span-6">
            <div className="text-xs font-mono font-medium tracking-wider text-neutral-600 mb-3 flex items-center gap-2">
              <span className="text-neutral-400 font-bold">06.</span>
              <span>TESTIMONIALS</span>
              <span className="h-px w-8 bg-neutral-300" />
            </div>
            <h2 className="font-handjet text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 uppercase leading-none">
              TRUSTED BY
              <br />
              TOP OPERATORS
            </h2>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="font-pretendard text-sm sm:text-base text-neutral-700 leading-relaxed max-w-xl">
              On-chain quantitative traders, liquidity providers, and independent searchers rely on
              COREINU to automate execution, safeguard capital, and capitalize on high-frequency
              opportunities.
            </p>
          </div>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#EEECE6]/70 border border-neutral-300 flex flex-col justify-between hover:border-neutral-950 transition-colors shadow-xs"
            >
              <div>
                <div className="w-8 h-8 border border-neutral-950 flex items-center justify-center mb-5 bg-white text-neutral-950">
                  <UserCheck className="w-4 h-4" />
                </div>
                <p className="font-pretendard text-sm text-neutral-800 leading-relaxed mb-6">
                  {t.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-300">
                <div className="font-pretendard text-sm font-bold text-neutral-950">
                  {t.author}
                </div>
                <div className="font-pretendard text-xs text-neutral-600">
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
