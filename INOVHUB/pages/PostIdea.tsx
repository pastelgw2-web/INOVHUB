import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabaseService';

const PostIdea: React.FC<{ onAdd: any }> = ({ onAdd }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('website_data')
        .insert([{ content: { title, status: 'Active' } }])
        .select();

      if (error) throw error;
      if (data) {
        onAdd({ id: data[0].id, title, status: 'Active' });
        navigate('/');
      }
    } catch (err) {
      alert("Gagal: " + JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Post Ide Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          className="w-full p-3 border rounded"
          placeholder="Judul Inovasi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button 
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-3 rounded font-bold flex justify-center items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Rocket />}
          {loading ? 'Mengirim...' : 'Kirim ke Supabase'}
        </button>
      </form>
    </div>
  );
};

export default PostIdea;
