import React from 'react';
import { Award, Cloud, Brain, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { CERTIFICATIONS } from '../../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  const awsCert = CERTIFICATIONS.find((c) => c.id === 'aws-restart');
  const infosysCerts = CERTIFICATIONS.filter((c) => c.id !== 'aws-restart');

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-slate-950/90 bg-cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-xs font-mono text-cyan-300">
            <Award className="w-3.5 h-3.5" />
            <span>Accredited Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Certifications</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Industry-recognized credentials validating cloud infrastructure expertise and advanced artificial intelligence specializations.
          </p>
        </div>

        {/* AWS re/Start Spotlight Card */}
        {awsCert && (
          <div className="mb-10 max-w-5xl mx-auto">
            <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/20 border border-amber-500/30 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-950/80 border border-amber-600 text-amber-300">
                      Featured Cloud Credential
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Issued by {awsCert.issuer}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                    {awsCert.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Comprehensive full-time cloud enablement program covering core AWS services, secure Linux system administration, networking, database management (RDS), scalable object storage (S3), and automated compute (EC2).
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {awsCert.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-950 border border-amber-500/20 text-amber-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/70 border border-amber-500/20 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 mb-3">
                    <Cloud className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    AWS re/Start
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Graduate Accreditation
                  </span>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verified Credential</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Infosys Springboard Certifications Subheader */}
        <div className="text-center mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            Infosys Springboard AI & Data Suite (6 Certifications)
          </span>
        </div>

        {/* 6 Infosys Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {infosysCerts.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider font-semibold bg-cyan-950/80 border border-cyan-800 text-cyan-300">
                    {cert.badgeLabel}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {cert.issuer}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                  {cert.title}
                </h3>

                <div className="space-y-1.5 mb-4">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Curriculum Competencies:
                  </span>
                  <ul className="space-y-1">
                    {cert.topics.map((top, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{top}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1 text-cyan-400">
                  <Sparkles className="w-3 h-3" />
                  Infosys Springboard
                </span>
                <span className="text-emerald-400 font-semibold">Completed</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
