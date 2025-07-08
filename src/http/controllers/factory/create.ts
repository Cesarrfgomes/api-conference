import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateFactoryUseCase } from '../../../use-cases/factories/make-create-factory-use-case'
import { FactoryAlreadyExistsError } from '../../../use-cases/errors/factory-already-exists-error'

export async function createFactory(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const createFactoryBodySchema = z.object({
		name: z.string(),
		icms: z.coerce.number(),
		st: z.coerce.number(),
		marginF2V: z.coerce.number(),
		marginF2A: z.coerce.number(),
		marginF6: z.coerce.number()
	})

	const { name, icms, st, marginF2A, marginF2V, marginF6 } =
		createFactoryBodySchema.parse(request.body)

	try {
		const createFactory = makeCreateFactoryUseCase()

		const { factory } = await createFactory.execute({
			name,
			icms,
			st,
			marginF2A,
			marginF2V,
			marginF6
		})

		return reply.status(201).send(factory)
	} catch (err) {
		if (err instanceof FactoryAlreadyExistsError) {
			return reply.status(400).send({ message: err.message })
		}

		return
	}
}
