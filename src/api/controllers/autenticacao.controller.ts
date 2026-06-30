import { FastifyRequest, FastifyReply } from "fastify";
import { AutenticacaoService } from "../services/autenticacao.service";
import { z } from "zod";
import { LoginSchema } from "../schemas/autenticacao.schema";

export class AutenticacaoController {
    static async login(request: FastifyRequest<{ Body: z.infer<typeof LoginSchema> }>, reply: FastifyReply) {
        try {
            const { usuario, id } = await AutenticacaoService.login(request.body);
            
            const token = request.server.jwt.sign({ id });

            reply.setCookie('auth_token', token, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7 // 7 dias
            });

            return reply.status(200).send(usuario);
        } catch (error: any) {
            return reply.status(401).send({ message: error.message || "Não autorizado" });
        }
    }

    static async me(request: FastifyRequest, reply: FastifyReply) {
        try {
            const token = request.cookies.auth_token;
            if (!token) {
                return reply.status(401).send({ message: "Não autorizado" });
            }
            
            const decoded = request.server.jwt.verify<{id: string}>(token);

            const usuario = await AutenticacaoService.getUsuarioPorId(decoded.id);

            return reply.status(200).send(usuario);
        } catch (error) {
            return reply.status(401).send({ message: "Token inválido ou expirado" });
        }
    }

    static async logout(request: FastifyRequest, reply: FastifyReply) {
        reply.clearCookie('auth_token', { path: '/' });
        return reply.status(200).send({ message: "Logout realizado com sucesso" });
    }
}
