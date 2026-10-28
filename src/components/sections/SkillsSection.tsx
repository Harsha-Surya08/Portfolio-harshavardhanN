import React, { useState } from 'react';
import { 
  Code2, Coffee, FileCode, Database, Globe, 
  Palette, Layers, Server, Atom, Layout, 
  Cloud, HardDrive, DatabaseZap, BarChart3, 
  PieChart, Cpu, Binary, Network, GitBranch, 
  Search, Sparkles, Filter 
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { Skills3DCloud } from '../canvas/Skills3DCloud';

// Icon mapping helper
const ICON_MAP: Record<string, React.ElementType> = {
  Code2,
  Coffee,
  FileCode,
  Database,
  Globe,
  Palette,
  Layers,
  Server,
  Atom,
  Layout,
  Cloud,
  HardDrive,
  DatabaseZap,
  BarChart3,
  PieChart,
  Cpu,
  Binary,
  Network,
  GitBranch,
};

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...SKILL_CATEGORIES.map((c) => c.category)];

  // Flatten all skills with category metadata
  const allSkills = SKILL_CATEGORIES.flatMap((c) =>
    c.skills.map((s) => ({ ...s, category: c.category }))
  );

  const filteredSkills = allSkills.filter((s) => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-950/90 bg-cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-xs font-mono text-cyan-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Skills & Tooling</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Categorized technical capabilities and practical engineering applications across full-stack systems, cloud platforms, and data analytics.
          </p>
        </div>

        {/* 3D Visual Cloud & Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          
          {/* 3D Interactive WebGL Sphere (5 cols) */}
          <div className="lg:col-span-5">
            <Skills3DCloud
              selectedCategory={selectedCategory}
              activeSkill={activeSkill}
              onSelectSkill={(skillName) => setActiveSkill(skillName)}
            />
          </div>

          {/* Controls & Filter Bar (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-5">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-cyan-400" />
                  Filter by Domain ({filteredSkills.length} competencies)
                </span>
                
                {/* Search Input */}
                <div className="relative w-full sm:w-60">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setActiveSkill(null);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 leading-relaxed">
                <span className="text-cyan-300 font-semibold">Strict Fidelity Assurance:</span> Skills are presented through verified technological applications and categorized domains without fabricated percentage meters.
              </div>
            </div>
          </div>

        </div>

        {/* Categorized Skills Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => {
            const Icon = ICON_MAP[skill.icon] || Code2;
            const isSelected = activeSkill === skill.name;

            return (
              <div
                key={skill.name}
                onClick={() => setActiveSkill(isSelected ? null : skill.name)}
                className={`p-5 rounded-2xl glass-panel transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'ring-2 ring-cyan-400 bg-slate-900 border-cyan-500/40 shadow-xl'
                    : 'border-slate-800/80 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-500/30 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                      {skill.category.split(' ')[0]}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors mb-1.5">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-cyan-400">
                  <span>Interactive Spec</span>
                  <span className="text-slate-500 group-hover:text-slate-300">
                    {isSelected ? 'Selected' : 'Click to inspect'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="p-12 text-center rounded-2xl glass-panel border border-slate-800 text-slate-400">
            <p>No skills found matching &ldquo;{searchQuery}&rdquo; in this category.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
