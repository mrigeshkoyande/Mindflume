import React, { useState, useEffect } from 'react';
import { Activity, Heart, Flame, Footprints, Moon, Droplets, Watch, Plus, TrendingUp, Award, Target, Zap, ChevronRight } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import Button from './Button';

const heartRateData = [
    { time: '10am', bpm: 72 },
    { time: '11am', bpm: 85 },
    { time: '12pm', bpm: 78 },
    { time: '1pm', bpm: 95 },
    { time: '2pm', bpm: 88 },
    { time: '3pm', bpm: 76 },
    { time: '4pm', bpm: 70 },
];

const weeklyStepsData = [
    { day: 'Mon', steps: 8234 },
    { day: 'Tue', steps: 6480 },
    { day: 'Wed', steps: 9821 },
    { day: 'Thu', steps: 11234 },
    { day: 'Fri', steps: 7654 },
    { day: 'Sat', steps: 5321 },
    { day: 'Sun', steps: 4567 },
];

const FitnessMetric: React.FC<{
    label: string;
    value: string;
    unit: string;
    icon: React.ReactNode;
    color: string;
    subtext?: string;
    progress?: number;
    goal?: string;
    interactive?: boolean;
    onClick?: () => void;
}> = ({ label, value, unit, icon, color, subtext, progress, goal, interactive = false, onClick }) => (
    <div
        className={`glass-card p-5 rounded-2xl flex items-center justify-between transition-all duration-300 ${interactive ? 'cursor-pointer hover:-translate-y-1 hover:shadow-lg' : ''}`}
        onClick={onClick}
    >
        <div className="flex-1">
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">{label}</p>
            <div className="flex items-baseline gap-1">
                <h3 className="text-2xl font-extrabold text-slate-800">{value}</h3>
                <span className="text-[10px] text-slate-500 font-bold">{unit}</span>
            </div>
            {subtext && <p className="text-[10px] text-slate-400 mt-1 font-medium">{subtext}</p>}
            {goal && <p className="text-[10px] text-slate-500 mt-1 font-medium">Goal: {goal}</p>}
            {progress !== undefined && (
                <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full bg-gradient-to-r transition-all duration-500 rounded-full`}
                        style={{
                            width: `${Math.min(progress, 100)}%`,
                            backgroundImage: `linear-gradient(to right, ${color.includes('green') ? '#22c55e' : color.includes('red') ? '#ef4444' : color.includes('blue') ? '#3b82f6' : color.includes('orange') ? '#f97316' : '#8b5cf6'}, ${color.includes('green') ? '#16a34a' : color.includes('red') ? '#dc2626' : color.includes('blue') ? '#2563eb' : color.includes('orange') ? '#ea580c' : '#7c3aed'})`
                        }}
                    ></div>
                </div>
            )}
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} ml-4 transition-transform ${interactive ? 'group-hover:scale-110' : ''}`}>
            {icon}
        </div>
    </div>
);

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-panel p-3 rounded-xl shadow-xl border border-white/80 !bg-white/95 backdrop-blur-md">
                <p className="font-bold text-slate-800 text-xs mb-1">{payload[0].payload.time || payload[0].payload.day}</p>
                <p className="text-xs text-slate-600">
                    <span className="font-bold">{payload[0].value}</span> {payload[0].dataKey === 'bpm' ? 'bpm' : 'steps'}
                </p>
            </div>
        );
    }
    return null;
};

const FitnessTracking: React.FC = () => {
    const [steps, setSteps] = useState(6480);
    const [waterGlasses, setWaterGlasses] = useState(4);
    const [heartRate, setHeartRate] = useState(64);
    const [activeMinutes, setActiveMinutes] = useState(39);
    const [selectedView, setSelectedView] = useState<'today' | 'week'>('today');

    // Goal States - Editable
    const [stepsGoal, setStepsGoal] = useState(10000);
    const [activeGoal, setActiveGoal] = useState(60);
    const [isEditingSteps, setIsEditingSteps] = useState(false);
    const [isEditingActive, setIsEditingActive] = useState(false);

    const [activeCategory, setActiveCategory] = useState<'all' | 'mindfulness' | 'movement' | 'rest'>('all');

    const waterGoal = 8;
    const stepsProgress = (steps / stepsGoal) * 100;
    const waterProgress = (waterGlasses / waterGoal) * 100;
    const activeProgress = (activeMinutes / activeGoal) * 100;

    // Simulate real-time heart rate updates
    useEffect(() => {
        const interval = setInterval(() => {
            setHeartRate(prev => {
                const variation = Math.floor(Math.random() * 6) - 3; // -3 to +3
                return Math.max(60, Math.min(75, prev + variation));
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const addWaterGlass = () => {
        if (waterGlasses < waterGoal) {
            setWaterGlasses(prev => prev + 1);
        }
    };

    const logActivity = () => {
        // Simulate logging activity
        setActiveMinutes(prev => Math.min(prev + 15, 120));
        setSteps(prev => Math.min(prev + 500, 15000));
    };

    const caloriesBurned = Math.floor((steps * 0.04) + (activeMinutes * 8));

    // Category filtering logic
    const shouldShowMetric = (metric: 'steps' | 'heartRate' | 'sleep' | 'calories' | 'hydration' | 'activeMinutes') => {
        if (activeCategory === 'all') return true;

        const categoryMap = {
            movement: ['steps', 'calories', 'activeMinutes'],
            rest: ['sleep', 'heartRate'],
            mindfulness: ['hydration', 'activeMinutes']
        };

        return categoryMap[activeCategory]?.includes(metric) || false;
    };

    return (
        <div className="p-6 animate-fade-in space-y-6 h-full overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Fitness Tracking</h2>
                    <p className="text-xs text-slate-500 font-medium">Monitor your physical activity and health metrics</p>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    icon={<Plus size={14} />}
                    onClick={logActivity}
                >
                    Log Activity
                </Button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-3 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                <button
                    onClick={() => setActiveCategory('all')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeCategory === 'all'
                        ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-200 scale-105'
                        : 'bg-white/70 text-slate-600 hover:bg-white hover:shadow-md border border-white/60'
                        }`}
                >
                    <Activity size={18} />
                    All
                </button>
                <button
                    onClick={() => setActiveCategory('mindfulness')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeCategory === 'mindfulness'
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-200 scale-105'
                        : 'bg-white/70 text-slate-600 hover:bg-white hover:shadow-md border border-white/60'
                        }`}
                >
                    📖 Mindfulness
                </button>
                <button
                    onClick={() => setActiveCategory('movement')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeCategory === 'movement'
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-200 scale-105'
                        : 'bg-white/70 text-slate-600 hover:bg-white hover:shadow-md border border-white/60'
                        }`}
                >
                    ☀️ Movement
                </button>
                <button
                    onClick={() => setActiveCategory('rest')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeCategory === 'rest'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-200 scale-105'
                        : 'bg-white/70 text-slate-600 hover:bg-white hover:shadow-md border border-white/60'
                        }`}
                >
                    🌙 Rest
                </button>
            </div>

            {/* Sync Status - hidden if filtered to reduce clutter */}
            {activeCategory === 'all' && (
                <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border border-indigo-100 backdrop-blur-sm p-4 rounded-2xl flex items-center gap-4 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="p-2.5 bg-indigo-500 text-white rounded-xl shadow-md shadow-indigo-500/20 relative z-10">
                        <Watch size={18} />
                    </div>
                    <div className="flex-1 relative z-10">
                        <h4 className="font-bold text-indigo-900 text-sm">Today's Activity</h4>
                        <p className="text-xs text-indigo-700/80 font-medium">Keep up the great work! Here's your activity summary.</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-100 px-3 py-1.5 rounded-full relative z-10">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
                        Live
                    </div>
                </div>
            )}

            {/* View Toggle */}
            <div className="flex gap-2 bg-slate-100/50 p-1 rounded-xl w-fit">
                <button
                    onClick={() => setSelectedView('today')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedView === 'today' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Today
                </button>
                <button
                    onClick={() => setSelectedView('week')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedView === 'week' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    This Week
                </button>
            </div>

            {/* Main Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {shouldShowMetric('steps') && (
                    <div className="glass-card p-5 rounded-2xl group cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <p className="text-xs font-bold text-slate-400 uppercase">Steps Today</p>
                                <h3 className="text-2xl font-extrabold text-slate-800 mt-1">{steps.toLocaleString()}</h3>
                                <div
                                    className="flex items-center gap-1 mt-0.5 cursor-pointer hover:bg-slate-50 rounded px-1 -ml-1 w-fit transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsEditingSteps(true);
                                    }}
                                >
                                    {isEditingSteps ? (
                                        <input
                                            type="number"
                                            value={stepsGoal}
                                            onChange={(e) => setStepsGoal(Number(e.target.value))}
                                            onBlur={() => setIsEditingSteps(false)}
                                            autoFocus
                                            className="w-16 text-[10px] font-medium border rounded px-1"
                                        />
                                    ) : (
                                        <p className="text-[10px] text-slate-400 font-medium hover:text-indigo-500">Goal: {stepsGoal.toLocaleString()}</p>
                                    )}
                                </div>
                            </div>
                            <div className="p-2.5 bg-green-50 text-green-600 rounded-xl group-hover:scale-110 transition-transform">
                                <Footprints size={18} />
                            </div>
                        </div>
                        <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)] transition-all duration-500"
                                style={{ width: `${Math.min(stepsProgress, 100)}%` }}
                            ></div>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-[10px]">
                            <span className="text-slate-500 font-medium">{Math.round(stepsProgress)}%</span>
                            <span className="text-green-600 font-bold">{stepsGoal - steps > 0 ? `${(stepsGoal - steps).toLocaleString()} left` : '✓ Goal reached!'}</span>
                        </div>
                    </div>
                )}

                {shouldShowMetric('heartRate') && (
                    <div className="glass-card p-5 rounded-2xl group cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <p className="text-xs font-bold text-slate-400 uppercase">Heart Rate</p>
                                <h3 className="text-2xl font-extrabold text-slate-800 mt-1">{heartRate}</h3>
                                <p className="text-[10px] text-slate-400 mt-0.5 font-medium">bpm · Resting</p>
                            </div>
                            <div className="p-2.5 bg-red-50 text-red-500 rounded-xl animate-pulse group-hover:scale-110 transition-transform">
                                <Heart size={18} />
                            </div>
                        </div>
                        <div className="mt-3 h-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={heartRateData}>
                                    <Area type="monotone" dataKey="bpm" stroke="#ef4444" fill="#fecaca" strokeWidth={2} fillOpacity={0.5} />
                                    <Tooltip content={<CustomTooltip />} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {shouldShowMetric('sleep') && (
                    <div className="glass-card p-5 rounded-2xl group cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <p className="text-xs font-bold text-slate-400 uppercase">Sleep</p>
                                <h3 className="text-2xl font-extrabold text-slate-800 mt-1">6.3</h3>
                                <p className="text-[10px] text-slate-400 mt-0.5 font-medium">hours · Last Night</p>
                            </div>
                            <div className="p-2.5 bg-indigo-50 text-indigo-500 rounded-xl group-hover:scale-110 transition-transform">
                                <Moon size={18} />
                            </div>
                        </div>
                        <div className="mt-3 flex gap-1">
                            {[75, 50, 100, 85, 60, 90, 80].map((height, i) => (
                                <div key={i} className="flex-1 bg-slate-100 rounded-sm overflow-hidden">
                                    <div
                                        className="bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-sm transition-all duration-300"
                                        style={{ height: `${height}%` }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {shouldShowMetric('calories') && (
                    <div className="glass-card p-5 rounded-2xl group cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <p className="text-xs font-bold text-slate-400 uppercase">Calories</p>
                                <h3 className="text-2xl font-extrabold text-slate-800 mt-1">{caloriesBurned.toLocaleString()}</h3>
                                <p className="text-[10px] text-slate-400 mt-0.5 font-medium">kcal · Burned</p>
                            </div>
                            <div className="p-2.5 bg-orange-50 text-orange-500 rounded-xl group-hover:scale-110 transition-transform">
                                <Flame size={18} />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                            <Zap size={12} className="text-orange-500" />
                            <span className="text-[10px] text-orange-600 font-bold">Active metabolism</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Weekly Steps Chart (shown only in week view) */}
            {selectedView === 'week' && shouldShowMetric('steps') && (
                <div className="glass-card p-6 rounded-3xl animate-fade-in">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="text-base font-bold text-slate-800">Weekly Steps</h3>
                            <p className="text-xs text-slate-500 font-medium">Your walking activity this week</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <TrendingUp size={14} className="text-emerald-500" />
                            <span className="font-bold text-emerald-600">12% increase</span>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: 200 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={weeklyStepsData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Line type="monotone" dataKey="steps" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Hydration - Interactive */}
                {shouldShowMetric('hydration') && (
                    <div className="glass-card p-6 rounded-3xl hover:shadow-lg transition-all animate-fade-in">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-base font-bold text-slate-800">Hydration</h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                icon={<Plus size={12} />}
                                onClick={addWaterGlass}
                                disabled={waterGlasses >= waterGoal}
                            >
                                Add Glass
                            </Button>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl shadow-inner">
                                <Droplets size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between mb-1.5">
                                    <span className="text-xs font-bold text-slate-600">Water Intake</span>
                                    <span className="text-blue-600 font-bold text-xs">{Math.round(waterProgress)}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.4)] transition-all duration-500"
                                        style={{ width: `${Math.min(waterProgress, 100)}%` }}
                                    ></div>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-1.5 font-medium">{waterGlasses} / {waterGoal} glasses</p>
                            </div>
                        </div>

                        {/* Water glasses visual */}
                        <div className="mt-4 flex gap-2 flex-wrap">
                            {Array.from({ length: waterGoal }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-8 h-10 rounded-lg border-2 transition-all cursor-pointer ${i < waterGlasses ? 'bg-blue-400 border-blue-500' : 'bg-slate-100 border-slate-200'}`}
                                    onClick={() => i >= waterGlasses && waterGlasses < waterGoal && setWaterGlasses(i + 1)}
                                >
                                    {i < waterGlasses && (
                                        <div className="w-full h-full rounded-md bg-gradient-to-t from-blue-500 to-blue-300 opacity-80"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Active Minutes - Enhanced */}
                {shouldShowMetric('activeMinutes') && (
                    <div className="glass-card p-6 rounded-3xl hover:shadow-lg transition-all animate-fade-in">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-base font-bold text-slate-800">Active Minutes</h3>
                            <div className="text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                                {Math.round(activeProgress)}%
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-50 text-purple-500 rounded-2xl shadow-inner">
                                    <Activity size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-700">Exercise Time</p>
                                    <p className="text-[10px] text-slate-400 font-medium">Today's workout</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-extrabold text-purple-600">{activeMinutes}</span>
                                <span className="text-[10px] text-slate-500 block font-bold uppercase">minutes</span>
                            </div>
                        </div>

                        <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.4)] transition-all duration-500"
                                style={{ width: `${Math.min(activeProgress, 100)}%` }}
                            ></div>
                        </div>

                        <div
                            className="text-[10px] text-slate-500 mt-2 font-medium cursor-pointer hover:text-purple-600 transition-colors w-fit"
                            onClick={() => setIsEditingActive(true)}
                        >
                            {isEditingActive ? (
                                <div className="flex items-center gap-2">
                                    <span>Goal:</span>
                                    <input
                                        type="number"
                                        value={activeGoal}
                                        onChange={(e) => setActiveGoal(Number(e.target.value))}
                                        onBlur={() => setIsEditingActive(false)}
                                        autoFocus
                                        className="w-12 border rounded px-1"
                                    />
                                    <span>minutes</span>
                                </div>
                            ) : (
                                <span>Goal: {activeGoal} minutes (Click to edit)</span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Achievements Section */}
            {activeCategory === 'all' && (
                <div className="glass-card p-6 rounded-3xl border border-white/60 animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Award className="text-amber-500" size={20} />
                            <h3 className="text-base font-bold text-slate-800">Today's Achievements</h3>
                        </div>
                        <ChevronRight size={16} className="text-slate-400" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className={`p-4 rounded-2xl border-2 transition-all ${waterGlasses >= waterGoal ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
                            <div className="flex items-center gap-2 mb-1">
                                <Droplets size={14} className={waterGlasses >= waterGoal ? 'text-blue-600' : 'text-slate-400'} />
                                <span className={`text-xs font-bold ${waterGlasses >= waterGoal ? 'text-blue-700' : 'text-slate-500'}`}>Hydration Hero</span>
                            </div>
                            <p className="text-[10px] text-slate-500">Drink {waterGoal} glasses</p>
                        </div>

                        <div className={`p-4 rounded-2xl border-2 transition-all ${steps >= stepsGoal ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                            <div className="flex items-center gap-2 mb-1">
                                <Target size={14} className={steps >= stepsGoal ? 'text-green-600' : 'text-slate-400'} />
                                <span className={`text-xs font-bold ${steps >= stepsGoal ? 'text-green-700' : 'text-slate-500'}`}>Step Master</span>
                            </div>
                            <p className="text-[10px] text-slate-500">Hit {stepsGoal.toLocaleString()} steps</p>
                        </div>

                        <div className={`p-4 rounded-2xl border-2 transition-all ${activeMinutes >= activeGoal ? 'bg-purple-50 border-purple-200' : 'bg-slate-50 border-slate-200'}`}>
                            <div className="flex items-center gap-2 mb-1">
                                <Zap size={14} className={activeMinutes >= activeGoal ? 'text-purple-600' : 'text-slate-400'} />
                                <span className={`text-xs font-bold ${activeMinutes >= activeGoal ? 'text-purple-700' : 'text-slate-500'}`}>Active Ace</span>
                            </div>
                            <p className="text-[10px] text-slate-500">Stay active {activeGoal} min</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FitnessTracking;