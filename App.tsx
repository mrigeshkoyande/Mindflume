import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Dashboard from './components/Dashboard';
import DigitalWellbeing from './components/DigitalWellbeing';
import DigitalDetox from './components/DigitalDetox';
import FitnessTracking from './components/FitnessTracking';
import HealthAnalysis from './components/HealthAnalysis';
import Persona from './components/Persona';
import { Bell, Sparkles, X, Quote, Calendar, Trophy, AlertCircle, CheckCircle } from 'lucide-react';
import { getDailyWisdom, getRandomAffirmations } from './utils/wisdom';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  // Dynamic text state
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');


  useEffect(() => {
    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 5) setGreeting('Good Late Night');
    else if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Set formatted date
    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    setCurrentDate(new Date().toLocaleDateString('en-US', dateOptions));


  }, []);

  // Get daily wisdom and random affirmation on mount
  const [notifications, setNotifications] = useState(() => {
    const daily = getDailyWisdom();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const randomAffirmation = getRandomAffirmations(1)[0];

    return [
      {
        id: 1,
        title: daily.title,
        text: daily.text,
        author: daily.author,
        type: 'quote',
        time: 'Today'
      },
      {
        id: 2,
        title: "Mindful Check-in",
        text: "It's been a few hours. How is your energy level?",
        type: 'reminder',
        time: '2h ago'
      },
      {
        id: 3,
        title: "Goal Crushed!",
        text: "You hit your 10,000 steps goal yesterday! Keep up the momentum.",
        type: 'achievement',
        time: 'Yesterday'
      },
      {
        id: 4,
        title: "High Stress Detected",
        text: "Your recent chat patterns suggest high stress. Consider a breathing exercise.",
        type: 'alert',
        time: 'Yesterday'
      }
    ];
  });

  const dismissNotification = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  useEffect(() => {
    const handleClickOutside = () => setShowNotifications(false);
    if (showNotifications) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [showNotifications]);

  const renderContent = () => {
    switch (activeTab) {
      case 'chat': return <Chat onNavigate={setActiveTab} key="chat" />;
      case 'dashboard': return <Dashboard key="dashboard" />;
      case 'wellbeing': return <DigitalWellbeing key="wellbeing" />;
      case 'detox': return <DigitalDetox key="detox" />;
      case 'fitness': return <FitnessTracking key="fitness" />;
      case 'health': return <HealthAnalysis key="health" />;
      case 'persona': return <Persona setIsSidebarOpen={setIsSidebarOpen} key="persona" />;
      default: return <Chat onNavigate={setActiveTab} key="default" />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#d1fae5] overflow-hidden font-sans text-slate-700">

      {/* Dynamic Background Mesh - Subtler Opacity */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-emerald-200 to-teal-200 blur-[80px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-green-200 to-emerald-200 blur-[80px] animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[40%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-teal-100 to-cyan-100 blur-[80px] animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1 h-full relative flex flex-col z-10">
        <header className="px-6 py-4 flex justify-between items-center shrink-0 z-20">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-slate-800 capitalize tracking-tight">
              {activeTab === 'chat' ? 'MindfulMe' : activeTab.replace(/([A-Z])/g, ' $1').trim()}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>{greeting}, Team Alpha</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="text-slate-400">{currentDate}</span>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex gap-3 items-center relative">


            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotifications(!showNotifications);
              }}
              className={`relative p-2 rounded-xl transition-all duration-300 ${showNotifications ? 'bg-[#ecfdf5] shadow-md text-primary' : 'bg-[#ecfdf5]/60 hover:bg-[#ecfdf5] text-slate-600 hover:shadow-sm'}`}
            >
              <Bell size={18} />
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full border border-[#ecfdf5]"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full right-0 mt-2 w-80 glass-panel rounded-2xl shadow-xl p-3 animate-fade-in origin-top-right z-50 border border-[#ecfdf5]/80"
              >
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100/50">
                  <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    Notifications <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded-full font-bold">{notifications.length}</span>
                  </h3>
                  <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X size={14} />
                  </button>
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <div className="text-center py-6 text-slate-400">
                      <Bell size={24} className="mx-auto mb-2 opacity-20" />
                      <p className="text-xs font-medium">All caught up</p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="
                          p-4 rounded-xl
                          bg-gradient-to-br from-[#ecfdf5] via-[#ecfdf5] to-[#d1fae5]/50
                          border border-[#ecfdf5]/80
                          shadow-md hover:shadow-xl
                          transition-all duration-300
                          group relative cursor-default
                          hover:scale-[1.02]
                          hover:border-emerald-200/50
                        "
                      >
                        <button
                          onClick={(e) => dismissNotification(notif.id, e)}
                          className="
                            absolute top-3 right-3 p-1.5
                            text-slate-300 hover:text-rose-500
                            opacity-0 group-hover:opacity-100
                            transition-all duration-200
                            rounded-lg hover:bg-rose-50
                          "
                        >
                          <X size={12} />
                        </button>
                        <div className="flex gap-3 pr-6">
                          <div className={`
                            w-10 h-10 rounded-xl
                            flex items-center justify-center shrink-0
                            shadow-lg
                            ${notif.type === 'quote' ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white' : ''}
                            ${notif.type === 'reminder' ? 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white' : ''}
                            ${notif.type === 'achievement' ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' : ''}
                            ${notif.type === 'alert' ? 'bg-gradient-to-br from-rose-500 to-red-600 text-white' : ''}
                          `}>
                            {notif.type === 'quote' && <Quote size={16} />}
                            {notif.type === 'reminder' && <Calendar size={16} />}
                            {notif.type === 'achievement' && <Trophy size={16} />}
                            {notif.type === 'alert' && <AlertCircle size={16} />}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-2">
                              {notif.title}
                              {notif.type === 'quote' && <Sparkles size={12} className="text-amber-500" />}
                              {notif.type === 'achievement' && <CheckCircle size={12} className="text-emerald-500" />}
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed font-medium mb-2 line-clamp-3">
                              "{notif.text}"
                            </p>
                            {(notif as any).author && (
                              <p className="text-[10px] text-emerald-600 font-semibold italic">
                                — {(notif as any).author}
                              </p>
                            )}
                            <span className="text-[10px] text-slate-400 mt-1.5 block font-medium">
                              {notif.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
          <div key={activeTab} className="h-full w-full animate-fade-in">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;