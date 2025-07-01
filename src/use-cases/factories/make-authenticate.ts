import { KnexUserRepository } from '../../repositories/knex/knex-user-repository'
import { AuthenticateUseCase } from '../user/authenticate'

export function makeAuthenticateUseCase() {
	const knexUserRepository = new KnexUserRepository()
	const service = new AuthenticateUseCase(knexUserRepository)

	return service
}
