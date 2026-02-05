'use client';

export function PageHeader({ title, description, actions }: PageHeaderProps) {
    return (
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 animate-fade-in-up">
            <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-zinc-500 pb-2">
                    {title}
                </h1>
                {description && (
                    <p className="text-zinc-400 font-medium text-base max-w-2xl leading-relaxed">
                        {description}
                    </p>
                )}
            </div>

            {actions && (
                <div className="flex items-center gap-3">
                    {actions}
                </div>
            )}
        </header>
    );
}

interface PageHeaderProps {
    title: string;
    description?: string;
    actions?: React.ReactNode;
}
