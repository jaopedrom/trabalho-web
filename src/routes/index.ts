// exportacao de rotas
import type { FastifyInstance } from "fastify";
import imoveisRoutes from "./imovel.route";
import reservasRoutes from "./reserva.route";
import usuariosRoutes from "./usuario.route";
import autenticacaoRoutes from "./autenticacao.route";

export async function registerRoutes(fastify: FastifyInstance) {
    fastify.register(imoveisRoutes, { prefix: "/imoveis" });
    fastify.register(reservasRoutes, { prefix: "/reservas" });
    fastify.register(usuariosRoutes, { prefix: "/usuarios" });
    fastify.register(autenticacaoRoutes, { prefix: "/autenticacao" });
}