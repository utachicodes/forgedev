'use client';

import { Terminal, Box, Play, Settings } from 'lucide-react';
import { ReactNode } from 'react';
import { Sidebar } from '../../components/Sidebar';

export default function DevOpsLayout({
    children,
}: {
    children: ReactNode
}) {
    const navItems = [
        { href: '/devops', icon: Terminal, label: 'Overview' },
        { href: '/devops/pipelines', icon: Play, label: 'Pipelines' },
        { href: '/devops/infrastructure', icon: Box, label: 'Infrastructure' },
        { href: '/devops/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="flex min-h-screen bg-[#0d1117] text-white selection:bg-orange-500/30">
            <Sidebar
                brandName="DEVOPS"
                brandColor="orange"
                items={navItems}
            />
            <main className="flex-1 overflow-y-auto mesh-gradient relative">
                <div className="absolute inset-0 bg-orange-500/5 blur-[100px] pointer-events-none -z-10" />
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
