import _ from 'lodash'
import { knexOracle } from '../../config/databases/oracle'
import { CalcProductPriceRepository, CreateCalc } from '../calc-repository'
import { TCalc } from '../../types/Calc-type'

export class KnexCalcProductPriceRepository
	implements CalcProductPriceRepository
{
	private readonly CALC_FIELDS = {
		id: 'ID as id',
		factory: 'FABRICA as factory',
		product: 'PRODUTO as product',
		factoryIcms: 'ICMSFABRICA as factoryIcms',
		factorySt: 'STFABRICA as factorySt',
		basePriceF6: 'PBASEF6 as basePriceF6',
		marginF6: 'MARGEMF6 as marginF6',
		marginF2A: 'MARGEMF2ATC as marginF2A',
		marginF2V: 'MARGEMF2VRJ as marginF2V',
		priceF6: 'PVENDAF6 as priceF6',
		priceF2A: 'PVENDAF2ATC as priceF2A',
		priceF2V: 'PVENDAF2VRJ as priceF2V',
		employee: 'CODFUNC as employee',
		createdAt: 'DTINCLUSAO as createdAt'
	}

	private readonly ITEMS_PER_PAGE = 10

	async findUserCalcsByUserId(
		winthorUserId: number,
		page: number
	): Promise<TCalc[]> {
		try {
			const offset = (page - 1) * this.ITEMS_PER_PAGE

			const calcs = await knexOracle('TABCALCULOFABRICA')
				.select(Object.values(this.CALC_FIELDS))
				.where('CODFUNC', winthorUserId)
				.limit(this.ITEMS_PER_PAGE)
				.offset(offset)
				.orderBy('ID', 'desc')

			return calcs as unknown as TCalc[]
		} catch (error) {
			console.error('Error fetching user calculations:', error)
			throw new Error('Failed to fetch user calculations')
		}
	}

	async findUserCalcById(
		id: number,
		winthorUserId: number
	): Promise<TCalc | null> {
		try {
			const calc = await knexOracle('TABCALCULOFABRICA')
				.select(Object.values(this.CALC_FIELDS))
				.where({ ID: id, CODFUNC: winthorUserId })
				.first()

			return (calc as unknown as TCalc) || null
		} catch (error) {
			console.error('Error fetching calculation by ID:', error)
			throw new Error('Failed to fetch calculation')
		}
	}

	async create(data: CreateCalc) {
		try {
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
		} catch (error) {
			console.error('Error creating calculation:', error)
			throw new Error('Failed to create calculation')
		}
	}

	async delete(id: number): Promise<void> {
		throw new Error('Method not implemented.')
	}
}
