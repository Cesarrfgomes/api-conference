import _ from 'lodash'
import { knexOracle } from '../../config/databases/oracle'
import { CalcProductPriceRepository, CreateCalc } from '../calc-repository'

export class KnexCalcProductPriceRepository
	implements CalcProductPriceRepository
{
	async create(data: CreateCalc) {
		const fieldMapping: any = {
			factory: 'FABRICA',
			product: 'PRODDUTO',
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

		console.log(mapFieldsToOracle(dataLowerCase))

		await knexOracle('TABCALCULOFABRICA').insert(
			mapFieldsToOracle(dataLowerCase)
		)

		return
	}
}
