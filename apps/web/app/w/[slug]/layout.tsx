import Link from 'next/link';

export default function WorkspaceLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: { slug: string }
}) {
    return (
        <div className="flex min-h-screen">
            {/* Reusing a similar sidebar for now, but contextual to workspace */}
            <aside className="w-64 bg-zinc-900 border-r border-zinc-800 text-white flex flex-col">
                <div className="p-4 border-b border-zinc-800 font-bold uppercase tracking-wider text-xs text-zinc-500">
                    WORKSPACE
                </div>
                <div className="p-4 font-bold text-lg">
                    {params.slug}
                </div>
                <nav className="flex-1 px-2 space-y-1">
                    <Link href={`/w/${params.slug}`} className="block px-3 py-2 rounded hover:bg-zinc-800">Overview</Link>
                    <Link href={`/w/${params.slug}/projects`} className="block px-3 py-2 rounded hover:bg-zinc-800">Projects</Link>
                    <Link href={`/w/${params.slug}/members`} className="block px-3 py-2 rounded hover:bg-zinc-800">Members</Link>
                    <Link href={`/w/${params.slug}/settings`} className="block px-3 py-2 rounded hover:bg-zinc-800">Settings</Link>
                </nav>
            </aside>
            <main className="flex-1 bg-zinc-950 text-white">
                {children}
            </main>
        </div>
    )
}
