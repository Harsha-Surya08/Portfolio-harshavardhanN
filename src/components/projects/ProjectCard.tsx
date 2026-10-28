import React from 'react';
import { Project } from '../../data/portfolioData';
import { Sparkles, ArrowRight, Layers, FileCode } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  const isResume = project.id === 'resume-analyzer';

  return (
    <div className="group relative rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 shadow-xl hover:shadow-cyan-500/10">
      {/* Glow accent */}
      <div 
        className={`absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity ${
          isResume ? 'bg-cyan-500' : 'bg-amber-500'
        }`}
      />

      <div>
        {/* Top meta */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-cyan-400">
            {project.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Interactive Mockup
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-cyan-400/90 font-medium mt-1 mb-3">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Feature Highlights */}
        <div className="space-y-2 mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
            Key Architecture Points:
          </span>
          <ul className="space-y-1.5">
            {project.keyFeatures.slice(0, 3).map((feat, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>{feat.split(':')[0]}: <span className="text-slate-400">{feat.split(':')[1]}</span></span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        {/* Technologies Tag Cloud */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-900/90 text-slate-300 border border-slate-800"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={() => onOpenDetails(project)}
          className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 shadow-lg ${
            isResume
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/20'
              : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 shadow-amber-500/20'
          }`}
        >
          <span>Launch Interactive Demo & Architecture</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
