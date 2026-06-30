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
    static async listarDatasIndisponiveis(request: FastifyRequest<{ Querystring: { imovelId: string } }>, reply: FastifyReply) {
        try {
            const { imovelId } = request.query;
            const datas = await ReservaService.listarDatasIndisponiveis(imovelId);
            return reply.status(200).send(datas);
        } catch (error: any) {
            return reply.status(500).send({ message: error.message || "Erro ao buscar datas indisponíveis" });
        }
    }

    static async listarPorProprietario(request: FastifyRequest, reply: FastifyReply) {
        try {
            const usuarioId = request.user.id;
            const reservas = await ReservaService.listarPorProprietario(usuarioId);
            return reply.status(200).send(reservas);
        } catch (error: any) {
            return reply.status(500).send({ message: error.message || "Erro ao buscar reservas do proprietário" });
        }
    }

    static async criarReserva(request: FastifyRequest<{ Body: { usuarioId: string, imovelId: string, dataCheckIn: string, dataCheckOut: string } }>, reply: FastifyReply) {
        try {
            const dados = request.body;
            const reserva = await ReservaService.criarReserva(dados);
            return reply.status(201).send(reserva);
        } catch (error: any) {
            return reply.status(500).send({ message: error.message || "Erro ao criar reserva" });
        }
    }
    static async atualizarStatus(request: FastifyRequest<{ Params: { id: string }, Body: { status: "confirmada" | "cancelada" } }>, reply: FastifyReply) {
        try {
            const { id } = request.params;
            const { status } = request.body;
            const usuarioLogadoId = request.user.id;
            
            const reserva = await ReservaService.atualizarStatus(id, usuarioLogadoId, status);
            return reply.status(200).send(reserva);
        } catch (error: any) {
            if (error.message === "Não autorizado") {
                return reply.status(403).send({ message: error.message });
            }
            if (error.message === "Reserva não encontrada") {
                return reply.status(404).send({ message: error.message });
            }
            return reply.status(500).send({ message: error.message || "Erro ao atualizar status da reserva" });
        }
    }
}
