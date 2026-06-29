"use client";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Spinner } from "@/components/ui/spinner";
import { useSocialLogin } from "../hooks/use-social-login";
import { useEffect } from "react";
import { toast } from "sonner";

export function SignInGoggle() {
  const {loading, error, login} = useSocialLogin('google')

  useEffect(() => {
    if (error) {
        toast.error(error)
    }
  }, [error])

  return (
    <Button onClick={login} className="flex flex-1" variant='outline'>
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
