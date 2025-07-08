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
				'ATIVO as isActive'
			)
			.where('NOME', name)
			.first()

		if (!factory) {
			return null
		}

		return factory
	}

	async findFactories() {
		const factories = await knexOracle('TABFABRICA').select('NOME as name')

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
			active: 'ATIVO'
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
			active: 'S'
		}

		await knexOracle('TABFABRICA').insert(mapFieldsToOracle(dataLowerCase))

		return data
	}
}
