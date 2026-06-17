import { z } from "zod";
import { FastifyPluginAsyncZod } from "@fastify/type-provider-zod";
import prisma from "@/src/prisma";

const ImovelSchema = z.object({
    id: z.string(),
    usuarioId: z.string(),
    titulo: z.string(),
    foto: z.string(),
    localizacao: z.string(),
    valorDiaria: z.number(),
    status: z.enum(["livre", "ocupado", "manutencao"]),
});

const ImoveisQuerySchema = z.object({
    checkIn: z.string().optional(),
    checkOut: z.string().optional(),
    usuarioId: z.string().optional(),
});

const imoveisRoutes: FastifyPluginAsyncZod = async (fastify) => {
    // lista de imoveis disponíveis
    fastify.get("/", {
        schema: {
            tags: ["imoveis"],
            summary: "Lista imóveis disponíveis, com filtro opcional por datas",
            querystring: ImoveisQuerySchema,
            response: {
                200: ImovelSchema.array(),
            },
        },
    }, async (request) => {
        const { checkIn, checkOut, usuarioId } = request.query;

        const resultado = await prisma.imovel.findMany({
            where: usuarioId ? { usuarioId } : undefined,
        });

        return resultado.map(i => ({
            ...i,
            status: i.status as "livre" | "ocupado" | "manutencao"
        }));
    });

    // busca de imovel por id
    fastify.get("/:id", {
        schema: {
            tags: ["imoveis"],
            summary: "Busca um imóvel pelo ID",
            params: z.object({
                id: z.string(),
            }),
            response: {
                200: ImovelSchema,
                404: z.object({ message: z.string() }),
            },
        },
    }, async (request, reply) => {
        const { id } = request.params;
        const imovel = await prisma.imovel.findUnique({
            where: { id },
        });

        if (!imovel) {
            return reply.status(404).send({ message: "Imóvel não encontrado" });
        }

        return {
            ...imovel,
            status: imovel.status as "livre" | "ocupado" | "manutencao"
        };
    });

    // atualiza imovel
    fastify.put("/:id", {
        schema: {
            tags: ["imoveis"],
            summary: "Atualiza um imóvel pelo ID",
            params: z.object({
                id: z.string(),
            }),
            body: ImovelSchema.omit({ id: true }),
            response: {
                200: ImovelSchema,
                404: z.object({ message: z.string() }),
            },
        },
    }, async (request, reply) => {
        const { id } = request.params;

        try {
            const imovelAtualizado = await prisma.imovel.update({
                where: { id },
                data: request.body,
            });
            return {
                ...imovelAtualizado,
                status: imovelAtualizado.status as "livre" | "ocupado" | "manutencao"
            };
        } catch (error) {
            return reply.status(404).send({ message: "Imóvel não encontrado" });
        }
    });

    // cria novo imovel
    fastify.post("/", {
        schema: {
            tags: ["imoveis"],
            summary: "Cria um novo imóvel",
            body: ImovelSchema.omit({ id: true }),
            response: {
                201: ImovelSchema,
            },
        },
    }, async (request, reply) => {
        const novoImovel = await prisma.imovel.create({
            data: request.body,
        });

        return reply.status(201).send({
            ...novoImovel,
            status: novoImovel.status as "livre" | "ocupado" | "manutencao"
        });
    });
    // deleta imovel
    fastify.delete("/:id", {
        schema: {
            tags: ["imoveis"],
            summary: "Deleta um imóvel pelo ID",
            params: z.object({
                id: z.string(),
            }),
            response: {
                204: z.null(),
                404: z.object({ message: z.string() }),
                500: z.object({ message: z.string() }),
            },
        },
    }, async (request, reply) => {
        const { id } = request.params;

        try {
            // deletar reservas associadas ao imovel
            await prisma.$transaction([
                prisma.reserva.deleteMany({ where: { imovelId: id } }),
                prisma.imovel.delete({ where: { id } })
            ]);
            return reply.status(204).send(null);
        } catch (error) {
            console.error("Erro ao deletar imóvel:", error);
            return reply.status(500).send({ message: "Erro ao deletar imóvel ou imóvel não encontrado" });
        }
    });
};

export default imoveisRoutes;
