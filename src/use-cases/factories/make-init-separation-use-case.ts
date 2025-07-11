import { KnexUserRepository } from '../../repositories/knex/knex-user-repository'
import { KnexOrderManagementRepository } from '../../repositories/knex/knex-order-management-repository'
import { InitSeparationUseCase } from '../oder-management/init-separation'

export function makeInitSeparationUseCase() {
	const knexOmRepository = new KnexOrderManagementRepository()
	const knexUserRepository = new KnexUserRepository()
	const service = new InitSeparationUseCase(
		knexOmRepository,
		knexUserRepository
	)

	return service
}
