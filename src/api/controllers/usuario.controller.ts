import { FastifyRequest, FastifyReply } from "fastify";
import { UsuarioService } from "../services/usuario.service";
import { z } from "zod";
import { UsuarioCreateSchema, UsuarioUpdateSchema } from "../schemas/usuario.schema";

export class UsuarioController {
    static async criar(request: FastifyRequest<{ Body: z.infer<typeof UsuarioCreateSchema> }>, reply: FastifyReply) {
        try {
            const novoUsuario = await UsuarioService.criar(request.body);
            return reply.status(201).send(novoUsuario);
        } catch (error: any) {
            return reply.status(400).send({ message: error.message || "Erro ao criar usuário" });
        }
    }

    static async obterPorId(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        try {
            const usuario = await UsuarioService.buscarPorId(id);
            return reply.status(200).send(usuario);
        } catch (error: any) {
            return reply.status(404).send({ message: error.message || "Usuário não encontrado" });
        }
    }

    static async atualizar(request: FastifyRequest<{ Params: { id: string }, Body: z.infer<typeof UsuarioUpdateSchema> }>, reply: FastifyReply) {
        const { id } = request.params;
        try {
            const usuario = await UsuarioService.atualizar(id, request.body);
            return reply.status(200).send(usuario);
        } catch (error: any) {
            return reply.status(404).send({ message: error.message || "Usuário não encontrado" });
        }
    }

    static async deletar(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        try {
            await UsuarioService.deletar(id);
            return reply.status(204).send();
        } catch (error: any) {
            console.error("Erro ao deletar usuário:", error);
            return reply.status(500).send({ message: "Erro ao deletar usuário ou usuário não encontrado" });
        }
    }
}
