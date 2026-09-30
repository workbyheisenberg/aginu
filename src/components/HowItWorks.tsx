import React, { useState } from 'react';
import { ChevronRight, ArrowRight, CornerDownLeft, RefreshCw } from 'lucide-react';
import { AsciiDecorativeBorder } from './AsciiDecorativeBorder';

interface HowItWorksProps {
  onOpenInstall: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenInstall }) => {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<Array<{ type: 'user' | 'agent'; text: string; time?: string }>>([
    {
      type: 'agent',
      text: 'COREINU SI Terminal v2.4 initialized. Ready for sovereign agentic prompts or CLI flags.',
      time: '09:30:12',
    },
  ]);

  const presetCommands = [
    {
      label: 'Scan cross-DEX arbitrage spread',
      cmd: 'coreinu scan arb --pair ETH/USDC --min-spread 0.15%',
      response: `[SI-ALPHA] Scanning 14 DEX pools across Ethereum L1 and Arbitrum...
✓ Found spread: Uniswap v3 ($3,420.10) vs Curve TriCrypto ($3,431.85)
  Gross arb margin: +0.34% ($1,175.00 on 100 ETH)
  Est. gas + Flashbots tip: $14.20
  MEV sandwich risk: 0.00% (Submitting via private mempool bundle)
[ACTION] Execute bundle? Type 'confirm' or use flag --auto-commit`,
    },
    {
      label: 'Deploy delta-neutral scalper agent',
      cmd: 'coreinu agent deploy --strategy delta-neutral --asset SOL --risk low',
      response: `[SI-SWARM] Spinning up agent container [PID: 49204]
├── Alpha Hunter: listening to Solana mempool via private RPC...
├── Risk Sentinel: setting maximum liquidation distance 3.8σ
└── Hedger: syncing perpetual futures short on Hyperliquid
✓ Agent swarm active in background daemon. Autonomous cycles: 120/min.`,
    },
    {
      label: 'Backtest momentum alpha over 30 days',
      cmd: 'coreinu backtest --strategy trend-filter --timeframe 30d --token BTC',
      response: `[SI-BACKTEST] Running deterministic simulation on 30d tick-level data...
+-----------------------+---------------------+
| METRIC                | VALUE               |
+-----------------------+---------------------+
| Win Rate              | 71.4%               |
| Sharpe Ratio          | 2.84                |
| Max Drawdown          | -3.2%               |
| Cumulative Alpha Gain | +24.8% (Net of gas) |
+-----------------------+---------------------+
✓ Strategy passed sovereign validation. Ready for testnet or mainnet.`,
    },
    {
      label: 'Mempool frontrun shield diagnostic',
      cmd: 'coreinu shield test --rpc private --simulate-toxic-flow',
      response: `[SI-SHIELD] Simulating adversarial mempool searcher attack...
[ATTACK] Sandwich searcher detected tx in public pool
[DEFENSE] Diverting route to private builder enclave (Titan + Flashbots)
✓ Zero frontrun exposure. Slippage guaranteed at 0.02%.`,
    },
  ];

  const handleRunCommand = (commandText: string) => {
    if (!commandText.trim()) return;

    setIsProcessing(true);
    const now = new Date().toLocaleTimeString();
    
    // Add user message
    setTerminalOutput((prev) => [
      ...prev,
      { type: 'user', text: `$ ${commandText}`, time: now },
    ]);

    // Simulate fast SI response
    setTimeout(() => {
      let reply = '';
      const matched = presetCommands.find(
        (p) =>
          p.cmd.toLowerCase() === commandText.toLowerCase() ||
          p.label.toLowerCase() === commandText.toLowerCase()
      );

      if (matched) {
        reply = matched.response;
      } else if (commandText.toLowerCase().includes('help')) {
        reply = `Available commands:
  coreinu route <pair>       - Multi-hop liquidity router
  coreinu agent deploy       - Start autonomous trading agent swarm
  coreinu scan <mode>        - Real-time mempool & arbitrage scanner
  coreinu backtest <options> - Tick-level deterministic simulation
  coreinu shield <status>    - MEV protection status & private builder config`;
      } else if (commandText.toLowerCase().includes('status')) {
        reply = `COREINU SI DAEMON STATUS:
  Sovereign Node: ONLINE
  Private RPC: Active (Latency: 0.9ms)
  Active Swarms: 3 running
  Cumulative 24h Yield: +$3,840.12 (Zero failed tx)`;
      } else if (commandText.toLowerCase().includes('clear')) {
        setTerminalOutput([]);
        setIsProcessing(false);
        return;
      } else {
        reply = `[SI-CORE] Interpreted natural language prompt: "${commandText}"
├── Synthesizing execution parameters across liquidity graph...
├── Simulating fork transaction: Slippage 0.018%
✓ Autonomous execution plan formulated. Ready to commit to mempool.`;
      }

      setTerminalOutput((prev) => [
        ...prev,
        { type: 'agent', text: reply, time: new Date().toLocaleTimeString() },
      ]);
      setIsProcessing(false);
    }, 450);
  };

  const handlePresetClick = (preset: typeof presetCommands[0]) => {
    setSelectedPreset(preset.label);
    handleRunCommand(preset.cmd);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;
    handleRunCommand(userPrompt);
    setUserPrompt('');
  };

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#F6F5F0] border-b border-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left Column: 3 Steps */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="text-xs font-mono font-medium tracking-wider text-neutral-600 mb-3 flex items-center gap-2">
              <span className="text-neutral-400 font-bold">03.</span>
              <span>HOW IT WORKS</span>
              <span className="h-px w-8 bg-neutral-300" />
            </div>

            <h2 className="font-handjet text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 uppercase leading-none mb-6">
              JUST 3 STEPS
            </h2>

            <p className="font-pretendard text-sm sm:text-base text-neutral-700 leading-relaxed mb-10">
              Get started in minutes and let COREINU Super Intelligence handle liquidity discovery,
              risk auditing, and autonomous order execution.
            </p>

            {/* Steps List matching reference inverted block numbers */}
            <div className="space-y-8 mb-10">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-neutral-950 text-white font-handjet text-lg font-bold flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-handjet text-2xl font-bold text-neutral-950 mb-1">
                    Install &amp; Bind Wallet
                  </h3>
                  <p className="font-pretendard text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
                    Install the CLI binary in one command. Connect your private RPC or hardware
                    wallet. Private keys never leave your machine.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-neutral-950 text-white font-handjet text-lg font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-handjet text-2xl font-bold text-neutral-950 mb-1">
                    Define Intent or Prompt
                  </h3>
                  <p className="font-pretendard text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
                    Specify your trading strategy in plain natural language or clean YAML configs.
                    From multi-hop arbitrage to delta-neutral farming.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-neutral-950 text-white font-handjet text-lg font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-handjet text-2xl font-bold text-neutral-950 mb-1">
                    Autonomous Execution
                  </h3>
                  <p className="font-pretendard text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
                    COREINU SI agents simulate transactions, audit mempools for toxic sandwiches, and
                    broadcast private Flashbots bundles.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onOpenInstall}
                className="px-6 py-3 bg-neutral-950 hover:bg-neutral-800 text-[#F6F5F0] font-pretendard text-xs font-semibold tracking-wide transition-colors"
              >
                Get Started
              </button>
              <a
                href="#workbench"
                className="text-xs font-pretendard font-medium text-neutral-800 hover:text-neutral-950 flex items-center gap-1.5 transition-colors"
              >
                <span>Learn More</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Terminal Box matching reference design */}
          <div className="lg:col-span-7">
            <div className="bg-[#EEECE6] border border-neutral-300 p-4 sm:p-6 shadow-xs relative">
              {/* ASCII Top Border Hatch */}
              <AsciiDecorativeBorder variant="hatch" className="mb-3" />

              {/* Terminal Frame */}
              <div className="bg-neutral-950 text-neutral-100 border border-neutral-800 overflow-hidden">
                {/* Header inside frame */}
                <div className="px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between font-mono text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-emerald-500 inline-block" />
                    <span className="font-bold tracking-wider">COREINU SI Agent</span>
                  </div>
                  <span className="text-neutral-400 text-[11px]">daemon: active</span>
                </div>

                {/* Subtitle Prompt Question */}
                <div className="p-4 sm:p-5">
                  <div className="text-xs font-mono text-neutral-400 mb-3">
                    What can I help you execute today?
                  </div>

                  {/* Suggestion Chips matching reference list */}
                  <div className="space-y-2 mb-4">
                    {presetCommands.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => handlePresetClick(preset)}
                        className={`w-full text-left px-3 py-2 text-xs font-mono transition-colors flex items-center justify-between border ${
                          selectedPreset === preset.label
                            ? 'bg-neutral-800 text-white border-neutral-600'
                            : 'bg-neutral-900/60 text-neutral-300 border-neutral-800 hover:bg-neutral-800/80 hover:border-neutral-700'
                        }`}
                      >
                        <span className="truncate">&gt; {preset.label}</span>
                        <ArrowRight className="w-3 h-3 text-neutral-500 shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>

                  {/* Scrollable Terminal Output History */}
                  <div className="max-h-56 overflow-y-auto bg-black/60 p-3 border border-neutral-800/80 space-y-2 mb-4 font-mono text-xs">
                    {terminalOutput.map((item, idx) => (
                      <div
                        key={idx}
                        className={
                          item.type === 'user'
                            ? 'text-sky-400 font-semibold'
                            : 'text-neutral-300 whitespace-pre-wrap leading-relaxed'
                        }
                      >
                        {item.text}
                      </div>
                    ))}
                    {isProcessing && (
                      <div className="text-emerald-400 flex items-center gap-2">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        <span>SI agent calculating optimal route...</span>
                      </div>
                    )}
                  </div>

                  {/* Command Input Field matching reference */}
                  <form onSubmit={handleSubmit} className="relative">
                    <div className="flex items-center bg-neutral-900 border border-neutral-700 focus-within:border-white transition-colors">
                      <span className="pl-3 text-neutral-500 font-mono text-xs select-none">$</span>
                      <input
                        type="text"
                        value={userPrompt}
                        onChange={(e) => setUserPrompt(e.target.value)}
                        placeholder="Type your command or prompt (e.g. 'help', 'scan arb', 'status')..."
                        className="w-full bg-transparent px-3 py-2.5 font-mono text-xs text-white placeholder-neutral-500 focus:outline-hidden"
                      />
                      <button
                        type="submit"
                        className="pr-3 text-neutral-400 hover:text-white transition-colors p-1"
                        title="Execute command"
                      >
                        <CornerDownLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* ASCII Bottom Border Hatch */}
              <AsciiDecorativeBorder variant="hatch" className="mt-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
