export default function WorkflowsPage() {
    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-2">Visual Workflows</h2>
            <p className="text-zinc-400 mb-8">Automate complex tasks with AI-powered visual logic chains.</p>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4 text-zinc-500">
                    ⚙️
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No workflows created</h3>
                <p className="text-zinc-500 mb-6">Start by connecting a trigger to an AI action.</p>
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Create Workflow
                </button>
            </div>
        </div>
    );
}
