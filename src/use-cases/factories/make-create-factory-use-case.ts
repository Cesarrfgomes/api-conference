import { KnexFactoriesRepository } from '../../repositories/knex/knex-factories-repository'
import { CreateFactoryUseCase } from '../factory/create-factory-use-case'

export function makeCreateFactoryUseCase() {
	const knexFactoriesRepository = new KnexFactoriesRepository()
	const service = new CreateFactoryUseCase(knexFactoriesRepository)

	return service
}
