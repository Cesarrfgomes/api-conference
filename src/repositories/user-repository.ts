import { UserKaizenType, UserWinthorType } from '../types/User-type'

export interface UserRepository {
	findWitnhorUserById(userId: number): Promise<UserWinthorType | null>
	findKaizenUserByErpCode(erpcode: number): Promise<UserKaizenType | null>
	findUserDepositsByKaizenId(
		userId: number
	): Promise<Pick<{ deposito: number }, 'deposito'>[]>
	findWinthorUserByUsername(username: string): Promise<UserWinthorType | null>
	getWinthorUserPasswordByUsername(username: string): Promise<string | null>
}
