import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetUserCalcUseCase } from '../../../use-cases/factories/make-get-user-calc-use-case'

export async function getUserCalcById(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const getUserCalcParamsSchema = z.object({
		id: z.coerce.number()
	})

	const { id } = getUserCalcParamsSchema.parse(request.params)

	try {
		const findUserCalcs = makeGetUserCalcUseCase()

		const { calc } = await findUserCalcs.execute({
			userId: request.user.sub,
			id
		})

		return reply.status(200).send({
			calc
		})
	} catch (err) {
		console.error(err)

		throw new Error('nada')
	}
}
