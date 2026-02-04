import Link from 'next/link';
import { LayoutDashboard, Code2, Database, Terminal, Settings } from 'lucide-react';

export default function SuiteLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-zinc-900 border-r border-zinc-800 text-white flex flex-col">
                <div className="p-4 border-b border-zinc-800 font-bold tracking-wider">
                    FORGE<span className="text-blue-500">DEV</span>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <NavItem href="/web-suite" icon={<LayoutDashboard size={20} />} label="Overview" />
                    <div className="text-xs font-semibold text-zinc-500 pt-4 pb-2">WEB SUITE</div>
                    <NavItem href="/web-suite/generator" icon={<Code2 size={20} />} label="Component Gen" />
                    <NavItem href="/web-suite/schema" icon={<Database size={20} />} label="Schema Design" />
                    <div className="text-xs font-semibold text-zinc-500 pt-4 pb-2">DEVOPS</div>
                    <NavItem href="/devops/pipelines" icon={<Terminal size={20} />} label="Pipelines" />
                </nav>
            </aside>
            <main className="flex-1 bg-zinc-950 text-white overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}

function NavItem({ href, icon, label }: { href: string, icon: any, label: string }) {
    return (
        <Link href={href} className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors">
            {icon}
            {label}
        </Link>
    )
}
