'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Box } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SidebarProps {
    brandName: string;
    brandColor: 'blue' | 'orange' | 'emerald' | 'purple';
    items: {
        href: string;
        icon: any;
        label: string;
    }[];
}

export function Sidebar({ brandName, brandColor, items }: SidebarProps) {
    const pathname = usePathname();

    const colorClasses = {
        emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
        blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
        purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    };

    const activeGlows = {
        emerald: 'shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]',
        orange: 'shadow-[0_0_20px_-5px_rgba(249,115,22,0.3)]',
        blue: 'shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]',
        purple: 'shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)]',
    };

    return (
        <aside className="w-72 bg-[#020408]/80 backdrop-blur-xl border-r border-white/[0.05] flex flex-col h-screen sticky top-0 z-50">
            <div className="p-8 pb-4 flex items-center gap-3">
                <div className={cn("p-2 rounded-xl transition-all duration-500 bg-gradient-to-br from-white/10 to-transparent border border-white/10 group-hover:border-white/20")}>
                    <Box size={20} className="text-white" />
                </div>
                <div className="font-black tracking-tighter text-xl text-white">
                    FORGE<span className={cn(colorClasses[brandColor].split(' ')[0], "ml-0.5")}>{brandName}</span>
                </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {items.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden",
                                isActive
                                    ? cn("bg-white/[0.03] text-white border border-white/[0.05]", activeGlows[brandColor])
                                    : "text-zinc-500 hover:text-white hover:bg-white/[0.02]"
                            )}
                        >
                            <Icon
                                size={18}
                                className={cn(
                                    "transition-colors duration-300",
                                    isActive ? colorClasses[brandColor].split(' ')[0] : "group-hover:text-white"
                                )}
                            />
                            <span className="relative z-10">{item.label}</span>

                            {/* Hover shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 m-4 rounded-2xl bg-[#0a0d14] border border-white/[0.05]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 ring-2 ring-black" />
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-zinc-200 truncate">Developer Mode</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <p className="text-[10px] text-zinc-500 truncate">Online</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
