import { knexOracle } from '../../config/databases/oracle'
import { knexPg } from '../../config/databases/postgres'
import { UserKaizenType, UserWinthorType } from '../../types/User-type'
import { UserRepository } from '../user-repository'

export class KnexUserRepository implements UserRepository {
	async findWitnhorUserById(userId: number): Promise<UserWinthorType | null> {
		const user = await knexOracle('PCEMPR')
			.select(
				'MATRICULA as matricula',
				'NOME as nome',
				'SENHABD as senhabd',
				'USUARIOBD as usuariobd'
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
			.select('id', 'ativo', 'chapaerp', 'login', 'nome')
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
				'MATRICULA as matricula',
				'NOME as nome',
				'SENHABD as senhabd',
				'USUARIOBD as usuariobd'
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
