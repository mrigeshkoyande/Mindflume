import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    isLoading?: boolean;
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    glow?: boolean;
    children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon,
    rightIcon,
    children,
    className = '',
    disabled,
    glow = false,
    ...props
}, ref) => {

    // Base styles focus on layout, typography and interaction
    const baseStyles = `
        relative overflow-hidden
        inline-flex items-center justify-center gap-2.5
        font-semibold tracking-wide
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-4 focus:ring-opacity-50
        disabled:opacity-60 disabled:cursor-not-allowed
        active:scale-[0.98]
        rounded-xl
        group
    `;

    // Size variants
    const sizeStyles = {
        sm: 'px-3.5 py-1.5 text-xs',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-7 py-3.5 text-base',
        xl: 'px-9 py-4 text-lg',
    };

    // Color/Visual variants
    const variantStyles = {
        primary: `
            bg-gradient-to-br from-emerald-500 to-teal-600
            text-white
            shadow-lg shadow-emerald-500/25
            hover:shadow-xl hover:shadow-emerald-500/40
            hover:from-emerald-400 hover:to-teal-500
            focus:ring-emerald-500/30
            border border-emerald-400/20
        `,
        secondary: `
            bg-white text-slate-700
            border border-slate-200
            shadow-sm hover:shadow-md hover:border-emerald-200 hover:text-emerald-700
            focus:ring-slate-200
        `,
        success: `
            bg-gradient-to-br from-green-500 to-emerald-600
            text-white
            shadow-lg shadow-green-500/25
            hover:shadow-xl hover:shadow-green-500/40
            hover:from-green-400 hover:to-emerald-500
            focus:ring-green-500/30
            border border-green-400/20
        `,
        danger: `
            bg-gradient-to-br from-rose-500 to-red-600
            text-white
            shadow-lg shadow-rose-500/30
            hover:shadow-xl hover:shadow-rose-500/40
            hover:from-rose-500 hover:to-red-600
            focus:ring-rose-500/30
            border border-rose-400/20
        `,
        ghost: `
            bg-white/40 backdrop-blur-md
            text-slate-700
            hover:bg-white/80 hover:text-slate-900
            hover:shadow-md hover:shadow-slate-200/50
            border border-transparent hover:border-white/50
            focus:ring-slate-400/20
        `,
        outline: `
            bg-transparent border-2 border-slate-300
            text-slate-600
            hover:border-slate-800 hover:text-slate-800
            focus:ring-slate-200
        `
    };

    // Glow effect logic
    const glowEffects = glow ? 'animate-pulse shadow-emerald-500/50' : '';

    return (
        <button
            ref={ref}
            className={`
                ${baseStyles} 
                ${sizeStyles[size]} 
                ${variantStyles[variant]} 
                ${glowEffects}
                ${className}
            `}
            disabled={disabled || isLoading}
            {...props}
        >
            {/* Subtle Shine Effect for Gradient Buttons */}
            {['primary', 'success', 'danger'].includes(variant) && (
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            )}

            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-inherit bg-opacity-90 rounded-xl z-20">
                    <Loader2 className="animate-spin h-5 w-5" />
                </div>
            )}

            {/* Content Container - Preserves width during loading */}
            <div className={`flex items-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
                {icon && <span className="shrink-0">{icon}</span>}
                <span className="relative z-10">{children}</span>
                {rightIcon && <span className="shrink-0">{rightIcon}</span>}
            </div>
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
