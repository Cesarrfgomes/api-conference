import { KnexCalcProductPriceRepository } from '../../repositories/knex/knex-calc-repository'
import { FindCalcByUserIdUseCase } from '../calc/find-user-calcs'

export function makeFindUserCalcsUseCase() {
	const knexCalcProductPriceRepository = new KnexCalcProductPriceRepository()
	const service = new FindCalcByUserIdUseCase(knexCalcProductPriceRepository)

	return service
}
