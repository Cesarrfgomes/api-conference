import { KnexFactoriesRepository } from '../../repositories/knex/knex-factories-repository'
import { DeleteFactoryUseCase } from '../factory/delete-factory-use-case'

export function makeDeleteFactoryUseCase() {
	const knexFactoriesRepository = new KnexFactoriesRepository()
	const service = new DeleteFactoryUseCase(knexFactoriesRepository)

	return service
}
