export default function ResearchPage() {
    return (
        <div className="p-8 max-w-4xl mx-auto w-full">
            <h2 className="text-2xl font-bold text-white mb-2">Research Engine</h2>
            <p className="text-zinc-400 mb-12">Search the web, ingest documents, and generate comprehensive research reports.</p>

            <div className="relative mb-8">
                <input
                    type="text"
                    placeholder="What do you want to research today?"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-zinc-200 outline-none focus:border-emerald-500/50 text-lg shadow-2xl"
                    disabled
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                    <span className="px-3 py-1 bg-zinc-800 rounded-md text-[10px] uppercase tracking-widest text-zinc-400 font-bold border border-zinc-700">Deep Report</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 opacity-50">
                <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/20 h-24 flex items-center justify-center text-zinc-600">
                    Serper/Bing API integration pending
                </div>
            </div>
        </div>
    );
}
