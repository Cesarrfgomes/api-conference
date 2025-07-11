import { KnexUserRepository } from '../../repositories/knex/knex-user-repository'
import { KnexOrderManagementRepository } from '../../repositories/knex/knex-order-management-repository'
import { FinalizeSeparationUseCase } from '../oder-management/finalize-separation'

export function makeFinalizeSeparationUseCase() {
	const knexOmRepository = new KnexOrderManagementRepository()
	const knexUserRepository = new KnexUserRepository()
	const service = new FinalizeSeparationUseCase(
		knexOmRepository,
		knexUserRepository
	)

	return service
}
