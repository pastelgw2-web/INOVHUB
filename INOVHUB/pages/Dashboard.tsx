
import React from 'react';
import { Project } from '../types';
import { TrendingUp, Users, HandCoins, Activity, ChevronRight } from 'lucide-react';

interface Props {
  projects: Project[];
}

const Dashboard: React.FC<Props> = ({ projects }) => {
  const userProjects = projects.filter(p => p.creatorId === 'u1');
  const totalRaised = userProjects.reduce((acc, p) => acc + p.currentAmount, 0);
  const totalGoal = userProjects.reduce((acc, p) => acc + p.goalAmount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Your Impact Hub</h1>
          <p className="text-slate-500">Manage your innovations and collaborations in one place.</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
          Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Raised', value: `Rp ${(totalRaised/1000000).toFixed(1)}M`, icon: <HandCoins className="w-5 h-5" />, color: 'bg-indigo-500' },
          { label: 'Active Teams', value: '24', icon: <Users className="w-5 h-5" />, color: 'bg-teal-500' },
          { label: 'Project Views', value: '12.4K', icon: <TrendingUp className="w-5 h-5" />, color: 'bg-amber-500' },
          { label: 'Success Rate', value: '88%', icon: <Activity className="w-5 h-5" />, color: 'bg-rose-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`${stat.color} p-3 rounded-2xl text-white`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-lg">My Innovations</h3>
            <button className="text-indigo-600 text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">
                  <th className="px-6 py-4">Project</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Funding</th>
                  <th className="px-6 py-4">Team</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {userProjects.length > 0 ? userProjects.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden">
                          <img src={p.image} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-sm line-clamp-1">{p.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">ACTIVE</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: `${(p.currentAmount/p.goalAmount)*100}%` }} />
                        </div>
                        <p className="text-[10px] text-slate-400">Rp {(p.currentAmount/1000000).toFixed(0)}M raised</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-white rounded-lg transition-colors"><ChevronRight className="w-4 h-4 text-slate-400" /></button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">No projects found. Start by posting an idea!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
          <h3 className="font-bold text-lg">Recent Collaborations</h3>
          <div className="space-y-6">
            {[
              { user: 'Siti Aminah', action: 'applied for Mechanical Engineer', time: '2h ago', project: 'Eco-Filter' },
              { user: 'Budi Hartono', action: 'donated Rp 500,000', time: '5h ago', project: 'Edu-VR' },
              { user: 'Digital Ocean', action: 'became a technical sponsor', time: '1d ago', project: 'Edu-VR' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.user}`} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm leading-tight">
                    <span className="font-bold text-slate-900">{activity.user}</span> {activity.action} on <span className="font-bold text-indigo-600">{activity.project}</span>
                  </p>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 border border-slate-100 rounded-2xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">
            See All Activities
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
