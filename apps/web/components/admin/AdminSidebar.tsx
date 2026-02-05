'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Settings,
    Shield,
    LogOut,
    Activity,
    Database
} from 'lucide-react';
import { auth } from '../../lib/auth';
import { useRouter } from 'next/navigation';

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        auth.clearSession();
        router.push('/auth/login');
    };

    const navItems = [
        { href: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
        { href: '/admin/dashboard/users', label: 'User Management', icon: Users },
        { href: '/admin/dashboard/system', label: 'System Status', icon: Activity },
        { href: '/admin/dashboard/database', label: 'Database', icon: Database },
        { href: '/admin/dashboard/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <aside className="w-64 border-r border-zinc-800 bg-[#0c0c0e] flex flex-col h-screen sticky top-0">
            <div className="p-6 border-b border-zinc-800 flex items-center gap-2">
                <Shield className="text-blue-500" size={24} />
                <span className="font-bold text-lg tracking-tight">ForgeDev</span>
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded ml-auto">ADMIN</span>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                                }`}
                        >
                            <item.icon size={18} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-zinc-800">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                >
                    <LogOut size={18} />
                    <span className="font-medium text-sm">Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
