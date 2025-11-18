'use client';

import Box from '@/components/Box';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react'
import { House, Library, Search } from 'lucide-react';
import SideBarItem from '@/components/SideBarItem';
import SongLibrary from '@/components/SongLibrary';

type SideBarProps = {
    children: React.ReactNode;
}

const Sidebar: React.FC<SideBarProps> = ({children}) => {
  
  const pathName = usePathname();

  const routes = useMemo(() => [
        {
            icon: House,
            label: 'Home',
            active: pathName !== '/search',
            href: '/',
        },

        {
            icon: Search,
            label: 'Search',
            active: pathName === '/search',
            href: '/search',
        },
    ], [pathName])

  return (
    <div className="flex h-full">
        <div 
            className="
                hidden 
                md:flex
                flex-col
                gap-y-2
                bg-black
                h-full
                w-[300px]
                p-2
            "
        >
            <Box>
                <div>
                    {routes.map((item, index) => (
                        <SideBarItem
                            key={index}
                            {...item}
                        />
                    ))}
                </div>
            </Box>
            <Box classname='h-full overflow-y-auto'>
                <SongLibrary/>
            </Box>
        </div>
        <main className='h-full flex-1 overflow-y-auto p-2'>
            {children}
        </main>
    </div>
  )
}

export default Sidebar