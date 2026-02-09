import React, { useState, useEffect } from 'react';
import { User, Shield, Zap, Heart, Star, Calendar, Activity, Moon, Droplets, Plus, X, Check, Edit2, Camera, Award, ChevronRight, Layout, Sliders, Save, Target, Wind } from 'lucide-react';
import Button from './Button';

interface PersonaProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Persona: React.FC<PersonaProps> = ({ setIsSidebarOpen }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState({
    name: 'Team Alpha',
    title: 'The "Balanced Achiever"',
    level: 5,
    xp: 2450,
    nextLevelXp: 3000,
  });

  const [stats, setStats] = useState({
    mindfulness: 85,
    digitalBalance: 60,
    resilience: 75
  });

  const [habits, setHabits] = useState([
    { id: 1, text: 'Establish a consistent sleep schedule', completed: false, tip: true, category: 'Sleep' },
    { id: 2, text: 'Drink 8 glasses of water', completed: true, tip: false, category: 'Health' },
    { id: 3, text: '10 mins of meditation', completed: false, tip: false, category: 'Mindfulness' }
  ]);

  const [newHabit, setNewHabit] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  // Simulate XP gain
  const gainXp = (amount: number) => {
    setProfile(prev => {
      const newXp = prev.xp + amount;
      if (newXp >= prev.nextLevelXp) {
        return {
          ...prev,
          level: prev.level + 1,
          xp: newXp - prev.nextLevelXp,
          nextLevelXp: Math.round(prev.nextLevelXp * 1.2)
        };
      }
      return { ...prev, xp: newXp };
    });
  };

  const handleAddHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, { id: Date.now(), text: newHabit, completed: false, tip: false, category: 'Custom' }]);
      setNewHabit('');
      setIsAdding(false);
      gainXp(50);
    }
  };

  const toggleHabit = (id: number) => {
    const habit = habits.find(h => h.id === id);
    if (habit && !habit.completed) {
      gainXp(100);
    }
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter(h => h.id !== id));
  }

  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
    if (!focusMode) {
      setIsSidebarOpen(false); // Close sidebar on focus mode
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.onerror = () => {
        alert('Failed to read image file');
      };
      reader.readAsDataURL(file);
    }
  };

  const openImagePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="p-6 animate-fade-in space-y-6 h-full overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Your Wellness Persona</h2>
          <p className="text-xs text-slate-500 font-medium">Personalized insights & gamified progress</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={focusMode ? 'primary' : 'secondary'}
            size="sm"
            icon={<Layout size={14} />}
            onClick={toggleFocusMode}
          >
            {focusMode ? 'Focus Active' : 'Focus Mode'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={isEditing ? <Save size={14} /> : <Edit2 size={14} />}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Save Profile' : 'Edit'}
          </Button>
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-indigo-500/20 group">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-500"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-sm shadow-inner overflow-hidden relative group">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={40} />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white text-xs font-semibold">Change</span>
              </div>
            </div>
            <button 
              type="button"
              onClick={openImagePicker}
              className="absolute -bottom-1 -right-1 p-2 bg-white text-indigo-600 rounded-full shadow-lg hover:shadow-xl hover:scale-125 transition-all duration-300 cursor-pointer border-2 border-indigo-100 active:scale-110"
            >
              <Camera size={16} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              aria-label="Upload profile image"
            />
          </div>

          <div className="flex-1 text-center md:text-left w-full">
            {isEditing ? (
              <div className="space-y-2 mb-3">
                <input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="bg-white/20 border border-white/30 text-white placeholder-white/60 text-xl font-bold rounded-lg px-3 py-1 w-full outline-none focus:bg-white/30"
                />
                <input
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="bg-white/10 border border-white/20 text-indigo-100 text-sm font-medium rounded-lg px-3 py-1 w-full outline-none focus:bg-white/20"
                />
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-1">{profile.name}</h3>
                <p className="text-indigo-100 text-sm mb-3 font-medium">{profile.title}</p>
              </>
            )}

            {/* Gamification Bar */}
            <div className="mt-2">
              <div className="flex justify-between items-end mb-1 text-xs font-bold text-indigo-100">
                <span>Level {profile.level}</span>
                <span>{profile.xp} / {profile.nextLevelXp} XP</span>
              </div>
              <div className="h-2 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                  className="h-full bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)] transition-all duration-1000"
                  style={{ width: `${(profile.xp / profile.nextLevelXp) * 100}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-indigo-200 mt-1 font-medium text-right">
                {profile.nextLevelXp - profile.xp} XP to Level {profile.level + 1}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass-card p-5 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
              <Shield size={16} className="text-teal-500" /> Stats Overview
            </h4>
            <Sliders size={14} className="text-slate-400 cursor-pointer hover:text-slate-600" />
          </div>

          <div className="space-y-4">
            <div className="group cursor-pointer">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-500 font-bold flex items-center gap-1.5">
                  <Wind size={12} className="text-teal-500" /> Mindfulness
                </span>
                <span className="font-bold text-slate-800">{stats.mindfulness}/100</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.4)] group-hover:brightness-110 transition-all duration-500"
                  style={{ width: `${stats.mindfulness}%` }}
                ></div>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-500 font-bold flex items-center gap-1.5">
                  <Moon size={12} className="text-amber-500" /> Digital Balance
                </span>
                <span className="font-bold text-slate-800">{stats.digitalBalance}/100</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.4)] group-hover:brightness-110 transition-all duration-500"
                  style={{ width: `${stats.digitalBalance}%` }}
                ></div>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-500 font-bold flex items-center gap-1.5">
                  <Heart size={12} className="text-rose-500" /> Resilience
                </span>
                <span className="font-bold text-slate-800">{stats.resilience}/100</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.4)] group-hover:brightness-110 transition-all duration-500"
                  style={{ width: `${stats.resilience}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
              <Award size={16} className="text-orange-500" /> Recent Achievements
            </h4>
            <span className="text-[10px] font-bold text-slate-400 cursor-pointer hover:text-slate-600">View All</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-xl">
              <div className="p-2 bg-white text-amber-500 rounded-lg shadow-sm">
                <Award size={16} />
              </div>
              <div>
                <p className="font-bold text-amber-900 text-xs">7-Day Streak Master</p>
                <p className="text-[10px] text-amber-700/70 font-medium">Logged in for 7 days consecutive</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-white/50 border border-transparent hover:border-slate-100 rounded-xl transition-colors cursor-pointer opacity-75 hover:opacity-100">
              <div className="p-2 bg-slate-100 text-slate-400 rounded-lg">
                <Target size={16} />
              </div>
              <div>
                <p className="font-bold text-slate-700 text-xs">Goal Crusher</p>
                <p className="text-[10px] text-slate-500 font-medium">Complete 50 daily habits</p>
              </div>
              <div className="ml-auto text-xs font-bold text-slate-400">42/50</div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-3xl">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
            <Calendar size={16} className="text-blue-500" /> Daily Habits
          </h4>
          <div className="flex gap-2 text-[10px] font-bold">
            <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-lg cursor-pointer hover:bg-slate-200">All</span>
            <span className="px-2 py-1 bg-white border border-slate-200 text-slate-400 rounded-lg cursor-pointer hover:border-slate-300">Pending</span>
          </div>
        </div>

        <div className="space-y-3">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className={`
                        flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 group
                        ${habit.completed
                  ? 'bg-green-50/50 border-green-100 opacity-80 decoration-slate-400'
                  : 'bg-white/80 border-slate-100 hover:border-indigo-100 hover:shadow-sm'
                }
                    `}
            >
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`
                            w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                            ${habit.completed
                    ? 'bg-green-500 border-green-500 text-white scale-110'
                    : 'border-slate-300 text-transparent hover:border-green-500 hover:text-green-500/50'
                  }
                        `}
              >
                <Check size={14} strokeWidth={3} />
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  {habit.tip && <span className="text-[9px] font-bold text-yellow-600 bg-yellow-100 px-1.5 py-0.5 rounded-full inline-block">Tip</span>}
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${habit.completed ? 'text-slate-400' : 'text-indigo-500'}`}>{habit.category}</span>
                </div>
                <p className={`text-sm font-medium transition-colors ${habit.completed ? 'text-slate-400 line-through' : 'text-slate-700 group-hover:text-indigo-900'}`}>{habit.text}</p>
              </div>

              {!habit.tip && (
                <button onClick={() => deleteHabit(habit.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                  <X size={16} />
                </button>
              )}
            </div>
          ))}

          {isAdding ? (
            <div className="flex gap-2 animate-fade-in p-2 bg-white rounded-xl border border-indigo-100 shadow-sm">
              <input
                type="text"
                autoFocus
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="Enter new habit..."
                className="flex-1 px-3 py-2 rounded-lg border-none focus:ring-0 outline-none text-sm bg-transparent text-slate-700 placeholder-slate-400"
                onKeyPress={(e) => e.key === 'Enter' && handleAddHabit()}
              />
              <div className="flex gap-1">
                <button onClick={handleAddHabit} className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 shadow-sm transition-colors">
                  <Check size={16} />
                </button>
                <button onClick={() => setIsAdding(false)} className="bg-slate-100 text-slate-500 p-2 rounded-lg hover:bg-slate-200 transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-400 text-sm font-bold hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-500 transition-all flex items-center justify-center gap-2 group"
            >
              <Plus size={16} className="group-hover:scale-110 transition-transform" /> Add a new habit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Persona;