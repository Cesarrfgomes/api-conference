import { CalcProductPriceRepository } from '../../repositories/calc-repository'
import { TCalc } from '../../types/Calc-type'
import { NotFoundCalcProductPriceError } from '../errors/calc-not-found-error'

interface GetUserCalcByIdRequest {
	id: number
	userId: number
}

interface GetUserCalcByIdResponse {
	calc: TCalc
}

export class GetUserCalcByIdUseCase {
	constructor(
		private calcProductPriceRepository: CalcProductPriceRepository
	) {}

	async execute({
		id,
		userId
	}: GetUserCalcByIdRequest): Promise<GetUserCalcByIdResponse> {
		const calc = await this.calcProductPriceRepository.findUserCalcById(
			id,
			userId
		)

		if (!calc) {
			throw new NotFoundCalcProductPriceError()
		}

		return {
			calc
		}
	}
}
