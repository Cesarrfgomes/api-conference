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
				'numeroom as omNumber',
				'produto.codigo as codprod',
				'produto.id as produtoId',
				'qt',
				'qtseparada as separateQt',
				'qtconferida as checkedQt',
				'endereco_id as addressId',
				'separado as separated',
				'data_inicio_separacao as initSeparationDate'
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
		// for (const product of omData) {
		// 	await knexPg('movimentacao')
		// 		.update({
		// 			qtseparada: product.qt,
		// 			data_fim_separacao: knexPg.raw('NOW()'),
		// 			separado: 'S'
		// 		})
		// 		.where({ produto_id: product.produtoId, numeroom: omNumber })
		// }
	}

	async updateOmInitSeparation(
		omNumber: number,
		date: string,
		omData: OrderManagementType[]
	): Promise<void> {
		for (const product of omData) {
			await knexPg('movimentacao')
				.update({
					data_inicio_separacao: date
				})
				.where({ produto_id: product.produtoId, numeroom: omNumber })
		}
	}

	async createOmOnWinthor(
		omData: OrderManagementType[],
		user1: number,
		user2: number | null
	) {
		const fieldMapping: any = {
			numeroom: 'NUMEROOM',
			codfuncsep: 'CODFUNCSEP',
			codfuncsep2: 'CODFUNCSEP2',
			codprod: 'CODPROD',
			qt: 'QT',
			qtseparada: 'QTSEPARADA',
			qtconferida: 'QTCONFERIDA',
			separado: 'SEPARADO',
			data_inicio_separacao: 'DTINICIOSEPARACAO',
			data_fim_separacao: 'DTFIMSEPARACAO'
		}

		function mapFieldsToOracle(data: any) {
			return _.mapKeys(
				data,
				(value, key) => fieldMapping[key.toLowerCase()] || key
			)
		}

		const records = omData.map(item => {
			return mapFieldsToOracle({
				numeroom: item.omNumber,
				codfuncsep: user1,
				codfuncsep2: user2 ?? null,
				codprod: item.codprod,
				qt: item.qt,
				qtseparada: item.separateQt,
				qtconferida: item.checkedQt,
				separado: 'S',
				data_inicio_separacao: item.initSeparationDate,
				data_fim_separacao: new Date()
			})
		})

		await knexOracle('TABMOVIMENTACAO').insert(records)
	}
}
