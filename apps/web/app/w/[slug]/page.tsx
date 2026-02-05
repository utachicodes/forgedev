'use client';

import { Activity, HardDrive, Cpu, Folder, GitCommit, AlertCircle, Plus } from 'lucide-react';
import { PageHeader } from '../../../components/PageHeader';
import { DashboardCard } from '../../../components/DashboardCard';

export default function WorkspaceOverview({ params }: { params: { slug: string } }) {
    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <PageHeader
                title="Workspace Overview"
                description={`Manage projects and members for ${params.slug}`}
                actions={
                    <button className="px-4 py-2 bg-white text-black hover:bg-zinc-200 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-white/10">
                        <Plus size={16} strokeWidth={3} /> New Project
                    </button>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard
                    title="Total Projects"
                    value="12"
                    trend={{ value: "+2 this week", positive: true }}
                    icon={<Folder className="text-blue-400" size={20} />}
                />
                <DashboardCard
                    title="Active Members"
                    value="4"
                    description="Team Velocity: High"
                    icon={<Activity className="text-orange-400" size={20} />}
                />
                <DashboardCard
                    title="CPU Usage (Avg)"
                    value="24%"
                    description="Underutilized"
                    icon={<Cpu className="text-emerald-400" size={20} />}
                    trend={{ value: "-5% vs last week", positive: true }}
                />
                <DashboardCard
                    title="Storage Used"
                    value="45 GB"
                    description="150 GB Quota"
                    icon={<HardDrive className="text-purple-400" size={20} />}
                />
            </div>

            <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <Activity className="text-zinc-500" size={20} />
                        Recent Activity
                    </h2>
                    <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider">View All</button>
                </div>

                <div className="bg-[#0d1117] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                    <div className="divide-y divide-white/5">
                        <ActivityItem
                            user="Alice"
                            action="deployed"
                            target="frontend-main"
                            time="2m ago"
                            icon={<GitCommit className="text-blue-400" size={16} />}
                        />
                        <ActivityItem
                            user="Bob"
                            action="failed build"
                            target="api-service"
                            time="15m ago"
                            icon={<AlertCircle className="text-red-400" size={16} />}
                            isError
                        />
                        <ActivityItem
                            user="Charlie"
                            action="created project"
                            target="analytics-dashboard"
                            time="1h ago"
                            icon={<Folder className="text-emerald-400" size={16} />}
                        />
                        <ActivityItem
                            user="System"
                            action="auto-scaled"
                            target="k8s-cluster-1"
                            time="3h ago"
                            icon={<Cpu className="text-purple-400" size={16} />}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function ActivityItem({ user, action, target, time, icon, isError }: any) {
    return (
        <div className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors group">
            <div className={`p-2 rounded-lg ${isError ? 'bg-red-500/10 border border-red-500/20' : 'bg-white/5 border border-white/5'}`}>
                {icon}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm flex-1">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{user}</span>
                    <span className={isError ? "text-red-400" : "text-zinc-400"}>{action}</span>
                </div>
                <span className="font-mono text-zinc-500 text-xs px-1.5 py-0.5 rounded bg-white/5 border border-white/5 group-hover:border-blue-500/30 transition-colors">{target}</span>
            </div>
            <span className="text-xs font-bold text-zinc-600 whitespace-nowrap">{time}</span>
        </div>
    )
}
