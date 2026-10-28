import React, { useState } from 'react';
import { 
  X, CheckCircle, AlertTriangle, FileText, Database, 
  Terminal, Sparkles, RefreshCw, Cpu, Layers 
} from 'lucide-react';
import { Project } from '../../data/portfolioData';

interface ResumeAnalyzerModalProps {
  project: Project;
  onClose: () => void;
}

export const ResumeAnalyzerModal: React.FC<ResumeAnalyzerModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'demo' | 'architecture' | 'database'>('demo');
  
  // Interactive Simulation State
  const [targetRole, setTargetRole] = useState<'fullstack' | 'datascience'>('fullstack');
  const [resumeText, setResumeText] = useState<string>(
    "Harshavardhan N - Experienced in Java, Spring Boot, MySQL, REST APIs, Git, JavaScript, and HTML5. Developed full stack applications and automated database workflows."
  );
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<{
    score: number;
    matched: string[];
    missing: string[];
    recommendations: string[];
  } | null>({
    score: 84,
    matched: ['Java', 'Spring Boot', 'MySQL', 'REST APIs', 'Git', 'JavaScript', 'HTML5'],
    missing: ['Docker', 'AWS EC2', 'Microservices', 'Unit Testing / JUnit'],
    recommendations: [
      'Add quantifiable metric outcomes (e.g. "reduced latency by 25%").',
      'Incorporate cloud deployment keywords (AWS EC2 / S3) to increase ATS match.',
      'Highlight Spring Data JPA transaction management experiences.'
    ]
  });

  const runSimulation = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      if (targetRole === 'fullstack') {
        setScoreResult({
          score: 88,
          matched: ['Java', 'Spring Boot', 'Spring Data JPA', 'MySQL', 'Hibernate', 'REST APIs', 'HTML5/CSS3'],
          missing: ['Kafka', 'Docker Containerization', 'CI/CD Pipelines'],
          recommendations: [
            'Quantify your backend API throughput and performance improvements.',
            'Include specific mention of Spring Security JWT implementation.',
            'Expand on dual database profile testing automation with H2.'
          ]
        });
      } else {
        setScoreResult({
          score: 82,
          matched: ['Python', 'SQL', 'Data Visualization', 'Pandas', 'Machine Learning Foundations'],
          missing: ['PyTorch / TensorFlow', 'MLOps', 'Feature Store'],
          recommendations: [
            'Include statistical significance metrics in data analysis projects.',
            'Detail experience with model evaluation matrices (Precision/Recall/F1).'
          ]
        });
      }
      setIsAnalyzing(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="modal-title" className="text-xl font-bold text-white tracking-tight">
                  {project.title}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 border border-cyan-800 text-cyan-300">
                  Full-Stack Java / Spring Boot
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{project.tagline}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-900/40 px-5 gap-4">
          <button
            onClick={() => setActiveTab('demo')}
            className={`py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'demo'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Interactive ATS Simulation
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'architecture'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Spring Boot Architecture
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'database'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            MySQL & H2 Dual Profile
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 flex-1">
          {activeTab === 'demo' && (
            <div className="space-y-6">
              {/* Simulation Banner */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Live ATS Scoring & Skill Gap Engine
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Simulates the application's Spring Boot backend text parsing, keyword density calculation, and gap analysis.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Target Role:</span>
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value as any)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-cyan-300 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="fullstack">Senior Full-Stack Java Engineer</option>
                    <option value="datascience">AI & Data Science Specialist</option>
                  </select>
                </div>
              </div>

              {/* Input Area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Resume Snippet / Input Text
                  </label>
                  <textarea
                    rows={4}
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500/50"
                  />
                  <button
                    onClick={runSimulation}
                    disabled={isAnalyzing}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Running Tokenizer & ATS Matcher...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Run ATS Evaluation</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Score & Breakdown Card */}
                {scoreResult && (
                  <div className="rounded-xl bg-slate-950/80 border border-cyan-500/30 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-medium">ATS Match Score</span>
                        <span className="text-2xl font-black font-mono text-cyan-400">
                          {scoreResult.score}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1.5 mb-3">
                        <div 
                          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${scoreResult.score}%` }}
                        />
                      </div>

                      {/* Matched Keywords */}
                      <div className="space-y-1.5 mb-3">
                        <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Matched Technical Keywords ({scoreResult.matched.length})
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {scoreResult.matched.map((kw) => (
                            <span key={kw} className="px-2 py-0.5 rounded text-[10px] bg-emerald-950/70 border border-emerald-800/80 text-emerald-300 font-mono">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Missing Gaps */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Identified Skill Gaps
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {scoreResult.missing.map((mg) => (
                            <span key={mg} className="px-2 py-0.5 rounded text-[10px] bg-amber-950/70 border border-amber-800/80 text-amber-300 font-mono">
                              {mg}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="mt-3 pt-3 border-t border-slate-800">
                      <span className="text-[11px] font-semibold text-slate-300 block mb-1">
                        System Recommendations:
                      </span>
                      <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                        {scoreResult.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Technologies Tag Bar */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Verified Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-800 text-cyan-300 border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 font-mono text-xs">
                <div className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Spring Boot MVC & JPA Pipeline Workflow
                </div>
                <div className="space-y-3 text-slate-300">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-yellow-400 font-semibold">[1] Controller Layer:</span> ResumeUploadController.java
                    <p className="text-slate-400 text-[11px] mt-1 font-sans">
                      Receives multipart resume file upload (PDF/DOCX/TXT) and target job description payload via POST `/api/v1/resume/analyze`.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-cyan-400 font-semibold">[2] Service & Engine Layer:</span> AtsScoreService.java
                    <p className="text-slate-400 text-[11px] mt-1 font-sans">
                      Performs text normalization, stop-word elimination, n-gram tokenization, keyword frequency correlation, and gap scoring.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-purple-400 font-semibold">[3] Persistence Layer:</span> ResumeAnalysisRepository.java (Spring Data JPA)
                    <p className="text-slate-400 text-[11px] mt-1 font-sans">
                      Persists analysis history, score breakdowns, candidate benchmarks, and improvement recommendations into entities.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Key System Capabilities</h4>
                <ul className="space-y-2">
                  {project.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700">
                <h4 className="font-semibold text-white flex items-center gap-2 mb-2">
                  <Database className="w-4 h-4 text-cyan-400" />
                  Automated Dual-Profile Database Strategy
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  The application is configured using Spring Boot profiles (<code className="text-cyan-300 font-mono">application-dev.properties</code> and <code className="text-cyan-300 font-mono">application-prod.properties</code>) to support continuous testing and persistence without environment friction.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-xs font-bold text-emerald-400 block mb-1">Local H2 In-Memory Profile</span>
                    <p className="text-xs text-slate-400 mb-2">
                      Zero-setup fast startup profile designed for automated integration tests and local development with H2 web console.
                    </p>
                    <pre className="text-[10px] font-mono bg-slate-900 p-2 rounded text-slate-300 border border-slate-800">
                      spring.datasource.url=jdbc:h2:mem:resumedb{"\n"}
                      spring.h2.console.enabled=true
                    </pre>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-xs font-bold text-cyan-400 block mb-1">Production MySQL Profile</span>
                    <p className="text-xs text-slate-400 mb-2">
                      Full relational persistence with Hibernate DDL validation, connection pooling, and indexed query tables.
                    </p>
                    <pre className="text-[10px] font-mono bg-slate-900 p-2 rounded text-slate-300 border border-slate-800">
                      spring.datasource.url=jdbc:mysql://localhost:3306/ats_db{"\n"}
                      spring.jpa.hibernate.ddl-auto=update
                    </pre>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Build & Automation Workflow</h4>
                <p className="text-xs text-slate-300">
                  Built and verified using Maven build lifecycle with automated PowerShell scripts to package jar artifacts and execute profile unit tests with zero manual interventions.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-between items-center text-xs">
          <span className="text-slate-400 font-mono">
            Stack: Java • Spring Boot • MySQL • H2 • JPA
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
