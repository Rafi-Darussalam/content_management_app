"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
2;
import { notFound, useSearchParams } from "next/navigation";
import { useAuth } from "./auth-context";
import { Spinner } from "@/components/ui/spinner";

export function VerifyEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const { user, isLoading } = useAuth();

  if (!email || user?.emailVerified) {
    notFound();
  }

  return (
    <section className="bg-background dark:bg-background min-h-screen flex items-center relative">
      <div className="py-10 md:py-20 max-w-lg px-4 sm:px-0 mx-auto w-full">
        {isLoading ? (
          <Spinner />
        ) : (
          <Card className="px-6 py-8 sm:p-12 relative">
            <CardHeader className="text-center gap-6 p-0">
              <div className="mx-auto"></div>
              <div className="flex flex-col gap-1">
                <CardTitle className="text-2xl font-medium text-card-foreground">
                  Verify your email
                </CardTitle>
                <CardDescription className="text-sm font-normal text-muted-foreground">
                  An activation link has been sent to your email address:{" "}
                  {email}. Please check your inbox and click on the link to
                  complete the activation process.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0 text-center">
              Didn&apos;t get the email?{" "}
              <a
                href="#"
                className="font-medium text-card-foreground no-underline!"
              >
                Resend
              </a>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
