import { FastifyPluginAsyncZod } from "@fastify/type-provider-zod";
import { UsuarioController } from "../controllers/usuario.controller";
import { UsuarioSchema, UsuarioUpdateSchema, UsuarioCreateSchema, UsuarioParamsSchema } from "../schemas/usuario.schema";
import { MensagemErroSchema } from "../schemas/erro.schema";

const usuariosRoutes: FastifyPluginAsyncZod = async (fastify) => {
    // cria um novo usuario
    fastify.post("/", {
        schema: {
            tags: ["usuarios"],
            summary: "Cria um novo usuário",
            body: UsuarioCreateSchema,
            response: {
                201: UsuarioSchema,
                400: MensagemErroSchema,
            },
        },
    }, UsuarioController.criar);

    // busca usuario por id
    fastify.get("/:id", {
        schema: {
            tags: ["usuarios"],
            summary: "Busca um usuário pelo ID",
            params: UsuarioParamsSchema,
            response: {
                200: UsuarioSchema,
                404: MensagemErroSchema,
            },
        },
    }, UsuarioController.obterPorId);

    // atualiza usuario
    fastify.put("/:id", {
        preValidation: [fastify.authenticate],
        schema: {
            tags: ["usuarios"],
            summary: "Atualiza dados de um usuário",
            params: UsuarioParamsSchema,
            body: UsuarioUpdateSchema,
            response: {
                200: UsuarioSchema,
                404: MensagemErroSchema,
            },
        },
    }, UsuarioController.atualizar);

    // deleta usuario
    fastify.delete("/:id", {
        preValidation: [fastify.authenticate],
        schema: {
            tags: ["usuarios"],
            summary: "Deleta um usuário",
            params: UsuarioParamsSchema,
            response: {
                404: MensagemErroSchema,
                500: MensagemErroSchema,
            },
        },
    }, UsuarioController.deletar);
};

export default usuariosRoutes;
