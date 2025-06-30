import { knex } from '../../config/databases/postgres'
import { OrderManagementType } from '../../types/Order-management-type'
import { OrderManagementRepository } from '../order-management-repository'

export class OrderManagementKnexRepository
	implements OrderManagementRepository
{
	async findOmByNumber(omNumber: number) {
		const omByNumOm = await knex('movimentacao')
			.select(
				'produto.codigo as codprod',
				'qt',
				'qtseparada',
				'qtconferida'
			)
			.join('produto', 'movimentacao.produto_id', 'produto.id')
			.where('numeroom', omNumber)

		if (!omByNumOm) {
			throw new Error('Om nao encontrada')
		}

		return omByNumOm
	}
}
