'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { auth } from '../../../lib/auth';
import { Logo } from '../../../components/Logo';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Save session
            auth.setSession(data.token, data.user);

            // Redirect based on role
            if (data.user.role === 'ADMIN' || data.user.role === 'OWNER') {
                router.push('/admin/dashboard');
            } else {
                router.push('/dashboard');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050914] text-white flex items-center justify-center px-6">
            <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />
            <div className="fixed inset-0 mesh-gradient pointer-events-none z-0" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-3 mb-10 group">
                    <Logo size={28} className="text-zinc-100 group-hover:text-white transition-colors" />
                    <span className="text-2xl font-bold tracking-tight text-zinc-100">ForgeDev</span>
                </Link>

                {/* Login Card */}
                <div className="p-10 border border-white/5 rounded-2xl shadow-2xl bg-[#0a0f1c]/80 backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
                        <p className="text-zinc-400 text-sm">
                            Sign in to access the platform
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-sm text-red-400">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-[#050914]/50 border border-zinc-800 rounded-lg text-white focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-all placeholder:text-zinc-700"
                                    placeholder="you@company.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-[#050914]/50 border border-zinc-800 rounded-lg text-white focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-all placeholder:text-zinc-700"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-zinc-400 cursor-pointer hover:text-zinc-300">
                                <input type="checkbox" className="rounded border-zinc-700 bg-[#050914]/50 text-zinc-500 focus:ring-0 checked:bg-zinc-600" />
                                Remember me
                            </label>
                            <Link href="/auth/forgot-password" className="text-zinc-400 hover:text-zinc-300 transition-colors font-medium">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-4 bg-white hover:bg-zinc-200 text-black font-bold rounded-xl transition-all hover:translate-y-[-1px] active:translate-y-[1px] shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <>
                                    Sign In <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* No Signup Message */}
                    <div className="mt-8 pt-8 border-t border-white/5">
                        <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-4 text-center">
                            <p className="text-sm text-zinc-300 mb-1">
                                <strong className="text-zinc-200">Restricted Access</strong>
                            </p>
                            <p className="text-xs text-zinc-500 mb-3">
                                This is a secure enterprise environment.
                            </p>
                            <Link
                                href="/#request-access"
                                className="inline-block text-xs text-zinc-400 hover:text-zinc-300 font-bold uppercase tracking-wide transition-colors"
                            >
                                Request Access →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center mt-8 text-sm text-zinc-600">
                    &copy; 2026 ForgeDev Inc.
                </p>
            </motion.div>
        </div>
    );
}
