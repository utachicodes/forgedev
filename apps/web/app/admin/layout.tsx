'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/auth';
import { Loader2 } from 'lucide-react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check auth
        if (!auth.isAuthenticated()) {
            router.push('/auth/login');
            return;
        }

        if (!auth.isAdmin()) {
            router.push('/'); // Redirect non-admins to home
            return;
        }

        setLoading(false);
    }, [router]);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[#0d1117] text-white">
                <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#0d1117] text-white">
            <AdminSidebar />
            <main className="flex-1 p-8 overflow-y-auto max-h-screen">
                {children}
            </main>
        </div>
    );
}
