export default function PipelinesPage() {
    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">CI/CD Pipelines</h1>
                    <p className="text-zinc-400">Manage and monitor your automated workflows.</p>
                </div>
                <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg">
                    New Pipeline
                </button>
            </header>

            <div className="grid grid-cols-1 gap-4">
                <PipelineCard
                    name="Frontend Deployment"
                    status="success"
                    duration="2m 34s"
                    branch="main"
                />
                <PipelineCard
                    name="API Integration Tests"
                    status="running"
                    duration="1m 12s"
                    branch="develop"
                />
                <PipelineCard
                    name="Model Training (Nightly)"
                    status="failed"
                    duration="45m 10s"
                    branch="feature/resnet-v2"
                />
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mt-8">
                <h2 className="text-lg font-semibold mb-4">Pipeline Visualizer (Preview)</h2>
                <div className="flex items-center gap-4 overflow-x-auto pb-4">
                    <Stage name="Checkout" status="completed" />
                    <div className="h-[2px] w-8 bg-zinc-700"></div>
                    <Stage name="Install Deps" status="completed" />
                    <div className="h-[2px] w-8 bg-zinc-700"></div>
                    <Stage name="Lint & Test" status="running" />
                    <div className="h-[2px] w-8 bg-zinc-700"></div>
                    <Stage name="Build" status="pending" />
                    <div className="h-[2px] w-8 bg-zinc-700"></div>
                    <Stage name="Deploy" status="pending" />
                </div>
            </div>
        </div>
    )
}

function PipelineCard({ name, status, duration, branch }: any) {
    const statusColor = {
        success: 'text-green-500 bg-green-500/10',
        running: 'text-blue-500 bg-blue-500/10',
        failed: 'text-red-500 bg-red-500/10'
    }[status as string] || 'text-zinc-500';

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex items-center justify-between hover:border-zinc-700 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${status === 'running' ? 'bg-blue-500 animate-pulse' : status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                <div>
                    <div className="font-semibold">{name}</div>
                    <div className="text-xs text-zinc-500 flex items-center gap-2">
                        <span>{branch}</span>
                        <span>•</span>
                        <span>#{Math.floor(Math.random() * 1000)}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="text-sm text-zinc-400">{duration}</div>
                <div className={`text-xs px-2 py-1 rounded capitalize ${statusColor}`}>
                    {status}
                </div>
            </div>
        </div>
    )
}

function Stage({ name, status }: any) {
    const borderColor = status === 'completed' ? 'border-green-500/50' : status === 'running' ? 'border-blue-500' : 'border-zinc-700';
    return (
        <div className={`min-w-[120px] p-4 bg-zinc-950 border ${borderColor} rounded-lg flex flex-col items-center justify-center gap-2`}>
            <div className="font-medium text-sm">{name}</div>
            <div className="text-xs text-zinc-500 capitalize">{status}</div>
        </div>
    )
}
