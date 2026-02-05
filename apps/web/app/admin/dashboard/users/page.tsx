'use client';

import { useState, useEffect } from 'react';
import { Check, X, Search, Loader2 } from 'lucide-react';

interface User {
    id: string;
    email: string;
    fullName: string;
    role: string;
    status: string;
    createdAt: string;
}

export default function UserManagementPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    // Mock data for MVP since API isn't fully ready yet
    useEffect(() => {
        // In production: fetch('/api/admin/users')...
        setTimeout(() => {
            setUsers([
                { id: '1', email: 'abdoullahaljersi@gmail.com', fullName: 'Abdoullah Aljersi', role: 'ADMIN', status: 'APPROVED', createdAt: '2026-01-15' },
                { id: '2', email: 'john@acme.com', fullName: 'John Doe', role: 'USER', status: 'PENDING', createdAt: '2026-02-04' },
                { id: '3', email: 'sarah@startup.io', fullName: 'Sarah Smith', role: 'USER', status: 'APPROVED', createdAt: '2026-02-01' },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const handleStatusChange = (userId: string, newStatus: string) => {
        setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
        // In production: await fetch(`/api/admin/users/${userId}/status`, { method: 'PATCH', body: JSON.stringify({ status: newStatus }) })
    };

    const filteredUsers = users.filter(u =>
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.fullName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">User Management</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-[#161b22] border border-zinc-800 rounded-lg text-sm text-white focus:border-blue-500 outline-none"
                    />
                </div>
            </div>

            <div className="bg-[#161b22] border border-zinc-800 rounded-xl overflow-hidden">
                {loading ? (
                    <div className="p-8 flex justify-center text-zinc-500">
                        <Loader2 className="animate-spin" size={24} />
                    </div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#0d1117] text-zinc-400 font-bold uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-[#0d1117]/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white mb-0.5">{user.fullName}</div>
                                        <div className="text-zinc-500">{user.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'ADMIN' ? 'bg-purple-500/20 text-purple-400' : 'bg-zinc-800 text-zinc-400'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${user.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' :
                                                user.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-500">
                                        {user.createdAt}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {user.status === 'PENDING' && (
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleStatusChange(user.id, 'APPROVED')}
                                                    className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                                                    title="Approve"
                                                >
                                                    <Check size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(user.id, 'REJECTED')}
                                                    className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                                    title="Reject"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
