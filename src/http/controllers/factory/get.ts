import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetFactoryUseCase } from '../../../use-cases/factories/make-get-factory-use-case'

export async function getFactoryById(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const getFactoryParamsSchema = z.object({
		id: z.number()
	})

	const { id } = getFactoryParamsSchema.parse(request.params)

	try {
		const getFactoryUseCase = makeGetFactoryUseCase()
		const { factory } = await getFactoryUseCase.execute({ id })

		if (!factory) {
			return reply.status(404).send({ message: 'Factory not found' })
		}

		return reply.status(200).send({ factory })
	} catch (err) {
		console.error(err)
		return reply.status(500).send({ message: 'Internal server error' })
	}
}
