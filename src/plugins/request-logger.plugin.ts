import type { FastifyInstance, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

const startTimes = new WeakMap<FastifyRequest, number>();

async function requestLoggerPlugin(fastify: FastifyInstance) {
    fastify.addHook('onRequest', async (request) => {
        startTimes.set(request, Date.now());

        request.log.info({
            method: request.method,
            url: request.url,
            ip: request.ip,
        }, 'Inicio da requisicao');
    });

    fastify.addHook('onResponse', async (request, reply) => {
        const startTime = startTimes.get(request) ?? Date.now();

        request.log.info({
            statusCode: reply.statusCode,
            duration: `${Date.now() - startTime}ms`,
        }, 'Fim da requisicao');
    });
}

export default fp(requestLoggerPlugin, {
    name: 'request-logger',
});
