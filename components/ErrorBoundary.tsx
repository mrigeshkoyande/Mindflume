import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    private handleRetry = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                    <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                        <AlertTriangle size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Something went wrong</h2>
                    <p className="text-slate-500 mb-6 max-w-md">
                        We encountered an unexpected error. Don't worry, your data is safe.
                    </p>

                    {this.state.error && (
                        <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100 w-full max-w-md overflow-hidden text-left">
                            <p className="text-xs font-mono text-slate-500 break-words">
                                {this.state.error.toString()}
                            </p>
                        </div>
                    )}

                    <Button
                        onClick={this.handleRetry}
                        variant="primary"
                        icon={<RefreshCw size={16} />}
                    >
                        Refresh Page
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
