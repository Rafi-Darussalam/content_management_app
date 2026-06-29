"use server";

import { auth } from "@/lib/auth";
import { signinSchema } from "../schemas/sign-in";
import { headers } from "next/headers";
import { isAPIError } from "better-auth/api";

export async function signIn(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validate = signinSchema.safeParse(data);

  if (!validate.success) {
    return {
      success: false,
      message: "Data tidak valid",
    };
  }

  try {
    await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
        callbackURL: "/dashboard"
      },
      headers: await headers(),
    });

    return {
      success: true,
      message: "Berhasil masuk",
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
