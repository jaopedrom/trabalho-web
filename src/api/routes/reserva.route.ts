import { FastifyPluginAsyncZod } from "@fastify/type-provider-zod";
import { ReservaController } from "../controllers/reserva.controller";
import { ReservaSchema, ReservaQuerySchema } from "../schemas/reserva.schema";

const reservasRoutes: FastifyPluginAsyncZod = async (fastify) => {
    // lista de reservas de um usuario
    fastify.get("/", {
        schema: {
            tags: ["reservas"],
            summary: "Lista reservas de um usuário",
            querystring: ReservaQuerySchema,
            response: { 200: ReservaSchema.array() },
        },
    }, ReservaController.listarPorUsuario);
};

export default reservasRoutes;
