'use client';

import Button from '@/components/Button';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { ChevronLeft, ChevronRight, Home, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaUserAlt } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

type HeaderProps = {
    children: React.ReactNode;
    classname?: string;
}

const Header: React.FC<HeaderProps> = ({children, classname}) => {
    const {onOpen} = useAuthModal();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const {user} = useUser();


  const handleLogout = async () => {
    //Handle Logout in the future
    const {error} = await supabaseClient.auth.signOut();

    router.refresh();

    if(error){
        console.log(error)
    }
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

            {user ? (
                <div className='flex gap-4 items-center'>
                    <Button onClick={handleLogout} className='bg-white px-6 py-2'>
                        Logout
                    </Button>
                    <Button onClick={() => router.push('/account')} className='bg-white'>
                        <FaUserAlt/>
                    </Button>
                </div>
            ) : (
            <>
                <div className='flex justify-between items-center gap-x-4'>
                    <>
                        <div>
                            <Button onClick={onOpen} className='bg-transparent text-neutral-300'>
                                Sign Up
                            </Button>
                        </div>
                        <div>
                            <Button onClick={onOpen} className='bg-white px-6 py-2 '>
                                Login
                            </Button>
                        </div>
                    </>
                </div>
            </>)}
        </div>
        {children}
    </div>
  )
}

export default Header