import { FastifyRequest, FastifyReply } from "fastify";
import { ImovelService } from "../services/imovel.service";
import { z } from "zod/v4";
import { ImovelCreateSchema, ImovelUpdateSchema } from "../schemas/imovel.schema";

export class ImovelController {
    static async listar(request: FastifyRequest<{ Querystring: { checkIn?: string, checkOut?: string, usuarioId?: string } }>, reply: FastifyReply) {
        try {
            const imoveis = await ImovelService.listar(request.query);
            return reply.status(200).send(imoveis);
        } catch (error: any) {
            return reply.status(500).send({ message: error.message || "Erro ao listar imóveis" });
        }
    }

    static async obterPorId(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        try {
            const imovel = await ImovelService.buscarPorId(id);
            return reply.status(200).send(imovel);
        } catch (error: any) {
            return reply.status(404).send({ message: error.message || "Imóvel não encontrado" });
        }
    }

    static async atualizar(request: FastifyRequest<{ Params: { id: string }, Body: z.infer<typeof ImovelUpdateSchema> }>, reply: FastifyReply) {
        const { id } = request.params;
        try {
            const imovel = await ImovelService.atualizar(id, request.body);
            return reply.status(200).send(imovel);
        } catch (error: any) {
            return reply.status(404).send({ message: error.message || "Imóvel não encontrado ou erro ao atualizar" });
        }
    }

    static async criar(request: FastifyRequest<{ Body: z.infer<typeof ImovelCreateSchema> }>, reply: FastifyReply) {
        try {
            const novoImovel = await ImovelService.criar(request.body);
            return reply.status(201).send(novoImovel);
        } catch (error: any) {
            return reply.status(500).send({ message: error.message || "Erro ao criar imóvel" });
        }
    }

    static async deletar(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        try {
            await ImovelService.deletar(id);
            return reply.status(204).send();
        } catch (error: any) {
            console.error("Erro ao deletar imóvel:", error);
            return reply.status(500).send({ message: "Erro ao deletar imóvel ou imóvel não encontrado" });
        }
    }
}
