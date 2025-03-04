"use client";

import { MyUserContextProvider } from "@/hooks/useUser";

interface UserProvidorProps {
    children: React.ReactNode;
};

const UserProvider: React.FC<UserProvidorProps> = ({ children }) => {
    return (
        <MyUserContextProvider>
            {children}
        </MyUserContextProvider>
    )
};

export default UserProvider;