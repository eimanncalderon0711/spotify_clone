import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { twMerge } from 'tailwind-merge';

type SideBarItemProps = {
    icon: LucideIcon;
    label: string;
    active?: boolean;
    href: string;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
    icon: Icon,
    label,
    active,
    href
}) => {
  return (
    <Link
        href={href}
        className={twMerge(`
            flex
            flex-row
            h-auto
            items-center
            w-full
            gap-x-4
            font-medium
            cursor-pointer
            hover:text-white
            transition
            text-neutral-500
            p-2
            `,
            active && "text-white"
        )}
    >
        <Icon size={26}/>
        <p className='w-full truncate'>{label}</p>
    </Link>
  )
}

export default SideBarItem