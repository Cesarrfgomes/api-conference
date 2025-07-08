import { UserRepository } from '../../repositories/user-repository'
import { UserKaizenType, UserWinthorType } from '../../types/User-type'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
	username: string
	password: string
}

interface AuthenticateUseCaseResponse {
	winthorUser: UserWinthorType
	kaizenUser: UserKaizenType | null
}
export class AuthenticateUseCase {
	constructor(private usersRepository: UserRepository) {}

	async execute({
		username,
		password
	}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
		const winthorUser =
			await this.usersRepository.findWinthorUserByUsername(username)

		const decryptPassword =
			await this.usersRepository.getWinthorUserPasswordByUsername(
				username
			)

		if (!winthorUser) {
			throw new InvalidCredentialsError()
		}

		const doesPasswordMatches = decryptPassword === password.toUpperCase()

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError()
		}

		const kaizenUser = await this.usersRepository.findKaizenUserByErpCode(
			winthorUser.winthorUserId
		)

		return { winthorUser, kaizenUser }
	}
}
