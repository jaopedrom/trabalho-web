import { z } from "zod";

export const UsuarioSchema = z.object({
    id: z.string(),
    nome: z.string(),
    email: z.string(),
    telefone: z.string(),
    cpf: z.string(),
});

export const UsuarioUpdateSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido."),
    telefone: z.string().min(10, "Telefone inválido (mínimo de 10 dígitos)."),
    cpf: z.string().min(11, "CPF inválido (mínimo de 11 dígitos)."),
    senha: z.string().min(8, "Senha deve conter no mínimo 8 caracteres"),
});

export const UsuarioCreateSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido."),
    telefone: z.string().min(10, "Telefone inválido (mínimo de 10 dígitos)."),
    cpf: z.string().min(11, "CPF inválido (mínimo de 11 dígitos)."),
    senha: z.string().min(8, "Senha deve conter no mínimo 8 caracteres"),
});

export const LoginSchema = z.object({
    cpf: z.string().min(11, "CPF inválido (mínimo de 11 dígitos)."),
    senha: z.string().min(8, "Senha deve conter no mínimo 8 caracteres"),
});

export type UsuarioPublico = z.infer<typeof UsuarioSchema>;
export type UsuarioUpdate = z.infer<typeof UsuarioUpdateSchema>;
export type UsuarioCreate = z.infer<typeof UsuarioCreateSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;