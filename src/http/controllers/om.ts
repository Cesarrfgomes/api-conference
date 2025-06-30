import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../../config/databases/postgres'
import { z } from 'zod'

export async function getOms(request: FastifyRequest, reply: FastifyReply) {
	const getOmsParamsSchema = z.object({
		id: z.coerce.number()
	})

	const { id } = getOmsParamsSchema.parse(request.params)

	const omByNumOm = await knex('movimentacao')
		.select('produto.codigo', 'qt', 'qtseparada', 'qtconferida')
		.join('produto', 'movimentacao.produto_id', 'produto.id')
		.where('numeroom', id)

	return { omByNumOm }
}
