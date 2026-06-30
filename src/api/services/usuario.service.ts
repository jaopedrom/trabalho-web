import prisma from "@/src/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { UsuarioCreateSchema, UsuarioUpdateSchema } from "../schemas/usuario.schema";

export class UsuarioService {
    static async criar(dados: z.infer<typeof UsuarioCreateSchema>) {
        // verifica se ja existe um usuario com este email ou cpf
        const usuarioExistente = await prisma.usuario.findFirst({
            where: {
                OR: [
                    { email: dados.email },
                    { cpf: dados.cpf }
                ]
            }
        });

        if (usuarioExistente) {
            throw new Error("E-mail ou CPF já cadastrados.");
        }

        const hashSenha = await bcrypt.hash(dados.senha, 10);

        const novoUsuario = await prisma.usuario.create({
            data: {
                ...dados,
                senha: hashSenha,
            },
        });

        const { senha, ...dadosPublicos } = novoUsuario;
        return dadosPublicos;
    }

    static async buscarPorId(id: string) {
        const usuario = await prisma.usuario.findUnique({ where: { id } });

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        const { senha, ...dadosPublicos } = usuario;
        return dadosPublicos;
    }

    static async atualizar(id: string, dados: z.infer<typeof UsuarioUpdateSchema>) {
        const dadosParaAtualizar = { ...dados };
        if (dadosParaAtualizar.senha) {
            dadosParaAtualizar.senha = await bcrypt.hash(dadosParaAtualizar.senha, 10);
        }

        const usuarioAtualizado = await prisma.usuario.update({
            where: { id },
            data: dadosParaAtualizar,
        });

        const { senha, ...dadosPublicos } = usuarioAtualizado;
        return dadosPublicos;
    }

    static async deletar(id: string) {
        // pegar todos os imoveis do usuario para poder deletar as reservas atreladas a eles
        const userProperties = await prisma.imovel.findMany({
            where: { usuarioId: id },
            select: { id: true }
        });
        const propertyIds = userProperties.map((p) => p.id);

        await prisma.$transaction([
            // deleta reservas vinculadas aos imoveis do usuario
            prisma.reserva.deleteMany({ where: { imovelId: { in: propertyIds } } }),
            // deleta reservas feitas pelo usuario
            prisma.reserva.deleteMany({ where: { usuarioId: id } }),
            // deleta os imoveis do usuario
            prisma.imovel.deleteMany({ where: { usuarioId: id } }),
            // deleta o usuario
            prisma.usuario.delete({ where: { id } })
        ]);
    }
}
