"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createWorkSpaceSchema } from "../schemas/create-workspace";
import { v4 as uuidv4 } from "uuid";
import { isAPIError } from "better-auth/api";
import { requireAuth } from "@/lib/auth-guard";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createWorkspace(formData: FormData) {
  await requireAuth()
  const data = {
    name: formData.get("name") as string,
  };

  const validate = createWorkSpaceSchema.safeParse(data);

  if (!validate.success) {
    return {
      success: false,
      message: "Data tidak valid",
    };
  }

  try {
    await auth.api.createOrganization({
      body: {
        name: data.name,
        slug: uuidv4(),
      },

      headers: await headers(),
    });

    return {
      success: true,
      message: "Workspace berhasil dibuat",
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
