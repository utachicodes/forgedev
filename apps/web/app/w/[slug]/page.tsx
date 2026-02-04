export default function WorkspaceOverview({ params }: { params: { slug: string } }) {
    return (
        <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold">Workspace Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Projects" value="12" />
                <StatCard title="Active Members" value="4" />
                <StatCard title="CPU Usage (Avg)" value="24%" />
                <StatCard title="Storage Used" value="45 GB" />
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                    <ul className="space-y-4">
                        <ActivityItem user="Alice" action="deployed" target="frontend-main" time="2m ago" />
                        <ActivityItem user="Bob" action="failed build" target="api-service" time="15m ago" />
                        <ActivityItem user="Charlie" action="created project" target="analytics-dashboard" time="1h ago" />
                    </ul>
                </div>
            </div>
        </div>
    )
}

function StatCard({ title, value }: any) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
            <div className="text-zinc-500 text-sm font-medium">{title}</div>
            <div className="text-3xl font-bold mt-2">{value}</div>
        </div>
    )
}

function ActivityItem({ user, action, target, time }: any) {
    return (
        <li className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-white">{user}</span>
            <span className="text-zinc-400">{action}</span>
            <span className="text-blue-400 font-mono">{target}</span>
            <span className="text-zinc-600 ml-auto">{time}</span>
        </li>
    )
}
