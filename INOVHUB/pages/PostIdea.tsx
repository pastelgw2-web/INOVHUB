import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket } from 'lucide-react';
// Alamat ini sekarang benar karena file supabaseService sudah kita buat di folder services
import { supabase } from '../services/supabaseService'; 

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
      // Input data ke tabel website_data
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
        alert("Ide Berhasil Terkirim ke Cloud!");
        navigate('/');
      }
    } catch (err: any) {
      alert("Gagal: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-sm mt-10">
      <h2 className="text-2xl font-bold mb-6">Launch New Idea</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100"
          placeholder="Judul Inovasi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea 
          className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100"
          rows={4}
          placeholder="Deskripsi ide..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button 
          disabled={loading}
          type="submit"
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <Rocket className="w-5 h-5" />
          {loading ? 'Processing...' : 'Post to Supabase'}
        </button>
      </form>
    </div>
  );
};

export default PostIdea;
