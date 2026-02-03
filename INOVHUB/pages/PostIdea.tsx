import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, Category } from '../types';
import { CATEGORIES } from '../constants';
import { Rocket, Sparkles, AlertCircle, Loader2 } from 'lucide-react'; // Pastikan ada Loader2 di sini
import { analyzeProjectCuration } from '../services/geminiService';
import { supabase } from '../services/supabaseService'; 

interface Props {
  onAdd: (project: Project) => void;
}

const PostIdea: React.FC<Props> = ({ onAdd }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    
    const newProjectData = {
      title: formData.title,
      tagline: formData.tagline,
      description: formData.description,
      category: formData.category,
      goalAmount: formData.goal,
      currentAmount: 0,
      image: `https://picsum.photos/seed/${Math.random()}/800/600`,
      skillSlots: [
        { id: 's-auto-1', title: 'Lead Developer', capacity: 1, filled: 0 },
        { id: 's-auto-2', title: 'Growth Hacker', capacity: 1, filled: 0 }
      ],
      status: 'Active'
    };

    try {
      // Mengirim ke tabel website_data
      const { data, error } = await supabase
        .from('website_data')
        .insert([{ content: newProjectData }])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        const savedProject: Project = {
          id: data[0].id.toString(),
          ...newProjectData,
          createdAt: data[0].created_at
        };
        onAdd(savedProject);
        navigate('/');
      }
    } catch (err: any) {
      console.error("Gagal simpan:", err);
      alert("Error: " + err.message);
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
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-slate-900">Share Your Vision</h1>
        <p className="text-xl text-slate-500">Kirim ide inovasi Anda ke Supabase Cloud.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-400">Project Title</label>
              <input 
                required
                className="w-full p-4 bg-slate-50 rounded-2xl outline-none"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-400">Description</label>
              <textarea 
                required
                rows={4}
                className="w-full p-4 bg-slate-50 rounded-2xl outline-none"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : <Rocket />}
              {isSubmitting ? 'Launching...' : 'Launch Idea'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostIdea;
