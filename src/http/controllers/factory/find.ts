import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFindFactoriesUseCase } from '../../../use-cases/factories/make-find-factories-use-case'

export async function findFactories(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const findFactories = makeFindFactoriesUseCase()

	const result = await findFactories.execute()

	const factories = result.factories.map(f => ({
		factoryCode: f.factoryCode,
		name: f.name,
		icms: f.icms,
		st: f.st,
		marginf2a: f.marginf2a,
		marginf2v: f.marginf2v,
		marginf6: f.marginf6,
		isactive: f.isactive
	}))

	return reply.status(200).send({ factories })
}
