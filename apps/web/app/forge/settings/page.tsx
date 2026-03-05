'use client';

import React, { useState } from 'react';
import { Save, Shield, Cpu, Globe, Key, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [provider, setProvider] = useState('ollama');
    const [endpoint, setEndpoint] = useState('http://localhost:11434/v1');
    const [modelId, setModelId] = useState('llama3.2');
    const [apiKey, setApiKey] = useState('');

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

    React.useEffect(() => {
        fetch(`${API_URL}/forge/settings/config`)
            .then(res => res.json())
            .then(data => {
                if (data.providers && data.providers.length > 0) {
                    const config = data.providers[0];
                    setProvider(config.type || 'ollama');
                    setEndpoint(config.endpoint || 'http://localhost:11434/v1');
                    setModelId(config.modelId || 'llama3.2');
                    // For security, we don't return the real API key to the client
                    setApiKey('');
                }
            })
            .catch(err => console.error('Failed to load settings:', err))
            .finally(() => setLoading(false));
    }, [API_URL]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setStatus('idle');

        try {
            const response = await fetch(`${API_URL}/forge/settings/config`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ provider, endpoint, modelId, apiKey }),
            });

            if (response.ok) {
                setStatus('success');
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error('Save error:', err);
            setStatus('error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-zinc-500 animate-pulse">Loading settings...</div>;
    }

    return (
        <div className="p-8 max-w-4xl">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Platform Settings</h2>
                <p className="text-zinc-400">Configure your model providers, API keys, and workspace preferences.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* AI Provider Configuration */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
                    <div className="p-6 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Cpu className="text-emerald-500" size={20} />
                            <h3 className="font-semibold text-zinc-100">Primary AI Provider</h3>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Provider Type</label>
                                <select
                                    value={provider}
                                    onChange={(e) => setProvider(e.target.value)}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all outline-none"
                                >
                                    <option value="ollama">Ollama (Local)</option>
                                    <option value="openai">OpenAI</option>
                                    <option value="anthropic">Anthropic</option>
                                    <option value="custom">Custom OpenAI-Compatible</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Model ID</label>
                                <input
                                    type="text"
                                    value={modelId}
                                    onChange={(e) => setModelId(e.target.value)}
                                    placeholder="e.g. gpt-4o, llama3.2"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:border-emerald-500/50 outline-none placeholder:text-zinc-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                <Globe size={14} />
                                API Endpoint
                            </label>
                            <input
                                type="text"
                                value={endpoint}
                                onChange={(e) => setEndpoint(e.target.value)}
                                placeholder="https://api.openai.com/v1"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:border-emerald-500/50 outline-none placeholder:text-zinc-700"
                            />
                            <p className="text-[11px] text-zinc-500">Default for Ollama: http://localhost:11434/v1</p>
                        </div>

                        {provider !== 'ollama' && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                    <Key size={14} />
                                    API Key
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        placeholder="sk-..."
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:border-emerald-500/50 outline-none placeholder:text-zinc-700"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <Shield className="text-zinc-600" size={16} />
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 mt-2 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                                    <AlertCircle className="text-emerald-500 shrink-0 mt-0.5" size={14} />
                                    <p className="text-[11px] text-zinc-400">
                                        Your API keys are encrypted with AES-256 before storage and never leave the server. Leaving this blank will keep your existing key.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4">
                    <AnimatePresence>
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-2 text-emerald-500 text-sm font-medium"
                            >
                                <CheckCircle2 size={16} />
                                Configuration saved
                            </motion.div>
                        )}
                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-2 text-rose-500 text-sm font-medium"
                            >
                                <AlertCircle size={16} />
                                Failed to save settings
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-900/10 active:scale-95"
                    >
                        <Save size={18} />
                        {saving ? 'Saving...' : 'Save Configuration'}
                    </button>
                </div>
            </form>
        </div>
    );
}
