import { FastifyReply, FastifyRequest } from 'fastify'
import { knexOracle } from '../../config/databases/oracle'

export function verifyUserRoutineAccess(routine: number) {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		const { sub } = request.user

		const doesUserHaveRoutineAccess = await knexOracle('PCCONTRO')
			.select('ACESSO as acesso')
			.where('CODROTINA', routine)
			.where('CODUSUARIO', sub)
			.first()

		if (
			!doesUserHaveRoutineAccess?.acesso ||
			doesUserHaveRoutineAccess.acesso === 'N'
		) {
			return reply.status(401).send({
				message: 'Usuário não tem permissão de acesso à rotina.'
			})
		}
	}
}
