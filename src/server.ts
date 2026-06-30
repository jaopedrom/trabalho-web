// server.ts
import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { ZodTypeProvider } from "@fastify/type-provider-zod";
import { registerRoutes } from "./api/routes";
import swaggerPlugin from './plugins/swagger.plugin';
import authPlugin from './plugins/auth.plugin';

import zodPlugin from './plugins/zod.plugin';
import requestLoggerPlugin from './plugins/request-logger.plugin';

const fastify = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

// registra o plugin do zod
fastify.register(zodPlugin);

// registra o Request Logger
fastify.register(requestLoggerPlugin);

// adiciona CORS
fastify.register(cors, {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000", // CORS restrito ao front-end para usar credentials
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
});

// registra o plugin de jwt
fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET as string
});

// registra o plugin de Cookie
fastify.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET as string, // Para assinar cookies
    hook: 'onRequest'
});

// registra plugin de auth (deve vir após jwt e cookie)
fastify.register(authPlugin);

// registra o swagger
fastify.register(swaggerPlugin);

registerRoutes(fastify);

const PORT = Number(process.env.PORT) || 3333;
const HOST = process.env.HOST || "0.0.0.0";

fastify.listen({ port: PORT, host: HOST }, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`🚀 Server rodando em http://${HOST}:${PORT} (acessível via IP)`);
});