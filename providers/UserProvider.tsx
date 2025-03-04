"use client";

import { MyUserContextProvider } from "@/hooks/useUser";

interface UserProvidorProps {
    children: React.ReactNode;
};

// UserProvider hook is used to encapsulate the MyUserContextProvider hook
const UserProvider: React.FC<UserProvidorProps> = ({ children }) => {
    return (
        <MyUserContextProvider>
            {children}
        </MyUserContextProvider>
    )
};

export default UserProvider;