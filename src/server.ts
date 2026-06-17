// server.ts
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { ZodTypeProvider } from "@fastify/type-provider-zod";
import { registerRoutes } from "./routes";
import swaggerPlugin from './plugins/swagger.plugin';

import zodPlugin from './plugins/zod.plugin';
import requestLoggerPlugin from './plugins/request-logger.plugin';

const fastify = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

// registra o plugin do zod
fastify.register(zodPlugin);

// registra o Request Logger
fastify.register(requestLoggerPlugin);

// adiciona CORS
fastify.register(cors, {
    origin: "http://localhost:3000", // CORS restrito ao front-end para usar credentials
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
});

// registra o plugin de JWT
fastify.register(fastifyJwt, {
    secret: "minha_chave_secreta_super_segura_aqui"
});

// registra o plugin de Cookie
fastify.register(fastifyCookie, {
    secret: "minha_chave_de_assinatura_de_cookie", // Para assinar cookies
    hook: 'onRequest'
});

// registra o swagger
fastify.register(swaggerPlugin);

registerRoutes(fastify);

fastify.listen({ port: 3333, host: "0.0.0.0" }, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log("🚀 Server rodando em http://0.0.0.0:3333 (acessível via IP)");
});