import React, { useState } from 'react';
import { 
  X, Bell, Home, Calendar, AlertCircle, Wrench, 
  Send, Search, CheckCircle2, Server, Smartphone, Sparkles 
} from 'lucide-react';
import { Project } from '../../data/portfolioData';

interface ApartmentSystemModalProps {
  project: Project;
  onClose: () => void;
}

interface NoticeItem {
  id: number;
  category: 'urgent' | 'maintenance' | 'event';
  title: string;
  time: string;
  unit: string;
  content: string;
  badgeColor: string;
}

const INITIAL_NOTICES: NoticeItem[] = [
  {
    id: 1,
    category: 'urgent',
    title: 'Water Supply Maintenance Shutdown',
    time: 'Today, 2:00 PM – 5:00 PM',
    unit: 'Block A & B',
    content: 'Routine overhead tank cleaning and pressure pump calibration. Please store water in advance.',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
  },
  {
    id: 2,
    category: 'maintenance',
    title: 'Elevator 2 Annual Safety Inspection',
    time: 'Tomorrow, 10:00 AM',
    unit: 'Tower 1',
    content: 'Certified technician on site. Elevator 1 will remain in service with optimized express routing.',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  },
  {
    id: 3,
    category: 'event',
    title: 'Weekend Community Rooftop Gathering',
    time: 'Saturday, 6:30 PM',
    unit: 'Sky Clubhouse',
    content: 'Board games, casual networking, and seasonal festival snacks for all apartment residents.',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  }
];

export const ApartmentSystemModal: React.FC<ApartmentSystemModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'simulation' | 'features' | 'flask'>('simulation');
  const [filterCat, setFilterCat] = useState<'all' | 'urgent' | 'maintenance' | 'event'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notices, setNotices] = useState<NoticeItem[]>(INITIAL_NOTICES);
  
  // Quick Post Mock Notice State
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCat, setNewCat] = useState<'urgent' | 'maintenance' | 'event'>('event');
  const [showPostSuccess, setShowPostSuccess] = useState<boolean>(false);

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newNotice: NoticeItem = {
      id: Date.now(),
      category: newCat,
      title: newTitle,
      time: 'Just now',
      unit: 'Admin Broadcast',
      content: 'Broadcast notification submitted to digital resident dashboard feed.',
      badgeColor: newCat === 'urgent' 
        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' 
        : newCat === 'maintenance'
        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    };

    setNotices([newNotice, ...notices]);
    setNewTitle('');
    setShowPostSuccess(true);
    setTimeout(() => setShowPostSuccess(false), 2500);
  };

  const filteredNotices = notices.filter(n => {
    const matchesCat = filterCat === 'all' || n.category === filterCat;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-apt-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="modal-apt-title" className="text-xl font-bold text-white tracking-tight">
                  {project.title}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950/80 border border-amber-700 text-amber-300">
                  Flask + Cartoon UI
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
            onClick={() => setActiveTab('simulation')}
            className={`py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'simulation'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Interactive Cartoon Notification Mockup
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'features'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Frontend & UX Features
          </button>
          <button
            onClick={() => setActiveTab('flask')}
            className={`py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'flask'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            Python Flask Routing Engine
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 flex-1">
          {activeTab === 'simulation' && (
            <div className="space-y-6">
              {/* Illustrative Mockup Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 to-orange-950/30 border border-amber-600/30 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl shadow-inner">
                    🏢
                  </div>
                  <div>
                    <h3 className="font-bold text-white flex items-center gap-2">
                      SunnyHeights Digital Resident Board
                    </h3>
                    <p className="text-xs text-amber-200/80">
                      Illustrative Interactive Mockup of the Cartoon-Themed Frontend & Flask Dispatcher
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Interactive Live Prototype
                </span>
              </div>

              {/* Simulation Interface */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Notice Feed (2 cols) */}
                <div className="md:col-span-2 space-y-3">
                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search notices..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="flex gap-1">
                      {(['all', 'urgent', 'maintenance', 'event'] as const).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setFilterCat(cat)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                            filterCat === cat
                              ? 'bg-amber-500 text-slate-950 font-bold'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notices List */}
                  <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                    {filteredNotices.map((n) => (
                      <div
                        key={n.id}
                        className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col gap-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${n.badgeColor}`}>
                            {n.category}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">{n.time}</span>
                        </div>
                        <h4 className="font-semibold text-slate-100 text-xs">{n.title}</h4>
                        <p className="text-[11px] text-slate-400">{n.content}</p>
                        <div className="text-[10px] text-amber-400/90 font-mono mt-0.5 flex items-center gap-1">
                          <Home className="w-3 h-3" />
                          <span>Scope: {n.unit}</span>
                        </div>
                      </div>
                    ))}
                    {filteredNotices.length === 0 && (
                      <p className="text-xs text-slate-500 text-center py-6">
                        No notices found matching query.
                      </p>
                    )}
                  </div>
                </div>

                {/* Dispatch New Notice Box */}
                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5 mb-2">
                      <Bell className="w-3.5 h-3.5 text-amber-400" />
                      Dispatch Resident Notice
                    </h4>
                    <p className="text-[11px] text-slate-400 mb-3">
                      Test instant real-time DOM update and Flask payload dispatch.
                    </p>

                    <form onSubmit={handlePostNotice} className="space-y-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Notice Title
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Garden Painting Work"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Priority / Category
                        </label>
                        <select
                          value={newCat}
                          onChange={(e) => setNewCat(e.target.value as any)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-amber-300 focus:outline-none focus:border-amber-400"
                        >
                          <option value="event">Community Event (Green)</option>
                          <option value="maintenance">Maintenance (Yellow)</option>
                          <option value="urgent">Urgent Alert (Red)</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow active:scale-98"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Broadcast to Board</span>
                      </button>
                    </form>

                    {showPostSuccess && (
                      <div className="mt-2 p-2 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-[11px] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Notice broadcast dispatched!</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
                    Client: HTML/CSS/JS • Backend: Python Flask
                  </div>
                </div>
              </div>

              {/* Technology Tags */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Verified Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-800 text-amber-300 border border-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <h4 className="font-semibold text-white">System Highlights & Key Deliverables</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.keyFeatures.map((feat, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'flask' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs border border-slate-800 text-slate-300">
                <span className="text-amber-400 font-bold block mb-2">Flask Routing & Template Dispatcher</span>
                <pre className="text-slate-400 leading-relaxed overflow-x-auto p-2 bg-slate-900 rounded border border-slate-800">
{`from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/notices", methods=["GET"])
def get_notices():
    category = request.args.get("category", "all")
    # Return structured notice feeds filtered by priority
    return jsonify(filter_notices(category))

@app.route("/broadcast", methods=["POST"])
def post_alert():
    data = request.get_json()
    # Validate payload and broadcast to connected residents
    return jsonify({"status": "published", "notice": data}), 201`}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <h4 className="font-semibold text-white text-xs mb-1">Architecture Summary</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Engineered with lightweight Python Flask server handling multi-page routes, structured JSON responses, and responsive client-side DOM scripting for cartoon-themed animation states.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-between items-center text-xs">
          <span className="text-slate-400 font-mono">
            Stack: HTML • CSS • JavaScript • Flask
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
