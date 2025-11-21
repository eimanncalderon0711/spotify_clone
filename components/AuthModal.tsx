'use client';

import Modal from '@/components/Modal';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import useAuthModal from '@/hooks/useAuthModal';

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const {session} = useSessionContext();

  const {isOpen, onClose} = useAuthModal();

  const onChange = (open: boolean) => {
    if(!open){
      onClose();
    }
  }

  useEffect(() => {
    if(session){
      router.refresh();
      onClose();
    }
  },[session, onClose, router])

  return (
    <Modal title='Welcome Back!' description='Login to your account' isOpen={isOpen} onChange={onChange}>
        <Auth theme='dark'
              providers={['github', 'facebook', 'google']}
              supabaseClient={supabaseClient} 
              appearance={{
                          theme:ThemeSupa, 
                          variables: 
                            {
                              default:{
                                colors:{
                                  brand:'#404040',
                                  brandAccent: '#22C55E'
                                  }
                              }
                            }
                          }}
          />
    </Modal>
  )
}

export default AuthModal