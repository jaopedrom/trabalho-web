import { z } from "zod";
import { FastifyPluginAsyncZod } from "@fastify/type-provider-zod";
import { UsuarioController } from "../controllers/usuario.controller";
import { UsuarioSchema, UsuarioUpdateSchema, UsuarioCreateSchema } from "../schemas/usuario.schema";

const usuariosRoutes: FastifyPluginAsyncZod = async (fastify) => {
    // cria um novo usuario
    fastify.post("/", {
        schema: {
            tags: ["usuarios"],
            summary: "Cria um novo usuário",
            body: UsuarioCreateSchema,
            response: {
                201: UsuarioSchema,
                400: z.object({ message: z.string() }),
            },
        },
    }, UsuarioController.criar);

    // busca usuario por id
    fastify.get("/:id", {
        schema: {
            tags: ["usuarios"],
            summary: "Busca um usuário pelo ID",
            params: z.object({ id: z.string() }),
            response: {
                200: UsuarioSchema,
                404: z.object({ message: z.string() }),
            },
        },
    }, UsuarioController.obterPorId);

    // atualiza usuario
    fastify.put("/:id", {
        schema: {
            tags: ["usuarios"],
            summary: "Atualiza dados de um usuário",
            params: z.object({ id: z.string() }),
            body: UsuarioUpdateSchema,
            response: {
                200: UsuarioSchema,
                404: z.object({ message: z.string() }),
            },
        },
    }, UsuarioController.atualizar);

    // deleta usuario
    fastify.delete("/:id", {
        schema: {
            tags: ["usuarios"],
            summary: "Deleta um usuário",
            params: z.object({ id: z.string() }),
            response: {
                204: z.null(),
                404: z.object({ message: z.string() }),
                500: z.object({ message: z.string() }),
            },
        },
    }, UsuarioController.deletar);
};

export default usuariosRoutes;
