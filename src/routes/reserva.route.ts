import { z } from "zod";
import { FastifyPluginAsyncZod } from "@fastify/type-provider-zod";
import prisma from "@/src/prisma";

const ReservaSchema = z.object({
    id: z.string(),
    usuarioId: z.string(),
    imovelId: z.string(),
    dataCheckIn: z.string(),
    dataCheckOut: z.string(),
    valorTotal: z.number(),
    status: z.enum(["pendente", "confirmada", "cancelada", "concluida"]),
});

const ReservaQuerySchema = z.object({
    usuarioId: z.string(),
});

const reservasRoutes: FastifyPluginAsyncZod = async (fastify) => {
    // lista de reservas de um usuario
    fastify.get("/", {
        schema: {
            tags: ["reservas"],
            summary: "Lista reservas de um usuário",
            querystring: ReservaQuerySchema,
            response: { 200: ReservaSchema.array() },
        },
    }, async (request) => {
        const { usuarioId } = request.query;
        const reservas = await prisma.reserva.findMany({
            where: { usuarioId }
        });

        return reservas.map(r => ({
            ...r,
            dataCheckIn: r.dataCheckIn.toISOString(),
            dataCheckOut: r.dataCheckOut.toISOString(),
            status: r.status as "pendente" | "confirmada" | "cancelada" | "concluida"
        }));
    });
};

export default reservasRoutes;