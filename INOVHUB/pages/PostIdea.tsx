import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, Category } from '../types';
import { CATEGORIES } from '../constants';
import { Rocket, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { analyzeProjectCuration } from '../services/geminiService';
import { supabase } from '../services/supabaseService'; // Import supabase

interface Props {
  onAdd: (project: Project) => void;
}

const PostIdea: React.FC<Props> = ({ onAdd }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // State untuk loading saat simpan
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
    if (isSubmitting) return;

    setIsSubmitting(true);
    
    // 1. Siapkan data project
    const newProjectData = {
      title: formData.title,
      tagline: formData.tagline,
      description: formData.description,
      category: formData.category,
      goalAmount: formData.goal,
      currentAmount: 0,
      image: 'https://picsum.photos/seed/' + Math.random() + '/800/600',
      skillSlots: [
        { id: 's-auto-1', title: 'Lead Developer', capacity: 1, filled: 0 },
        { id: 's-auto-2', title: 'Growth Hacker', capacity: 1, filled: 0 }
      ],
      status: 'Active'
    };

    try {
      // 2. KIRIM KE SUPABASE (Tabel website_data)
      const { data, error } = await supabase
        .from('website_data')
        .insert([
          { content: newProjectData } // Masuk ke kolom 'content' sesuai struktur tabel
        ])
        .select();

      if (error) throw error;

      // 3. Jika berhasil, update tampilan lokal dan pindah halaman
      if (data && data[0]) {
        const savedProject: Project = {
          id: data[0].id.toString(),
          ...newProjectData,
          createdAt: data[0].created_at
        };
        onAdd(savedProject);
        alert("Berhasil! Ide inovasi Anda telah terbit.");
        navigate('/');
      }
    } catch (err: any) {
      console.error("Gagal simpan ke database:", err);
      alert("Gagal menyimpan: " + (err.message || "Pastikan koneksi internet stabil."));
    } finally {
      setIsSubmitting(false);
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
    <div className="max-w-4xl mx-auto space-y-12 py-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-slate-900">Share Your Vision</h1>
        <p className="text-xl text-slate-500">Transform your innovation from a draft to a community-powered movement.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6">
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
                placeholder="A one-sentence summary."
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
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="button"
                onClick={handleAiCheck}
                disabled={loading || isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-indigo-100 py-4 rounded-2xl font-bold text-indigo-600 hover:bg-indigo-50 transition-all disabled:opacity-50"
              >
                <Sparkles className="w-5 h-5" /> {loading ? 'Analyzing...' : 'AI Feedback'}
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-indigo-700 transition-all disabled:bg-slate-400 flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Rocket className="w-5 h-5" />}
                {isSubmitting ? 'Launching...' : 'Launch Idea'}
              </button>
            </div>
          </form>
        </div>

        {/* AI Sidebar tetap sama */}
        <div className="space-y-6">
          <div className="bg-indigo-900 text-white p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold">InnoAI Curation</h3>
            </div>
            {!aiAnalysis ? (
              <p className="text-sm text-indigo-200">Fill title and description for AI analysis.</p>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase">Feasibility Score</span>
                  <span className="text-2xl font-black text-amber-400">{aiAnalysis.Feasibility}/10</span>
                </div>
                <div className="w-full h-2 bg-indigo-800 rounded-full overflow-hidden">
                   <div className="h-full bg-amber-400" style={{ width: `${aiAnalysis.Feasibility * 10}%` }} />
                </div>
              </div>
            )}
          </div>
          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <p className="text-xs text-amber-800 font-medium">Data will be saved to Supabase Cloud.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostIdea;
