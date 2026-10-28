import React from 'react';
import { 
  ArrowRight, Mail, Github, Linkedin, Sparkles, 
  MapPin, Terminal, Download, ShieldCheck 
} from 'lucide-react';
import { Hero3DCanvas } from '../canvas/Hero3DCanvas';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden bg-cyber-grid bg-radial-vignette">
      {/* Background ambient glow spheres */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Personal Intro & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 shadow-lg backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <span className="text-xs font-mono text-cyan-200">
                MCA Postgraduate • Sapthagiri NPS University
              </span>
            </div>

            {/* Main Greeting & Name */}
            <div className="space-y-2">
              <span className="text-sm sm:text-base font-mono text-slate-400 block tracking-wide">
                Welcome to my digital workspace
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-none">
                Hi, I’m <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                  {PERSONAL_INFO.name}
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <p className="text-base sm:text-xl font-semibold text-slate-200 tracking-tight flex flex-wrap items-center gap-2">
              <span>MCA Student</span>
              <span className="text-cyan-400">•</span>
              <span>Full-Stack Developer</span>
              <span className="text-cyan-400">•</span>
              <span className="text-cyan-300">AI & Data Science Enthusiast</span>
            </p>

            {/* Executive Bio Excerpt */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Specializing in Core AI and Data Science with a BCA foundation. Dedicated to building production-grade full-stack architectures in Java, Spring Boot, and Python, accompanied by reactive web interfaces and data-driven intelligence.
            </p>

            {/* Location & Timezone Indicator */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {PERSONAL_INFO.location}
              </span>
              <span>•</span>
              <span className="text-slate-400">Timezone: {PERSONAL_INFO.timezone}</span>
            </div>

            {/* Action Buttons: Explore Projects & Contact Me */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollTo('projects')}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center gap-2.5 transition-all shadow-lg shadow-cyan-500/25 active:scale-95 cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </button>

              {/* Direct GitHub & LinkedIn Links */}
              <div className="flex items-center gap-2 ml-1">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-all shadow-sm"
                  aria-label="Visit Harshavardhan's GitHub Profile"
                  title="GitHub Profile (Harsha-Surya08)"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-all shadow-sm"
                  aria-label="Visit Harshavardhan's LinkedIn Profile"
                  title="LinkedIn Profile (harsha-vardhan18-n)"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Stat Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
              {PERSONAL_INFO.stats.map((stat, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
                  <span className="text-[11px] font-mono text-slate-400 block mb-0.5">
                    {stat.label}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white font-mono">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Interactive Hero Canvas (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full relative rounded-3xl overflow-hidden glass-panel border border-cyan-500/20 shadow-2xl">
              <Hero3DCanvas />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
