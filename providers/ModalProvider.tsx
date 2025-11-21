'use client';

import Modal from '@/components/Modal';
import React, { useEffect, useState } from 'react'

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
      <Modal title="test modal" description="modal descritpion" isOpen onChange={() => {}}>
        Testing Body Modal
      </Modal>
    </>
  )
}

export default ModalProvider