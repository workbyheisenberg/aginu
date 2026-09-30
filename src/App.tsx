/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Workbench } from './components/Workbench';
import { UseCases } from './components/UseCases';
import { Metrics } from './components/Metrics';
import { Testimonials } from './components/Testimonials';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { CliInstallModal } from './components/CliInstallModal';

export default function App() {
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  const handleOpenInstall = () => {
    setIsInstallModalOpen(true);
  };

  const handleCloseInstall = () => {
    setIsInstallModalOpen(false);
  };

  const handleScrollToTerminal = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToWorkbench = () => {
    const el = document.getElementById('workbench');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5F0] text-neutral-900 font-mono flex flex-col selection:bg-neutral-950 selection:text-white">
      {/* Top Header */}
      <Header
        onOpenInstall={handleOpenInstall}
        onOpenDemo={handleScrollToTerminal}
      />

      <main className="flex-1">
        {/* 01. Hero Section with Shiba Inu ASCII Animation Canvas */}
        <Hero
          onOpenInstall={handleOpenInstall}
          onExploreCommands={handleScrollToTerminal}
        />

        {/* 02. Features with Animated Routing Terminal Demo */}
        <Features />

        {/* 03. How It Works (Just 3 Steps) with Interactive Terminal Prompt Box */}
        <HowItWorks onOpenInstall={handleOpenInstall} />

        {/* 04. Workbench (Powerful Experience) Dual-Pane CLI Interface */}
        <Workbench />

        {/* 05. Use Cases (Designed for Scale) */}
        <UseCases />

        {/* 06. Quantitative Metrics with ASCII Scanline Borders */}
        <Metrics />

        {/* 07. Operator Testimonials */}
        <Testimonials />

        {/* 08. Dark Inverted CTA with Dark ASCII Shiba Radar */}
        <CtaSection
          onOpenInstall={handleOpenInstall}
          onExploreCommands={handleScrollToWorkbench}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* CLI Installation Modal */}
      <CliInstallModal
        isOpen={isInstallModalOpen}
        onClose={handleCloseInstall}
      />
    </div>
  );
}
