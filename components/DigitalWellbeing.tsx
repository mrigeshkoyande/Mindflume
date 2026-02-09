import React from 'react';
import { Clock, Smartphone, Coffee, CheckCircle, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const usageData = [
  { day: 'Mon', minutes: 120 },
  { day: 'Tue', minutes: 150 },
  { day: 'Wed', minutes: 90 },
  { day: 'Thu', minutes: 180 },
  { day: 'Fri', minutes: 200 },
  { day: 'Sat', minutes: 60 },
  { day: 'Sun', minutes: 45 },
];

const DigitalWellbeing: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in space-y-6 h-full overflow-y-auto custom-scrollbar">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-slate-800">Digital Wellbeing</h2>
        <p className="text-xs text-slate-500 font-medium">Track your app usage and recovery progress</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-5 rounded-2xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">Total Time</p>
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-extrabold text-slate-800">164k</h3>
                    <p className="text-xs text-slate-500">minutes</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
                    <Clock size={20} />
                </div>
            </div>
        </div>
        
        <div className="glass-card p-5 rounded-2xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">Sessions</p>
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-extrabold text-slate-800">41k</h3>
                    <p className="text-xs text-slate-500">total</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                    <Smartphone size={20} />
                </div>
            </div>
        </div>

        <div className="glass-card p-5 rounded-2xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">Daily Avg</p>
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-extrabold text-slate-800">7</h3>
                    <p className="text-xs text-slate-500">min/day</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-500">
                    <Coffee size={20} />
                </div>
            </div>
        </div>

        <div className="glass-card p-5 rounded-2xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">Check-ins</p>
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-extrabold text-slate-800">25k</h3>
                    <p className="text-xs text-slate-500">completed</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                    <CheckCircle size={20} />
                </div>
            </div>
        </div>
      </div>

      {/* Recovery Section */}
      <div className="glass-card p-6 rounded-3xl">
        <h3 className="text-base font-bold text-slate-800 mb-2">Recovery Progress</h3>
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/20">
                <BarChart2 size={20} />
            </div>
            <div>
                <p className="text-sm font-bold text-slate-700">Recovery Rate</p>
                <p className="text-xs text-slate-500">Based on last 10 check-ins</p>
            </div>
            <div className="ml-auto text-right">
                <p className="text-2xl font-extrabold text-emerald-500">100%</p>
                <p className="text-xs text-slate-400 font-medium">low stress</p>
            </div>
        </div>
        
        <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden mb-8">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: '100%' }}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl text-center backdrop-blur-sm">
                <div className="w-8 h-8 mx-auto mb-2 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <CheckCircle size={16} />
                </div>
                <p className="text-sm font-bold text-slate-700">Feeling Better</p>
            </div>
            <div className="bg-teal-50/50 border border-teal-100 p-5 rounded-2xl text-center backdrop-blur-sm">
                 <div className="w-8 h-8 mx-auto mb-2 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                    <Coffee size={16} />
                </div>
                <p className="text-sm font-bold text-slate-700">Stay Consistent</p>
            </div>
            <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl text-center backdrop-blur-sm">
                 <div className="w-8 h-8 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <Smartphone size={16} />
                </div>
                <p className="text-sm font-bold text-slate-700">Mind Clarity</p>
            </div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="glass-card p-6 rounded-3xl h-72">
        <h3 className="text-base font-bold text-slate-800 mb-4">Weekly Usage (Minutes)</h3>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usageData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '12px'}}
                />
                <Bar dataKey="minutes" radius={[6, 6, 0, 0]}>
                    {usageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.minutes > 150 ? '#fbbf24' : '#10b981'} className="opacity-80 hover:opacity-100 transition-opacity" />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DigitalWellbeing;