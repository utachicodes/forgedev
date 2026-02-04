import Link from 'next/link';
import { ArrowRight, Download, Terminal, Cpu, Layout, Box, Globe, Shield } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0d1117] text-white selection:bg-blue-500/30">
            {/* Navigation */}
            <nav className="border-b border-zinc-800 bg-[#0d1117]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
                            <Box className="text-blue-500" />
                            ForgeDev
                        </Link>
                        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
                            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
                            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
                            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                            <Link href="/marketplace" className="hover:text-white transition-colors">Extensions</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/workspaces" className="hidden md:block text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            Sign In
                        </Link>
                        <Link href="/workspaces" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            <main>
                {/* Hero Section */}
                <section className="pt-24 pb-20 px-6">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium mb-8 border border-blue-500/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            v1.0 Public Alpha is live
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                            Code anything.<br />
                            <span className="text-white">Build everything.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            ForgeDev is the unified platform for AI, Web, and DevOps engineering.
                            Stop stitching tools together—build, deploy, and scale in one environment.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                            <Link href="/workspaces" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105">
                                Start Coding Now <ArrowRight size={20} />
                            </Link>
                            <button className="w-full sm:w-auto px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all">
                                <Download size={20} /> Download for Windows
                            </button>
                        </div>

                        {/* Simulated UI Window */}
                        <div className="relative max-w-5xl mx-auto rounded-xl border border-zinc-800 shadow-2xl bg-[#1e1e1e] overflow-hidden group hover:border-zinc-700 transition-colors">
                            <div className="bg-[#2d2d2d] px-4 py-3 flex items-center gap-2 border-b border-[#1e1e1e]">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="ml-4 text-xs text-zinc-400 font-sans">ForgeDev - Workspace: Acme Corp</div>
                            </div>
                            <div className="grid grid-cols-12 h-[480px]">
                                <div className="col-span-1 border-r border-zinc-800 bg-[#252526] flex flex-col items-center py-4 gap-6 text-zinc-500">
                                    <Terminal size={24} className="text-blue-400" />
                                    <Layout size={24} />
                                    <Globe size={24} />
                                    <Cpu size={24} />
                                </div>
                                <div className="col-span-11 bg-[#1e1e1e] p-8 font-mono text-sm text-left">
                                    <div className="flex items-center gap-2 text-green-400 mb-2">
                                        <span className="text-blue-400">➜</span>
                                        <span>~/projects/ai-model</span>
                                        <span className="text-zinc-500">git:(main)</span>
                                    </div>
                                    <div className="text-zinc-300 mb-6">
                                        $ forge train --model resnet50 --dataset aerial-view-v2<br />
                                        <span className="text-zinc-500">[INFO] Initializing training cluster...</span><br />
                                        <span className="text-zinc-500">[INFO] GPU availability: 4x A100 [ONLINE]</span><br />
                                        <span className="text-green-400">[SUCCESS] Training started. Job ID: #9928</span>
                                    </div>

                                    <div className="p-4 bg-[#252526] rounded border border-zinc-800 max-w-md">
                                        <div className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">Live Metrics</div>
                                        <div className="flex justify-between text-zinc-300 mb-1">
                                            <span>Loss</span>
                                            <span>0.042</span>
                                        </div>
                                        <div className="w-full bg-zinc-700 h-1 rounded-full mb-3">
                                            <div className="bg-blue-500 h-1 rounded-full w-[85%]" />
                                        </div>
                                        <div className="flex justify-between text-zinc-300 mb-1">
                                            <span>Accuracy</span>
                                            <span>98.2%</span>
                                        </div>
                                        <div className="w-full bg-zinc-700 h-1 rounded-full">
                                            <div className="bg-green-500 h-1 rounded-full w-[98%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-20" />
                        </div>
                    </div>
                </section>

                {/* Feature Grid */}
                <section id="features" className="py-24 bg-[#0d1117]">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<Cpu className="text-purple-400" />}
                                title="Integrated AI Suite"
                                description="Train, fine-tune, and deploy models without leaving your workspace. Supports PyTorch & TensorFlow out of the box."
                            />
                            <FeatureCard
                                icon={<Layout className="text-blue-400" />}
                                title="Web Builder"
                                description="Generate production-ready React components from text descriptions or Figma designs in seconds."
                            />
                            <FeatureCard
                                icon={<Terminal className="text-green-400" />}
                                title="DevOps Pipelines"
                                description="Visual CI/CD builder. Drag, drop, and deploy to Kubernetes or Serverless infrastructure."
                            />
                            <FeatureCard
                                icon={<Globe className="text-orange-400" />}
                                title="Remote Development"
                                description="Spin up secure, isolated cloud environments for every branch. Code from any browser."
                            />
                            <FeatureCard
                                icon={<Shield className="text-red-400" />}
                                title="Enterprise Security"
                                description="RBAC, Audit Logs, and SOC2 compliance features built-in. Secure by design."
                            />
                            <FeatureCard
                                icon={<Box className="text-cyan-400" />}
                                title="Polyglot Monorepos"
                                description="Native support for JS/TS, Python, Go, and Rust in a single unified project structure."
                            />
                        </div>
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="py-20 border-t border-zinc-800 bg-[#161b22]">
                    <div className="max-w-4xl mx-auto text-center px-6">
                        <h2 className="text-3xl font-bold mb-6">Build for the future.</h2>
                        <p className="text-zinc-400 mb-8">
                            Join thousands of developers building the next generation of software on ForgeDev.
                        </p>
                        <Link href="/workspaces" className="inline-block px-8 py-3 bg-white text-black font-bold rounded hover:bg-zinc-200 transition-colors">
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
