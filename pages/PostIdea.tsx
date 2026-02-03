
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, Category } from '../types';
import { CATEGORIES } from '../constants';
import { Rocket, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { analyzeProjectCuration } from '../services/geminiService';
import { supabase } from '../services/supabaseService';

interface Props {
  onAdd: (project: Project) => void;
}

const PostIdea: React.FC<Props> = ({ onAdd }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    description: '',
    category: 'Technology' as Category,
    goal: 10000000,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Menyiapkan data untuk Supabase sesuai kolom yang Anda sebutkan
      const dbPayload = {
        title: formData.title,
        tagline: formData.tagline,
        description: formData.description,
        category: formData.category,
        funding_goal: formData.goal,
        current_amount: 0,
        status: 'Active',
        creator_id: 'u1', // Default creator ID untuk demo
        image_url: `https://picsum.photos/seed/${Math.random()}/800/600`
      };

      const { data, error } = await supabase
        .from('innovations')
        .insert([dbPayload])
        .select();

      if (error) throw error;

      const savedItem = data[0];
      
      // Mengonversi kembali ke format Project UI
      const newProject: Project = {
        id: savedItem.id.toString(),
        title: savedItem.title,
        tagline: savedItem.tagline,
        description: savedItem.description,
        category: savedItem.category as Category,
        creatorId: savedItem.creator_id,
        goalAmount: savedItem.funding_goal,
        currentAmount: 0,
        image: savedItem.image_url,
        skillSlots: [
          { id: 's-auto-1', title: 'Lead Developer', capacity: 1, filled: 0 },
          { id: 's-auto-2', title: 'Growth Hacker', capacity: 1, filled: 0 }
        ],
        status: 'Active',
        createdAt: savedItem.created_at
      };

      onAdd(newProject);
      navigate('/');
    } catch (err) {
      console.error("Gagal menyimpan ke database:", err);
      alert("Terjadi kesalahan saat menyimpan ide Anda. Pastikan tabel 'innovations' sudah ada di Supabase.");
    } finally {
      setSaving(false);
    }
  };

  const handleAiCheck = async () => {
    if (!formData.title || !formData.description) return;
    setLoading(true);
    try {
      const analysis = await analyzeProjectCuration(formData.title, formData.description);
      setAiAnalysis(analysis);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-slate-900">Share Your Vision</h1>
        <p className="text-xl text-slate-500">Transform your innovation from a draft to a community-powered movement.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Project Title</label>
              <input 
                required
                className="w-full p-4 bg-slate-50 rounded-2xl focus:ring-2 ring-indigo-500 outline-none text-lg font-bold"
                placeholder="e.g. Solar-Powered Agri-Drone"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Short Tagline</label>
              <input 
                required
                className="w-full p-4 bg-slate-50 rounded-2xl focus:ring-2 ring-indigo-500 outline-none"
                placeholder="A one-sentence summary that hooks people."
                value={formData.tagline}
                onChange={e => setFormData({...formData, tagline: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Category</label>
                <select 
                  className="w-full p-4 bg-slate-50 rounded-2xl focus:ring-2 ring-indigo-500 outline-none font-medium"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as Category})}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Funding Goal (IDR)</label>
                <input 
                  type="number"
                  required
                  className="w-full p-4 bg-slate-50 rounded-2xl focus:ring-2 ring-indigo-500 outline-none font-bold"
                  value={formData.goal}
                  onChange={e => setFormData({...formData, goal: Number(e.target.value)})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Deep Description</label>
              <textarea 
                required
                rows={6}
                className="w-full p-4 bg-slate-50 rounded-2xl focus:ring-2 ring-indigo-500 outline-none resize-none"
                placeholder="Describe the problem, your solution, and the impact you want to create..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="button"
                onClick={handleAiCheck}
                disabled={loading || saving}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-indigo-100 py-4 rounded-2xl font-bold text-indigo-600 hover:bg-indigo-50 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />} 
                {loading ? 'Analyzing...' : 'AI Feedback'}
              </button>
              <button 
                type="submit"
                disabled={saving}
                className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving && <Loader2 className="w-5 h-5 animate-spin" />}
                {saving ? 'Saving to Database...' : 'Launch Idea'}
              </button>
            </div>
          </form>
        </div>

        {/* AI Sidebar */}
        <div className="space-y-6">
          <div className="bg-indigo-900 text-white p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold">InnoAI Curation</h3>
            </div>
            
            {!aiAnalysis ? (
              <p className="text-sm text-indigo-200 leading-relaxed">
                Click "AI Feedback" after filling the title and description to get instant feasibility score and improvement suggestions from Gemini.
              </p>
            ) : (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest">Feasibility Score</span>
                  <span className="text-2xl font-black text-amber-400">{aiAnalysis.Feasibility}/10</span>
                </div>
                <div className="w-full h-2 bg-indigo-800 rounded-full overflow-hidden">
                   <div className="h-full bg-amber-400" style={{ width: `${aiAnalysis.Feasibility * 10}%` }} />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase text-indigo-300">Suggestions</p>
                  <ul className="text-sm space-y-2">
                    {Array.isArray(aiAnalysis.Suggestions) ? aiAnalysis.Suggestions.map((s: string, i: number) => (
                      <li key={i} className="flex gap-2">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>{s}</span>
                      </li>
                    )) : <li>{aiAnalysis['Suggested improvements']}</li>}
                  </ul>
                </div>
                <div className="p-4 bg-indigo-800 rounded-2xl">
                  <p className="text-[10px] font-bold uppercase text-indigo-300 mb-1">Critical Skills Missing</p>
                  <p className="text-sm font-medium">{Array.isArray(aiAnalysis['Missing critical skills']) ? aiAnalysis['Missing critical skills'].join(', ') : aiAnalysis['Missing critical skills']}</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              Your idea will be saved to Supabase and then curated by our admin team before appearing in the public catalog.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostIdea;
