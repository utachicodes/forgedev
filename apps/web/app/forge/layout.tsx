import { AppShell } from '@/components/shell/AppShell';

export default function ForgeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AppShell>{children}</AppShell>;
}
