import { knexPg } from '../../config/databases/postgres'
import { OrderManagementRepository } from '../order-management-repository'
import { OrderManagementType } from '../../types/Order-management-type'
import _ from 'lodash'
import { knexOracle } from '../../config/databases/oracle'

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

	async createOmOnWinthor(omData: OrderManagementType[]): Promise<void> {
		const fieldMapping: any = {
			numeroom: 'NUMEROOM',
			codfuncsep: 'CODFUNCSEP',
			codprod: 'CODPROD',
			qt: 'QT',
			qtseparada: 'QTSEPARADA',
			qtconferida: 'QTCONFERIDA',
			separado: 'SEPARADO'
		}

		function mapFieldsToOracle(data: any) {
			return _.mapKeys(
				data,
				(value, key) => fieldMapping[key.toLowerCase()] || key
			)
		}

		const records = omData.map(item => {
			return mapFieldsToOracle({
				numeroom: item.numeroom,
				codfuncsep: item.codfuncsep,
				codprod: item.codprod,
				qt: item.qt,
				qtseparada: item.separateQt,
				qtconferida: item.checkedQt,
				separado: item.separated
			})
		})

		await knexOracle('TABMOVIMENTACAO').insert(records)
	}
}
