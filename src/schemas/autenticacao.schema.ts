import { z } from "zod";

export const LoginSchema = z.object({
    cpf: z.string(),
    senha: z.string(),
});

export type LoginType = z.infer<typeof LoginSchema>;
