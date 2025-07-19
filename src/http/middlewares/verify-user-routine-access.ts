import { FastifyReply, FastifyRequest } from 'fastify'
import { knexOracle } from '../../config/databases/oracle'

export function verifyUserRoutineAccess(routine: number) {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		const { sub } = request.user

		console.log(sub)

		const doesUserHaveRoutineAccess = await knexOracle('PCCONTRO')
			.select('ACESSO as access')
			.where('CODROTINA', routine)
			.where('CODUSUARIO', sub)
			.first()

		if (
			!doesUserHaveRoutineAccess?.access ||
			doesUserHaveRoutineAccess.access === 'N'
		) {
			return reply.status(401).send({
				message: 'Usuário não tem permissão de acesso à rotina.'
			})
		}
	}
}
