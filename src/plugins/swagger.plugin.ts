import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import {
    jsonSchemaTransform,
    jsonSchemaTransformObject,
} from '@fastify/type-provider-zod';
import { z } from 'zod/v4';
import '../schemas';

const componentsSchemas: any = {};
const registryMap = (z.globalRegistry as any)._idmap;
if (registryMap) {
    for (const [id, schema] of registryMap.entries()) {
        componentsSchemas[id] = z.toJSONSchema(schema);
    }
}

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
                    url: 'http://localhost:3333',
                    description: 'Servidor local',
                },
            ],
            tags: [
                { name: 'imoveis', description: 'Gerenciamento de Imóveis' },
                { name: 'usuarios', description: 'Gerenciamento de Usuários' },
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
                schemas: componentsSchemas,
            },
        },
        transform: jsonSchemaTransform,
        transformObject: jsonSchemaTransformObject,
    });

    await fastify.register(fastifySwaggerUi, {
        routePrefix: '/docs',
    });
}

export default fp(swaggerPlugin, {
    name: 'swagger',
});
