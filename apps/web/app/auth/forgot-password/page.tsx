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

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link href="/" className="flex items-center justify-center gap-3 mb-16 group">
                        <Logo size={32} className="text-zinc-100 group-hover:text-white transition-colors" />
                        <span className="text-2xl font-bold tracking-tight text-zinc-100">ForgeDev</span>
                    </Link>
                </motion.div>

                {!success ? (
                    <>
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-center mb-12"
                        >
                            <h1 className="text-3xl font-bold mb-3">Reset Password</h1>
                            <p className="text-zinc-400 text-base">
                                Enter your email address and we'll send you a secure reset link
                            </p>
                        </motion.div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-8 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-sm text-red-400"
                            >
                                <AlertCircle size={16} />
                                {error}
                            </motion.div>
                        )}

                        {/* Form - Direct on page */}
                        <motion.form
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="space-y-6 mb-8"
                        >
                            <div>
                                <label className="block text-sm font-semibold text-zinc-300 mb-3">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-400 transition-colors" size={20} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-[#0a0f1c]/60 border border-zinc-800 rounded-xl text-white focus:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700/50 transition-all placeholder:text-zinc-600"
                                        placeholder="you@company.com"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-6 py-4 bg-white hover:bg-zinc-200 text-black font-bold rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-8"
                            >
                                {loading ? (
                                    <Loader2 size={20} className="animate-spin" />
                                ) : (
                                    <>
                                        Send Reset Link <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </motion.form>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="border-t border-white/5 pt-8 text-center"
                        >
                            <Link
                                href="/auth/login"
                                className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                            >
                                <ArrowLeft size={16} />
                                Back to Sign In
                            </Link>
                        </motion.div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                    >
                        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <CheckCircle2 size={40} className="text-emerald-400" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Check Your Email</h2>
                        <p className="text-zinc-400 mb-2 text-base">
                            We've sent a password reset link to
                        </p>
                        <p className="text-white font-semibold mb-10 text-lg">{email}</p>
                        <Link
                            href="/auth/login"
                            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                        >
                            <ArrowLeft size={16} />
                            Back to Sign In
                        </Link>
                    </motion.div>
                )}

                {/* Footer */}
                <p className="text-center mt-12 text-sm text-zinc-600">
                    &copy; 2026 ForgeDev Inc.
                </p>
            </div>
        </div>
    );
}
