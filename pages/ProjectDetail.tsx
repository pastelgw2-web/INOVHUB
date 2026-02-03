
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Project } from '../types';
import { HandCoins, Users, Calendar, Share2, Heart, ShieldCheck, ArrowLeft, Send } from 'lucide-react';

interface Props {
  projects: Project[];
}

const ProjectDetail: React.FC<Props> = ({ projects }) => {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState<'About' | 'Volunteers' | 'Updates'>('About');

  if (!project) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold">Project not found</h2>
      <Link to="/" className="text-indigo-600 mt-4 block">Back to Home</Link>
    </div>
  );

  const progressPercent = Math.min((project.currentAmount / project.goalAmount) * 100, 100);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Discover
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Media & Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="aspect-video rounded-3xl overflow-hidden bg-slate-200 shadow-xl shadow-slate-200">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex items-center gap-6 border-b border-slate-200">
            {(['About', 'Volunteers', 'Updates'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 text-sm font-bold transition-all ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {activeTab === 'About' && (
              <div className="prose prose-slate max-w-none">
                <h1 className="text-4xl font-extrabold text-slate-900">{project.title}</h1>
                <p className="text-lg text-slate-600 leading-relaxed mt-4">{project.description}</p>
                
                <h3 className="text-xl font-bold mt-8 mb-4">The Innovation Journey</h3>
                <p>We are building a scalable solution that addresses the core bottlenecks in our category. This project aims to bring significant impact to over 10,000 users in its first year.</p>
                
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                    <Calendar className="w-8 h-8 text-indigo-500" />
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Launch Date</p>
                      <p className="font-bold">May 2024</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                    <ShieldCheck className="w-8 h-8 text-teal-500" />
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Verified By</p>
                      <p className="font-bold">InnoHub Core</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Volunteers' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Open Roles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.skillSlots.map(slot => (
                    <div key={slot.id} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-lg text-slate-800">{slot.title}</h4>
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${slot.filled >= slot.capacity ? 'bg-slate-100 text-slate-400' : 'bg-teal-100 text-teal-700'}`}>
                          {slot.filled}/{slot.capacity} Filled
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">Requirements: 2+ years experience in the field, passion for social impact.</p>
                      <button className="w-full py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors disabled:bg-slate-200" disabled={slot.filled >= slot.capacity}>
                        Apply to Join
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="space-y-6">
          <div className="sticky top-24 space-y-6">
            {/* Fundraising Card */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
              <div className="space-y-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-indigo-600">Rp {(project.currentAmount / 1000000).toFixed(1)}M</span>
                  <span className="text-slate-400 text-sm font-medium">/ Rp {(project.goalAmount / 1000000).toFixed(1)}M</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-700" style={{ width: `${progressPercent}%` }} />
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>{progressPercent.toFixed(0)}% Funded</span>
                  <span>14 Days Left</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-slate-50 rounded-2xl">
                  <p className="text-xl font-bold">1,240</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Donors</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-2xl">
                  <p className="text-xl font-bold">12</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Volunteers</p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
                  Back This Innovation
                </button>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 border border-slate-200 py-3 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-colors">
                    <Heart className="w-4 h-4 text-rose-500" /> Favorite
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 border border-slate-200 py-3 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-colors">
                    <Share2 className="w-4 h-4 text-slate-400" /> Share
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-center text-slate-400 leading-tight">
                All donations are processed securely. Funds are released based on project milestones.
              </p>
            </div>

            {/* Creator Info */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-700 overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/initials/svg?seed=Creator`} alt="Creator" />
                </div>
                <div>
                  <h4 className="font-bold">Innovator Studio</h4>
                  <p className="text-xs text-slate-400">Jakarta, Indonesia</p>
                </div>
              </div>
              <p className="text-xs text-slate-300">A lab dedicated to solving clean water challenges through modular architecture.</p>
              <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors">Contact Founder</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
