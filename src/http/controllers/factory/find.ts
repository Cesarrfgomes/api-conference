import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFindFactoriesUseCase } from '../../../use-cases/factories/make-find-factories-use-case'

export async function findFactories(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const findFactories = makeFindFactoriesUseCase()

	const factories = await findFactories.execute()

	return reply.status(200).send(factories)
}
