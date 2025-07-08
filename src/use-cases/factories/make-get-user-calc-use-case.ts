import { KnexCalcProductPriceRepository } from '../../repositories/knex/knex-calc-repository'
import { GetUserCalcByIdUseCase } from '../calc/get-user-calc'

export function makeGetUserCalcUseCase() {
	const knexCalcProductPriceRepository = new KnexCalcProductPriceRepository()
	const service = new GetUserCalcByIdUseCase(knexCalcProductPriceRepository)

	return service
}
