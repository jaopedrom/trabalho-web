import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { jsonSchemaTransform } from '@fastify/type-provider-zod';

async function swaggerPlugin(fastify: FastifyInstance) {
    await fastify.register(fastifySwagger, {
        openapi: {
            openapi: '3.0.0',
            info: {
                title: 'API Trabalho Web',
                description: 'Documentação da API do sistema Trabalho Web, gerenciando usuários, imóveis e autenticação.',
                version: '1.0.0',
            },
            servers: [
                {
                    url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333',
                    description: 'Servidor local',
                },
            ],
            tags: [
                { name: 'imoveis', description: 'Gerenciamento de Imóveis' },
                { name: 'usuarios', description: 'Gerenciamento de Usuários' },
                { name: 'reservas', description: 'Gerenciamento de Reservas' },
                { name: 'autenticacao', description: 'Autenticação' },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
        },
        // jsonSchemaTransform faz a conversão direta de schemas Zod para JSON Schema.
        // Ele injeta automaticamente na rota, sem precisar de components.schemas globais.
        transform: jsonSchemaTransform,
    });

    await fastify.register(fastifySwaggerUi, {
        routePrefix: '/docs',
    });
}

export default fp(swaggerPlugin);
