
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { HandCoins, Users, ChevronRight } from 'lucide-react';

interface Props {
  project: Project;
}

const ProjectCard: React.FC<Props> = ({ project }) => {
  const progressPercent = Math.min((project.currentAmount / project.goalAmount) * 100, 100);
  const totalVolunteers = project.skillSlots.reduce((acc, s) => acc + s.capacity, 0);
  const filledVolunteers = project.skillSlots.reduce((acc, s) => acc + s.filled, 0);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-indigo-600 shadow-sm">
          {project.category}
        </div>
      </div>
      
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
          <p className="text-slate-500 text-sm mt-1 line-clamp-2">{project.tagline}</p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-50">
          {/* Funding Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 flex items-center gap-1.5"><HandCoins className="w-4 h-4" /> Funding</span>
              <span className="font-bold text-slate-800">{progressPercent.toFixed(0)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-1000" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-slate-400">Target: Rp {project.goalAmount.toLocaleString()}</p>
          </div>

          {/* Volunteer Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 flex items-center gap-1.5"><Users className="w-4 h-4" /> Teams</span>
              <span className="font-bold text-slate-800">{filledVolunteers}/{totalVolunteers}</span>
            </div>
            <div className="flex gap-1">
              {project.skillSlots.map((slot, i) => (
                <div 
                  key={i} 
                  title={slot.title}
                  className={`h-1.5 flex-1 rounded-full ${i < filledVolunteers ? 'bg-teal-500' : 'bg-slate-200'}`} 
                />
              ))}
            </div>
          </div>
        </div>

        <Link 
          to={`/project/${project.id}`} 
          className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white text-slate-600 font-semibold rounded-xl transition-all"
        >
          View Details <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
