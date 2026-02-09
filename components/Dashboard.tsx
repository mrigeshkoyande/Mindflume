import React, { useMemo, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Calendar, Smile, Frown, Info, Sparkles, Quote, TrendingUp, ArrowUpRight, RefreshCw, Activity } from 'lucide-react';
import Button from './Button';

// --- Mock Data ---

const weeklyData = [
  { name: 'Mon', stress: 30, recovery: 70 },
  { name: 'Tue', stress: 45, recovery: 60 },
  { name: 'Wed', stress: 20, recovery: 85 },
  { name: 'Thu', stress: 60, recovery: 50 },
  { name: 'Fri', stress: 25, recovery: 80 },
  { name: 'Sat', stress: 15, recovery: 90 },
  { name: 'Sun', stress: 20, recovery: 85 },
];

const monthlyData = [
  { name: 'Week 1', stress: 40, recovery: 65 },
  { name: 'Week 2', stress: 35, recovery: 75 },
  { name: 'Week 3', stress: 55, recovery: 50 },
  { name: 'Week 4', stress: 25, recovery: 85 },
];

const stressDist = [
  { name: 'Low', value: 12, color: '#10b981' },
  { name: 'Medium', value: 5, color: '#f97316' },
  { name: 'High', value: 2, color: '#ef4444' },
];

const affirmations = [
  "You are capable of amazing things.",
  "Small steps everyday lead to big results.",
  "Your mental health is a priority.",
  "Believe you can and you're halfway there.",
  "You are stronger than you know.",
  "Every day is a fresh start.",
  "You are enough just as you are.",
  "Inhale courage, exhale fear.",
  "Focus on the step in front of you.",
  "You are worthy of good things.",
  "Your potential is endless.",
  "Peace comes from within. Do not seek it without.",
  "This too shall pass.",
  "You have the power to create change.",
  "Be gentle with yourself.",
  "You are doing your best, and that is enough.",
  "Trust the process.",
  "Happiness is a direction, not a place.",
  "You are loved.",
  "Your feelings are valid.",
  "Take time to recharge.",
  "Progress, not perfection.",
  "You are resilient.",
  "Embrace the journey.",
  "Let go of what you cannot control.",
  "You are not your mistakes.",
  "Breathe. It’s just a bad day, not a bad life.",
  "You are brave.",
  "Your voice matters.",
  "You make a difference.",
  "Choose joy.",
  "Stay positive.",
  "You are stronger than your struggles.",
  "Keep going.",
  "Believe in yourself.",
  "You are a work of art.",
  "Be the reason someone smiles today.",
  "You are important.",
  "Kindness is free.",
  "Focus on the good.",
  "You are unique.",
  "Your perspective creates your reality.",
  "Don't give up.",
  "You are capable of handling whatever comes your way.",
  "Today is a new opportunity.",
  "You are surrounded by love.",
  "Let your light shine.",
  "You are powerful.",
  "Gratitude turns what we have into enough.",
  "You are exactly where you need to be.",
  "Trust your intuition.",
  "You are worthy of love and respect.",
  "Forgive yourself.",
  "You are growing every day.",
  "Your boundaries are important.",
  "It’s okay to ask for help.",
  "You are not alone.",
  "Celebrate your small wins.",
  "You are creating a life you love.",
  "Be proud of how far you've come.",
  "You are a warrior.",
  "Your heart is beautiful.",
  "You are safe.",
  "Relax and release tension.",
  "You are in charge of your happiness.",
  "Your dreams are valid.",
  "You are full of potential.",
  "Be present in the moment.",
  "You are a gift to the world.",
  "Love yourself first.",
  "You are deserving of peace.",
  "Your mind is strong.",
  "You are capable of change.",
  "Embrace your uniqueness.",
  "You are glowing.",
  "Radiate positivity.",
  "You are a masterpiece.",
  "Trust yourself.",
  "You are limitless.",
  "Be your own best friend.",
  "You are valued.",
  "Your energy is magnetic.",
  "You are free to be yourself.",
  "Let go of fear.",
  "You are abundant.",
  "Your life has purpose.",
  "You are creative.",
  "Believe in miracles.",
  "You are improving every day.",
  "Your smile lights up the room.",
  "You are compassionate.",
  "Be patient with yourself.",
  "You are wise.",
  "Your soul is pure.",
  "You are unstoppable.",
  "Live in the moment.",
  "You are harmonious.",
  "Your future is bright.",
  "You are complete.",
  "I am enough."
];

// Mock Insights Data
const allInsights = [
  { id: 1, type: 'low', date: 'Feb 6', text: 'Feeling really productive today!', icon: Smile, color: 'emerald' },
  { id: 2, type: 'medium', date: 'Feb 5', text: 'Had a tough meeting, need to decompress.', icon: Info, color: 'orange' },
  { id: 3, type: 'high', date: 'Feb 4', text: 'Anxiety was high this morning.', icon: Frown, color: 'rose' },
  { id: 4, type: 'low', date: 'Feb 3', text: 'Great yoga session offered clarity.', icon: Smile, color: 'emerald' },
  { id: 5, type: 'medium', date: 'Feb 2', text: 'Bit overwhelmed with deadlines.', icon: Activity, color: 'orange' },
];

const insightStyles: Record<string, { iconBg: string, iconText: string, badgeBg: string, badgeText: string, badgeBorder: string }> = {
  emerald: {
    iconBg: 'bg-emerald-50',
    iconText: 'text-emerald-600',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-600',
    badgeBorder: 'border-emerald-100',
  },
  orange: {
    iconBg: 'bg-orange-50',
    iconText: 'text-orange-600',
    badgeBg: 'bg-orange-50',
    badgeText: 'text-orange-600',
    badgeBorder: 'border-orange-100',
  },
  rose: {
    iconBg: 'bg-rose-50',
    iconText: 'text-rose-600',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-600',
    badgeBorder: 'border-rose-100',
  },
};

// --- Sub-components ---

const StatCard: React.FC<{ title: string; value: string | number; subtitle: string; icon: React.ReactNode; type: 'success' | 'warning' | 'danger' | 'info'; delay?: number }> = ({ title, value, subtitle, icon, type, delay = 0 }) => {
  const styles = {
    success: 'from-emerald-500/10 to-emerald-500/5 text-emerald-600 border-emerald-200',
    warning: 'from-orange-500/10 to-orange-500/5 text-orange-600 border-orange-200',
    danger: 'from-rose-500/10 to-rose-500/5 text-rose-600 border-rose-200',
    info: 'from-blue-500/10 to-blue-500/5 text-blue-600 border-blue-200',
  };

  const iconStyles = {
    success: 'bg-emerald-50 text-emerald-600',
    warning: 'bg-orange-50 text-orange-600',
    danger: 'bg-rose-50 text-rose-600',
    info: 'bg-blue-50 text-blue-600',
  };

  return (
    <div
      className="glass-card p-5 rounded-3xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer border border-white/40 hover:border-white/80 hover:shadow-lg animate-fade-in opacity-0 fill-mode-forwards"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className={`p-3 rounded-2xl ${iconStyles[type]} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border bg-gradient-to-br ${styles[type]}`}>
          {type}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-extrabold text-slate-800 mb-0.5 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-slate-600 transition-colors">
          {value}
        </h3>
        <p className="text-sm font-semibold text-slate-500 mb-0.5">{title}</p>
        <p className="text-xs text-slate-400 font-medium group-hover:text-slate-500 transition-colors">{subtitle}</p>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 rounded-xl shadow-xl border border-white/80 !bg-white/95 backdrop-blur-md animate-fade-in">
        <p className="font-bold text-slate-800 text-xs mb-2 border-b border-slate-100 pb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs mb-1 last:mb-0">
            <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: entry.color || entry.fill }} />
            <span className="text-slate-500 font-medium capitalize">{entry.name}:</span>
            <span className="font-bold text-slate-700">{entry.value}{entry.name === 'value' ? '' : '%'}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// --- Main Component ---

const Dashboard: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(() => {
    // Initial deterministic quote based on day
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return affirmations[day % affirmations.length];
  });
  const [quoteFading, setQuoteFading] = useState(false);

  const [timeRange, setTimeRange] = useState<'Weekly' | 'Monthly'>('Weekly');
  const [insightFilter, setInsightFilter] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');

  const chartData = timeRange === 'Weekly' ? weeklyData : monthlyData;

  const filteredInsights = allInsights.filter(item => {
    if (insightFilter === 'All') return true;
    return item.type === insightFilter.toLowerCase();
  });

  const refreshQuote = () => {
    setQuoteFading(true);
    setTimeout(() => {
      const randomQuote = affirmations[Math.floor(Math.random() * affirmations.length)];
      setCurrentQuote(randomQuote);
      setQuoteFading(false);
    }, 300); // Wait for fade out
  };

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto custom-scrollbar">

      {/* Daily Affirmation Banner - Premium Glass & Interactive */}
      <div className="relative overflow-hidden rounded-3xl glass-card border-white/60 p-0.5 group animate-fade-in opacity-0 fill-mode-forwards" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-fuchsia-500/5 to-indigo-500/5 opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative bg-white/50 backdrop-blur-xl rounded-[1.4rem] p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="shrink-0 relative">
            <div className="absolute inset-0 bg-violet-400 blur-2xl opacity-10 animate-pulse-slow"></div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20 relative z-10 rotate-3 group-hover:rotate-6 transition-transform duration-500">
              <Sparkles size={24} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left z-10 w-full">
            <div className="flex items-center justify-center md:justify-between w-full mb-1.5">
              <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full tracking-wider uppercase border border-violet-100">Daily Wisdom</span>
              <button
                onClick={refreshQuote}
                className="hidden md:flex p-1.5 rounded-full hover:bg-violet-100 text-violet-400 hover:text-violet-600 transition-colors"
                title="New Quote"
              >
                <RefreshCw size={14} className={quoteFading ? 'animate-spin' : ''} />
              </button>
            </div>

            <h3 className={`text-lg md:text-xl font-bold text-slate-800 leading-snug italic transition-opacity duration-300 ${quoteFading ? 'opacity-0' : 'opacity-100'}`}>
              "{currentQuote}"
            </h3>

            {/* Mobile Refresh Button */}
            <div className="md:hidden mt-3 flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={refreshQuote}
                icon={<RefreshCw size={14} className={quoteFading ? 'animate-spin' : ''} />}
              >
                Inspire Me
              </Button>
            </div>
          </div>

          <div className="hidden md:block opacity-20 group-hover:opacity-40 transition-opacity">
            <Quote size={64} className="text-violet-900" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard
          title="Total Check-ins"
          value="19"
          subtitle="+2 from last week"
          icon={<Calendar size={20} />}
          type="info"
          delay={100}
        />
        <StatCard
          title="Low Stress Days"
          value="12"
          subtitle="Top 15% of users"
          icon={<Smile size={20} />}
          type="success"
          delay={200}
        />
        <StatCard
          title="Needs Attention"
          value="2"
          subtitle="Mainly Tuesdays"
          icon={<Frown size={20} />}
          type="danger"
          delay={300}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Trends Chart - Interactive */}
        <div className="lg:col-span-2 min-w-0 glass-card rounded-3xl p-6 flex flex-col relative overflow-hidden animate-fade-in opacity-0 fill-mode-forwards" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
          <div className="flex items-center justify-between mb-6 z-10">
            <div>
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                Trends Analysis <TrendingUp size={16} className="text-emerald-500" />
              </h3>
              <p className="text-xs text-slate-500 font-medium">Stress vs Recovery</p>
            </div>
            {/* Time Range Switcher */}
            <div className="flex bg-slate-100/50 p-1 rounded-xl">
              <button
                onClick={() => setTimeRange('Weekly')}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${timeRange === 'Weekly' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeRange('Monthly')}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${timeRange === 'Monthly' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div style={{ width: '100%', height: 240 }} className="mt-auto">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRecovery" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area
                  type="monotone"
                  dataKey="recovery"
                  name="Recovery"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRecovery)"
                  animationDuration={1500}
                />
                <Area
                  type="monotone"
                  dataKey="stress"
                  name="Stress"
                  stroke="#f97316"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorStress)"
                  animationDuration={1500}
                  animationBegin={300}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stress Distribution - Glass Bar Chart */}
        <div className="glass-card rounded-3xl p-6 min-w-0 flex flex-col animate-fade-in opacity-0 fill-mode-forwards" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-1">Distribution</h3>
              <p className="text-xs text-slate-500 font-medium">Check-in Intensity</p>
            </div>

          </div>

          <div style={{ width: '100%', height: 240 }} className="mt-auto">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={stressDist} layout="vertical" margin={{ top: 0, right: 20, left: -25, bottom: 0 }} barSize={32}>
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={65}
                  tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
                />
                <Tooltip cursor={{ fill: 'rgba(241, 245, 249, 0.5)', radius: 8 }} content={<CustomTooltip />} />
                <Bar dataKey="value" name="Count" radius={[0, 8, 8, 0]} animationDuration={1500} animationBegin={600}>
                  {stressDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6 animate-fade-in opacity-0 fill-mode-forwards" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-800">Recent Insights</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Your emotional journey log</p>
          </div>

          {/* Insight Filters */}
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
            {['All', 'Low', 'Medium', 'High'].map((filter) => (
              <button
                key={filter}
                onClick={() => setInsightFilter(filter as any)}
                className={`
                  px-3 py-1.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap
                  ${insightFilter === filter
                    ? 'bg-slate-800 text-white border-slate-800 shadow-md'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                `}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredInsights.length > 0 ? (
            filteredInsights.map((insight, idx) => {
              const styles = insightStyles[insight.color];
              return (
                <div
                  key={insight.id}
                  className="flex items-center gap-4 p-3 bg-white/60 hover:bg-white/90 rounded-2xl transition-all duration-300 border border-white/60 cursor-pointer group shadow-sm hover:shadow-md hover:scale-[1.01] hover:border-emerald-100/50 animate-slide-in-right opacity-0 fill-mode-forwards"
                  style={{ animationDelay: `${700 + (idx * 100)}ms`, animationFillMode: 'forwards' }}
                >
                  <div className={`w-10 h-10 rounded-xl ${styles.iconBg} ${styles.iconText} flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform duration-300 shadow-inner`}>
                    <insight.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wide ${styles.badgeText} ${styles.badgeBg} px-2 py-0.5 rounded-lg border ${styles.badgeBorder}`}>
                        {insight.type} Stress
                      </span>
                      <span className="text-[10px] font-medium text-slate-400 group-hover:text-slate-500 transition-colors">{insight.date}</span>
                    </div>
                    <p className="text-sm text-slate-700 font-medium group-hover:text-slate-900 transition-colors">{insight.text}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                    <ArrowUpRight size={16} className="text-slate-400" />
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-8 text-slate-400 text-sm">
              No insights found for this filter.
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Button variant="ghost" size="sm" className="text-xs w-full sm:w-auto">View Full History</Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;