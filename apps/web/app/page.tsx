'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Terminal, ChevronRight, Activity, Layers, Zap, ShieldCheck, Globe2 } from 'lucide-react';
import { Logo } from '../components/Logo';

export default function Home() {
    return (
        <div className="min-h-screen bg-[#050914] text-white overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />
            <div className="fixed inset-0 mesh-gradient pointer-events-none z-0" />

            {/* Navigation */}
            <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#050914]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <Logo size={28} className="text-zinc-100 group-hover:text-white transition-colors" />
                        <span className="font-bold text-lg tracking-tight text-zinc-100">ForgeDev</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                        <Link href="#solutions" className="hover:text-white transition-colors">Solutions</Link>
                        <Link href="#enterprise" className="hover:text-white transition-colors">Enterprise</Link>
                        <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/auth/login" className="hidden md:block text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            Sign In
                        </Link>
                        <a href="#request-access" className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all">
                            Request Access
                        </a>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 pt-32">
                {/* Hero Section */}
                <section className="px-6 pb-32 pt-12 relative">
                    <div className="max-w-5xl mx-auto text-center">


                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-balance"
                        >
                            The complete platform for{' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                                modern development.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed text-balance"
                        >
                            AI/ML training, web development, DevOps automation, and everything in between. Use what you need, when you need it—all in one powerful environment.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                        >
                            <a href="#request-access" className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-xl hover:-translate-y-0.5">
                                Request Access <ChevronRight size={18} />
                            </a>
                            <a href="https://github.com/utachicodes/forgedev" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-zinc-900/50 hover:bg-zinc-800 text-white rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all border border-white/10">
                                View Documentation
                            </a>
                        </motion.div>
                    </div>


                </section>

                {/* Features Grid */}
                <section id="solutions" className="py-32 relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Feature
                                icon={<Terminal className="text-blue-400" />}
                                title="AI/ML Training"
                                desc="Train models with PyTorch, TensorFlow, or Scikit-learn. Upload datasets, configure hyperparameters, and monitor training in real-time with GPU acceleration."
                            />
                            <Feature
                                icon={<Activity className="text-emerald-400" />}
                                title="Web Development Suite"
                                desc="Build modern web applications with Next.js, React, and TypeScript. Integrated code editing, live preview, and component libraries included."
                            />
                            <Feature
                                icon={<Layers className="text-purple-400" />}
                                title="DevOps Automation"
                                desc="Pre-configured CI/CD pipelines, multi-cloud deployment (Vercel, Railway, AWS), and infrastructure as code management."
                            />
                            <Feature
                                icon={<ShieldCheck className="text-orange-400" />}
                                title="Dataset Management"
                                desc="Version-controlled dataset storage for images, CSV, JSON, and video. Built-in preprocessing pipelines and data augmentation."
                            />
                            <Feature
                                icon={<Globe2 className="text-cyan-400" />}
                                title="Model Deployment"
                                desc="Export trained models in multiple formats (PyTorch, TensorFlow, ONNX) or deploy as API endpoints with one click."
                            />
                            <Feature
                                icon={<Zap className="text-yellow-400" />}
                                title="Unified Interface"
                                desc="Access all features from one platform. Switch between AI training, web development, and DevOps without leaving your workflow."
                            />
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-24 relative bg-[#090b10] border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-8">
                            Enterprise Access
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Enterprise Pricing</h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto mb-16 text-lg">
                            Professional-grade development infrastructure with comprehensive support and unlimited access to all platform features.
                        </p>

                        <div className="max-w-md mx-auto relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
                            <div className="relative p-8 rounded-2xl bg-[#0c0f16] border border-white/10 shadow-2xl">
                                <h3 className="text-xl font-bold text-white mb-2">Enterprise License</h3>
                                <div className="flex items-baseline justify-center gap-2 mb-6">
                                    <span className="text-5xl font-bold text-white">10,000 FCFA</span>
                                    <span className="text-sm text-zinc-500">/month</span>
                                </div>
                                <ul className="space-y-4 mb-8 text-left">
                                    <li className="flex items-center gap-3 text-zinc-300 text-sm">
                                        <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400"><Zap size={12} /></div>
                                        Unlimited AI Model Training
                                    </li>
                                    <li className="flex items-center gap-3 text-zinc-300 text-sm">
                                        <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400"><Zap size={12} /></div>
                                        Full-Stack Development Suite
                                    </li>
                                    <li className="flex items-center gap-3 text-zinc-300 text-sm">
                                        <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400"><Zap size={12} /></div>
                                        Global Edge Deployment
                                    </li>
                                    <li className="flex items-center gap-3 text-zinc-300 text-sm">
                                        <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400"><Zap size={12} /></div>
                                        24/7 Dedicated Support
                                    </li>
                                </ul>
                                <a href="#request-access" className="w-full block py-4 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold transition-colors">
                                    Request Enterprise Access
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Simplified CTA */}
                <section className="py-24 border-t border-white/5 bg-[#090b10]">
                    <div className="max-w-4xl mx-auto text-center px-6">
                        <h2 className="text-3xl font-bold mb-6 text-balance">Ready to transform your engineering culture?</h2>
                        <a href="#request-access" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold transition-colors text-lg">
                            Request Demo Access <ChevronRight size={20} />
                        </a>
                    </div>
                </section>

                <footer className="py-12 border-t border-white/5 bg-[#050914] text-zinc-500 text-sm">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center gap-3 mb-4 md:mb-0">
                            <Logo size={18} className="text-zinc-400" />
                            <span>© 2026 ForgeDev Inc.</span>
                        </div>
                        <div className="flex gap-8">
                            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    )
}

function Feature({ icon, title, desc }: any) {
    return (
        <div className="p-8 rounded-2xl bg-[#090b12] border border-white/5 hover:border-white/10 transition-colors group">
            <div className="mb-6 p-3 bg-white/5 w-fit rounded-lg group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-zinc-100 mb-3">{title}</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">
                {desc}
            </p>
        </div>
    )
}
