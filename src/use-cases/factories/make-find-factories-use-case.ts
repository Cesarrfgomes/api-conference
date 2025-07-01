import { KnexFactoriesRepository } from '../../repositories/knex/knex-factories-repository'
import { FindFactoriesUseCase } from '../factory/find-factories-use-case'

export function makeFindFactoriesUseCase() {
	const knexFactoriesRepository = new KnexFactoriesRepository()
	const service = new FindFactoriesUseCase(knexFactoriesRepository)

	return service
}
