import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFindUserCalcsUseCase } from '../../../use-cases/factories/make-find-user-calcs-use-case'
import { z } from 'zod'

export async function findUserCalcs(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const findUserCalcsQueryParamsSchema = z.object({
		page: z.coerce.number().default(1)
	})

	const { page } = findUserCalcsQueryParamsSchema.parse(request.query)

	try {
		const findUserCalcs = makeFindUserCalcsUseCase()

		const { calcs } = await findUserCalcs.execute({
			userId: request.user.sub,
			page
		})

		return reply.status(200).send({
			calcs
		})
	} catch (err) {
		console.error(err)

		throw new Error('nada')
	}
}
