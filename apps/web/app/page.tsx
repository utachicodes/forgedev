import Link from 'next/link';
import { ArrowRight, Mail, Terminal, Cpu, Layout, Box, Globe, Shield, Code2, Database, TestTube } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0d1117] text-white selection:bg-blue-500/30 overflow-x-hidden">
            {/* Navigation */}
            <nav className="border-b border-white/5 bg-[#0d1117]/60 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <Link href="/" className="font-bold text-xl tracking-tighter flex items-center gap-2 group">
                            <div className="p-1 rounded bg-blue-600 group-hover:glow-blue transition-all">
                                <Box size={20} className="text-white" />
                            </div>
                            <span className="text-glow">ForgeDev</span>
                        </Link>
                        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                            <Link href="#features" className="hover:text-white transition-colors relative group">
                                Features
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
                            </Link>
                            <Link href="#pricing" className="hover:text-white transition-colors relative group">
                                Pricing
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
                            </Link>
                            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/auth/login" className="hidden md:block text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            Sign In
                        </Link>
                        <a href="#request-access" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:glow-blue active:scale-95">
                            Request Access
                        </a>
                    </div>
                </div>
            </nav>

            <main className="mesh-gradient">
                {/* Hero Section */}
                <section className="relative pt-32 pb-24 px-6 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-blue-500/10 blur-[120px] rounded-full -z-10" />
                    <div className="max-w-7xl mx-auto text-center relative">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-10 border border-blue-500/20 glass shadow-2xl">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 font-black"></span>
                            </span>
                            Enterprise Platform - Request Access
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                            The Unified<br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-purple-400 animate-gradient-x">Development Platform</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
                            Consolidate <span className="text-white">AI/ML</span>, <span className="text-white">Web Development</span>, <span className="text-white">DevOps</span>, and <span className="text-white">Testing</span> into one hyper-optimized environment.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
                            <a href="#request-access" className="w-full sm:w-auto px-10 py-5 bg-white text-black hover:bg-zinc-200 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-xl">
                                Request Access <Mail size={22} strokeWidth={3} />
                            </a>
                            <Link href="/auth/login" className="w-full sm:w-auto px-10 py-5 bg-zinc-900/50 hover:bg-zinc-800/80 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all border border-white/10 glass active:scale-95">
                                <Terminal size={22} /> Sign In
                            </Link>
                        </div>

                        {/* Simulated UI Window */}
                        <div className="relative max-w-5xl mx-auto rounded-2xl border border-white/10 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] bg-[#09090b] overflow-hidden group">
                            <div className="bg-[#18181b] px-5 py-4 flex items-center gap-3 border-b border-white/5">
                                <div className="flex gap-2">
                                    <div className="w-3.5 h-3.5 rounded-full bg-white/10 border border-white/5 transition-colors group-hover:bg-red-500/80" />
                                    <div className="w-3.5 h-3.5 rounded-full bg-white/10 border border-white/5 transition-colors group-hover:bg-yellow-500/80" />
                                    <div className="w-3.5 h-3.5 rounded-full bg-white/10 border border-white/5 transition-colors group-hover:bg-green-500/80" />
                                </div>
                                <div className="ml-4 text-[11px] text-zinc-500 font-bold uppercase tracking-widest font-mono">
                                    ForgeDev Terminal — 80x24
                                </div>
                            </div>
                            <div className="grid grid-cols-12 h-[520px]">
                                <div className="col-span-1 border-r border-white/5 bg-[#09090b] flex flex-col items-center py-8 gap-10 text-zinc-600">
                                    <Terminal size={24} className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                    <Code2 size={24} className="hover:text-zinc-400 transition-colors cursor-pointer" />
                                    <Database size={24} className="hover:text-zinc-400 transition-colors cursor-pointer" />
                                    <TestTube size={24} className="hover:text-zinc-400 transition-colors cursor-pointer" />
                                    <div className="mt-auto pb-4">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10" />
                                    </div>
                                </div>
                                <div className="col-span-11 bg-[#0c0c0e] p-10 font-mono text-[13px] text-left relative">
                                    <div className="flex items-center gap-3 text-emerald-400 mb-4 opacity-80">
                                        <span className="text-blue-500 font-bold">forge@platform</span>
                                        <span className="text-zinc-600">:</span>
                                        <span className="text-purple-400">~/projects/ai-app</span>
                                        <span className="text-zinc-700">on</span>
                                        <span className="text-orange-400 cursor-pointer hover:underline">main</span>
                                    </div>
                                    <div className="text-zinc-300 mb-8 space-y-1">
                                        <div className="flex gap-3">
                                            <span className="text-zinc-600">$</span>
                                            <span>forge train --model resnet50 --dataset cifar10</span>
                                        </div>
                                        <div className="text-zinc-500 pl-6 border-l border-zinc-800 mt-4 py-2">
                                            [00:00:12] <span className="text-blue-400">INIT</span> Loading dataset... done.<br />
                                            [00:01:45] <span className="text-blue-400">TRAIN</span> Epoch 1/10 - Loss: 2.304<br />
                                            [00:03:18] <span className="text-blue-400">TRAIN</span> Epoch 5/10 - Loss: 0.842<br />
                                            <span className="text-emerald-400 font-bold mt-2 block">✔ MODEL TRAINED: accuracy 94.2%</span>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-[#161618] rounded-2xl border border-white/5 max-w-md glass-card">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                                Platform Status
                                            </div>
                                            <span className="text-[10px] text-zinc-600 font-bold">All Services Online</span>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-[11px] text-zinc-400 mb-2 font-bold">
                                                    <span>AI ENGINE</span>
                                                    <span className="text-emerald-400">READY</span>
                                                </div>
                                                <div className="w-full bg-zinc-800/50 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-emerald-500 h-full rounded-full w-full" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-[11px] text-zinc-400 mb-2 font-bold">
                                                    <span>DEVOPS PIPELINE</span>
                                                    <span className="text-blue-400">ACTIVE</span>
                                                </div>
                                                <div className="w-full bg-zinc-800/50 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-blue-500 h-full rounded-full w-full glow-blue" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-6 right-6 p-4 glass rounded-xl text-[10px] font-bold text-zinc-500">
                                        ENTERPRISE PLATFORM v1.0
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Feature Grid */}
                <section id="features" className="py-32 relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">All workflows. One platform.</h2>
                            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                                Design, build, deploy, and monitor software projects across all domains without context switching.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<Cpu className="text-purple-400" size={24} />}
                                title="AI/ML Training"
                                description="Framework-agnostic model training with PyTorch, TensorFlow, and Scikit-learn. Real-time monitoring and version control."
                            />
                            <FeatureCard
                                icon={<Code2 className="text-blue-400" size={24} />}
                                title="Web Development"
                                description="Full-stack development tools with Next.js, React, and TypeScript. Integrated code editor and live preview."
                            />
                            <FeatureCard
                                icon={<Terminal className="text-emerald-400" size={24} />}
                                title="DevOps Automation"
                                description="Complete CI/CD pipelines, infrastructure management, and deployment automation in one interface."
                            />
                            <FeatureCard
                                icon={<TestTube className="text-orange-400" size={24} />}
                                title="Testing Suite"
                                description="Unit, integration, and E2E testing with Jest, Playwright, and custom test frameworks."
                            />
                            <FeatureCard
                                icon={<Database size={24} className="text-cyan-400" />}
                                title="Database Management"
                                description="Neon PostgreSQL integration with schema management, migrations, and query optimization."
                            />
                            <FeatureCard
                                icon={<Shield size={24} className="text-red-400" />}
                                title="Enterprise Security"
                                description="Role-based access control, audit logs, and compliance features built-in from day one."
                            />
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-32 border-t border-white/5 bg-[#09090b] relative overflow-hidden">
                    <div className="absolute inset-0 bg-purple-600/5 blur-[100px] pointer-events-none" />
                    <div className="max-w-4xl mx-auto text-center px-6 relative">
                        <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">Enterprise Platform</h2>
                        <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
                            ForgeDev is a premium development platform for serious engineering teams.
                        </p>

                        <div className="bg-[#161b22] border border-zinc-800 rounded-3xl p-12 max-w-2xl mx-auto">
                            <div className="mb-8">
                                <div className="text-6xl font-black mb-4">
                                    $10,000<span className="text-3xl text-zinc-400">/month</span>
                                </div>
                                <p className="text-zinc-400 text-lg">
                                    All-inclusive enterprise subscription
                                </p>
                            </div>

                            <div className="space-y-4 text-left mb-10">
                                <div className="flex items-center gap-3 text-zinc-300">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    </div>
                                    <span>Unified AI/ML, Web, DevOps, and Testing platform</span>
                                </div>
                                <div className="flex items-center gap-3 text-zinc-300">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    </div>
                                    <span>Unlimited users and projects</span>
                                </div>
                                <div className="flex items-center gap-3 text-zinc-300">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    </div>
                                    <span>24/7 enterprise support</span>
                                </div>
                                <div className="flex items-center gap-3 text-zinc-300">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    </div>
                                    <span>Dedicated onboarding and training</span>
                                </div>
                                <div className="flex items-center gap-3 text-zinc-300">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    </div>
                                    <span>SOC2 compliance and security controls</span>
                                </div>
                            </div>

                            <a href="#request-access" className="block w-full px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 shadow-2xl hover:glow-blue">
                                Request Access
                            </a>

                            <p className="text-sm text-zinc-500 mt-6">
                                Accounts are created manually after approval. No self-signup.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Request Access Form */}
                <section id="request-access" className="py-32 border-t border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-600/5 blur-[100px] pointer-events-none" />
                    <div className="max-w-2xl mx-auto px-6 relative">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Request Platform Access</h2>
                            <p className="text-zinc-400 text-lg">
                                Submit your information and we'll review your request. You'll receive login credentials via email after approval.
                            </p>
                        </div>

                        <div className="bg-[#161b22] border border-zinc-800 rounded-3xl p-10">
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-zinc-300 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 bg-[#0d1117] border border-zinc-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                                        placeholder="you@company.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-zinc-300 mb-2">
                                        Company Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 bg-[#0d1117] border border-zinc-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                                        placeholder="Acme Inc."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-zinc-300 mb-2">
                                        Team Size
                                    </label>
                                    <select className="w-full px-4 py-3 bg-[#0d1117] border border-zinc-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors">
                                        <option>1-10</option>
                                        <option>11-50</option>
                                        <option>51-200</option>
                                        <option>201+</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-zinc-300 mb-2">
                                        Primary Use Case *
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 bg-[#0d1117] border border-zinc-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                        placeholder="Describe how you plan to use ForgeDev..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 shadow-2xl hover:glow-blue"
                                >
                                    Submit Access Request
                                </button>

                                <p className="text-sm text-zinc-500 text-center">
                                    We'll review your request and contact you within 1-2 business days.
                                </p>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 border-t border-zinc-800 text-sm text-zinc-500">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Box size={16} />
                            <span>© 2026 ForgeDev Inc.</span>
                        </div>
                        <div className="flex gap-6">
                            <Link href="#" className="hover:text-zinc-300">Privacy</Link>
                            <Link href="#" className="hover:text-zinc-300">Terms</Link>
                            <Link href="/auth/login" className="hover:text-zinc-300">Sign In</Link>
                            <Link href="#request-access" className="hover:text-zinc-300">Request Access</Link>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    )
}

function FeatureCard({ icon, title, description }: any) {
    return (
        <div className="bg-[#161b22] p-8 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="mb-4 bg-[#0d1117] w-12 h-12 rounded-lg flex items-ent justify-center border border-zinc-800">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-zinc-100">{title}</h3>
            <p className="text-zinc-400 leading-relaxed">
                {description}
            </p>
        </div>
    )
}
