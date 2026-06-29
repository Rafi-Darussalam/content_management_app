"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { GithubIcon } from "@/components/icons/github-icon";
import { Spinner } from "@/components/ui/spinner";

export function SignInGithub() {
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    await signIn.social(
      {
        provider: "github",
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
    <Button onClick={handleSignIn} className="flex-1" variant="outline">
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
