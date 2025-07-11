import { KnexFactoriesRepository } from '../../repositories/knex/knex-factories-repository'
import { GetFactoryUseCase } from '../factory/get-factory-use-case'

export function makeGetFactoryUseCase() {
	const knexFactoriesRepository = new KnexFactoriesRepository()
	const service = new GetFactoryUseCase(knexFactoriesRepository)

	return service
}
