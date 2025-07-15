import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCancelSeparationUseCase } from '../../../use-cases/factories/make-cancel-separation-use-case'

export async function cancelSeparation(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const cancelSeparationParamsSchema = z.object({
		id: z.coerce.number()
	})
	const cancelSeparationQuerySchema = z.object({
		kaizenIds: z.string().transform(val => val.split(',').map(Number))
	})

	const { id } = cancelSeparationParamsSchema.parse(request.params)
	const { kaizenIds } = cancelSeparationQuerySchema.parse(request.query)

	try {
		const cancelSeparationUseCase = makeCancelSeparationUseCase()
		const { message } = await cancelSeparationUseCase.execute({
			omNumber: id,
			userKaizenIds: kaizenIds
		})

		return reply.status(200).send({ message })
	} catch (err) {
		console.error(err)
		throw err
	}
}
