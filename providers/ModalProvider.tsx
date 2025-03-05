"use client";

import AuthModal from "@/components/AuthModal";
import React, { useState, useEffect } from "react";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // prevent the component from rendering on the server-side
    if (!isMounted) return null;

    return (
        <>
            <AuthModal />
        </>
    )
}

export default ModalProvider
