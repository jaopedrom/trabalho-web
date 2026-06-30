import fp from 'fastify-plugin';
import { FastifyRequest, FastifyReply } from 'fastify';

export default fp(async (fastify) => {
    fastify.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            const token = request.cookies.auth_token;
            if (!token) {
                return reply.status(401).send({ message: "Não autorizado: Token não encontrado" });
            }

            const decoded = request.server.jwt.verify<{ id: string }>(token);
            request.user = decoded;
        } catch (err) {
            return reply.status(401).send({ message: "Não autorizado: Token inválido ou expirado" });
        }
    });
});

declare module '@fastify/jwt' {
    interface FastifyJWT {
        user: { id: string };
    }
}

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: any;
    }
}
