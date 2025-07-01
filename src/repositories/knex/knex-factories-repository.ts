import { knexOracle } from '../../config/databases/oracle'
import { Factory } from '../../types/Factory-type'
import { FactoriesRepository } from '../factories-repository'

export class KnexFactoriesRepository implements FactoriesRepository {
	async getFactoryByName(name: string): Promise<Factory | null> {
		const factory = await knexOracle('TABFABRICA')
			.where('NOME', name)
			.first()

		if (!factory) {
			return null
		}

		return factory
	}

	async create(data: Factory) {
		const factories = await knexOracle('TABFABRICA')

		const factory = await knexOracle('TABFABRICA').insert({
			CODFABRICA: data.CODFABRICA ?? factories.length + 1,
			NOME: data.NOME,
			ICMS: data.ICMS,
			ST: data.ST,
			MARGEMF2A: data.MARGEMF2A,
			MARGEMF2V: data.MARGEMF2V,
			MARGEMF6: data.MARGEMF6,
			ATIVO: 'S'
		})

		return data
	}
}
