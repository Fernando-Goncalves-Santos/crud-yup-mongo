import * as z from "zod";

export const UserZodSchema = z.object({
  name: z.string().trim().max(15, "nome grande demais oO"),
  email: z.email(),
  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/^9[0-9]+$/, "")),
  password: z.string().trim().min(8).max(20),
});
