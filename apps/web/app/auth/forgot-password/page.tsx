'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Logo } from '../../../components/Logo';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
            const res = await fetch(`${API_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to send reset email');
            }

            setSuccess(true);
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

                {/* Forgot Password Card */}
                <div className="p-10 border border-white/5 rounded-2xl shadow-2xl bg-[#0a0f1c]/80 backdrop-blur-xl">
                    {!success ? (
                        <>
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
                                <p className="text-zinc-400 text-sm">
                                    Enter your email and we'll send you a reset link
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

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full px-6 py-4 bg-white hover:bg-zinc-200 text-black font-bold rounded-xl transition-all hover:translate-y-[-1px] active:translate-y-[1px] shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : (
                                        <>
                                            Send Reset Link <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 pt-8 border-t border-white/5 text-center">
                                <Link
                                    href="/auth/login"
                                    className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-300 transition-colors font-medium"
                                >
                                    <ArrowLeft size={16} />
                                    Back to Login
                                </Link>
                            </div>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                <CheckCircle2 size={32} className="text-emerald-400" />
                            </div>
                            <h2 className="text-2xl font-bold mb-3">Check Your Email</h2>
                            <p className="text-zinc-400 mb-8">
                                We've sent a password reset link to <strong className="text-zinc-300">{email}</strong>
                            </p>
                            <Link
                                href="/auth/login"
                                className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-300 transition-colors font-medium"
                            >
                                <ArrowLeft size={16} />
                                Back to Login
                            </Link>
                        </motion.div>
                    )}
                </div>

                {/* Footer */}
                <p className="text-center mt-8 text-sm text-zinc-600">
                    &copy; 2026 ForgeDev Inc.
                </p>
            </motion.div>
        </div>
    );
}
