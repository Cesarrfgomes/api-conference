import { KnexFactoriesRepository } from '../../repositories/knex/knex-factories-repository'
import { UpdateFactoryUseCase } from '../factory/update-factory-use-case'

export function makeUpdateFactoryUseCase() {
	const knexFactoriesRepository = new KnexFactoriesRepository()
	const service = new UpdateFactoryUseCase(knexFactoriesRepository)

	return service
}
