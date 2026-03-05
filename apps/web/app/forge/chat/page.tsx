'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Plus, MessageSquare, User, Bot, Hash, Terminal, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    createdAt?: string;
}

interface ChatSession {
    id: string;
    mode: string;
    updatedAt: string;
    messages: any[];
}

export default function ChatPage() {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [streamingContent, setStreamingContent] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

    useEffect(() => {
        fetchSessions();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [currentSession, streamingContent]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchSessions = async () => {
        try {
            const res = await fetch(`${API_URL}/forge/chat/sessions`);
            const data = await res.json();
            setSessions(data);
        } catch (err) {
            console.error('Failed to fetch sessions', err);
        }
    };

    const createSession = async () => {
        try {
            const res = await fetch(`${API_URL}/forge/chat/sessions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mode: 'normal' })
            });
            const newSession = await res.json();
            setSessions([newSession, ...sessions]);
            setCurrentSession(newSession);
        } catch (err) {
            console.error('Failed to create session', err);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || !currentSession) return;

        const userMessage = input;
        setInput('');
        setLoading(true);
        setStreamingContent('');

        // Optimistically update UI
        const updatedSession = {
            ...currentSession,
            messages: [...currentSession.messages, { role: 'user', content: userMessage }]
        };
        setCurrentSession(updatedSession as any);

        try {
            const response = await fetch(`${API_URL}/forge/chat/stream/${currentSession.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage })
            });

            if (!response.body) return;
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulated = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const text = decoder.decode(value);
                const lines = text.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.substring(6));
                            if (data.chunk) {
                                accumulated += data.chunk;
                                setStreamingContent(accumulated);
                            }
                            if (data.done) {
                                setLoading(false);
                                fetchSessions(); // Refresh list to get updated updatedAt
                                // Refresh current session to get persisted messages
                                fetch(`${API_URL}/forge/chat/sessions`)
                                    .then(r => r.json())
                                    .then(all => {
                                        const fresh = all.find((s: any) => s.id === currentSession.id);
                                        if (fresh) setCurrentSession(fresh);
                                        setStreamingContent('');
                                    });
                            }
                        } catch (e) {
                            // Ignore parse errors from partial chunks
                        }
                    }
                }
            }
        } catch (err) {
            console.error('Streaming error', err);
            setLoading(false);
        }
    };

    return (
        <div className="flex h-full bg-black overflow-hidden relative">
            {/* Sidebar: Chat History */}
            <div className="w-64 border-r border-zinc-800 bg-zinc-950/50 flex flex-col">
                <div className="p-4">
                    <button
                        onClick={createSession}
                        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-2 font-medium transition-all group active:scale-95"
                    >
                        <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                        New Chat
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-2 space-y-1">
                    {sessions.map(s => (
                        <button
                            key={s.id}
                            onClick={() => setCurrentSession(s)}
                            className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all ${currentSession?.id === s.id
                                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                                    : 'text-zinc-400 hover:bg-zinc-900 border border-transparent'
                                }`}
                        >
                            <MessageSquare size={16} className="shrink-0" />
                            <div className="truncate text-sm font-medium">
                                {s.messages.length > 0 ? s.messages[0].content : 'Empty Chat'}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Chat View */}
            <div className="flex-1 flex flex-col relative">
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 pb-32">
                    {!currentSession ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 mb-4 animate-pulse">
                                <Bot className="text-emerald-500" size={40} />
                            </div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">Neural Chat Environment</h1>
                            <p className="text-zinc-500 max-w-md mx-auto">
                                Select a conversation or start a new one to begin interacting with your neural ecosystem.
                            </p>
                        </div>
                    ) : (
                        <>
                            {currentSession.messages.map((m, i) => (
                                <div key={i} className={`flex gap-4 max-w-4xl mx-auto ${m.role === 'assistant' ? 'bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800/50' : ''}`}>
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${m.role === 'user' ? 'bg-zinc-800 border-zinc-700' : 'bg-emerald-500/10 border-emerald-500/30'
                                        }`}>
                                        {m.role === 'user' ? <User size={16} className="text-zinc-300" /> : <Bot size={16} className="text-emerald-500" />}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-2">
                                            {m.role === 'user' ? 'Human' : 'Neural Core'}
                                            <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                                            {new Date(m.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        <div className="prose prose-invert max-w-none text-zinc-300">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    code({ node, inline, className, children, ...props }: any) {
                                                        const match = /language-(\w+)/.exec(className || '');
                                                        return !inline && match ? (
                                                            <div className="relative group rounded-xl overflow-hidden my-4 border border-zinc-800">
                                                                <div className="bg-zinc-900 px-4 py-2 border-b border-zinc-800 flex justify-between items-center">
                                                                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                                                                        <Terminal size={10} />
                                                                        {match[1]}
                                                                    </span>
                                                                    <button className="text-zinc-500 hover:text-white transition-colors" title="Copy code">
                                                                        <Copy size={12} />
                                                                    </button>
                                                                </div>
                                                                <SyntaxHighlighter
                                                                    style={vscDarkPlus}
                                                                    language={match[1]}
                                                                    PreTag="div"
                                                                    className="!bg-zinc-950 !m-0 !p-4 !text-sm"
                                                                    {...props}
                                                                >
                                                                    {String(children).replace(/\n$/, '')}
                                                                </SyntaxHighlighter>
                                                            </div>
                                                        ) : (
                                                            <code className={`${className} bg-zinc-800 px-1.5 py-0.5 rounded text-emerald-400 text-sm`} {...props}>
                                                                {children}
                                                            </code>
                                                        )
                                                    }
                                                }}
                                            >
                                                {m.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {streamingContent && (
                                <div className="flex gap-4 max-w-4xl mx-auto bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800/50 ring-1 ring-emerald-500/20">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border bg-emerald-500/10 border-emerald-500/30">
                                        <Bot size={16} className="text-emerald-500" />
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <div className="text-xs font-bold uppercase tracking-widest text-emerald-500/60 mb-2 flex items-center gap-2">
                                            Neural core <span className="animate-pulse">●</span>
                                        </div>
                                        <div className="prose prose-invert max-w-none text-zinc-300">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    code({ node, inline, className, children, ...props }: any) {
                                                        const match = /language-(\w+)/.exec(className || '');
                                                        return !inline && match ? (
                                                            <SyntaxHighlighter
                                                                style={vscDarkPlus}
                                                                language={match[1]}
                                                                PreTag="div"
                                                                className="!bg-zinc-950 !rounded-xl !p-4 !border !border-zinc-800 !my-4 !text-sm"
                                                                {...props}
                                                            >
                                                                {String(children).replace(/\n$/, '')}
                                                            </SyntaxHighlighter>
                                                        ) : (
                                                            <code className={`${className} bg-zinc-800 px-1.5 py-0.5 rounded text-emerald-400 text-sm`} {...props}>
                                                                {children}
                                                            </code>
                                                        )
                                                    }
                                                }}
                                            >
                                                {streamingContent}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>

                {/* Input Area */}
                {currentSession && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black to-transparent">
                        <div className="max-w-4xl mx-auto relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-2xl blur opacity-25 group-focus-within:opacity-100 transition duration-1000"></div>
                            <div className="relative flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-2 pl-4 rounded-2xl shadow-2xl focus-within:border-emerald-500/50 transition-all">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask anything..."
                                    className="flex-1 bg-transparent border-none outline-none text-zinc-200 placeholder:text-zinc-600 py-3"
                                    disabled={loading}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={loading || !input.trim()}
                                    className="w-12 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:bg-zinc-800 text-white flex items-center justify-center transition-all active:scale-90"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Send size={18} />
                                    )}
                                </button>
                            </div>
                            <div className="mt-3 flex items-center justify-center gap-4">
                                <div className="flex items-center gap-1.5 text-[10px] text-zinc-600 font-bold uppercase tracking-tight">
                                    <Hash size={10} /> Local Reasoning (Ollama)
                                </div>
                                <div className="w-1 h-1 bg-zinc-800 rounded-full"></div>
                                <div className="flex items-center gap-1.5 text-[10px] text-zinc-600 font-bold uppercase tracking-tight">
                                    <Terminal size={10} /> Shift+Enter for newline
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
