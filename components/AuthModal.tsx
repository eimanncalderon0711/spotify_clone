'use client'

import Modal from '@/components/Modal'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import useAuthModal from '@/hooks/useAuthModal'
import { useSupabase } from '@/providers/SupabaseProvider'
import { useUser } from '@/hooks/useUser'
import { createSupabaseClient } from '@/utils/supabase/client'

const AuthModal = () => {
  const supabase = createSupabaseClient()
  const router = useRouter()
  const { user } = useUser()
  const { isOpen, onClose } = useAuthModal()

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  useEffect(() => {
    if (user) {
      router.refresh()
      onClose()
    }
  }, [user, onClose, router])

  return (
    <Modal
      title="Welcome Back!"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        providers={['github', 'facebook', 'google']}
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22C55E',
              },
            },
          },
        }}
      />
    </Modal>
  )
}

export default AuthModal