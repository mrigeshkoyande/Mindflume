import React, { useState, useEffect, useRef } from 'react';
import { Wind, Moon, Sun, BookOpen, PhoneOff, Play, Pause, RotateCcw, ChevronLeft, Clock, CheckCircle2, Award, TrendingDown, Smartphone, Eye, Target } from 'lucide-react';
import Button from './Button';

const DetoxCard: React.FC<{
  title: string;
  desc: string;
  time: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
  completed?: boolean;
}> = ({ title, desc, time, icon, color, onClick, completed = false }) => (
  <div
    onClick={onClick}
    className={`glass-card p-5 rounded-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden ${completed ? 'border-2 border-emerald-400/50' : ''}`}
  >
    {completed && (
      <div className="absolute top-3 right-3 z-10">
        <CheckCircle2 size={20} className="text-emerald-500 fill-emerald-100" />
      </div>
    )}
    <div className="flex items-start justify-between mb-3">
      <div className={`p-3 rounded-xl ${color} transition-transform group-hover:rotate-6 group-hover:scale-110 shadow-sm`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold px-2 py-1 bg-slate-50 border border-slate-100 text-slate-500 rounded-full flex items-center gap-1">
        <Clock size={10} />
        {time}
      </span>
    </div>
    <h3 className="text-base font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors">{title}</h3>
    <p className="text-xs text-slate-500 leading-relaxed mb-4 font-medium">{desc}</p>
    <div className={`text-xs font-bold flex items-center gap-1 ${completed ? 'text-emerald-600' : 'text-slate-400 group-hover:text-emerald-600'} transition-colors`}>
      {completed ? 'Completed ✓' : 'Start Activity'}
      {!completed && <div className="w-1 h-1 bg-current rounded-full"></div>}
    </div>
  </div>
);

const BreathworkTimer: React.FC<{ onExit: () => void; onComplete: () => void }> = ({ onExit, onComplete }) => {
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(180); // Default 3 mins in seconds
  const [timeLeft, setTimeLeft] = useState(180);
  const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [cycleStep, setCycleStep] = useState(0); // 0: Inhale, 1: Hold, 2: Exhale
  const [cycleCount, setCycleCount] = useState(0);

  // Timer Countdown
  useEffect(() => {
    let interval: number;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setPhase('idle');
      onComplete(); // Mark as complete
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  // Breathing Cycle Logic (4-4-8 Rhythm)
  useEffect(() => {
    if (!isActive) {
      setPhase('idle');
      setCycleStep(0);
      return;
    }

    let timeout: NodeJS.Timeout;

    if (cycleStep === 0) {
      // Inhale (4s)
      setPhase('inhale');
      timeout = setTimeout(() => setCycleStep(1), 4000);
    } else if (cycleStep === 1) {
      // Hold (4s)
      setPhase('hold');
      timeout = setTimeout(() => setCycleStep(2), 4000);
    } else if (cycleStep === 2) {
      // Exhale (8s)
      setPhase('exhale');
      timeout = setTimeout(() => {
        setCycleStep(0);
        setCycleCount(prev => prev + 1);
      }, 8000);
    }

    return () => clearTimeout(timeout);
  }, [isActive, cycleStep]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration);
    setPhase('idle');
    setCycleStep(0);
    setCycleCount(0);
  };

  const handleDurationChange = (mins: number) => {
    setIsActive(false);
    setDuration(mins * 60);
    setTimeLeft(mins * 60);
    setPhase('idle');
    setCycleCount(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Dynamic Styles based on Phase
  const getCircleStyle = () => {
    switch (phase) {
      case 'inhale': return 'scale-150 border-teal-400 bg-teal-50 shadow-[0_0_30px_rgba(45,212,191,0.3)]'; // Expand
      case 'hold': return 'scale-150 border-teal-500 bg-teal-100 shadow-[0_0_30px_rgba(45,212,191,0.5)]'; // Stay Expanded
      case 'exhale': return 'scale-100 border-teal-200 bg-teal-50 shadow-none'; // Contract
      default: return 'scale-100 border-slate-200 bg-slate-50';
    }
  };

  const getTransitionDuration = () => {
    switch (phase) {
      case 'inhale': return 'duration-[4000ms]';
      case 'hold': return 'duration-[0ms]'; // Instant (already at scale) or keep previous
      case 'exhale': return 'duration-[8000ms]';
      default: return 'duration-500';
    }
  };

  const getInstructionText = () => {
    switch (phase) {
      case 'inhale': return 'Inhale...';
      case 'hold': return 'Hold';
      case 'exhale': return 'Exhale...';
      default: return 'Ready?';
    }
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={onExit} className="p-2 hover:bg-white/50 rounded-xl transition-colors text-slate-600">
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-lg font-bold text-slate-800">Guided Breathwork</h3>
        <div className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
          {cycleCount} cycles
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Main Visual */}
      <div className="flex-1 flex flex-col items-center justify-center relative min-h-[300px]">
        {/* Background Pulse Effect */}
        <div className={`absolute w-64 h-64 rounded-full bg-teal-100/30 blur-3xl transition-all duration-1000 ${phase === 'inhale' || phase === 'hold' ? 'scale-125 opacity-100' : 'scale-100 opacity-50'}`}></div>

        {/* Breathing Circle */}
        <div className="relative z-10">
          <div
            className={`
              w-40 h-40 rounded-full border-4 flex items-center justify-center shadow-sm backdrop-blur-sm
              transition-all ease-in-out ${getTransitionDuration()} ${getCircleStyle()}
            `}
          >
            <span className={`text-xl font-bold text-teal-700 transition-opacity duration-300`}>
              {getInstructionText()}
            </span>
          </div>
        </div>

        {/* Phase Indicator (Dots) */}
        <div className="flex gap-2 mt-12">
          <div className={`h-1.5 w-1.5 rounded-full transition-colors ${cycleStep === 0 && isActive ? 'bg-teal-500' : 'bg-slate-200'}`}></div>
          <div className={`h-1.5 w-1.5 rounded-full transition-colors ${cycleStep === 1 && isActive ? 'bg-teal-500' : 'bg-slate-200'}`}></div>
          <div className={`h-1.5 w-1.5 rounded-full transition-colors ${cycleStep === 2 && isActive ? 'bg-teal-500' : 'bg-slate-200'}`}></div>
        </div>
      </div>

      {/* Controls */}
      <div className="glass-panel rounded-3xl p-6 shadow-xl border border-white/80 mt-auto">
        <div className="flex justify-center mb-5">
          <span className="text-3xl font-mono font-bold text-slate-800 tabular-nums">
            {formatTime(timeLeft)}
          </span>
        </div>

        <div className="flex justify-center gap-6 mb-6">
          <button onClick={() => handleDurationChange(1)} className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${duration === 60 ? 'bg-teal-100 text-teal-700 shadow-sm' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>1 Min</button>
          <button onClick={() => handleDurationChange(3)} className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${duration === 180 ? 'bg-teal-100 text-teal-700 shadow-sm' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>3 Min</button>
          <button onClick={() => handleDurationChange(5)} className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${duration === 300 ? 'bg-teal-100 text-teal-700 shadow-sm' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>5 Min</button>
          <button onClick={() => handleDurationChange(10)} className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${duration === 600 ? 'bg-teal-100 text-teal-700 shadow-sm' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>10 Min</button>
        </div>

        <div className="flex justify-center gap-6 items-center">
          <button
            onClick={resetTimer}
            className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <RotateCcw size={20} />
          </button>

          <button
            onClick={toggleTimer}
            className={`p-5 rounded-full text-white shadow-xl hover:scale-105 active:scale-95 transition-all ${isActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-teal-500 hover:bg-teal-600'}`}
          >
            {isActive ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </button>
        </div>
      </div>
    </div>
  );
};

const ScreenTimeTracker: React.FC = () => {
  const [goal, setGoal] = useState(120); // minutes
  const [currentUsage] = useState(85); // mock data

  const percentage = Math.min((currentUsage / goal) * 100, 100);
  const isOverGoal = currentUsage > goal;

  return (
    <div className="glass-card p-6 rounded-3xl border border-white/60">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
            <Smartphone size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Screen Time Today</h3>
            <p className="text-xs text-slate-500">Goal: {goal} minutes</p>
          </div>
        </div>
        <button
          onClick={() => setGoal(prev => prev === 120 ? 180 : prev === 180 ? 60 : 120)}
          className="text-xs font-bold text-emerald-600 hover:underline"
        >
          Adjust
        </button>
      </div>

      {/* Progress Circle */}
      <div className="relative flex items-center justify-center mb-4">
        <svg className="w-32 h-32 -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-slate-100"
          />
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 56}`}
            strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
            className={`transition-all duration-1000 ${isOverGoal ? 'text-orange-500' : 'text-blue-500'}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-800">{currentUsage}</span>
          <span className="text-xs text-slate-500">minutes</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs">
        <TrendingDown size={14} className={isOverGoal ? 'text-orange-500' : 'text-emerald-500'} />
        <span className={`font-bold ${isOverGoal ? 'text-orange-600' : 'text-emerald-600'}`}>
          {goal - currentUsage > 0 ? `${goal - currentUsage} min remaining` : `${currentUsage - goal} min over goal`}
        </span>
      </div>
    </div>
  );
};

const DigitalDetox: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<'none' | 'breathing'>('none');
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [streak, setStreak] = useState(3); // mock data

  const markComplete = (activityId: string) => {
    setCompletedActivities(prev => new Set(prev).add(activityId));
  };

  const handleActivityClick = (activityId: string, action?: () => void) => {
    if (action) {
      action();
    } else {
      markComplete(activityId);
    }
  };

  if (activeFeature === 'breathing') {
    return (
      <div className="p-6 h-full overflow-y-auto">
        <BreathworkTimer
          onExit={() => setActiveFeature('none')}
          onComplete={() => markComplete('breathing')}
        />
      </div>
    );
  }

  const totalActivities = 4;
  const completedCount = completedActivities.size;
  const completionPercentage = (completedCount / totalActivities) * 100;

  return (
    <div className="p-6 animate-fade-in space-y-6 h-full overflow-y-auto custom-scrollbar">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-slate-800">Digital Detox</h2>
        <p className="text-xs text-slate-500 font-medium">Mindfulness exercises to help you disconnect and recharge</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Streak Card */}
        <div className="glass-card p-5 rounded-2xl border border-white/60 hover:border-emerald-200 transition-all group cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl group-hover:scale-110 transition-transform">
              <Award size={20} />
            </div>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">Daily</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-0.5">{streak} Days</h3>
          <p className="text-xs text-slate-500 font-medium">Current Streak 🔥</p>
        </div>

        {/* Activities Completed */}
        <div className="glass-card p-5 rounded-2xl border border-white/60 hover:border-emerald-200 transition-all group cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
              <Target size={20} />
            </div>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">Today</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-0.5">{completedCount}/{totalActivities}</h3>
          <p className="text-xs text-slate-500 font-medium">Activities Done</p>
        </div>

        {/* Focus Time */}
        <div className="glass-card p-5 rounded-2xl border border-white/60 hover:border-emerald-200 transition-all group cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 bg-purple-100 text-purple-600 rounded-xl group-hover:scale-110 transition-transform">
              <Eye size={20} />
            </div>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">Week</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-0.5">42 min</h3>
          <p className="text-xs text-slate-500 font-medium">Mindful Time</p>
        </div>
      </div>

      {/* Banner with Progress */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-3xl border border-teal-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-200/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <div className="flex items-start gap-5 mb-4">
            <div className="p-3.5 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/30">
              <PhoneOff size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-emerald-900 mb-1">Take a Mindful Break</h3>
              <p className="text-sm text-emerald-800/80 max-w-xl leading-relaxed">
                Regular digital detox sessions can reduce stress. Try giving your mind a rest from screens.
              </p>
            </div>
          </div>

          {/* Daily Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-700">Today's Progress</span>
              <span className="text-xs font-bold text-emerald-700">{Math.round(completionPercentage)}%</span>
            </div>
            <div className="w-full h-2 bg-emerald-200/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Screen Time Tracker */}
      <ScreenTimeTracker />

      {/* Activity Filter Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <button
          className="px-5 py-3 bg-teal-500 text-white backdrop-blur-sm rounded-2xl shadow-md font-bold whitespace-nowrap hover:bg-teal-600 transition-all min-w-[100px] flex flex-col items-center gap-1.5"
        >
          <Wind size={18} />
          <span className="text-xs">All</span>
        </button>
        <button className="px-5 py-3 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-white/60 text-slate-600 font-bold whitespace-nowrap hover:bg-white hover:shadow-md transition-all min-w-[100px] flex flex-col items-center gap-1.5">
          <BookOpen size={18} className="text-purple-500" />
          <span className="text-xs">Mindfulness</span>
        </button>
        <button className="px-5 py-3 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-white/60 text-slate-600 font-bold whitespace-nowrap hover:bg-white hover:shadow-md transition-all min-w-[100px] flex flex-col items-center gap-1.5">
          <Sun size={18} className="text-orange-500" />
          <span className="text-xs">Movement</span>
        </button>
        <button className="px-5 py-3 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-white/60 text-slate-600 font-bold whitespace-nowrap hover:bg-white hover:shadow-md transition-all min-w-[100px] flex flex-col items-center gap-1.5">
          <Moon size={18} className="text-indigo-500" />
          <span className="text-xs">Rest</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <DetoxCard
          title="Deep Breathing"
          desc="Practice 4-4-8 breathing technique"
          time="Variable"
          icon={<Wind size={20} />}
          color="bg-teal-100 text-teal-600"
          onClick={() => setActiveFeature('breathing')}
          completed={completedActivities.has('breathing')}
        />
        <DetoxCard
          title="Body Scan Meditation"
          desc="Progressive relaxation from head to toe"
          time="10 min"
          icon={<BookOpen size={20} />}
          color="bg-purple-100 text-purple-600"
          onClick={() => handleActivityClick('bodyscan')}
          completed={completedActivities.has('bodyscan')}
        />
        <DetoxCard
          title="Mindful Walking"
          desc="Walk without your phone. Notice sounds."
          time="15 min"
          icon={<Sun size={20} />}
          color="bg-orange-100 text-orange-600"
          onClick={() => handleActivityClick('walking')}
          completed={completedActivities.has('walking')}
        />
        <DetoxCard
          title="Digital Sunset"
          desc="Turn off all screens one hour before bed."
          time="60 min"
          icon={<Moon size={20} />}
          color="bg-indigo-100 text-indigo-600"
          onClick={() => handleActivityClick('sunset')}
          completed={completedActivities.has('sunset')}
        />
      </div>

      {/* Achievement Notification */}
      {completedCount === totalActivities && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full shadow-2xl animate-bounce-in flex items-center gap-3 z-50">
          <Award size={20} className="animate-spin-slow" />
          <span className="font-bold text-sm">🎉 All activities completed today!</span>
        </div>
      )}
    </div>
  );
};

export default DigitalDetox;