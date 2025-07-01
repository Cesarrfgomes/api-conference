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

export class CreateCalcProductPrice {
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

		const calcbaseF6 =
			initialPrice +
			initialPrice * (percIpi / 100) +
			(shippingPrice / 1000) * weight

		const calcF6 = calcbaseF6 + calcbaseF6 * (factoryExists.MARGEMF6 / 100)

		const calcF2A =
			calcbaseF6 + calcbaseF6 * (factoryExists.MARGEMF2A / 100)

		const calcF2V =
			calcbaseF6 + calcbaseF6 * (factoryExists.MARGEMF2V / 100)

		await this.calcProductPriceRepository.create({
			CODFUNC: userId,
			PRODDUTO: product,
			FABRICA: factory,
			MARGEMF2ATC: factoryExists.MARGEMF2A,
			MARGEMF2VRJ: factoryExists.MARGEMF2V,
			MARGEMF6: factoryExists.MARGEMF6,
			PBASEF6: calcbaseF6,
			PVENDAF2ATC: Number(calcF2A.toFixed(2)),
			PVENDAF2VRJ: Number(calcF2V.toFixed(2)),
			PVENDAF6: Number(calcF6.toFixed(2)),
			STFABRICA: factoryExists.ST,
			ICMSFABRICA: factoryExists.ICMS
		})

		return {
			filial2A: calcF2A.toFixed(2),
			filial2V: calcF2V.toFixed(2),
			filial6: calcF6.toFixed(2)
		}
	}
}
