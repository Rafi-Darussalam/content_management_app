import { signOut } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function useLogout() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const logout = async () => {
        
        await signOut({
            fetchOptions: {
                onRequest: () => {
                    setLoading(true)
                },

                onError: (ctx) => {
                    setLoading(false)
                    setError(ctx.error.message)
                },

                onSuccess: () => {
                    setLoading(false)
                    router.push('/sign-in')
                }
            }
        })
    }

    return {loading, error, logout}
}