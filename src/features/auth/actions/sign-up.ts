"use server";

import { auth } from "@/lib/auth";
import { signupSchema } from "../schemas/sign-up";
import { headers } from "next/headers";
import { isAPIError } from "better-auth/api";

export async function signUp(formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const validate = signupSchema.safeParse(data);

  if (!validate.success) {
    return {
      success: false,
      message: "Data tidak valid",
    };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/dashboard"
      },
      headers: await headers(),
    });

    return {
      success: true,
      message: "Berhasil mambuat akun",
      email: data.email,
    };
  } catch (error) {
    if (isAPIError(error)) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Terjadi kesalahan",
    };
  }
}
