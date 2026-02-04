import Link from 'next/link';
import { Terminal, Box, Play, Settings } from 'lucide-react';

export default function DevOpsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-zinc-900 border-r border-zinc-800 text-white flex flex-col">
                <div className="p-4 border-b border-zinc-800 font-bold tracking-wider">
                    FORGE<span className="text-orange-500">DEVOPS</span>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <NavItem href="/devops" icon={<Terminal size={20} />} label="Overview" />
                    <NavItem href="/devops/pipelines" icon={<Play size={20} />} label="Pipelines" />
                    <NavItem href="/devops/infrastructure" icon={<Box size={20} />} label="Infrastructure" />
                    <NavItem href="/devops/settings" icon={<Settings size={20} />} label="Settings" />
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
