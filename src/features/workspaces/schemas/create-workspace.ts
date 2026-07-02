import { z } from "zod";

export const createWorkSpaceSchema = z.object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
})

export type CreateWorkSpaceForm = z.infer<typeof createWorkSpaceSchema>