import { knexPg } from '../../config/databases/postgres'
import { OrderManagementRepository } from '../order-management-repository'
import { OrderManagementType } from '../../types/Order-management-type'

export class KnexOrderManagementRepository
	implements OrderManagementRepository
{
	async findOmByNumber(omNumber: number) {
		const omByNumOm = await knexPg('movimentacao')
			.select(
				'produto.codigo as codprod',
				'produto.id as produtoId',
				'qt',
				'qtseparada as separateQt',
				'qtconferida as checkedQt',
				'endereco_id as addressId',
				'separado as separated'
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

	async updateOmSeparation(
		omNumber: number,
		omData: OrderManagementType[]
	): Promise<void> {
		for (const product of omData) {
			await knexPg('movimentacao')
				.update({
					qtseparada: product.qt,
					data_fim_separacao: knexPg.raw('NOW()'),
					separado: 'S'
				})
				.where({ produto_id: product.produtoId, numeroom: omNumber })
		}
	}

	async updateOmInitSeparation(
		omNumber: number,
		omData: OrderManagementType[]
	): Promise<void> {
		for (const product of omData) {
			await knexPg('movimentacao')
				.update({
					data_inicio_separacao: knexPg.raw('NOW()')
				})
				.where({ produto_id: product.produtoId, numeroom: omNumber })
		}
	}
}
