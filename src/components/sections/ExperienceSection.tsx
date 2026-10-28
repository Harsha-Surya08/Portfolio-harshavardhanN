import React from 'react';
import { Briefcase, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES } from '../../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-slate-950/90 bg-cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-xs font-mono text-cyan-300">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Career History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Experience</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Professional track record across enterprise insurance operations, digital marketing coordination, and customer support with recognized excellence.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Guide Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-600 to-slate-800 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-8 sm:space-y-12">
            {EXPERIENCES.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col sm:flex-row items-center gap-6 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Center Marker */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 items-center justify-center z-10 shadow-lg shadow-cyan-500/20">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  </div>

                  {/* Content Card (Half width on desktop) */}
                  <div className="w-full sm:w-[calc(50%-2rem)]">
                    <div className="p-6 sm:p-7 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-xl group">
                      
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-cyan-950/80 border border-cyan-800 text-cyan-300">
                          {exp.type}
                        </span>

                        {exp.badge && (
                          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950/80 border border-amber-600 text-amber-300">
                            <Award className="w-3.5 h-3.5" />
                            {exp.badge}
                          </span>
                        )}
                      </div>

                      {/* Role & Company */}
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h3>
                      <h4 className="text-sm font-semibold text-cyan-400/90 mb-2">
                        {exp.company}
                      </h4>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-4 pb-3 border-b border-slate-800/80">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {exp.period}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Key Highlights */}
                      <ul className="space-y-2">
                        {exp.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden sm:block w-full sm:w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
