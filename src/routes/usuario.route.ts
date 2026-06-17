import { z } from "zod";
import { FastifyPluginAsyncZod } from "@fastify/type-provider-zod";
import prisma from "@/src/prisma";
import { UsuarioSchema, UsuarioUpdateSchema, UsuarioCreateSchema } from "@/src/schemas/usuario.schema";

const usuariosRoutes: FastifyPluginAsyncZod = async (fastify) => {
    // cria um novo usuario
    fastify.post("/", {
        schema: {
            tags: ["usuarios"],
            summary: "Cria um novo usuário",
            body: UsuarioCreateSchema,
            response: {
                201: UsuarioSchema,
                400: z.object({ message: z.string() }),
            },
        },
    }, async (request, reply) => {
        try {
            // verifica se ja existe um usuario com este email ou cpf
            const usuarioExistente = await prisma.usuario.findFirst({
                where: {
                    OR: [
                        { email: request.body.email },
                        { cpf: request.body.cpf }
                    ]
                }
            });

            if (usuarioExistente) {
                return reply.status(400).send({ message: "E-mail ou CPF já cadastrados." });
            }

            const novoUsuario = await prisma.usuario.create({
                data: request.body,
            });

            const { senha, ...dadosPublicos } = novoUsuario;
            return reply.status(201).send(dadosPublicos);
        } catch (error) {
            return reply.status(400).send({ message: "Erro ao criar usuário" });
        }
    });

    // busca usuario por id
    fastify.get("/:id", {
        schema: {
            tags: ["usuarios"],
            summary: "Busca um usuário pelo ID",
            params: z.object({ id: z.string() }),
            response: {
                200: UsuarioSchema,
                404: z.object({ message: z.string() }),
            },
        },
    }, async (request, reply) => {
        const { id } = request.params;
        const usuario = await prisma.usuario.findUnique({ where: { id } });

        if (!usuario) {
            return reply.status(404).send({ message: "Usuário não encontrado" });
        }

        const { senha, ...dadosPublicos } = usuario;
        return dadosPublicos;
    });

    // atualiza usuario
    fastify.put("/:id", {
        schema: {
            tags: ["usuarios"],
            summary: "Atualiza dados de um usuário",
            params: z.object({ id: z.string() }),
            body: UsuarioUpdateSchema,
            response: {
                200: UsuarioSchema,
                404: z.object({ message: z.string() }),
            },
        },
    }, async (request, reply) => {
        const { id } = request.params;

        try {
            const usuarioAtualizado = await prisma.usuario.update({
                where: { id },
                data: request.body,
            });

            const { senha, ...dadosPublicos } = usuarioAtualizado;
            return dadosPublicos;
        } catch (error) {
            return reply.status(404).send({ message: "Usuário não encontrado" });
        }
    });
    // deleta usuario
    fastify.delete("/:id", {
        schema: {
            tags: ["usuarios"],
            summary: "Deleta um usuário",
            params: z.object({ id: z.string() }),
            response: {
                204: z.null(),
                404: z.object({ message: z.string() }),
                500: z.object({ message: z.string() }),
            },
        },
    }, async (request, reply) => {
        const { id } = request.params;

        try {
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

            return reply.status(204).send(null);
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            return reply.status(500).send({ message: "Erro ao deletar usuário ou usuário não encontrado" });
        }
    });
};

export default usuariosRoutes;