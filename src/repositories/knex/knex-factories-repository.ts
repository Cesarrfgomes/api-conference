import _ from 'lodash'
import { knexOracle } from '../../config/databases/oracle'
import { Factory } from '../../types/Factory-type'
import { FactoriesRepository } from '../factories-repository'

export class KnexFactoriesRepository implements FactoriesRepository {
	async getFactoryByName(name: string): Promise<Factory | null> {
		const factory = await knexOracle('TABFABRICA')
			.select(
				'ST as st',
				'NOME as name',
				'MARGEMF6 as marginf6',
				'MARGEMF2V as marginf2v',
				'MARGEMF2A as marginf2a',
				'ICMS as icms',
				'ATIVO as isactive'
			)
			.where('NOME', name)
			.first()

		if (!factory) {
			return null
		}

		return factory
	}

	async getFactoryById(id: number): Promise<Factory | null> {
		const factory = await knexOracle('TABFABRICA')
			.select(
				'CODFABRICA as factoryCode',
				'NOME as name',
				'ICMS as icms',
				'ST as st',
				'MARGEMF6 as marginf6',
				'MARGEMF2A as marginf2a',
				'MARGEMF2V as marginf2v',
				'ATIVO as isactive'
			)
			.where('CODFABRICA', id)
			.first()

		if (!factory) {
			return null
		}

		return factory
	}

	async findFactories() {
		const factories = await knexOracle('TABFABRICA')
			.select(
				'CODFABRICA as factoryCode',
				'NOME as name',
				'ICMS as icms',
				'ST as st',
				'MARGEMF6 as marginf6',
				'MARGEMF2A as marginf2a',
				'MARGEMF2V as marginf2v',
				'ATIVO as isactive'
			)
			.orderBy('factoryCode', 'asc')

		return factories
	}

	async create(data: Factory) {
		const fieldMapping: any = {
			factorycode: 'CODFABRICA',
			name: 'NOME',
			icms: 'ICMS',
			st: 'ST',
			marginf2a: 'MARGEMF2A',
			marginf2v: 'MARGEMF2V',
			marginf6: 'MARGEMF6',
			isactive: 'ATIVO'
		}

		function mapFieldsToOracle(data: any) {
			return _.mapKeys(
				data,
				(value, key) => fieldMapping[key.toLowerCase()] || key
			)
		}

		const factories = await knexOracle('TABFABRICA')

		const dataLowerCase = {
			factorycode: data.factoryCode ?? factories.length + 1,
			name: data.name,
			icms: data.icms,
			st: data.st,
			marginf2a: data.marginf2a,
			marginf2v: data.marginf2v,
			marginf6: data.marginf6,
			isactive: 'S'
		}

		await knexOracle('TABFABRICA').insert(mapFieldsToOracle(dataLowerCase))

		return data
	}

	async delete(id: number) {
		await knexOracle('TABFABRICA').delete().where('CODFABRICA', id)
	}

	async update(id: number, data: Factory) {
		const fieldMapping: any = {
			factorycode: 'CODFABRICA',
			name: 'NOME',
			icms: 'ICMS',
			st: 'ST',
			marginf2a: 'MARGEMF2A',
			marginf2v: 'MARGEMF2V',
			marginf6: 'MARGEMF6',
			isactive: 'ATIVO'
		}

		function mapFieldsToOracle(data: any) {
			return _.mapKeys(
				data,
				(value, key) => fieldMapping[key.toLowerCase()] || key
			)
		}

		const dataLowerCase = {
			factorycode: data.factoryCode,
			name: data.name,
			icms: data.icms,
			st: data.st,
			marginf2a: data.marginf2a,
			marginf2v: data.marginf2v,
			marginf6: data.marginf6,
			isactive: data.isactive
		}

		await knexOracle('TABFABRICA')
			.update(mapFieldsToOracle(dataLowerCase))
			.where('CODFABRICA', id)
	}
}
