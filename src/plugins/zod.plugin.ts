import fp from 'fastify-plugin';
import {
    validatorCompiler,
    serializerCompiler,
} from '@fastify/type-provider-zod';
import type { FastifyInstance } from 'fastify';

async function zodPlugin(fastify: FastifyInstance) {
    fastify.setValidatorCompiler(validatorCompiler);
    fastify.setSerializerCompiler(serializerCompiler);
}

export default fp(zodPlugin, {
    name: 'zod-validator',
});
