import { FastifyPluginAsyncZod } from "@fastify/type-provider-zod";
import { AutenticacaoController } from "../controllers/autenticacao.controller";
import { LoginSchema } from "../schemas/autenticacao.schema";
import { UsuarioSchema } from "../schemas/usuario.schema";
import { MensagemErroSchema } from "../schemas/erro.schema";

const autenticacaoRoutes: FastifyPluginAsyncZod = async (fastify) => {
    fastify.post("/login", {
        schema: {
            tags: ["autenticacao"],
            summary: "Autentica um usuário",
            body: LoginSchema,
            response: {
                200: UsuarioSchema,
                401: MensagemErroSchema,
            },
        },
    }, AutenticacaoController.login);

    fastify.get("/me", {
        schema: {
            tags: ["autenticacao"],
            summary: "Retorna o usuário logado com base no cookie de sessão",
            response: {
                200: UsuarioSchema,
                401: MensagemErroSchema,
            },
        },
    }, AutenticacaoController.me);

    fastify.post("/logout", {
        schema: {
            tags: ["autenticacao"],
            summary: "Encerra a sessão do usuário (remove o cookie)",
            response: {
                200: MensagemErroSchema,
            },
        },
    }, AutenticacaoController.logout);
};

export default autenticacaoRoutes;
