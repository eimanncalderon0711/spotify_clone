"use client"

import React from 'react'
import {Database} from '@/database.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

type SupabaseProviderProps = {
    children: React.ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({children}) => {
  const [supabaseClient] = React.useState(() => createClientComponentClient<Database>());
  return (
    <SessionContextProvider supabaseClient={supabaseClient as any}>
      {children}
    </SessionContextProvider>
  )
}

export default SupabaseProvider