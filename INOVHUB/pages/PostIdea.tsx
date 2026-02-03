import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket } from 'lucide-react';
// PERBAIKAN ALAMAT IMPORT DI SINI
import { supabase } from '../supabaseService'; 

const PostIdea: React.FC<{ onAdd: any }> = ({ onAdd }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('website_data')
        .insert([{ 
          content: { 
            title, 
            description,
            status: 'Active',
            createdAt: new Date().toISOString()
          } 
        }])
        .select();

      if (error) throw error;
      
      if (data) {
        alert("Berhasil memposting ide!");
        navigate('/');
      }
    } catch (err: any) {
      alert("Gagal mengirim: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-sm mt-10">
      <h1 className="text-3xl font-bold mb-6">Post Ide Inovasi</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-2">Judul Proyek</label>
          <input 
            className="w-full p-4 bg-slate-50 rounded-xl outline-none border border-slate-100"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Aplikasi Pendeteksi Hama"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Deskripsi Singkat</label>
          <textarea 
            className="w-full p-4 bg-slate-50 rounded-xl outline-none border border-slate-100"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan ide Anda..."
            required
          />
        </div>
        <button 
          disabled={loading}
          type="submit"
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <Rocket className="w-5 h-5" />
          {loading ? 'Sedang Mengirim...' : 'Launch Idea'}
        </button>
      </form>
    </div>
  );
};

export default PostIdea;
