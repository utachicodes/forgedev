import { Server, Cpu, HardDrive, Activity } from 'lucide-react';
import { ReactNode } from 'react';

export default function InfrastructurePage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-zinc-100">Infrastructure</h1>
                <p className="text-zinc-400">Manage your cloud resources and clusters.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ResourceCard
                    title="K8s Cluster"
                    value="Healthy"
                    icon={<Server className="text-blue-500" size={24} />}
                />
                <ResourceCard
                    title="CPU Usage"
                    value="45%"
                    icon={<Cpu className="text-orange-500" size={24} />}
                />
                <ResourceCard
                    title="Memory"
                    value="12GB / 32GB"
                    icon={<Activity className="text-green-500" size={24} />}
                />
                <ResourceCard
                    title="Storage"
                    value="1.2TB"
                    icon={<HardDrive className="text-purple-500" size={24} />}
                />
            </div>

            <div className="space-y-4 pt-4">
                <h2 className="text-xl font-semibold text-zinc-200">Active Provisions (Terraform)</h2>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden backdrop-blur-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-950/50 border-b border-zinc-800 text-zinc-400">
                            <tr>
                                <th className="p-4 font-medium">Resource ID</th>
                                <th className="p-4 font-medium">Type</th>
                                <th className="p-4 font-medium">Region</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Cost/Mo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            <ProvisionRow
                                id="aws-ec2-i8392"
                                type="EC2 Instance (t3.xlarge)"
                                region="us-east-1"
                                status="active"
                                cost="$120"
                            />
                            <ProvisionRow
                                id="aws-rds-99283"
                                type="RDS Postgres"
                                region="us-east-1"
                                status="active"
                                cost="$85"
                            />
                            <ProvisionRow
                                id="aws-s3-bucket-logs"
                                type="S3 Bucket"
                                region="us-east-1"
                                status="active"
                                cost="$12"
                            />
                            <ProvisionRow
                                id="k8s-node-pool-2"
                                type="EKS Node Group"
                                region="us-east-1"
                                status="provisioning"
                                cost="$240"
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

interface ResourceCardProps {
    title: string;
    value: string;
    icon: ReactNode;
}

function ResourceCard({ title, value, icon }: ResourceCardProps) {
    return (
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg flex items-center justify-between backdrop-blur-sm hover:border-zinc-700 transition-colors">
            <div>
                <div className="text-zinc-500 text-sm font-medium">{title}</div>
                <div className="text-2xl font-bold mt-1 text-zinc-100">{value}</div>
            </div>
            <div className="p-3 bg-zinc-800/50 rounded-lg ring-1 ring-white/5">{icon}</div>
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
    const statusColor = {
        active: 'text-emerald-400',
        provisioning: 'text-amber-400',
        failed: 'text-red-400',
        stopped: 'text-zinc-500'
    }[status] || 'text-zinc-400';

    return (
        <tr className="hover:bg-zinc-800/30 transition-colors">
            <td className="p-4 font-mono text-zinc-300">{id}</td>
            <td className="p-4 text-zinc-300">{type}</td>
            <td className="p-4 text-zinc-400">{region}</td>
            <td className={`p-4 ${statusColor} capitalize font-medium`}>
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${statusColor.replace('text-', 'bg-')}`} />
                    {status}
                </div>
            </td>
            <td className="p-4 text-zinc-300">{cost}</td>
        </tr>
    )
}
