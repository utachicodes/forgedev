'use client';

import { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface DashboardCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: ReactNode;
    trend?: {
        value: string;
        positive: boolean;
    };
    className?: string;
}

export function DashboardCard({ title, value, description, icon, trend, className }: DashboardCardProps) {
    return (
        <div className={cn(
            "group relative overflow-hidden rounded-3xl p-6 transition-all duration-500",
            "bg-[#0a0d14]/60 backdrop-blur-xl border border-white/[0.05]",
            "hover:border-white/[0.1] hover:bg-[#0f1218]/80 hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)]",
            className
        )}>
            {/* Inner Glow Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-purple-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-white/[0.03] rounded-2xl border border-white/[0.05] group-hover:border-white/[0.1] group-hover:bg-white/[0.05] transition-all duration-300 text-zinc-400 group-hover:text-white group-hover:scale-110">
                        {icon}
                    </div>
                    {trend && (
                        <span className={cn(
                            "text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md",
                            trend.positive
                                ? "text-emerald-400 bg-emerald-400/[0.05] border-emerald-400/10 shadow-[0_0_10px_-3px_rgba(16,185,129,0.2)]"
                                : "text-red-400 bg-red-400/[0.05] border-red-400/10"
                        )}>
                            {trend.value}
                        </span>
                    )}
                </div>

                <div className="space-y-1">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{title}</p>
                    <h3 className="text-3xl font-black text-white tracking-tight group-hover:text-glow transition-all duration-300">{value}</h3>
                    {description && (
                        <p className="text-xs text-zinc-500 font-medium border-t border-white/[0.05] pt-3 mt-3">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
