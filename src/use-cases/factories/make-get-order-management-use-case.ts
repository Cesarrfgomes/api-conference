import { OrderManagementKnexRepository } from '../../repositories/knex/order-management-knex-repository'
import { GetOmUseCase } from '../get-order-management'

export function makeGetOrderManagementUseCase() {
	const knexOmRepository = new OrderManagementKnexRepository()
	const service = new GetOmUseCase(knexOmRepository)

	return service
}
