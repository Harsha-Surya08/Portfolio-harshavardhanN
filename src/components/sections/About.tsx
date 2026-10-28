import React from 'react';
import { 
  GraduationCap, Code, Cpu, Database, 
  BarChart3, Network, Sparkles, CheckCircle2 
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const About: React.FC = () => {
  const coreInterests = [
    {
      title: "Full-Stack Development",
      desc: "Architecting end-to-end web applications with robust backend services in Java (Spring Boot) and Python (Flask), paired with dynamic React frontends.",
      icon: Code,
      color: "text-cyan-400",
      border: "border-cyan-500/20"
    },
    {
      title: "AI-Powered Applications",
      desc: "Leveraging foundational concepts in NLP, computer vision, and machine learning to construct intelligent software that derives insights from unstructured data.",
      icon: Sparkles,
      color: "text-purple-400",
      border: "border-purple-500/20"
    },
    {
      title: "Algorithmic Problem-Solving",
      desc: "Applying object-oriented paradigms (OOP) and efficient data structures and algorithms (DSA) to optimize runtime complexity and memory footprint.",
      icon: Cpu,
      color: "text-emerald-400",
      border: "border-emerald-500/20"
    },
    {
      title: "Data Visualization & Analytics",
      desc: "Transforming raw data streams into high-impact interactive dashboards and analytical views utilizing Power BI and modern charting libraries.",
      icon: BarChart3,
      color: "text-amber-400",
      border: "border-amber-500/20"
    },
    {
      title: "API Integration & Cloud Systems",
      desc: "Engineering RESTful API contracts, seamless JSON serialization, and cloud-ready database architectures across AWS EC2, S3, RDS, MySQL, and MongoDB.",
      icon: Network,
      color: "text-sky-400",
      border: "border-sky-500/20"
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-xs font-mono text-cyan-300">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic & Professional Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Harshavardhan N</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Postgraduate scholar in Core AI & Data Science combining rigorous computational theory with practical full-stack engineering.
          </p>
        </div>

        {/* Narrative & Focus Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Detailed Biography (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Engineering Philosophy
              </h3>
              
              {PERSONAL_INFO.aboutDetailed.map((paragraph, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>MCA (Core AI & Data Science) • Sapthagiri NPS University</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>BCA (Computer Science) • National Degree College (CGPA 7.0)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>AWS re/Start Graduate & 6x Infosys Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Areas of Specialization (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-2">
              Core Technical Interests & Focus Domains
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coreInterests.map((interest, i) => {
                const Icon = interest.icon;
                return (
                  <div
                    key={i}
                    className={`p-5 rounded-xl bg-slate-900/60 border ${interest.border} hover:border-slate-600 transition-all duration-200 glass-panel-hover flex flex-col justify-between`}
                  >
                    <div>
                      <div className={`p-2.5 rounded-lg bg-slate-950 w-fit mb-3.5 ${interest.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1.5">
                        {interest.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {interest.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
