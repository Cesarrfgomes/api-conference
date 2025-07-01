import { knexPg } from '../../config/databases/postgres'
import { OrderManagementRepository } from '../order-management-repository'

export class KnexOrderManagementRepository
	implements OrderManagementRepository
{
	async findOmByNumber(omNumber: number) {
		const omByNumOm = await knexPg('movimentacao')
			.select(
				'produto.codigo as codprod',
				'qt',
				'qtseparada',
				'qtconferida'
			)
			.join('produto', 'movimentacao.produto_id', 'produto.id')
			.where('numeroom', omNumber)

		return omByNumOm
	}
}
