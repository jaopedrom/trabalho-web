import { FastifyInstance } from "fastify";
import imoveisRoutes from "./imovel.route";
import usuariosRoutes from "./usuario.route";
import reservasRoutes from "./reserva.route";
import autenticacaoRoutes from "./autenticacao.route";

export const registerRoutes = (fastify: FastifyInstance) => {
    fastify.register(imoveisRoutes, { prefix: "/imoveis" });
    fastify.register(usuariosRoutes, { prefix: "/usuarios" });
    fastify.register(reservasRoutes, { prefix: "/reservas" });
    fastify.register(autenticacaoRoutes, { prefix: "/autenticacao" });
};
