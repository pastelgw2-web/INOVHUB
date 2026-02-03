
import React from 'react';
import { Project } from '../types';
import { ShieldCheck, Eye, CheckCircle, XCircle, MoreVertical } from 'lucide-react';

interface Props {
  projects: Project[];
}

const AdminPanel: React.FC<Props> = ({ projects }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-indigo-600" />
            Control Center
          </h1>
          <p className="text-slate-500">Curate and monitor the InnoHub platform ecosystem.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Pending Curation', count: '12', sub: 'Action required' },
          { label: 'Total Verified', count: '1.4K', sub: '+12 this week' },
          { label: 'Flagged Reports', count: '03', sub: 'Urgent' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
             <p className="text-3xl font-black text-slate-800">{stat.count}</p>
             <p className="text-xs text-slate-400 mt-2 font-medium">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-lg">Project Verification Queue</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">All</button>
            <button className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold">Pending</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">
                <th className="px-6 py-4">Submitted Project</th>
                <th className="px-6 py-4">Innovator</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Target</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {projects.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden">
                        <img src={p.image} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-sm leading-tight">{p.title}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{new Date(p.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium">User #{p.creatorId}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold uppercase tracking-widest">{p.category}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-sm">
                    Rp {(p.goalAmount / 1000000).toFixed(0)}M
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button title="View Detail" className="p-2 bg-slate-100 rounded-lg hover:bg-indigo-600 hover:text-white transition-all"><Eye className="w-4 h-4" /></button>
                      <button title="Approve" className="p-2 bg-slate-100 rounded-lg hover:bg-green-600 hover:text-white transition-all"><CheckCircle className="w-4 h-4" /></button>
                      <button title="Reject" className="p-2 bg-slate-100 rounded-lg hover:bg-rose-600 hover:text-white transition-all"><XCircle className="w-4 h-4" /></button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><MoreVertical className="w-4 h-4 text-slate-400" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
