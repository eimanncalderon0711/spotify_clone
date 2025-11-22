'use client'

import { Subscription, UserDetails } from "@/types";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { createSupabaseClient } from "@/utils/supabase/client";

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
    const supabase = createSupabaseClient();
    
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    
    // Initialize user and session
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                // Use getUser() instead of getSession() for security
                const { data: { user }, error } = await supabase.auth.getUser();
                
                if (!error && user) {
                    setUser(user);
                    
                    // Get session for access token
                    const { data: { session } } = await supabase.auth.getSession();
                    setAccessToken(session?.access_token ?? null);
                } else {
                    setUser(null);
                    setAccessToken(null);
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                setUser(null);
                setAccessToken(null);
            } finally {
                setIsLoadingUser(false);
            }
        };

        initializeAuth();

        // Listen for auth changes
        const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === 'SIGNED_IN' && session?.user) {
                    // Verify the user
                    const { data: { user } } = await supabase.auth.getUser();
                    setUser(user);
                    setAccessToken(session.access_token);
                } else if (event === 'SIGNED_OUT') {
                    setUser(null);
                    setAccessToken(null);
                    setUserDetails(null);
                    setSubscription(null);
                } else if (event === 'TOKEN_REFRESHED' && session) {
                    setAccessToken(session.access_token);
                }
            }
        );

        return () => {
            authSubscription.unsubscribe();
        };
    }, []);

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

        if(!user && !isLoadingUser && !isLoadingData){
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

export const useUser = () => {
    const context = useContext(UserContext);

    if(context === undefined) {
        throw new Error("useUser must be used within a UserContextProvider");
    }

    return context;
}