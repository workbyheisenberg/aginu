import React from 'react';

interface AsciiDecorativeBorderProps {
  className?: string;
  variant?: 'hatch' | 'corner' | 'terminal' | 'metric';
}

export const AsciiDecorativeBorder: React.FC<AsciiDecorativeBorderProps> = ({
  className = '',
  variant = 'hatch',
}) => {
  if (variant === 'metric') {
    return (
      <div className={`w-full overflow-hidden select-none pointer-events-none py-1 flex items-center justify-between text-neutral-400 text-xs font-mono opacity-80 ${className}`}>
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span>+</span>
          <span className="tracking-widest">----------------------------------------------------</span>
        </div>
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="tracking-widest">----------------------------------------------------</span>
          <span>+</span>
        </div>
      </div>
    );
  }

  if (variant === 'terminal') {
    return (
      <div className={`w-full flex items-center justify-between font-mono text-[10px] text-neutral-400 select-none ${className}`}>
        <span>+-------------------------------------------------------------+</span>
      </div>
    );
  }

  // Hatching pattern with varied line dashes like in the reference image
  return (
    <div className={`w-full flex items-center justify-between select-none pointer-events-none overflow-hidden text-neutral-400 text-[10px] font-mono leading-none ${className}`}>
      <span className="tracking-widest">-- - - ----- --- -------- -- --- -----</span>
      <span className="tracking-widest">------ -- --- --------- ---- --- -- -</span>
    </div>
  );
};

export const TerminalWindowDecorations: React.FC<{
  title?: string;
  theme?: 'light' | 'dark';
  actions?: React.ReactNode;
}> = ({ title = 'coreinu-agent', theme = 'light', actions }) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`px-3 py-2 flex items-center justify-between border-b font-mono text-xs select-none ${
        isDark
          ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
          : 'bg-[#EEECE6] border-neutral-300 text-neutral-700'
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-400/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-400/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-400/80 inline-block" />
        </div>
        <span className="text-[11px] font-medium tracking-tight text-neutral-600 dark:text-neutral-400 pl-1">
          {title}
        </span>
      </div>
      {actions && <div>{actions}</div>}
    </div>
  );
};
