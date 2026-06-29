"use client";
import { Button } from "@/components/ui/button";
import { useSocialLogin } from "../hooks/use-social-login";
import { GithubIcon } from "@/components/icons/github-icon";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import { toast } from "sonner";

export function SignInGithub() {
  const {error, login, loading} = useSocialLogin('github')

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return (
    <Button onClick={login} className="flex-1" variant="outline">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex gap-2">
          <GithubIcon /> <div>Github</div>
        </div>
      )}
    </Button>
  );
}
