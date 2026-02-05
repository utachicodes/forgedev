'use client';

import { useState } from 'react';
import { Folder, Plus, Users, Globe, Box, ArrowRight, Command } from 'lucide-react';
import Link from 'next/link';

export default function WorkspacesPage() {
    // Mock data
    const [workspaces, setWorkspaces] = useState([
        { id: '1', name: 'Acme Corp', slug: 'acme-corp', members: 4, projects: 12, plan: 'Enterprise' },
        { id: '2', name: 'Personal Projects', slug: 'personal', members: 1, projects: 3, plan: 'Free' },
    ]);

    return (
        <div className="min-h-screen bg-[#020408] text-white selection:bg-blue-500/30 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="w-full max-w-5xl px-6 relative z-10 animate-fade-in-up">
                <header className="flex items-center justify-between mb-20">
                    <div className="flex items-center gap-4 group cursor-default">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)] group-hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.7)] transition-all duration-500">
                            <Box className="text-white" size={24} strokeWidth={2.5} />
                        </div>
                        <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">ForgeDev</h1>
                    </div>
                </header>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div className="space-y-4 max-w-2xl">
                        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            System Operational
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-[0.9]">
                            Select <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Workspace</span>
                        </h2>
                        <p className="text-zinc-400 text-lg font-medium leading-relaxed">
                            Access your organizations, manage infrastructure, and deploy globally from a single command center.
                        </p>
                    </div>

                    <button className="group px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-full font-bold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.5)]">
                        <Plus size={20} strokeWidth={3} className="text-blue-600 transition-transform group-hover:rotate-90" />
                        <span>Create New</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {workspaces.map(ws => (
                        <Link href={`/w/${ws.slug}`} key={ws.id} className="block group">
                            <div className="h-full bg-[#0a0d14]/40 backdrop-blur-xl border border-white/[0.05] rounded-3xl p-8 hover:border-blue-500/30 hover:bg-[#0f1218]/60 transition-all duration-500 relative overflow-hidden group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.15)]">
                                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0 translate-x-4">
                                    <ArrowRight className="text-blue-400" />
                                </div>

                                <div className="flex items-start justify-between mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.05] flex items-center justify-center text-zinc-400 group-hover:text-blue-400 group-hover:scale-110 group-hover:border-blue-500/20 transition-all duration-500">
                                        <Globe size={28} strokeWidth={1.5} />
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-full text-xs font-bold border tracking-wide uppercase ${ws.plan === 'Enterprise' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_15px_-5px_rgba(168,85,247,0.3)]' : 'bg-zinc-800/50 text-zinc-400 border-white/5'}`}>
                                        {ws.plan}
                                    </div>
                                </div>

                                <div className="space-y-2 mb-8">
                                    <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 group-hover:to-white transition-all duration-500">{ws.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-zinc-500 font-mono">
                                        <Command size={14} />
                                        <span>/{ws.slug}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 text-sm text-zinc-500 pt-6 border-t border-white/[0.05]">
                                    <span className="flex items-center gap-2 group-hover:text-blue-200/60 transition-colors"><Users size={16} /> {ws.members} Members</span>
                                    <span className="flex items-center gap-2 group-hover:text-blue-200/60 transition-colors"><Folder size={16} /> {ws.projects} Projects</span>
                                </div>
                            </div>
                        </Link>
                    ))}

                    <button className="border border-dashed border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-zinc-600 hover:text-zinc-300 hover:border-white/20 hover:bg-white/[0.02] transition-all duration-300 group min-h-[280px]">
                        <div className="w-16 h-16 rounded-full bg-white/[0.02] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/[0.05] transition-all duration-300">
                            <Plus size={32} strokeWidth={1} />
                        </div>
                        <span className="font-bold text-lg">Add Organization</span>
                        <span className="text-sm text-zinc-600 mt-2">Create a new team workspace</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
