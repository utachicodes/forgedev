'use client';

import { Server, Cpu, HardDrive, Activity, Plus } from 'lucide-react';
import { PageHeader } from '../../../components/PageHeader';
import { DashboardCard } from '../../../components/DashboardCard';

export default function InfrastructurePage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <PageHeader
                title="Infrastructure Monitoring"
                description="Real-time observability and resource management for your clusters."
                actions={
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-sm transition-all hover:glow-blue flex items-center gap-2">
                        <Plus size={16} /> Provision Resource
                    </button>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard
                    title="K8s Cluster"
                    value="Healthy"
                    description="Soaring Hawk v1.29"
                    icon={<Server className="text-blue-400" size={20} />}
                    trend={{ value: "100% Uptime", positive: true }}
                />
                <DashboardCard
                    title="CPU Usage"
                    value="45%"
                    description="12 Cores Active"
                    icon={<Cpu className="text-orange-400" size={20} />}
                    trend={{ value: "+2.4%", positive: false }}
                />
                <DashboardCard
                    title="Memory"
                    value="12.4 GB"
                    description="32 GB Total Available"
                    icon={<Activity className="text-emerald-400" size={20} />}
                    trend={{ value: "Stable", positive: true }}
                />
                <DashboardCard
                    title="Storage"
                    value="1.2 TB"
                    description="NvME SSD Tier"
                    icon={<HardDrive className="text-purple-400" size={20} />}
                />
            </div>

            <div className="space-y-4 pt-4">
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <div className="w-1 h-6 rounded-full bg-blue-500" />
                    Active Provisions
                </h2>
                <div className="bg-[#0d1117] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 border-b border-white/5 text-zinc-400">
                            <tr>
                                <th className="p-5 font-bold uppercase tracking-wider text-xs">Resource ID</th>
                                <th className="p-5 font-bold uppercase tracking-wider text-xs">Type</th>
                                <th className="p-5 font-bold uppercase tracking-wider text-xs">Region</th>
                                <th className="p-5 font-bold uppercase tracking-wider text-xs">Status</th>
                                <th className="p-5 font-bold uppercase tracking-wider text-xs">Cost/Mo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <ProvisionRow
                                id="aws-ec2-i8392"
                                type="EC2 Instance (t3.xlarge)"
                                region="us-east-1"
                                status="active"
                                cost="$120.00"
                            />
                            <ProvisionRow
                                id="aws-rds-99283"
                                type="RDS Postgres v15"
                                region="us-east-1"
                                status="active"
                                cost="$85.50"
                            />
                            <ProvisionRow
                                id="aws-s3-bucket-logs"
                                type="S3 Standard"
                                region="us-east-1"
                                status="active"
                                cost="$12.20"
                            />
                            <ProvisionRow
                                id="k8s-node-pool-2"
                                type="EKS Node Group"
                                region="us-east-1"
                                status="provisioning"
                                cost="$240.00"
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

interface ProvisionRowProps {
    id: string;
    type: string;
    region: string;
    status: 'active' | 'provisioning' | 'failed' | 'stopped';
    cost: string;
}

function ProvisionRow({ id, type, region, status, cost }: ProvisionRowProps) {
    const statusConfig = {
        active: { color: 'text-emerald-400', bg: 'bg-emerald-400' },
        provisioning: { color: 'text-amber-400', bg: 'bg-amber-400 animate-pulse' },
        failed: { color: 'text-red-400', bg: 'bg-red-400' },
        stopped: { color: 'text-zinc-500', bg: 'bg-zinc-500' }
    }[status] || { color: 'text-zinc-400', bg: 'bg-zinc-400' };

    return (
        <tr className="hover:bg-white/[0.02] transition-colors group">
            <td className="p-5 font-mono text-zinc-300 group-hover:text-white transition-colors">{id}</td>
            <td className="p-5 text-zinc-300 font-medium">{type}</td>
            <td className="p-5 text-zinc-400">{region}</td>
            <td className="p-5">
                <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/5 bg-white/5 ${statusConfig.color} text-xs font-bold uppercase tracking-wide`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${statusConfig.bg}`} />
                    {status}
                </div>
            </td>
            <td className="p-5 text-zinc-300 font-mono">{cost}</td>
        </tr>
    )
}
