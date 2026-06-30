import prisma from "@/src/prisma";
import { z } from "zod";
import { ImovelCreateSchema, ImovelUpdateSchema } from "../schemas/imovel.schema";

export class ImovelService {
    static async listar(filtros: { checkIn?: string, checkOut?: string, usuarioId?: string }) {
        const resultado = await prisma.imovel.findMany({
            where: filtros.usuarioId ? { usuarioId: filtros.usuarioId } : undefined,
        });

        return resultado.map(i => ({
            ...i,
            status: i.status as "livre" | "ocupado" | "manutencao"
        }));
    }

    static async buscarPorId(id: string) {
        const imovel = await prisma.imovel.findUnique({
            where: { id },
        });

        if (!imovel) {
            throw new Error("Imóvel não encontrado");
        }

        return {
            ...imovel,
            status: imovel.status as "livre" | "ocupado" | "manutencao"
        };
    }

    static async atualizar(id: string, dados: z.infer<typeof ImovelUpdateSchema>) {
        const imovelAtualizado = await prisma.imovel.update({
            where: { id },
            data: dados,
        });

        return {
            ...imovelAtualizado,
            status: imovelAtualizado.status as "livre" | "ocupado" | "manutencao"
        };
    }

    static async criar(dados: z.infer<typeof ImovelCreateSchema>) {
        const novoImovel = await prisma.imovel.create({
            data: dados,
        });

        return {
            ...novoImovel,
            status: novoImovel.status as "livre" | "ocupado" | "manutencao"
        };
    }

    static async deletar(id: string) {
        // deletar reservas associadas ao imovel
        await prisma.$transaction([
            prisma.reserva.deleteMany({ where: { imovelId: id } }),
            prisma.imovel.delete({ where: { id } })
        ]);
    }
}
