import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900 py-8 text-xs font-pretendard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Pixel Icon & Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-white flex items-center justify-center p-0.5 border border-neutral-800">
            <img
              src="/coreinu_logo.png"
              alt="COREINU Logo"
              className="w-full h-full object-contain block"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          <span className="text-neutral-400">
            &copy; 2026 AGI — Agentic Generational Inu. All rights reserved.
          </span>
        </div>

        {/* Right: Clean Text Navigation & Socials */}
        <div className="flex flex-wrap items-center gap-6 text-neutral-400">
          <a
            href="#features"
            className="hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a
            href="#workbench"
            className="hover:text-white transition-colors"
          >
            Workbench
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            Twitter / X
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            Discord
          </a>
        </div>
      </div>
    </footer>
  );
};
