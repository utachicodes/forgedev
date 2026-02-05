import Link from 'next/link';
import { Mail, Terminal, Box, ChevronRight, Activity, Layers, Zap, ShieldCheck, BarChart3, Globe2 } from 'lucide-react';

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
                        <div className="p-1.5 rounded-lg bg-blue-600/10 border border-blue-500/20 group-hover:bg-blue-600/20 transition-colors">
                            <Box size={20} className="text-blue-500" />
                        </div>
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
                        <a href="#request-access" className="bg-[#1e293b] hover:bg-[#334155] border border-zinc-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all">
                            Contact Sales
                        </a>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 pt-32">
                {/* Hero Section */}
                <section className="px-6 pb-32 pt-12 relative">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-8 animate-fade-in-up">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            Introducing ForgeDev Enterprise v2.0
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-balance">
                            Build software <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                                at the speed of thought.
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed text-balance">
                            The unified engineering platform that synchronizes your entire development lifecycle. From prototype to production, in one seamless environment.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
                            <a href="#request-access" className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-xl hover:-translate-y-0.5">
                                Start Building <ChevronRight size={18} />
                            </a>
                            <Link href="/docs" className="w-full sm:w-auto px-8 py-4 bg-zinc-900/50 hover:bg-zinc-800 text-white rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all border border-white/10">
                                View Documentation
                            </Link>
                        </div>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="max-w-6xl mx-auto rounded-xl border border-white/10 shadow-2xl bg-[#09090b]/50 backdrop-blur-sm overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050914] to-transparent z-20 pointer-events-none h-32 bottom-0 w-full" />
                        <div className="h-10 bg-[#0c0f16] border-b border-white/5 flex items-center px-4 gap-2">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-zinc-700/50" />
                                <div className="w-3 h-3 rounded-full bg-zinc-700/50" />
                                <div className="w-3 h-3 rounded-full bg-zinc-700/50" />
                            </div>
                        </div>
                        <div className="grid grid-cols-12 h-[500px] bg-[#0c0f16]">
                            <div className="col-span-2 border-r border-white/5 bg-[#090b10] hidden md:block" />
                            <div className="col-span-12 md:col-span-10 p-8">
                                <div className="flex justify-between items-end mb-8">
                                    <div>
                                        <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Project Overview</div>
                                        <div className="text-3xl font-bold text-white">Hyperion Analytics</div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded border border-emerald-500/20 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            Operational
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="bg-[#121620] border border-white/5 p-6 rounded-lg">
                                        <div className="text-zinc-500 text-xs font-bold mb-4">DEPLOYMENT FREQUENCY</div>
                                        <div className="text-3xl font-mono text-blue-400 mb-2">124<span className="text-zinc-600">/day</span></div>
                                        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 w-3/4" />
                                        </div>
                                    </div>
                                    <div className="bg-[#121620] border border-white/5 p-6 rounded-lg">
                                        <div className="text-zinc-500 text-xs font-bold mb-4">SYSTEM LATENCY</div>
                                        <div className="text-3xl font-mono text-emerald-400 mb-2">24<span className="text-zinc-600">ms</span></div>
                                        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 w-1/2" />
                                        </div>
                                    </div>
                                    <div className="bg-[#121620] border border-white/5 p-6 rounded-lg">
                                        <div className="text-zinc-500 text-xs font-bold mb-4">ERROR RATE</div>
                                        <div className="text-3xl font-mono text-zinc-300 mb-2">0.01<span className="text-zinc-600">%</span></div>
                                        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-zinc-600 w-[2%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="solutions" className="py-32 relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Feature
                                icon={<Terminal className="text-blue-400" />}
                                title="Unified Workflow"
                                desc="Consolidate disparate tools into one cohesive interface. Manage code, infrastructure, and deployment without context switching."
                            />
                            <Feature
                                icon={<Activity className="text-emerald-400" />}
                                title="Real-time Telemetry"
                                desc="Instant visibility into system performance. Monitor metrics, logs, and traces in a single, correlated view."
                            />
                            <Feature
                                icon={<Layers className="text-purple-400" />}
                                title="Infrastructure as Code"
                                desc="Define your entire stack with code. Version control your infrastructure alongside your application logic."
                            />
                            <Feature
                                icon={<ShieldCheck className="text-orange-400" />}
                                title="Enterprise Security"
                                desc="Built-in compliance monitoring, role-based access control, and automated security scanning."
                            />
                            <Feature
                                icon={<Globe2 className="text-cyan-400" />}
                                title="Global Edge Network"
                                desc="Deploy instantly to 35+ regions worldwide. Automatic failover and load balancing included."
                            />
                            <Feature
                                icon={<Zap className="text-yellow-400" />}
                                title="Instant Preview"
                                desc="Share work-in-progress with stakeholders via instant, ephemeral preview environments for every PR."
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
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto mb-16 text-lg">
                            One plan. Unlimited potential. Everything you need to scale your engineering team.
                        </p>

                        <div className="max-w-md mx-auto relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
                            <div className="relative p-8 rounded-2xl bg-[#0c0f16] border border-white/10 shadow-2xl">
                                <h3 className="text-xl font-bold text-white mb-2">Enterprise License</h3>
                                <div className="flex items-baseline justify-center gap-2 mb-6">
                                    <span className="text-5xl font-bold text-white">10,000</span>
                                    <span className="text-xl font-bold text-zinc-500">FCFA</span>
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
                            <Box size={18} className="text-zinc-400" />
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
