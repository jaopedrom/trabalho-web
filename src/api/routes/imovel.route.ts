import { FastifyPluginAsyncZod } from "@fastify/type-provider-zod";
import { ImovelController } from "../controllers/imovel.controller";
import { ImovelSchema, ImovelBuscaQuerySchema, ImovelParamsSchema } from "../schemas/imovel.schema";
import { MensagemErroSchema } from "../schemas/erro.schema";

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
            params: ImovelParamsSchema,
            response: {
                200: ImovelSchema,
                404: MensagemErroSchema,
            },
        },
    }, ImovelController.obterPorId);

    // atualiza imovel
    fastify.put("/:id", {
        preValidation: [fastify.authenticate],
        schema: {
            tags: ["imoveis"],
            summary: "Atualiza um imóvel pelo ID",
            params: ImovelParamsSchema,
            body: ImovelSchema.omit({ id: true }),
            response: {
                200: ImovelSchema,
                404: MensagemErroSchema,
            },
        },
    }, ImovelController.atualizar);

    // cria novo imovel
    fastify.post("/", {
        preValidation: [fastify.authenticate],
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
        preValidation: [fastify.authenticate],
        schema: {
            tags: ["imoveis"],
            summary: "Deleta um imóvel pelo ID",
            params: ImovelParamsSchema,
            response: {
                404: MensagemErroSchema,
                500: MensagemErroSchema,
            },
        },
    }, ImovelController.deletar);
};

export default imoveisRoutes;
