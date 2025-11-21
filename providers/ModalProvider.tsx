'use client';

import AuthModal from '@/components/AuthModal';
import { useEffect, useState } from 'react'

const ModalProvider = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    setIsOpen(true);
  },[])


  if(!isOpen){
    return null;
  }

  return (
    <>
      <AuthModal/>
    </>
  )
}

export default ModalProvider