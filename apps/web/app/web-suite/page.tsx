import { Card, CardHeader, CardTitle, CardContent } from 'lucide-react'; // Mock import based on logic, actually using tailored HTML

export default function WebSuiteOverview() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Web Development Suite</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                    title="Components Generated"
                    value="12"
                    trend="+2 today"
                />
                <DashboardCard
                    title="API Endpoints"
                    value="48"
                    trend="5 active"
                />
                <DashboardCard
                    title="Database Models"
                    value="8"
                    trend="In sync"
                />
            </div>
            {/* Recent Activity Mockup */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Generations</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-blue-900/30 flex items-center justify-center text-blue-400 text-xs font-mono">TS</div>
                                <div>
                                    <div className="text-sm font-medium">Hero Section V{i}</div>
                                    <div className="text-xs text-zinc-500">React • Tailwind</div>
                                </div>
                            </div>
                            <div className="text-xs text-zinc-500">2m ago</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function DashboardCard({ title, value, trend }: any) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-sm text-zinc-500 font-medium">{title}</h3>
            <div className="mt-2 flex items-end justify-between">
                <div className="text-3xl font-bold">{value}</div>
                <div className="text-xs text-green-400 bg-green-900/20 px-2 py-1 rounded">{trend}</div>
            </div>
        </div>
    )
}
