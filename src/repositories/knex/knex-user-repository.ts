import { knexOracle } from '../../config/databases/oracle'
import { knexPg } from '../../config/databases/postgres'
import { UserKaizenType, UserWinthorType } from '../../types/User-type'
import { UserRepository } from '../user-repository'

export class KnexUserRepository implements UserRepository {
	async findUserByNameTag(nameTags: string) {
		const nameTagsArray = nameTags.split(',')

		const winthorUsers = await knexOracle('TABCRACHA')
			.select('MATRICULA as winthorUserId')
			.whereIn('CRACHA', nameTagsArray)

		const kaizenUsers = await knexPg('usuario')
			.select('id as kaizenId', 'chapaerp as winthorId')
			.whereIn(
				'chapaerp',
				winthorUsers.map(item => item.winthorUserId)
			)

		return kaizenUsers
	}

	async findWinthorUserById(userId: number): Promise<UserWinthorType | null> {
		const user = await knexOracle('PCEMPR')
			.select(
				'MATRICULA as winthorUserId',
				'NOME as name',
				'USUARIOBD as winthorUsername',
				'SENHABD as password'
			)
			.where('MATRICULA', userId)
			.first()

		if (!user) {
			return null
		}

		return user
	}

	async findKaizenUsersByIds(userIds: number[]) {
		const kaizenUsers = await knexPg('usuario')
			.select('id as kaizenId', 'chapaerp as winthorUserId')
			.whereIn('id', userIds)

		return kaizenUsers
	}

	async findKaizenUserByErpCode(
		winthorUserId: number
	): Promise<UserKaizenType | null> {
		const user = await knexPg('usuario')
			.select(
				'id as kaizenUserId',
				'chapaerp as winthorUserId',
				'nome as name',
				'login as kaizenUsername',
				'ativo as isActive'
			)
			.where('chapaerp', winthorUserId)
			.first()

		if (!user) {
			return null
		}

		return user
	}

	async findUserDepositsByKaizenId(userId: number) {
		const deposits = await knexPg('deposito_conferencia')
			.select('deposito as deposit')
			.where('usuario_id', userId)

		return deposits
	}

	async findWinthorUserByUsername(username: string) {
		const user = await knexOracle('PCEMPR')
			.select(
				'MATRICULA as winthorUserId',
				'NOME as name',
				'USUARIOBD as winthorUsername',
				'SENHABD as password'
			)
			.where('USUARIOBD', username)
			.first()

		if (!user || user.length === 0) {
			return null
		}

		return user
	}

	async getWinthorUserPasswordByUsername(username: string) {
		const user = await knexOracle.raw(
			`
            SELECT DECRYPT(SENHABD, ?) as password
            FROM PCEMPR
            WHERE Upper(LTrim(RTrim(USUARIOBD))) = ?
            `,
			[username, username]
		)

		if (!user) {
			return null
		}

		return user[0].PASSWORD
	}
}
