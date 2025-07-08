import { CalcProductPriceRepository } from '../../repositories/calc-repository'
import { FactoriesRepository } from '../../repositories/factories-repository'
import { NotFoundFactoryError } from '../errors/factory-not-found-error'

interface CreateCalcProductPriceRequest {
	factory: string
	product: string
	initialPrice: number
	percIpi: number
	shippingPrice: number
	weight: number
	userId: number
}

interface CreateCalcProductPriceResponse {
	filial2A: string
	filial2V: string
	filial6: string
}

export class CreateCalcProductPriceUseCase {
	constructor(
		private factoriesRepository: FactoriesRepository,
		private calcProductPriceRepository: CalcProductPriceRepository
	) {}

	async execute({
		factory,
		initialPrice,
		product,
		percIpi,
		shippingPrice,
		weight,
		userId
	}: CreateCalcProductPriceRequest): Promise<CreateCalcProductPriceResponse> {
		const factoryExists = await this.factoriesRepository.getFactoryByName(
			factory
		)

		if (!factoryExists) {
			throw new NotFoundFactoryError()
		}

		const baseCalcF6 =
			initialPrice +
			initialPrice * (percIpi / 100) +
			(shippingPrice / 1000) * weight

		const calcF6 = baseCalcF6 + baseCalcF6 * (factoryExists.marginf6 / 100)

		const calcF2A =
			baseCalcF6 + baseCalcF6 * (factoryExists.marginf2a / 100)

		const calcF2V =
			baseCalcF6 + baseCalcF6 * (factoryExists.marginf2v / 100)

		await this.calcProductPriceRepository.create({
			employee: userId,
			product: product,
			factory: factory,
			marginF2A: factoryExists.marginf2a,
			marginF2V: factoryExists.marginf2v,
			marginF6: factoryExists.marginf6,
			basePriceF6: baseCalcF6,
			priceF2A: Number(calcF2A.toFixed(2)),
			priceF2V: Number(calcF2V.toFixed(2)),
			priceF6: Number(calcF6.toFixed(2)),
			factorySt: factoryExists.st,
			factoryIcms: factoryExists.icms
		})

		return {
			filial2A: calcF2A.toFixed(2),
			filial2V: calcF2V.toFixed(2),
			filial6: calcF6.toFixed(2)
		}
	}
}
