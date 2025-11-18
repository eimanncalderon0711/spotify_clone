import { Subscription, UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { createContext, useEffect, useState } from "react";

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props{
    [propName: string]: any;
}

export const UserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext();

    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    
    const getUserDetails = () => {
        return supabase.from('users').select('*').single();
    };
    const getSubscription = () => {
        return supabase.from('subscription')
        .select('*, prices(*, products(*))')
        .in('status', ['trialing', 'active'])
        .single();
    };

    useEffect(() => {
        if(user && !isLoadingData && !userDetails && !subscription){
            setIsLoadingData(true);

            Promise.allSettled([getUserDetails(), getSubscription()])
            .then((results) => {
                const userDetailsResponse = results[0];
                const subscriptionResponse = results[1];

                if(userDetailsResponse.status === "fulfilled"){
                    setUserDetails(userDetailsResponse.value.data as UserDetails);
                }

                if(subscriptionResponse.status === "fulfilled"){
                    setSubscription(subscriptionResponse.value.data as Subscription);
                }

                setIsLoadingData(false);
            })
        }

        if(!user && !isLoadingUser && isLoadingData){
            setUserDetails(null);
            setSubscription(null);
        }
    },[user, isLoadingUser])

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingData || isLoadingUser,
        subscription
    }
    
    return <UserContext.Provider value={value} {...props}/>
}