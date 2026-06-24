import prisma from "@/src/prisma";
import { z } from "zod/v4";
import { LoginSchema } from "../schemas/autenticacao.schema";

export class AutenticacaoService {
    static async login(dados: z.infer<typeof LoginSchema>) {
        const { cpf, senha } = dados;

        const usuario = await prisma.usuario.findFirst({
            where: {
                cpf,
                senha,
            },
        });

        if (!usuario) {
            throw new Error("CPF ou senha incorretos");
        }

        const { senha: _, ...dadosPublicos } = usuario;
        return { usuario: dadosPublicos, id: usuario.id };
    }

    static async getUsuarioPorId(id: string) {
        const usuario = await prisma.usuario.findUnique({
            where: { id }
        });

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        const { senha: _, ...dadosPublicos } = usuario;
        return dadosPublicos;
    }
}
