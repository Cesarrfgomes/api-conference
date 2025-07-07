import { createHash } from 'node:crypto'
import { UserRepository } from '../../repositories/user-repository'
import { UserType } from '../../types/User-type'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
	username: string
	password: string
}

interface AuthenticateUseCaseResponse {
	user: UserType
}
export class AuthenticateUseCase {
	constructor(private usersRepository: UserRepository) {}

	async execute({
		username,
		password
	}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
		const user = await this.usersRepository.findUserByUsername(username)

		if (!user) {
			throw new InvalidCredentialsError()
		}

		const password_hash = createHash('md5').update(password).digest('hex')

		const doesPasswordMatches = password_hash === user.senha

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError()
		}

		const { senha: _, ...userWithOutPassword } = user

		return {
			user: userWithOutPassword
		}
	}
}
