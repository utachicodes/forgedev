'use client';
import { useState } from 'react';
import { Send, Copy, Loader2 } from 'lucide-react';

export default function ComponentGenerator() {
    const [prompt, setPrompt] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt) return;
        setLoading(true);
        try {
            // Stub call to AI engine via API Gateway (simulated)
            // In real world: fetch('/api/ai/generate/component', ...)
            await new Promise(r => setTimeout(r, 1500)); // Fake latency
            const res = await mockAiCall(prompt);
            setCode(res.code || '');
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <header>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
                    AI Component Generator
                </h1>
                <p className="text-zinc-400">Describe a UI component and let ForgeDev build it for you.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[600px]">
                <div className="space-y-4 flex flex-col">
                    <textarea
                        className="w-full flex-1 bg-zinc-900 border border-zinc-800 rounded-lg p-4 resize-none focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        placeholder="e.g., A pricing card component with 3 tiers, highlighted middle tier, and glassmorphism effect..."
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 font-semibold transition-all"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                        Generate Component
                    </button>
                </div>

                <div className="relative bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-950">
                        <span className="text-xs text-zinc-500 font-mono">MyComponent.tsx</span>
                        <button className="text-zinc-500 hover:text-white"><Copy size={16} /></button>
                    </div>
                    <div className="flex-1 p-4 font-mono text-sm text-green-400 overflow-auto whitespace-pre">
                        {loading ? (
                            <div className="h-full flex items-center justify-center text-zinc-600">
                                <span className="animate-pulse">Thinking...</span>
                            </div>
                        ) : code || <span className="text-zinc-700">Generated code will appear here...</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Mock mimicking the AI Engine response
async function mockAiCall(prompt: string) {
    return {
        code: `import React from 'react';
import { Check } from 'lucide-react';

export default function PricingCard() {
  // Generated based on: ${prompt}
  return (
    <div className="relative p-8 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
      <h3 className="text-xl font-bold text-white relative">Pro Plan</h3>
      <div className="my-4 relative">
        <span className="text-4xl font-bold text-white">$29</span>
        <span className="text-zinc-400">/mo</span>
      </div>
      <ul className="space-y-3 relative text-zinc-300">
        <li className="flex items-center gap-2"><Check size={16} className="text-blue-400"/> Unlimited Projects</li>
        <li className="flex items-center gap-2"><Check size={16} className="text-blue-400"/> AI Code Gen</li>
        <li className="flex items-center gap-2"><Check size={16} className="text-blue-400"/> Priority Support</li>
      </ul>
      <button className="mt-8 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors relative">
        Get Started
      </button>
    </div>
  );
}`
    }
}
