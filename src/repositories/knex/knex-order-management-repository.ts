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
				'qtseparada as separateQt',
				'qtconferida as checkedQt',
				'endereco_id as addressId'
			)
			.join('produto', 'movimentacao.produto_id', 'produto.id')
			.where('numeroom', omNumber)

		return omByNumOm
	}

	async findOmDepositsByAddressId(addressId: number[]) {
		const deposits = await knexPg('endereco')
			.select('deposito as deposit')
			.distinct()
			.whereIn('id', addressId)
			.first()

		return deposits
	}
}
