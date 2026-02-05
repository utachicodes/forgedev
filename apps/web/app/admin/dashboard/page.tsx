'use client';

import { Users, Activity, HardDrive, Clock } from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        { label: 'Total Users', value: '124', change: '+12%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'System Load', value: '34%', change: 'Normal', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'Storage Used', value: '2.4 TB', change: '85%', icon: HardDrive, color: 'text-orange-500', bg: 'bg-orange-500/10' },
        { label: 'Uptime', value: '99.99%', change: '30d', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
                <p className="text-zinc-400">Welcome back, Administrator. System is running smoothly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-[#161b22] border border-zinc-800 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.bg}`}>
                                <stat.icon className={stat.color} size={24} />
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.includes('+') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
                                }`}>
                                {stat.change}
                            </span>
                        </div>
                        <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-zinc-500">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#161b22] border border-zinc-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6">Recent Access Requests</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-[#0d1117] rounded-lg border border-zinc-800">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-500">
                                        JD
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">John Doe</div>
                                        <div className="text-xs text-zinc-500">acme_corp • 2 mins ago</div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1.5 text-xs font-bold bg-zinc-800 hover:bg-zinc-700 rounded transition-colors">Review</button>
                                    <button className="px-3 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors">Approve</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#161b22] border border-zinc-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6">System Health</h2>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2 font-medium">
                                <span className="text-zinc-400">CPU Usage</span>
                                <span className="text-emerald-400">24%</span>
                            </div>
                            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[24%]" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2 font-medium">
                                <span className="text-zinc-400">Memory</span>
                                <span className="text-blue-400">62%</span>
                            </div>
                            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[62%]" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2 font-medium">
                                <span className="text-zinc-400">Database Connections</span>
                                <span className="text-orange-400">18/50</span>
                            </div>
                            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500 w-[36%]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
