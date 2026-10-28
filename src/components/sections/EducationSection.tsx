import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';
import { EDUCATIONS } from '../../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-xs font-mono text-cyan-300">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Qualifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Education <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Milestones</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Formal computational and scientific background from secondary education to advanced MCA postgraduate specialization.
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {EDUCATIONS.map((edu, idx) => (
            <div
              key={edu.id}
              className="p-6 sm:p-7 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge & Year */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                    {edu.period}
                  </span>
                  
                  {edu.grade && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-950/80 border border-emerald-700 text-emerald-300">
                      {edu.grade}
                    </span>
                  )}
                </div>

                {/* Degree & Specialization */}
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {edu.degree}
                </h3>
                
                {edu.specialization && (
                  <p className="text-xs font-semibold text-cyan-300/90 mt-0.5 mb-2 font-mono">
                    Specialization: {edu.specialization}
                  </p>
                )}

                {/* Institution & Location */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 font-medium mb-3">
                  <span className="text-slate-200">{edu.institution}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {edu.location}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {edu.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Verified Academic Record</span>
                <span className="text-cyan-400">Bangalore, IN</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
