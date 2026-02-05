'use client';

import { useState, useEffect } from 'react';
import { Activity, Database, Zap, HardDrive, Globe } from 'lucide-react';
import { SUBSCRIPTION_LIMITS } from '@/lib/subscription-limits';

interface UsageData {
    aiTraining: {
        hoursUsed: number;
        jobsRunToday: number;
        concurrentJobs: number;
    };
    projects: {
        activeCount: number;
        totalRepositories: number;
    };
    storage: {
        usedGB: number;
        bandwidthGB: number;
    };
    deployment: {
        deploymentsToday: number;
        buildMinutesUsed: number;
        activeDeployments: number;
    };
}

export default function UsageDashboard() {
    const [usage, setUsage] = useState<UsageData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsage();
    }, []);

    const fetchUsage = async () => {
        // TODO: Fetch from actual API endpoints
        // For now, use mock data
        setUsage({
            aiTraining: {
                hoursUsed: 35,
                jobsRunToday: 5,
                concurrentJobs: 2,
            },
            projects: {
                activeCount: 7,
                totalRepositories: 12,
            },
            storage: {
                usedGB: 45,
                bandwidthGB: 120,
            },
            deployment: {
                deploymentsToday: 8,
                buildMinutesUsed: 280,
                activeDeployments: 3,
            },
        });
        setLoading(false);
    };

    if (loading || !usage) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const getPercentage = (current: number, max: number) => {
        return Math.min(Math.round((current / max) * 100), 100);
    };

    const getStatusColor = (percentage: number) => {
        if (percentage >= 90) return 'text-red-400';
        if (percentage >= 75) return 'text-yellow-400';
        return 'text-green-400';
    };

    const getBarColor = (percentage: number) => {
        if (percentage >= 90) return 'bg-red-500';
        if (percentage >= 75) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className="min-h-screen bg-[#030508] text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent mb-2">
                        Subscription Usage
                    </h1>
                    <p className="text-zinc-400">
                        Monitor your monthly limits and usage across all services
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* AI Training Usage */}
                    <div className="glass-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Zap className="w-6 h-6 text-purple-400" />
                            <h2 className="text-xl font-bold">AI Training</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-zinc-400">Monthly Hours</span>
                                    <span className={getStatusColor(getPercentage(usage.aiTraining.hoursUsed, SUBSCRIPTION_LIMITS.AI_TRAINING.MAX_HOURS_PER_MONTH))}>
                                        {usage.aiTraining.hoursUsed} / {SUBSCRIPTION_LIMITS.AI_TRAINING.MAX_HOURS_PER_MONTH} hours
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${getBarColor(getPercentage(usage.aiTraining.hoursUsed, SUBSCRIPTION_LIMITS.AI_TRAINING.MAX_HOURS_PER_MONTH))} transition-all`}
                                        style={{ width: `${getPercentage(usage.aiTraining.hoursUsed, SUBSCRIPTION_LIMITS.AI_TRAINING.MAX_HOURS_PER_MONTH)}%` }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-zinc-400">Concurrent Jobs</span>
                                    <span className={getStatusColor(getPercentage(usage.aiTraining.concurrentJobs, SUBSCRIPTION_LIMITS.AI_TRAINING.MAX_CONCURRENT_JOBS))}>
                                        {usage.aiTraining.concurrentJobs} / {SUBSCRIPTION_LIMITS.AI_TRAINING.MAX_CONCURRENT_JOBS}
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${getBarColor(getPercentage(usage.aiTraining.concurrentJobs, SUBSCRIPTION_LIMITS.AI_TRAINING.MAX_CONCURRENT_JOBS))} transition-all`}
                                        style={{ width: `${getPercentage(usage.aiTraining.concurrentJobs, SUBSCRIPTION_LIMITS.AI_TRAINING.MAX_CONCURRENT_JOBS)}%` }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-zinc-400">Jobs Today</span>
                                    <span className={getStatusColor(getPercentage(usage.aiTraining.jobsRunToday, SUBSCRIPTION_LIMITS.AI_TRAINING.MAX_TRAINING_JOBS_PER_DAY))}>
                                        {usage.aiTraining.jobsRunToday} / {SUBSCRIPTION_LIMITS.AI_TRAINING.MAX_TRAINING_JOBS_PER_DAY}
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${getBarColor(getPercentage(usage.aiTraining.jobsRunToday, SUBSCRIPTION_LIMITS.AI_TRAINING.MAX_TRAINING_JOBS_PER_DAY))} transition-all`}
                                        style={{ width: `${getPercentage(usage.aiTraining.jobsRunToday, SUBSCRIPTION_LIMITS.AI_TRAINING.MAX_TRAINING_JOBS_PER_DAY)}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Projects Usage */}
                    <div className="glass-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="w-6 h-6 text-blue-400" />
                            <h2 className="text-xl font-bold">Projects</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-zinc-400">Active Projects</span>
                                    <span className={getStatusColor(getPercentage(usage.projects.activeCount, SUBSCRIPTION_LIMITS.PROJECTS.MAX_ACTIVE_PROJECTS))}>
                                        {usage.projects.activeCount} / {SUBSCRIPTION_LIMITS.PROJECTS.MAX_ACTIVE_PROJECTS}
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${getBarColor(getPercentage(usage.projects.activeCount, SUBSCRIPTION_LIMITS.PROJECTS.MAX_ACTIVE_PROJECTS))} transition-all`}
                                        style={{ width: `${getPercentage(usage.projects.activeCount, SUBSCRIPTION_LIMITS.PROJECTS.MAX_ACTIVE_PROJECTS)}%` }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-zinc-400">Repositories</span>
                                    <span className={getStatusColor(getPercentage(usage.projects.totalRepositories, SUBSCRIPTION_LIMITS.PROJECTS.MAX_REPOSITORIES))}>
                                        {usage.projects.totalRepositories} / {SUBSCRIPTION_LIMITS.PROJECTS.MAX_REPOSITORIES}
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${getBarColor(getPercentage(usage.projects.totalRepositories, SUBSCRIPTION_LIMITS.PROJECTS.MAX_REPOSITORIES))} transition-all`}
                                        style={{ width: `${getPercentage(usage.projects.totalRepositories, SUBSCRIPTION_LIMITS.PROJECTS.MAX_REPOSITORIES)}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Storage Usage */}
                    <div className="glass-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <HardDrive className="w-6 h-6 text-emerald-400" />
                            <h2 className="text-xl font-bold">Storage & Bandwidth</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-zinc-400">Storage Used</span>
                                    <span className={getStatusColor(getPercentage(usage.storage.usedGB, SUBSCRIPTION_LIMITS.STORAGE.TOTAL_STORAGE_GB))}>
                                        {usage.storage.usedGB}GB / {SUBSCRIPTION_LIMITS.STORAGE.TOTAL_STORAGE_GB}GB
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${getBarColor(getPercentage(usage.storage.usedGB, SUBSCRIPTION_LIMITS.STORAGE.TOTAL_STORAGE_GB))} transition-all`}
                                        style={{ width: `${getPercentage(usage.storage.usedGB, SUBSCRIPTION_LIMITS.STORAGE.TOTAL_STORAGE_GB)}%` }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-zinc-400">Bandwidth (Monthly)</span>
                                    <span className={getStatusColor(getPercentage(usage.storage.bandwidthGB, SUBSCRIPTION_LIMITS.STORAGE.BANDWIDTH_GB_PER_MONTH))}>
                                        {usage.storage.bandwidthGB}GB / {SUBSCRIPTION_LIMITS.STORAGE.BANDWIDTH_GB_PER_MONTH}GB
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${getBarColor(getPercentage(usage.storage.bandwidthGB, SUBSCRIPTION_LIMITS.STORAGE.BANDWIDTH_GB_PER_MONTH))} transition-all`}
                                        style={{ width: `${getPercentage(usage.storage.bandwidthGB, SUBSCRIPTION_LIMITS.STORAGE.BANDWIDTH_GB_PER_MONTH)}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Deployment Usage */}
                    <div className="glass-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Globe className="w-6 h-6 text-cyan-400" />
                            <h2 className="text-xl font-bold">Deployments</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-zinc-400">Deployments Today</span>
                                    <span className={getStatusColor(getPercentage(usage.deployment.deploymentsToday, SUBSCRIPTION_LIMITS.DEPLOYMENT.MAX_DEPLOYMENTS_PER_DAY))}>
                                        {usage.deployment.deploymentsToday} / {SUBSCRIPTION_LIMITS.DEPLOYMENT.MAX_DEPLOYMENTS_PER_DAY}
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${getBarColor(getPercentage(usage.deployment.deploymentsToday, SUBSCRIPTION_LIMITS.DEPLOYMENT.MAX_DEPLOYMENTS_PER_DAY))} transition-all`}
                                        style={{ width: `${getPercentage(usage.deployment.deploymentsToday, SUBSCRIPTION_LIMITS.DEPLOYMENT.MAX_DEPLOYMENTS_PER_DAY)}%` }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-zinc-400">Build Minutes (Monthly)</span>
                                    <span className={getStatusColor(getPercentage(usage.deployment.buildMinutesUsed, SUBSCRIPTION_LIMITS.DEPLOYMENT.MAX_BUILD_MINUTES_PER_MONTH))}>
                                        {usage.deployment.buildMinutesUsed} / {SUBSCRIPTION_LIMITS.DEPLOYMENT.MAX_BUILD_MINUTES_PER_MONTH} min
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${getBarColor(getPercentage(usage.deployment.buildMinutesUsed, SUBSCRIPTION_LIMITS.DEPLOYMENT.MAX_BUILD_MINUTES_PER_MONTH))} transition-all`}
                                        style={{ width: `${getPercentage(usage.deployment.buildMinutesUsed, SUBSCRIPTION_LIMITS.DEPLOYMENT.MAX_BUILD_MINUTES_PER_MONTH)}%` }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-zinc-400">Active Deployments</span>
                                    <span className={getStatusColor(getPercentage(usage.deployment.activeDeployments, SUBSCRIPTION_LIMITS.DEPLOYMENT.MAX_CONCURRENT_DEPLOYMENTS))}>
                                        {usage.deployment.activeDeployments} / {SUBSCRIPTION_LIMITS.DEPLOYMENT.MAX_CONCURRENT_DEPLOYMENTS}
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${getBarColor(getPercentage(usage.deployment.activeDeployments, SUBSCRIPTION_LIMITS.DEPLOYMENT.MAX_CONCURRENT_DEPLOYMENTS))} transition-all`}
                                        style={{ width: `${getPercentage(usage.deployment.activeDeployments, SUBSCRIPTION_LIMITS.DEPLOYMENT.MAX_CONCURRENT_DEPLOYMENTS)}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subscription Info */}
                <div className="glass-card p-6 mt-6">
                    <h2 className="text-xl font-bold mb-4">Subscription Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <div className="text-sm text-zinc-400 mb-1">Plan</div>
                            <div className="font-medium text-lg">Monthly Subscription</div>
                        </div>
                        <div>
                            <div className="text-sm text-zinc-400 mb-1">Price</div>
                            <div className="font-medium text-lg">10,000 FCFA/month</div>
                        </div>
                        <div>
                            <div className="text-sm text-zinc-400 mb-1">Billing Period</div>
                            <div className="font-medium text-lg">
                                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
