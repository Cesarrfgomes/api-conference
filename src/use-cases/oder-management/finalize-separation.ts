import { OrderManagementRepository } from '../../repositories/order-management-repository'
import { UserRepository } from '../../repositories/user-repository'
import { OrderManagementType } from '../../types/Order-management-type'
import { OrderManagementAlreadySeparatedError } from '../errors/order-management-already-separated-error'
import { NotFoundOrderManagementError } from '../errors/order-management-not-found-error'
import { UserUnauthorizedDepositAccessError } from '../errors/user-unauthorized-to-access-deposit-error'

interface FinalizeSeparationUseCaseRequest {
	omNumber: number
	userKaizenIds: number[]
}

interface FinalizeSeparationUseCaseResponse {
	om: OrderManagementType[]
}

export class FinalizeSeparationUseCase {
	constructor(
		private readonly orderManagementRepository: OrderManagementRepository,
		private readonly usersRepository: UserRepository
	) {}

	async execute({
		omNumber,
		userKaizenIds
	}: FinalizeSeparationUseCaseRequest): Promise<FinalizeSeparationUseCaseResponse> {
		const om = await this.orderManagementRepository.findOmByNumber(omNumber)

		if (!om) {
			throw new NotFoundOrderManagementError()
		}

		if (om.some(item => item.separated === 'S')) {
			throw new OrderManagementAlreadySeparatedError()
		}

		const omDeposits =
			await this.orderManagementRepository.findOmDepositsByAddressId(
				om.map(item => item.addressId)
			)

		for (const userKaizenId of userKaizenIds) {
			const usersDeposits =
				await this.usersRepository.findUserDepositsByKaizenId(
					userKaizenId
				)
			const doesUserHaveOmDeposit = usersDeposits.find(
				item => item.deposit === omDeposits?.deposit
			)
			if (!doesUserHaveOmDeposit) {
				throw new UserUnauthorizedDepositAccessError()
			}
		}

		const updatedOm = om.map(product => ({
			...product,
			separateQt: product.qt
		}))

		await this.orderManagementRepository.updateOmSeparation(
			omNumber,
			updatedOm
		)

		return {
			om: updatedOm
		}
	}
}
