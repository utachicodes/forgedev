'use client';

import { Activity, Clock } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { DashboardCard } from '../../components/DashboardCard';
import { Code2, Database } from 'lucide-react';

export default function WebSuiteOverview() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <PageHeader
                title="Web Development Suite"
                description="AI-powered tools to accelerate your frontend and backend development."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                    title="Components Generated"
                    value="12"
                    trend={{ value: "+2 today", positive: true }}
                    description="React & Tailwind Ready"
                    icon={<Code2 className="text-blue-400" size={20} />}
                />
                <DashboardCard
                    title="API Endpoints"
                    value="48"
                    trend={{ value: "5 active", positive: true }}
                    description="REST & GraphQL"
                    icon={<Activity className="text-orange-400" size={20} />}
                />
                <DashboardCard
                    title="Database Models"
                    value="8"
                    trend={{ value: "In sync", positive: true }}
                    description="PostgreSQL Schema"
                    icon={<Database className="text-emerald-400" size={20} />}
                />
            </div>

            <div className="space-y-4 pt-4">
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <div className="w-1 h-6 rounded-full bg-blue-500" />
                    Recent Generations
                </h2>
                <div className="bg-[#0d1117] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                    <div className="divide-y divide-white/5">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-black font-mono group-hover:scale-110 transition-transform">
                                        TS
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-zinc-200 group-hover:text-blue-400 transition-colors">Hero Section V{i}</div>
                                        <div className="text-xs text-zinc-500 font-medium">React • Tailwind • Framer Motion</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium bg-white/5 px-2 py-1 rounded-lg">
                                    <Clock size={12} />
                                    2m ago
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
