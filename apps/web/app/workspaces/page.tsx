'use client';
import { useState, useEffect } from 'react';
import { Folder, Plus, Users, Globe } from 'lucide-react';
import Link from 'next/link';

export default function WorkspacesPage() {
    // Mock data
    const [workspaces, setWorkspaces] = useState([
        { id: '1', name: 'Acme Corp', slug: 'acme-corp', members: 4, projects: 12 },
        { id: '2', name: 'Personal Projects', slug: 'personal', members: 1, projects: 3 },
    ]);

    return (
        <div className="p-8 space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Your Workspaces</h1>
                    <p className="text-zinc-400">Manage your teams and organization units.</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
                    <Plus size={18} /> New Workspace
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workspaces.map(ws => (
                    <Link href={`/w/${ws.slug}`} key={ws.id} className="block group">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-blue-500/50 transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-zinc-800 rounded-lg text-blue-400 group-hover:text-blue-300 group-hover:bg-blue-900/20 transition-colors">
                                    <Globe size={24} />
                                </div>
                                <div className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">
                                    {ws.slug}
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{ws.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-zinc-500">
                                <span className="flex items-center gap-1"><Users size={14} /> {ws.members} members</span>
                                <span className="flex items-center gap-1"><Folder size={14} /> {ws.projects} projects</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
