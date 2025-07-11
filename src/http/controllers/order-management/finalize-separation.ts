import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFinalizeSeparationUseCase } from '../../../use-cases/factories/make-finalize-separation-use-case'

export async function finalizeSeparation(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const finalizeSeparationParamsSchema = z.object({
		id: z.coerce.number()
	})
	const finalizeSeparationQuerySchema = z.object({
		kaizenIds: z.string().transform(val => val.split(',').map(Number))
	})

	const { id } = finalizeSeparationParamsSchema.parse(request.params)
	const { kaizenIds } = finalizeSeparationQuerySchema.parse(request.query)

	try {
		const finalizeSeparationUseCase = makeFinalizeSeparationUseCase()
		const { om } = await finalizeSeparationUseCase.execute({
			omNumber: id,
			userKaizenIds: kaizenIds
		})

		return reply.status(200).send({
			message: 'Separação finalizada com sucesso!',
			omItems: om
		})
	} catch (err) {
		console.error(err)
		throw err
	}
}
