import { OrderManagementRepository } from '../../repositories/order-management-repository'
import { UserRepository } from '../../repositories/user-repository'
import { OrderManagementType } from '../../types/Order-management-type'
import { NotFoundOrderManagementError } from '../errors/order-management-not-found-error'
import { UserUnauthorizedDepositAccessError } from '../errors/user-unauthorized-to-access-deposit-error'

interface GetOmUseCaseRequest {
	omNumber: number
	userKaizenId: number
}

interface GetOmUseCaseResponse {
	om: OrderManagementType[]
}

export class GetOmUseCase {
	constructor(
		private readonly orderManagementRepository: OrderManagementRepository,
		private readonly usersRepository: UserRepository
	) {}

	async execute({
		omNumber,
		userKaizenId
	}: GetOmUseCaseRequest): Promise<GetOmUseCaseResponse> {
		const om = await this.orderManagementRepository.findOmByNumber(omNumber)

		if (!om) {
			throw new NotFoundOrderManagementError()
		}

		const omDeposits =
			await this.orderManagementRepository.findOmDepositsByAddressId(
				om.map(item => item.endereco_id)
			)

		const usersDeposits =
			await this.usersRepository.findUserDepositsByKaizenId(userKaizenId)

		const doesUserHaveOmDeposit = usersDeposits.find(
			item => item.deposito === omDeposits?.deposito
		)

		if (!doesUserHaveOmDeposit) {
			throw new UserUnauthorizedDepositAccessError()
		}

		return {
			om
		}
	}
}
