import Link from 'next/link';
import { ArrowRight, Download, Terminal, Cpu, Layout, Box, Globe, Shield } from 'lucide-react';

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
                            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
                            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                            <Link href="/marketplace" className="hover:text-white transition-colors">Extensions</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/workspaces" className="hidden md:block text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            Sign In
                        </Link>
                        <Link href="/workspaces" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:glow-blue active:scale-95">
                            Get Started
                        </Link>
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
                            v1.0 Public Alpha is live
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                            Code anything.<br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-purple-400 animate-gradient-x">Build everything.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
                            ForgeDev is the unified platform for <span className="text-white">AI</span>, <span className="text-white">Web</span>, and <span className="text-white">DevOps</span> engineering.
                            Build, deploy, and scale in one hyper-optimized environment.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
                            <Link href="/workspaces" className="w-full sm:w-auto px-10 py-5 bg-white text-black hover:bg-zinc-200 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-xl">
                                Start Coding <ArrowRight size={22} strokeWidth={3} />
                            </Link>
                            <button className="w-full sm:w-auto px-10 py-5 bg-zinc-900/50 hover:bg-zinc-800/80 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all border border-white/10 glass active:scale-95">
                                <Download size={22} /> Download App
                            </button>
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
                                    Terminal — forge-sh — 80x24
                                </div>
                            </div>
                            <div className="grid grid-cols-12 h-[520px]">
                                <div className="col-span-1 border-r border-white/5 bg-[#09090b] flex flex-col items-center py-8 gap-10 text-zinc-600">
                                    <Terminal size={24} className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                    <Layout size={24} className="hover:text-zinc-400 transition-colors cursor-pointer" />
                                    <Globe size={24} className="hover:text-zinc-400 transition-colors cursor-pointer" />
                                    <Cpu size={24} className="hover:text-zinc-400 transition-colors cursor-pointer" />
                                    <div className="mt-auto pb-4">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10" />
                                    </div>
                                </div>
                                <div className="col-span-11 bg-[#0c0c0e] p-10 font-mono text-[13px] text-left relative">
                                    <div className="flex items-center gap-3 text-emerald-400 mb-4 opacity-80">
                                        <span className="text-blue-500 font-bold">forge@terminal</span>
                                        <span className="text-zinc-600">:</span>
                                        <span className="text-purple-400">~/projects/ai-model</span>
                                        <span className="text-zinc-700">on</span>
                                        <span className="text-orange-400 cursor-pointer hover:underline">main</span>
                                    </div>
                                    <div className="text-zinc-300 mb-8 space-y-1">
                                        <div className="flex gap-3">
                                            <span className="text-zinc-600">$</span>
                                            <span>forge deploy --env production --silent</span>
                                        </div>
                                        <div className="text-zinc-500 pl-6 border-l border-zinc-800 mt-4 py-2">
                                            [00:01:04] <span className="text-blue-400">SYNC</span> Resolving dependencies... done.<br />
                                            [00:01:06] <span className="text-blue-400">BUILD</span> Compiling AI kernels... done.<br />
                                            [00:01:12] <span className="text-blue-400">INFRA</span> Scaling K8s pods [4 -> 12]... done.<br />
                                            <span className="text-emerald-400 font-bold mt-2 block">✔ PRODUCTION DEPLOYED: https://api.forge.io</span>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-[#161618] rounded-2xl border border-white/5 max-w-md glass-card">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                                Live Performance
                                            </div>
                                            <span className="text-[10px] text-zinc-600 font-bold">Uptime: 99.99%</span>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-[11px] text-zinc-400 mb-2 font-bold">
                                                    <span>MODEL LATENCY</span>
                                                    <span className="text-blue-400">12ms</span>
                                                </div>
                                                <div className="w-full bg-zinc-800/50 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-blue-500 h-full rounded-full w-[15%] glow-blue" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-[11px] text-zinc-400 mb-2 font-bold">
                                                    <span>CPU UTILIZATION</span>
                                                    <span className="text-emerald-400">42%</span>
                                                </div>
                                                <div className="w-full bg-zinc-800/50 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-emerald-500 h-full rounded-full w-[42%]" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-6 right-6 p-4 glass rounded-xl text-[10px] font-bold text-zinc-500 animate-pulse">
                                        SCANNING FOR VULNERABILITIES...
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
                            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Built for hyper-scale.</h2>
                            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                                Every tool you need to build the next generation of AI and cloud native applications.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<Cpu className="text-purple-400" size={24} />}
                                title="Integrated AI Suite"
                                description="Train, fine-tune, and deploy models without leaving your workspace. Supports PyTorch & TensorFlow out of the box."
                            />
                            <FeatureCard
                                icon={<Layout className="text-blue-400" size={24} />}
                                title="Web Builder"
                                description="Generate production-ready React components from text descriptions or Figma designs in seconds."
                            />
                            <FeatureCard
                                icon={<Terminal className="text-emerald-400" size={24} />}
                                title="DevOps Pipelines"
                                description="Visual CI/CD builder. Drag, drop, and deploy to Kubernetes or Serverless infrastructure."
                            />
                            <FeatureCard
                                icon={<Globe className="text-orange-400" size={24} />}
                                title="Remote Development"
                                description="Spin up secure, isolated cloud environments for every branch. Code from any browser."
                            />
                            <FeatureCard
                                icon={<Shield size={24} className="text-red-400" />}
                                title="Enterprise Security"
                                description="RBAC, Audit Logs, and SOC2 compliance features built-in. Secure by design."
                            />
                            <FeatureCard
                                icon={<Box className="text-cyan-400" size={24} />}
                                title="Polyglot Monorepos"
                                description="Native support for JS/TS, Python, Go, and Rust in a single unified project structure."
                            />
                        </div>
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="py-32 border-t border-white/5 bg-[#09090b] relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-600/5 blur-[100px] pointer-events-none" />
                    <div className="max-w-4xl mx-auto text-center px-6 relative">
                        <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter">Build for the future.</h2>
                        <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
                            Join thousands of developers building the next generation of software on ForgeDev.
                        </p>
                        <Link href="/workspaces" className="inline-block px-12 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 shadow-2xl hover:glow-blue">
                            Get Started for Free
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 border-t border-zinc-800 text-sm text-zinc-500">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Box size={16} />
                            <span>© 2024 ForgeDev Inc.</span>
                        </div>
                        <div className="flex gap-6">
                            <Link href="#" className="hover:text-zinc-300">Privacy</Link>
                            <Link href="#" className="hover:text-zinc-300">Terms</Link>
                            <Link href="#" className="hover:text-zinc-300">Twitter</Link>
                            <Link href="#" className="hover:text-zinc-300">GitHub</Link>
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
            <div className="mb-4 bg-[#0d1117] w-12 h-12 rounded-lg flex items-center justify-center border border-zinc-800">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-zinc-100">{title}</h3>
            <p className="text-zinc-400 leading-relaxed">
                {description}
            </p>
        </div>
    )
}
