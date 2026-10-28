import React, { useState } from 'react';
import { Layers, Sparkles, FolderGit2, CheckCircle2 } from 'lucide-react';
import { PROJECTS, Project } from '../../data/portfolioData';
import { ProjectCard } from '../projects/ProjectCard';
import { ResumeAnalyzerModal } from '../projects/ResumeAnalyzerModal';
import { ApartmentSystemModal } from '../projects/ApartmentSystemModal';

export const ProjectsSection: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-xs font-mono text-cyan-300">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Software Engineering Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Full-Stack Works</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Verified enterprise full-stack software and interactive web applications with architectural walkthroughs and live interactive simulations.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(proj) => setActiveModalProject(proj)}
            />
          ))}
        </div>

        {/* Project Technical Integrity Notice */}
        <div className="mt-12 p-6 rounded-2xl glass-panel border border-slate-800/80 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">
              Demonstrated Architecture & Live Interactive Simulations
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Click &ldquo;Launch Interactive Demo & Architecture&rdquo; on any card above to explore the functional ATS scoring engine or the apartment broadcast simulation with exact verified stack specifications.
            </p>
          </div>
        </div>

      </div>

      {/* Render Appropriate Detailed Interactive Modal */}
      {activeModalProject?.type === 'resume-analyzer' && (
        <ResumeAnalyzerModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}

      {activeModalProject?.type === 'apartment-system' && (
        <ApartmentSystemModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
};
