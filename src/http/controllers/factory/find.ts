import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateFactoryUseCase } from '../../../use-cases/factories/make-create-factory-use-case'
import { FactoryAlreadyExistsError } from '../../../use-cases/errors/factory-already-exists-error'
import { makeFindFactoriesUseCase } from '../../../use-cases/factories/make-find-factories-use-case'

export async function findFactories(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const findFactories = makeFindFactoriesUseCase()

	const factories = await findFactories.execute()

	return reply.status(200).send(factories)
}
