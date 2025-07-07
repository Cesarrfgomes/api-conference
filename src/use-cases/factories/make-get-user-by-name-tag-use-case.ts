import { KnexUserRepository } from '../../repositories/knex/knex-user-repository'
import { GetUserByNameTagUseCase } from '../user/get-user-by-name-tag-use-case'

export function makeGetUserByNameTagUseCase() {
	const knexUserRepository = new KnexUserRepository()
	const service = new GetUserByNameTagUseCase(knexUserRepository)

	return service
}
