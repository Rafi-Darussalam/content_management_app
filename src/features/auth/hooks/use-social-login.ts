import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function useSocialLogin(provider: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter()

  const login = async () => {
    await signIn.social(
      {
        provider,
        callbackURL: '/dashboard'
      },
      {
        onRequest: () => {
          setLoading(true);
        },

        onSucess: () => {
          setLoading(false),
          router.push('/dashboard')
        },

        onError: (ctx) => {
          (setLoading(false), setError(ctx.error.message));
        },
      },
    );
  };

  return {loading, error, login}
}
