export default function IDEPage() {
    return (
        <div className="flex flex-col h-full bg-zinc-950">
            <div className="flex-1 flex flex-col">
                <div className="h-10 border-b border-zinc-800 bg-zinc-900/50 flex items-center px-4 gap-2">
                    <div className="px-3 py-1 bg-zinc-800 rounded text-xs text-zinc-300">index.ts</div>
                </div>
                <div className="flex-1 flex items-center justify-center text-zinc-600">
                    Monaco Editor Instance (@monaco-editor/react)
                </div>
            </div>
            <div className="h-48 border-t border-zinc-800 bg-zinc-950 flex flex-col p-4">
                <div className="text-xs font-mono text-zinc-500 mb-2">TERMINAL</div>
                <div className="flex-1 font-mono text-sm text-zinc-400 italic">xterm.js initialized...</div>
            </div>
        </div>
    );
}
