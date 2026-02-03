import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Rocket, Layout, PlusCircle } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import PostIdea from './pages/PostIdea';
import { supabase } from './services/supabaseService'; // Pastikan path ini benar setelah App.tsx pindah

function App() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data dari tabel website_data
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('website_data')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        // Mengubah format json 'content' menjadi array project
        const formattedData = data.map((item: any) => ({
          id: item.id,
          ...item.content,
          createdAt: item.created_at
        }));
        setProjects(formattedData);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = (newProject: any) => {
    setProjects([newProject, ...projects]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        {/* Navigation Bar */}
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center gap-2">
                <Rocket className="w-8 h-8 text-indigo-600" />
                <span className="text-xl font-bold text-slate-900 tracking-tight">INOVHUB</span>
              </Link>
              <div className="flex items-center gap-4">
                <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium">Explore</Link>
                <Link 
                  to="/post" 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all"
                >
                  <PlusCircle className="w-5 h-5" /> Post Idea
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route 
              path="/" 
              element={<Dashboard projects={projects} loading={loading} />} 
            />
            <Route 
              path="/post" 
              element={<PostIdea onAdd={handleAddProject} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
