import { FastifyPluginAsyncZod } from "@fastify/type-provider-zod";
import { ReservaController } from "../controllers/reserva.controller";
import { ReservaSchema, ReservaQuerySchema, DatasIndisponiveisQuerySchema, CriarReservaSchema, AtualizarStatusReservaParamsSchema, AtualizarStatusReservaBodySchema } from "../schemas/reserva.schema";

const reservasRoutes: FastifyPluginAsyncZod = async (fastify) => {
    // lista de reservas de um usuario
    fastify.get("/", {
        preValidation: [fastify.authenticate],
        schema: {
            tags: ["reservas"],
            summary: "Lista reservas de um usuário",
            querystring: ReservaQuerySchema,
            response: { 200: ReservaSchema.array() },
        },
    }, ReservaController.listarPorUsuario);

    // datas indisponiveis de um imovel
    fastify.get("/indisponiveis", {
        schema: {
            tags: ["reservas"],
            summary: "Lista datas indisponíveis de um imóvel",
            querystring: DatasIndisponiveisQuerySchema,
        },
    }, ReservaController.listarDatasIndisponiveis);

    // lista reservas dos imoveis de um proprietario
    fastify.get("/proprietario", {
        preValidation: [fastify.authenticate],
        schema: {
            tags: ["reservas"],
            summary: "Lista reservas dos imóveis de um proprietário",
            response: { 200: ReservaSchema.array() },
        },
    }, ReservaController.listarPorProprietario);

    // criar uma reserva
    fastify.post("/", {
        preValidation: [fastify.authenticate],
        schema: {
            tags: ["reservas"],
            summary: "Cria uma nova reserva",
            body: CriarReservaSchema,
        },
    }, ReservaController.criarReserva);

    // atualizar status de uma reserva
    fastify.patch("/:id/status", {
        preValidation: [fastify.authenticate],
        schema: {
            tags: ["reservas"],
            summary: "Atualiza o status de uma reserva",
            params: AtualizarStatusReservaParamsSchema,
            body: AtualizarStatusReservaBodySchema,
            response: { 200: ReservaSchema },
        },
    }, ReservaController.atualizarStatus);
};

export default reservasRoutes;
