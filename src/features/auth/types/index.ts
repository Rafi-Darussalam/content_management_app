import type { User } from "better-auth"

export interface AuthResponse {
    success: boolean,
    message: string,
    email?: string
}

export interface AuthContextType {
    user: User | undefined,
    isLoggedIn: boolean,
    isLoading: boolean,
    error: Error | null,
    refetch: () => void
}