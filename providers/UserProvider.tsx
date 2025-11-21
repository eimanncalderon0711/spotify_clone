'use client';

import { UserContextProvider } from "@/hooks/useUser";

type UserProviderProps = {
    children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  return (
    <UserContextProvider>
        {children}
    </UserContextProvider>
  )
}

export default UserProvider