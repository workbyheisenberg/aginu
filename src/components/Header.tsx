import React from 'react';

interface HeaderProps {
  onOpenInstall: () => void;
  onOpenDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInstall, onOpenDemo }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#F6F5F0]/90 backdrop-blur-md border-b border-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element / clean brand mark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-neutral-950 hover:opacity-85 transition-opacity group"
        >
          {/* Shiba Inu Pixel Logo Mark */}
          <div className="w-9 h-9 flex items-center justify-center transition-transform group-hover:scale-105">
            <img
              src="/coreinu_logo.png"
              alt="AGI Logo"
              className="w-full h-full object-contain block"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          <span className="font-handjet text-3xl tracking-wider font-bold uppercase text-neutral-950">
            AGI
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-pretendard font-medium text-neutral-700">
          <a
            href="#features"
            className="hover:text-neutral-950 hover:underline underline-offset-4 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-neutral-950 hover:underline underline-offset-4 transition-colors"
          >
            How It Works
          </a>
          <a
            href="#workbench"
            className="hover:text-neutral-950 hover:underline underline-offset-4 transition-colors"
          >
            Workbench
          </a>
          <a
            href="#use-cases"
            className="hover:text-neutral-950 hover:underline underline-offset-4 transition-colors"
          >
            Use Cases
          </a>
          <a
            href="#metrics"
            className="hover:text-neutral-950 hover:underline underline-offset-4 transition-colors"
          >
            Metrics
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenDemo}
            className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-pretendard font-medium text-neutral-800 hover:text-neutral-950 transition-colors border border-neutral-300 hover:border-neutral-400 bg-white/70 whitespace-nowrap"
          >
            Terminal Demo
          </button>
          <button
            type="button"
            onClick={onOpenInstall}
            className="px-4 py-2 text-xs font-pretendard font-semibold text-[#F6F5F0] bg-neutral-950 hover:bg-neutral-800 transition-colors whitespace-nowrap active:scale-[0.98] shadow-xs"
          >
            Install CLI
          </button>
        </div>
      </div>
    </header>
  );
};
