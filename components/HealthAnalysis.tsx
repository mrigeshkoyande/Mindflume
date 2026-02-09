import React, { useState, useEffect } from 'react';
import { HeartPulse, Brain, Activity, TrendingUp, AlertCircle, ShieldCheck, Sparkles, ChevronRight, Target, Award, Coffee, Wind, Moon, Lightbulb } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, Cell, Tooltip } from 'recharts';
import Button from './Button';

// Interfaces locally defined since we removed the service
interface HealthInsight {
    title: string;
    description: string;
    type: 'warning' | 'positive';
    category: 'Sleep' | 'Activity' | 'Mindfulness' | 'Nutrition';
    color?: string;
}

interface AIRecommendation {
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    impact: string;
    category: 'Sleep' | 'Activity' | 'Mindfulness' | 'Nutrition';
    color: string;
}

// Health score breakdown data
const healthBreakdown = [
    { category: 'Physical', score: 76, color: '#f43f5e' },
    { category: 'Mental', score: 100, color: '#3b82f6' },
    { category: 'Sleep', score: 63, color: '#6366f1' },
    { category: 'Nutrition', score: 82, color: '#10b981' },
];

// Weekly trends
const weeklyTrends = [
    { day: 'Mon', physical: 75, mental: 95 },
    { day: 'Tue', physical: 72, mental: 98 },
    { day: 'Wed', physical: 78, mental: 100 },
    { day: 'Thu', physical: 76, mental: 97 },
    { day: 'Fri', physical: 80, mental: 100 },
    { day: 'Sat', physical: 74, mental: 92 },
    { day: 'Sun', physical: 76, mental: 100 },
];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-panel p-3 rounded-xl shadow-xl border border-white/80 !bg-white/95 backdrop-blur-md">
                <p className="font-bold text-slate-800 text-xs mb-2">{payload[0].payload.day}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-slate-500 font-medium capitalize">{entry.dataKey}:</span>
                        <span className="font-bold text-slate-700">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const getCategoryIcon = (category: string) => {
    switch (category) {
        case 'Sleep': return Moon;
        case 'Nutrition': return Coffee;
        case 'Mindfulness': return Wind;
        case 'Activity': return Activity;
        default: return Lightbulb;
    }
};

const HealthAnalysis: React.FC = () => {
    const [selectedMetric, setSelectedMetric] = useState<'physical' | 'mental'>('physical');
    const [showRecommendations, setShowRecommendations] = useState(true); // Default to true for side-by-side view
    const [insights, setInsights] = useState<HealthInsight[]>([]);
    const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const overallScore = 88;
    const physicalScore = 76;
    const mentalScore = 100;

    useEffect(() => {
        const fetchInsights = async () => {
            setIsLoading(true);
            try {
                // Simulate network delay for realism
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Mock Data instead of API call
                setInsights([
                    { title: "Strong Mental Resilience", description: "Your mental wellness score is perfect. Keep up the mindfulness practices!", type: 'positive', category: 'Mindfulness' },
                    { title: "Sleep Schedule Variation", description: "Variability in sleep times detected. Try to stick to a routine.", type: 'warning', category: 'Sleep' }
                ]);

                setRecommendations([
                    { title: "Deep Breathing", description: "Take 5 minutes for box breathing to maintain calm.", priority: 'high', impact: "+5 Wellness", category: 'Mindfulness', color: 'indigo' },
                    { title: "Hydration Check", description: "Drink water before your morning coffee.", priority: 'medium', impact: "+3 Energy", category: 'Nutrition', color: 'blue' },
                    { title: "Evening Stretch", description: "Gentle stretching before bed to improve sleep quality.", priority: 'medium', impact: "+8 Sleep", category: 'Activity', color: 'emerald' },
                    { title: "Screen-Free Hour", description: "Avoid screens 1 hour before sleep.", priority: 'high', impact: "+12 Sleep", category: 'Sleep', color: 'violet' }
                ]);

            } catch (error) {
                console.error("Failed to fetch insights", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInsights();
    }, []);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'medium': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'low': return 'bg-slate-100 text-slate-700 border-slate-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="p-6 animate-fade-in space-y-6 h-full overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Health Analysis</h2>
                    <p className="text-xs text-slate-500 font-medium">Comprehensive view of your physical and mental wellbeing</p>
                </div>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Left Column: Data & Visualizations (2/3 width on large screens) */}
                <div className="xl:col-span-2 space-y-6">
                    {/* Overall Health Score */}
                    <div className="glass-card border-l-4 border-l-emerald-500 p-6 rounded-2xl flex items-center justify-between group cursor-pointer hover:shadow-lg transition-all">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-emerald-100 group-hover:scale-110 transition-transform">
                                    <span className="text-xl font-extrabold">{overallScore}</span>
                                </div>
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center shadow-md">
                                    <Award size={12} className="text-white" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Overall Health Score</h3>
                                <p className="text-emerald-700 text-xs font-medium mt-0.5 flex items-center gap-1">
                                    <TrendingUp size={12} />
                                    Excellent! You are maintaining a great balance.
                                </p>
                            </div>
                        </div>
                        <div className="hidden md:block opacity-80 group-hover:opacity-100 transition-opacity">
                            <ShieldCheck size={40} className="text-emerald-400" />
                        </div>
                    </div>

                    {/* Metric Selector */}
                    <div className="flex gap-2 bg-slate-100/50 p-1 rounded-xl w-fit">
                        <button
                            onClick={() => setSelectedMetric('physical')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${selectedMetric === 'physical' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <HeartPulse size={14} />
                            Physical
                        </button>
                        <button
                            onClick={() => setSelectedMetric('mental')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${selectedMetric === 'mental' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Brain size={14} />
                            Mental
                        </button>
                    </div>

                    {/* Dynamic Detail Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Physical Health */}
                        <div className={`glass-card p-6 rounded-3xl relative overflow-hidden transition-all duration-300 ${selectedMetric === 'physical' ? 'ring-2 ring-rose-200 shadow-lg' : 'opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0'}`}>
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <HeartPulse size={100} />
                            </div>
                            <div className="flex items-center gap-2.5 mb-5">
                                <div className="p-2 bg-rose-50 rounded-lg">
                                    <HeartPulse className="text-rose-500" size={18} />
                                </div>
                                <h3 className="text-base font-bold text-slate-800">Physical Health</h3>
                            </div>
                            <div className="flex justify-between items-end mb-3">
                                <span className="text-3xl font-extrabold text-slate-800">{physicalScore}</span>
                                <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">Excellent</span>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full mb-5 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-rose-500 to-pink-500 h-1.5 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.4)] transition-all duration-1000"
                                    style={{ width: `${physicalScore}%` }}
                                ></div>
                            </div>
                            <ul className="space-y-2.5">
                                <li className="flex justify-between text-xs p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <span className="text-slate-500 font-medium flex items-center gap-2">
                                        <Activity size={12} className="group-hover:text-rose-500 transition-colors" />
                                        Activity
                                    </span>
                                    <span className="font-bold text-slate-700">High</span>
                                </li>
                                <li className="flex justify-between text-xs p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <span className="text-slate-500 font-medium flex items-center gap-2">
                                        <TrendingUp size={12} className="group-hover:text-rose-500 transition-colors" />
                                        Steps
                                    </span>
                                    <span className="font-bold text-slate-700">Consistent</span>
                                </li>
                            </ul>
                        </div>

                        {/* Mental Health */}
                        <div className={`glass-card p-6 rounded-3xl relative overflow-hidden transition-all duration-300 ${selectedMetric === 'mental' ? 'ring-2 ring-blue-200 shadow-lg' : 'opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0'}`}>
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Brain size={100} />
                            </div>
                            <div className="flex items-center gap-2.5 mb-5">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <Brain className="text-blue-500" size={18} />
                                </div>
                                <h3 className="text-base font-bold text-slate-800">Mental Health</h3>
                            </div>
                            <div className="flex justify-between items-end mb-3">
                                <span className="text-3xl font-extrabold text-slate-800">{mentalScore}</span>
                                <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">Perfect</span>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full mb-5 overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 rounded-full w-full shadow-[0_0_8px_rgba(59,130,246,0.4)]"></div>
                            </div>
                            <ul className="space-y-2.5">
                                <li className="flex justify-between text-xs p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <span className="text-slate-500 font-medium flex items-center gap-2">
                                        <Activity size={12} className="group-hover:text-blue-500 transition-colors" />
                                        Stress
                                    </span>
                                    <span className="font-bold text-emerald-500">Low</span>
                                </li>
                                <li className="flex justify-between text-xs p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <span className="text-slate-500 font-medium flex items-center gap-2">
                                        <AlertCircle size={12} className="group-hover:text-blue-500 transition-colors" />
                                        Mood
                                    </span>
                                    <span className="font-bold text-slate-700">Stable</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Chart Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Health Breakdown Chart */}
                        <div className="glass-card p-6 rounded-3xl">
                            <h3 className="text-base font-bold text-slate-800 mb-5">Score Breakdown</h3>
                            <div style={{ width: '100%', height: 200 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={healthBreakdown} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                                        <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} domain={[0, 100]} />
                                        <Tooltip cursor={{ fill: 'rgba(241, 245, 249, 0.3)' }} content={<CustomTooltip />} />
                                        <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={40}>
                                            {healthBreakdown.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Weekly Trends */}
                        <div className="glass-card p-6 rounded-3xl">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-base font-bold text-slate-800">Weekly Trends</h3>
                                <div className="flex gap-2">
                                    <div className="flex items-center gap-1 text-[10px] font-semibold"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>Phys</div>
                                    <div className="flex items-center gap-1 text-[10px] font-semibold"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>Ment</div>
                                </div>
                            </div>
                            <div style={{ width: '100%', height: 200 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={weeklyTrends} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} domain={[0, 100]} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar dataKey="physical" fill="#f43f5e" radius={[3, 3, 0, 0]} />
                                        <Bar dataKey="mental" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: AI Insights & Recommendations (Sticky Sidebar) */}
                <div className="xl:col-span-1 space-y-6">
                    <div className="glass-card p-6 rounded-3xl border-2 border-indigo-50/50 bg-white/40 sticky top-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="text-indigo-500" size={18} />
                            <h3 className="text-base font-bold text-slate-800">Analysis & Tips</h3>
                            {isLoading && <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full animate-pulse ml-auto">Loading...</span>}
                        </div>

                        {/* Insights Section */}
                        <div className="space-y-3 mb-6">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Key Observations</h4>
                            {insights.length > 0 ? (
                                insights.map((insight, index) => (
                                    <div
                                        key={index}
                                        className={`p-3 rounded-xl border transition-all cursor-pointer hover:scale-[1.02] ${insight.type === 'warning'
                                            ? 'bg-orange-50/50 border-orange-100'
                                            : 'bg-blue-50/50 border-blue-100'
                                            }`}
                                    >
                                        <h4 className={`font-bold text-xs mb-1 flex items-center gap-2 ${insight.type === 'warning' ? 'text-orange-800' : 'text-blue-800'}`}>
                                            {insight.type === 'warning' ? <AlertCircle size={12} /> : <Brain size={12} />}
                                            {insight.title}
                                        </h4>
                                        <p className={`text-[11px] leading-relaxed font-medium ${insight.type === 'warning' ? 'text-orange-700/80' : 'text-blue-700/80'}`}>
                                            {insight.description}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                !isLoading && <p className="text-xs text-slate-400 italic">No specific insights generated.</p>
                            )}
                        </div>

                        {/* Recommendations Section */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Action Plan</h4>
                            {recommendations.length > 0 ? (
                                recommendations.map((rec, index) => {
                                    const Icon = getCategoryIcon(rec.category);
                                    return (
                                        <div
                                            key={index}
                                            className="p-3 bg-white/80 rounded-xl border border-white hover:border-emerald-200 hover:shadow-sm transition-all group"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`p-1.5 bg-${rec.color}-100 text-${rec.color}-600 rounded-lg mt-0.5`}>
                                                    <Icon size={14} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-0.5">
                                                        <h4 className="font-bold text-slate-800 text-xs">{rec.title}</h4>
                                                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${getPriorityColor(rec.priority)}`}>
                                                            {rec.priority}
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] text-slate-600 leading-relaxed mb-2">{rec.description}</p>
                                                    <div className="flex items-center justify-between border-t border-slate-100 pt-1.5">
                                                        <span className="text-[10px] font-bold text-emerald-600">{rec.impact}</span>
                                                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 group-hover:text-emerald-600 transition-colors cursor-pointer">
                                                            Start <ChevronRight size={10} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                !isLoading && <p className="text-xs text-slate-400 italic">No recommendations available.</p>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HealthAnalysis;