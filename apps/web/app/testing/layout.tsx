'use client';

import { PlayCircle, ShieldCheck, Bug, Activity } from 'lucide-react';
import { Sidebar } from '../../components/Sidebar';

export default function TestingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const navItems = [
        { href: '/testing', icon: ShieldCheck, label: 'Overview' },
        { href: '/testing/recorder', icon: PlayCircle, label: 'E2E Recorder' },
        { href: '/testing/runs', icon: Activity, label: 'Test Runs' },
        { href: '/testing/issues', icon: Bug, label: 'Issues' },
    ];

    return (
        <div className="flex min-h-screen bg-[#0d1117] text-white selection:bg-emerald-500/30">
            <Sidebar
                brandName="TEST"
                brandColor="emerald"
                items={navItems}
            />
            <main className="flex-1 bg-zinc-950 text-white overflow-y-auto mesh-gradient relative">
                <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] pointer-events-none -z-10" />
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
