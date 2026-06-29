"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { signupSchema } from "../schemas/sign-up";
import { SignupForm } from "../schemas/sign-up";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUp } from "../actions/sign-up";
import { useState } from "react";
import { AuthResponse } from "../types";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link";

export function SignUpForm() {
    const [result, setResult] = useState<AuthResponse | null>(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: SignupForm) {
    setLoading(true)
    const data = new FormData()

    data.append("name", formData.name)
    data.append("email", formData.email)
    data.append("password", formData.password)
    data.append("confirmPassword", formData.confirmPassword)

    const res: AuthResponse = await signUp(data)

    if (res.success) {
      router.push(`verify-email?email=${encodeURIComponent(res.email!)}`)
    }

    setLoading(false)
  }

  return (
    <div>
      <div className="flex flex-col py-2">
        <h1 className="font-bold text-2xl tracking-wide">Sign up</h1>
        <p className="text-base text-muted-foreground">Buat akun anda</p>
      </div>

      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="gap-2">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="John"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
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
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
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
          {loading ? <Spinner /> : "Sign up"}
        </Button>
      </form>

      <p className="mt-8 text-muted-foreground text-sm text-center">
        Sudah punya akun{" "}
        <Link className="underline underline-offset-4 hover:text-primary" href="/sign-in">
          Sign in
        </Link>{" "}
      </p>
    </div>
  );
}
