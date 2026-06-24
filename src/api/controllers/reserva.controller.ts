import { FastifyRequest, FastifyReply } from "fastify";
import { ReservaService } from "../services/reserva.service";

export class ReservaController {
    static async listarPorUsuario(request: FastifyRequest<{ Querystring: { usuarioId: string } }>, reply: FastifyReply) {
        try {
            const { usuarioId } = request.query;
            const reservas = await ReservaService.listarPorUsuario(usuarioId);
            return reply.status(200).send(reservas);
        } catch (error: any) {
            return reply.status(500).send({ message: error.message || "Erro ao buscar reservas" });
        }
    }
}
