"use client";

import { Button } from "@/components/ui/button";
import { AuthDivider } from "./auth-divider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { signinSchema } from "../schemas/sign-in";
import { SigninForm } from "../schemas/sign-in";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signIn } from "../actions/sign-in";
import { useEffect, useState } from "react";
import { AuthResponse } from "../types";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { SignInGoggle } from "./sign-in-goggle";
import { SignInGithub } from "./sign-in-github";
import { toast } from "sonner";

export function SignInForm() {
  const [result, setResult] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if (result && result?.success) {
        toast.success(result?.message)
      }
  
      if (result && !result?.success) {
        toast.error(result?.message)
      }
    }, [result])

  const router = useRouter();

  const form = useForm<SigninForm>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: SigninForm) {
    setLoading(true);
    const data = new FormData();

    data.append("email", formData.email);
    data.append("password", formData.password);

    const res: AuthResponse = await signIn(data);

    if (res.success) {
      router.push('/dashboard')
    }

    setResult(res)

    setLoading(false);
  }

  return (
    <div>
      <div className="flex flex-col py-2">
        <h1 className="font-bold text-2xl tracking-wide">Sign in</h1>
        <p className="text-base text-muted-foreground">Masuk ke akun anda</p>
      </div>

      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="gap-2">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="john@email.example"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="********"
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button className="w-full" type="submit">
          {loading ? <Spinner /> : "Sign in"}
        </Button>
      </form>

      <div className="py-4">
        <AuthDivider>ATAU</AuthDivider>
      </div>

      <div className="flex gap-2">
        <SignInGoggle />
        <SignInGithub />
      </div>

      <p className="mt-8 text-muted-foreground text-sm text-center">
        Belum punya akun?{" "}
        <Link
          className="underline underline-offset-4 hover:text-primary"
          href="/sign-up"
        >
          Sign up
        </Link>{" "}
      </p>
    </div>
  );
}
