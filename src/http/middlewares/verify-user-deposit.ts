import { FastifyReply, FastifyRequest } from 'fastify'
import { knexPg } from '../../config/databases/postgres'
import { NotFoundUserDepositsError } from '../../use-cases/errors/user-deposits-not-found-error'

export async function verifyUserDepositAccess(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const { kaizenId } = request.user

	const userDeposits = await knexPg('deposito_conferencia').where({
		usuario_id: kaizenId
	})

	if (userDeposits.length === 0) {
		throw new NotFoundUserDepositsError()
	}

	console.log(userDeposits)
}
