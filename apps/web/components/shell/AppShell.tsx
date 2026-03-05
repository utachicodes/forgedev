'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Share2,
    MessageSquare,
    Bot,
    Code2,
    GitMerge,
    Search,
    Cpu,
    Settings,
    Bell,
    Search as SearchIcon,
    User as UserIcon
} from 'lucide-react';
import { Logo } from '../Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming cn exists, I'll check/create it

const modules = [
    { id: 'mindmap', name: 'Mindmap', icon: Share2, href: '/forge/mindmap' },
    { id: 'chat', name: 'Chat', icon: MessageSquare, href: '/forge/chat' },
    { id: 'agents', name: 'Agents', icon: Bot, href: '/forge/agents' },
    { id: 'ide', name: 'IDE', icon: Code2, href: '/forge/ide' },
    { id: 'workflows', name: 'Workflows', icon: GitMerge, href: '/forge/workflows' },
    { id: 'research', name: 'Research', icon: Search, href: '/forge/research' },
    { id: 'training', name: 'Training', icon: Cpu, href: '/forge/training' },
    { id: 'settings', name: 'Settings', icon: Settings, href: '/forge/settings' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [hoveredTab, setHoveredTab] = useState<string | null>(null);

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100">
            {/* Left Dock */}
            <aside className="z-50 flex w-16 flex-col items-center border-r border-zinc-800 bg-zinc-900/50 py-4">
                <Link href="/forge" className="mb-8">
                    <Logo size={32} className="text-emerald-500" animated />
                </Link>

                <nav className="flex flex-1 flex-col gap-4">
                    {modules.map((mod) => {
                        const isActive = pathname.startsWith(mod.href);
                        const Icon = mod.icon;

                        return (
                            <div
                                key={mod.id}
                                className="relative flex items-center justify-center"
                                onMouseEnter={() => setHoveredTab(mod.id)}
                                onMouseLeave={() => setHoveredTab(null)}
                            >
                                <Link
                                    href={mod.href}
                                    className={cn(
                                        "relative z-10 flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                                        isActive
                                            ? "bg-emerald-500/10 text-emerald-400"
                                            : "text-zinc-500 hover:text-zinc-200"
                                    )}
                                >
                                    <Icon size={20} />
                                </Link>

                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute -left-4 h-6 w-1 rounded-r-full bg-emerald-500"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}

                                <AnimatePresence>
                                    {hoveredTab === mod.id && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="absolute left-14 z-50 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-200 shadow-xl border border-zinc-700"
                                        >
                                            {mod.name}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </nav>

                <div className="flex flex-col gap-4 pb-4">
                    <button className="text-zinc-500 hover:text-zinc-200">
                        <UserIcon size={20} />
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="relative flex flex-1 flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-900/30 px-6 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-semibold capitalize tracking-tight">
                            {pathname.split('/').pop()?.replace('-', ' ') || 'Workspace'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search resources..."
                                className="h-9 w-64 rounded-full border border-zinc-800 bg-zinc-900 px-10 py-2 text-sm text-zinc-300 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                            />
                        </div>

                        <button className="relative text-zinc-400 hover:text-zinc-100">
                            <Bell size={20} />
                            <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                            </span>
                        </button>
                    </div>
                </header>

                {/* Dynamic Page Content */}
                <div className="flex-1 overflow-auto bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black">
                    {children}
                </div>
            </main>
        </div>
    );
}
