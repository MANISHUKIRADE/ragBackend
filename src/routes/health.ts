import { FastifyRequest, FastifyReply } from 'fastify'

export const healthHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  return reply.send({ status: 'ok', timestamp: new Date().toISOString() })
}

