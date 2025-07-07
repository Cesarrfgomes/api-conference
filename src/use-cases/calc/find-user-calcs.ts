import { CalcProductPriceRepository } from '../../repositories/calc-repository'
import { TCalc } from '../../types/Calc-type'

interface FindCalcByUserIdRequest {
	userId: number
	page: number
}

interface FindCalcByUserIdResponse {
	calcs: TCalc[]
}

export class FindCalcByUserIdUseCase {
	constructor(
		private calcProductPriceRepository: CalcProductPriceRepository
	) {}

	async execute({
		userId,
		page
	}: FindCalcByUserIdRequest): Promise<FindCalcByUserIdResponse> {
		const calcs =
			await this.calcProductPriceRepository.findUserCalcsByUserId(
				userId,
				page
			)

		return {
			calcs
		}
	}
}
