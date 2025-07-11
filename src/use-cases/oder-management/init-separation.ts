import { OrderManagementRepository } from '../../repositories/order-management-repository'
import { UserRepository } from '../../repositories/user-repository'
import { OrderManagementAlreadySeparatedError } from '../errors/order-management-already-separated-error'
import { NotFoundOrderManagementError } from '../errors/order-management-not-found-error'
import { UserUnauthorizedDepositAccessError } from '../errors/user-unauthorized-to-access-deposit-error'

interface InitSeparationUseCaseRequest {
	omNumber: number
	userKaizenIds: number[]
}

interface InitSeparationUseCaseResponse {
	message: string
}

export class InitSeparationUseCase {
	constructor(
		private readonly orderManagementRepository: OrderManagementRepository,
		private readonly usersRepository: UserRepository
	) {}

	async execute({
		omNumber,
		userKaizenIds
	}: InitSeparationUseCaseRequest): Promise<InitSeparationUseCaseResponse> {
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

		await this.orderManagementRepository.updateOmInitSeparation(
			omNumber,
			om
		)

		return {
			message: 'Separação iniciada com sucesso!'
		}
	}
}
