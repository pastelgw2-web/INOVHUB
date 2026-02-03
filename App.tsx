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
import { Project } from './types';
import { supabase } from './services/supabaseService';

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
      <section className="relative h-96 rounded-3xl overflow-hidden bg-indigo-600 flex items-center px-12 text-white">
        <div className="absolute inset-0 opacity-20">
          <img src="https://picsum.photos/seed/innovate/1200/400" className="w-full h-full object-cover" alt="Hero" />
        </div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <h1 className="text-5xl font-extrabold leading-tight">Catalyzing the Next Big Innovation.</h1>
          <p className="text-xl text-indigo-100">The first super-app that connects fundraising with technical collaboration.</p>
          <div className="flex gap-4">
            <Link to="/post" className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-colors">Start Your Idea</Link>
          </div>
        </div>
      </section>

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
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.length > 0 ? filtered.map(project => (
          <ProjectCard key={project.id} project={project} />
        )) : (
          <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-400 font-medium">No projects found. Be the first to post!</p>
          </div>
        )}
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
          <Rocket className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-indigo-900">InnoHub</span>
      </Link>
      <div className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map(item => (
          <Link 
            key={item.path} 
            to={item.path}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${location.pathname === item.path ? 'text-indigo-600' :