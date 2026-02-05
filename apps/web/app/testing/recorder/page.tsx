'use client';

import { useState } from 'react';
import { Circle, Square, MousePointer2 } from 'lucide-react';
import { PageHeader } from '../../../components/PageHeader';

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
        <div className="space-y-8 animate-in fade-in duration-500">
            <PageHeader
                title="E2E Test Recorder"
                description="Interact with the browser frame to generate Playwright test scripts automatically."
                actions={
                    <div className="flex items-center gap-4">
                        {recording && (
                            <span className="flex items-center gap-2 text-red-500 font-bold animate-pulse px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20 text-xs uppercase tracking-wider">
                                <Circle size={8} fill="currentColor" /> Recording
                            </span>
                        )}
                        <button
                            onClick={toggleRecording}
                            className={`px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all active:scale-95 ${recording
                                    ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20'
                                    : 'bg-red-600 text-white hover:bg-red-500 hover:glow-red shadow-lg shadow-red-900/20'
                                }`}
                        >
                            {recording ? <><Square size={16} fill="currentColor" /> Stop Recording</> : <><Circle size={16} /> Start Recording</>}
                        </button>
                    </div>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[650px]">
                {/* Simulated Browser View */}
                <div className="lg:col-span-2 bg-[#0d1117] border border-white/5 rounded-2xl overflow-hidden flex flex-col shadow-2xl relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 pointer-events-none" />
                    <div className="bg-[#161b22] px-4 py-3 flex items-center gap-4 border-b border-white/5 relative z-10">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
                        </div>
                        <div className="flex-1 bg-[#0d1117] rounded-lg px-4 py-1.5 text-xs text-zinc-500 text-center font-mono border border-white/5 flex items-center justify-center gap-2">
                            <span className="text-zinc-600">🔒</span> https://localhost:3000/app/preview
                        </div>
                    </div>
                    <div className="flex-1 bg-white relative group-hover:bg-zinc-50 transition-colors cursor-crosshair">
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-300 pointer-events-none">
                            <MousePointer2 className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" size={32} />
                        </div>
                        <div className="p-12 text-zinc-300 text-center">
                            <h3 className="text-2xl font-black text-zinc-200 mb-2">Interactive Preview</h3>
                            <p>(Click elements here to record interactions)</p>
                        </div>
                    </div>
                </div>

                {/* Event Log */}
                <div className="bg-[#0d1117] border border-white/5 rounded-2xl flex flex-col shadow-xl glass-card">
                    <div className="px-5 py-4 border-b border-white/5 font-black text-xs uppercase tracking-widest text-zinc-500 flex justify-between items-center">
                        <span>Event Stream</span>
                        <span className="bg-zinc-800 px-2 py-0.5 rounded text-[10px] text-zinc-400">{events.length} Events</span>
                    </div>
                    <div className="flex-1 p-2 space-y-1 overflow-auto font-mono text-xs custom-scrollbar">
                        {events.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-zinc-600 italic opacity-50">
                                <ActivityLogIcon />
                                <p className="mt-4">Ready to record</p>
                            </div>
                        ) : (
                            events.map((e, i) => (
                                <div key={i} className="flex gap-3 p-3 hover:bg-white/5 rounded-lg text-zinc-300 transition-colors border border-transparent hover:border-white/5">
                                    <span className="text-zinc-600 font-bold opacity-50">{(i + 1).toString().padStart(2, '0')}</span>
                                    <div className="flex-1">
                                        <span className={e.type === 'start' || e.type === 'stop' ? 'text-blue-400 font-bold' : ''}>{e.action}</span>
                                        <div className="text-[10px] text-zinc-600 mt-1">{e.timestamp}</div>
                                    </div>
                                </div>
                            ))
                        )}
                        {recording && (
                            <div className="flex items-center gap-2 p-3 text-blue-400 animate-pulse bg-blue-500/5 rounded-lg mx-2 border border-blue-500/10">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <span className="font-bold">Listening for actions...</span>
                            </div>
                        )}
                    </div>
                    <div className="p-5 border-t border-white/5 bg-white/5 rounded-b-2xl">
                        <button
                            className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 border border-white/10"
                            disabled={events.length === 0}
                        >
                            Export to Playwright
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ActivityLogIcon() {
    return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-zinc-700">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
        </svg>
    )
}
