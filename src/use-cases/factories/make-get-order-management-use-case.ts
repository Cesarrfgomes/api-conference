import { KnexOrderManagementRepository } from '../../repositories/knex/order-management-knex-repository'
import { GetOmUseCase } from '../oder-management/get-order-management'

export function makeGetOrderManagementUseCase() {
	const knexOmRepository = new KnexOrderManagementRepository()
	const service = new GetOmUseCase(knexOmRepository)

	return service
}
