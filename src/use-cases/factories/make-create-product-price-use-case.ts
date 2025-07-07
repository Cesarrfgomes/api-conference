import { KnexCalcProductPriceRepository } from '../../repositories/knex/knex-calc-repository'
import { KnexFactoriesRepository } from '../../repositories/knex/knex-factories-repository'
import { CreateCalcProductPriceUseCase } from '../calc/create-calc-product-price-use-case'

export function makeCreateCalcProductPriceUseCase() {
	const knexFactoriesRepository = new KnexFactoriesRepository()
	const knexCalcProductPriceRepository = new KnexCalcProductPriceRepository()
	const service = new CreateCalcProductPriceUseCase(
		knexFactoriesRepository,
		knexCalcProductPriceRepository
	)

	return service
}
