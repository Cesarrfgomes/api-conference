import { KnexUserRepository } from '../../repositories/knex/knex-user-repository'
import { KnexOrderManagementRepository } from '../../repositories/knex/knex-order-management-repository'
import { GetOmUseCase } from '../oder-management/get-order-management'

export function makeGetOrderManagementUseCase() {
	const knexOmRepository = new KnexOrderManagementRepository()
	const knexUserRepository = new KnexUserRepository()
	const service = new GetOmUseCase(knexOmRepository, knexUserRepository)

	return service
}
