import { FastifyReply, FastifyRequest } from 'fastify'
import { knexPg } from '../../config/databases/postgres'
import { NotFoundUserDepositsError } from '../../use-cases/errors/user-deposits-not-found-error'
import { z } from 'zod'

export async function verifyUserDepositAccess(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const querySchema = z.object({
		kaizenIds: z.string().transform(val => val.split(',').map(Number))
	})
	const { kaizenIds } = querySchema.parse(request.query)

	for (const kaizenId of kaizenIds) {
		const userDeposits = await knexPg('deposito_conferencia').where({
			usuario_id: kaizenId
		})
		if (userDeposits.length === 0) {
			throw new NotFoundUserDepositsError()
		}
	}
}
