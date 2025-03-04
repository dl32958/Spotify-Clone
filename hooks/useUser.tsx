import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

import { UserDetails, Subscription } from "@/types";

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export interface Props {
    [propName: string]: any;
};

export const MyUserContextProvider = (props: Props) => {
    const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext();
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    const getUserDetails = () => supabase.from('users').select('*').single();
    // only select active or trialing subscriptions
    const getSubscription = () =>
        supabase
            .from('subscriptions')
            .select('*, prices(*, products(*))')
            .in('status', ['active', 'trialing'])
            .single();

    useEffect(() => {
        // if user is already logged in and is not currently loading data and have not loaded userDetails & subscription:
        if (user && !isLoadingData && !userDetails && !subscription) {
            // start loading data
            setIsLoadingData(true);

            Promise.allSettled([getUserDetails(), getSubscription()])
                .then((results) => {
                    const userDetailsPromise = results[0];
                    const subscriptionPromise = results[1];

                    if (userDetailsPromise.status === 'fulfilled') {
                        setUserDetails(userDetailsPromise.value.data as UserDetails);
                    }
                    if (subscriptionPromise.status === 'fulfilled') {
                        setSubscription(subscriptionPromise.value.data as Subscription);
                    }

                    setIsLoadingData(false);
                }
                );
        // if user logged out: clean up userDetails & subscription
        } else if (!user && !isLoadingUser && !isLoadingData) {
            setUserDetails(null);
            setSubscription(null);
        }
    }, [user, isLoadingUser]);

    // pass values to the UserContext
    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription,
    };

    // use the UserContext.Provider to wrap the children components and pass the value of UserContext to them
    // UserContext.Provider allows the children components to consume the values of UserContext
    // {...props} 会把 MyUserContextProvider 组件接收到的所有 props 传递给 UserContext.Provider。
    return <UserContext.Provider value={value} {...props} />
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a MyUserContextProvider');
    }
    return context;
};