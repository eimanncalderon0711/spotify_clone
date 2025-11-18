'use client';

import Button from '@/components/Button';
import { ChevronLeft, ChevronRight, Home, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { twMerge } from 'tailwind-merge';

type HeaderProps = {
    children: React.ReactNode;
    classname?: string;
}

const Header: React.FC<HeaderProps> = ({children, classname}) => {
  const router = useRouter();

  const handleLogout = () => {
    //Handle Logout in the future
  }
  return (
    <div className={twMerge(`h-fit bg-linear-to-b from-emerald-800 p-6`, classname)}>

        {/* for larger screen */}
        <div className='w-full mb-4 flex items-center justify-between'>
            <div className='hidden md:flex gap-x-2 items-center'>
                <button onClick={() => router.back()} className='rounded-full cursor-pointer bg-black flex p-1 items-center justify-center hover:opacity-65 transition'>
                    <ChevronLeft className='text-white' size={26}/> 
                </button>
                <button onClick={() => router.forward()} className='rounded-full cursor-pointer bg-black flex p-1 items-center justify-center hover:opacity-65 transition'>
                    <ChevronRight className='text-white' size={26}/> 
                </button>
            </div>

            {/* for small screen */}
            <div className='flex md:hidden gap-x-2 items-center'>
                <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-65'>
                    <Home className='text-black' size={20}/>
                </button>
                <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-65'>
                    <Search className='text-black' size={20}/>
                </button>
            </div>

            <div className='flex justify-between items-center gap-x-4'>
                <>
                    <div>
                        <Button className='bg-transparent text-neutral-300'>
                            Sign Up
                        </Button>
                    </div>
                    <div>
                        <Button className='bg-white px-6 py-2 '>
                            Login
                        </Button>
                    </div>
                </>
            </div>
        </div>
        {children}
    </div>
  )
}

export default Header