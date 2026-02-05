'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Terminal, ChevronRight, Activity, Layers, Zap, ShieldCheck, Globe2, Sparkles } from 'lucide-react';
import { Logo } from '../components/Logo';
import { useRef } from 'react';

export default function Home() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

    return (
        <div className="min-h-screen bg-[#050914] text-white overflow-x-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />
            <div className="fixed inset-0 mesh-gradient pointer-events-none z-0" />

            {/* Floating orbs */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="fixed top-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none z-0"
            />
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    x: [0, -15, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="fixed bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none z-0"
            />
            <motion.div
                animate={{
                    y: [0, -25, 0],
                    x: [0, 20, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="fixed top-1/2 left-1/3 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none z-0"
            />

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#050914]/80 backdrop-blur-md"
            >
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                            <Logo size={28} className="text-zinc-100 group-hover:text-white transition-colors" />
                        </motion.div>
                        <span className="font-bold text-lg tracking-tight text-zinc-100">ForgeDev</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                        <Link href="#solutions" className="hover:text-white transition-colors relative group">
                            Solutions
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                        </Link>
                        <Link href="#features" className="hover:text-white transition-colors relative group">
                            Features
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                        </Link>
                        <Link href="#pricing" className="hover:text-white transition-colors relative group">
                            Pricing
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/auth/login" className="hidden md:block text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            Sign In
                        </Link>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#request-access"
                            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all"
                        >
                            Request Access
                        </motion.a>
                    </div>
                </div>
            </motion.nav>

            <main className="relative z-10 pt-32">
                {/* Hero Section */}
                <section ref={heroRef} className="px-6 pb-32 pt-12 relative">
                    <motion.div style={{ y, opacity }} className="max-w-5xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-8"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                                <Sparkles size={16} />
                            </motion.div>
                            Powered by cutting-edge technology
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-balance"
                        >
                            The complete platform for{' '}
                            <motion.span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500"
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                style={{ backgroundSize: '200% 200%' }}
                            >
                                modern development.
                            </motion.span>
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
                            <motion.a
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                href="#request-access"
                                className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-xl relative overflow-hidden group"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '100%' }}
                                    transition={{ duration: 0.6 }}
                                />
                                <span className="relative">Request Access</span>
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <ChevronRight size={18} />
                                </motion.div>
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://github.com/utachicodes/forgedev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-8 py-4 bg-zinc-900/50 hover:bg-zinc-800 text-white rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all border border-white/10"
                            >
                                View Documentation
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Features Grid */}
                <section id="solutions" className="py-32 relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything you need</h2>
                            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                                A comprehensive suite of tools for modern software development
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Feature
                                icon={<Terminal className="text-blue-400" />}
                                title="AI/ML Training"
                                desc="Train models with PyTorch, TensorFlow, or Scikit-learn. Upload datasets, configure hyperparameters, and monitor training in real-time with GPU acceleration."
                                delay={0}
                            />
                            <Feature
                                icon={<Activity className="text-emerald-400" />}
                                title="Web Development Suite"
                                desc="Build modern web applications with Next.js, React, and TypeScript. Integrated code editing, live preview, and component libraries included."
                                delay={0.1}
                            />
                            <Feature
                                icon={<Layers className="text-purple-400" />}
                                title="DevOps Automation"
                                desc="Pre-configured CI/CD pipelines, multi-cloud deployment (Vercel, Railway, AWS), and infrastructure as code management."
                                delay={0.2}
                            />
                            <Feature
                                icon={<ShieldCheck className="text-orange-400" />}
                                title="Dataset Management"
                                desc="Version-controlled dataset storage for images, CSV, JSON, and video. Built-in preprocessing pipelines and data augmentation."
                                delay={0.3}
                            />
                            <Feature
                                icon={<Globe2 className="text-cyan-400" />}
                                title="Model Deployment"
                                desc="Export trained models in multiple formats (PyTorch, TensorFlow, ONNX) or deploy as API endpoints with one click."
                                delay={0.4}
                            />
                            <Feature
                                icon={<Zap className="text-yellow-400" />}
                                title="Unified Interface"
                                desc="Access all features from one platform. Switch between AI training, web development, and DevOps without leaving your workflow."
                                delay={0.5}
                            />
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-24 relative bg-[#090b10] border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl md:text-5xl font-bold mb-6"
                        >
                            Simple Pricing
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-zinc-400 max-w-2xl mx-auto mb-16 text-lg"
                        >
                            Professional-grade development infrastructure with comprehensive support and unlimited access to all platform features.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="max-w-md mx-auto relative group"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.05, 1],
                                    opacity: [0.2, 0.35, 0.2],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl"
                            />
                            <motion.div
                                whileHover={{ scale: 1.02, y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative p-8 rounded-2xl bg-[#0c0f16] border border-white/10 shadow-2xl"
                            >
                                <h3 className="text-xl font-bold text-white mb-2">Monthly Subscription</h3>
                                <div className="flex items-baseline justify-center gap-2 mb-6">
                                    <motion.span
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
                                        className="text-5xl font-bold text-white"
                                    >
                                        10,000 FCFA
                                    </motion.span>
                                    <span className="text-sm text-zinc-500">/month</span>
                                </div>
                                <ul className="space-y-4 mb-8 text-left">
                                    {[
                                        "50 AI Training Hours/Month",
                                        "10 Active Projects",
                                        "100GB Storage & Bandwidth",
                                        "24/7 Community Support"
                                    ].map((feature, index) => (
                                        <motion.li
                                            key={feature}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                            className="flex items-center gap-3 text-zinc-300 text-sm"
                                        >
                                            <motion.div
                                                whileHover={{ rotate: 360, scale: 1.2 }}
                                                transition={{ duration: 0.4 }}
                                                className="p-1 rounded-full bg-emerald-500/10 text-emerald-400"
                                            >
                                                <Zap size={12} />
                                            </motion.div>
                                            {feature}
                                        </motion.li>
                                    ))}
                                </ul>
                                <motion.a
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="#request-access"
                                    className="w-full block py-4 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold transition-colors relative overflow-hidden group"
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30"
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: '100%' }}
                                        transition={{ duration: 0.8 }}
                                    />
                                    <span className="relative">Get Started</span>
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Simplified CTA */}
                <section className="py-24 border-t border-white/5 bg-[#090b10]">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto text-center px-6"
                    >
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold mb-6 text-balance"
                        >
                            Ready to transform your engineering culture?
                        </motion.h2>
                        <motion.a
                            whileHover={{ scale: 1.05, x: 5 }}
                            href="#request-access"
                            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold transition-colors text-lg"
                        >
                            Request Demo Access
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ChevronRight size={20} />
                            </motion.div>
                        </motion.a>
                    </motion.div>
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

function Feature({ icon, title, desc, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay,
                type: "spring",
                stiffness: 100
            }}
            whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3, type: "spring", stiffness: 300 }
            }}
            className="p-8 rounded-2xl bg-[#090b12] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden"
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <motion.div
                whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="relative mb-6 p-3 bg-white/5 w-fit rounded-lg"
            >
                {icon}
            </motion.div>
            <h3 className="relative text-lg font-bold text-zinc-100 mb-3">{title}</h3>
            <p className="relative text-zinc-400 leading-relaxed text-sm">
                {desc}
            </p>
        </motion.div>
    )
}
