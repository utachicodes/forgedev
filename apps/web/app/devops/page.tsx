export default function DevOpsOverview() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-zinc-100">DevOps Overview</h1>
                <p className="text-zinc-400">Welcome to your automation and infrastructure control center.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm">
                    <h3 className="font-semibold text-zinc-200 mb-2">CI/CD Status</h3>
                    <div className="flex items-center gap-2 text-emerald-400 text-sm">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                        All systems operational
                    </div>
                </div>
                <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm">
                    <h3 className="font-semibold text-zinc-200 mb-2">Cloud Resources</h3>
                    <div className="text-zinc-400 text-sm">
                        4 Active clusters | 12 Managed services
                    </div>
                </div>
                <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm md:col-span-2 lg:col-span-1">
                    <h3 className="font-semibold text-zinc-200 mb-2">Deployment Frequency</h3>
                    <div className="text-zinc-400 text-sm">
                        12 daily average (Stable)
                    </div>
                </div>
            </div>

            <div className="p-8 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center">
                    <span className="text-zinc-500">?</span>
                </div>
                <div>
                    <h3 className="font-medium text-zinc-200">Waiting for interaction</h3>
                    <p className="text-sm text-zinc-500 max-w-xs mx-auto">Select a tool from the sidebar to manage pipelines or view infrastructure status.</p>
                </div>
            </div>
        </div>
    )
}
