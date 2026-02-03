import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket } from 'lucide-react';
// Gunakan ../../ untuk keluar dari folder 'pages' lalu masuk ke 'services'
import { supabase } from '../../services/supabaseService'; 

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
        alert("Berhasil!");
        navigate('/');
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Post Idea</h1>
      <form onSubmit={handleSubmit}>
        <input 
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          placeholder="Judul" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          required 
        />
        <textarea 
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          placeholder="Deskripsi" 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          required 
        />
        <button 
          disabled={loading} 
          type="submit" 
          style={{ width: '100%', padding: '10px', background: 'blue', color: 'white' }}
        >
          {loading ? 'Sending...' : 'Post'}
        </button>
      </form>
    </div>
  );
};

export default PostIdea;
