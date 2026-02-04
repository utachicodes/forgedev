import Link from 'next/link';
import { PlayCircle, ShieldCheck, Bug, Activity } from 'lucide-react';

export default function TestingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-zinc-900 border-r border-zinc-800 text-white flex flex-col">
                <div className="p-4 border-b border-zinc-800 font-bold tracking-wider">
                    FORGE<span className="text-green-500">TEST</span>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <NavItem href="/testing" icon={<ShieldCheck size={20} />} label="Overview" />
                    <NavItem href="/testing/recorder" icon={<PlayCircle size={20} />} label="E2E Recorder" />
                    <NavItem href="/testing/runs" icon={<Activity size={20} />} label="Test Runs" />
                    <NavItem href="/testing/issues" icon={<Bug size={20} />} label="Issues" />
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
