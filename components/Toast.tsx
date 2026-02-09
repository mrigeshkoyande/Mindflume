import React, { createContext, useContext, useState, ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    message: string;
}

interface ToastContextType {
    showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (type: ToastType, message: string) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, type, message }]);

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 5000);
    };

    const dismissToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const getToastStyles = (type: ToastType) => {
        switch (type) {
            case 'success':
                return 'bg-emerald-50 border-emerald-200 text-emerald-800';
            case 'error':
                return 'bg-rose-50 border-rose-200 text-rose-800';
            case 'warning':
                return 'bg-orange-50 border-orange-200 text-orange-800';
            case 'info':
                return 'bg-blue-50 border-blue-200 text-blue-800';
        }
    };

    const getToastIcon = (type: ToastType) => {
        switch (type) {
            case 'success':
                return <CheckCircle size={18} className="text-emerald-600" />;
            case 'error':
                return <AlertCircle size={18} className="text-rose-600" />;
            case 'warning':
                return <AlertTriangle size={18} className="text-orange-600" />;
            case 'info':
                return <Info size={18} className="text-blue-600" />;
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-[9999] space-y-2 pointer-events-none">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`
              ${getToastStyles(toast.type)}
              pointer-events-auto
              flex items-center gap-3 p-4 pr-3
              rounded-xl border shadow-lg
              backdrop-blur-md
              animate-slide-in-right
              max-w-md
            `}
                    >
                        <div className="shrink-0">
                            {getToastIcon(toast.type)}
                        </div>

                        <p className="text-sm font-semibold flex-1">
                            {toast.message}
                        </p>

                        <button
                            onClick={() => dismissToast(toast.id)}
                            className="shrink-0 p-1 hover:bg-white/50 rounded-lg transition-colors"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};
