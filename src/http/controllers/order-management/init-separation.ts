import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeInitSeparationUseCase } from '../../../use-cases/factories/make-init-separation-use-case'

export async function initSeparation(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const initSeparationParamsSchema = z.object({
		id: z.coerce.number()
	})
	const initSeparationQuerySchema = z.object({
		kaizenIds: z.string().transform(val => val.split(',').map(Number))
	})

	const { id } = initSeparationParamsSchema.parse(request.params)
	const { kaizenIds } = initSeparationQuerySchema.parse(request.query)

	try {
		const initSeparationUseCase = makeInitSeparationUseCase()
		const { message } = await initSeparationUseCase.execute({
			omNumber: id,
			userKaizenIds: kaizenIds
		})

		return reply.status(200).send({ message })
	} catch (err) {
		console.error(err)
		throw err
	}
}
