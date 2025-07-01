import { FastifyReply, FastifyRequest } from 'fastify'

export async function calcProductPrice(
	request: FastifyRequest,
	reply: FastifyReply
) {
	return reply.status(200).send('ok')
}
