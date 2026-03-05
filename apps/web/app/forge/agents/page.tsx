'use client';

import React, { useState, useEffect } from 'react';
import { Plus, User, Cpu, Shield, Save, Settings, MessageSquare, Trash2, Edit3, Globe, Sparkles } from 'lucide-react';

interface Agent {
    id: string;
    name: string;
    description: string;
    systemPrompt: string;
    modelId: string;
    modelEndpoint: string;
    temperature: number;
}

export default function AgentsPage() {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingAgent, setEditingAgent] = useState<Agent | null>(null);

    // Form State
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [systemPrompt, setSystemPrompt] = useState('');
    const [modelId, setModelId] = useState('llama3.2');
    const [modelEndpoint, setModelEndpoint] = useState('http://localhost:11434/v1');
    const [apiKey, setApiKey] = useState('');
    const [temperature, setTemperature] = useState(0.7);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

    useEffect(() => {
        fetchAgents();
    }, []);

    const fetchAgents = async () => {
        try {
            const res = await fetch(`${API_URL}/forge/agents`);
            const data = await res.json();
            setAgents(data);
        } catch (err) {
            console.error('Failed to fetch agents', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            name,
            description,
            systemPrompt,
            modelId,
            modelEndpoint,
            apiKey,
            temperature
        };

        try {
            const res = await fetch(`${API_URL}/forge/agents`, {
                method: 'POST', // Simplified to only create for now
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setShowForm(false);
                resetForm();
                fetchAgents();
            }
        } catch (err) {
            console.error('Failed to save agent', err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setSystemPrompt('');
        setModelId('llama3.2');
        setModelEndpoint('http://localhost:11434/v1');
        setApiKey('');
        setTemperature(0.7);
        setEditingAgent(null);
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Agent Architect</h1>
                    <p className="text-zinc-400">Design and orchestrate custom neural personalities.</p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
                    >
                        <Plus size={20} />
                        Create Neural Agent
                    </button>
                )}
            </div>

            {showForm ? (
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <form onSubmit={handleSave}>
                        <div className="p-8 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/80">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                                    <Sparkles className="text-emerald-500" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Agent Configuration</h2>
                                    <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">New Neural Instance</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="text-zinc-500 hover:text-white transition-colors text-sm font-medium"
                            >
                                Cancel
                            </button>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Left Column: Personality */}
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-2">
                                        <User size={14} /> Identity & Persona
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-zinc-400 uppercase">Agent Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="e.g. Code Architect"
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:border-emerald-500/50 outline-none transition-all"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-zinc-400 uppercase">Description</label>
                                            <textarea
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="What is this agent specialized in?"
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:border-emerald-500/50 outline-none h-24 resize-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-sm font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-2">
                                            <Settings size={14} /> System Instructions
                                        </h3>
                                    </div>
                                    <textarea
                                        value={systemPrompt}
                                        onChange={(e) => setSystemPrompt(e.target.value)}
                                        placeholder="You are an expert software engineer specialized in React and Node.js..."
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 text-zinc-200 focus:border-emerald-500/50 outline-none h-48 font-mono text-sm leading-relaxed transition-all p-4 border-l-2 border-l-emerald-500/30"
                                        required
                                    />
                                    <p className="text-[10px] text-zinc-600 font-medium">Variable injection like <code className="text-emerald-500">{"{{user_name}}"}</code> supported.</p>
                                </div>
                            </div>

                            {/* Right Column: Model Specs */}
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-2">
                                        <Cpu size={14} /> Neural Backbone
                                    </h3>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-zinc-400 uppercase">Model ID</label>
                                            <input
                                                type="text"
                                                value={modelId}
                                                onChange={(e) => setModelId(e.target.value)}
                                                placeholder="llama3.2, gpt-4o"
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:border-emerald-500/50 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-zinc-400 uppercase flex items-center gap-2">
                                                <Globe size={12} /> Model Endpoint
                                            </label>
                                            <input
                                                type="text"
                                                value={modelEndpoint}
                                                onChange={(e) => setModelEndpoint(e.target.value)}
                                                placeholder="http://localhost:11434/v1"
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:border-emerald-500/50 outline-none transition-all"
                                            />
                                            <p className="text-[10px] text-zinc-600 italic">Defaults to your local Ollama instance.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-zinc-400 uppercase flex items-center gap-2">
                                                <Shield size={12} /> Custom API Key
                                            </label>
                                            <input
                                                type="password"
                                                value={apiKey}
                                                onChange={(e) => setApiKey(e.target.value)}
                                                placeholder="Optional (Encrypted)"
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:border-emerald-500/50 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-4 pt-4 border-t border-zinc-800">
                                            <div className="flex justify-between items-center mb-2">
                                                <label className="text-xs font-bold text-zinc-400 uppercase">Temperature: {temperature}</label>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="2"
                                                step="0.1"
                                                value={temperature}
                                                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                                                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                            />
                                            <div className="flex justify-between text-[10px] text-zinc-600 font-bold">
                                                <span>PRECISE</span>
                                                <span>BALANCED</span>
                                                <span>CREATIVE</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-4 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-900/20 active:scale-95"
                                    >
                                        <Save size={20} />
                                        {loading ? 'Initializing...' : 'Save Agent Configuration'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map(agent => (
                        <div key={agent.id} className="group relative bg-zinc-900/40 border border-zinc-800 hover:border-emerald-500/30 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/10 active:scale-[0.98]">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                                    <Bot size={28} className="text-emerald-500" />
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 text-zinc-600 hover:text-white transition-colors"><Edit3 size={16} /></button>
                                    <button className="p-2 text-zinc-600 hover:text-rose-500 transition-colors"><Trash2 size={16} /></button>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{agent.name}</h3>
                            <p className="text-zinc-500 text-sm line-clamp-2 mb-6 h-10">{agent.description || 'No description provided.'}</p>

                            <div className="flex items-center gap-4 border-t border-zinc-800 pt-6">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-600 uppercase">
                                    <Cpu size={12} className="text-emerald-500/50" /> {agent.modelId}
                                </div>
                                <div className="w-1 h-1 bg-zinc-800 rounded-full"></div>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-600 uppercase">
                                    <Settings size={12} className="text-emerald-500/50" /> Temp {agent.temperature}
                                </div>
                            </div>

                            <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <button className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-xl py-2.5 text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
                                    Open Chat
                                </button>
                            </div>
                        </div>
                    ))}

                    {agents.length === 0 && !loading && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="border-2 border-dashed border-zinc-800 rounded-3xl p-12 flex flex-col items-center justify-center text-center gap-4 hover:border-emerald-500/30 transition-all group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                                <Plus size={32} className="text-zinc-700 group-hover:text-emerald-500" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-bold text-zinc-500">Initialize First Agent</h3>
                                <p className="text-zinc-600 text-sm">Create a custom specialist to tackle complex tasks.</p>
                            </div>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

function Bot({ size, className }: { size: number, className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
        </svg>
    );
}
