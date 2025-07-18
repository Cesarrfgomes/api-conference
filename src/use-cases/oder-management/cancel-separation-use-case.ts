import { OrderManagementRepository } from '../../repositories/order-management-repository'
import { UserRepository } from '../../repositories/user-repository'
import { NotFoundOrderManagementError } from '../errors/order-management-not-found-error'
import { SeparationAlreadyFinalizedError } from '../errors/separation-already-finalized-error'
import { SeparationNotInitiatedError } from '../errors/separation-not-initiated-error'
import { UserUnauthorizedDepositAccessError } from '../errors/user-unauthorized-to-access-deposit-error'

interface CancelSeparationUseCaseRequest {
	omNumber: number
	userKaizenIds: number[]
}

interface CancelSeparationUseCaseResponse {
	message: string
}

export class CancelSeparationUseCase {
	constructor(
		private readonly orderManagementRepository: OrderManagementRepository,
		private readonly usersRepository: UserRepository
	) {}

	async execute({
		omNumber,
		userKaizenIds
	}: CancelSeparationUseCaseRequest): Promise<CancelSeparationUseCaseResponse> {
		const om = await this.orderManagementRepository.findOmByNumber(omNumber)

		if (!om) {
			throw new NotFoundOrderManagementError()
		}

		const dosSeparationInit = om.some(
			item => item.initSeparationDate === null
		)

		const doesSeparationFinalized = om.some(item => item.separated === 'S')

		if (dosSeparationInit) {
			throw new SeparationNotInitiatedError()
		}

		if (doesSeparationFinalized) {
			throw new SeparationAlreadyFinalizedError()
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
		await this.orderManagementRepository.cancelOmSeparation(omNumber)

		return {
			message: 'Separação cancelada com sucesso'
		}
	}
}
