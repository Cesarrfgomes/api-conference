import _ from 'lodash'
import { knexOracle } from '../../config/databases/oracle'
import { CalcProductPriceRepository, CreateCalc } from '../calc-repository'
import { TCalc } from '../../types/Calc-type'

export class KnexCalcProductPriceRepository
	implements CalcProductPriceRepository
{
	async findUserCalc() {
		const calcs = await knexOracle('TABCALCULOFABRICA').select(
			'ID as id',
			'FABRICA as factory',
			'PRODUTO as product',
			'ICMSFABRICA as factoryIcms',
			'STFABRICA as factorySt',
			'PBASEF6 as basePriceF6',
			'MARGEMF6 as marginF6',
			'MARGEMF2ATC as marginF2A',
			'MARGEMF2VRJ as marginF2V',
			'PVENDAF6 as priceF6',
			'PVENDAF2ATC as priceF2A',
			'PVENDAF2VRJ as priceF2V',
			'CODFUNC as employee',
			'DTINCLUSAO as insertDate'
		)

		return calcs
	}

	async findUserCalcById(id: number) {
		const calc = await knexOracle('TABCALCULOFABRICA')
			.select(
				'ID as id',
				'FABRICA as factory',
				'PRODUTO as product',
				'ICMSFABRICA as factoryIcms',
				'STFABRICA as factorySt',
				'PBASEF6 as basePriceF6',
				'MARGEMF6 as marginF6',
				'MARGEMF2ATC as marginF2A',
				'MARGEMF2VRJ as marginF2V',
				'PVENDAF6 as priceF6',
				'PVENDAF2ATC as priceF2A',
				'PVENDAF2VRJ as priceF2V',
				'CODFUNC as employee',
				'DTINCLUSAO as insertDate'
			)
			.where('ID', id)
			.first()

		if (!calc) {
			return null
		}

		return calc
	}

	async create(data: CreateCalc) {
		const calcs = await knexOracle('TABCALCULOFABRICA')

		const fieldMapping: any = {
			id: 'ID',
			factory: 'FABRICA',
			product: 'PRODUTO',
			factoryst: 'STFABRICA',
			factoryicms: 'ICMSFABRICA',
			employee: 'CODFUNC',
			marginf2a: 'MARGEMF2ATC',
			marginf2v: 'MARGEMF2VRJ',
			marginf6: 'MARGEMF6',
			basepricef6: 'PBASEF6',
			pricef2a: 'PVENDAF2ATC',
			pricef2v: 'PVENDAF2VRJ',
			pricef6: 'PVENDAF6'
		}

		function mapFieldsToOracle(data: any) {
			return _.mapKeys(
				data,
				(value, key) => fieldMapping[key.toLowerCase()] || key
			)
		}

		const dataLowerCase = {
			id: calcs.length + 1,
			factory: data.factory,
			product: data.product,
			factoryst: data.factorySt,
			factoryicms: data.factoryIcms,
			employee: data.employee,
			marginf6: data.marginF6,
			marginf2v: data.marginF2V,
			marginf2a: data.marginF2A,
			basepricef6: data.basePriceF6,
			pricef6: data.priceF6,
			pricef2a: data.priceF2A,
			pricef2v: data.priceF2V
		}

		await knexOracle('TABCALCULOFABRICA').insert(
			mapFieldsToOracle(dataLowerCase)
		)

		return
	}

	async delete(id: number): Promise<void> {
		throw new Error('Method not implemented.')
	}
}
