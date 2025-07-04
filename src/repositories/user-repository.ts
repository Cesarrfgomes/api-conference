import { UserKaizenType, UserWinthorType } from '../types/User-type'

export interface UserRepository {
	findWinthorUserById(userId: number): Promise<UserWinthorType | null>
	findKaizenUserByErpCode(
		winthorUserId: number
	): Promise<UserKaizenType | null>
	findUserDepositsByKaizenId(
		userId: number
	): Promise<Pick<{ deposito: number }, 'deposito'>[]>
	findWinthorUserByUsername(username: string): Promise<UserWinthorType | null>
	getWinthorUserPasswordByUsername(username: string): Promise<string | null>
}
