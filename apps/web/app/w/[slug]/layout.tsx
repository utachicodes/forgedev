'use client';

import { Layout, Box, Users, Settings } from 'lucide-react';
import { Sidebar } from '../../components/Sidebar';

export default function WorkspaceLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: { slug: string }
}) {
    const navItems = [
        { href: `/w/${params.slug}`, icon: Layout, label: 'Overview' },
        { href: `/w/${params.slug}/projects`, icon: Box, label: 'Projects' },
        { href: `/w/${params.slug}/members`, icon: Users, label: 'Members' },
        { href: `/w/${params.slug}/settings`, icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="flex min-h-screen bg-[#0d1117] text-white selection:bg-blue-500/30">
            <Sidebar
                brandName={params.slug.toUpperCase()}
                brandColor="blue"
                items={navItems}
            />
            <main className="flex-1 bg-[#09090b] text-white overflow-y-auto mesh-gradient relative">
                <div className="absolute inset-0 bg-blue-500/5 blur-[100px] pointer-events-none -z-10" />
                {children}
            </main>
        </div>
    )
}
