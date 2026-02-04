export default function WorkspaceProjects({ params }: { params: { slug: string } }) {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg hover:border-zinc-700 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded bg-blue-900/20 flex items-center justify-center text-blue-500 font-bold">
                                P{i}
                            </div>
                            <div className="bg-green-900/20 text-green-400 px-2 py-1 rounded text-xs">Active</div>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Project Alpha {i}</h3>
                        <p className="text-zinc-400 text-sm mb-4">A sample project description for demonstration purposes.</p>
                        <div className="flex items-center justify-between text-xs text-zinc-500">
                            <span>Updated 2d ago</span>
                            <span>v1.0.{(i)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
