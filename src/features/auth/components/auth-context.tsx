"use client"

import { createContext, useContext } from "react"
import { useSession } from "@/lib/auth-client"
import { AuthContextType } from "../types"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({
    children
}: {
    children: React.ReactNode
}) {
    const { data, isPending, error, refetch } = useSession()

    const value = {
        user: data?.user,
        isLoggedIn: !!data?.user,
        isLoading: isPending,
        error,
        refetch
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within AuthProvider")
    }
    return context
}