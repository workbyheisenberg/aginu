import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Terminal, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CliInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CliInstallModal: React.FC<CliInstallModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'curl' | 'brew' | 'cargo' | 'docker'>('curl');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = {
    curl: 'curl -sSL https://coreinu.sh | sh',
    brew: 'brew install coreinu/tap/coreinu',
    cargo: 'cargo install --locked coreinu-cli',
    docker: 'docker run -it --net=host -v ~/.coreinu:/root/.coreinu coreinu/agent:v2.4',
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-[#EEECE6] border-2 border-neutral-950 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Window Bar */}
        <div className="bg-neutral-950 text-white px-4 py-3 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-sky-400" />
            <span className="font-handjet text-lg font-bold tracking-wider">INSTALL COREINU SI CLI</span>
            <span className="text-neutral-500 font-mono text-xs">::</span>
            <span className="text-neutral-400 font-pretendard text-xs">v2.4.0 (sovereign release)</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
            title="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Package Manager Tabs */}
          <div className="flex items-center gap-1 p-1 bg-neutral-300 border border-neutral-400 mb-5 font-pretendard text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('curl')}
              className={`px-3 py-1.5 transition-colors font-medium ${
                activeTab === 'curl'
                  ? 'bg-neutral-950 text-white'
                  : 'text-neutral-800 hover:bg-neutral-200'
              }`}
            >
              cURL (Auto-Detect)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('brew')}
              className={`px-3 py-1.5 transition-colors font-medium ${
                activeTab === 'brew'
                  ? 'bg-neutral-950 text-white'
                  : 'text-neutral-800 hover:bg-neutral-200'
              }`}
            >
              Homebrew
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cargo')}
              className={`px-3 py-1.5 transition-colors font-medium ${
                activeTab === 'cargo'
                  ? 'bg-neutral-950 text-white'
                  : 'text-neutral-800 hover:bg-neutral-200'
              }`}
            >
              Cargo (Rust)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('docker')}
              className={`px-3 py-1.5 transition-colors font-medium ${
                activeTab === 'docker'
                  ? 'bg-neutral-950 text-white'
                  : 'text-neutral-800 hover:bg-neutral-200'
              }`}
            >
              Docker
            </button>
          </div>

          {/* Code Box */}
          <div className="bg-neutral-950 border border-neutral-800 p-4 mb-4 flex items-center justify-between font-mono text-xs sm:text-sm text-neutral-100 select-all">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-neutral-500 select-none">$</span>
              <span className="text-emerald-400 font-semibold">{commands[activeTab]}</span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="ml-4 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-pretendard flex items-center gap-1.5 transition-colors shrink-0"
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>

          {/* Quick-start 3 steps cheat sheet */}
          <div className="bg-white border border-neutral-300 p-4 mb-5 font-pretendard text-xs space-y-2.5">
            <div className="font-handjet text-base font-bold text-neutral-900 border-b border-neutral-200 pb-1.5 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>QUICK-START RUNBOOK</span>
            </div>
            <div className="text-neutral-700">
              <span className="text-neutral-400 font-bold font-mono">1.</span> Initialize your sovereign node:
              <span className="font-semibold font-mono block bg-neutral-100 p-1 mt-0.5 text-neutral-900">
                $ coreinu init --rpc https://eth.llamarpc.com
              </span>
            </div>
            <div className="text-neutral-700">
              <span className="text-neutral-400 font-bold font-mono">2.</span> Run test arbitrage scan:
              <span className="font-semibold font-mono block bg-neutral-100 p-1 mt-0.5 text-neutral-900">
                $ coreinu scan arb --pair ETH/USDC --mev-protect
              </span>
            </div>
            <div className="text-neutral-700">
              <span className="text-neutral-400 font-bold font-mono">3.</span> Launch background trading daemon:
              <span className="font-semibold font-mono block bg-neutral-100 p-1 mt-0.5 text-neutral-900">
                $ coreinu daemon start --swarms 3
              </span>
            </div>
          </div>

          {/* Integrity & Security Footnote */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-pretendard text-neutral-600 pt-2 border-t border-neutral-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-mono">GPG Signed Binary // SHA256: 8a4f91e32d09c</span>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-900 hover:underline underline-offset-2"
            >
              Verify on GitHub Releases &gt;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
