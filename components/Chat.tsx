import React, { useState, useRef, useEffect } from 'react';
import {
  Send, User, Bot, Sparkles, Activity, Calendar,
  Wind, ArrowRight, Coffee, HeartPulse, ShieldCheck,
  MessageCircle, CloudRain, Sun, Info, X, Plus, BookOpen, Save
} from 'lucide-react';
import Button from './Button';
import { defaultKnowledgeBase } from './defaultKnowledgeBase';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
  stressLevel?: 'low' | 'medium' | 'high';
  actions?: string[];
  isTyping?: boolean;
}

interface KnowledgeItem {
  id: string;
  question: string;
  answer: string;
  stressLevel?: 'low' | 'medium' | 'high';
  actions?: string[];
}

interface ChatProps {
  onNavigate: (tab: string) => void;
}

const QuickStatCard: React.FC<{ label: string; value: string; icon: React.ReactNode; color: string; trend?: string }> = ({ label, value, icon, color, trend }) => (
  <div className="glass-card p-4 rounded-2xl flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group cursor-default border border-white/40 bg-white/40">
    <div>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">{label}</p>
      <div className="flex items-end gap-2">
        <h3 className="text-xl font-extrabold text-slate-700 leading-none">{value}</h3>
        {trend && <span className="text-[10px] text-emerald-500 font-semibold mb-0.5">{trend}</span>}
      </div>
    </div>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} shadow-sm group-hover:scale-110 transition-transform duration-500`}>
      {icon}
    </div>
  </div>
);

const ConversationStarter: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 gap-3 bg-white/60 hover:bg-white/90 border border-white/60 hover:border-emerald-200 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md group text-center h-full w-full backdrop-blur-sm relative overflow-hidden"
    aria-label={label}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 group-hover:bg-emerald-50 transition-all duration-300 relative z-10">
      {icon}
    </div>
    <span className="text-xs font-semibold text-slate-600 group-hover:text-emerald-700 transition-colors relative z-10">{label}</span>
  </button>
);

// Typing Effect Component
const TypingText: React.FC<{ text: string; onComplete?: () => void; speed?: number }> = ({ text, onComplete, speed = 15 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    if (text !== displayedText && indexRef.current === 0) {
      setDisplayedText('');
    }
  }, [text]);

  useEffect(() => {
    if (indexRef.current < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(indexRef.current));
        indexRef.current += 1;
      }, speed);
      return () => clearTimeout(timeoutId);
    } else {
      if (onComplete) onComplete();
    }
  }, [displayedText, text, speed, onComplete]);

  return <span>{displayedText}</span>;
};

const Chat: React.FC<ChatProps> = ({ onNavigate }) => {
  const [input, setInput] = useState('');



  // Local Knowledge Base State
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeItem[]>(() => {
    const saved = localStorage.getItem('mindful_knowledge_base');
    // Combine saved knowledge with default if needed, or just use saved if present
    // For now, let's merge them or default to the extensive list if local storage is empty
    if (saved) {
      const parsed = JSON.parse(saved);
      // Optional: Merge defaults if they are not in saved (complex, maybe just use saved for now or reset)
      // To ensure the user gets the new updates, we might want to prioritize defaultKnowledgeBase if saved is "small" or old version.
      // However, to respect user training, let's keep saved. 
      // But if the user wants "mock responses" NOW, let's force merge or just use default + saved.
      // Let's just use defaultKnowledgeBase as the base and add any *new* user trained ones? 
      // Simpler: Just use defaultKnowledgeBase if saved is empty or small (old version had ~24 items).
      if (parsed.length < 30) return defaultKnowledgeBase;
      return parsed;
    }
    return defaultKnowledgeBase;
  });

  const [isTrainingMode, setIsTrainingMode] = useState(false);
  const [trainQuestion, setTrainQuestion] = useState('');
  const [trainAnswer, setTrainAnswer] = useState('');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: "Hello, Team Alpha. I'm your safe space. How are you feeling right now?",
      timestamp: new Date(),
      isTyping: false
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const MAX_CHARS = 1000;

  const quickStarters = [
    { label: "I'm feeling anxious", icon: <CloudRain size={18} />, prompt: "I'm feeling a bit anxious right now." },
    { label: "Help me unwind", icon: <Wind size={18} />, prompt: "I need help unwinding after a long day." },
    { label: "Motivation boost", icon: <Sun size={18} />, prompt: "I could use a little motivation boost." },
    { label: "Just chatting", icon: <MessageCircle size={18} />, prompt: "Just wanted to check in and chat." },
  ];

  useEffect(() => {
    localStorage.setItem('mindful_knowledge_base', JSON.stringify(knowledgeBase));
  }, [knowledgeBase]);

  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      // Use requestAnimationFrame to ensure DOM has updated before scrolling
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: smooth ? 'smooth' : 'auto',
          block: 'end'
        });
      });
    }
  };

  // Auto-scroll when messages, loading state, or typing state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, typingMessageId]);

  // Immediate scroll on component mount (non-smooth for instant positioning)
  useEffect(() => {
    scrollToBottom(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_CHARS) {
      setInput(e.target.value);
    }
  };

  const handleTrainSubmit = () => {
    if (!trainQuestion.trim() || !trainAnswer.trim()) return;

    const newItem: KnowledgeItem = {
      id: Date.now().toString(),
      question: trainQuestion.trim(),
      answer: trainAnswer.trim(),
      stressLevel: 'low',
      actions: []
    };

    setKnowledgeBase(prev => [...prev, newItem]);
    setTrainQuestion('');
    setTrainAnswer('');

    // Optional: Add a system message confirming learning
    const sysMsg: Message = {
      id: Date.now().toString(),
      role: 'bot',
      content: `Create new memory! When you ask "${newItem.question}", I will now reply: "${newItem.answer}"`,
      timestamp: new Date(),
      isTyping: false
    };
    setMessages(prev => [...prev, sysMsg]);
  };

  const findBestMatch = (text: string): KnowledgeItem | null => {
    const lowerText = text.toLowerCase();
    // Simple inclusion matching - find first item where the question key phrase is in the user text
    // We sort by length of question descending to match specific long phrases before short ones
    const sortedKB = [...knowledgeBase].sort((a, b) => b.question.length - a.question.length);

    return sortedKB.find(item => lowerText.includes(item.question.toLowerCase())) || null;
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
      isTyping: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setTypingMessageId(null);

    // Simulate "thinking" time
    setTimeout(() => {
      const match = findBestMatch(text);
      const fallbacks = [
        "I'm still learning about that. You can teach me in 'Training Mode'!",
        "I'm not sure I understand. Could you rephrase that?",
        "That's new to me. I'd love to learn more about it in Training Mode.",
        "I'm here to listen, even if I don't have the perfect answer yet."
      ];
      let responseText = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      let stressLevel: 'low' | 'medium' | 'high' = 'low';
      let actions: string[] = [];

      if (match) {
        responseText = match.answer;
        stressLevel = match.stressLevel || 'low';
        actions = match.actions || [];
      } else {
        // Fallback for very short greetings if not in KB
        if (['hi', 'hello', 'hey'].includes(text.toLowerCase().trim())) {
          responseText = "Hello! I'm listening.";
        }
      }

      const botMessageId = (Date.now() + 1).toString();
      const botMessage: Message = {
        id: botMessageId,
        role: 'bot',
        content: responseText,
        timestamp: new Date(),
        stressLevel: stressLevel,
        actions: actions,
        isTyping: true
      };

      setMessages(prev => [...prev, botMessage]);
      setTypingMessageId(botMessageId);
      setIsLoading(false);
    }, 1000); // 1s delay for realism
  };

  const handleTypingComplete = (msgId: string) => {
    if (typingMessageId === msgId) {
      setTypingMessageId(null);
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === msgId ? { ...msg, isTyping: false } : msg
        )
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isTrainingMode) {
        handleTrainSubmit();
      } else {
        handleSend();
      }
    }
  };

  const getActionLink = (action: string): string | null => {
    const lower = action.toLowerCase();
    if (lower.includes('detox') || lower.includes('breath') || lower.includes('meditation') || lower.includes('calm')) return 'detox';
    if (lower.includes('dashboard') || lower.includes('stats') || lower.includes('mood')) return 'dashboard';
    if (lower.includes('wellbeing') || lower.includes('screen') || lower.includes('usage') || lower.includes('phone')) return 'wellbeing';
    if (lower.includes('fitness') || lower.includes('step') || lower.includes('heart') || lower.includes('walk') || lower.includes('exercise')) return 'fitness';
    if (lower.includes('health') || lower.includes('analysis') || lower.includes('symptom')) return 'health';
    if (lower.includes('persona') || lower.includes('profile')) return 'persona';
    return null;
  };

  const WellnessPanelContent = () => (
    <>
      {/* Mood Pulse Card */}
      <div className="glass-card rounded-[2rem] p-6 shadow-xl shadow-emerald-500/5 border border-white/60 bg-white/40 backdrop-blur-md">
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-5 uppercase tracking-wider">
          <HeartPulse size={16} className="text-rose-500" />
          Wellness Pulse
        </h2>

        <div className="space-y-4">
          <QuickStatCard
            label="Mood Stability"
            value="Stable"
            trend="+12%"
            icon={<Activity size={20} className="text-violet-600" />}
            color="bg-violet-50"
          />
          <QuickStatCard
            label="Mindful Moments"
            value="5"
            icon={<Sparkles size={20} className="text-amber-500" />}
            color="bg-amber-50"
          />

          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-xl mt-2 relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/20 rounded-full blur-2xl -mr-5 -mt-5"></div>

            <div className="flex justify-between items-end mb-3 relative z-10">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resilience</span>
              <span className="text-2xl font-bold text-emerald-400">High</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 relative z-10">
              <div className="bg-gradient-to-r from-emerald-400 to-teal-300 h-2 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.5)] group-hover:shadow-[0_0_20px_rgba(52,211,153,0.7)] transition-all duration-500" style={{ width: '85%' }}></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 relative z-10">Based on data.</p>
          </div>
        </div>
      </div>

      {/* Today's Journey */}
      <div className="glass-card rounded-[2rem] p-6 flex-1 shadow-xl shadow-emerald-500/5 border border-white/60 min-h-[300px] bg-white/40 backdrop-blur-md">
        <h3 className="text-xs font-bold text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-wide">
          <Calendar size={14} className="text-indigo-500" /> Today's Journey
        </h3>
        <div className="space-y-0 relative pl-2">
          <div className="absolute left-[21px] top-2 bottom-2 w-0.5 bg-slate-100/80 rounded-full"></div>

          {[
            { time: "9:00 AM", event: "Morning Check-in", icon: <Sun size={14} />, color: "text-amber-500", border: "border-amber-200" },
            { time: "1:30 PM", event: "Breathing Exercise", icon: <Wind size={14} />, color: "text-emerald-500", border: "border-emerald-200" },
            { time: "Just now", event: "Reflection", icon: <MessageCircle size={14} />, color: "text-indigo-500", border: "border-indigo-200" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 py-3 relative group cursor-default hover:bg-white/50 rounded-xl px-2 transition-all -ml-2">
              <div className={`w-8 h-8 rounded-full bg-white border-2 ${item.border} flex items-center justify-center ${item.color} shrink-0 relative z-10 shadow-sm group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-slate-400 mb-0.5 uppercase tracking-wide">{item.time}</p>
                <p className="text-xs font-bold text-slate-700">{item.event}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-center">
            <p className="text-xs font-medium text-indigo-800 mb-2">"You are doing better than you think."</p>
            <div className="h-0.5 w-10 bg-indigo-200 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col lg:flex-row h-full gap-5 p-4 md:p-6 animate-fade-in max-w-7xl mx-auto relative">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-0 glass-card rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-white/60 relative bg-white/40 backdrop-blur-xl">

        {/* Header with Train Mode Toggle */}
        <div className="shrink-0 z-10 p-4 md:p-5 bg-white/60 backdrop-blur-md border-b border-white/50 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/70 backdrop-blur-md rounded-full border border-emerald-100/50 shadow-sm">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-600/90 uppercase tracking-wider">Private Space</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Training Mode Toggle */}
            <button
              onClick={() => setIsTrainingMode(!isTrainingMode)}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border
                ${isTrainingMode
                  ? 'bg-amber-100 text-amber-700 border-amber-200 shadow-sm'
                  : 'bg-white/70 text-slate-500 border-white/60 hover:text-emerald-600'}
              `}
            >
              <BookOpen size={14} />
              {isTrainingMode ? "Training Mode" : "Chat Mode"}
            </button>

            {/* Mobile Info Toggle */}
            <button
              onClick={() => setShowMobileDetails(!showMobileDetails)}
              className="lg:hidden p-2 rounded-full bg-white/70 backdrop-blur-md border border-white/60 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors shadow-sm"
            >
              {showMobileDetails ? <X size={16} /> : <Info size={16} />}
            </button>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar scroll-smooth">


          {isTrainingMode ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fade-in">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-4 text-amber-600 shadow-sm">
                <BookOpen size={32} />
              </div>
              <h2 className="text-xl font-bold text-slate-700 mb-2">Train Your Bot</h2>
              <p className="text-sm text-slate-500 max-w-sm mb-6">
                Teach the bot how to respond. Enter a user question (trigger) and the answer you want the bot to give.
              </p>

              <div className="w-full max-w-md space-y-4 bg-white/50 p-6 rounded-3xl border border-white/60 shadow-sm backdrop-blur-sm">
                <div className="text-left">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">When user says...</label>
                  <input
                    type="text"
                    value={trainQuestion}
                    onChange={(e) => setTrainQuestion(e.target.value)}
                    placeholder="e.g., I feel sad"
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm"
                  />
                </div>

                <div className="text-left">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Bot replies...</label>
                  <textarea
                    value={trainAnswer}
                    onChange={(e) => setTrainAnswer(e.target.value)}
                    placeholder="e.g., It's okay to feel sad. I'm here for you."
                    rows={3}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm resize-none"
                  />
                </div>

                <Button
                  onClick={handleTrainSubmit}
                  disabled={!trainQuestion.trim() || !trainAnswer.trim()}
                  variant="primary"
                  className="w-full justify-center mt-2"
                  icon={<Save size={16} />}
                >
                  Save to Memory
                </Button>
              </div>

              <div className="mt-8 w-full max-w-md">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Current Knowledge base ({knowledgeBase.length})</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar p-1">
                  {knowledgeBase.slice().reverse().map((kb) => (
                    <div key={kb.id} className="bg-white/40 p-3 rounded-xl border border-white/60 text-left text-xs text-slate-600 flex justify-between items-center group">
                      <span className="font-semibold truncate max-w-[40%]">"{kb.question}"</span>
                      <ArrowRight size={10} className="text-slate-300" />
                      <span className="truncate max-w-[40%] opacity-70">"{kb.answer}"</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-slide-in-right group`}
                  style={{ animationDuration: '0.4s' }}
                >
                  <div
                    className={`
                      w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border transition-all duration-300 group-hover:scale-110
                      ${msg.role === 'user'
                        ? 'bg-gradient-to-br from-indigo-100 to-violet-50 text-indigo-600 border-indigo-100'
                        : 'bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-600 border-emerald-100 relative overflow-hidden'}
                    `}
                  >
                    {/* Pulse effect for bot when typing */}
                    {msg.role === 'bot' && (isLoading || msg.isTyping) && (
                      <div className="absolute inset-0 bg-emerald-400/20 animate-pulse rounded-2xl"></div>
                    )}
                    {msg.role === 'user' ? <User size={18} strokeWidth={2.5} /> : <Bot size={20} strokeWidth={2.5} className="relative z-10" />}
                  </div>

                  <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`
                        p-4 text-[15px] leading-relaxed shadow-sm backdrop-blur-sm relative
                        ${msg.role === 'user'
                          ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-2xl rounded-tr-sm shadow-indigo-500/20'
                          : 'bg-white/80 text-slate-700 rounded-2xl rounded-tl-sm border border-white/60 shadow-slate-200/50'
                        }
                      `}
                    >
                      {msg.role === 'bot' && msg.isTyping ? (
                        <TypingText text={msg.content} onComplete={() => handleTypingComplete(msg.id)} />
                      ) : (
                        <span>{msg.content}</span>
                      )}
                    </div>

                    {/* Metadata & Stress Context */}
                    {msg.role === 'bot' && !msg.isTyping && (
                      <div className="mt-2 text-[10px] text-slate-400 font-medium px-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>MindfulMe • Just now</span>
                        {msg.stressLevel && <span className="w-1 h-1 bg-slate-300 rounded-full"></span>}
                      </div>
                    )}

                    {msg.role === 'bot' && !msg.isTyping && msg.stressLevel && (msg.stressLevel !== 'low') && (
                      <div className="mt-2 flex flex-col gap-2 w-full animate-fade-in max-w-sm">
                        {/* Insight Card */}
                        <div className={`
                            p-3 rounded-2xl border flex items-center gap-3 shadow-sm
                            ${msg.stressLevel === 'high'
                            ? 'bg-rose-50/50 border-rose-100'
                            : 'bg-amber-50/50 border-amber-100'}
                        `}>
                          <div className={`p-2 rounded-xl ${msg.stressLevel === 'high' ? 'bg-rose-100 text-rose-500' : 'bg-amber-100 text-amber-500'}`}>
                            {msg.stressLevel === 'high' ? <Wind size={16} /> : <Coffee size={16} />}
                          </div>
                          <div className="flex-1">
                            <p className={`text-xs font-bold ${msg.stressLevel === 'high' ? 'text-rose-700' : 'text-amber-700'}`}>
                              {msg.stressLevel === 'high' ? 'High Tension Detected' : 'Noticed some stress?'}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {msg.stressLevel === 'high' ? 'Let’s take a moment to breathe.' : 'A short break might help.'}
                            </p>
                          </div>
                          <Button
                            variant={msg.stressLevel === 'high' ? 'danger' : 'secondary'}
                            size="sm"
                            className="text-xs h-8 px-3"
                            onClick={() => onNavigate('detox')}
                            icon={<ArrowRight size={12} />}
                          >
                            Reset
                          </Button>
                        </div>
                      </div>
                    )}

                    {msg.role === 'bot' && !msg.isTyping && msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 w-full space-y-2 pl-2 animate-fade-in">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                          <Sparkles size={10} /> Suggested Actions
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {msg.actions.map((action, idx) => {
                            const navTarget = getActionLink(action);
                            return (
                              <button
                                key={idx}
                                onClick={() => navTarget && onNavigate(navTarget)}
                                disabled={!navTarget}
                                className={`
                                        px-4 py-2 rounded-xl text-xs font-medium border transition-all duration-300 flex items-center gap-2
                                        ${navTarget
                                    ? 'bg-white border-emerald-100 text-slate-600 hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md cursor-pointer hover:-translate-y-0.5'
                                    : 'bg-slate-50 border-slate-100 text-slate-400 cursor-default'
                                  }
                                    `}
                              >
                                {action}
                                {navTarget && <ArrowRight size={12} className="text-emerald-400" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Welcome / Empty State - Moved here */}
              {messages.length === 1 && !isTrainingMode && (
                <div className="mb-8 animate-fade-in mt-4">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-50 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-inner text-emerald-600 ring-4 ring-white/50">
                      <Sparkles size={32} className="animate-pulse-slow" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-700 mb-2 tracking-tight">How can I support you?</h2>
                    <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">Choose a starter below or type whatever is on your mind.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                    {quickStarters.map((starter, idx) => (
                      <ConversationStarter
                        key={idx}
                        label={starter.label}
                        icon={starter.icon}
                        onClick={() => handleSend(starter.prompt)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="flex items-start gap-4 animate-fade-in pl-1">
                  <div className="w-10 h-10 rounded-2xl bg-white text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 shadow-sm animate-pulse">
                    <Bot size={20} />
                  </div>
                  <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-sm border border-slate-100 shadow-sm flex items-center gap-2">
                    <div className="flex gap-1.5 px-2">
                      <div className="w-2 h-2 bg-emerald-300 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_0ms]" />
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_200ms]" />
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_400ms]" />
                    </div>
                    <span className="text-xs font-medium text-slate-400 ml-1">Reflecting...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
              {/* Spacer for Floating Input */}
              <div className="h-24 md:h-28" />
            </>
          )}

        </div>

        {/* Improved Floating Input Area - Positioned Absolute Bottom */}
        {!isTrainingMode && (
          <div className="p-4 bg-gradient-to-t from-white/95 via-white/80 to-transparent z-20 absolute bottom-0 left-0 right-0">
            <div className="relative group max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-emerald-900/5 -z-10 border border-white/60"></div>
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Share what's on your mind..."
                className="
                  w-full pl-6 pr-32 py-4
                  rounded-2xl bg-transparent
                  border-none
                  text-slate-700 placeholder-slate-400
                  focus:ring-2 focus:ring-emerald-500/20
                  outline-none text-[15px] transition-all duration-300
                "
              />

              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <span className={`text-[10px] font-bold transition-colors mr-2 ${input.length >= MAX_CHARS ? 'text-rose-500' : 'text-slate-300'}`}>
                  {input.length > 50 && `${input.length}/${MAX_CHARS}`}
                </span>

                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  variant="primary"
                  size="md"
                  className="!rounded-xl !px-4 !py-2 shadow-lg hover:shadow-emerald-500/20 active:scale-95 transition-all duration-300"
                  icon={<Send size={18} className={!input.trim() ? "opacity-50" : ""} />}
                >
                  <span className="hidden sm:inline">Send</span>
                </Button>
              </div>
            </div>
            <div className="text-center mt-2.5">
              <p className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1.5 opacity-60">
                <ShieldCheck size={10} />
                Conversations are private & secure.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Mobile Wellness Overlay */}
      {showMobileDetails && (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-md lg:hidden flex justify-end">
          <div className="w-full max-w-sm h-full bg-white/90 backdrop-blur-xl shadow-2xl p-6 flex flex-col gap-6 animate-slide-in-right overflow-y-auto border-l border-white/60">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <HeartPulse size={20} className="text-emerald-500" /> Wellness
              </h2>
              <button
                onClick={() => setShowMobileDetails(false)}
                className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <X size={20} />
              </button>
            </div>
            <WellnessPanelContent />
          </div>
        </div>
      )}

      {/* Wellness Dashboard Panel (Desktop) */}
      <div className="hidden lg:flex lg:w-80 flex-col gap-5">
        <WellnessPanelContent />
      </div>
    </div>
  );
};

export default Chat;