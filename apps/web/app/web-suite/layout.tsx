'use client';

import { LayoutDashboard, Code2, Database, Terminal, Settings } from 'lucide-react';
import { Sidebar } from '../../components/Sidebar';

export default function SuiteLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const navItems = [
        { href: '/web-suite', icon: LayoutDashboard, label: 'Overview' },
        { href: '/web-suite/generator', icon: Code2, label: 'Component Gen' },
        { href: '/web-suite/schema', icon: Database, label: 'Schema Design' },
        // Cross-linking to DevOps for easy navigation
        { href: '/devops/pipelines', icon: Terminal, label: 'DevOps Pipelines' },
    ];

    return (
        <div className="flex min-h-screen bg-[#0d1117] text-white selection:bg-blue-500/30">
            <Sidebar
                brandName="DEV"
                brandColor="blue"
                items={navItems}
            />
            <main className="flex-1 bg-zinc-950 text-white overflow-y-auto mesh-gradient relative">
                <div className="absolute inset-0 bg-blue-500/5 blur-[100px] pointer-events-none -z-10" />
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
