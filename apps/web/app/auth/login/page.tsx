'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Terminal, Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement actual authentication
        console.log('Login attempt:', { email, password });
    };

    return (
        <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center px-6">
            <div className="absolute inset-0 mesh-gradient opacity-30" />

            <div className="w-full max-w-md relative">
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-2 mb-10">
                    <div className="p-2 rounded bg-blue-600">
                        <Terminal size={24} className="text-white" />
                    </div>
                    <span className="text-2xl font-black tracking-tight">ForgeDev</span>
                </Link>

                {/* Login Card */}
                <div className="glass-card p-10 border border-zinc-800 rounded-2xl shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black mb-2">Welcome Back</h1>
                        <p className="text-zinc-400 text-sm">
                            Sign in to access the ForgeDev platform
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-zinc-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-[#0d1117] border border-zinc-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                                    placeholder="you@company.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-zinc-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-[#0d1117] border border-zinc-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-zinc-400 cursor-pointer">
                                <input type="checkbox" className="rounded border-zinc-700 bg-[#0d1117]" />
                                Remember me
                            </label>
                            <Link href="/auth/forgot-password" className="text-blue-400 hover:text-blue-300 transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all hover:glow-blue active:scale-95 flex items-center justify-center gap-2"
                        >
                            Sign In <ArrowRight size={18} />
                        </button>
                    </form>

                    {/* No Signup Message */}
                    <div className="mt-8 pt-8 border-t border-zinc-800">
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                            <p className="text-sm text-zinc-300 mb-2">
                                <strong className="text-blue-400">No account yet?</strong>
                            </p>
                            <p className="text-xs text-zinc-400 mb-3">
                                ForgeDev accounts are created manually after approval.
                            </p>
                            <Link
                                href="/#request-access"
                                className="inline-block text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                            >
                                Request Access →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center mt-8 text-sm text-zinc-500">
                    By signing in, you agree to our{' '}
                    <Link href="/terms" className="text-zinc-400 hover:text-zinc-300">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-zinc-400 hover:text-zinc-300">Privacy Policy</Link>
                </p>
            </div>
        </div>
    );
}
