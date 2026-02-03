
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Menu, 
  X, 
  User as UserIcon,
  ChevronRight,
  TrendingUp,
  Award,
  Rocket
} from 'lucide-react';
import { MOCK_PROJECTS, NAV_ITEMS, CATEGORIES } from './constants';
import { Project, User } from './types';

// Components
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './pages/ProjectDetail';
import Dashboard from './pages/Dashboard';
import PostIdea from './pages/PostIdea';
import AdminPanel from './pages/AdminPanel';

const LandingPage: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const [filter, setFilter] = useState<string>('All');
  
  const filtered = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative h-96 rounded-3xl overflow-hidden bg-indigo-600 flex items-center px-12 text-white">
        <div className="absolute inset-0 opacity-20">
          <img src="https://picsum.photos/seed/innovate/1200/400" className="w-full h-full object-cover" alt="Hero" />
        </div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <h1 className="text-5xl font-extrabold leading-tight">Catalyzing the Next Big Innovation.</h1>
          <p className="text-xl text-indigo-100">The first super-app that connects fundraising with technical collaboration. Support ideas, or join the team.</p>
          <div className="flex gap-4">
            <Link to="/post" className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-colors">Start Your Idea</Link>
            <button className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">How it works</button>
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
          <button 
            onClick={() => setFilter('All')}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filter === 'All' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
          >
            All Innovations
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filter === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search ideas..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 px-6 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
          {/* Fix: Added Rocket icon component */}
          <Rocket className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-indigo-900">InnoHub</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map(item => (
          <Link 
            key={item.path} 
            to={item.path}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${location.pathname === item.path ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-slate-600"><Menu className="w-6 h-6" /></button>
        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden cursor-pointer hover:ring-2 ring-indigo-500 transition-all border border-slate-100">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 px-6 mt-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-1 space-y-4">
        <div className="flex items-center gap-2 text-white">
          {/* Fix: Added Rocket icon component */}
          <Rocket className="w-6 h-6" />
          <span className="text-xl font-bold">InnoHub</span>
        </div>
        <p className="text-sm">Empowering innovators through crowd-funding and technical collaboration.</p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Platform</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/">Browse Ideas</Link></li>
          <li><Link to="/post">Post Innovation</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Community</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#">Volunteer Guide</a></li>
          <li><a href="#">Success Stories</a></li>
          <li><a href="#">FAQ</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Newsletter</h4>
        <div className="flex gap-2">
          <input type="text" placeholder="Email" className="bg-slate-800 border-none rounded-lg px-3 py-2 text-sm w-full focus:ring-1 ring-indigo-500" />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">Join</button>
        </div>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col pt-16">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto w-full p-6">
          <Routes>
            <Route path="/" element={<LandingPage projects={projects} />} />
            <Route path="/project/:id" element={<ProjectDetail projects={projects} />} />
            <Route path="/dashboard" element={<Dashboard projects={projects} />} />
            <Route path="/post" element={<PostIdea onAdd={(p) => setProjects([...projects, p])} />} />
            <Route path="/admin" element={<AdminPanel projects={projects} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
