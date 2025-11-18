'use client'

import { Play } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { GrPlayFill } from 'react-icons/gr';

type ListItemProps = {
    image?: string;
    name: string;
    href: string;
}

const ListItem: React.FC<ListItemProps> = ({image, name, href}) => {
  const router = useRouter();
  
  const onClick = () => {
    // add authentication before push
    router.push(href);
  }
    return (
    <button onClick={onClick} className='relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4'>
        <div className='relative min-h-16 min-w-16'>
            <Image className='object-fit-cover' fill src={image ?? '/images/liked.png'} alt='Image'/>
        </div>
        <p className='font-semibold truncate'>{name}</p>
        <div className='absolute flex justify-center items-center transition opacity-0 rounded-full bg-green-500 p-3 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110'>
            <GrPlayFill className='text-black text-center'/>
        </div>
    </button>
  )
}

export default ListItem