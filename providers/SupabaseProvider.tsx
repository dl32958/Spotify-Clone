"use client";

import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { Database} from "@/database.types";

// provide supabase authentication context to the app and connect to the database
interface SupabaseProviderProps {
    children: React.ReactNode;
};

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
    // create a new Supabase client
    const [supabaseClient] = useState(() => 
        createClientComponentClient<Database>()
    );

    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    )
};

export default SupabaseProvider;