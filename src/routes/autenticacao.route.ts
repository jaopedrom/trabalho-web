import { z } from "zod";
import { FastifyPluginAsyncZod } from "@fastify/type-provider-zod";
import prisma from "@/src/prisma";
import { LoginSchema } from "@/src/schemas/autenticacao.schema";
import { UsuarioSchema } from "@/src/schemas/usuario.schema";

const autenticacaoRoutes: FastifyPluginAsyncZod = async (fastify) => {
    fastify.post("/login", {
        schema: {
            tags: ["autenticacao"],
            summary: "Autentica um usuário",
            body: LoginSchema,
            response: {
                200: UsuarioSchema,
                401: z.object({ message: z.string() }),
            },
        },
    }, async (request, reply) => {
        const { cpf, senha } = request.body;

        const usuario = await prisma.usuario.findFirst({
            where: {
                cpf,
                senha,
            },
        });

        if (!usuario) {
            return reply.status(401).send({ message: "CPF ou senha incorretos" });
        }

        const token = fastify.jwt.sign({ id: usuario.id });
        const { senha: _, ...dadosPublicos } = usuario;

        reply.setCookie('auth_token', token, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 7 dias
        });

        return reply.status(200).send(dadosPublicos);
    });

    fastify.get("/me", {
        schema: {
            tags: ["autenticacao"],
            summary: "Retorna o usuário logado com base no cookie de sessão",
            response: {
                200: UsuarioSchema,
                401: z.object({ message: z.string() }),
            },
        },
    }, async (request, reply) => {
        try {
            const token = request.cookies.auth_token;
            if (!token) {
                return reply.status(401).send({ message: "Não autorizado" });
            }
            
            const decoded = fastify.jwt.verify<{id: string}>(token);

            const usuario = await prisma.usuario.findUnique({
                where: { id: decoded.id }
            });

            if (!usuario) {
                return reply.status(401).send({ message: "Usuário não encontrado" });
            }

            const { senha: _, ...dadosPublicos } = usuario;
            return reply.status(200).send(dadosPublicos);
        } catch (error) {
            return reply.status(401).send({ message: "Token inválido ou expirado" });
        }
    });

    fastify.post("/logout", {
        schema: {
            tags: ["autenticacao"],
            summary: "Encerra a sessão do usuário (remove o cookie)",
            response: {
                200: z.object({ message: z.string() }),
            },
        },
    }, async (request, reply) => {
        reply.clearCookie('auth_token', { path: '/' });
        return reply.status(200).send({ message: "Logout realizado com sucesso" });
    });
};

export default autenticacaoRoutes;
