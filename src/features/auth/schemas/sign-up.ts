import { z } from "zod"

export const signupSchema = z.object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.email("Email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string("Konfirmasi password")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"]
})

export type SignupForm = z.infer<typeof signupSchema>