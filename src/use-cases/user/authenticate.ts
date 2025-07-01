import { UserRepository } from '../../repositories/user-repository'
import { UserWinthorType } from '../../types/User-type'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
	username: string
	password: string
}

interface AuthenticateUseCaseResponse {
	user: UserWinthorType
}
export class AuthenticateUseCase {
	constructor(private usersRepository: UserRepository) {}

	async execute({
		username,
		password
	}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
		const user = await this.usersRepository.findWinthorUserByUsername(
			username
		)

		const decryptPassword =
			await this.usersRepository.getWinthorUserPasswordByUsername(
				username
			)

		if (!user) {
			throw new InvalidCredentialsError()
		}

		const doesPasswordMatches = decryptPassword === password.toUpperCase()

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError()
		}

		return { user }
	}
}
