'use client';

import { motion } from 'framer-motion';

interface LogoProps {
    size?: number;
    className?: string;
    animated?: boolean;
}

export function Logo({ size = 24, className = '', animated = false }: LogoProps) {
    const logoVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    const LogoSVG = () => (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Minimalist geometric forge/anvil design */}
            <path
                d="M4 20h16M6 20v-8l6-4 6 4v8M12 8V4M9 4h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <rect
                x="8"
                y="12"
                width="8"
                height="4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

    if (animated) {
        return (
            <motion.div variants={logoVariants} initial="hidden" animate="visible">
                <LogoSVG />
            </motion.div>
        );
    }

    return <LogoSVG />;
}
