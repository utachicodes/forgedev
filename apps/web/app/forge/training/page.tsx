export default function TrainingPage() {
    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-2">AI Training</h2>
            <p className="text-zinc-400 mb-8">Manage datasets and fine-tune models (Legacy AI Module).</p>
            <div className="p-6 rounded-xl border border-zinc-800 bg-amber-500/5 border-amber-500/20">
                <p className="text-amber-200/60 text-sm">
                    Notice: This module is being migrated to the new Neural AI Architecture. Existing training jobs are preserved.
                </p>
            </div>
        </div>
    );
}
