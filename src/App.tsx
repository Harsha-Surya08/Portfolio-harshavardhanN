/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { EducationSection } from './components/sections/EducationSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { ArrowUp, Mail } from 'lucide-react';

export default function App() {
  const [showFloatingTop, setShowFloatingTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Fixed Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <About />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Quick Action Buttons (Bottom Right) */}
      {showFloatingTop && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2 animate-in fade-in zoom-in-75 duration-200">
          <a
            href="#contact"
            className="p-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95"
            aria-label="Jump to Contact section"
            title="Contact Harshavardhan"
          >
            <Mail className="w-5 h-5" />
          </a>
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-700/80 shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            aria-label="Scroll to top of page"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
