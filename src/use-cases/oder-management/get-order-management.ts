import { OrderManagementRepository } from '../../repositories/order-management-repository'
import { OrderManagementType } from '../../types/Order-management-type'
import { NotFoundOrderManagementError } from '../errors/order-management-not-found-error'

interface GetOmUseCaseRequest {
	omNumber: number
}

interface GetOmUseCaseResponse {
	om: OrderManagementType[]
}

export class GetOmUseCase {
	constructor(
		private readonly orderManagementRepository: OrderManagementRepository
	) {}

	async execute({
		omNumber
	}: GetOmUseCaseRequest): Promise<GetOmUseCaseResponse> {
		const om = await this.orderManagementRepository.findOmByNumber(omNumber)

		if (!om) {
			throw new NotFoundOrderManagementError()
		}

		return {
			om
		}
	}
}
