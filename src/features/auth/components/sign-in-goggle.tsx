"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Spinner } from "@/components/ui/spinner";

export function SignInGoggle() {
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    await signIn.social(
      {
        provider: "google",
      },
      {
        onRequest: () => {
          setLoading(true);
        },

        onSuccess: () => {
          setLoading(false);
        },

        onError: () => {
          setLoading(false);
        },
      },
    );
  }

  return (
    <Button onClick={handleSignIn} className="flex flex-1" variant='outline'>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex gap-2">
          <GoogleIcon /> <div>Google</div>
        </div>
      )}
    </Button>
  );
}
