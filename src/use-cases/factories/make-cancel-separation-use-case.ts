import { KnexUserRepository } from '../../repositories/knex/knex-user-repository'
import { KnexOrderManagementRepository } from '../../repositories/knex/knex-order-management-repository'
import { CancelSeparationUseCase } from '../oder-management/cancel-separation-use-case'

export function makeCancelSeparationUseCase() {
	const knexOmRepository = new KnexOrderManagementRepository()
	const knexUserRepository = new KnexUserRepository()
	const service = new CancelSeparationUseCase(
		knexOmRepository,
		knexUserRepository
	)

	return service
}
