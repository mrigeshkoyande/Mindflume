import React from 'react';
import {
  LayoutDashboard,
  MessageCircleHeart,
  Activity,
  TimerReset,
  PhoneOff,
  BrainCircuit,
  UserCircle,
  Menu,
  ChevronLeft,
  BatteryMedium,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'chat', label: 'Chat', icon: MessageCircleHeart },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'wellbeing', label: 'Wellbeing', icon: TimerReset },
    { id: 'detox', label: 'Detox', icon: PhoneOff },
    { id: 'fitness', label: 'Fitness', icon: Activity },
    { id: 'health', label: 'Health', icon: BrainCircuit },
    { id: 'persona', label: 'Persona', icon: UserCircle },
  ];

  return (
    <div
      className={`
        glass-panel m-4 rounded-3xl transition-all duration-500 ease-spring flex flex-col z-30 shadow-glass
        ${isOpen ? 'w-64' : 'w-[80px]'}
      `}
    >
      <div className="p-5 flex items-center justify-between">
        <div className={`flex items-center gap-3 overflow-hidden whitespace-nowrap transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20">
            <MessageCircleHeart size={18} />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 text-base tracking-tight">MindfulMe</h1>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            p-2 rounded-xl hover:bg-[#d1fae5] text-slate-500 hover:text-slate-800 transition-all duration-300
            ${!isOpen && 'mx-auto'}
          `}
        >
          {isOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <nav className="flex-1 py-2 overflow-y-auto px-3 custom-scrollbar">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden
                    ${isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/25 translate-x-1'
                      : 'text-slate-500 hover:bg-[#d1fae5]/80 hover:text-slate-900 hover:translate-x-1'
                    }
                    ${!isOpen && 'justify-center'}
                  `}
                >
                  <Icon size={20} className={`relative z-10 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'} transition-colors`} />
                  <span
                    className={`
                      whitespace-nowrap transition-all duration-500 origin-left font-medium text-sm relative z-10
                      ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0 overflow-hidden absolute'}
                    `}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User / Mental Battery Card */}
      <div className="p-3 mt-auto">
        <div
          onClick={() => setActiveTab('persona')}
          className={`
          rounded-2xl transition-all duration-500 overflow-hidden relative cursor-pointer group
          ${isOpen
              ? 'bg-gradient-to-br from-white via-emerald-50/50 to-white p-4 shadow-xl border border-white/60 ring-1 ring-emerald-100/50'
              : 'bg-transparent p-2 flex justify-center hover:bg-emerald-50 rounded-xl'}
        `}>
          {/* Decorative background for expanded card */}
          {isOpen && (
            <>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100/40 to-teal-100/40 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-50/30 rounded-full blur-xl -ml-8 -mb-8 pointer-events-none"></div>
            </>
          )}

          <div className={`flex items-center gap-3 relative z-10 ${!isOpen && 'justify-center'}`}>
            <div className="relative group-hover:scale-105 transition-transform duration-300">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm ring-2 ring-emerald-50">
                <UserCircle size={22} className="text-emerald-500" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full shadow-sm"></div>
            </div>

            <div className={`transition-all duration-500 overflow-hidden whitespace-nowrap ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
              <p className="text-sm font-bold tracking-tight text-slate-800 group-hover:text-emerald-700 transition-colors">Team Alpha</p>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider bg-emerald-100/50 px-1.5 py-0.5 rounded-md inline-block mt-0.5 text-emerald-700">Pro Member</p>
            </div>

            {isOpen && (
              <button
                onClick={(e) => { e.stopPropagation(); /* Add logout logic here later */ }}
                className="ml-auto p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>

          {/* Expanded Mental Battery Details */}
          {isOpen && (
            <div className="mt-4 pt-3 border-t border-emerald-100/60 animate-fade-in relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5 group-hover:text-emerald-600 transition-colors">
                  <BatteryMedium size={14} className="text-emerald-500" /> Energy
                </span>
                <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 rounded-md">85%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-100">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full rounded-full shadow-[0_0_10px_rgba(52,211,153,0.4)] relative overflow-hidden"
                  style={{ width: '85%' }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse-slow"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;