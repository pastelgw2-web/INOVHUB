import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Rocket, PlusCircle, LayoutDashboard } from 'lucide-react';

// Alamat diperbarui agar masuk ke folder INOVHUB
import Dashboard from './INOVHUB/pages/Dashboard';
import PostIdea from './INOVHUB/pages/PostIdea';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white border-b border-slate-200 p-4 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
              <Rocket /> INOVHUB
            </Link>
            <div className="flex gap-6">
              <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-semibold">
                <LayoutDashboard size={20} /> Dashboard
              </Link>
              <Link to="/post" className="bg-indigo-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-md">
                <PlusCircle size={20} /> Post Idea
              </Link>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard projects={[]} loading={false} />} />
            <Route path="/post" element={<PostIdea onAdd={() => {}} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
