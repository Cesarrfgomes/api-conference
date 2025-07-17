import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeDeleteFactoryUseCase } from '../../../use-cases/factories/make-delete-factory-use-case'

export async function deleteFactory(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const deleteFactoryParamsSchema = z.object({
		id: z.number()
	})

	const { id } = deleteFactoryParamsSchema.parse(request.params)

	try {
		const deleteFactoryUseCase = makeDeleteFactoryUseCase()
		const { message } = await deleteFactoryUseCase.execute({ id })

		return reply.status(200).send({ message })
	} catch (err) {
		return reply.status(500).send({ message: 'Internal server error' })
	}
}
