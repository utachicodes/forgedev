'use client';
import { useState } from 'react';
import { Circle, Square, MousePointer2 } from 'lucide-react';

export default function RecorderPage() {
    const [recording, setRecording] = useState(false);
    const [events, setEvents] = useState<any[]>([]);

    const toggleRecording = () => {
        if (!recording) {
            setRecording(true);
            setEvents([{ type: 'start', timestamp: new Date().toLocaleTimeString(), action: 'Started Recording' }]);
        } else {
            setRecording(false);
            setEvents(prev => [...prev, { type: 'stop', timestamp: new Date().toLocaleTimeString(), action: 'Stopped Recording' }]);
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">E2E Test Recorder</h1>
                    <p className="text-zinc-400">Record user interactions to generate Playwright scripts.</p>
                </div>
                <div className="flex items-center gap-4">
                    {recording && <span className="flex items-center gap-2 text-red-500 animate-pulse"><Circle size={12} fill="currentColor" /> Recording</span>}
                    <button
                        onClick={toggleRecording}
                        className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${recording ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-red-600 text-white hover:bg-red-700'}`}
                    >
                        {recording ? <><Square size={16} fill="currentColor" /> Stop</> : <><Circle size={16} /> Record New Test</>}
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                {/* Simulated Browser View */}
                <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden flex flex-col">
                    <div className="bg-zinc-800 px-4 py-2 flex items-center gap-2 border-b border-zinc-700">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="flex-1 bg-zinc-900 rounded px-3 py-1 text-xs text-zinc-500 text-center font-mono">
                            https://localhost:3000/app/preview
                        </div>
                    </div>
                    <div className="flex-1 bg-white relative group cursor-pointer">
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-300 pointer-events-none group-hover:bg-blue-500/5 transition-colors">
                            <MousePointer2 className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="p-8 text-black opacity-10">
                            (Interactive Application Preview Frame)
                        </div>
                    </div>
                </div>

                {/* Event Log */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col">
                    <div className="px-4 py-3 border-b border-zinc-800 font-semibold text-sm uppercase tracking-wider text-zinc-500">
                        Event Log
                    </div>
                    <div className="flex-1 p-2 space-y-1 overflow-auto font-mono text-xs">
                        {events.length === 0 ? (
                            <div className="p-4 text-center text-zinc-600 italic">No events recorded yet.</div>
                        ) : (
                            events.map((e, i) => (
                                <div key={i} className="flex gap-2 p-2 hover:bg-zinc-800 rounded text-zinc-300">
                                    <span className="text-zinc-500">[{e.timestamp}]</span>
                                    <span className={e.type === 'start' || e.type === 'stop' ? 'text-blue-400 font-bold' : ''}>{e.action}</span>
                                </div>
                            ))
                        )}
                        {recording && (
                            <div className="flex gap-2 p-2 rounded text-zinc-500 animate-pulse">
                                <span>...</span>
                                <span>Listening for interactions</span>
                            </div>
                        )}
                    </div>
                    <div className="p-4 border-t border-zinc-800">
                        <button className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-sm transition-colors" disabled={events.length === 0}>
                            Export to Playwright
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
