import { knexOracle } from '../../config/databases/oracle'
import { knexPg } from '../../config/databases/postgres'
import { UserKaizenType, UserWinthorType } from '../../types/User-type'
import { UserRepository } from '../user-repository'

export class KnexUserRepository implements UserRepository {
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

	async findKaizenUserByErpCode(
		erpcode: number
	): Promise<UserKaizenType | null> {
		const user = await knexPg('usuario')
			.select(
				'id as kaizenUserId',
				'chapaerp as winthorUserId',
				'nome as name',
				'login as kaizenUsername',
				'ativo as isActive'
			)
			.where('chapaerp', erpcode)
			.first()

		if (!user) {
			return null
		}

		return user
	}

	async findUserDepositsByKaizenId(userId: number) {
		const deposits = await knexPg('deposito_conferencia')
			.select('deposito')
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

		if (!user) {
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
