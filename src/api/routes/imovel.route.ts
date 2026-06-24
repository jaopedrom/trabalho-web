import { z } from "zod";
import { FastifyPluginAsyncZod } from "@fastify/type-provider-zod";
import { ImovelController } from "../controllers/imovel.controller";
import { ImovelSchema, ImovelBuscaQuerySchema } from "../schemas/imovel.schema";

const imoveisRoutes: FastifyPluginAsyncZod = async (fastify) => {
    // lista de imoveis disponíveis
    fastify.get("/", {
        schema: {
            tags: ["imoveis"],
            summary: "Lista imóveis disponíveis, com filtro opcional por datas",
            querystring: ImovelBuscaQuerySchema,
            response: {
                200: ImovelSchema.array(),
            },
        },
    }, ImovelController.listar);

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
    }, ImovelController.obterPorId);

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
    }, ImovelController.atualizar);

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
    }, ImovelController.criar);

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
    }, ImovelController.deletar);
};

export default imoveisRoutes;
