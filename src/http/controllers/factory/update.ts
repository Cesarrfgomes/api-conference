import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { FactoryAlreadyExistsError } from '../../../use-cases/errors/factory-already-exists-error'
import { makeUpdateFactoryUseCase } from '../../../use-cases/factories/make-update-factory-use-case'

export async function updateFactory(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const updateFactoryParamsSchema = z.object({
		id: z.coerce.number()
	})

	const updateFactoryBodySchema = z.object({
		name: z.string(),
		icms: z.coerce.number(),
		st: z.coerce.number(),
		marginF2V: z.coerce.number(),
		marginF2A: z.coerce.number(),
		marginF6: z.coerce.number()
	})

	const { name, icms, st, marginF2A, marginF2V, marginF6 } =
		updateFactoryBodySchema.parse(request.body)
	const { id } = updateFactoryParamsSchema.parse(request.params)

	try {
		const updateFactory = makeUpdateFactoryUseCase()

		const { message } = await updateFactory.execute({
			id,
			name,
			icms,
			st,
			marginF2A,
			marginF2V,
			marginF6
		})

		return reply.status(200).send({ message })
	} catch (err) {
		if (err instanceof FactoryAlreadyExistsError) {
			return reply.status(400).send({ message: err.message })
		}

		return
	}
}
