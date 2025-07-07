import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetOrderManagementUseCase } from '../../../use-cases/factories/make-get-order-management-use-case'

export async function getOmByNumber(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const getOmsParamsSchema = z.object({
		id: z.coerce.number()
	})

	const { id } = getOmsParamsSchema.parse(request.params)

	const getOmByNumber = makeGetOrderManagementUseCase()

	const { om } = await getOmByNumber.execute({
		omNumber: id,
		userKaizenId: request.user.kaizenId
	})

	return reply.status(200).send({ omItems: om })
}
