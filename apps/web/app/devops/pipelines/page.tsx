'use client';

import { GitBranch, Play, Clock, CheckCircle, XCircle, Plus } from 'lucide-react';
import { PageHeader } from '../../../components/PageHeader';

export default function PipelinesPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <PageHeader
                title="CI/CD Pipelines"
                description="Manage your automated build and deployment workflows."
                actions={
                    <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-bold text-sm transition-all hover:glow-orange flex items-center gap-2">
                        <Plus size={16} /> New Pipeline
                    </button>
                }
            />

            <div className="space-y-4">
                <PipelineCard
                    name="production-build"
                    branch="main"
                    status="success"
                    duration="4m 12s"
                    lastRun="2 minutes ago"
                />
                <PipelineCard
                    name="staging-deploy"
                    branch="develop"
                    status="running"
                    duration="1m 05s"
                    lastRun="Running now..."
                />
                <PipelineCard
                    name="feature-auth-v2"
                    branch="feat/auth-v2"
                    status="failed"
                    duration="2m 45s"
                    lastRun="1 hour ago"
                />
                <PipelineCard
                    name="e2e-tests-nightly"
                    branch="main"
                    status="success"
                    duration="12m 30s"
                    lastRun="5 hours ago"
                />
            </div>
        </div>
    )
}

function PipelineCard({ name, branch, status, duration, lastRun }: {
    name: string, branch: string, status: 'success' | 'running' | 'failed', duration: string, lastRun: string
}) {
    const statusConfig = {
        success: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
        running: { icon: Play, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
        failed: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' }
    }[status];

    const Icon = statusConfig.icon;

    return (
        <div className="bg-[#0d1117] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all group relative overflow-hidden">
            {status === 'running' && (
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 animate-pulse" />
            )}

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${statusConfig.bg}`}>
                        <Icon size={20} className={statusConfig.color} />
                    </div>
                    <div>
                        <h3 className="font-bold text-zinc-100 flex items-center gap-3">
                            {name}
                            <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                                <GitBranch size={10} /> {branch}
                            </span>
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-xs text-zinc-500">
                            <span className="flex items-center gap-1"><Clock size={12} /> {lastRun}</span>
                            <span>Duration: {duration}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-300 transition-colors">
                        View Logs
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-300 transition-colors">
                        Rerun
                    </button>
                </div>
            </div>
        </div>
    )
}
