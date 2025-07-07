import { knex } from '../../config/databases/postgres'
import { UserRepository } from '../user-repository'

export class KnexUserRepository implements UserRepository {
	async findUserByUsername(username: string) {
		const user = await knex('usuario')
			.select('id', 'chapaerp', 'login', 'senha', 'ativo', 'nome')
			.where('login', username)
			.first()

		if (!user) {
			return null
		}

		return user
	}
}
